import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function BasePage() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}

export default BasePage;
