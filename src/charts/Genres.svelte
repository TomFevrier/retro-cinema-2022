<script>
	import { scaleSqrt } from 'd3-scale';
	import { max } from 'd3-array';
	import { packSiblings } from 'd3-hierarchy';

	import { Tooltip } from '../components';

	import { formatPercentage, getMovieSelection, typografix } from '../utils';

	export let data;
	export let visible = false;

	let width;
	let height;

	let hovered = null;

	const moviesByGenre = data.reduce((map, d) => {
		d.genres.forEach((genre) => {
			const previous = map.get(genre) || [];
			map.set(genre, [...previous, d]);
		});
		return map;
	}, new Map());

	const scale = scaleSqrt()
		.domain([0, max([...moviesByGenre.values()], (d) => d.length)])
		.range([0, 100]);

	const circles = packSiblings(
		[...moviesByGenre.entries()].map(([genre, movies]) => ({
			genre,
			movies,
			showName: ['Comédie', 'Drame', 'Action', 'Aventure', 'Policier', 'Thriller', 'Horreur', 'Science-fiction', 'Mystère'].includes(genre),
			r: scale(movies.length)
		}))
	);
</script>

<div class='genres' class:visible bind:clientWidth={width} bind:clientHeight={height}>
	{#each circles as circle}
		<div
			class='circle'
			style='
				left: {circle.x + width * 0.5}px;
				top: {circle.y + height * 0.5}px;
				width: {1.8 * circle.r}px;
				height: {1.8 * circle.r}px;
			'
			on:mouseenter={() => hovered = circle}
			on:mouseleave={() => hovered = null}
		>
			{#if circle.showName}
				<h3 class='genre'>{circle.genre}</h3>
			{/if}
		</div>
	{/each}
	{#if hovered}
		<Tooltip {width} x={hovered.x + width * 0.5} y={hovered.y + height * 0.5}>
			<h3>{@html typografix(hovered.genre)}</h3>
			{#if hovered.movies.length > 1}
				<h5><b>{hovered.movies.length} films</b> ({@html formatPercentage(hovered.movies.length / data.unique('imdbId').length)})</h5>
			{/if}
			<p class='titles'>{@html getMovieSelection(hovered.movies)}</p>
		</Tooltip>
	{/if}
	</div>

<style lang='scss'>
	@import '../global.scss';

	.genres {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		pointer-events: none;
		transition: opacity $animation-duration $animation-timing-function;

		.circle {
			position: absolute;
			background-color: $main-color;
			border-radius: 50%;
			transform: translate(-50%, -50%) scale(0);
			cursor: pointer;
			transition: transform $animation-duration $animation-timing-function ;

			display: flex;
			justify-content: center;
			align-items: center;

			.genre {
				color: white;
				text-align: center;
				font-size: 1.2rem;
			}
		}

		&.visible {
			pointer-events: all;
			opacity: 1;
			transition-delay: 800ms;

			.circle {
				transform: translate(-50%, -50%) scale(1);
				transition-delay: 800ms;
			}
		}

		.titles {
			color: darkgrey;
			font-size: 0.9rem;
		}
	}
</style>