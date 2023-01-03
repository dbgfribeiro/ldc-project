import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCJfJU_UAn5p9KbB1Myv-5v-YKXUbKsSTk',
  authDomain: 'ldc-project-3d13d.firebaseapp.com',
  projectId: 'ldc-project-3d13d',
  storageBucket: 'ldc-project-3d13d.appspot.com',
  messagingSenderId: '1042449331239',
  appId: '1:1042449331239:web:49c86cb9dcda22b21f0a02',
  measurementId: 'G-3YEYER5KGH',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
