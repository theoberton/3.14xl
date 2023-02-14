import { Form, useFormikContext } from 'formik';
import styles from '@/pages/CreateEdition/styles.module.scss';

import { Button, MediaInput, TextArea, Input } from '@/components';
import { ButtonKinds } from '@/components/Button/interfaces';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import EditionSize from '@/pages/CreateEdition/EditionSize';
import ValidityPeriod from '@/pages/CreateEdition/ValidityPeriod';

function FormArea() {
	const { isValid, dirty } = useFormikContext<FormValues>();
	const isFormValid = isValid && dirty;

	return (
		<Form>
			<div className={styles.createEdition}>
				<div className={styles.createEditionActionTitle}>Collection details</div>
				<div className={styles.createEditionFormArea}>
					<Input label={'Name'} name="name" placeholder="The Project" type="text" />
					<Input label={'Symbol'} name="symbol" type="text" max={15} placeholder="$SYMBOL" />
					<TextArea
						label={'Description'}
						placeholder={"I'd like to share my project. It's about..."}
						name={'description'}
					/>
					<MediaInput label={'Media'} name="media" placeholder="None selected" />
					<Input
						label={'Price'}
						name="price"
						type="number"
						min={0.000000001}
						placeholder="0.01"
						units="TON"
					/>
					<EditionSize />
					<ValidityPeriod />
					{/* <Input
						label={'Mint limit per address'}
						name="mintLimitPerAddress"
						min={0}
						type="number"
						optional
						placeholder="Unlimited"
					/> */}
					{/* <Input label={'Payout address'} name="payoutAddress" type="text" placeholder="Address" /> */}
					<div className={styles.createEditionSubmitButton}>
						<Button type="submit" green disabled={!isFormValid} expanded kind={ButtonKinds.basic}>
							Create edition
						</Button>
					</div>
				</div>
			</div>
		</Form>
	);
}

export default FormArea;
