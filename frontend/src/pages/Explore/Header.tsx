import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonKinds } from '@/components/Button';
import styles from './styles.module.scss';

function EditionsHeader() {
	const navigate = useNavigate();
	const goToCreateEditionPage = useCallback(() => navigate('/create-edition'), []);

	return (
		<div className={styles.editionsHeader}>
			<h1>Created editions</h1>
			<Button kind={ButtonKinds.basic} onClick={goToCreateEditionPage}>
				Create new edition
			</Button>
		</div>
	);
}

export default EditionsHeader;
