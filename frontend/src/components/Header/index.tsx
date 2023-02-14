import { TonConnectButton } from '@tonconnect/ui-react';
import { useCallback } from 'react';

import Logo from '@/assets/images/svg/common/logo.svg';
import styles from '@/components/Header/styles.module.scss';
import buttonStyles from '@/components/Button/styles.module.scss';
import { navigate } from '@/helpers/navigation';

export function Header() {
	const goToSourcePage = useCallback(() => navigate('/'), []);
	
	return (
			<header className={styles.headerContainer}>
				<img src={Logo} className={styles.headerLogo} onClick={goToSourcePage} />
				<TonConnectButton className={buttonStyles.wallet}/>
		</header>
	);
}
