import { Button, ButtonKinds } from '@/components/Button';
import styles from './styles.module.scss';

function EditionsHeader() {
	return (
		<div className={styles.editionsHeader}>
			<h1>Created editions</h1>

			<div>
				<Button componentType="link" kind={ButtonKinds.basic} to="/minted">
					Minted editions
				</Button>
				<Button componentType="link" kind={ButtonKinds.basic} to="/create-edition">
					Create new edition
				</Button>
			</div>
		</div>
	);
}

export default EditionsHeader;
