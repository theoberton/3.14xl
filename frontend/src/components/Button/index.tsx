
import cn from 'classnames';
import commonStyles from '@/pages/styles.module.scss';
import styles from '@/components/Button/styles.module.scss';

interface ButtonProps {
  onClick?: () => void;
  isDisabled?: boolean;
  children: React.ReactNode,
  icon: string;
}

function Button(props: ButtonProps) {
  const {
    onClick,
    children,
    icon,
    isDisabled,
  } = props;

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
      <div className={styles.buttonContent}>
        <div className={styles.buttonContentMain}>{children}</div>
        {icon && (
          <div className={styles.buttonIconWrapper}>
            <img className={styles.buttonIconRight} src={icon} />
          </div>
        )}
      </div>
    </button>
  );
}

export default Button;
