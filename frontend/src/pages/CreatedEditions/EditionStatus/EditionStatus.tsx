import styles from './styles.module.scss';

interface IProps {
	isActive: boolean;
}

function EditionStatus({ isActive }: IProps) {
	return (
		<div className={styles.statusContainer}>
			{isActive ? (
				<>
					<p>Active</p>
					<div></div>
				</>
			) : (
				<p className={styles.statusEnded}>Sale ended</p>
			)}
		</div>
	);
}

export default EditionStatus;
