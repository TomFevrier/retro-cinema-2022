<script>
	export let c;
	export let style = '';
</script>

<section class={c} {style}>
	<slot />
</section>

<style lang='scss'>
	section {
		display: flex;
		flex-direction: column;
		padding-left: 1.5rem;
		padding-top: 1rem;
		border-left: 0.25rem solid $main-color;
		position: relative;

		&::before {
			content: '';
			display: block;
			width: 4rem;
			position: absolute;
			top: 0;
			left: 0;
			border-top: 0.25rem solid $main-color;
		}

		margin: 2rem auto;

		@include lg {
			margin: 2rem 0;
		}
	}
</style>
