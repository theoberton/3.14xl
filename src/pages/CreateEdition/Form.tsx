import { useCallback, useState } from 'react';
import { useGetSetState } from 'react-use';
import { Formik } from 'formik';
import { SendTransactionRequest } from '@tonconnect/sdk';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import styles from '@/pages/CreateEdition/styles.module.scss';
import { isTestnet } from '@/helpers/location';

import { FormArea } from '@/pages/CreateEdition/FormArea';
import { formSchema } from '@/pages/CreateEdition/validation';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import { Preview } from '@/pages/CreateEdition/Preview';
import { EDITIONS_SIZES, TELEGRAM_WEB_APP_ACTION } from '@/constants/common';
import { useIsMobileOrTablet, useTelegram, useTonClient } from '@/hooks';
import { prepareDeployTransaction } from '@/pages/CreateEdition/helpers';
import { dateToUnix } from '@/helpers';
import { sendMessageToChat } from '@/libs/apiClient';
import { composeFullEditionAddress } from '@/utils';
import { TelegramMessage } from '@/libs/apiClient/types';
import { BeforeDeployModal } from './BeforeDeployModal';

const initialDeploymentState = {
	isModalOpened: false,
	address: '',
	editionName: '',
};

function getTestnetInitialValues(address: string) {
	return {
		name: 'TestOne',
		symbol: '$TST',
		description: 'Hello, this is description',
		media: null,
		price: '1',
		editionSize: {
			type: EDITIONS_SIZES.OPEN_EDITION,
			amount: '',
		},
		royalty: '2',
		validity: {
			start: null,
			end: null,
		},
		payoutAddress: address,
	};
}

function CreateEditionForm() {
	const isMobile = useIsMobileOrTablet();
	const tonConnectAddress = useTonAddress();
	const tonClient = useTonClient();
	const [tonConnectUI] = useTonConnectUI();
	const [getdeploymentState, setDeploymentState] = useGetSetState(initialDeploymentState);

	const telegram = useTelegram();

	const sendEditionUrlToTelegram = useCallback(
		(editionAddress: string, edtionName: string) => {
			if (!telegram.user?.id) return;

			const edtionFullAddress = composeFullEditionAddress(editionAddress);

			const message: TelegramMessage = {
				action: TELEGRAM_WEB_APP_ACTION.EDITION_MINT,
				payload: {
					chatId: telegram.user.id,
					message: `Here is the link to your newly created ${edtionName} NFT edtion 🚀 \n ${edtionFullAddress}`,
					link: edtionFullAddress,
					edtionName,
				},
			};

			sendMessageToChat(message);
		},
		[sendMessageToChat, telegram.user]
	);

	const [deployTransaction, setDeployTransaction] = useState<{
		transaction: SendTransactionRequest;
		collectionAddress: string;
		editionName: string;
	} | null>(null);
	const handleSubmit = async (
		values: FormValues,
		bag: { setSubmitting: (arg0: boolean) => void }
	) => {
		if (!tonClient) return;

		bag.setSubmitting(true);

		try {
			if (!tonConnectAddress) throw new Error('Ton not connected');
			if (!values.media) throw new Error('No media');

			const { transaction, collectionAddress } = await prepareDeployTransaction(tonClient, {
				name: values.name,
				description: values.description,
				image: values.media,
				symbol: values.symbol,
				price: values.price,
				royalty: values.royalty,
				payoutAddress: values.payoutAddress,
				creatorAddress: tonConnectAddress,
				maxSupply:
					values.editionSize.type === EDITIONS_SIZES.FIXED ? values.editionSize.amount : '0',
				dateStart: values.validity.start ? dateToUnix(values.validity.start) : 0,
				dateEnd: values.validity.end ? dateToUnix(values.validity.end) : 0,
			});

			if (isMobile) {
				setDeployTransaction({ transaction, collectionAddress, editionName: values.name });
			} else {
				await tonConnectUI.sendTransaction(transaction);

				setDeploymentState({
					isModalOpened: true,
					address: collectionAddress,
					editionName: values.name,
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			bag.setSubmitting(false);
		}
	};

	async function deploy() {
		if (!deployTransaction) return;

		setDeployTransaction(null);
		await tonConnectUI.sendTransaction(deployTransaction.transaction);

		setDeploymentState({
			isModalOpened: true,
			address: deployTransaction.collectionAddress,
			editionName: deployTransaction.editionName,
		});
	}

	const handleDeploymentModalClose = useCallback(() => {
		setDeploymentState(initialDeploymentState);
	}, []);

	let createEditionInitialValues: FormValues;

	if (!isTestnet()) {
		createEditionInitialValues = {
			name: '',
			symbol: '',
			description: '',
			media: null,
			price: '',
			editionSize: {
				type: EDITIONS_SIZES.OPEN_EDITION,
				amount: '',
			},
			royalty: '',
			validity: {
				start: null,
				end: null,
			},
			payoutAddress: tonConnectAddress,
		};
	} else {
		createEditionInitialValues = getTestnetInitialValues(tonConnectAddress);
	}

	return (
		<Formik
			initialValues={createEditionInitialValues}
			validationSchema={formSchema}
			enableReinitialize={false}
			onSubmit={handleSubmit}
		>
			<section className={styles.createEditionContainer}>
				<BeforeDeployModal
					deploy={deploy}
					isOpen={deployTransaction !== null}
					onClose={() => setDeployTransaction(null)}
				/>
				<Preview />
				<FormArea
					sendEditionUrlToTelegram={sendEditionUrlToTelegram}
					handleDeploymentModalClose={handleDeploymentModalClose}
					deploymentState={getdeploymentState()}
				/>
			</section>
		</Formik>
	);
}

export default CreateEditionForm;
