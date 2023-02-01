import { TonConnectButton } from '@tonconnect/ui-react';

function Header() {
	return <div style={{ display: 'flex', justifyContent: 'space-between'}}>
			<span>Header for basic pages with wallet at the right top</span>
			<TonConnectButton />
		</div>;
}

export default Header;
