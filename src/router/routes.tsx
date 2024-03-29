import { HashRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Page, LazyLoad } from '@/components';
import SomethingWentWrong from '@/pages/SomethingWentWrong';

import 'nprogress/nprogress.css';

const CreateEdition = withSuspense(React.lazy(() => import('@/pages/CreateEdition')));
const LandingPage = withSuspense(React.lazy(() => import('@/pages/Landing')));
const NotFound = withSuspense(React.lazy(() => import('@/pages/NotFound')));
const EditionDetailsPage = withSuspense(React.lazy(() => import('@/pages/EditionDetails')));
const EditionEditPage = withSuspense(React.lazy(() => import('@/pages/EditionEdit')));
const ExplorePage = withSuspense(React.lazy(() => import('@/pages/Explore')));
const MintedEditionsPage = withSuspense(React.lazy(() => import('@/pages/MintedEditions')));
const MyEditions = withSuspense(React.lazy(() => import('@/pages/MyEditions')));

function ApplicationRoutes() {
	return (
		<HashRouter window={window}>
			<ErrorBoundary FallbackComponent={SomethingWentWrong}>
				<Routes>
					<Route element={<Page />}>
						<Route path="/edition/:collectionAddress" element={<EditionDetailsPage />} />
						<Route path="/edition/:collectionAddress/edit" element={<EditionEditPage />} />
						<Route path="/minted" element={<MintedEditionsPage />} />
						<Route path="/explore" element={<ExplorePage />} />
						<Route path="/my-editions" element={<MyEditions />} />
						<Route path="/create-edition" element={<CreateEdition />} />
						<Route path="*" element={<NotFound />} />
					</Route>
					<Route element={<Page footer />}>
						<Route path="/" element={<LandingPage />} />
					</Route>
				</Routes>
			</ErrorBoundary>
		</HashRouter>
	);
}

interface WithSuspenseProps {
	children?: React.ReactNode;
}

function withSuspense<P extends WithSuspenseProps>(Component: React.ComponentType<P>) {
	return (props: P) => {
		return (
			<Suspense fallback={<LazyLoad />}>
				<Component {...props} />
			</Suspense>
		);
	};
}

export default ApplicationRoutes;
