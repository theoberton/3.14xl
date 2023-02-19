import { HashRouter, Route, Routes } from 'react-router-dom';

import { PageContainer, WalletLayout } from '@/layouts';

import {
	CreateEdition,
	CreateCollection,
	LandingPage,
	NotFound,
	EditionDetailsPage,
} from '@/pages';

function ApplicationRoutes() {
	return (
		<HashRouter window={window}>
			<Routes>
				<Route element={<PageContainer />}>
					<Route index path="/" element={<LandingPage />} />
					<Route element={<WalletLayout />}>
						<Route path="/edition" element={<EditionDetailsPage />} />
						<Route path="/create-edition" element={<CreateEdition />} />
					</Route>
				</Route>
				<Route path="/create-collection" element={<CreateCollection />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</HashRouter>
	);
}
export default ApplicationRoutes;
