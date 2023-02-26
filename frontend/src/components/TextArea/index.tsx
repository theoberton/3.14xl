import TextareaAutosize from 'react-textarea-autosize';
import { useCustomStateFormField } from '@/hooks/useCustomStateFormField';

import { useField } from 'formik';

import classNames from 'classnames';

import styles from '@/components/TextArea/styles.module.scss';

type TextAreaProps = {
	name: string;
	placeholder: string;
	label: string;
	className?: string;
	disabled?: boolean;
	isSubmitting?: boolean;
	rows?: number;
};

export function TextArea({
	name,
	placeholder,
	label,
	className,
	disabled,
	isSubmitting,
	rows = 3,
}: TextAreaProps) {
	const [field] = useField(name);
	const { value, name: fieldName, onChange } = field;

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
				/>
			</div>
			{error && <div className={styles.inputError}>{error}</div>}
		</div>
	);
}
