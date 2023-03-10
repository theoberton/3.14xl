import styles from './styles.module.scss';

function Background() {
	const array = new Array(10).fill(undefined);

	return (
		<ul className={styles.landingBackground}>
			{array.map((item, index) => (
				<li key={index}></li>
			))}
		</ul>
	);
}

export default Background;
