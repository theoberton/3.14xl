import { Datepicker } from '@/components';

import { DATE_INPUT_FORMAT } from '@/constants/common';
import arrowRight from '@/assets/images/svg/common/arrowRight.svg';
import styles from '@/pages/CreateEdition/styles.module.scss';
import { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import { useMediaQuery } from 'react-responsive';
import { isAfter } from 'date-fns';

function ValidityPeriod() {
	const { setFieldValue, values } = useFormikContext<FormValues>();

	const resetDates = useCallback(() => {
		setFieldValue('validity.start', null);
		setFieldValue('validity.end', null);
	}, []);

	const isResetButtonShown = values.validity.start || values.validity.end;
	// const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

	let validityStart = values.validity.start;
	let validityEnd = values.validity.end;

	if(validityStart && validityEnd && isAfter(validityStart, validityEnd)) {
		setFieldValue('validity.end', null);
	}

	return (
		<div className={styles.customFieldContainer}>
			<label className={styles.customFieldLabelDate}>
				<span>
					Start & end time
					<span className={styles.inputCaptionOptional}>{' (Optional)'}</span>
				</span>
				{isResetButtonShown && (
					<span className={styles.customFieldResetMobile} onClick={resetDates}>
						Reset
					</span>
				)}
			</label>
			<div className={styles.customFieldControlsValidityDate}>
				<Datepicker
					name="validity.start"
					inputFormat={DATE_INPUT_FORMAT}
					disablePast
					popperProps={{ placement: 'right' }}
					placeholder={'Now'}
				/>
				<img src={arrowRight} />
				<Datepicker
					name="validity.end"
					inputFormat={DATE_INPUT_FORMAT}
					disablePast
					popperProps={{ placement: 'right' }}
					placeholder={'Forever'}
					disableFrom={validityStart}
				/>
			</div>
			{/* {!isTabletOrMobile && isResetButtonShown && (
				<div className={styles.customFieldReset} onClick={resetDates}>
					Reset
				</div>
			)} */}
		</div>
	);
}

export default ValidityPeriod;
