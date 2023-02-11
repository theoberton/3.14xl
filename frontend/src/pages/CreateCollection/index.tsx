import {useCallback} from 'react';
import CollectionMenu from '@/pages/CreateCollection/CollectionMenu';;
import Button from '@/components/Button';
import { ButtonKinds } from '@/components/Button/interfaces';
import styles from '@/pages/CreateCollection/styles.module.scss';
import { navigate } from '@/helpers/navigation';


function CreateCollection() {
	const goToLandingPage = useCallback(() => navigate('/'), []);


  return (
    <div className={styles.collection}>
      <div className={styles.collectionLeftSide}>
        <div className={styles.collectionLeftSideNavigation}>
          <Button
            kind={ButtonKinds.arrowLeft}
            onClick={goToLandingPage}
          />
        </div>
        <div className={styles.collectionLeftSideContent}>
          <CollectionMenu />
        </div>
      </div>
      <div className={styles.collectionRightSide}>
        <div className={styles.collectionRightSideContent}>
          <div>Create</div>
          <div>a great</div>
          <div>project</div>
        </div>
      </div>
    </div>
  );
}

export default CreateCollection;