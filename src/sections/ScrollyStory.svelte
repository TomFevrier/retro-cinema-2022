<script>
	import { fade } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import { uniqBy } from 'lodash-es';
	import { scaleTime, scaleLinear, scaleOrdinal, scaleSqrt } from 'd3-scale';
	import { extent, max, group, sum } from 'd3-array';
	import { packSiblings } from 'd3-hierarchy';
	import { timeDays } from 'd3-time';
	import { timeFormat } from 'd3-time-format';

	import { Scrolly, Tooltip, Annotation, Axis } from '../components';
	import { OriginMap, Genres } from '../charts';

	import texts from '../texts';

	import {
		isInCategory,
		formatTime,
		formatDuration,
		formatList,
		formatPercentage,
		typografix
	} from '../utils';

	export let data;
	export let posters;
	export let loaded;

	loaded = false;

	const PADDING = {
		top: 0,
		left: 16,
		bottom: 48,
		right: 16
	};
	const NB_COLS_GRID = 25;
	const POSTER_RATIO = 2/3;
	const CELL_SIZE_CALENDAR = 24;

	const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

	const getMedium = (medium) => medium.includes('Cinéma') ? 'Cinéma' : medium;

	const dataByMedium = group(data, (d) => getMedium(d.medium));
	const media = [...dataByMedium.keys()].sort((a, b) => dataByMedium.get(b).length - dataByMedium.get(a).length);

	const dataByDate = group(data, (d) => d.date);

	const movies = tweened(null, {
		duration: 1000,
		easing: cubicOut
	});

	let width;
	let height;
	$: innerWidth = width - PADDING.left - PADDING.right;
	$: innerHeight = height - PADDING.top - PADDING.bottom;
	$: posterWidth = width / NB_COLS_GRID;
	$: posterHeight = posterWidth / POSTER_RATIO;

	let metric = 'grid';
	let category = 'all';
	let activeStep;

	$: activeStep && activeStep.action();

	let circles;

	let hovered = null;

	$: showTitle = !!!activeStep;

	$: releaseDateScale = scaleTime()
		.domain(extent(data, (d) => new Date().setFullYear(d.year)))
		.range([PADDING.left, width - PADDING.right]);

	$: opacityScale = scaleLinear()
		.domain([0, max([...dataByDate.entries()], (d) => sum(d[1], (d) => d.runtime))])
		.range([0, 1]);

	$: mediumScale = scaleOrdinal()
		.domain(media)
		.range([0.1, 0.4, 0.6, 0.75, 0.85, 0.95].map((d) => d * width));


	$: runtimeScale = scaleSqrt()
		.domain([0, max(data, (d) => d.runtime)])
		.range([0, 12]);

	$: getDatePosition = width && ((date) => {
		const formatDay = timeFormat('%u');
		const formatWeek = timeFormat('%W');

		const isFirstSemester = date.getMonth() < 6;
		const offsetX = 2 * CELL_SIZE_CALENDAR * (isFirstSemester ? date.getMonth() : date.getMonth() - 6);

		const center = {
			x: (width - 36 * CELL_SIZE_CALENDAR) * 0.5,
			y: (height - 18 * CELL_SIZE_CALENDAR) * 0.5
		};

		return {
			x: center.x + CELL_SIZE_CALENDAR * (isFirstSemester ? +formatWeek(date) : +formatWeek(date) - 26) + offsetX,
			y: center.y + CELL_SIZE_CALENDAR * (isFirstSemester ? +formatDay(date) : +formatDay(date) + 10)
		};
	});
	
	const getMetricPositions = (metric) => {
		const unique = uniqBy(data, 'imdbId');

		switch(metric) {
			case 'grid':
				return data.map((d) => {
					const index = unique.findIndex((e) => e.imdbId === d.imdbId);
					return {
						...d,
						x: (index % NB_COLS_GRID) * posterWidth,
						y: ~~(index / NB_COLS_GRID) * posterHeight,
						width: posterWidth,
						height: posterHeight,
					};
				});
			case 'watch-date':
				const days = new Map(timeDays(new Date(2022, 0, 1), new Date(2023, 0, 1))
					.map((date) => {
						const { x, y } = getDatePosition(date);

						const isoDate = [
							date.getFullYear(),
							(date.getMonth() + 1).toString().padStart(2, '0'),
							date.getDate().toString().padStart(2, '0')
						].join('-');

						return [
							isoDate,
							{
								date,
								x,
								y
							}
						];
					}));

				return data.map((d) => {
					const day = days.get(d.date);
					return {
						...d,
						x: day.x,
						y: day.y,
						width: CELL_SIZE_CALENDAR - 2,
						height: CELL_SIZE_CALENDAR - 2
					};
				});
			case 'release-date': 
				const itemWidth = innerWidth / (releaseDateScale.domain()[1].getFullYear() - releaseDateScale.domain()[0].getFullYear());
				const itemHeight = innerHeight / unique.filter((d) => d.year === 2022).length;
				return data.map((d) => {
					const index = unique.findIndex((e) => e.imdbId === d.imdbId);
					const nbPreviousMoviesThatYear = unique.slice(0, index).filter((e) => e.year === d.year).length;
					return {
						...d,
						x: releaseDateScale(new Date().setFullYear(d.year)),
						y: height - PADDING.bottom - (1 + nbPreviousMoviesThatYear) * itemHeight,
						width: itemWidth + 1,
						height: itemHeight + 1
					};
				});
			case 'medium':
				const packings = new Map(media.map((medium) => [
					getMedium(medium),
					packSiblings(data
						.filter((d) => getMedium(d.medium) === getMedium(medium))
						.map((d) => ({
							...d,
							r: runtimeScale(d.runtime)
						}))
					)
				]));

				return data.map((d) => {
					const center = {
						x: mediumScale(getMedium(d.medium)),
						y: height * 0.5
					};

					const position = packings.get(getMedium(d.medium)).find((e) => e.imdbId === d.imdbId && e.date === d.date);

					return {
						...d,
						x: center.x + position.x,
						y: center.y + position.y,
						width: position.r * 1.6,
						height: position.r * 1.6
					};
				});
			case 'origin-country':
				return data.map((d) => {
					const circle = circles.find((e) => e.country === d.country);
					return {
						...d,
						x: circle.x,
						y: circle.y,
						width: 0,
						height: 0
					};
				});
			case 'female-directors':
				const malePacking = packSiblings([
					{
						r: 50
					},
					...data.filter((d) => !d.femaleDirector).map((d) => ({
						...d,
						r: runtimeScale(d.runtime)
					}))
				]);

				const femalePacking = packSiblings(data
					.filter((d) => d.femaleDirector)
					.map((d) => ({
						...d,
						r: runtimeScale(d.runtime)
					}))
				);

				return data.map((d) => {
					const position = (d.femaleDirector ? femalePacking : malePacking)
						.find(({ imdbId, date }) => d.imdbId === imdbId && d.date === date);

					const center = {
						x: width * 0.5 + (d.femaleDirector ? malePacking[0].x : 0),
						y: height * 0.5 + (d.femaleDirector ? malePacking[0].y : 0)
					}

					return {
						...d,
						x: center.x + position.x,
						y: center.y + position.y,
						width: position.r * 1.6,
						height: position.r * 1.6
					};
				});
		}
	}

	$: circles && movies.set(getMetricPositions(metric));

	$: posters && $movies && setTimeout(() => loaded = true, 1000);


	const steps = [
		{
			text: texts.grid.all,
			action: () => category = 'all'
		},
		{
			text: texts.grid.theater,
			action: () => category = 'theater'
		},
		{
			text: texts.grid.festival,
			action: () => category = 'festival'
		},
		{
			text: texts.grid.home,
			action: () => category = 'home' 
		},
		{
			text: texts.grid.top,
			action: () => category = 'top'
		},
		{
			text: texts.grid.rewatch,
			action: () => category = 'rewatch'
		},
		{
			text: texts.grid.discovery,
			action: () => category = 'discovery'
		},
		{
			text: texts.grid.spielberg,
			action: () => category = 'spielberg'
		},
		{
			text: texts.grid.clubEtoile,
			action: () =>  {
				metric = 'grid';
				category = 'clubEtoile';
			}
		},
		{
			text: texts.watchDate,
			action: () => metric = 'watch-date'
		},
		{
			text: texts.releaseDate,
			action: () => metric = 'release-date'
		},
		{
			text: texts.femaleDirectors[0],
			action: () => metric = 'female-directors'
		},
		{
			text: texts.femaleDirectors[1],
			action: () => metric = 'female-directors'
		},
		{
			text: texts.femaleDirectors.slice(2),
			action: () => metric = 'female-directors'
		},
		{
			text: texts.medium,
			action: () => metric = 'medium'
		},
		{
			text: texts.originCountry,
			action: () => metric = 'origin-country'
		},
		{
			text: texts.genres[0],
			action: () => metric = 'genres'
		},
		{
			text: texts.genres[1],
			action: () => metric = 'genres'
		}
	];

	const handleClick = (d) => {
		if (!d.imdbId || metric === 'watch-date') return;
		window.open(`https://imdb.com/title/${d.imdbId}`, '_blank');
	}

	const isHidden = (d, i) => {
		if (metric === 'grid') {
			return $movies.slice(0, i).some((e) => e.imdbId === d.imdbId);
		}
		if (metric === 'watch-date') {
			return $movies.slice(0, i).some((e) => e.date === d.date);
		}
	}
</script>

<Scrolly {steps} {data} bind:active={activeStep}>
	<figure
		bind:clientWidth={width}
		bind:clientHeight={height}
		class={metric}
		style='padding-top: calc(100% * {Math.ceil(data.length / NB_COLS_GRID) / (POSTER_RATIO * NB_COLS_GRID)});'
	>
		<OriginMap data={uniqBy(data, 'imdbId')} visible={metric === 'origin-country'} bind:circles />
		<Genres data={uniqBy(data, 'imdbId')} visible={metric === 'genres'} />
		{#if metric === 'watch-date'}
			<div
				class='legend legend-watch-date'
				style='width: {CELL_SIZE_CALENDAR * 37}px; height: {CELL_SIZE_CALENDAR * 17}px;'
				transition:fade={{ duration: 1000, easing: cubicOut }}
			>
				<div class='top-months'>
					{#each MONTHS.slice(0, 6) as month}
						<h4>{month}</h4>
					{/each}
				</div>
				<div class='bottom-months'>
					{#each MONTHS.slice(6) as month}
						<h4>{month}</h4>
					{/each}
				</div>
				<div class='top-days'>
					{#each DAYS as day}
						<h4>{day}</h4>
					{/each}
				</div>
				<div class='bottom-days'>
					{#each DAYS as day}
						<h4>{day}</h4>
					{/each}
				</div>
			</div>
			<Annotation direction='top'
				x={getDatePosition(new Date('2022-01-28')).x}
				y={getDatePosition(new Date('2022-01-28')).y + CELL_SIZE_CALENDAR * 0.5}
				offset={CELL_SIZE_CALENDAR}
				length='10rem'
			>
				Festival<br />de Gérardmer
			</Annotation>
			<Annotation direction='bottom'
				x={getDatePosition(new Date('2022-02-06')).x}
				y={getDatePosition(new Date('2022-02-06')).y + CELL_SIZE_CALENDAR * 0.5}
				offset={CELL_SIZE_CALENDAR}
				length='18rem'
			>
				Marathon<br />Le Seigneur des Anneaux<br />au Grand Rex
			</Annotation>
		{:else if metric === 'release-date'}
			<Axis {width} {height} padding={PADDING} scale={releaseDateScale} nbTicks={innerWidth / 80} tickTemplate='%Y' />
			<h3 class='legend-axis'>
				Année de sortie
			</h3>
		{:else if metric === 'medium'}
			<div class='legend-medium' transition:fade={{ duration: 1000, easing: cubicOut }}>
				{#each mediumScale.domain() as medium, i}
					<div
						class='legend-medium-annotation'
						class:show-line={data.filter((d) => getMedium(d.medium) === getMedium(medium)).length < 60}
						style='left: {mediumScale.range()[i]}px;'
					>
						{#if sum(data.filter((d) => getMedium(d.medium) === getMedium(medium)), (d) => d.runtime) > 600}
							<h3>{medium} <span class='percentage'>({@html formatPercentage(dataByMedium.get(medium).length / uniqBy(data, 'imdbId').length)})</span></h3>
							<h5>{@html formatTime(sum(data.filter((d) => getMedium(d.medium) === getMedium(medium)), (d) => d.runtime))}</h5>
						{:else}
							<h3>{medium}</h3>
							<h5>({@html formatPercentage(sum(dataByMedium.get(medium), (d) => d.runtime) / sum(uniqBy(data, 'imdbId'), (d) => d.runtime))})</h5>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
		{#if loaded}
			<div class='items' class:active={!showTitle}>
				{#each $movies as d, i}
					<div
						class='item' 
						class:highlighted={isInCategory(d, category)}
						class:hidden={isHidden(d, i)}
						class:female-director={d.femaleDirector}
						style='
							left: {d.x}px;
							top: {d.y}px;
							width: {d.width}px;
							height: {d.height}px;
							opacity: {metric === 'watch-date' ? opacityScale(sum(dataByDate.get(d.date), (d) => d.runtime)) : 'auto'};
						'
						on:mouseenter={() => hovered = (isInCategory(d, category) || metric !== 'grid') && d}
						on:mouseleave={() => hovered = null}
						on:click={() => handleClick(d)}
					>
						<img
							class='poster'
							class:visible={metric === 'grid'}
							src={posters.get(d.imdbId || d.title).src}
							alt={d.title}
							on:error|preventDefault={(e) => e.target.style.visibility = 'hidden'} />
					</div>
				{/each}
			</div>
			{#if hovered}
				<Tooltip
					{width}
					x={hovered.x + (metric === 'grid' ? posterWidth * 0.5 : 0)}
					y={hovered.y + (metric === 'grid' ? posterHeight * 0.5 : 0)}
				>
					{#if metric === 'watch-date'}
						<h3>{new Date(hovered.date).toLocaleDateString('fr-FR')}</h3>
						{#if dataByDate.get(hovered.date).length > 2}
							<h4>{dataByDate.get(hovered.date).length} films</h4>
						{:else}
							<h5>{@html formatList(dataByDate.get(hovered.date).map((d) => d.title))}</h5>
						{/if}
						<p class='duration'>
							{formatDuration(sum(dataByDate.get(hovered.date), (d) => d.runtime))}
						</p>
					{:else if metric === 'female-directors'}
						<h3>{@html typografix(hovered.title)}</h3>
						<h5>{hovered.country}, {hovered.year}</h5>
						<p class='director'>
							réal.
							{@html formatList(hovered.directors)}
						</p>
					{:else if metric === 'medium'}
						<h3>{@html typografix(hovered.title)}</h3>
						<h5>{hovered.country}, {hovered.year}</h5>
						<p class='duration'>
							{formatDuration(hovered.runtime)}
						</p>
					{:else}
						<h3>{@html typografix(hovered.title)}</h3>
						<h5>{hovered.country}, {hovered.year}</h5>
						<p class='watched-on'>
							<i class='fi fi-eye'></i>
							{@html formatList(data.filter((d) => d.imdbId === hovered.imdbId).map((d) => new Date(d.date)), { dates: true })}
						</p>
					{/if}
				</Tooltip>
			{/if}
		{/if}
		{#if showTitle}
			<div class='title-block' transition:fade={{ duration: 1000, easing: cubicOut }}>
				<h1>2022</h1>
				<h2>Une année de cinéma</h2>
				<h4>par Tom Février</h4>
				<div class='scroll-cue'>
					<div class='arrow'></div>
					<div class='arrow'></div>
					<div class='arrow'></div>
				</div>
			</div>
		{/if}
	</figure>
</Scrolly>

<style lang='scss'>
	figure {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		margin: 0;
		transition: all $animation-duration $animation-timing-function;

		.title-block {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: radial-gradient(closest-side, rgba(#333, 0.9), transparent 70%);
			color: white;

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			h1, h2, h4 {
				text-align: center;
				margin: 0;
			}

			h1 {
				font-size: 8rem;
				line-height: 100% !important;
			}

			h2 {
				font-size: 2rem;
			}

			h4 {
				margin: 1.5rem 0 1rem;
			}

			.scroll-cue {
				@keyframes scroll {
					0% {
						opacity: 0;
					}
					50% {
						opacity: 0.5;
					}
					100% {
						opacity: 1;
					}
				}

				.arrow {
					display: block;
					transform: rotate(45deg);
	   
					border-right: 3px solid white;
					border-bottom: 3px solid white;
	  
					width: 1.5rem;
					height: 1.5rem;
					margin-top: -0.25rem;

					@for $i from 1 through 3 {
						&:nth-child(#{$i}) {
							animation: scroll 1s alternate infinite #{($i - 1) * 0.1}s;
						}
					}
				}
			}
		}

		.items {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;

			&.active > * {
				pointer-events: auto;
			}
		}

		.item {
			position: absolute;
			overflow: hidden;
			background-color: $main-color;
			transition:
				border-radius $animation-duration $animation-timing-function,
				opacity $animation-duration $animation-timing-function
				background-color $animation-duration $animation-timing-function;

			&:hover {
				z-index: 101;
			}

			.poster {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				opacity: 0;
				transition: opacity $animation-duration $animation-timing-function;

				&.visible {
					opacity: 1;
				}
			}
		}

		&:not(.watch-date) .item {
			opacity: 1 !important;
		}

		&.grid {
			.item {
				width: 100%;
				opacity: 0.2 !important;
				transition: opacity $animation-duration $animation-timing-function;
				pointer-events: none;

				&.highlighted {
					opacity: 1 !important;
					pointer-events: all;
					cursor: pointer;
					transition:
						transform 0.2s ease-in-out,
						opacity $animation-duration $animation-timing-function;

					&:hover {
						transform: scale(1.1);
					}
				}

				&.hidden {
					opacity: 0 !important;
					pointer-events: none;
				}
			}
		}

		&.watch-date {
			.item.hidden {
				opacity: 0 !important;
				pointer-events: none;
			}
		}

		&.watch-date, &.medium, &.origin-country, &.female-directors {
			.item {
				cursor: pointer;
				transform: translate(-50%, -50%);
			}
		}

		&.release-date, &.medium, &.origin-country, &.female-directors {
			.item {
				&:hover  {
					background-color: black !important;
				}
			}
		}

		&.medium, &.origin-country, &.female-directors {
			.item {
				border-radius: 50%;
			}
		}

		&.female-directors {
			.item:not(.female-director) {
				background-color: lighten($main-color, 40%);
			}
		}

		&.release-date {
			.item {
				cursor: pointer;
				transform: translateX(-50%);
			}
		}

		&.origin-country, &.genres {
			.items {
				pointer-events: none;
			}
		}

		.legend {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.legend-watch-date {
			.top-months, .bottom-months {
				position: absolute;
				left: 0;
				width: 100%;
				display: grid;
				grid-template-columns: repeat(6, 1fr);
				transform: translateY(calc(-100% - 0.5rem));

				h4 {
					text-align: center;
				}
			}

			.top-months {
				top: 0;
			}

			.bottom-months {
				top: calc(10 / 17 * 100%);
			}

			.top-days, .bottom-days {
				position: absolute;
				left: 0;
				transform: translateX(calc(-100% - 0.5rem));
				height: calc(7 / 17 * 100%);
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				h4 {
					margin: 0;
				}
			}

			.top-days {
				top: 0;
			}

			.bottom-days {
				bottom: 0;
			}
		}

		.legend-axis {
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			margin: 0;
		}

		.legend-medium {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.legend-medium-annotation {
				position: absolute;
				transform: translateX(-50%);

				display: flex;
				flex-direction: column;
				align-items: center;

				&::before {
					content: '';
					width: 2px;
					height: 8rem;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					background: lightgrey;
					opacity: 0;
					border-radius: 1px;
				}

				&.show-line::before {
					opacity: 1;
				}

				&:nth-child(2n+1) {
					bottom: calc(50% + 8rem);

					&::before {
						top: 100%;
					}
				}

				&:nth-child(2n) {
					top: calc(50% + 8rem);

					&::before {
						bottom: 100%;
					}
				}

				h3 {
					.percentage {
						font: 1.1rem 'Mada', sans-serif;
					}
					margin: 0;
				}
			}
		}

		.watched-on, .duration, .director {
			font-size: 0.9rem;
			color: darkgrey;
			margin-top: 0.25rem;

			.fi {
				font-size: 0.8rem;
				margin-right: 2px;
			}
		}
	}
</style>
