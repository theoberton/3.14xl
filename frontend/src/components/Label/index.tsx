import styles from '@/components/Label/styles.module.scss';
import classNames from 'classnames';

type LabelProps = {
	black?: boolean;
	grey?: boolean;
	text: string;
	mini?: boolean;
};

export function Label(props: LabelProps) {
	const { black = true, text, grey, mini} = props;

	const labelClass = classNames({
		[styles.label]: true,
		[styles.labelBlack]: black,
		[styles.labelGrey]: grey,
		[styles.labelMini]: mini,
	});

	return <div className={labelClass}>{text}</div>;
}
