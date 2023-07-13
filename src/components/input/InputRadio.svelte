<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface InputRadioProps {
		name: string;
		id?: string;
		label?: string;
		disabled?: boolean;
		value?: InputRadioOption['value'];
		options: InputRadioOption[];
	}

	type InputRadioOption = {
		value: string;
		label: string;
	};

	type $$Props = InputRadioProps;
	type $$Events = FormFieldEvents;

	export let name: $$Props['name'];
	export let label: $$Props['label'] = '';
	export let options: $$Props['options'];
	export let disabled: $$Props['disabled'] = false;
	export function getDefaultValue() {
		return options?.[0]?.value;
	}
	export let value: $$Props['value'] = getDefaultValue();

	const dispatch = createEventDispatcher();
	const handleChecked = (event: Event) =>
		dispatch('update', { value: (event.target as HTMLInputElement).value });
</script>

<div class="root">
	{#each options as option}
		<label class="option" class:option--disabled={disabled}>
			<input
				{name}
				{disabled}
				class="option__input"
				type="radio"
				value={option.value}
				checked={option.value === value}
				on:change={handleChecked}
			/>
			<div class="option__fake_input" />
			<div class="option__label">{option.label}</div>
		</label>
	{/each}
</div>

<style>
	.root {
		display: flex;
	}

	.option {
		margin-right: 40px;
		cursor: pointer;
		display: flex;
		align-items: center;
		user-select: none;
	}

	.option--disabled {
		cursor: not-allowed;
	}

	.option__label {
		@mixin text-m;
		font-weight: var(--weight-medium);
	}

	.option__input {
		opacity: 0;
		width: 0;
		margin: 0;
	}

	.option__fake_input {
		position: relative;
		height: 20px;
		width: 20px;
		border-radius: 50%;
		margin-right: 11px;
		box-sizing: border-box;
		border: 2px solid rgba(140, 140, 140, 1);
	}

	.option__input:focus ~ .option__fake_input {
		box-shadow: 0 0 4px 0 #4595f5, inset 0 0 4px 0 #4595f5;
	}

	.option__input:focus ~ .option__fake_input,
	.option__input:checked ~ .option__fake_input {
		border: 2px solid var(--brand-blue);
	}

	.option__input:checked ~ .option__fake_input::after {
		position: absolute;
		content: '';
		height: 10px;
		width: 10px;
		border-radius: 50%;
		background-color: var(--brand-blue);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
