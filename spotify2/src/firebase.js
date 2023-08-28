import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuglCPqIKkqNcQl4ok9cBUHEBt4gBHFxc",
  authDomain: "spdfy-b51b6.firebaseapp.com",
  projectId: "spdfy-b51b6",
  storageBucket: "spdfy-b51b6.appspot.com",
  messagingSenderId: "134220000202",
  appId: "1:134220000202:web:149e144c7aaccabaf43d33"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

// Classe para gerenciar a conexão e a recuperação de usuários
class FirebaseService {
  constructor() {
    // Inicialize o Firebase com as configurações
    this.app = initializeApp(firebaseConfig);
    // Obtenha uma referência ao Firestore
    this.db = getFirestore(this.app);
  }

  // Método para recuperar um usuário por ID
  async getUserById(userId) {
    try {
      // Crie uma referência ao documento de usuário
      const userRef = doc(this.db, 'users', userId);
      
      // Obtenha os dados do documento
      const userSnapshot = await getDoc(userRef);
      
      // Verifique se o documento existe
      if (userSnapshot.exists()) {
        // Retorne os dados do usuário
        return userSnapshot.data();
      } else {
        // Se o documento não existir, retorne null
        return null;
      }
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
      throw error;
    }
  }
}

export default FirebaseService;