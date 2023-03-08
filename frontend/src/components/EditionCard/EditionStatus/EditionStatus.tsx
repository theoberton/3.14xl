import { isMintAllowed, unixToDate } from '@/helpers';
import { isBefore, isAfter } from 'date-fns';
import styles from './styles.module.scss';

interface IProps {
	dateStart: number;
	dateEnd: number;
}

function EditionStatus({ dateStart, dateEnd }: IProps) {
	const currentDate = new Date();

	const isActive = isMintAllowed(currentDate, dateStart, dateEnd);

	const isNotStartedYet = Boolean(dateStart) && isAfter(unixToDate(dateStart), currentDate);
	const isEnded = Boolean(dateEnd) && isBefore(unixToDate(dateEnd), currentDate);

	return (
		<div className={styles.statusContainer}>
			{isActive && (
				<>
					<p>Active</p>
					<div></div>
				</>
			)}
			{isNotStartedYet && <p className={styles.statusEnded}>Mint hasn't started </p>}
			{isEnded && <p className={styles.statusEnded}>Mint ended</p>}
		</div>
	);
}

export default EditionStatus;
