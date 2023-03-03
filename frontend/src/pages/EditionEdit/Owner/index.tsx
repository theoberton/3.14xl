import { useCallback, useState } from 'react';
import { Address } from 'ton-core';

import { Formik } from 'formik';
import { useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Helmet } from 'react-helmet-async';
import { CollectionContent } from '@/wrappers/types';

import { useTonClient } from '@/hooks/useTonClient';
import { updateOwner } from './helper';
import { FormArea } from './FormArea';
// import { updateEdition } from '@/pages/EditionEdit/Owner/helper';
import { useGetSetState } from 'react-use';

import { formSchema } from './validation';
import { FormValues } from './interfaces';

// Hotfix for https://github.com/yocontra/react-responsive/issues/306, remove when resolved
console.log(useMediaQuery);

import styles from './../styles.module.scss';

const initialDeploymentState = {
	isModalOpened: false,
	address: '',
	editionName: '',
};

type Props = {
	editionData: {
		collectionData: {
			nextItemIndex: number;
			ownerAddress: Address;
			collectionContentUri: string;
		};
		content: CollectionContent;
		managerAddress: Address;
	};
	setDeploymentState: (
		patch: Partial<{
			isModalOpened: boolean;
			address: string;
			editionName: string;
		}>
	) => void;
	deploymentState: {
		isModalOpened: boolean;
		address: string;
		editionName: string;
	};
};

export function Owner({ editionData, setDeploymentState, deploymentState }: Props) {
	const { collectionAddress } = useParams();

	const handleDeploymentModalClose = useCallback(() => {
		setDeploymentState(initialDeploymentState);
	}, []);

	const accountAddress = useTonAddress();
	const tonClient = useTonClient();
	const [tonConnectUI] = useTonConnectUI();

	const handleSubmit = useCallback(
		async (values: FormValues, bag: any) => {
			const sourceEditionData = editionData?.content;

			if (!tonClient || !sourceEditionData) return;
			const turnOffSubmition = () => bag.setSubmitting(false);

			bag.setSubmitting(true);

			try {
				const updatedEditionData = {
					managerAddress: values.managerAddress,
				};

				await updateOwner(
					tonClient,
					tonConnectUI,
					collectionAddress!,
					updatedEditionData,
					turnOffSubmition
				);

				setDeploymentState({
					isModalOpened: true,
					address: collectionAddress,
				});
			} catch (error) {
				console.error(error);
			} finally {
				turnOffSubmition();
			}
		},
		[editionData?.content, collectionAddress, accountAddress, editionData?.managerAddress]
	);

	const editManagerInitialValues: FormValues = {
		managerAddress: editionData.managerAddress.toString(),
	};

	return (
		<Formik
			initialValues={editManagerInitialValues}
			validationSchema={formSchema}
			enableReinitialize
			onSubmit={handleSubmit}
		>
			{/* <section className={styles.editEditionContainer}> */}
			<>
				<Helmet title={'3.14XL - Edit edition'} />
				<div className={styles.editEditionControlsOwner}>
					<FormArea
						deploymentState={deploymentState}
						handleDeploymentModalClose={handleDeploymentModalClose}
					/>
				</div>
				{/* </div> */}
				{/* </section> */}
			</>
		</Formik>
	);
}

export default Owner;
