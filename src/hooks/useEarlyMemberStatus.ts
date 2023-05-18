// AGHI3GU355KXOYIAAAABKVUUZMSQEQSU54FJKYYMLVKYWBRIFEM2AL3LIAW2XNJJHVSHEYY

import { useCallback, useEffect, useState } from 'react';
import { NftItem } from '@/wrappers';
import { TonClient } from 'ton';
import { useTonClient } from '@/hooks/useTonClient';
import { Address } from 'ton-core';
import { useTonAddress } from '@tonconnect/ui-react';

const earlyMembersNFTList = [
	'EQCTmbQ3hx8kVxte9FZR8KazQazrzmbd2hYtOTfKugNdx7o3',
	'EQD3KkkGFkdsZfwRYiSos2KQQmS4ZN8yO5RP2At2Ay0OjWzS',
	'EQCsGfXKFfpCkTWdcPgEG_NJ2IamD98G3-tXeG14RWX_gLww',
	'EQC2RrW9pJbBkA1f5rHCJ3Dqo6zJ7sTKgfJ0Nb55OmFulyua',
	'EQB4RT7ClaS1dgcczERvZYhfLmRtmwUCh1UrgZotZTsEPSFK',
	'EQCUMyFPFPpEy7X7ReUbDqkauy01MhvGFmOy1DzZ59yF3Sh-',
	'EQAXZf8q1K1FtoZWPdq1lmq0CNcoJBc082xPPS3Ko67H6eMJ',
	'EQBEvHMrBOAmFmOyhElD87x1ngoTa9mHlu1-P-5DwCaOHwNh',
	'EQB3Yv7TQtyJFnhXg03jOGv3FkG_OosxKywSbW21U1Xnm4D7',
	'EQC_CDkhOdQjCOt2zZzGdbI5NWHHp3rZYG0XJev8Q6ef6GN9',
	'EQBP1PZG7IN7vvlplNZZliwrovwPeeP1Q1DBVHlaYBMiTOwW',
	'EQBnGXXByuLfsCCWsiWJGI23xSSAgyrjDDvw-pxvy9NGxc7R',
	'EQBRtfE_ovfwXv3rAVs2r8wQdqd1Ym4igbX0vwiPyU3I6M3F',
	'EQC89KxOv_ToW_3uVjJCHglFX5bEF4fEeWuubxERYPXXgRyj',
	'EQCprtGF78RFcRkATdzcMSXcC1aYLpTnJy-acuY7nXNkpvcQ',
	'EQC-ZtD3QtULNPteRu1vnJOzamwSZJcMUpWPmJ_wjwQKDVBo',
	'EQBwlbfWZTXBICnJ_Tnq7P_o5_uMKr-lK9QvQkzLmdyk9TBn',
];

export const useEarlyMemberStatus = () => {
	const [isEarlyMember, setEarlyMemberStatus] = useState<boolean | undefined>(undefined);
	const tonClient = useTonClient();
	const accountAddress = useTonAddress();

	const checkEarlyMemberStatus = useCallback(async () => {
		if (!tonClient || !accountAddress) {
			return;
		}
		const nftItems = earlyMembersNFTList.map(address =>
			NftItem.createFromAddress(Address.parse(address))
		);

		const nftItemsContracts = nftItems.map(nftItem => tonClient.open(nftItem));

		const ownerAddressesRaw = await Promise.all(
			nftItemsContracts.map(async contract => {
				try {
					const ressAdr = contract.address.toString();
					console.log(ressAdr);

					let data;
					try {
						data = await contract.getData();
					} catch (error) {
						console.log(`Errorr in ${ressAdr}`);
						console.log('error during', error);
						return;
					}

					if (!data.isInitialized) {
						return null;
					}
					return data.ownerAddress.toString();
				} catch (error) {
					return null;
				}
			})
		);
		const ownerAddresses = ownerAddressesRaw.filter(Boolean);
		console.log('ownerAddresses', ownerAddresses);

		const isEarlyMember = ownerAddresses.includes(accountAddress);
		setEarlyMemberStatus(isEarlyMember);
	}, [tonClient, accountAddress]);

	useEffect(() => {
		checkEarlyMemberStatus();
	}, [tonClient, accountAddress]);

	return isEarlyMember;
};
