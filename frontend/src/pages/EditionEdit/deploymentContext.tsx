import { createContext } from 'react';
import { initialDeploymentState } from '@/pages/EditionEdit/constants';
import { DeploymentState } from './interfaces';

// Add edition data here

const defaultValue = {
	editionName: '',
	isFormDisabled: false,
	setEditionName: (name: string) => {},
	ownerDeploymentState: initialDeploymentState,
	contentDeploymentState: initialDeploymentState,
	setContentDeploymentState: (value: Partial<DeploymentState>) => {},
	setOwnerDeploymentState: (value: Partial<DeploymentState>) => {},
};

export const DeploymentContext = createContext(defaultValue);
