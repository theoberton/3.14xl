import { useCallback } from 'react';
import styles from '@/pages/createEdition/styles.module.scss';

import { Button } from '@/components';
import { ButtonKinds } from '@/components/Button/interfaces';
import { navigate } from '@/helpers/navigation';

import Form from '@/pages/createEdition/Form';

export function CreateEdition() {
	const goToLandingPage = useCallback(() => navigate('/'), []);

	return (
		<div className={styles.createEditionWrapper}>
			<div className={styles.createEditonSettingsSection}>
				<div className={styles.createEditionNavigationHeader}>
					<Button kind={ButtonKinds.arrowLeft} onClick={goToLandingPage} />
				</div>
				<Form />
			</div>
		</div>
	);
}
