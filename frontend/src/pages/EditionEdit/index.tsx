import { useCallback, useState, useMemo, useEffect } from 'react';
import { useGetSetState} from 'react-use';
import { useTonClient } from '@/hooks/useTonClient';
import { useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from 'react-helmet-async';
import { PageLoader } from '@/components';
import { convertToBounceableAddress, getFullNftCollectionData, ManagerFullData } from '@/helpers';

import { initialDeploymentState } from '@/pages/EditionEdit/constants';
import { DeploymentContext } from '@/pages/EditionEdit/deploymentContext';
import { Content } from '@/pages/EditionEdit/Content';
import { useTonAddress } from '@tonconnect/ui-react';
// Hotfix for https://github.com/yocontra/react-responsive/issues/306, remove when resolved
console.log(useMediaQuery);

function EditionEdit() {
	const { collectionAddress } = useParams();
	const [editionName, setName] = useState<string>('');
	const accountAddress = useTonAddress();
	// const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
	const [edtionDetails, setEditionDetails] = useState<ManagerFullData | null>(null);

	const [getContentDeploymentState, setContentDeploymentState] =
		useGetSetState(initialDeploymentState);
	const [getOwnerDeploymentState, setOwnerDeploymentState] = useGetSetState(initialDeploymentState);

	const setEditionName = useCallback(
		(name: string) => {
			setName(name);
		},
		[setName]
	);

	const tonClient = useTonClient();

	const getEditionDetails = useCallback(async () => {
		if (!collectionAddress || !tonClient) {
			return null;
		}
		setLoading(true);

		try {
			
			const fullData = await getFullNftCollectionData(tonClient, collectionAddress);

			setEditionName(fullData.content.name);
			setEditionDetails(fullData);
		} catch (error) {
			console.log('error', error);	
		} finally {
			setLoading(false);
		}
	}, [tonClient, collectionAddress]);

	useEffect(() => {
		getEditionDetails();
	}, [collectionAddress, tonClient]);

	const mangerAddress = convertToBounceableAddress(
		edtionDetails?.managerAddress
	);

	const loggedAccountAddress = convertToBounceableAddress(accountAddress);

	const isUserCollection = mangerAddress == loggedAccountAddress;
	const isFormDisabled = Boolean(mangerAddress && !isUserCollection);

	const contentDeploymentState = getContentDeploymentState();
	const ownerDeploymentState = getOwnerDeploymentState();

	const ContextProviderValue = useMemo(
		() => ({
			editionName,
			setEditionName,
			ownerDeploymentState,
			contentDeploymentState,
			isFormDisabled,
			getEditionDetails,
			setContentDeploymentState,
			setOwnerDeploymentState,
		}),
		[
			editionName,
			isFormDisabled,
			setEditionName,
			ownerDeploymentState,
			contentDeploymentState,
			setContentDeploymentState,
			setOwnerDeploymentState,
			getEditionDetails,
		]
	);

	if (isLoading && !edtionDetails) {
		return <PageLoader />;
	}

	return (
		<DeploymentContext.Provider value={ContextProviderValue}>
			<Helmet title={'3.14XL - Edit edition'} />
			{edtionDetails && <Content editionData={edtionDetails} />}
		</DeploymentContext.Provider>
	);
}

export default EditionEdit;


