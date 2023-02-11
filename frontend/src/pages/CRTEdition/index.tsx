import { useCallback } from 'react';
import styles from '@/pages/CRTEdition/styles.module.scss';
import { goBack } from '@/helpers/navigation';
import Button from '@/components/Button';
import { ButtonKinds } from '@/components/Button/interfaces';
import { navigate } from '@/helpers/navigation';

import Form from '@/pages/CRTEdition/Form';

function CreateEdition() {
	const goToLandingPage = useCallback(() => navigate('/'), []);
  
  return (
    <div className={styles.createEditionWrapper}>
      <div className={styles.createEditonSettingsSection}>
        <div className={styles.createEditionNavigationHeader}>
            <Button
              kind={ButtonKinds.arrowLeft}
              onClick={goToLandingPage}
            />
        </div>
        <Form />
      </div>

    </div>
  )
}

export default CreateEdition;