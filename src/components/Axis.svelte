<script>
	import { getTickFormat } from '../utils';

	export let width;
	export let height;
	export let padding;
	// export let position = 'bottom';
	export let scale;
	export let tickTemplate;
	export let nbTicks;
	// export let grid = false;

	$: tickFormat = getTickFormat(tickTemplate);

	$: ticks = scale.ticks(nbTicks)
        .map(value => ({
            value,
            offset: scale(value)
        }))
        .filter((e, i, array) => {
            if (!(e.value instanceof Date)) return e;
            return e.value.getHours() === 0 && (i === 0 || tickFormat(array[i - 1].value) !== tickFormat(e.value));
        });
</script>

<div class='axis' style='bottom: {padding.bottom}px;'>
	{#each ticks as tick}
		<span class='tick' style='left: {tick.offset}px;'>
			{tickFormat(tick.value)}
		</span>
	{/each}
</div>

<style lang='scss'>
	.axis {
		position: absolute;
		left: 0;

		.tick {
			position: absolute;
			transform: translateX(-50%);
			top: 0.25rem;
		}
	}
</style>