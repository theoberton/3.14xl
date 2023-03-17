import { useNavigateHandler, useTonClient, useIsMobileOrTablet } from '@/hooks';
import { useEffect, useState, useCallback } from 'react';
import { useAsyncRetry } from 'react-use';
import { Loader } from '@/components';
import { composeEditionOverviewData, getFullNftCollectionData } from '@/helpers';
import { Button, ButtonKinds } from '@/components/Button';
import { Modal, SharePanel } from '@/components';

import { LoaderSizes, LoaderColors, LoaderTypes } from '@/components/interfaces';
import { createManagerContract } from '@/libs/apiClient';

import styles from '@/pages/CreateEdition/styles.module.scss';

import SuccessIcon from '@/assets/images/svg/common/success.svg';
import FailureIcon from '@/assets/images/svg/common/failure.svg';

const renderDeployInProgressComponent = (isMobile: boolean) => (
	<div className={styles.deploymentModal}>
		<div className={styles.deploymentModalTitle}>
			Edition is being created
			{!isMobile && (
				<div className={styles.deploymentModalSpinner}>
					<Loader type={LoaderTypes.pulse} size={LoaderSizes.mini} color={LoaderColors.white} />
				</div>
			)}
			{isMobile && (
				<div className={styles.deploymentModalSpinner}>
					<Loader type={LoaderTypes.pulse} size={LoaderSizes.tiny} color={LoaderColors.white} />
				</div>
			)}
		</div>
		<div className={styles.deploymentModalTitleCaption}>It usually takes about 15 seconds</div>
	</div>
);

const renderDeploySuccessComponent = (
	viewCreatedEdition: () => void,
	settings: {
		editionName: string | null;
		address: string | null;
		media?: string;
	}
) => (
	<div className={styles.deploymentModal}>
		<img src={SuccessIcon} className={styles.deploymentModalImage} />
		<div className={styles.deploymentModalTitle}>Edition has been created</div>
		<div className={styles.deploymentModalTitleCaption}>
			{settings.editionName} has successfully been deployed
		</div>
		<div>
			<SharePanel
				title={settings.editionName!}
				shareUrl={`${window.location.origin}/#/edition/${settings.address}`}
				media={settings.media}
			/>
		</div>
		<div className={styles.deploymentModalActions}>
			<Button componentType="button" kind={ButtonKinds.basic} onClick={viewCreatedEdition}>
				View created edition
			</Button>
		</div>
	</div>
);

const renderDeployFailureComponent = (goBack: () => void, retryCreateEdition: () => void) => (
	<div className={styles.deploymentModal}>
		<img src={FailureIcon} className={styles.deploymentModalImage} />
		<div className={styles.deploymentModalTitle}>Something went wrong</div>
		<div className={styles.deploymentModalTitleCaption}>
			Edition hasn't been created, an error occurred while trying to deploy
		</div>
		<div className={styles.deploymentModalActions}>
			<Button componentType="button" kind={ButtonKinds.basic} basicInverted onClick={goBack}>
				Go back
			</Button>
			<Button componentType="button" kind={ButtonKinds.basic} onClick={retryCreateEdition}>
				Retry
			</Button>
		</div>
	</div>
);

enum DeploymentStatus {
	inProgress = 'inProgress',
	success = 'success',
	failiure = 'failiure',
}

type Props = {
	onClose: () => void;
	address: string | null;
	deploy: () => void;
	editionName: string | null;
	createNewEditionHandler: () => void;
	sendEditionUrlToTelegram: (address: string, name: string) => void;
};

const deployExpirationTime = 40 * 1000; // 40 seconds
const retryContractDeployedCheck = 2 * 1000; // every 2 seconds check whether contract is deployed or not

export function DeploymentModal({
	sendEditionUrlToTelegram,
	address,
	onClose,
	deploy,
	editionName,
	createNewEditionHandler,
}: Props) {
	const [status, setStatus] = useState(DeploymentStatus.inProgress);
	const isMobile = useIsMobileOrTablet();

	let retryTimeoutId: ReturnType<typeof setTimeout>;
	const tonClient = useTonClient();

	useEffect(() => {
		const failiureTimeoutId = setTimeout(() => {
			clearTimeout(retryTimeoutId);

			if (status !== DeploymentStatus.success) {
				setStatus(DeploymentStatus.failiure);
			}
		}, deployExpirationTime);

		return () => {
			clearTimeout(failiureTimeoutId);
		};
	}, [status]);

	const collectionDataAsync = useAsyncRetry(async () => {
		if (!address || !tonClient || status == DeploymentStatus.failiure) {
			return null;
		}

		let collectionData;

		let overviewData;
		try {
			const data = await getFullNftCollectionData(tonClient, address);
			collectionData = data.collectionData;
			overviewData = composeEditionOverviewData(data);

			createManagerContract({
				contractAddress: data.collectionData.ownerAddress,
				collectionAddress: address,
				ownerAddress: data.managerAddress,
				overviewData,
			}).catch(err => console.log(err));
			console.log('address', address);
			console.log('data.content.name', data.content.name);

			sendEditionUrlToTelegram(address, data.content.name);

			// await apiClient.createManagerContract()
		} catch (error) {
			setStatus(DeploymentStatus.inProgress);
			throw error;
		}

		return { collectionData, content: overviewData.content };
	}, [tonClient, address]);

	const goToEditionDetails = useNavigateHandler(`/edition/${address}`);

	const retryCreateEdition = useCallback(() => {
		setStatus(DeploymentStatus.inProgress);
		onClose();
		deploy();
	}, []);

	const goBack = useCallback(() => {
		onClose();
	}, []);

	useEffect(() => {
		if (collectionDataAsync.value?.collectionData) {
			setStatus(DeploymentStatus.success);
		} else if (collectionDataAsync.error && status == DeploymentStatus.inProgress) {
			retryTimeoutId = setTimeout(collectionDataAsync.retry, retryContractDeployedCheck);
		}

		return () => {
			if (collectionDataAsync.value?.collectionData) {
				clearTimeout(retryTimeoutId);
			}
		};
	}, [collectionDataAsync.value, collectionDataAsync.error, status]);

	const onOverlayClick = useCallback(() => {
		if (status == DeploymentStatus.success) {
			createNewEditionHandler();
		}
	}, [status]);

	const closeOnOverlayClick = status !== DeploymentStatus.inProgress;

	const settings = {
		editionName,
		address,
		media: collectionDataAsync.value?.content,
	};

	return (
		<Modal
			closeOnOverlayClick={closeOnOverlayClick}
			onOverlayClick={onOverlayClick}
			isCentered
			isOpen
			showCloseIcon={false}
			onClose={onClose}
		>
			{status == DeploymentStatus.success &&
				renderDeploySuccessComponent(goToEditionDetails, settings)}
			{status == DeploymentStatus.inProgress && renderDeployInProgressComponent(isMobile)}
			{status == DeploymentStatus.failiure &&
				renderDeployFailureComponent(goBack, retryCreateEdition)}
		</Modal>
	);
}
