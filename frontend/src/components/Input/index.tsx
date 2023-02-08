import { useField } from 'formik';

import { useCustomStateFormField } from '@/hooks';

import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
	placeholder?: string;
	name: string;
	type: string;
	className: string;
	label?: string;
	isInfoType?: boolean;
	isSubmitting?: boolean;
	disabled?: boolean;
}

export function Input(props: Props) {
	const { name, placeholder, type, label, className, disabled, isSubmitting, isInfoType } = props;
	const [field] = useField(name);

	const { value, name: fieldName, onChange } = field;

	const { onFocus, onBlur, getError } = useCustomStateFormField(fieldName);

	const fieldType = type || 'text';

	const inputIconClass = classNames({
		[styles.inputIcon]: true,
	});

	const inputDefaultClass = classNames({});

	const inputLabelClass = classNames({});

	const isInputDisabled = disabled || isSubmitting || isInfoType;

	const inputWrapperClass = classNames({
		[styles.inputFieldArea]: label || !isInfoType,
		[styles.inputFieldAreaMarginTopFree]: !label || isInfoType,
	});

	const inputContainerClass = classNames({
		[styles.inputContainer]: true,
		[styles.inputMarginTopFree]: !label || isInfoType,
	});

	const error = getError();

	return (
		<div className={inputContainerClass}>
			<div />
			{label && (
				<label htmlFor={fieldName} className={inputLabelClass}>
					{label}
				</label>
			)}
			<div className={inputWrapperClass}>
				<input
					onChange={onChange(fieldName)}
					disabled={isInputDisabled}
					onFocus={onFocus}
					onBlur={onBlur}
					type={fieldType}
					placeholder={placeholder}
					value={value || ''}
				/>
			</div>
			{error && <div className={styles.inputError}>{error}</div>}
		</div>
	);
}
