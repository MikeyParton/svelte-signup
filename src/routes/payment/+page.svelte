<script lang="ts">
	import Form from '../../components/form/Form.svelte';
	import FormButton from '../../components/form/FormButton.svelte';
	import FormField from '../../components/form/FormField.svelte';
	import InputText from '../../components/input/InputText.svelte';
</script>

<Form name="payment">
	<div class="fields">
		<div class="field">
			<FormField
				label="Credit Card Number"
				name="notSoEncryptedCreditCard"
				component={InputText}
				required
			/>
		</div>
		<div class="field field--small">
			<FormField label="Expiry" name="notSoEncryptedExpiry" component={InputText} />
		</div>
		<div class="field field--small">
			<FormField label="CCV" name="notSoEncryptedCCV" component={InputText} />
		</div>
	</div>
	<FormButton title="Take My Money" />
</Form>

<style>
	.fields {
		display: flex;
		width: 100%;
	}

	.field {
		width: 100%;
	}

	.field--small {
		margin-left: 8px;
		width: 200px;
	}
</style>
