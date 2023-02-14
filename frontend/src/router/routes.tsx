import { Route, Routes } from 'react-router-dom';

import { history } from '@/helpers';
import { CustomRouter } from '@/components';
import { WalletLayout } from '@/layouts';

import { CreateEdition, CreateCollection, LandingPage, CreateEditionOld, NotFound } from '@/pages';

function ApplicationRoutes() {
	return (
		<CustomRouter history={history}>
			<Routes>
				<Route index path="" element={<LandingPage />} />
				<Route element={<WalletLayout />}>
					<Route path='edition' element={<CreateEditionOld />} />
					<Route path="create-edition" element={<CreateEdition />} />
				</Route>
				<Route path="create-collection" element={<CreateCollection />} />
				<Route path="create-edition" element={<CreateEdition />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</CustomRouter>
	);
}
export default ApplicationRoutes;
