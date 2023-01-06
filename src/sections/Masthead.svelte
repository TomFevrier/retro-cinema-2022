<script>
	import { typografix } from '../utils';

	import texts from '../texts';
</script>

<div class='masthead'>
	{#each texts.masthead as section}
		<div class='section'>
			{#if section.title}
				<p class='title'>{@html typografix(section.title)}</p>
				{#each Array.isArray(section.content) ? section.content : [section.content] as p}
					<h3>{@html typografix(p)}</h3>
				{/each}
			{:else}
				{#each Array.isArray(section.content) ? section.content : [section.content] as p}
					<p>{@html typografix(p)}</p>
				{/each}
			{/if}
		</div>
	{/each}
</div>

<style lang='scss'>
	.masthead {
		width: 100%;
		max-width: 24rem;
		padding: 1rem;
		margin: 2rem auto;

		border: 2px solid #333;
		box-shadow: 0.25rem 0.25rem #333;

		display: flex;
		flex-direction: column;
		align-items: center;

		text-align: center;

		.title {
			margin: 0;
			font-weight: bold;
		}

		h3 {
			margin: 0;
		}

		p {
			margin: 0.5rem 0;
		}

		& > * + * {
			margin-top: 1rem;
		}

	}
</style>