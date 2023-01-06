<script>
	// import { csv } from 'd3-fetch';
	// import { autoType } from 'd3-dsv';
	// import { onMount } from 'svelte';

	// onMount(async () => {
	// 	const data = await csv('movies.csv', autoType);
		
	// 	console.log(data.map((d) => ({
	// 		date: d.date.toISOString().split('T')[0],
	// 		imdbId: d.imdbId,
	// 		title: d.title,
	// 		year: d.year,
	// 		runtime: d.runtime,
	// 		country: d.country,
	// 		...(d.directors.includes(',')
	// 			? { directors: d.directors.split(',') }
	// 			: { director: d.directors }
	// 		),
	// 		actors: d.actors.split(','),
	// 		genres: d.genres.split(','),
	// 		medium: d.medium,
	// 		rewatch: d.rewatch === 'X',
	// 		womenDirector: d.womenDirector === 'X',
	// 		comment: d.comment
	// 	})))
	// });

	import { uniqBy } from 'lodash-es';

	import { LoadingScreen } from './components';
	import { ScrollyStory, TopPeople, TopMovies, Masthead } from './sections';

	import data from './data';
	import texts from './texts';
	import { preloadPosters, formatString } from './utils';

	let windowWidth;
	$: mobile = windowWidth < 1024;

	let posters;
	preloadPosters(data).then((images) => posters = images);

	let loaded = false;
	$: posters && setTimeout(() => loaded = true, 500);
</script>

<svelte:window bind:innerWidth={windowWidth} />
<LoadingScreen {loaded} />
{#if mobile}
	<header class='title-block'>
		{#if posters}
			<div class='posters'>
				{#each uniqBy(data, 'imdbId').filter((d) => d.medium.includes('Cinéma') && d.year === 2022).shuffle().slice(0, 60) as movie}
					<div class='poster'>
						<img src={posters.get(movie.imdbId || movie.title).src} />
					</div>
				{/each}
			</div>
		{/if}
		<div class='content'>
			<h1>2022</h1>
			<h2>Une année de cinéma</h2>
			<h4>par Tom Février</h4>
		</div>
	</header>
{/if}
<main>
	{#if mobile}
		<p>{@html formatString(texts.grid.all.join(' '), data)}</p>
		<div class='see-on-pc'>
			<i class='fi fi-laptop'></i>
			<p>Pour découvrir une année de cinéma en infographies, rendez-vous sur un ordinateur !</p>
		</div>
	{:else if windowWidth}
		<ScrollyStory {data} {posters} bind:loaded />
	{/if}
	<TopPeople data={uniqBy(data, 'imdbId')} {posters} />
	<TopMovies data={data.unique('imdbId')} />
	<Masthead />
</main>
<!-- <div style='position: absolute; top: 0; left: 50%; width: 2px; height: 100%; background: black; transform: translateX(-50%);'></div>
<div style='position: absolute; top: 50%; left: 0; height: 2px; width: 100%; background: black; transform: translateY(-50%);'></div> -->

<style lang='scss'>
	@import './global.scss';

	:global(a) {
		color: $main-color;
	}

	.title-block {
		width: 100%;
		padding-top: 62.5%;
		margin-bottom: 2rem;
		position: relative;

		.posters {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			display: grid;
			grid-template-columns: repeat(12, 1fr);

			opacity: 0.2;

			.poster {
				padding-top: 150%;
				position: relative;

				img {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: block;
					object-fit: cover;
				}
			}
		}

		.content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			h1, h2, h4 {
				text-align: center;
				margin: 0;
			}

			h1 {
				font-size: 6rem;
				line-height: 100% !important;
			}

			h2 {
				font-size: 1.5rem;
			}

			h4 {
				margin: 1.5rem 0 1rem;
			}
		}
	}

	main {
		width: 90%;
		max-width: 75rem;
		margin: 0 auto;
		display: flex;
		flex-direction: column;

		p {
			margin: 0.5rem 0;
		}

		.see-on-pc {
			width: 90%;
			max-width: 12rem;
			margin: 1rem auto;

			text-align: center;

			.fi {
				font-size: 4rem;
			}

			p {
				color: darkgrey;
				font-size: 0.9rem;
			}
		}
	}
</style>
