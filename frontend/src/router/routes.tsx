import { Route, Routes } from "react-router-dom";
import { history } from '@/helpers/navigation';
import CustomRouter from '@/components/CustomRouter';

import WalletLayout from '@/layouts/WalletLayout';
import LandingPage from '@/pages/Landing';
import CreateEditionPage from '@/pages/CreateEdition';
import EditionPage from '@/pages/Edition';
import CreateCollection from '@/pages/CreateCollection';

function ApplicationRoutes() {
    return (
        <CustomRouter history={history}>
            <Routes>
                <Route element={<WalletLayout />}>
                    <Route index path='' element={<LandingPage />} />
                    <Route path='edition' element={<CreateEditionPage />} />
                    <Route path='edition/:address' element={<EditionPage />} />
                </Route>
                <Route path="create-collection" element={<CreateCollection/>} />
            </Routes>
        </CustomRouter>
    );
};

export default ApplicationRoutes;
