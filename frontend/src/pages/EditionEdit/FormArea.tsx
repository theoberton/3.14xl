import { Form, useFormikContext } from 'formik';
import styles from './styles.module.scss';

import { Button, ButtonKinds, MediaInput, TextArea, Input } from '@/components';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import ValidityPeriod from '@/pages/CreateEdition/ValidityPeriod';

function FormArea() {
	const { isValid, dirty } = useFormikContext<FormValues>();
	const isFormValid = isValid && dirty;

	return (
		<Form className={styles.editEditionForm}>
			<div className={styles.editEditionFormTitle}>
				<h1>Edit</h1>
				<Button
					componentType="button"
					kind={ButtonKinds.basic}
					basicInverted
					mini
					buttonType="reset"
				>
					Clear fields
				</Button>
			</div>

			<TextArea
				label={'Description'}
				placeholder={"I'd like to share my project. It's about..."}
				name={'description'}
				maxLength={260}
			/>
			<MediaInput label={'Media'} name="media" placeholder="None selected" />
			<Input label={'Price'} name="price" type="text" placeholder="0.01" units="TON" max={8} />
			<ValidityPeriod />
			<Input label={'Payout address'} name="payoutAddress" type="text" placeholder="Address" />
			<div className={styles.editEditionFormButtons}>
				<Button
					componentType="button"
					buttonType="reset"
					expanded
					kind={ButtonKinds.basic}
					basicInverted
				>
					Cancel
				</Button>
				<Button
					componentType="button"
					buttonType="submit"
					disabled={!isFormValid}
					expanded
					kind={ButtonKinds.basic}
				>
					Save
				</Button>
			</div>
		</Form>
	);
}

export default FormArea;
