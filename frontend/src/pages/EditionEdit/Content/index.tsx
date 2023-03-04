import { useCallback, useState, useEffect, useContext } from 'react';
import { useAsync } from 'react-use';
import { Address } from 'ton-core';

import { Formik } from 'formik';
import { useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Helmet } from 'react-helmet-async';
import { CollectionContent } from '@/wrappers/types';
import { fromUnixToDate } from '@/utils';
import { dateToUnix } from '@/helpers';
import { Owner } from '@/pages/EditionEdit/Owner';
import { DeploymentContext } from '@/pages/EditionEdit/deploymentContext';

import { useTonClient } from '@/hooks/useTonClient';

import FormArea from './FormArea';
import { Preview } from '@/pages/CreateEdition/Preview';
import { updateEdition } from '@/pages/EditionEdit/helpers';

import { formSchema } from './validation';
import { FormValues } from './interfaces';

// Hotfix for https://github.com/yocontra/react-responsive/issues/306, remove when resolved
console.log(useMediaQuery);

import styles from './../styles.module.scss';

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
};

export function Content({ editionData }: Props) {
	const { collectionAddress } = useParams();
	const { setContentDeploymentState } = useContext(DeploymentContext);

	const accountAddress = useTonAddress();
	const tonClient = useTonClient();
	const [tonConnectUI] = useTonConnectUI();

	const handleSubmit = useCallback(
		async (values: FormValues, bag: any) => {
			const sourceEditionData = editionData?.content;

			if (!tonClient || !values.media || !sourceEditionData) return;
			const turnOffSubmition = () => bag.setSubmitting(false);

			bag.setSubmitting(true);

			try {
				const updatedEditionData = {
					description: values.description,
					image: values.media,
					price: values.price,
					payoutAddress: values.payoutAddress,
					dateStart: values.validity.start ? dateToUnix(values.validity.start) : 0,
					dateEnd: values.validity.end ? dateToUnix(values.validity.end) : 0,
				};

				await updateEdition(
					tonClient,
					tonConnectUI,
					collectionAddress!,
					accountAddress,
					updatedEditionData,
					sourceEditionData,
					turnOffSubmition
				);

				setContentDeploymentState({
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
			tonConnectUI,
			editionData?.content,
			collectionAddress,
			accountAddress,
			editionData?.managerAddress,
		]
	);

	const editEditionInitialValues: FormValues = {
		name: editionData.content.name,
		symbol: editionData.content.symbol,
		description: editionData.content.description,
		media: editionData.content.image,
		price: editionData.content.price,
		validity: {
			start: editionData.content.dateStart ? fromUnixToDate(editionData.content.dateStart) : null,
			end: editionData.content.dateEnd ? fromUnixToDate(editionData.content.dateEnd) : null,
		},
		payoutAddress: editionData.content.payoutAddress,
	};

	return (
		<Formik
			initialValues={editEditionInitialValues}
			validationSchema={formSchema}
			enableReinitialize
			onSubmit={handleSubmit}
		>
			<section className={styles.editEditionContainer}>
				{/* <div className={styles.editEditionContainerWrapper}> */}
				<Helmet title={'3.14XL - Edit edition'} />
				<div className={styles.editEditionControls}>
					<FormArea />
					<Owner editionData={editionData} />
				</div>
				<Preview />
			</section>
		</Formik>
	);
}
