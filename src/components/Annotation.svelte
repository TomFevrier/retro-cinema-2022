<script>
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let x;
	export let y;
</script>

<div
	class='annotation'
	style='left: {x}px; top: {y}px;'
	in:fade={{ duration: 800, easing: cubicOut, delay: 1000 }}
	out:fade={{ duration: 800, easing: cubicOut }}
>
	<img src='arrow.svg' />
	<span class='content'>
		<slot />
	</span>
</div>

<style lang='scss'>
	.annotation {
		position: absolute;
		transform: translateX(-0.3rem);

		img {
			width: 6rem;
		}

		.content {
			position: absolute;
			top: 100%;
			left: 6rem;
			transform: translate(0.25rem, -50%);
			white-space: nowrap;

			color: darkgrey;
			font-size: 0.9rem;
			line-height: 110%;
		}
	}
</style>