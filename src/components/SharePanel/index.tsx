import {
	TelegramShareButton,
	TelegramIcon,
	TwitterShareButton,
	PinterestShareButton,
	PinterestIcon,
	TwitterIcon,
	FacebookShareButton,
	FacebookIcon,
} from 'react-share';
import styles from './styles.module.scss';

type Props = {
	shareUrl: string;
	title: string;
	media?: string;
};

const shareButtonSize = 36;

export function SharePanel({ title, shareUrl, media }: Props) {
	return (
		<div className={styles.shareContainer}>
			<div className={styles.shareSocial}>
				<TelegramShareButton url={shareUrl} title={title} className={styles.shareButton}>
					<TelegramIcon size={shareButtonSize} round />
				</TelegramShareButton>
			</div>
			<div className={styles.shareSocial}>
				<TwitterShareButton url={shareUrl} title={title} className={styles.shareButton}>
					<TwitterIcon size={shareButtonSize} round />
				</TwitterShareButton>
			</div>
			{media && (
				<div className={styles.shareSocial}>
					<PinterestShareButton url={shareUrl} media={media} className={styles.shareButton}>
						<PinterestIcon size={shareButtonSize} round />
					</PinterestShareButton>
				</div>
			)}
			<div className={styles.shareSocial}>
				<FacebookShareButton url={shareUrl} quote={title} className={styles.shareButton}>
					<FacebookIcon size={shareButtonSize} round />
				</FacebookShareButton>
			</div>
		</div>
	);
}
