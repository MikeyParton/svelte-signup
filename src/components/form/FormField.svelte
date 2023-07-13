<script lang="ts">
	import { onMount, onDestroy, type ComponentType, SvelteComponent } from 'svelte';
	import { getFormStore } from '../../stores/formStore';
	import { fly, slide } from 'svelte/transition';

	type PropsRequiredForComponent = $$Generic<Record<string, any>>;
	type EventsRequiredForComponent = $$Generic<Record<string, any>>;
	type ComponentInstance = SvelteComponent<
		PropsRequiredForComponent,
		EventsRequiredForComponent & FormFieldEvents
	> & { getDefaultValue?: () => any };
	type ComponentConstructor = ComponentType<ComponentInstance>;
	type $$Props = PropsRequiredForComponent & {
		component: ComponentConstructor;
		name: string;
		validations?: ValidationConfig;
	};

	export let component: ComponentType;
	export let name: string;

	let form = getFormStore();
	let input: ComponentInstance;

	onMount(() => {
		form.registerField({
			name,
			value: input.getDefaultValue?.(),
			...$$restProps
		});
	});

	onDestroy(() => {
		form.removeField(name);
	});

	const handleFocus = (event: any) => {
		form.updateField(name, { isFocused: true });
	};

	const handleBlur = (event: any) => {
		form.updateField(name, { isFocused: false });
		// Validation mode is set to blur.
		// This may be changed in the future
		// Each field also has access to its isFocused state
		// so we can have nicer behaviour than just onBlur/onChange for certain validations
		form.validateField(name);
	};

	const handleUpdate = (event: FormFieldEvents['update']) => {
		const value = event.detail.value;
		form.updateField(name, { value, isValid: false });
		// Workaround to validate radio options on update.
		// This may be changed in the future as we add more components.
		if (Array.isArray($$restProps.options) || typeof value === 'boolean') {
			form.validateField(name);
		}
	};

	$: field = $form.fields[name];
	$: feedback = field?.feedback;
	$: value = field?.value;
</script>

<div class="field">
	<svelte:component
		this={component}
		bind:this={input}
		isError={feedback?.isError}
		disabled={$form.isSubmitting}
		isValidating={!$form.isSubmitting && field?.isValidating}
		on:update={handleUpdate}
		on:focus={handleFocus}
		on:blur={handleBlur}
		{name}
		{value}
		{...$$restProps}
	/>
	{#if feedback}
		<div transition:slide class="feedback__container">
			<div
				transition:fly={{ y: -20 }}
				class="feedback__content"
				class:feedback__content--error={feedback.isError}
			>
				{feedback.message}
			</div>
		</div>
	{/if}
</div>

<style>
	.field {
		margin-bottom: 8px;
		width: 100%;
	}

	.feedback__container {
		overflow: hidden;
	}

	.feedback__content {
		@mixin text-xs;
		font-weight: var(--weight-medium);
	}

	.feedback__content--error {
		color: var(--error);
	}
</style>
