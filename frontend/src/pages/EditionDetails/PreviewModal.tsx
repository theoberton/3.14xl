import { useState, useCallback } from 'react';
import PreviewImageModal from '@/pages/CreateEdition/Preview/PreviewImageModal';
import MobilePreivew from '@/pages/CreateEdition/Preview/Mobile';
import DesktopPreivew from '@/pages/CreateEdition/Preview/Desktop';

import { useMediaQuery } from 'react-responsive';


export function Preview() {
  const [isImagePreviewOpened, setImagePreviewOpenedStatus] = useState(false);
  console.log('isImagePreviewOpened', isImagePreviewOpened);

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
      <PreviewComponent openPreviewImage={openPreviewImage} />
    </>
  );
}
