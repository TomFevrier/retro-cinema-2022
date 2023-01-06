<script>
	export let x;
	export let y;
	export let width;

	$: position = y < 100
		? 'top'
		: (x < 100 ? 'left' : (x > width - 100 ? 'right' : 'bottom'));
</script>

<div class='tooltip {position}' style='top: {y}px; left: {x}px;'>
	<slot />
</div>

<style lang='scss'>
	.tooltip {
		position: absolute;
		min-width: 8rem;
		max-width: 12rem;
		padding: 0.5rem;
		background-color: white;
		box-shadow: 0 0.25rem 1rem 0.25rem rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
		z-index: 999;
		pointer-events: none;
		text-align: center;
		transition: all 0.1s ease-out;
		
		&::after {
			content: "";
			position: absolute;
			border-width: 0.5rem;
			border-style: solid;
		}

		&.bottom {
			transform: translate(-50%, calc(-100% - 1rem));

			&::after {
				top: 100%;
				left: 50%;
				transform: translateX(-50%);
				border-color: white transparent transparent transparent;
			}
		}

		&.top {
			transform: translate(-50%, 1rem);

			&::after {
				top: 0;
				left: 50%;
				transform: translate(-50%, -100%);
				border-color: transparent transparent white transparent;
			}
		}

		&.left {
			transform: translate(1rem, -50%);

			&::after {
				top: 50%;
				left: -1rem;
				transform: translateY(-50%);
				border-color: transparent white transparent transparent;
			}
		}

		&.right {
			transform: translate(calc(-100% - 1rem), -50%);

			&::after {
				top: 50%;
				left: 100%;
				transform: translateY(-50%);
				border-color: transparent transparent transparent white;
			}
		}
	}
</style>
