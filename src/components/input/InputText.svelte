<script context="module" lang="ts">
	export interface InputTextProps extends FormFieldInjectedProps {
		name: string;
		id?: string;
		label?: string;
		disabled?: boolean;
		type?: 'text' | 'password' | 'email';
		value?: string;
		placeholder?: string;
		minLength?: number;
		autocomplete?: string;
		required?: boolean;
	}

	export interface InputTextEvents extends FormFieldEvents {
		blur: Event;
		focus: Event;
	}
</script>

<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import Spinner from '../Spinner.svelte';
	import { createEventDispatcher } from 'svelte';

	type $$Props = InputTextProps;
	type $$Slots = { endAdornment: {} };
	type $$Events = InputTextEvents;

	export let name: InputTextProps['name'];
	export let required: InputTextProps['required'] = undefined;
	export let isError: InputTextProps['isError'] = undefined;
	export let isValidating: InputTextProps['isValidating'] = undefined;
	export let label: InputTextProps['label'] = undefined;
	export let id: InputTextProps['id'] = undefined;
	export let disabled: InputTextProps['disabled'] = false;
	export let type: InputTextProps['type'] = 'text';
	export let value: InputTextProps['value'] = '';
	export let placeholder: InputTextProps['placeholder'] = undefined;
	export let autocomplete: InputTextProps['autocomplete'] = undefined;

	const dispatch = createEventDispatcher();

	const handleInput = (event: Event) =>
		dispatch('update', { value: (event.target as HTMLInputElement).value });
</script>

<div
	class="root"
	class:root--error={isError}
	class:root--disabled={disabled}
	class:root--filled={!!value}
>
	<div class="container">
		<input
			class="input"
			{id}
			{name}
			{type}
			{disabled}
			{value}
			{placeholder}
			on:input={handleInput}
			on:blur
			on:focus
			{autocomplete}
			spellcheck="false"
			aria-label={label}
			aria-invalid={!!isError}
			aria-required={required}
			aria-disabled={disabled}
		/>
		{#if label}
			<label for={name} class="label">
				{label}
			</label>
		{/if}
	</div>
	{#if $$slots.endAdornment}
		<div class="adornment__container">
			<div class="adornment__content">
				<slot name="endAdornment" />
			</div>
		</div>
	{/if}
	{#if isValidating}
		<div transition:fade class="adornment__content">
			<Spinner />
		</div>
	{/if}
</div>

<style>
	.root {
		display: flex;
		align-items: center;
		height: 48px;
		background-color: rgb(233, 233, 233);
		border-radius: 8px;
		position: relative;
		overflow: hidden;
		border-color: transparent;
		border-style: solid;
		border-width: 1px;
	}

	.root:focus-within {
		border-color: var(--brand-blue);
	}

	.container {
		height: 100%;
		width: 100%;
		flex-grow: 1;
		flex-shrink: 1;
		position: relative;
		overflow: hidden;
	}

	.input,
	.label {
		@mixin text-m;
		font-weight: var(--weight-medium);
	}

	.input {
		padding: 18px 15px 4px;
		color: var(--colour-darkest-grey);
		border: none;
		background-color: transparent;
		width: 100%;
		caret-color: var(--brand-blue);
	}

	.input:focus {
		outline: none;
	}

	.input::placeholder {
		color: rgba(38, 38, 38, 0.25);
		opacity: 0;
		transition: opacity linear 0.2s;
	}

	.input:focus::placeholder {
		opacity: 1;
	}

	/* Kludge: override autofill background color https://stackoverflow.com/a/62624824 */
	.input:-webkit-autofill,
	.input:-webkit-autofill:hover,
	.input:-webkit-autofill:focus,
	.input:-webkit-autofill:active {
		-webkit-background-clip: text;
	}

	.label {
		z-index: 2;
		position: absolute;
		pointer-events: none;
		top: 12px;
		left: 15px;
		right: 15px;
		color: rgba(20, 20, 20, 0.75);
		height: 28px;
		transition: all linear 0.2s;
		transition-property: top, font-size, height, border-color;
	}

	.root:focus-within .label,
	.root--filled .label {
		color: var(--brand-blue);
		top: 7px;
		font-size: 14px;
		line-height: 10px;
		height: 10px;
	}

	.root--error,
	.root--error:focus-within {
		border-color: var(--error);
	}

	.root--error .input {
		caret-color: var(--error);
	}

	.root--error:focus-within .label,
	.root--filled.root--error .label {
		color: var(--error);
	}

	.root--disabled,
	.root--disabled .input {
		background-color: rgba(196, 196, 196, 1);
	}

	.root--disabled .input,
	.root--disabled .label {
		cursor: not-allowed;
		color: rgba(38, 38, 38, 1);
	}

	.adornment__container {
		overflow: hidden;
	}

	.adornment__content {
		height: 20px;
		width: 20px;
		margin-right: 15px;
		flex-shrink: 0;
		overflow: hidden;
	}
</style>
