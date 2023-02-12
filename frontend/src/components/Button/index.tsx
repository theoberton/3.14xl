import cn from 'classnames';
import commonStyles from '@/pages/styles.module.scss';
import styles from '@/components/Button/styles.module.scss';
import ArrowLeftIcon from '@/assets/images/svg/button/arrowLeft.svg';
import ArrowRightIcon from '@/assets/images/svg/button/arrowRight.svg';
import { ButtonKinds } from '@/components/interfaces';

type ButtonProps = {
	onClick?: () => void;
	type?: 'submit' | 'button' | 'reset';
	disabled?: boolean;
	children?: React.ReactNode;
	kind: ButtonKinds;
	icon?: string;
	green?: boolean;
	expanded?: boolean;
};

export function Button(props: ButtonProps) {
	const { type = 'button', onClick, icon, disabled, expanded = false } = props;

	const buttonContent = getButtonContent(props);
	const isIconExists = Boolean(icon);

	const btnClass = cn({
		[styles.button]: true,
		[styles.buttonWithIcon]: isIconExists,
		[styles.buttonExpanded]: expanded,
		[commonStyles.unselectable]: true,
	});

	return (
		<button type={type} className={btnClass} onClick={!disabled ? onClick : () => {}}>
			{buttonContent}
		</button>
	);
}

function getButtonContent(props: ButtonProps): React.ReactNode {
	const { children, kind, green, disabled } = props;

	let basicButtonContent: JSX.Element | null = null;

	const imageClassname = cn({
		[styles.buttonIconImage]: true,
		[styles.buttonIconImageSalad]: green,
	});
	const commonContentClassnames = cn({
		[styles.buttonContentSalad]: !disabled && green,
		[styles.buttonDisabled]: disabled,
	});

	if (kind == ButtonKinds.basic) {
		const resultClassname = cn(styles.buttonContentBasic, commonContentClassnames);

		basicButtonContent = (
			<div className={resultClassname}>
				<div className={styles.buttonContentMain}>{children}</div>
			</div>
		);
	} else if (kind == ButtonKinds.arrowLeft) {
		basicButtonContent = <img className={imageClassname} src={ArrowLeftIcon} />;
	} else if (kind == ButtonKinds.arrowRight) {
		basicButtonContent = <img className={imageClassname} src={ArrowRightIcon} />;
	} else if (kind == ButtonKinds.basicWithIconArrowLeft) {
		const resultImageClassname = cn({
			[imageClassname]: true,
			[styles.buttonContentWhite]: green,
		});
		const resultClassname = cn(styles.buttonContentWithArrow, commonContentClassnames);

		basicButtonContent = (
			<div className={resultClassname}>
				<div className={styles.buttonContentMain}>{children}</div>
				<img className={resultImageClassname} src={ArrowLeftIcon} />
			</div>
		);
	} else if (kind == ButtonKinds.basicWithIconArrowRight) {
		const resultImageClassname = cn({
			[imageClassname]: true,
			[styles.buttonContentWhite]: green,
		});
		const resultClassname = cn(styles.buttonContentWithArrow, commonContentClassnames);

		basicButtonContent = (
			<div className={resultClassname}>
				<div className={styles.buttonContentMain}>{children}</div>
				<img className={resultImageClassname} src={ArrowRightIcon} />
			</div>
		);
	}

	return basicButtonContent;
}
