
import { Form, Formik } from 'formik';
import styles from '@/pages/CRTEdition/styles.module.scss';
import FormArea from '@/pages/CRTEdition/FormArea';
import { formSchema } from '@/pages/CRTEdition/validation';
import { useCallback } from 'react';
import { FormValues } from '@/pages/CRTEdition/interfaces';
import EditionPreview from '@/pages/CRTEdition/Preview';
import {EDITIONS_SIZES} from '@/constants/common'

const createEditionInitialValues: FormValues = {
  name: '',
  symbol: '',
  description: '',
  media: null,
  price: '',
  editionSize: {
    type: EDITIONS_SIZES.FIXED,
    amount: ''
  },
  validity: {
    start: null,
    end: null,
  },
  mintLimitPerAddress: '',
  payoutAddress: ''
};

function CreateEditionForm() {
  const handleSubmit = useCallback((values: FormValues) => {
    console.log('values', values);

  }, []);

  return (
    <Formik 
      initialValues={createEditionInitialValues}
      validationSchema={formSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      <div className={styles.createEditionContainer}>
        <FormArea />
        <EditionPreview />
      </div>
    </Formik>
  
  );
}

export default CreateEditionForm;