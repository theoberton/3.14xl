import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Button, ButtonProps, ButtonKinds } from '@/components';

export function ConnectButton({
	children,
	...rest
}: React.PropsWithChildren<Partial<ButtonProps>>) {
	const tonConnectAddress = useTonAddress();
	const [tonConnectUI] = useTonConnectUI();

	if (tonConnectAddress) {
		return <>{children}</>;
	}

	return (
		<Button
			componentType="button"
			kind={ButtonKinds.basic}
			onClick={() => tonConnectUI.connectWallet()}
			{...rest}
		>
			Connect wallet
		</Button>
	);
}
