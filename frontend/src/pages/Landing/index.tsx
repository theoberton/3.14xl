import { Helmet } from 'react-helmet-async';

import { PresentationSection } from './PresentationSection';
import ShowcaseSection from './ShowcaseSection';
import Background from './Background';

export default function LandingPage() {
	return (
		<>
			<Helmet title="3.14XL - Bring visions to life" />
			<Background />
			<PresentationSection />
			<ShowcaseSection />
		</>
	);
}
