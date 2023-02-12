import { Select, Input } from '@/components';
import styles from '@/pages/CreateEdition/styles.module.scss';
import { EDITIONS_SIZES } from '@/constants/common';

import { useField } from 'formik';

const editionSizesOptions = [
	{
		label: 'Fixed',
		value: EDITIONS_SIZES.FIXED,
	},
	{
		label: 'Open edition',
		value: EDITIONS_SIZES.OPEN_EDITION,
	},
];

function EditionSize() {
	const [field] = useField('editionSize.type');
	const isOpenEdition = field.value == EDITIONS_SIZES.OPEN_EDITION;

	return (
		<div className={styles.customFieldContainer}>
			<label className={styles.customFieldLabel}>Edition size</label>
			<div className={styles.customFieldControlsEditionSize}>
				<div className={styles.customFieldItem}>
					<Select
						isSearchable={false}
						name="editionSize.type"
						options={editionSizesOptions}
						className={styles.exportModalSelect}
					/>
				</div>
				<div className={styles.customFieldItem}>
					<Input
						name="editionSize.amount"
						type="number"
						noEdit={isOpenEdition}
						disabled={isOpenEdition}
						marginless
						min={!isOpenEdition ? 0 : undefined}
						placeholder={isOpenEdition ? 'Unlimited' : '1000'}
						units={isOpenEdition ? null : 'editions'}
					/>
				</div>
			</div>
		</div>
	);
}

export default EditionSize;
