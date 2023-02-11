import { Route, Routes } from "react-router-dom";
import { history } from '@/helpers/navigation';
import CustomRouter from '@/components/CustomRouter';

import WalletLayout from '@/layouts/WalletLayout';
import LandingPage from '@/pages/Landing';
import CreateEditionPageOld from '@/pages/CreateEdition';
import EditionPage from '@/pages/Edition';
import CreateCollection from '@/pages/CreateCollection';
import CreateEditionPage from '@/pages/CRTEdition';

function ApplicationRoutes() {
    return (
        <CustomRouter history={history}>
            <Routes>
                <Route element={<WalletLayout />}>
                    <Route index path='' element={<LandingPage />} />
                    <Route path='edition' element={<CreateEditionPageOld />} />
                    <Route path='edition/:address' element={<EditionPage />} />
                </Route>
                <Route path="create-collection" element={<CreateCollection />} />
                <Route path="create-edition" element={<CreateEditionPage />}/>
            </Routes>
        </CustomRouter>
    );
};

export default ApplicationRoutes;
