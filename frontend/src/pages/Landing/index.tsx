import { PresentationSection } from '@/pages/Landing/PresentationSection';
import ShowcaseSection from './ShowcaseSection';
import { Helmet } from 'react-helmet-async';

import styles from '@/pages/Landing/styles.module.scss';

export default function LandingPage() {
	return (
		<>
			<Helmet title="3.14XL - Bring visions to life">
				<meta property="og:title" content="Test Title" />
				<meta name="twitter:title" content="Test Title" />
				<meta name="description" content="Test Description" />
				<meta property="og:description" content="Test Description" />
				<meta name="twitter:description" content="Test Description" />
				<meta
					property="og:image"
					content="https://images.unsplash.com/photo-1616020453784-a24fa9845b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
				/>
				<meta
					name="twitter:image"
					content="https://images.unsplash.com/photo-1616020453784-a24fa9845b05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
				/>
			</Helmet>
			<div className={styles.landingContainer}>
				<PresentationSection />
			</div>
			<ShowcaseSection />
		</>
	);
}
