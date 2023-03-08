import { useState, useCallback } from 'react';
import classNames from 'classnames';

import { addressFilter } from '@/helpers';

import styles from './styles.module.scss';

interface IProps {
	creator: string;
}

export function CreatorLabel({ creator }: IProps) {
	const [showToolTip, setShowTooltip] = useState(false);

	const copyToClipBoard = useCallback(() => {
		navigator.clipboard.writeText(creator);

		setShowTooltip(true);
	}, [creator]);

	const tooltipClass = classNames({
		[styles.creatorLabelNameTooltip]: true,
		[styles.creatorLabelNameTooltipActive]: showToolTip,
	});

	return (
		<div className={styles.creatorLabel}>
			<p>Creator: </p>
			<div className={styles.creatorLabelName}>
				<p onClick={copyToClipBoard}>{addressFilter(creator)}</p>
				<span className={tooltipClass} onAnimationEnd={() => setShowTooltip(false)}>
					copied
				</span>
			</div>
		</div>
	);
}
