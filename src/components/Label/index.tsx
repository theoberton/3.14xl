import styles from '@/components/Label/styles.module.scss';
import classNames from 'classnames';

type LabelProps = {
	black?: boolean;
	grey?: boolean;
	text: string;
	mini?: boolean;
	onClick?: () => void;
};

export function Label(props: LabelProps) {
	const { black = true, text, grey, mini, onClick } = props;

	const labelClass = classNames({
		[styles.label]: true,
		[styles.labelClickable]: Boolean(onClick),
		[styles.labelBlack]: black,
		[styles.labelGrey]: grey,
		[styles.labelMini]: mini,
	});

	return <div className={labelClass} onClick={onClick}>{text}</div>;
}
