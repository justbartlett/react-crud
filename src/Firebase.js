import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
    apiKey: "AIzaSyB8S-mAp_p7fKQ6LGofYVFjD6_dfTvGCAs",
    authDomain: "react-crud-62e32.firebaseapp.com",
    databaseURL: "https://react-crud-62e32.firebaseio.com",
    projectId: "react-crud-62e32",
    storageBucket: "react-crud-62e32.appspot.com",
    messagingSenderId: "1073155334031",
    appId: "1:1073155334031:web:30e16960d4df114d"
  };

  firebase.initializeApp(firebaseConfig);

  firebase.firestore().settings(settings);

  export default firebase;