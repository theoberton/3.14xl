import { useState } from 'react';
import get from 'lodash/get';
import upperFirst from 'lodash/upperFirst';
import { useFormikContext, useField } from 'formik';

export const useCustomStateFormField = (fieldName: string) => {
	const { errors, status, touched, setTouched, setStatus } = useFormikContext();

	const [field] = useField(fieldName);

	const [fieldState, setFieldState] = useState({
		isFocused: false,
		isSuccess: false,
	});

	const onFocus = () => {
		setFieldState({ ...fieldState, isFocused: true });
	};

	const getError = (): string | null => {
		if (!field.name) return null;

		const isTouched = touched && get(touched, field.name);

		let error = null;

		if (isTouched && errors && get(errors, field.name)) {
			error = get(errors, field.name);

			if (status) {
				setStatus(null);
			}
		}

		return upperFirst(error);
	};

	const onBlur = () => {
		let isSuccess = false;

		if (!getError()) {
			isSuccess = true;
		}

		setTouched({ ...touched, [field.name]: true });

		setFieldState({ ...fieldState, isFocused: false, isSuccess });
	};

	return {
		onFocus,
		onBlur,
		getError,
	};
};
