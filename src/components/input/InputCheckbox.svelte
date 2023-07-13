<script context="module" lang="ts">
	export interface InputCheckboxProps extends FormFieldInjectedProps {
		name: string;
		label: string;
		disabled?: boolean;
		value?: boolean;
		required?: boolean;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type $$Props = InputCheckboxProps;

	export let name: $$Props['name'];
	export let value: $$Props['value'] = getDefaultValue();
	export let label: $$Props['label'];
	export let disabled: $$Props['disabled'] = false;

	export function getDefaultValue() {
		return false;
	}

	const dispatch = createEventDispatcher();
	const handleUpdate = (event: Event) => {
		dispatch('update', { value: (event.target as HTMLInputElement).checked });
	};
</script>

<label class="container" class:container--disabled={disabled}>
	<input {name} checked={value} {disabled} on:change={handleUpdate} type="checkbox" />
	<div class="box">
		{#if value}
			<div class="tick" />
		{/if}
	</div>
	<div class="label">
		{label}
	</div>
</label>

<style>
	.container {
		display: flex;
		cursor: pointer;
		align-items: center;
	}

	.container--disabled {
		cursor: not-allowed;
	}

	.box {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 18px;
		width: 18px;
		border-radius: 4px;
		border: 2px solid rgba(140, 140, 140, 1);
		flex-shrink: 0;
	}

	.label {
		@mixin text-m;
		font-weight: var(--weight-medium);
		margin-left: 13px;
		color: black;
		user-select: none;
	}

	input {
		opacity: 0;
		height: 0;
		width: 0;
		margin: 0;
		appearance: none;
	}

	input:focus ~ .box,
	input:checked ~ .box {
		border-color: var(--brand-blue);
	}

	input:focus ~ .box {
		box-shadow: 0 0 4px 0 #4595f5, inset 0 0 4px 0 #4595f5;
	}

	input:checked ~ .box {
		background-color: var(--brand-blue);
	}

	.tick {
		@mixin icon tick, white;
		width: 17px;
		height: 17px;
	}
</style>
