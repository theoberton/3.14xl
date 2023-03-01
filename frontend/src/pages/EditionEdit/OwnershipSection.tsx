import { Button, ButtonKinds, Input } from '@/components';

import styles from './styles.module.scss';

function OwnershipSection() {
	return (
		<div className={styles.editEditionOwnership}>
			<h3>Transfer ownership</h3>
			<p>
				Transfer contract ownership to a new address. The old owner will lose all ownership
				privileges. This cannot be undone!
			</p>
			<Input
				label={' Wallet address or ENS'}
				name="address"
				type="text"
				placeholder="Enter wallet address or ENS"
				max={20}
			/>
			<Button
				componentType="button"
				buttonType="submit"
				disabled={false}
				expanded
				kind={ButtonKinds.basic}
				danger
			>
				Transfer
			</Button>
		</div>
	);
}

export default OwnershipSection;
