import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonKinds } from '@/components/Button';
import styles from './styles.module.scss';

function EditionsHeader() {
	const navigate = useNavigate();
	const goToCreateEditionPage = useCallback(() => navigate('/create-edition'), []);
	const goToMintedEditionsPage = useCallback(() => navigate('/minted'), []);

	return (
		<div className={styles.editionsHeader}>
			<h1>Created editions</h1>

			<div>
				<Button kind={ButtonKinds.basic} onClick={goToMintedEditionsPage}>
					Minted editions
				</Button>
				<Button kind={ButtonKinds.basic} onClick={goToCreateEditionPage}>
					Create new edition
				</Button>
			</div>
		</div>
	);
}

export default EditionsHeader;
