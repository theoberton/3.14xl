import { Route, Routes } from "react-router-dom";
import { history } from 'helpers/navigation';
import CustomRouter from 'components/CustomRouter';

import WalletLayout from 'layouts/WalletLayout'
import LandingPage from 'pages/Landing'

function ApplicationRoutes() {
    return (
        <CustomRouter history={history}>
            <Routes>
                <Route element={<WalletLayout />}>
                    <Route index path='' element={<LandingPage />} />
                </Route>
            </Routes>
        </CustomRouter>
    );
};

export default ApplicationRoutes;
