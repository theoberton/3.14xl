import { Form, useFormikContext } from 'formik';
import styles from './../styles.module.scss';

import { Button, ButtonKinds, Input } from '@/components';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import { DeploymentModal } from '@/pages/EditionEdit/Content/DeploymentEditModal';

type Props = {
	deploymentState: {
		isModalOpened: boolean;
		address: string;
		editionName: string;
	};
	handleDeploymentModalClose: () => void;
};

export function FormArea({ deploymentState, handleDeploymentModalClose }: Props) {
	const { submitForm, values} = useFormikContext<FormValues>();

	return (
		<Form className={styles.editEditionForm}>
			{deploymentState.isModalOpened && (
				<DeploymentModal
					values={values}
					deploy={submitForm}
					editionName={deploymentState.editionName}
					address={deploymentState.address}
					onClose={handleDeploymentModalClose}
				/>
			)}
			<div className={styles.editEditionOwnership}>
				<h3>Transfer ownership</h3>
				<p>
					Transfer contract ownership to a new address. The old owner will lose all ownership
					privileges. This cannot be undone!
				</p>
				<Input
					label={'Wallet address'}
					name="managerAddress"
					type="text"
					placeholder="Enter wallet address"
					max={48}
				/>
				<Button
					componentType="button"
					// buttonType="submit"
					disabled={true}
					expanded
					kind={ButtonKinds.basic}
					danger
				>
					Transfer
				</Button>
			</div>
		</Form>
	);
}
