import { HashRouter, Route, Routes } from 'react-router-dom';

import { PageContainer, WalletLayout } from '@/layouts';

import {
	CreateEdition,
	CreateCollection,
	LandingPage,
	NotFound,
	EditionDetailsPage,
	CreatedEditionsPage,
} from '@/pages';

function ApplicationRoutes() {
	return (
		<HashRouter window={window}>
			<Routes>
				<Route element={<PageContainer />}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/edition" element={<EditionDetailsPage />} />
					<Route path="/editions" element={<CreatedEditionsPage />} />
					<Route path="/create-edition" element={<CreateEdition />} />
				</Route>
				<Route path="/create-collection" element={<CreateCollection />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</HashRouter>
	);
}
export default ApplicationRoutes;
