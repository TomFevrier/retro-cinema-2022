<script>
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let x;
	export let y;
	export let direction = 'bottom';
	export let offset = 0;
	export let length = 0;
</script>

<div
	class='annotation {direction}'
	style='--x: {x}px; --y: {y}px; --offset: {offset}px; --length: {length};'
	in:fade={{ duration: 800, easing: cubicOut, delay: 1000 }}
	out:fade={{ duration: 800, easing: cubicOut }}
>
	<span class='content'>
		<slot />
	</span>
</div>

<style lang='scss'>
	.annotation {
		position: absolute;
		z-index: 42;
		left: var(--x);
		top: var(--y);

		&::before {
			content: '';
			width: 2px;
			height: var(--length);
			position: absolute;
			left: 50%;
			top: 2px;
			transform: translateX(-50%);
			background: lightgrey;
			border-radius: 1px;
		}

		.content {
			position: absolute;
			top: 2px;
			left: 50%;
			transform: translate(-50%, var(--length));
			white-space: nowrap;

			color: darkgrey;
			font-size: 0.9rem;
			line-height: 110%;

			text-align: center;
		}

		&.top {
			&::before {
				top: auto;
				bottom: var(--offset);
			}

			.content {
				top: auto;
				bottom: var(--offset);
				transform: translate(-50%, calc(var(--length) * -1));
			}
		}

	
	}
</style>