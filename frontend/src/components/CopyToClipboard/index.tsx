import { useCopyToClipboard } from 'react-use';
import { Tooltip } from '@/components/Tooltip';
import CopyToClipboardIcon from '@/assets/images/svg/common/copyToClipboard.svg';
import { useCallback, useState } from 'react';

import styles from './styles.module.scss';

type Props = {
	textValue: string;
	children?: React.ReactNode;
	message: string;
};

export function CopyToClipboard({ textValue, message, children }: Props) {
	const [state, copyToClipboard] = useCopyToClipboard();
	const [isTooltipShow, setTooltipShowStatus] = useState(false);

	const copy = useCallback(() => {
		copyToClipboard(textValue);
		setTooltipShowStatus(true);

		setTimeout(() => {
			setTooltipShowStatus(false);
		}, 2000);
	}, [copyToClipboard, textValue]);

	const renderNode = children ? (
		children
	) : (
		<img className={styles.copyToClipboard} src={CopyToClipboardIcon} />
	);

	return (
		<Tooltip isOpen={isTooltipShow} title={message}>
			<div onClick={copy}>{renderNode}</div>
		</Tooltip>
	);
}
