import { TonConnectButton } from '@tonconnect/ui-react';
import { useCallback } from 'react';
import classNames from 'classnames';

import Logo from '@/assets/images/svg/common/logo.svg';
import styles from '@/components/Header/styles.module.scss';
import buttonStyles from '@/components/Button/styles.module.scss';
import { navigate } from '@/helpers/navigation';
interface IProps {
	transparent?: boolean;
}

export function Header({ transparent }: IProps) {
	const goToSourcePage = useCallback(() => navigate('/'), []);

	const headerClass = classNames([
		styles.headerContainer,
		transparent && styles.headerContainerTransparent,
	]);

	return (
		<header className={headerClass}>
			<img src={Logo} className={styles.headerLogo} onClick={goToSourcePage} />
			<TonConnectButton className={buttonStyles.wallet} />
		</header>
	);
}
