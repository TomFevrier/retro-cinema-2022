<script>
	import { json } from 'd3-fetch';
	import { geoPath, geoCentroid } from 'd3-geo';
	import { geoRobinson } from 'd3-geo-projection';
	import { scaleSqrt } from 'd3-scale';
	import { max, group } from 'd3-array';
	import { feature } from 'topojson-client';

	import { Tooltip } from '../components';

	import countries from './countries';

	import { formatPercentage, getMovieSelection, typografix } from '../utils';

	export let data;
	export let visible = false;
	export let circles;

	const nestedData = Array.from(group(data, (d) => d.country).entries())
		.map((d) => [countries.get(d[0]), d[1]]);

	let geojson;
	json('world.json').then(data => geojson = data);

	let width;
	let height;

	$: features = geojson && feature(geojson, geojson.objects.world).features;

	$: projection = geojson && geoRobinson()
		.center(geoCentroid(feature(geojson, geojson.objects.world)))
		.fitExtent([[-width * 0.1, 0], [width, height]], feature(geojson, geojson.objects.world));

	$: path = geoPath()
		.projection(projection);

	$: scale = scaleSqrt()
		.domain([0, max(nestedData, d => d[1].length)])
		.range([0, width * 0.08]);

	$: {
		if (features) {
			circles = nestedData
				.map((d) => {
					const centroid = geoCentroid(features.find(f => f.properties.iso_a3 === d[0]));
					
					return {
						country: d[1][0].country,
						movies: d[1],
						x: projection(centroid)[0],
						y: projection(centroid)[1],
						width: scale(d[1].length)
					};
				})
				.sort((a, b) => b.width - a.width);
		}
	};

	let hovered = null;
</script>

<div bind:clientWidth={width} bind:clientHeight={height} class='map' class:visible>
	<svg {width} {height}>
		<defs>
			<filter id='blur'>
				<feGaussianBlur stdDeviation='3' />
			</filter>
		</defs>
		{#if features}
			<g class='countries'>
				<g class='shadow'>
					{#each features as d}
						<path d={path(d)} fill='lightgrey' stroke='lightgrey' stroke-width={3} filter='url(#blur)'  />
					{/each}
				</g>
				<g class='land'>
					{#each features as d}
						<path d={path(d)} fill='white' stroke='white' />
					{/each}
				</g>
			</g>
		{/if}
	</svg>
	{#if circles}
		{#each circles as circle}
			<div
				class='circle'
				style='
					left: {circle.x}px;
					top: {circle.y}px;
					width: {circle.width}px;
					height: {circle.width}px;
				'
				on:mouseenter={() => hovered = circle}
				on:mouseleave={() => hovered = null}
			>
			</div>
		{/each}
	{/if}
	{#if hovered}
		<Tooltip {width} x={hovered.x} y={hovered.y}>
			<h3>{@html typografix(hovered.country)}</h3>
			{#if hovered.movies.length > 1}
				<h5><b>{hovered.movies.length} films</b> ({@html formatPercentage(hovered.movies.length / data.length)})</h5>
			{/if}
			<p class='titles'>{@html getMovieSelection(hovered.movies)}</p>
		</Tooltip>
	{/if}
</div>

<style lang='scss'>
	@import '../global.scss';

	.map {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;

		svg {
			transition: opacity $animation-duration $animation-timing-function;
			opacity: 0;
		}

		.circle {
			position: absolute;
			// aspect-ratio: 1;
			background-color: $main-color;
			border-radius: 50%;
			opacity: 0.8;
			transform: translate(-50%, -50%) scale(0);
			transition: transform $animation-duration $animation-timing-function;
			cursor: pointer;
		}

		&.visible {
			pointer-events: all;

			svg {
				opacity: 1;
			}

			.circle {
				transform: translate(-50%, -50%) scale(1);
				transition-delay: 500ms;
			}
		}

		.titles {
			color: darkgrey;
			font-size: 0.9rem;
			margin-top: 0.25rem;
			// white-space: nowrap;
		}
	}
</style>
