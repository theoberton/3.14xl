import { useState } from 'react';
import _ from 'lodash';
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

		const isTouched = touched && _.get(touched, field.name);

		let error = null;

		if (isTouched && errors && _.get(errors, field.name)) {
			error = _.get(errors, field.name);

			if (status) {
				setStatus(null);
			}
		}

		return _.upperFirst(error);
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
