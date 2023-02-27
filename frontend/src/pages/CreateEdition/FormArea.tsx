import { Form, useFormikContext } from 'formik';
import styles from '@/pages/CreateEdition/styles.module.scss';

import { Button, ButtonKinds, MediaInput, TextArea, Input } from '@/components';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import EditionSize from '@/pages/CreateEdition/EditionSize';
import ValidityPeriod from '@/pages/CreateEdition/ValidityPeriod';

function FormArea() {
	const { isValid, dirty } = useFormikContext<FormValues>();
	const isFormValid = isValid && dirty;

	return (
		<Form className={styles.createEdition}>
			<div className={styles.createEditionActionTitleWrapper}>
				<div className={styles.createEditionActionTitle}>Collection details</div>
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

			<Input label={'Name'} name="name" placeholder="The Project" max={30} type="text" />
			<Input label={'Symbol'} name="symbol" type="text" max={15} placeholder="$SYMBOL" />
			<TextArea
				label={'Description'}
				placeholder={"I'd like to share my project. It's about..."}
				name={'description'}
				maxLength={260}
			/>
			<MediaInput label={'Media'} name="media" placeholder="None selected" />
			<Input label={'Price'} name="price" type="text" placeholder="0.01" units="TON" max={8} />
			<EditionSize />
			<ValidityPeriod />
			<Input label={'Royalty'} name="royalty" type="text" placeholder="5" units="%" max={8} />
			<Input label={'Payout address'} name="payoutAddress" type="text" placeholder="Address" />
			<div className={styles.createEditionSubmitButton}>
				<Button
					componentType="button"
					buttonType="submit"
					disabled={!isFormValid}
					expanded
					kind={ButtonKinds.basic}
				>
					Create edition
				</Button>
			</div>
		</Form>
	);
}

export default FormArea;
