import { writable, type Writable } from 'svelte/store';
import { getContext, setContext } from 'svelte';

const CONTEXT_NAME = 'wizard';

export const createWizard = () => {
	const wizard = writable<SubmitValues>({});
	setContext(CONTEXT_NAME, wizard);
	return wizard;
};

export const getWizard = () => getContext<Writable<SubmitValues>>(CONTEXT_NAME);
