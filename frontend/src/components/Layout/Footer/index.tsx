import styles from './styles.module.scss';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p>
				© 2023{' '}
				<a href="https://github.com/theoberton" target="_blank" rel="noopener noreferrer">
					Oberton Team
				</a>
			</p>
		</footer>
	);
}
