<script lang="ts">
	import InputText, { type InputTextEvents, type InputTextProps } from './InputText.svelte';

	type InputEmailProps = Omit<InputTextProps, 'type'>;
	type $$Props = InputEmailProps;
	type $$Events = InputTextEvents;

	export let name: InputEmailProps['name'];
</script>

<InputText {name} type="email" autocomplete="email" on:blur on:focus on:update {...$$restProps} />
