import { request } from '@/helpers';
import { HTTP_METHODS_MAP } from '@/constants/common';

import { ManagerContract, ManagerContractList } from './types';

export const createManagerContract = (data: ManagerContract) =>
	request(HTTP_METHODS_MAP.POST, 'nft-collection-manager', data);

export const getManagerContractByOwner = (ownerAddress: string): Promise<ManagerContractList> =>
	request(HTTP_METHODS_MAP.GET, 'nft-collection-manager', { ownerAddress });

export const getManagerContracts = (): Promise<ManagerContractList> =>
	request(HTTP_METHODS_MAP.GET, 'nft-collection-manager');

export const updateManagerContracts = (address: string, data: Partial<ManagerContract>) =>
	request(HTTP_METHODS_MAP.PUT, `nft-collection-manager/${address}`, data);
