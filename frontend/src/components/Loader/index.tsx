import Spinner from 'react-spinners/ClipLoader';

import { LoaderSizes } from '@/components/Loader/interface'

const colors = {
  black: '#111'
}

interface LoaderProps {
  size: LoaderSizes
};

const sizeMapper = {
  [LoaderSizes.small]: 20,
  [LoaderSizes.medium]: 40,
  [LoaderSizes.big]: 60,
}

function Loader(props: LoaderProps) {
  const { size } = props;

  return (
      <Spinner loading size={sizeMapper[size]} color={colors.black} />
  );
}

export default Loader;
