import styles from './styles.module.scss';
import SampleImg from '../../assets/images/png/example.png';

function EditionPreview() {
	return (
		<div className={styles.editionDetailsPreview}>
			<div className={styles.editionDetailsPreviewImage}>
				<img src={SampleImg} />
			</div>
			<div className={styles.editionDetailsPreviewInfo}>
				<p>MINTER: </p>
				<div>sample text</div>
			</div>
		</div>
	);
}

export default EditionPreview;
