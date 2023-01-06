<script>
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	import { formatString } from '../utils';

	export let steps = [];
	export let data;
	export let active;
	export let style = '';

	let container;

	const dispatch = createEventDispatcher();

	const intersectionObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const index = +entry.target.dataset.index;
				dispatch('enter', {
					target: entry.target,
					index: index,
					direction: entry.boundingClientRect.top > entry.target.clientHeight ? 'up' : 'down'
				});
				active = steps[index];
			}
		});
	}, { threshold: 1.0 });

	onMount(() => {
		container.querySelectorAll('.step').forEach(e => intersectionObserver.observe(e));
		
	});

	// document.fonts.addEventListener('loadingdone', () => {
	// 	setTimeout(() => balanceText, 10000);
	// });

	onDestroy(() => {
		container.querySelectorAll('.step').forEach(e => intersectionObserver.unobserve(e));
	});
</script>

<div class='scrolly'>
	<div class='background'>
		<slot></slot>
	</div>
	<div class='steps' bind:this={container}>
		{#each steps as step, i}
			<div class='step' {style} data-index={i}>
				{#each Array.isArray(step.text) ? step.text : [step.text] as p}
					<p class='balance-text'>{@html formatString(p, data)}</p>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang='scss'>
	.background {
		position: sticky;
		width: 100%;
		height: 100vh;
		top: 0;
	}

	.steps {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		z-index: 42;
		pointer-events: none;

		.step {
			width: 80%;
			max-width: 24rem;
			padding: 1rem;
			margin-bottom: 100vh;
			border: 2px solid #333;
			background: white;
			pointer-events: all;
			text-align: center;

			&:first-child {
				margin-top: 100vh;
			}

			p {
				font-size: 1.1rem;
				margin: 0.5rem 0;
			}
		}
	}
</style>
