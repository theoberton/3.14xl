import MenuItem from '@/pages/CreateCollection/CollectionMenu/MenuItem';
import styles from '@/pages/CreateCollection/styles.module.scss';

const collectionsSettings = [
	{
		title: 'Editions',
		caption: 'Create a collection with multiple copies of a single media',
		onClick: () => {},
	},
	{
		title: 'Drops',
		caption: 'Create a collection with different media for each token',
		onClick: () => {},
	},
];

function CollectionMenu() {
	return (
		<div>
			<div className={styles.collectionMenuTitle}>Collection type</div>
			<div className={styles.collectionMenuActions}>
				{collectionsSettings.map(setting => (
					<MenuItem {...setting} key={setting.caption} />
				))}
			</div>
		</div>
	);
}

export default CollectionMenu;
