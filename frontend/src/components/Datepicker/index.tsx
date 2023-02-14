import { useCallback } from 'react';
import { useFormikContext, useField } from 'formik';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { PopperProps as MuiPopperProps } from '@mui/material/Popper';

import { useCustomStateFormField } from '@/hooks/useCustomStateFormField';
import { DATE_VALIDITY_REGEX, DATE_INPUT_FORMAT } from '@/constants/common';
import classNames from 'classnames';

import inputStyles from '@/components/Input/styles.module.scss';
import styles from '@/components/Datepicker/styles.module.scss';

const INVALID_DATE = new Date('');

interface DatepickerProps {
	name: string;
	label?: string;
	inputFormat: string;
	disableFuture?: boolean;
	disablePast?: boolean;
	popperProps: Partial<MuiPopperProps>;
	placeholder: string;
	maxDate?: Date;
	minDate?: Date;
	defaultCalendarMonth?: Date;
}

export function Datepicker({
	name,
	label,
	inputFormat,
	disableFuture,
	disablePast,
	popperProps,
	placeholder,
	maxDate,
	minDate,
	defaultCalendarMonth,
}: DatepickerProps) {
	const [field] = useField(name);

	const { value } = field;

	const { setFieldValue } = useFormikContext();

	const convert = (date: Date, applidFormat: string) => format(new Date(date), applidFormat);

	const { getError, onBlur, onFocus } = useCustomStateFormField(name);

	const error = getError();

	const inputLabelClass = classNames({
		[inputStyles.inputLabel]: true,
	});

	const inputDefaultClass = classNames({
		[inputStyles.input]: true,
	});

	const inputContainerClass = classNames({
		[inputStyles.inputContainer]: true,
		[inputStyles.inputContainerMarginless]: true,
	});
	const datePickerWrapperClass = classNames({
		[styles.datePickerWrapper]: label,
		[styles.datePickerWrapperMarginTopFree]: !label,
	});

	const handleChangeDate = useCallback(
		(popperInputValue: any, keyBoardInputValue: any) => {
			let result;

			if (popperInputValue && !keyBoardInputValue) {
				result = convert(popperInputValue, DATE_INPUT_FORMAT);
			} else if (keyBoardInputValue) {
				const isKeyBoardInputValueValid = DATE_VALIDITY_REGEX.test(keyBoardInputValue);

				result = isKeyBoardInputValueValid
					? convert(keyBoardInputValue, DATE_INPUT_FORMAT)
					: INVALID_DATE.toString();
			}

			setFieldValue(name, popperInputValue);
		},
		[name, setFieldValue]
	);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateTimePicker
				inputFormat={inputFormat}
				value={value}
				disableFuture={disableFuture}
				disablePast={disablePast}
				PopperProps={popperProps}
				maxDate={maxDate}
				minDate={minDate}
				defaultCalendarMonth={defaultCalendarMonth}
				onChange={(popperInputValue, keyBoardInputValue) =>
					handleChangeDate(popperInputValue, keyBoardInputValue)
				}
				renderInput={({ inputRef, inputProps, InputProps }) => (
					<div className={inputContainerClass}>
						{label && (
							<label htmlFor={name} className={inputLabelClass}>
								{label}
							</label>
						)}
						<div className={datePickerWrapperClass}>
							<input
								{...inputProps}
								onBlur={onBlur}
								onFocus={onFocus}
								ref={inputRef}
								className={inputDefaultClass}
								placeholder={placeholder}
							/>
							<i className={styles.datePickerItem}>{InputProps?.endAdornment}</i>
						</div>
						{error && <div className={inputStyles.inputError}>{error}</div>}
					</div>
				)}
			/>
		</LocalizationProvider>
	);
}
