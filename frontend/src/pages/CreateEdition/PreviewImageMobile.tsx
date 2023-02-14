
import { useCallback } from 'react';
import { Modal } from 'react-responsive-modal';
import styles from '@/pages/CreateEdition/styles.module.scss';

type PreviewImageMobileProps  = {
  media: string;
  isOpen: boolean;
  closeModal: () => void;
}

function PreviewImageMobile(props: PreviewImageMobileProps) {
  const { media, isOpen, closeModal } = props;
  const close = useCallback(() => {
    closeModal();
  }, [closeModal]);

  return (
    <Modal open={isOpen} showCloseIcon onClose={close}>
      <div>
        <img src={media} className={styles.previewModal} />
      </div>
    </Modal>
  );
}

export default PreviewImageMobile