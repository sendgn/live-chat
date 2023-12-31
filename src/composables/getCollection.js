// to set up a listener to get the documents

import { computed, ref, watchEffect } from 'vue';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useI18n } from 'vue-i18n';

const getCollection = (col) => {
  const documents = ref(null);
  const error = ref(null);
  const numUsers = ref(0);
  const { t } = useI18n();

  const colRef = collection(db, col);
  const q = query(colRef, orderBy('createdAt'));

  const unsub = onSnapshot(q, (snap) => {
    let results = [];
    let userNames = new Set();
    snap.docs.forEach((doc) => {
      // to wait untill we get back actual createdAt from the server
      // not the local one
      doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      doc.data().createdAt && userNames.add(doc.data().name);
    });
    documents.value = results;
    numUsers.value = userNames.size;
    error.value = null;
  }, (err) => {
    console.log(err.message);
    documents.value = null;
    error.value = t('chat_window.error');
  });

  // onValidate function will run
  // when the component this is being used in unmounts
  watchEffect((onInvalidate) => {
    // unsub from prev collection
    // when watcher is stopped (component unmounted)
    onInvalidate(() => unsub());
  });

  return { documents, numUsers, error };
};

export default getCollection;
