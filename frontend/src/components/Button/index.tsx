
import cn from 'classnames';
import commonStyles from '@/pages/styles.module.scss';
import styles from '@/components/Button/styles.module.scss';
import ArrowLeftIcon from '@/assets/images/svg/button/arrowLeft.svg';
import ArrowRightIcon from '@/assets/images/svg/button/arrowRight.svg';
import { ButtonKinds } from '@/components/Button/interfaces';

type ButtonProps = {
  onClick?: () => void;
  isDisabled?: boolean;
  children?: React.ReactNode,
  kind: ButtonKinds;
  icon?: string;
};

function Button(props: ButtonProps) {
  const {
    onClick,
    icon,
    isDisabled,
  } = props;

  const buttonContent = getButtonContent(props);
  const isIconExists = Boolean(icon);

  const btnClass = cn({
    [styles.button]: true,
    [styles.buttonWithIcon]: isIconExists,
    [commonStyles.unselectable]: true,
  });

  return (
      <button
        type = 'button'
        className={btnClass}
        onClick={!isDisabled ? onClick : () => {}}
      >
        {buttonContent}
      </button>
  );
}

function getButtonContent(props: ButtonProps): React.ReactNode {
  const {
    children,
    icon,
    kind,
  } = props;

  console.log('kind', kind);
  console.log('ButtonKinds.arrowRight', ButtonKinds.arrowRight)
  let basicButtonContent: JSX.Element | null = null;
  console.log('ArrowRightIcon', ArrowRightIcon);
  if(kind == ButtonKinds.basic) {
      basicButtonContent = (
        <div className={styles.buttonContent}>
          <div className={styles.buttonContentMain}>{children}</div>
        </div>
    );
  } else if(kind == ButtonKinds.arrowLeft) {
      basicButtonContent = (
        <div className={styles.buttonContent}>
          {icon && (
            <div className={styles.buttonIconWrapper}>
              <img className={styles.buttonIconRight} src={ArrowLeftIcon} />
            </div>
          )}
        </div>
    );
  } else if(kind == ButtonKinds.arrowRight) {
    basicButtonContent = (
      <div className={styles.buttonContent}>
        <div className={styles.buttonIconWrapper}>
          <img className={styles.buttonIconRight} src={ArrowRightIcon} />
        </div>
      </div>
  );
  } else if(kind == ButtonKinds.basicWithIconArrowLeft) {
    basicButtonContent = (
      <div className={styles.buttonContent}>
        <div className={styles.buttonContentMain}>{children}</div>
          <div className={styles.buttonIconWrapper}>
            <img className={styles.buttonIconRight} src={ArrowLeftIcon} />
          </div>
      </div>
  );
  } else if(kind == ButtonKinds.basicWithIconArrowRight) {
    basicButtonContent = (
      <div className={styles.buttonContent}>
        <div className={styles.buttonContentMain}>{children}</div>
        <div className={styles.buttonIconWrapper}>
          <img className={styles.buttonIconRight} src={ArrowRightIcon} />
        </div>
      </div>
  );
  }

  return basicButtonContent;
}

export default Button;
