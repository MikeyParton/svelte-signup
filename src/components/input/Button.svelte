<script lang="ts">
	import { fly, slide } from 'svelte/transition';
	import Spinner from '../Spinner.svelte';

	export let href: string = '';
	export let title: string;
	export let isLoading: boolean = false;
	export let disabled: boolean = false;
	export let type: 'button' | 'submit' = 'button';
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	role={href ? 'link' : 'button'}
	class="button"
	class:button--loading={isLoading}
	class:button--disabled={disabled}
	{disabled}
	{href}
	{type}
	on:click
>
	{#if isLoading}
		<div class="adornment__container" transition:slide={{ axis: 'x' }}>
			<div transition:fly={{ x: 20 }} class="adornment__content">
				<Spinner color="white" />
			</div>
		</div>
	{/if}
	{title}
</svelte:element>

<style>
	.button {
		@mixin text-m;
		font-weight: var(--weight-black);
		color: white;
		width: 100%;
		border: none;
		cursor: pointer;
		padding: 12px;
		border-radius: 23px;
		background-color: var(--brand-blue);
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}

	.button--disabled {
		cursor: not-allowed;
		background-color: var(--disabled);
	}

	.button--disabled.button--loading {
		background-color: var(--brand-blue);
	}

	.adornment__container {
		overflow: hidden;
	}

	.adornment__content {
		height: 20px;
		width: 20px;
		margin-right: 8px;
		overflow: hidden;
	}
</style>
