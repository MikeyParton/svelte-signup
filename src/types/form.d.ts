type FormField = {
	name: string;
	value: any;
	required?: boolean;
	minLength?: number;
	error?: string;
	label?: string;
	validations: { [key: string]: ValidatorFn };
	feedback?: FormFieldFeedback;
	isValidating: boolean;
	isValid: boolean;
	isFocused: boolean;
	abortValidations?: () => void;
};

type FormFields = { isSubmitting: boolean; isValid: boolean; fields: { [key: string]: FormField } };

type RegisterFieldFn = (args: {
	name: string;
	value: any;
	required?: boolean;
	label?: string;
	minLength?: number;
	validations?: ValidationConfig;
}) => void;

type RemoveFieldFn = (name: string) => void;

type ValidateFieldFn = (name: string) => Promise<void>;
type UpdateFieldFn = (name: string, updates: Partial<FormField>) => void;
type ValidationResult = string | undefined;
type ValidatorFn = (field: FormField) => ValidationResult | Promise<ValidationResult>;
type SubmitValues = { [key: string]: any };
type SubmitFn = () => Promise<SubmitValues>;
type ValidationConfig = { [key: string]: ValidatorFn };
type FormFieldFeedback = {
	isAborted?: boolean;
	isError: boolean;
	message: string;
};

type FormFieldInjectedProps = {
	required?: boolean;
	label?: string;
	isError?: string;
	isSubmitting?: boolean;
	isValidating?: boolean;
	isValid?: boolean;
};

interface FormFieldEvents {
	update: CustomEvent<{ value: string }>;
}

interface FormEvents {
	submit: CustomEvent<{ name: string; values: SubmitValues }>;
}
