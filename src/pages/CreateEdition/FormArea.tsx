import { useEffect, useCallback } from 'react';
import { Form, useFormikContext, useField } from 'formik';
import { DeploymentModal } from '@/pages/CreateEdition/DeploymentModal';
import { getConsonants } from '@/helpers';
import { useEarlyMemberStatus } from '@/hooks';
import { EDITIONS_SIZES } from '@/constants/common';

import styles from '@/pages/CreateEdition/styles.module.scss';

import { Button, ButtonKinds, MediaInput, TextArea, Input, ConnectButton } from '@/components';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import EditionSize from '@/pages/CreateEdition/EditionSize';
import ValidityPeriod from '@/pages/CreateEdition/ValidityPeriod';
import { useTonAddress } from '@tonconnect/ui-react';
import { Checkbox } from '@/components';

type Props = {
	deploymentState: { isModalOpened: boolean; address: string; editionName: string };
	handleDeploymentModalClose: () => void;
	sendEditionUrlToTelegram: (address: string, name: string) => void;
};

export function FormArea({
	sendEditionUrlToTelegram,
	handleDeploymentModalClose,
	deploymentState,
}: Props) {
	const tonConnectAddress = useTonAddress();
	const { isValid, dirty, values, touched, setFieldValue, isSubmitting, submitForm, resetForm } =
		useFormikContext<FormValues>();

	const isEarlyMember = useEarlyMemberStatus();

	const isFormValid: boolean = isValid && dirty && Boolean(tonConnectAddress);

	const createNewEditionHandler = useCallback(() => {
		handleDeploymentModalClose();
		resetForm();
	}, [resetForm, handleDeploymentModalClose]);

	useEffect(() => {
		if (tonConnectAddress && !values.payoutAddress) {
			setFieldValue('payoutAddress', tonConnectAddress);
		}
	}, [tonConnectAddress, values.payoutAddress]);

	useEffect(() => {
		if (values.editionSize.type === EDITIONS_SIZES.FIXED) {
			setFieldValue('isSoulbound', false);
		}
	}, [values.editionSize.type]);

	useEffect(() => {
		if ((touched.symbol && values.symbol && !values.name) || isSubmitting) {
			return;
		}

		if (values.name) {
			const nameValue = values.name.replaceAll(' ', '');
			const consonants = getConsonants(nameValue);
			const symbolVersion = consonants.slice(0, 4);

			setFieldValue('symbol', `$${symbolVersion.toUpperCase()}`);
		}
	}, [values.name, touched.symbol, isSubmitting]);

	const handleSoulboundClick = useCallback(() => {
		setFieldValue('editionSize.type', EDITIONS_SIZES.OPEN_EDITION);
		setFieldValue('editionSize.amount', '');
	}, []);

	return (
		<Form className={styles.createEdition}>
			{deploymentState.isModalOpened && (
				<DeploymentModal
					sendEditionUrlToTelegram={sendEditionUrlToTelegram}
					deploy={submitForm}
					editionName={deploymentState.editionName}
					address={deploymentState.address}
					createNewEditionHandler={createNewEditionHandler}
					onClose={handleDeploymentModalClose}
				/>
			)}
			<div className={styles.createEditionActionTitleWrapper}>
				<div className={styles.createEditionActionTitle}>Edition details</div>
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
			<Input label={'Name'} name="name" placeholder="The Project" type="text" />
			<Input label={'Symbol'} name="symbol" type="text" placeholder="$SYMBOL" />
			<TextArea
				optional
				label={'Description'}
				placeholder={"I'd like to share my project. It's about..."}
				name={'description'}
				maxLength={260}
			/>
			<MediaInput label={'Media'} name="media" placeholder="None selected" />
			<Input label={'Price'} name="price" type="number" placeholder="0.01" units="TON" />
			{isEarlyMember !== undefined && !isEarlyMember && (
				<div className={styles.createEditionPriceHint}>Collector pays additional 5% to 3.14XL</div>
			)}
			<EditionSize />
			<ValidityPeriod />
			<div className={styles.customFieldContainer}>
				<Checkbox
					onClick={handleSoulboundClick}
					name="isSoulbound"
					label="NFT details"
					title="Soulbound"
					optional
				/>
			</div>
			<Input label={'Royalty'} name="royalty" type="number" placeholder="5" units="%" />
			<Input
				subCaption="Address that will receive withdrawals and royalties"
				label={'Payout address'}
				name="payoutAddress"
				type="text"
				placeholder="Address"
			/>
			<div className={styles.createEditionSubmitButton}>
				<ConnectButton expanded>
					<Button
						componentType="button"
						buttonType="submit"
						disabled={!isFormValid}
						expanded
						isSubmitting={isSubmitting}
						kind={ButtonKinds.basic}
					>
						Create edition
					</Button>
				</ConnectButton>
			</div>
		</Form>
	);
}

export default FormArea;
