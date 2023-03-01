import cn from 'classnames';
import styles from '@/components/Button/styles.module.scss';
import ArrowLeftIcon from '@/assets/images/svg/button/arrowLeft.svg';
import ArrowRightIcon from '@/assets/images/svg/button/arrowRight.svg';
import { ButtonKinds } from '@/components/interfaces';
import { Link } from 'react-router-dom';

export * from './interfaces';

interface CommonProps {
	kind: ButtonKinds;
	children?: React.ReactNode;
	icon?: string;
	green?: boolean;
	expanded?: boolean;
	basicInverted?: boolean;
	mini?: boolean;
	disabled?: boolean;
	danger?: boolean;
}

interface ButtonProps extends CommonProps {
	componentType: 'button';
	buttonType?: 'submit' | 'button' | 'reset';
	onClick?: () => void;
}

interface LinkProps extends CommonProps {
	componentType: 'link';
	to: string;
}

type IProps = ButtonProps | LinkProps;

export function Button(props: IProps) {
	const { componentType, expanded = false, basicInverted, kind, mini, danger = false } = props;

	const buttonContent = getButtonContent(props);

	const isWithIconType = [ButtonKinds.arrowLeft, ButtonKinds.arrowRight].includes(kind);

	const btnClass = cn({
		[styles.button]: true,
		[styles.buttonBasicInverted]: basicInverted,
		[styles.buttonWithIcon]: isWithIconType,
		[styles.buttonExpanded]: expanded,
		[styles.buttonDanger]: danger,
	});

	if (componentType === 'button') {
		const { buttonType = 'button', onClick, disabled } = props;

		return (
			<button type={buttonType} className={btnClass} onClick={!disabled ? onClick : () => {}}>
				{buttonContent}
			</button>
		);
	}

	if (componentType === 'link') {
		const { to } = props;

		return (
			<div className={btnClass}>
				<Link to={to}>{buttonContent}</Link>
			</div>
		);
	}

	return null;
}

function getButtonContent(props: IProps): React.ReactNode {
	const { children, kind, green, disabled, mini } = props;

	let basicButtonContent: JSX.Element | null = null;

	const imageClassname = cn({
		[styles.buttonIconImage]: true,
		[styles.buttonIconImageSalad]: green,
	});
	const commonContentClassnames = cn({
		[styles.buttonDisabled]: disabled,
		[styles.buttonMini]: mini,
	});

	if (kind == ButtonKinds.basic) {
		const resultClassname = cn({
			[commonContentClassnames]: true,
			[styles.buttonContentBasic]: !mini,
			[styles.buttonDisabled]: disabled,
			[styles.buttonContentBasicMini]: mini,
		});

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
