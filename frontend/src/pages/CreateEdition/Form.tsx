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
import { createEdition } from '../CreateEditionOld';
import EditionPreviewMobile from '@/pages/CreateEdition/PreviewMobile';

function CreateEditionForm() {
	const address = useTonAddress();
	const [tonConnectUI] = useTonConnectUI();
	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (values: FormValues) => {
			try {
				if (!values.media) throw new Error('No media');

				const { collectionAddress } = await createEdition(tonConnectUI, {
					name: values.name,
					description: values.description,
					image: values.media,
					symbol: values.symbol,
					price: values.price,
					creatorAddress: address,
					maxSupply: values.editionSize.type === EDITIONS_SIZES.FIXED ? values.editionSize.amount : '0'
				});

				navigate(`/edition/${collectionAddress}`);
			} catch (error) {
				console.error(error);
			}
		},
		[address, tonConnectUI]
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
		validity: {
			start: null,
			end: null,
		},
		payoutAddress: address
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
