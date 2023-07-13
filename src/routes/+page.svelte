<script lang="ts">
	import Form from '../components/form/Form.svelte';
	import FormField from '../components/form/FormField.svelte';
	import InputPassword from '../components/input/InputPassword.svelte';
	import InputText from '../components/input/InputText.svelte';
	import InputEmail from '../components/input/InputEmail.svelte';
	import InputCheckbox from '../components/input/InputCheckbox.svelte';

	import { isEmailFormat, emailAccountCheck } from '../components/form/validations';
	import FormButton from '../components/form/FormButton.svelte';
	import { goto } from '$app/navigation';

	const handleSubmit = () => {
		goto('/tiers');
	};
</script>

<Form name="account" on:submit={handleSubmit} heading="Account Details">
	<FormField name="name" label="Name" required component={InputText} />
	<FormField
		name="email"
		label="Email"
		component={InputEmail}
		required
		validations={{
			isEmailFormat,
			emailAccountCheck
		}}
	/>
	<FormField name="password" label="Password" component={InputPassword} required minLength={8} />
	<FormField name="terms" component={InputCheckbox} label="I accept all the terms" required />
	<FormButton title="Continue" type="submit" />
</Form>
