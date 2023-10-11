// to do smth with the collection

import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const useCollection = (col) => {
  const error = ref(null);

  const addDocument = async (doc) => {
    error.value = null;
    const colRef = collection(db, col);

    try {
      await addDoc(colRef, doc);
    } catch (err) {
      console.log(err);
      error.value = 'Could not send the message';
    }
  }

  return { error, addDocument };
};

export default useCollection;
