import { Formik } from 'formik';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useIPFS } from '@/hooks/useIpfs';
import styles from '@/pages/CreateEdition/styles.module.scss';
import FormArea from '@/pages/CreateEdition/FormArea';
import { formSchema } from '@/pages/CreateEdition/validation';
import { useCallback } from 'react';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import EditionPreview from '@/pages/CreateEdition/Preview';
import { EDITIONS_SIZES } from '@/constants/common';
import { createEdition } from '../CreateEditionOld';
import { useMediaQuery } from 'react-responsive'
import EditionPreviewMobile from '@/pages/CreateEdition/PreviewMobile';


const createEditionInitialValues: FormValues = {
	name: '',
	symbol: '',
	description: '',
	media: null,
	price: '',
	editionSize: {
		type: EDITIONS_SIZES.FIXED,
		amount: '',
	},
	validity: {
		start: null,
		end: null,
	},
	mintLimitPerAddress: '',
	payoutAddress: '',
};

function CreateEditionForm() {
	const address = useTonAddress();
	const [tonConnectUI] = useTonConnectUI();

	const handleSubmit = useCallback(async (values: FormValues) => {
		if (!values.media) throw new Error('No media');

		await createEdition(tonConnectUI,{
			name: values.name,
			description: values.description,
			image: values.media,
			symbol: values.symbol,
			price: values.price,
			creatorAddress: address
		})
	}, [address, tonConnectUI]);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

	
	return (
		<Formik
			initialValues={createEditionInitialValues}
			validationSchema={formSchema}
			enableReinitialize
			onSubmit={handleSubmit}
		>
			<div className={styles.createEditionContainer}>
				<FormArea />
				{isTabletOrMobile ? <EditionPreviewMobile /> : <EditionPreview />}
			</div>
		</Formik>
	);
}

export default CreateEditionForm;
