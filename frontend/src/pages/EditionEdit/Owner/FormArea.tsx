import { Form, useFormikContext } from 'formik';
import { useCallback, useContext } from 'react';
import styles from './../styles.module.scss';

import { Button, ButtonKinds, Input } from '@/components';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import { DeploymentModal } from '@/pages/EditionEdit/Content/DeploymentEditModal';
import { DeploymentContext } from '@/pages/EditionEdit/deploymentContext';
import { initialDeploymentState } from '@/pages/EditionEdit/constants';

export function FormArea() {
	const { submitForm, values, dirty } = useFormikContext<FormValues>();

	const { ownerDeploymentState, editionName, setOwnerDeploymentState } =
		useContext(DeploymentContext);

	const handleDeploymentModalClose = useCallback(() => {
		setOwnerDeploymentState(initialDeploymentState);
	}, []);

	return (
		<Form className={styles.editEditionForm}>
			{ownerDeploymentState.isModalOpened && (
				<DeploymentModal
					values={values}
					deploy={submitForm}
					editionName={editionName}
					address={ownerDeploymentState.address}
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
					buttonType="submit"
					disabled={!dirty}
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
