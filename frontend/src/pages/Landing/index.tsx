import { PresentationSection } from '@/pages/Landing/PresentationSection';
import ShowcaseSection from './ShowcaseSection';
import { Helmet } from 'react-helmet-async';

import styles from '@/pages/Landing/styles.module.scss';

export default function LandingPage() {
	return (
		<>
			<Helmet title="3.14XL - Bring visions to life">
				<meta
					name="description"
					content="Create captivating NFT projects on TON blockchain with ease ( ^ ͜ʖ ^ ) - theoberton/3.14xl: Create captivating NFT projects on TON blockchain with ease ( ^ ͜ʖ ^ )"
				/>
				<meta
					name="twitter:image:src"
					content="https://opengraph.githubassets.com/3d8fe384474efd9ad5ae33f9b55cddf543cff5526dfcd14eb0d0e3ee41e18596/theoberton/3.14xl"
				></meta>
				<meta name="twitter:site" content="@test" />
				<meta
					name="twitter:title"
					content="theoberton/3.14xl: Create captivating NFT projects on TON blockchain with ease ( ^ ͜ʖ ^ )"
				/>
				<meta
					name="twitter:description"
					content="Create captivating NFT projects on TON blockchain with ease ( ^ ͜ʖ ^ ) - theoberton/3.14xl: Create captivating NFT projects on TON blockchain with ease ( ^ ͜ʖ ^ )"
				/>
				<meta
					property="og:image"
					content="https://opengraph.githubassets.com/3d8fe384474efd9ad5ae33f9b55cddf543cff5526dfcd14eb0d0e3ee41e18596/theoberton/3.14xl"
				/>
				<meta
					property="og:image:alt"
					content="Create captivating NFT projects on TON blockchain with ease ( ^ ͜ʖ ^ ) - theoberton/3.14xl: Create captivating NFT projects on TON blockchain with ease ( ^ ͜ʖ ^ )"
				/>
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="600" />
				<meta property="og:site_name" content="GitHub" />
				<meta property="og:type" content="object" />
				<meta
					property="og:title"
					content="theoberton/3.14xl: Create captivating NFT projects on TON blockchain with ease ( ^ ͜ʖ ^ )"
				/>
				<meta property="og:url" content="https://pi.oberton.io/" />
				<meta
					property="og:description"
					content="Create captivating NFT projects on TON blockchain with ease ( ^ ͜ʖ ^ ) - theoberton/3.14xl: Create captivating NFT projects on TON blockchain with ease ( ^ ͜ʖ ^ )"
				/>
			</Helmet>
			<div className={styles.landingContainer}>
				<PresentationSection />
			</div>
			<ShowcaseSection />
		</>
	);
}
