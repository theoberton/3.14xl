import PlanetImg from '../../assets/images/png/examples/planet.png';
import SpringImg from '../../assets/images/png/examples/spring.png';
import PaperArtImg from '../../assets/images/png/examples/paper_art.png';

export const exampleData = [
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
