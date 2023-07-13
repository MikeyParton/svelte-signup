<script lang="ts">
	import Form from '../../components/form/Form.svelte';
	import FormField from '../../components/form/FormField.svelte';
	import FormButton from '../../components/form/FormButton.svelte';
	import InputRadio from '../../components/input/InputRadio.svelte';
	import { goto } from '$app/navigation';

	const handleSubmit = () => {
		goto('/payment');
	};
</script>

<Form name="tiers" on:submit={handleSubmit} heading="Select a Tier">
	<FormField
		name="tier"
		component={InputRadio}
		options={[
			{ value: 'basic', label: 'Basic' },
			{ value: 'standard', label: 'Standard' },
			{ value: 'premium', label: 'Premium' }
		]}
	/>
	<FormButton title="Continue" type="submit" />
</Form>
