import { HashRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const PageContainer = withSuspense(React.lazy(() => import('@/layouts/PageContainer')));
const CreateEdition = withSuspense(React.lazy(() => import('@/pages/CreateEdition')));
const LandingPage = withSuspense(React.lazy(() => import('@/pages/Landing')));
const NotFound = withSuspense(React.lazy(() => import('@/pages/NotFound')));
const EditionDetailsPage = withSuspense(React.lazy(() => import('@/pages/EditionDetails')));
const ExplorePage = withSuspense(React.lazy(() => import('@/pages/Explore')));
const MintedEditionsPage = withSuspense(React.lazy(() => import('@/pages/MintedEditions')));

function ApplicationRoutes() {
	return (
		<HashRouter window={window}>
			<Routes>
				<Route element={<PageContainer />}>
					<Route path="/" element={<LandingPage />} />
					<Route path="/edition/:collectionAddress" element={<EditionDetailsPage />} />
					<Route path="/minted" element={<MintedEditionsPage />} />
					<Route path="/explore" element={<ExplorePage />} />
					<Route path="/create-edition" element={<CreateEdition />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
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

const LazyLoad = () => {
	useEffect(() => {
		NProgress.configure({
			showSpinner: false,
			trickleSpeed: 50,
		});

		NProgress.start();

		return () => {
			NProgress.done();
		};
	});

	return <></>;
};

export default ApplicationRoutes;
