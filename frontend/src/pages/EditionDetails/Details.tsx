import styles from './styles.module.scss';

import { Button } from '@/components/Button';

import { ButtonKinds } from '@/components/Button/interfaces';

function EditionDetails() {
	return (
		<div className={styles.editionDetailsInfo}>
			<div className={styles.editionDetailsInfoMintData}>
				<div className={styles.editionDetailsInfoMintDataBlock}>
					<p>MINT ENDS</p>
					<span>10h 45min</span>
				</div>
				<div className={styles.editionDetailsInfoMintDataBlock}>
					<p>TOTAL MINTED</p>
					<span>54321 / ∞</span>
				</div>
			</div>
			<div className={styles.editionDetailsInfoPrice}>
				<div className={styles.editionDetailsInfoPriceBlock}>
					<h3>PRICE</h3>
					<span>0.007 TON</span>
				</div>
				<div className={styles.editionDetailsInfoPriceBlock}>
					<Button kind={ButtonKinds.basic} onClick={() => {}}>
						Mint
					</Button>
				</div>
			</div>
			<div className={styles.editionDetailsInfoAbout}>
				<h3>ABOUT</h3>
				<h1>Fish</h1>
				<p>
					It has survived not only five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged. It has survived not only five centuries, but also the
					leap into electronic typesetting, remaining essentially unchanged.
				</p>
			</div>
			<div className={styles.editionDetailsInfoData}>
				<h3>DETAILS</h3>
				<div>
					<p>Contact Address</p>
					<span>sample text</span>
				</div>
				<div>
					<p>Token ID</p>
					<span>123123123</span>
				</div>
				<div>
					<p>Blockchain</p>
					<span>TON</span>
				</div>
				<div>
					<p>IPFS</p>
					<span></span>
				</div>
				<div>
					<p>IPFS Metadata</p>
					<span></span>
				</div>
			</div>
		</div>
	);
}

export default EditionDetails;
