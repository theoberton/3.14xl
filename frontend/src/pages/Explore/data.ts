import FishImg from '../../assets/images/png/examples/fish.png';
import HelloImg from '../../assets/images/png/examples/hello.png';
import CloudImg from '../../assets/images/png/examples/cloud.png';
import FlowerImg from '../../assets/images/png/examples/flower.png';
import EyesImg from '../../assets/images/png/examples/eyes.png';
import GlitchImg from '../../assets/images/png/examples/glitch.png';

export interface IExampleItem {
	name: string;
	minter: string;
	img: string;
	isActive: boolean;
	price: number;
	minted: number;
	limit: number | null;
	collectionAddress?: string;
}

export const exampleData: IExampleItem[] = [
	{
		name: 'Hello Pixel',
		minter: 'EQBaRG--z81an0yB5pOMmArX9c5W3iHP-KNRzuQgErNRUemx',
		img: 'https://gateway.ipfscdn.io/ipfs/QmdEPjAppgeNfN9K2RkPNA5S55ipw9y6qmoe17291zk9hM/hello.png',
		isActive: true,
		price: 0.1,
		minted: 3,
		limit: 10,
		collectionAddress: 'EQA8kiQ7f0yVAyuemn16UYxUCJBOR4DnzrNzVCIRuMbyXeuk'
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
];
