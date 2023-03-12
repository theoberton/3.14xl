import { Button, ButtonKinds } from '@/components/Button';
import styles from '@/pages/Explore/styles.module.scss';

function EditionsHeader() {
	return (
		<div className={styles.editionsHeader}>
			<h1>My editions</h1>
			<div className={styles.editionsHeaderButtons}>
				<Button componentType="link" kind={ButtonKinds.basic} to="/create-edition">
					Create new edition
				</Button>
			</div>
		</div>
	);
}

export default EditionsHeader;
