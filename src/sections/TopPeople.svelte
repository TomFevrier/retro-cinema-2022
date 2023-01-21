<script>
	import TopContainer from './TopContainer.svelte';
	
	export let data;
	export let posters;

	const topDirectors = ['Steven Spielberg', 'Wes Craven', 'Edgar Wright', 'Sion Sono', 'Baz Luhrmann', 'Hideo Nakata']
		.map((director) => {
			return [director, data.filter((d) => d.directors.includes(director))];
		});

	const topActors = ['Cate Blanchett', 'Ted Grossman', 'John Rhys-Davies', 'Andy Serkis', 'Keegan-Michael Key', 'Chris Pratt']
		.map((actor) => {
			return [actor, data.filter((d) => d.actors.includes(actor))];
		});
</script>

{#if posters}
	<div class='top-people-wrapper'>
		<TopContainer c='top-directors' style='flex: 1;'>
			<h2>Top cinéastes de 2022</h2>
			{#each topDirectors.slice(0, 10) as [director, movies]}
				<div class='card'>
					<img class='portrait' src='people/{director.replace(/\s/g, '-')}.jpg' />
					<div class='content'>
						<h3>{director}</h3>
						<div class='movies'>
							{#each movies as movie}
								<a href='https://imdb.com/title/{movie.imdbId}'>
									<div class='poster'>
										<img src={posters.get(movie.imdbId || movie.title).src} />
									</div>
								</a>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</TopContainer>
		<TopContainer c='top-actors' style='flex: 1;'>
			<h2>Top interprètes de 2022</h2>
			{#each topActors.slice(0, 10) as [actor, movies]}
				<div class='card'>
					<img class='portrait' src='people/{actor.replace(/\s/g, '-')}.jpg' />
					<div class='content'>
						<h3>{actor}</h3>
						<div class='movies'>
							{#each movies as movie}
								<a href='https://imdb.com/title/{movie.imdbId}'>
									<div class='poster'>
										<img src={posters.get(movie.imdbId || movie.title).src} />
									</div>
								</a>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</TopContainer>
	</div>
{/if}

<style lang='scss'>
	.top-people-wrapper {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;

		@include lg {
			flex-direction: column;
		}

		h2 {
			margin-bottom: 0.5rem;
			text-align: left;
		}

		.card {
			display: flex;
			align-items: flex-start;
			width: 100%;
			margin: 1rem auto;

			.portrait {
				display: block;
				border-radius: 50%;
				width: 6rem;
				// aspect-ratio: 1;
			}

			.content {
				margin-left: 1rem;

				h3 {
					margin-top: 0;
				}

				.movies {
					display: flex;
					flex-wrap: wrap;
					max-width: 20rem;

					.poster {
						width: 2.5rem;
						// aspect-ratio: 2/3;
						padding-top: 150%;
						transition: transform 0.2s ease-in-out;
						position: relative;

						@include sm {
							width: 2rem;
						}

						&:nth-child(n + 1) {
							margin-left: 0.25rem;
						}

						&:hover {
							z-index: 101;
							transform: scale(1.1);
						}

						img {
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
						
					}
				}
			}

			@include sm {
				flex-direction: column;
				align-items: center;

				h3 {
					text-align: center;
				}

				.content {
					margin: 0;
				}
			}
		}
	}
</style>
