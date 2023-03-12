import { ReactComponent as GithubIcon } from '@/assets/images/svg/social/github.svg';
import { ReactComponent as TelegramIcon } from '@/assets/images/svg/social/telegram.svg';
import { ReactComponent as TwitterIcon } from '@/assets/images/svg/social/twitter.svg';
import styles from './styles.module.scss';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p>© 2023 Oberton Team</p>
			<div className={styles.footerSocialContainer}>
				<a className={styles.footerSocialLink} target="_blank" href="https://github.com/theoberton">
					<GithubIcon />
				</a>
				
				<a className={styles.footerSocialLink} target="_blank" href="https://t.me/theoberton">
					<TelegramIcon />
				</a>

				<a className={styles.footerSocialLink} target="_blank" href="https://twitter.com/alldayalone">
					<TwitterIcon  />
				</a>
			</div>
		</footer>
	);
}
