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
				label={'Wallet address'}
				name="managerAddress"
				type="text"
				placeholder="Enter wallet address"
				max={20}
			/>
			<Button
				componentType="button"
				// buttonType="submit"
				disabled={true}
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
