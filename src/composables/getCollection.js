// to set up a listener to get the documents

import { ref, watchEffect } from 'vue';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const getCollection = (col) => {
  const documents = ref(null);
  const error = ref(null);

  const colRef = collection(db, col);
  const q = query(colRef, orderBy('createdAt'));

  const unsub = onSnapshot(q, (snap) => {
    let results = [];
    snap.docs.forEach((doc) => {
      // to wait untill we get back actual createdAt from the server
      // not the local one
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

  // onValidate function will run
  // when the component this is being used in unmounts
  watchEffect((onInvalidate) => {
    // unsub from prev collection
    // when watcher is stopped (component unmounted)
    onInvalidate(() => unsub());
  });

  return { documents, error };
};

export default getCollection;
