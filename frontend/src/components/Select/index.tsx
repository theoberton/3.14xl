import { useCallback } from 'react';
import ReactSelect, {SingleValue} from 'react-select';

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
	const { setFieldValue } = useFormikContext();

	const customStyles = {
		control: (controlStyles: any) => ({
			...controlStyles,
			borderColor: '#F6F6F6',
			boxShadow: '#805FC0',
			borderRadius: '4px',
			fontSize: '14px',
			backgroundColor: '#F6F6F6',
			'&:focus': {
				outline: '4px solid #805FC0',
				borderColor: '#F6F6F6',
			},
			'&:hover': {
				borderColor: '#F6F6F6',
			},
		}),
		option: (optionStyles: any, { isSelected }: any) => ({
			...optionStyles,
			fontSize: '14px',
			color: '#111',
			backgroundColor: isSelected ? '#e1e1e1' : '#FFF',
		}),
		container: (constainerStyles: any) => ({
			...constainerStyles,
			'&:focus': {
				outline: '4px solid #805FC0',
				borderColor: '#805FC0',
			},
			outlineColor: '#F6F6F6',
		}),
		dropdownIndicator: (baseStyles: any) => ({
			...baseStyles,
			padding: '0 8px',
		}),
		indicatorSeparator: () => ({ display: 'none' }),
		valueContainer: (baseStyles: any) => ({
			...baseStyles,
			padding: '0 8px',
		}),
	};

	const onSelectChange = useCallback(
		(option: SingleValue<OptionType>) => {
			if(option?.value) {
				setFieldValue(name, option.value);
			}
		},
		[name, setFieldValue]
	);

	const { getError } = useCustomStateFormField(name);

	const defaultClassname = styles.selectContainer;

	let selectValue = options.filter(({ value }: { value: any }): boolean => value === field.value);

	const error = getError();
	return (
		<div className={className || defaultClassname}>
			{label && <div className={styles.label}>{label}</div>}
			<div>
				<ReactSelect
					isSearchable={isSearchable}
					isDisabled={disabled}
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
