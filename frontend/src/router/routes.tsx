import { Route, Routes } from 'react-router-dom';

import { history } from '@/helpers';
import { CustomRouter } from '@/components';
import { WalletLayout } from '@/layouts';

import { CreateEdition, CreateCollection, LandingPage } from '@/pages';

function ApplicationRoutes() {
	return (
		<CustomRouter history={history}>
			<Routes>
				<Route element={<WalletLayout />}>
					<Route index path="" element={<LandingPage />} />
					{/* <Route path='edition' element={<CreateEditionPageOld />} />
                    <Route path='edition/:address' element={<EditionPage />} /> */}
				</Route>
				<Route path="create-collection" element={<CreateCollection />} />
				<Route path="create-edition" element={<CreateEdition />} />
			</Routes>
		</CustomRouter>
	);
}
export default ApplicationRoutes;
