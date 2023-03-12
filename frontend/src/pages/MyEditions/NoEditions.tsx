import { Button, ButtonKinds } from '@/components/Button';
import styles from './styles.module.scss';

function NoEditions() {
	return (
		<div className={styles.noEditionsContainer}>
			<h3 style={{ marginBottom: '24px', fontSize: '32px' }}>You have no editions</h3>
			<span style={{ marginBottom: '48px' }}>Get started by creating one!</span>

			<Button componentType="link" kind={ButtonKinds.basic} to="/create-edition">
					Create new edition
				</Button>
		</div>
	);
}

export default NoEditions;
