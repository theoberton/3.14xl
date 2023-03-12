import styles from './styles.module.scss';
import { TwitterIcon, TelegramIcon } from 'react-share';
import createIcon from 'react-share/lib/hocs/createIcon';

const GithubIcon = createIcon({
	color: '#3b3d4a',
  networkName: 'github',
  path: 'm32.026 1.009c-17.459 0-31.573 14.218-31.573 31.808 0 14.06 9.043 25.962 21.589 30.174 1.568.317 2.143-.684 2.143-1.526 0-.737-.052-3.265-.052-5.899-8.783 1.896-10.612-3.792-10.612-3.792-1.411-3.686-3.503-4.634-3.503-4.634-2.875-1.949.209-1.949.209-1.949 3.189.211 4.862 3.265 4.862 3.265 2.822 4.844 7.37 3.476 9.2 2.633.261-2.054 1.098-3.476 1.987-4.265-7.005-.737-14.375-3.476-14.375-15.693 0-3.476 1.254-6.319 3.24-8.531-.313-.79-1.411-4.055.314-8.426 0 0 2.666-.843 8.677 3.265a30.355 30.355 0 0 1 7.894-1.053c2.666 0 5.383.369 7.893 1.053 6.012-4.108 8.677-3.265 8.677-3.265 1.726 4.371.627 7.636.313 8.426 2.039 2.212 3.241 5.055 3.241 8.531 0 12.218-7.37 14.903-14.427 15.693 1.15 1 2.143 2.896 2.143 5.898 0 4.265-.052 7.689-.052 8.741 0 .843.575 1.844 2.143 1.528 12.545-4.214 21.589-16.115 21.589-30.175.052-17.59-14.114-31.808-31.521-31.808z',
})

export function Footer() {
	return (
		<footer className={styles.footer}>
			<p>© 2023 Oberton Team</p>
			<a className={styles.footerImg} target="_blank" href="https://github.com/theoberton">
				<GithubIcon size="32" round />
			</a>
			
			<a className={styles.footerImg} target="_blank" href="https://t.me/theoberton">
				<TelegramIcon size="32" round />
			</a>

			<a className={styles.footerImg} target="_blank" href="https://twitter.com/alldayalone">
				<TwitterIcon size="32" round />
			</a>
		</footer>
	);
}
