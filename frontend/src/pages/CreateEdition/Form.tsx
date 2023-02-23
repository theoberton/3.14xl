import { useCallback } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import styles from '@/pages/CreateEdition/styles.module.scss';
import FormArea from '@/pages/CreateEdition/FormArea';
import { formSchema } from '@/pages/CreateEdition/validation';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import EditionPreview from '@/pages/CreateEdition/Preview';
import { EDITIONS_SIZES } from '@/constants/common';
import EditionPreviewMobile from '@/pages/CreateEdition/PreviewMobile';
import { useTonClient } from '@/hooks/useTonClient';
import { createEdition } from '@/pages/CreateEdition/helpers';
import { dateToUnix } from '@/helpers';

function CreateEditionForm() {
	const address = useTonAddress();
	const tonClient = useTonClient();

	const [tonConnectUI] = useTonConnectUI();
	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (values: FormValues) => {
			if (!tonClient) return;

			try {
				if (!tonConnectUI.connected) {
					try {
						await tonConnectUI.connectWallet();
					} catch (error) {
						console.error('Error occured when connecting to wallet', error);

						throw error;
					}
				}

				if (!values.media) throw new Error('No media');

				const { collectionAddress } = await createEdition(tonClient, tonConnectUI, {
					name: values.name,
					description: values.description,
					image: values.media,
					symbol: values.symbol,
					price: values.price,
					royalty: values.royalty,
					creatorAddress: values.payoutAddress,
					maxSupply:
						values.editionSize.type === EDITIONS_SIZES.FIXED ? values.editionSize.amount : '0',
					dateStart: values.validity.start ? dateToUnix(values.validity.start) : 0,
					dateEnd: values.validity.end ? dateToUnix(values.validity.end) : 0,
				});

				navigate(`/edition/${collectionAddress}`);
			} catch (error) {
				console.error(error);
			}
		},
		[address, tonConnectUI.connected, tonClient]
	);

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

	const createEditionInitialValues: FormValues = {
		name: 'Warrior',
		symbol: '$WRR',
		description: 'The warriors',
		media: null,
		price: '0.1',
		editionSize: {
			type: EDITIONS_SIZES.OPEN_EDITION,
			amount: '',
		},
		royalty: '5',
		validity: {
			start: null,
			end: null,
		},
		payoutAddress: address,
	};

	return (
		<Formik
			initialValues={createEditionInitialValues}
			validationSchema={formSchema}
			enableReinitialize
			onSubmit={handleSubmit}
		>
			<section className={styles.createEditionContainer}>
				<FormArea />
				{isTabletOrMobile ? <EditionPreviewMobile /> : <EditionPreview />}
			</section>
		</Formik>
	);
}

export default CreateEditionForm;
