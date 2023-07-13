import { getContext, setContext } from 'svelte';
import { writable, type Writable, type Updater } from 'svelte/store';
import { minLengthValidation, requiredValidation } from '../components/form/validations';

const CONTEXT_NAME = 'form';

export interface FormStore extends Writable<FormFields> {
	registerField: RegisterFieldFn;
	removeField: RemoveFieldFn;
	updateField: UpdateFieldFn;
	validateField: ValidateFieldFn;
	getValues: () => SubmitValues;
	submit: SubmitFn;
}

export const createFormStore = (initialValues: SubmitValues = {}): FormStore => {
	// By keeping current value in scope, we can avoid using get which is not recommended for hot code paths
	let currentValue: FormFields = {
		isSubmitting: false,
		isValid: false,
		fields: {}
	};

	const store = writable<FormFields>(currentValue);

	const update = (updater: Updater<FormFields>) => {
		store.update((prev) => {
			currentValue = updater(prev);
			return currentValue;
		});
	};

	const set = (value: FormFields) => {
		currentValue = value;
		store.set(value);
	};

	const registerField: RegisterFieldFn = ({
		name,
		value = '',
		required,
		label,
		minLength,
		validations
	}) => {
		const allValidations = {
			...(required ? { required: requiredValidation } : {}),
			...(minLength ? { minLength: minLengthValidation } : {}),
			...validations
		};

		const initialValue = typeof initialValues[name] !== 'undefined' ? initialValues[name] : value;

		const field: FormField = {
			name,
			value: initialValue,
			required,
			label,
			minLength,
			isValidating: false,
			isFocused: false,
			isValid: Object.keys(allValidations).length === 0,
			validations: allValidations
		};

		update((prev) => {
			return {
				...prev,
				fields: {
					...prev.fields,
					[name]: field
				}
			};
		});

		if (initialValue) {
			validateField(name);
		}
	};

	const removeField: RemoveFieldFn = (name) => {
		update((prev) => {
			const { [name]: _fieldToRemove, ...rest } = prev.fields;
			return { ...prev, fields: rest };
		});
	};

	const updateField: UpdateFieldFn = (name, updates = {}) => {
		update((prev) => {
			const field: FormField = { ...prev.fields[name], ...updates };

			return {
				...prev,
				fields: {
					...prev.fields,
					[name]: field
				}
			};
		});
	};

	const validateField = (name: string): Promise<void> => {
		const field = currentValue.fields[name];
		const validations = Object.values(field.validations);
		let newFeedback: FormFieldFeedback;

		field.abortValidations?.();

		let abortValidations: () => void;
		const abortValidationsPromise = new Promise((_resolve, reject) => {
			const feedback: FormFieldFeedback = {
				isAborted: true,
				isError: false,
				message: 'Validation was aborted'
			};
			abortValidations = () => reject(feedback);
		});

		update((prev) => {
			const newField: FormField = {
				...prev.fields[name],
				isValid: false,
				isValidating: true,
				feedback: undefined,
				abortValidations
			};

			return {
				...prev,
				isValid: false,
				fields: {
					...prev.fields,
					[name]: newField
				}
			};
		});

		const validationPromises = [
			Promise.resolve(),
			...validations.map((validateFn) =>
				Promise.resolve(validateFn(field)).then((result) => {
					// No feedback. Nothing to see here
					if (!result) return Promise.resolve(null);
					// Short circuit on first error
					const feedback: FormFieldFeedback = { isError: true, message: result };
					return Promise.reject(feedback);
				})
			)
		];

		return Promise.race([abortValidationsPromise, Promise.all(validationPromises)])
			.catch((feedback) => {
				newFeedback = feedback;
			})
			.then(() => {
				if (newFeedback?.isAborted) return;
				update((prev) => {
					const value: FormFields = {
						...prev,
						fields: {
							...prev.fields,
							[name]: {
								...field,
								feedback: newFeedback,
								isValidating: false,
								isValid: !newFeedback?.isError,
								abortValidations: undefined
							}
						}
					};

					value.isValid = Object.values(value.fields).every((field) => field.isValid);

					return value;
				});
			});
	};

	const submit: SubmitFn = () => {
		update((prev) => ({ ...prev, isSubmitting: true }));
		return Promise.all(
			Object.keys(currentValue.fields).map((name) => {
				const promise = validateField(name);
				return promise;
			})
		).then(() => {
			update((prev) => ({ ...prev, isSubmitting: false }));
			return getValues();
		});
	};

	const getValues = (): SubmitValues => {
		return Object.keys(currentValue.fields).reduce((acc, name) => {
			acc[name] = currentValue.fields[name].value;
			return acc;
		}, {} as SubmitValues);
	};

	const customStore = {
		subscribe: store.subscribe,
		set,
		update,
		registerField,
		removeField,
		validateField,
		updateField,
		getValues,
		submit
	};

	setContext<FormStore>(CONTEXT_NAME, customStore);
	return customStore;
};

export const getFormStore = () => getContext<FormStore>(CONTEXT_NAME);
