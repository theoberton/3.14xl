import TooltipComponent from '@mui/material/Tooltip';

import styles from '@/components/Tooltip/styles.module.scss';

type Props = {
	children: React.ReactNode;
	title?: string;
	isOpen: boolean;
};

export function Tooltip(props: Props) {
	const { children, title = '', isOpen } = props;

	return (
		<TooltipComponent
			placement={'top'}
			open={isOpen}
			disableHoverListener
			className={styles.tooltipWrapper}
			title={title}
		>
			<div className={styles.tooltipContent}>{children}</div>
		</TooltipComponent>
	);
}

export default Tooltip;
