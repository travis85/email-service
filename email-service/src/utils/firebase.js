// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, inMemoryPersistence, setPersistence} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRmxrTF0KLCGvg50NzGbvgdAdru5pF4lE",
  authDomain: "email-service-e1625.firebaseapp.com",
  projectId: "email-service-e1625",
  storageBucket: "email-service-e1625.appspot.com",
  messagingSenderId: "537490523353",
  appId: "1:537490523353:web:6de00529e72214f2f0eac8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
(async () => {
  await setPersistence(auth, inMemoryPersistence);
})();
export const firestore = getFirestore(app);
