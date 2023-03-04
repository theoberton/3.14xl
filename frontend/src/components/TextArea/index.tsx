import TextareaAutosize from 'react-textarea-autosize';
import { useCustomStateFormField } from '@/hooks/useCustomStateFormField';

import { useField, useFormikContext } from 'formik';

import classNames from 'classnames';

import styles from '@/components/TextArea/styles.module.scss';

type TextAreaProps = {
	name: string;
	placeholder: string;
	label: string;
	className?: string;
	disabled?: boolean;
	rows?: number;
	maxLength?: number;
};

export function TextArea({
	name,
	placeholder,
	label,
	className,
	disabled,
	rows = 3,
	maxLength,
}: TextAreaProps) {
	const [field] = useField(name);
	const { value, name: fieldName, onChange } = field;
	const { isSubmitting } = useFormikContext();

	const { onFocus, onBlur, getError } = useCustomStateFormField(name);

	const inputDefaultClass = classNames({
		[styles.input]: true,
	});

	const inputLabelClass = classNames({
		[styles.inputLabel]: true,
	});

	const isInputDisabled = disabled || isSubmitting;

	const inputWrapperClass = classNames({
		[styles.inputFieldArea]: label,
		[styles.inputFieldAreaMarginTopFree]: !label,
	});

	const inputContainerClass = classNames({
		[styles.inputContainer]: true,
	});

	const error = getError();

	return (
		<div className={inputContainerClass}>
			{label && (
				<label htmlFor={fieldName} className={inputLabelClass}>
					{label}
				</label>
			)}
			<div className={inputWrapperClass}>
				<TextareaAutosize
					minRows={rows}
					onChange={onChange(fieldName)}
					autoComplete={'off'}
					disabled={isInputDisabled}
					onFocus={onFocus}
					onBlur={onBlur}
					placeholder={placeholder}
					value={value}
					className={className || inputDefaultClass}
					maxLength={maxLength}
				/>
			</div>
			{error && <div className={styles.inputError}>{error}</div>}
		</div>
	);
}
