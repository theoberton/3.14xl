import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Button, ButtonKinds } from '@/components/Button';
import { useTonAddress } from '@tonconnect/ui-react';

import buttonStyles from '@/components/Button/styles.module.scss';
import { isTestnet } from '@/helpers/location';

import Logo from '@/assets/images/svg/common/logo.svg';
import styles from './styles.module.scss';

export function Header() {
	const headerClass = classNames([styles.headerContainer, styles.headerContainerTransparent]);
	const address = useTonAddress();

	return (
		<header className={headerClass}>
			<Link to="/">
				<img src={Logo} className={styles.headerLogo} />
				{isTestnet() ? 'Testnet' : null}
			</Link>
			<div style={{ display: 'flex', gap: '20px' }}>
				{address && (
					<Button
						componentType="link"
						to="/my-editions"
						kind={ButtonKinds.basic}
						basicInverted
						mini
					>
						My editions
					</Button>
				)}
				<TonConnectButton className={buttonStyles.wallet} />
			</div>
		</header>
	);
}
