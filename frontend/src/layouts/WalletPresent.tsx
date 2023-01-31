import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function BasePage() {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
}

export default BasePage;
