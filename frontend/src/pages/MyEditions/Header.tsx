import { Button, ButtonKinds } from '@/components/Button';
import styles from '@/pages/Explore/styles.module.scss';
// import { useEffect } from 'react';
// import { getManagerContractByOwner } from '@/libs/apiClient';
import { useTonAddress } from '@tonconnect/ui-react';

function EditionsHeader() {
	const address = useTonAddress();

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
