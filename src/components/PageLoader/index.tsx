import { Loader } from '@/components';
import { LoaderSizes, LoaderColors, LoaderTypes } from '@/components/interfaces';
import styles from '@/components/PageLoader/styles.module.scss';

export function PageLoader() {
	return (
		<div className={styles.pageLoader}>
			<Loader type={LoaderTypes.clip} size={LoaderSizes.big} color={LoaderColors.white} />
		</div>
	);
}
