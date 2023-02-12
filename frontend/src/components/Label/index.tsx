import styles from '@/components/Label/styles.module.scss';
import classNames from 'classnames';

type LabelProps = {
	black?: boolean;
	text: string;
};

export function Label(props: LabelProps) {
	const { black = true, text } = props;

	const labelClass = classNames({
		[styles.label]: true,
		[styles.labelBlack]: black,
	});

	return <div className={labelClass}>{text}</div>;
}
