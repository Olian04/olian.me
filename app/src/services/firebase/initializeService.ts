import firebase from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCVjWo9eF-xzm2IJASAQoH7f1AbsWVxwnY',
  authDomain: 'olian-portfolio.firebaseapp.com',
  databaseURL: 'https://olian-portfolio.firebaseio.com',
  projectId: 'olian-portfolio',
  storageBucket: 'olian-portfolio.appspot.com',
  messagingSenderId: '822164671260',
  appId: '1:822164671260:web:cdc461f9c7de5a20b188d9',
  measurementId: 'G-RVYCST8NZV',
};

export const app = firebase.initializeApp(firebaseConfig);
