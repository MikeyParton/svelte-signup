<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Button from '../input/Button.svelte';
	import { getFormStore } from '../../stores/formStore';

	type $$Props = Omit<ComponentProps<Button>, 'isLoading' | 'disabled'>;

	export let title: $$Props['title'];
	let form = getFormStore();
</script>

<Button
	{title}
	{...$$props}
	isLoading={$form.isSubmitting}
	disabled={$form.isSubmitting || !$form.isValid}
/>
