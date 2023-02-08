import { Route, Routes } from 'react-router-dom';

import { history } from '@/helpers';
import { CustomRouter } from '@/components';
import { WalletLayout, PageContainer } from '@/layouts';
import { LandingPage, CreateEditionPage, EditionPage, CreateCollection } from '@/pages';

function ApplicationRoutes() {
	return (
		<CustomRouter history={history}>
			<Routes>
				<Route element={<PageContainer />}>
					<Route element={<WalletLayout />}>
						<Route index path="" element={<LandingPage />} />
						<Route path="edition" element={<CreateEditionPage />} />
						<Route path="edition/:address" element={<EditionPage />} />
					</Route>
				</Route>
				<Route path="create-collection" element={<CreateCollection />} />
			</Routes>
		</CustomRouter>
	);
}

export default ApplicationRoutes;
