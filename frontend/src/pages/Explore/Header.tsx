import { Button, ButtonKinds } from '@/components/Button';
import { useIsMobileOrTablet } from '@/hooks';
import styles from './styles.module.scss';

function EditionsHeader() {

	const isMobile = useIsMobileOrTablet();

	return (
		<div className={styles.editionsHeader}>
			<h1>Explore</h1>
			<div className={styles.editionsHeaderButtons}>
				{/* <Button componentType="link" kind={ButtonKinds.basic} to="/minted">
					Minted editions
				</Button> */}
				{
					!isMobile &&
						<Button componentType="link" kind={ButtonKinds.basic} to="/create-edition">
							Create new edition
						</Button>
				}
			</div>
		</div>
	);
}

export default EditionsHeader;
