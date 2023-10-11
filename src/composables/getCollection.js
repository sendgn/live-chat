// to set up a listener to get the documents

import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, query, onSnapshot } from 'firebase/firestore';

const getCollection = (col) => {
  const documents = ref(null);
  const error = ref(null);

  const colRef = collection(db, col);
  const q = query(colRef, orderBy('createdAt'));

  onSnapshot(q, (snap) => {
    let results = [];
    snap.docs.forEach((doc) => {
      doc.data().createdAt &&
        results.push({ ...doc.data(), id: doc.id });
    });
    documents.value = results;
    error.value = null;
  }, (err) => {
    console.log(err.message);
    documents.value = null;
    error.value = 'Could not fetch data';
  });

  return { documents, error };
};

export default getCollection;
