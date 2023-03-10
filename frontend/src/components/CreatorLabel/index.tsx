import { useState, useCallback } from 'react';
import classNames from 'classnames';

import { CopyToClipboard } from '@/components';

import { addressFilter } from '@/helpers';

import styles from './styles.module.scss';

interface IProps {
	creator: string;
}

export function CreatorLabel({ creator }: IProps) {
	return (
		<div className={styles.creatorLabel}>
			<p>Creator: </p>
			<div className={styles.creatorLabelName}>
				<CopyToClipboard textValue={creator} message="Creator address has been copied!">
					<p>{addressFilter(creator)}</p>
				</CopyToClipboard>
			</div>
		</div>
	);
}
