import { HTMLInputTypeAttribute } from 'react';
import { useFormikContext, useField } from 'formik';
import { useMediaQuery } from 'react-responsive';

import classNames from 'classnames';
import styles from '@/components/Input/styles.module.scss';

import { useCustomStateFormField } from '@/hooks/useCustomStateFormField';

interface Props {
	placeholder?: string;
	subCaption?: string;
	name: string;
	type: string;
	className?: string;
	label?: string;
	isInfoType?: boolean;
	isSubmitting?: boolean;
	disabled?: boolean;
	optional?: boolean;
	min?: number;
	max?: number;
	units?: string | null;
	marginless?: boolean;
	noEdit?: boolean;
	inputSupplementaryComponent?: React.ReactNode;
}

export function Input(props: Props) {
	const {
		name,
		placeholder,
		type,
		label,
		disabled,
		subCaption,
		noEdit,
		min,
		max,
		optional,
		units,
		inputSupplementaryComponent,
		marginless = false,
	} = props;
	const [field] = useField(name);
	const { isSubmitting } = useFormikContext();

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

	const { value, name: fieldName, onChange } = field;

	const { onFocus, onBlur, getError } = useCustomStateFormField(fieldName);

	const fieldType: HTMLInputTypeAttribute = type || 'text';

	const inputLabelClass = classNames({
		[styles.inputLabel]: true,
	});

	const isInputDisabled = disabled || isSubmitting;

	const inputWrapperClass = classNames({
		[styles.inputWrapper]: true,
		[styles.inputWrapperMobile]: isTabletOrMobile,
	});

	const inputContainerClass = classNames({
		[styles.inputContainer]: !marginless,
		[styles.inputContainerMarginless]: marginless,
	});

	const inputClass = classNames({
		[styles.input]: true,
		[styles.inputNoEdit]: noEdit,
	});
	const inputSupplementaryClass = classNames({
		[styles.inputContentSupplementary]: !isTabletOrMobile,
		[styles.inputContentSupplementaryMobile]: isTabletOrMobile,
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
			{subCaption && <div className={styles.inputSubCaption}>{subCaption}</div>}
			<div className={inputWrapperClass}>
				<div className={styles.inputContentMain}>
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
				</div>
				{Boolean(inputSupplementaryComponent) && (
					<div className={inputSupplementaryClass}>{inputSupplementaryComponent}</div>
				)}
			</div>
			{error && <div className={styles.inputError}>{error}</div>}
		</div>
	);
}
