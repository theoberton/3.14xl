import { Form, useFormikContext } from 'formik';
import styles from './../styles.module.scss';

import { Button, ButtonKinds, MediaInput, TextArea, Input } from '@/components';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import ValidityPeriod from '@/pages/CreateEdition/ValidityPeriod';
import { DeploymentModal } from '@/pages/EditionEdit/Content/DeploymentEditModal';
import { useCallback, useContext } from 'react';
import { DeploymentContext } from '@/pages/EditionEdit/deploymentContext';
import { useNavigate, useParams } from 'react-router-dom';

function FormArea() {
	const { dirty, submitForm, values, isSubmitting } = useFormikContext<FormValues>();
	const { contentDeploymentState, isFormDisabled, editionName } =
		useContext(DeploymentContext);

	const navigate = useNavigate();
	const params = useParams();

	const hanelCancelClick = useCallback(() => {
		navigate(`/edition/${params.collectionAddress}`);
	}, [isSubmitting, params]);

	return (
		<Form className={styles.editEditionForm}>
			{contentDeploymentState.isModalOpened && (
				<DeploymentModal
					values={values}
					deploy={submitForm}
					editionName={editionName}
					address={contentDeploymentState.address}
				/>
			)}
			<div className={styles.editEditionFormTitle}>
				<h1>Edit</h1>
			</div>
			<TextArea
				label={'Description'}
				disabled={isFormDisabled}
				placeholder={"I'd like to share my project. It's about..."}
				name={'description'}
				maxLength={260}
			/>
			<MediaInput label={'Media'} disabled={isFormDisabled} name="media" placeholder="None selected" />
			<Input label={'Price'} disabled={isFormDisabled} name="price" type="number" placeholder="0.01" units="TON" max={8} />
			<ValidityPeriod disabled={isFormDisabled} />
			<Input type='text' disabled={isFormDisabled} label={'Payout address'} name="payoutAddress" placeholder="Address" />
			<div className={styles.editEditionFormButtons}>
				<Button
					componentType="button"
					buttonType="reset"
					expanded
					disabled={isFormDisabled || isSubmitting}
					onClick={hanelCancelClick}
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
