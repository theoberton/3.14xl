import { useMediaQuery } from 'react-responsive';
console.log(useMediaQuery);

export const useIsMobileOrTablet = () => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

	return isTabletOrMobile;
};
