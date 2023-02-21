import { HashRouter, Route, Routes } from 'react-router-dom';

import { PageContainer } from '@/layouts';

import {
	CreateEdition,
	CreateCollection,
	LandingPage,
	NotFound,
	EditionDetailsPage,
	ExplorePage,
	MintedEditionsPage,
} from '@/pages';

function ApplicationRoutes() {
	return (
		<HashRouter window={window}>
			<Routes>
				<Route element={<PageContainer />}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/edition/:collectionAddress" element={<EditionDetailsPage />} />
					<Route path="/explore" element={<ExplorePage />} />
					<Route path="/minted" element={<MintedEditionsPage />} />
					<Route path="/create-edition" element={<CreateEdition />} />
				</Route>
				<Route path="/create-collection" element={<CreateCollection />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</HashRouter>
	);
}
export default ApplicationRoutes;
