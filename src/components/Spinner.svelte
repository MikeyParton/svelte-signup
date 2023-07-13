<script lang="ts">
	export let color: string = 'var(--brand-blue)';
</script>

<div class="spinner" style="--color: {color}" />

<style>
	.spinner {
		@mixin icon spinner, var(--color);
		animation: -global-spin 1s infinite linear;
		width: 100%;
		height: 100%;
	}
</style>
