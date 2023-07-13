<script lang="ts">
	import InputText, { type InputTextProps, type InputTextEvents } from './InputText.svelte';

	type InputPasswordProps = Omit<InputTextProps, 'type'>;
	type $$Props = InputPasswordProps;
	type $$Events = InputTextEvents;
	export let name: InputPasswordProps['name'];
	export let disabled: InputPasswordProps['disabled'] = false;

	let isVisible = false;

	const toggleVisibility = () => {
		isVisible = !isVisible;
	};
</script>

<InputText
	{name}
	{disabled}
	type={isVisible ? 'text' : 'password'}
	on:blur
	on:focus
	on:update
	{...$$restProps}
>
	<button
		type="button"
		slot="endAdornment"
		class="button"
		aria-label="Show password"
		on:click={toggleVisibility}
		{disabled}
	>
		<div class="visibilty" class:visibilty--visible={isVisible} />
	</button>
</InputText>

<style>
	.button {
		cursor: pointer;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		background-color: transparent;
		border: none;
	}

	.button:disabled {
		cursor: not-allowed;
	}

	.visibilty {
		@mixin icon visibility, grey;
		height: 100%;
		width: 100%;
	}

	.visibilty--visible {
		background-color: var(--brand-blue);
	}
</style>
