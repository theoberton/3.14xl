import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Button, ButtonKinds } from '@/components/Button';
import { AddressLabel } from '@/components';
import { Menu, MenuItem, MenuDivider, MenuButton  } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/transitions/slide.css';

import { isTestnet } from '@/helpers/location';

import Logo from '@/assets/images/svg/common/logo.svg';
import styles from './styles.module.scss';
import { useCallback } from 'react';
import { useNavigateHandler } from '@/hooks';

function AuthMenu() {
	const [tonConnectUI] = useTonConnectUI();

	const goToMyEditions = useNavigateHandler('/my-editions');
	const disconnectHandler = useCallback(async () => {
		await tonConnectUI.disconnect();
	}, [tonConnectUI.disconnect]);


	if (!tonConnectUI.connected || !tonConnectUI.account) {
		return <Button componentType="button" kind={ButtonKinds.basic} basicInverted onClick={() => tonConnectUI.connectWallet()}>Connect wallet</Button>
	}

	return (
		<Menu
			offsetY={8}
			align="end"
			theming="dark"
			transition
			menuButton={<MenuButton><AddressLabel address={tonConnectUI.account.address} withCopy={false} /></MenuButton>}>
			<MenuItem onClick={goToMyEditions}>My editions</MenuItem>
			<MenuDivider />
			<MenuItem onClick={disconnectHandler}>Disconnect</MenuItem>
		</Menu>
	)
}

export function Header() {
	const headerClass = classNames([styles.headerContainer, styles.headerContainerTransparent]);

	return (
		<header className={headerClass}>
			<Link to="/">
				<img src={Logo} className={styles.headerLogo} />
				{isTestnet() ? 'Testnet' : null}
			</Link>
			<AuthMenu />
		</header>
	);
}
