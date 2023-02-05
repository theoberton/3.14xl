import { TonConnectButton } from '@tonconnect/ui-react';
import Logo from '@/assets/images/svg/common/logo.svg';
import styles from '@/components/Header/styles.module.scss';

function Header() {
	return (
		<header>
			<div className={styles.headerContainer}>
				<img src={Logo} />
				<TonConnectButton />
			</div>
		</header>
	);
}

export default Header;
