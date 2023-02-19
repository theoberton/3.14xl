import { Route, Routes } from 'react-router-dom';

import { history } from '@/helpers';
import { CustomRouter } from '@/components';
import { PageContainer, WalletLayout } from '@/layouts';

import {
	CreateEdition,
	CreateCollection,
	LandingPage,
	CreateEditionOld,
	NotFound,
	EditionDetailsPage,
} from '@/pages';

function ApplicationRoutes() {
	return (
		<CustomRouter history={history}>
			<Routes>
				<Route element={<PageContainer />}>
					<Route index path="/" element={<LandingPage />} />
					<Route element={<WalletLayout />}>
						<Route path="/edition" element={<CreateEditionOld />} />
						<Route path="/edition/:editionId" element={<EditionDetailsPage />} />
						<Route path="/create-edition" element={<CreateEdition />} />
					</Route>
				</Route>
				<Route path="/create-collection" element={<CreateCollection />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</CustomRouter>
	);
}
export default ApplicationRoutes;
