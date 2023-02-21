import { HashRouter, Route, Routes } from 'react-router-dom';
import React, {Suspense} from 'react';


const PageContainer = React.lazy(() => import('@/layouts/PageContainer'));
const CreateEdition = React.lazy(() => import('@/pages/CreateEdition'));
const CreateCollection = React.lazy(() => import('@/pages/CreateCollection'));
const LandingPage = React.lazy(() => import('@/pages/Landing'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const EditionDetailsPage = React.lazy(() => import('@/pages/EditionDetails'));
const ExplorePage = React.lazy(() => import('@/pages/Explore'));
const MintedEditionsPage = React.lazy(() => import('@/pages/MintedEditions'));

function ApplicationRoutes() {
	return (
		<HashRouter window={window}>
			<Routes>
				<Route element={
					<Suspense>
						<PageContainer />
					</Suspense>
				}>
					<Route path="/" element={
						<Suspense>
							<LandingPage />
						</Suspense>
					} />
					<Route path="/edition/:collectionAddress" element={
						<Suspense>
							<EditionDetailsPage />
						</Suspense>
					}/>
					<Route path="/minted" element={
						<Suspense>
							<MintedEditionsPage />
						</Suspense>
					} />
					<Route path="/explore" element={
						<Suspense>
							<ExplorePage />
						</Suspense>
					} />
					<Route path="/create-edition" element={
						<Suspense>
							<CreateEdition />
						</Suspense>
					} />
				</Route>
				<Route path="/create-collection" element={
					<Suspense>
						<CreateCollection />
					</Suspense>
				} />
				<Route path="*" element={
					<Suspense>
						<NotFound />
					</Suspense>
				} />
			</Routes>
		</HashRouter>
	);
}
export default ApplicationRoutes;
