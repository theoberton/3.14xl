import { Button, ButtonKinds } from '@/components/Button';
import styles from './styles.module.scss';

function EditionsHeader() {
	return (
		<div className={styles.editionsHeader}>
			<h1>Explore</h1>
			<div className={styles.editionsHeaderButtons}>
				{/* <Button componentType="link" kind={ButtonKinds.basic} to="/minted">
					Minted editions
				</Button> */}
				<Button componentType="link" kind={ButtonKinds.basic} to="/create-edition">
					Create new edition
				</Button>
			</div>
		</div>
	);
}

export default EditionsHeader;
