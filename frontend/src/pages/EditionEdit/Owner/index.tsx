import { useCallback, useState, useContext } from 'react';
import { Address } from 'ton-core';

import { Formik } from 'formik';
import { useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Helmet } from 'react-helmet-async';

import { useTonClient } from '@/hooks/useTonClient';
import { updateOwner } from './helper';
import { FormArea } from './FormArea';
// import { updateEdition } from '@/pages/EditionEdit/Owner/helper';

import { formSchema } from './validation';
import { FormValues } from './interfaces';
import { DeploymentContext } from '@/pages/EditionEdit/deploymentContext';

// Hotfix for https://github.com/yocontra/react-responsive/issues/306, remove when resolved
console.log(useMediaQuery);

import styles from './../styles.module.scss';
import { EditionData } from '../interfaces';


type Props = {
	editionData: EditionData;
};

export function Owner({ editionData }: Props) {
	const { collectionAddress } = useParams();

	const { setOwnerDeploymentState } = useContext(DeploymentContext);

	const accountAddress = useTonAddress();
	const tonClient = useTonClient();
	const [tonConnectUI] = useTonConnectUI();

	const handleSubmit = useCallback(
		async (values: FormValues, bag: any) => {
			if (!tonClient) return;

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

				setOwnerDeploymentState({
					isModalOpened: true,
					address: collectionAddress,
				});
			} catch (error) {
				console.error(error);
			} finally {
				turnOffSubmition();
			}
		},
		[
			tonClient,
			editionData?.content,
			collectionAddress,
			accountAddress,
			editionData?.managerAddress,
		]
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
			<>
				<Helmet title={'3.14XL - Edit edition'} />
				<div className={styles.editEditionControlsOwner}>
					<FormArea />
				</div>
			</>
		</Formik>
	);
}
