import { useState, useCallback } from 'react';
import { useFormikContext } from 'formik';
import { FormValues } from '@/pages/CreateEdition/interfaces';

import PreviewImageModal from '@/pages/CreateEdition/Preview/PreviewImageModal';
import MobilePreivew from '@/pages/CreateEdition/Preview/Mobile';
import DesktopPreivew from '@/pages/CreateEdition/Preview/Desktop';

import { useMediaQuery } from 'react-responsive';
console.log('useMediaQuery', useMediaQuery);

export function Preview() {
	const [isImagePreviewOpened, setImagePreviewOpenedStatus] = useState(false);

	const { values } = useFormikContext<FormValues>();

	const closePreviewImageModal = useCallback(() => {
		setImagePreviewOpenedStatus(false);
	}, []);

	const openPreviewImage = useCallback(() => {
		setImagePreviewOpenedStatus(true);
	}, []);

	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

	const PreviewComponent = isTabletOrMobile ? MobilePreivew : DesktopPreivew;

	return (
		<>
			<PreviewImageModal media={values.media} isOpen={isImagePreviewOpened} closeModal={closePreviewImageModal} />
			<PreviewComponent openPreviewImage={openPreviewImage} />
		</>
	);
}
