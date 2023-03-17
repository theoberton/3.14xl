import { createContext } from 'react';
import { initialDeploymentState } from '@/pages/EditionEdit/constants';
import { DeploymentState } from './interfaces';

export interface IDeploymentState {
	isModalOpened: boolean;
	address: string;
}
export interface IDeploymentContext {
	editionName: string;
	isFormDisabled: boolean;
	ownerDeploymentState: IDeploymentState;
	contentDeploymentState: IDeploymentState;
	getEditionDetails: () => void;
	setEditionName: (name: string) => void;
	setContentDeploymentState: (value: Partial<DeploymentState>) => void;
	setOwnerDeploymentState: (value: Partial<DeploymentState>) => void;
}

// Add edition data here
const defaultValue: IDeploymentContext = {
	editionName: '',
	isFormDisabled: false,
	ownerDeploymentState: initialDeploymentState,
	contentDeploymentState: initialDeploymentState,
	getEditionDetails: () => {
		throw new Error('Not implemented');
	},
	setEditionName: () => {
		throw new Error('Not implemented');
	},
	setContentDeploymentState: () => {
		throw new Error('Not implemented');
	},
	setOwnerDeploymentState: () => {
		throw new Error('Not implemented');
	},
};

export const DeploymentContext = createContext(defaultValue);
