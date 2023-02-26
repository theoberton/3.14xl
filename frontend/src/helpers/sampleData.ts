import FishImg from '../assets/images/png/examples/fish.png';
import CloudImg from '../assets/images/png/examples/cloud.png';
import FlowerImg from '../assets/images/png/examples/flower.png';
import EyesImg from '../assets/images/png/examples/eyes.png';
import GlitchImg from '../assets/images/png/examples/glitch.png';
import PlanetImg from '../assets/images/png/examples/planet.png';
import SpringImg from '../assets/images/png/examples/spring.png';
import PaperArtImg from '../assets/images/png/examples/paper_art.png';

import { IEditionExampleItem } from '@/components/EditionCard/interface';

export const exampleData: IEditionExampleItem[] = [
	{
		name: 'Hello Pixel',
		minter: 'EQBaRG--z81an0yB5pOMmArX9c5W3iHP-KNRzuQgErNRUemx',
		img: 'https://gateway.ipfscdn.io/ipfs/QmdEPjAppgeNfN9K2RkPNA5S55ipw9y6qmoe17291zk9hM/hello.png',
		isActive: true,
		price: 0.1,
		minted: 3,
		limit: 10,
		collectionAddress: 'EQA8kiQ7f0yVAyuemn16UYxUCJBOR4DnzrNzVCIRuMbyXeuk',
	},
	{
		name: 'Fish',
		minter: 'sample minter',
		img: FishImg,
		isActive: true,
		price: 0.07,
		minted: 54321,
		limit: null,
	},
	{
		name: 'Cloud in the desert',
		minter: 'sample minter',
		img: CloudImg,
		isActive: false,
		price: 0.07,
		minted: 996,
		limit: null,
	},
	{
		name: 'Flower',
		minter: 'sample minter',
		img: FlowerImg,
		isActive: true,
		price: 0.007,
		minted: 4321,
		limit: null,
	},
	{
		name: 'Blue eyes',
		minter: 'sample minter',
		img: EyesImg,
		isActive: false,
		price: 0.007,
		minted: 5432,
		limit: null,
	},
	{
		name: 'Glitch run',
		minter: 'sample minter',
		img: GlitchImg,
		isActive: true,
		price: 0.07,
		minted: 321,
		limit: 1000,
	},
	{
		name: 'Planet',
		minter: 'sample minter',
		img: PlanetImg,
		isActive: true,
		price: 0,
		minted: 54321,
		limit: null,
	},
	{
		name: 'Spring',
		minter: 'sample minter',
		img: SpringImg,
		isActive: true,
		price: 0.007,
		minted: 4321,
		limit: 10000,
	},
	{
		name: 'Paper art',
		minter: 'sample minter',
		img: PaperArtImg,
		isActive: false,
		price: 0.07,
		minted: 996,
		limit: null,
	},
];
