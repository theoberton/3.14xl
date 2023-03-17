import Clip from 'react-spinners/ClipLoader';
import Pulse from 'react-spinners/PulseLoader';
import Clock from 'react-spinners/ClockLoader';

import { LoaderColors, LoaderSizes, LoaderTypes } from '@/components/interfaces';

interface LoaderProps {
	size: LoaderSizes;
	color: LoaderColors;
	type?: LoaderTypes;
}

const sizeMapper = {
	[LoaderSizes.tiny]: 3,
	[LoaderSizes.mini]: 5,
	[LoaderSizes.subSmall]: 12,
	[LoaderSizes.small]: 20,
	[LoaderSizes.medium]: 40,
	[LoaderSizes.big]: 60,
};

const LOADERS_TYPES_MAP = {
	[LoaderTypes.clip]: Clip,
	[LoaderTypes.pulse]: Pulse,
	[LoaderTypes.clock]: Clock,
};

export function Loader(props: LoaderProps) {
	const { size, color, type = LoaderTypes.clip } = props;

	const LoaderComponent = LOADERS_TYPES_MAP[type];

	return <LoaderComponent loading size={sizeMapper[size]} color={color} />;
}
