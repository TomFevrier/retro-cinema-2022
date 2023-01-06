<script>
	import { fade } from 'svelte/transition';

	export let loaded = false;

	$: loaded && (document.body.style.overflow = 'auto');
</script>

{#if !loaded}
	<div class='loading-screen' transition:fade>
		<div class='clapperboard'>
			<h3>Chargement en cours...</h3>
		</div>
	</div>
{/if}

<style lang='scss'>
	@import '../global.scss';

	:global(body) {
		overflow: hidden;
	}

	.loading-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: radial-gradient(circle at center, $main-color, darken($main-color, 20%));
		z-index: 1111;

		.clapperboard {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 8rem;
			height: 5.5rem;
			transform: translate(-50%, -50%);
			background-color: #303030;

			h3 {
				font: bold 1rem 'Arial';
				color: white;
				text-align: center;
				line-height: 100%;
				position: absolute;
				top: calc(50% + 0.5rem);
				left: 50%;
				transform: translate(-50%, -50%);
			}
		
			&::before {
				content: '';
				position: absolute;
				bottom: 100%;
				width: 100%;
				height: 1rem;
				background: repeating-linear-gradient(
					45deg,
					#303030,
					#303030 9.2px,
					white 9.2px,
					white 18.4px
				);
				transform-origin: bottom left;
				animation: clap 1.5s ease-in-out infinite;
			}

			&::after {
				content: '';
				position: absolute;
				top: 0;
				width: 100%;
				height: 1rem;
				background: repeating-linear-gradient(
					-45deg,
					#303030,
					#303030 9.2px,
					white 9.2px,
					white 18.4px
				);
			}
		}
	}

	@keyframes clap {
		0% {
			transform: rotate(0);
		}
		30% {
			transform: rotate(-20deg);
		}
		50% {
			transform: rotate(-20deg);
		}
		60% {
			transform: rotate(0);
		}
	}
</style>