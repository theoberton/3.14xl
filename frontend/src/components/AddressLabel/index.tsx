import { CopyToClipboard } from '@/components';
import { addressFilter } from '@/helpers';
import styles from './styles.module.scss';

function AddressIcon({ fill = "#A9C470" }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill={fill} />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M24 10C24 8.89543 23.1046 8 22 8H18C16.8954 8 16 8.89543 16 10V13C16 14.1046 15.1046 15 14 15H10C8.89543 15 8 15.8954 8 17V21C8 22.1046 8.89543 23 10 23H14C15.1046 23 16 22.1046 16 21V18C16 16.8954 16.8954 16 18 16H22C23.1046 16 24 15.1046 24 14V10Z" fill="white"/>
    </svg>
  )
}

export function AddressLabel({ address, withIcon = true }: { address: string, withIcon?: boolean }) {
	return (
		<CopyToClipboard textValue={address} message="Address has been copied!">
			<div className={styles.addressLabel}>
				<span>{addressFilter(address)}</span>
				{withIcon && <AddressIcon />}
			</div>
		</CopyToClipboard>
	);
}
