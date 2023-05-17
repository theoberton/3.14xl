import CheckboxComponent from '@mui/material/Checkbox';
import shortId from 'short-uuid';

import { useCustomStateFormField } from '@/hooks/useCustomStateFormField';
import { useFormikContext, useField } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import inputStyles from '@/components/Input/styles.module.scss';
import styles from '@/components/Checkbox/styles.module.scss';

export const Checkbox = ({
	name,
	label,
	title,
	optional,
}: {
	name: string;
	label: string;
	title: string;
	optional: boolean;
}) => {
	const [id, setId] = useState<string>();
	const [field] = useField(name);
	const { setFieldValue } = useFormikContext();

	useEffect(() => {
		setId(shortId.generate());
	}, []);

	const handleClick = useCallback(() => {

		setFieldValue(field.name, !field.value);
	}, [field.value, setFieldValue]);

	const { getError } = useCustomStateFormField(field.name);

	const error = getError();

	return (
		<>
			{label && (
				<>
					<label htmlFor={id} className={inputStyles.inputLabel}>
						{label}
						{optional && <span className={inputStyles.inputCaptionOptional}>{' (Optional)'}</span>}
					</label>
				</>
			)}
			<div className={styles.checkboxContent}>
				<CheckboxComponent
					color="secondary"
					onClick={handleClick}
					style={{ paddingLeft: 0 }}
					sx={{
						color: '#fff',
						'&.Mui-checked': {
							color: '#fff',
						},
					}}
					id={id}
					checked={field.value}
				/>
				<div className={styles.checkboxTitle}>{title}</div>
			</div>
			{error && <div className={inputStyles.inputError}>{error}</div>}
		</>
	);
};
