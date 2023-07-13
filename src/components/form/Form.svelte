<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { createFormStore } from '../../stores/formStore';
	import { getWizard } from '../../stores/wizardStore';

	export let name: string;
	export let heading: string = '';
	export let debug = false;

	let wizard = getWizard();
	const form = createFormStore($wizard[name]);
	const dispatch = createEventDispatcher();

	const handleSubmit = () => {
		form.submit().then((values) => {
			$wizard[name] = values;
			dispatch('submit', { name, values });
		});
	};

	onDestroy(() => {
		$wizard[name] = form.getValues();
	});
</script>

<form {name} on:submit|preventDefault={handleSubmit} novalidate>
	{#if heading}
		<h1>{heading}</h1>
	{/if}
	<slot />
</form>

{#if debug}
	<pre>{JSON.stringify(
			$form,
			function (_key, val) {
				if (typeof val === 'function') {
					return 'fn';
				}
				return val;
			},
			4
		)}</pre>
{/if}

<style>
	h1 {
		@mixin text-xl;
		font-weight: var(--weight-bold);
		margin: 0 0 8px;
		text-align: center;
	}
</style>
