import cn from 'classnames';
import styles from '@/components/Button/styles.module.scss';
import { ButtonKinds, LoaderColors } from '@/components/interfaces';
import { Link } from 'react-router-dom';
import { Loader } from '@/components';
import { LoaderSizes } from '@/components/interfaces';
import ArrowDownIcon from '@/assets/images/svg/button/arrowDown.svg';
export * from './interfaces';

interface CommonProps {
	kind: ButtonKinds;
	children?: React.ReactNode;
	icon?: string;
	green?: boolean;
	expanded?: boolean;
	isSubmitting?: boolean;
	basicInverted?: boolean;
	mini?: boolean;
	disabled?: boolean;
	danger?: boolean;
	trembling?: boolean;
	isInvisible?: boolean;
}

export interface ButtonProps extends CommonProps {
	componentType: 'button';
	buttonType?: 'submit' | 'button' | 'reset';
	onClick?: () => void;
}

export interface LinkProps extends CommonProps {
	componentType: 'link';
	to: string;
}

export type IProps = ButtonProps | LinkProps;

export function Button(props: IProps) {
	const {
		componentType,
		isInvisible = false,
		expanded = false,
		basicInverted,
		kind,
		danger = false,
		isSubmitting,
		trembling,
	} = props;

	const buttonContent = getButtonContent(props);

	const isWithIconType = [ButtonKinds.arrowDown].includes(kind);

	const btnClass = cn({
		[styles.button]: !isWithIconType,
		[styles.buttonIcon]: isWithIconType,
		[styles.buttonBasicInverted]: basicInverted && !isWithIconType,
		[styles.buttonBasicInvertedIcon]: basicInverted && isWithIconType,
		[styles.buttonWithIcon]: isWithIconType,
		[styles.buttonExpanded]: expanded,
		[styles.buttonDanger]: danger,
		[styles.buttonTrembling]: trembling,
		[styles.buttonInvisible]: isInvisible,
	});

	if (componentType === 'button') {
		const { buttonType = 'button', onClick, disabled } = props;

		return (
			<button
				disabled={disabled || isSubmitting}
				type={buttonType}
				className={btnClass}
				onClick={onClick}
			>
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
	const { children, kind, green, disabled, mini, isSubmitting, danger, basicInverted } = props;

	let basicButtonContent: JSX.Element | null = null;

	const imageClassname = cn({
		[styles.buttonIconImage]: true,
		[styles.buttonIconImageSalad]: green,
	});
	const commonContentClassnames = cn({
		[styles.buttonDisabled]: !basicInverted && (disabled || isSubmitting),
		[styles.buttonMini]: mini,
		[styles.buttonDanger]: danger,
	});

	const LoaderComponent = <Loader size={LoaderSizes.small} color={LoaderColors.black} />;

	if (kind == ButtonKinds.basic) {
		const resultClassname = cn({
			[commonContentClassnames]: true,
			[styles.buttonContentBasic]: !mini,
			[styles.buttonContentBasicMini]: mini,
		});

		basicButtonContent = (
			<div className={resultClassname}>
				<div className={styles.buttonContentMain}>{isSubmitting ? LoaderComponent : children}</div>
			</div>
		);
	} else if (kind == ButtonKinds.arrowDown) {
		basicButtonContent = <img className={imageClassname} src={ArrowDownIcon} />;
	}

	return basicButtonContent;
}
