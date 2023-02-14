import Spinner from 'react-spinners/ClipLoader';

import { LoaderSizes } from '@/components/interfaces';

const colors = {
	white: 'white',
};

interface LoaderProps {
	size: LoaderSizes;
}

const sizeMapper = {
	[LoaderSizes.small]: 20,
	[LoaderSizes.medium]: 40,
	[LoaderSizes.big]: 60,
};

export function Loader(props: LoaderProps) {
	const { size } = props;

	return <Spinner loading size={sizeMapper[size]} color={colors.white} />;
}
