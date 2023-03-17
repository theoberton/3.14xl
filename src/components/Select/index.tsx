import { useCallback } from 'react';
import ReactSelect, { SingleValue } from 'react-select';

import { useField, useFormikContext } from 'formik';

import styles from '@/components/Select/styles.module.scss';
import { useCustomStateFormField } from '@/hooks/useCustomStateFormField';
import { EDITIONS_SIZES } from '@/constants/common';

interface OptionType {
	value: EDITIONS_SIZES;
	label: string;
}

interface SelectProps {
	name: string;
	label?: string;
	options: OptionType[];
	disabled?: boolean;
	className?: string;
	isSearchable?: boolean;
	onChange?: () => void;
}

export function Select(props: SelectProps) {
	const { name, label, options, disabled, className, isSearchable } = props;

	const [field] = useField(name);
	const { setFieldValue, isSubmitting } = useFormikContext();

	const customStyles = {
		control: (controlStyles: any) => ({
			...controlStyles,
			borderColor: '#212121',
			boxShadow: '#805FC0',
			borderRadius: '4px',
			fontSize: '14px',
			backgroundColor: '#212121',
			'&:focus': {
				outline: '4px solid #805FC0',
				borderColor: '#212121',
			},
			'&:hover': {
				borderColor: '#212121',
			},
		}),
		option: (optionStyles: any, { isSelected, isFocused, isActive }: any) => {
			let backgroundColor;
			if (isSelected) {
				backgroundColor = isFocused ? '#4e4e4e' : '#4e4e4e';
			} else {
				backgroundColor = isFocused ? '#7e7e7e' : '#212121';
			}

			return {
				...optionStyles,
				fontSize: '14px',
				color: 'white',
				backgroundColor,
				':active': {
					backgroundColor,
				},
			};
		},
		container: (constainerStyles: any) => ({
			...constainerStyles,
			'&:focus': {
				outline: '4px solid #805FC0',
				borderColor: '#805FC0',
			},
			backgroundColor: '#212121',
			outlineColor: '#212121',
		}),
		dropdownIndicator: (baseStyles: any) => ({
			...baseStyles,
			padding: '0 8px',
		}),
		menu: (baseStyles: any) => ({
			...baseStyles,
			backgroundColor: '#212121',
		}),
		indicatorSeparator: () => ({ display: 'none' }),
		singleValue: (baseStyles: any) => ({
			...baseStyles,
			color: 'white',
			backgroundColor: '#212121',
		}),
		valueContainer: (baseStyles: any) => ({
			...baseStyles,
			color: 'white',
			backgroundColor: '#212121',
			padding: '8px 13px',
		}),
	};

	const onSelectChange = useCallback(
		(option: SingleValue<OptionType>) => {
			if (option?.value) {
				setFieldValue(name, option.value);
			}
		},
		[name, setFieldValue]
	);

	const { getError } = useCustomStateFormField(name);

	const defaultClassname = styles.selectContainer;

	const selectValue = options.filter(({ value }: { value: any }): boolean => value === field.value);

	const error = getError();
	return (
		<div className={className || defaultClassname}>
			{label && <div className={styles.label}>{label}</div>}
			<div>
				<ReactSelect
					isSearchable={isSearchable}
					isDisabled={disabled || isSubmitting}
					styles={customStyles}
					value={selectValue}
					onChange={onSelectChange}
					options={options}
					key={styles.label}
				/>
			</div>
			{error && <div className={styles.selectError}>{error}</div>}
		</div>
	);
}
