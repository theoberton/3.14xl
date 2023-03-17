import TooltipComponent from '@mui/material/Tooltip';
import _ from 'lodash';
import styles from '@/components/Tooltip/styles.module.scss';

type Props = {
	children: React.ReactNode;
	title?: string;
	isOpen?: boolean;
	isHoverable?: boolean;
};

export function Tooltip(props: Props) {
	const { children, title = '', isOpen, isHoverable } = props;

	const open = _.isBoolean(isOpen) ? isOpen : undefined;

	return (
		<TooltipComponent
			placement={'top'}
			open={open}
			enterTouchDelay={10}
			leaveTouchDelay={5000}
			leaveDelay={500}
			disableHoverListener={!isHoverable}
			className={styles.tooltipWrapper}
			title={title}
		>
			<div className={styles.tooltipContent}>{children}</div>
		</TooltipComponent>
	);
}

export default Tooltip;
