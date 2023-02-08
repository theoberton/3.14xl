import cn from 'classnames';
import commonStyles from '@/pages/styles.module.scss';
import ArrowLeftIcon from '@/assets/images/svg/button/arrowLeft.svg';
import ArrowRightIcon from '@/assets/images/svg/button/arrowRight.svg';
import { ButtonKinds } from '@/components';
import styles from './styles.module.scss';

type ButtonProps = {
	onClick?: () => void;
	isDisabled?: boolean;
	children?: React.ReactNode;
	kind: ButtonKinds;
	icon?: string;
	green?: Boolean;
};

export function Button(props: ButtonProps) {
	const { onClick, icon, isDisabled } = props;

	const buttonContent = getButtonContent(props);
	const isIconExists = Boolean(icon);

	const btnClass = cn({
		[styles.button]: true,
		[styles.buttonWithIcon]: isIconExists,
		[commonStyles.unselectable]: true,
	});

	return (
		<button type="button" className={btnClass} onClick={!isDisabled ? onClick : () => {}}>
			{buttonContent}
		</button>
	);
}

function getButtonContent(props: ButtonProps): React.ReactNode {
	const { children, kind, green } = props;

	let basicButtonContent: JSX.Element | null = null;

	const imageClassname = cn({
		[styles.buttonIconImage]: true,
		[styles.buttonIconImageSalad]: green,
	});
	const contentClassname = cn({
		[styles.buttonContent]: true,
		[styles.buttonContentSalad]: green,
	});

	if (kind == ButtonKinds.basic) {
		basicButtonContent = (
			<div className={contentClassname}>
				<div className={styles.buttonContentMain}>{children}</div>
			</div>
		);
	} else if (kind == ButtonKinds.arrowLeft) {
		basicButtonContent = <img className={imageClassname} src={ArrowLeftIcon} />;
	} else if (kind == ButtonKinds.arrowRight) {
		basicButtonContent = <img className={imageClassname} src={ArrowRightIcon} />;
	} else if (kind == ButtonKinds.basicWithIconArrowLeft) {
		const finalImageClassname = cn({
			[imageClassname]: true,
			[styles.buttonContentWhite]: green,
		});
		basicButtonContent = (
			<div className={contentClassname}>
				<div className={styles.buttonContentMain}>{children}</div>
				<img className={finalImageClassname} src={ArrowLeftIcon} />
			</div>
		);
	} else if (kind == ButtonKinds.basicWithIconArrowRight) {
		const finalImageClassname = cn({
			[imageClassname]: true,
			[styles.buttonContentWhite]: green,
		});

		basicButtonContent = (
			<div className={contentClassname}>
				<div className={styles.buttonContentMain}>{children}</div>
				<img className={finalImageClassname} src={ArrowRightIcon} />
			</div>
		);
	}

	return basicButtonContent;
}
