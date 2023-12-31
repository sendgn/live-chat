// to do smth with the collection

import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useI18n } from 'vue-i18n';

const useCollection = (col) => {
  const error = ref(null);
  const { t } = useI18n();

  const addDocument = async (doc) => {
    error.value = null;
    const colRef = collection(db, col);

    try {
      await addDoc(colRef, doc);
    } catch (err) {
      console.log(err);
      error.value = t('new_chat_form.error');
    }
  }

  return { error, addDocument };
};

export default useCollection;
