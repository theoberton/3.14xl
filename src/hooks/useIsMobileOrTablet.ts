import { useMediaQuery } from 'react-responsive';

// Hotfix for https://github.com/yocontra/react-responsive/issues/306, remove when resolved
console.log(useMediaQuery);

export const useIsMobileOrTablet = () => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

	return isTabletOrMobile;
};
