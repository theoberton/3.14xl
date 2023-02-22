import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { TonConnectButton } from '@tonconnect/ui-react';

import Logo from '@/assets/images/svg/common/logo.svg';
import styles from '@/components/Header/styles.module.scss';
import buttonStyles from '@/components/Button/styles.module.scss';

export function Header() {
	const headerClass = classNames([styles.headerContainer, styles.headerContainerTransparent]);

	return (
		<header className={headerClass}>
			<Link to="/">
				<img src={Logo} className={styles.headerLogo} />
			</Link>
			<TonConnectButton className={buttonStyles.wallet} />
		</header>
	);
}
