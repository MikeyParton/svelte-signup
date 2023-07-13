import debounce from '../../utils/debounce';

export const requiredValidation: ValidatorFn = ({ value, label = 'Field', required }) => {
	const valid =
		!required || !(value === undefined || value === null || value === '' || value === false);
	if (!valid) {
		return `${label} is required`;
	}
};

export const minLengthValidation: ValidatorFn = ({ value, minLength, label = 'Field' }) => {
	const valid = !minLength || typeof value !== 'string' || value?.length >= minLength;
	if (!valid) {
		return `${label} must be at least ${minLength} characters`;
	}
};

const EMAIL_TEST_REGEX = /^[^@ ]*[^@., ]@[^@., ][^@ ]*\.[a-zA-Z]{2,}$/;
export const isEmailFormat: ValidatorFn = ({ value }) => {
	const valid = typeof value === 'string' && EMAIL_TEST_REGEX.test(value);
	if (!valid) {
		return "Doesn't look like an email";
	}
};

export const emailAccountCheck: ValidatorFn = debounce(({ value }) => {
	return new Promise((resolve) => {
		window.setTimeout(() => {
			let result: ValidationResult = undefined;
			const valid = !value?.includes('exists');
			if (!valid) {
				result = 'Email exists';
			}
			resolve(result);
		}, 2000);
	});
}, 500);
