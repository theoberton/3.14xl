import { useCallback } from 'react';
import styles from '@/pages/CreateEdition/styles.module.scss';

import { Button } from '@/components';
import { ButtonKinds } from '@/components/Button/interfaces';
import { navigate } from '@/helpers/navigation';

import Form from '@/pages/CreateEdition/Form';

export default function CreateEdition() {
	const goToLandingPage = useCallback(() => navigate('/'), []);

	return <Form />;
}
