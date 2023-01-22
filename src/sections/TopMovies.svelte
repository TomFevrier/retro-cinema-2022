<script>
	import TopContainer from './TopContainer.svelte';

	import { formatList, typografix } from '../utils';

	import texts from '../texts';

	export let data;
	
	const topMovies = texts.topMovies.map((movie) => ({
		...data.find((d) => d.imdbId === movie.imdbId),
		...movie
	}));
</script>

<TopContainer c='top-movies' style='width:100%; max-width: 64rem;'>
	<h2>Top 10 de 2022</h2>
	{#each topMovies as movie, i}
		<div class='card'>
			<div class='wrapper'>
				<h3>{10 - i}. {@html typografix(movie.title)}</h3>
				<h4>réal. {@html movie.director || formatList(movie.directors)}</h4>
				<img src='stills/{movie.imdbId}.jpg' alt='' />
			</div>
			<div class='content'>
				<div class='quote'>
					<span>{@html typografix(movie.quote)}</span>
				</div>
				<div class='review'>
					{#each (Array.isArray(movie.review) ? movie.review : [movie.review]) as p}
						<p>{@html typografix(p)}</p>
					{/each}
				</div>
			</div>
			{#if movie.more}
				<div class='more'>
					{#each (Array.isArray(movie.more) ? movie.more : [movie.more]) as p}
						<p>{@html typografix(p)}</p>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</TopContainer>

<style lang='scss'>
	h2 {
		margin-bottom: 0.5rem;
		text-align: left;
	}

	.card {
		display: flex;
		align-items: flex-end;
		flex-wrap: wrap;
		width: 100%;
		margin: 1rem 0;

		.wrapper {
			flex: 5;

			img {
				margin-top: 0.5rem;
				width: 100%;
			}
		}

		.content {
			flex: 3;
			margin-left: 1rem;
			// display: flex;
			// flex-direction: column;

			p {
				font-size: 1rem;
				margin: 0.5rem 0;
			}

			.quote {
				max-width: 90%;
				width: 15rem;
				padding: 1rem;
				position: relative;
				margin-bottom: 1rem;

				display: flex;
				justify-content: center;
				align-items: center;

				span {
					// display: table;
					font: italic 1rem 'Lora', serif;
					color: darkgray;
					width: fit-content;
					flex-grow: 0;
				}

				&::before {
					content: '';
					display: block;
					width: 0.75rem;
					height: 0.75rem;
					position: absolute;
					top: 0;
					left: 0;
					border-top: 2px solid $main-color;
					border-left: 2px solid $main-color;
				}

				&::after {
					content: '';
					display: block;
					width: 0.75rem;
					height: 0.75rem;
					position: absolute;
					bottom: 0;
					right: 0;
					border-bottom: 2px solid $main-color;
					border-right: 2px solid $main-color;
				}
			}
		}

		.more {
			width: 100%;
			margin-top: 0.25rem;

			p {
				max-width: 600px;
			}
		}

		@include lg {
			flex-direction: column;

			.content {
				margin-left: 0;
				margin-top: 0.5rem;
				// flex-direction: column-reverse;
			}

			.more {
				margin-top: -0.25rem;
				
				p {
					max-width: none !important;
				}
			}
		}
	}
</style>
