import { useCallback, HTMLInputTypeAttribute } from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import styles from '@/components/Input/styles.module.scss';

import { useCustomStateFormField } from '@/hooks/useCustomStateFormField';

interface Props {
	placeholder?: string;
	name: string;
	type: string;
	className?: string;
	label?: string;
	caption?: string;
	isInfoType?: boolean;
	isSubmitting?: boolean;
	disabled?: boolean;
	optional?: boolean;
	min?: number;
	max?: number;
	units?: string | null;
	marginless?: boolean;
	noEdit?: boolean;
}

export function Input(props: Props) {
	const {
		name,
		placeholder,
		type,
		label,
		disabled,
		isSubmitting,
		noEdit,
		min,
		max,
		caption,
		optional,
		units,
		marginless = false,
	} = props;
	const [field] = useField(name);

	const { value, name: fieldName, onChange } = field;

	const { onFocus, onBlur, getError } = useCustomStateFormField(fieldName);

	const fieldType: HTMLInputTypeAttribute = type || 'text';

	const inputLabelClass = classNames({
		[styles.inputLabel]: true,
	});

	const isInputDisabled = disabled || isSubmitting;

	const inputWrapperClass = classNames({
		[styles.inputWrapper]: true,
	});

	const inputContainerClass = classNames({
		[styles.inputContainer]: !marginless,
		[styles.inputContainerMarginless]: marginless,
	});

	const inputClass = classNames({
		[styles.input]: true,
		[styles.inputNoEdit]: noEdit,
	});

	const isInputOfNumberType = fieldType == 'number';
	const isInputOfTextType = fieldType == 'text';
	const isInputOfTextTypeProps = {
		maxLength: max,
	};

	const inputOfTypeNumberProps = {
		min,
		max,
	};

	const error = getError();

	return (
		<div className={inputContainerClass}>
			{label && (
				<>
					<label htmlFor={fieldName} className={inputLabelClass}>
						{label}
						{optional && <span className={styles.inputCaptionOptional}>{' (Optional)'}</span>}
					</label>
				</>
			)}
			<div className={inputWrapperClass}>
				<input
					onChange={onChange(fieldName)}
					disabled={isInputDisabled}
					className={inputClass}
					onFocus={onFocus}
					onBlur={onBlur}
					type={fieldType}
					placeholder={placeholder}
					value={value || ''}
					{...(isInputOfNumberType && inputOfTypeNumberProps)}
					{...(isInputOfTextType && isInputOfTextTypeProps)}
				/>
				{units && <div className={styles.inputUnits}>{units}</div>}
				<div className={styles.inputCaption}>{caption}</div>
			</div>
			{error && <div className={styles.inputError}>{error}</div>}
		</div>
	);
}
