import FishImg from '../assets/images/png/examples/fish.png';
import CloudImg from '../assets/images/png/examples/cloud.png';
import FlowerImg from '../assets/images/png/examples/flower.png';
import EyesImg from '../assets/images/png/examples/eyes.png';
import GlitchImg from '../assets/images/png/examples/glitch.png';
import PlanetImg from '../assets/images/png/examples/planet.png';
import SpringImg from '../assets/images/png/examples/spring.png';
import PaperArtImg from '../assets/images/png/examples/paper_art.png';

import { IEditionItem } from '@/components/EditionCard/interface';

export const exampleData: IEditionItem[] = [
	{
		name: 'Hello Pixel',
		owner: 'EQBaRG--z81an0yB5pOMmArX9c5W3iHP-KNRzuQgErNRUemx',
		content:
			'https://gateway.ipfscdn.io/ipfs/QmdEPjAppgeNfN9K2RkPNA5S55ipw9y6qmoe17291zk9hM/hello.png',
		isActive: true,
		price: 0.1,
		minted: 3,
		limit: 10,
		collectionAddress: 'EQA8kiQ7f0yVAyuemn16UYxUCJBOR4DnzrNzVCIRuMbyXeuk',
	},
	{
		name: 'Fish',
		owner: 'sample creator',
		content: FishImg,
		isActive: true,
		price: 0.07,
		minted: 54321,
		limit: null,
	},
	{
		name: 'Cloud in the desert',
		owner: 'sample creator',
		content: CloudImg,
		isActive: false,
		price: 0.07,
		minted: 996,
		limit: null,
	},
	{
		name: 'Flower',
		owner: 'sample creator',
		content: FlowerImg,
		isActive: true,
		price: 0.007,
		minted: 4321,
		limit: null,
	},
	{
		name: 'Blue eyes',
		owner: 'sample creator',
		content: EyesImg,
		isActive: false,
		price: 0.007,
		minted: 5432,
		limit: null,
	},
	{
		name: 'Glitch run',
		owner: 'sample creator',
		content: GlitchImg,
		isActive: true,
		price: 0.07,
		minted: 321,
		limit: 1000,
	},
	{
		name: 'Planet',
		owner: 'sample creator',
		content: PlanetImg,
		isActive: true,
		price: 0,
		minted: 54321,
		limit: null,
	},
	{
		name: 'Spring',
		owner: 'sample creator',
		content: SpringImg,
		isActive: true,
		price: 0.007,
		minted: 4321,
		limit: 10000,
	},
	{
		name: 'Paper art',
		owner: 'sample creator',
		content: PaperArtImg,
		isActive: false,
		price: 0.07,
		minted: 996,
		limit: null,
	},
];
