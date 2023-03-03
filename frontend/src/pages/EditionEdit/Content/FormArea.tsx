import { Form, useFormikContext } from 'formik';
import styles from './../styles.module.scss';

import { Button, ButtonKinds, MediaInput, TextArea, Input } from '@/components';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import ValidityPeriod from '@/pages/CreateEdition/ValidityPeriod';
import { DeploymentModal } from '@/pages/EditionEdit/Content/DeploymentEditModal';

type Props = {
	deploymentState: { isModalOpened: boolean; address: string; editionName: string };
	handleDeploymentModalClose: () => void;
};

function FormArea({ deploymentState, handleDeploymentModalClose }: Props) {
	const { dirty, submitForm, values, isSubmitting } = useFormikContext<FormValues>();

	return (
		<Form className={styles.editEditionForm}>
			{deploymentState.isModalOpened && (
				<DeploymentModal
					values={values}
					deploy={submitForm}
					editionName={values.name}
					address={deploymentState.address}
					onClose={handleDeploymentModalClose}
				/>
			)}
			<div className={styles.editEditionFormTitle}>
				<h1>Edit</h1>
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
					isSubmitting={isSubmitting}
					disabled={!dirty}
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
