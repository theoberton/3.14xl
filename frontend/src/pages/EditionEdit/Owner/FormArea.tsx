import { Form, useFormikContext } from 'formik';
import { useCallback, useContext } from 'react';
import styles from './../styles.module.scss';
import { useNavigate } from 'react-router';

import { Button, ButtonKinds, Input } from '@/components';
import { DeploymentModal } from '@/pages/EditionEdit/Owner/DeploymentOwnershipTransferModal';
import { DeploymentContext } from '@/pages/EditionEdit/deploymentContext';
import { TransferOwnershiptValues } from '../interfaces';
import { useParams } from 'react-router-dom';

export function FormArea() {
	const { submitForm, values, dirty } = useFormikContext<TransferOwnershiptValues>();
	const navigate = useNavigate();
	const { collectionAddress } = useParams();

	const { ownerDeploymentState, isFormDisabled } = useContext(DeploymentContext);

	const handleDeploymentSuccessModalClose = useCallback(() => {
		navigate(`/edition/${collectionAddress}`);
	}, [collectionAddress]);

	return (
		<Form className={styles.editEditionForm}>
			{ownerDeploymentState.isModalOpened && (
				<DeploymentModal
					handleDeploymentSuccessModalClose={handleDeploymentSuccessModalClose}
					values={values}
					deploy={submitForm}
					address={ownerDeploymentState.address}
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
					disabled={isFormDisabled}
					placeholder="Enter wallet address"
				/>
				<Button
					componentType="button"
					buttonType="submit"
					disabled={isFormDisabled || !dirty}
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
