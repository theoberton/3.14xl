import { forwardRef } from 'react';
import { CopyToClipboard } from '@/components';
import { addressFilter } from '@/helpers';
import styles from './styles.module.scss';
import { useMurmurHash } from '@/hooks';

const PALETTE = [
	'#FF7A7A',
	'#FFB470',
	'#F8D868',
	'#A9C370',
	'#95C5E0',
	'#7BA0FF',
	'#B7A5FF',
	'#F799FF',
] as const;

const AddressIcon = ({ fill, mirror }: { fill: (typeof PALETTE)[number]; mirror: boolean }) => {
	return (
		<svg
			transform={`scale(${mirror ? '-1' : '1'} 1)`}
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect width="32" height="32" rx="4" fill={fill} />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M24 10C24 8.89543 23.1046 8 22 8H18C16.8954 8 16 8.89543 16 10V13C16 14.1046 15.1046 15 14 15H10C8.89543 15 8 15.8954 8 17V21C8 22.1046 8.89543 23 10 23H14C15.1046 23 16 22.1046 16 21V18C16 16.8954 16.8954 16 18 16H22C23.1046 16 24 15.1046 24 14V10Z"
				fill="white"
			/>
		</svg>
	);
};

export interface AddressLabelProps {
	address: string;
	withCopy?: boolean;
	withIcon?: boolean;
}

export const AddressLabel = forwardRef<HTMLDivElement, AddressLabelProps>(
	({ address, withCopy = true, withIcon = true }, ref) => {
		const hash = useMurmurHash(address);
		const fill = PALETTE[hash % PALETTE.length];
		const mirror = Boolean(hash % 2);

		const child = (
			<div ref={ref} className={styles.addressLabel}>
				<span>{addressFilter(address)}</span>
				{withIcon && <AddressIcon fill={fill} mirror={mirror} />}
			</div>
		);

		if (withCopy) {
			return (
				<CopyToClipboard textValue={address} message="Address has been copied!">
					{child}
				</CopyToClipboard>
			);
		}

		return child;
	}
);
