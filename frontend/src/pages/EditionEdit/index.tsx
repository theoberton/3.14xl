import { useCallback } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';

import { useTonClient } from '@/hooks/useTonClient';

import FormArea from './FormArea';
import EditionPreview from '@/pages/CreateEdition/Preview';
import EditionPreviewMobile from '@/pages/CreateEdition/PreviewMobile';
import OwnershipSection from './OwnershipSection';

import { formSchema } from './validation';
import { FormValues } from './interfaces';

import styles from './styles.module.scss';

function EditionEdit() {
	const address = useTonAddress();
	const tonClient = useTonClient();

	const [tonConnectUI] = useTonConnectUI();
	const navigate = useNavigate();

	const handleSubmit = useCallback(async (values: FormValues) => {}, []);

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

	const createEditionInitialValues: FormValues = {
		description: '',
		media: null,
		price: '0.1',
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
			<section className={styles.editEditionContainer}>
				<div className={styles.editEditionControls}>
					<FormArea />
					<OwnershipSection />
				</div>
				{isTabletOrMobile ? <EditionPreviewMobile /> : <EditionPreview />}
			</section>
		</Formik>
	);
}

export default EditionEdit;
