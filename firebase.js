// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { 
  getDatabase, 
  ref, 
  push, 
  set, 
  onValue, 
  update, 
  remove 
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// 🔧 Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDH9MG50ynnt4SiXGAFymBH9nXmBqLwTtU",
  authDomain: "funcionarios-7c778.firebaseapp.com",
  databaseURL: "https://funcionarios-7c778-default-rtdb.firebaseio.com",
  projectId: "funcionarios-7c778",
  storageBucket: "funcionarios-7c778.firebasestorage.app",
  messagingSenderId: "632364021109",
  appId: "1:632364021109:web:a5db2bd2c794c4368b4f3c",
  measurementId: "G-PLP32K6CWZ"
};

// 🚀 Inicializa Firebase
const app = initializeApp(firebaseConfig);

// 🔑 Inicializa Autenticação e Banco
export const auth = getAuth(app);
const db = getDatabase(app);

//////////////////////////////////////////////////////
// 🔹 FUNÇÕES DE AUTENTICAÇÃO
//////////////////////////////////////////////////////

// Login com email e senha
export async function loginUsuario(usuario, senha) {
  const email = usuario.trim() + "@empresa.com"; // padrão: "ADMIN" => "ADMIN@empresa.com"
  return signInWithEmailAndPassword(auth, email, senha);
}

// Logout
export async function sairUsuario() {
  return signOut(auth);
}

// Verifica usuário logado (mantém sessão)
export function observarUsuario(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

//////////////////////////////////////////////////////
// 🔹 FUNÇÕES DE BANCO DE DADOS (Funcionários)
//////////////////////////////////////////////////////

// Adicionar funcionário
export function adicionarFuncionario(funcionario) {
  const referencia = ref(db, "funcionarios");
  const novoFuncionario = push(referencia);
  return set(novoFuncionario, funcionario);
}

// Ouvir alterações em tempo real
export function ouvirFuncionarios(callback) {
  const referencia = ref(db, "funcionarios");
  onValue(referencia, (snapshot) => {
    const dados = snapshot.val();
    const lista = [];
    if (dados) {
      for (let id in dados) {
        lista.push({ id, ...dados[id] });
      }
    }
    callback(lista);
  });
}

// Atualizar funcionário
export function atualizarFuncionario(id, dados) {
  const referencia = ref(db, "funcionarios/" + id);
  return update(referencia, dados);
}

// Excluir funcionário
export function excluirFuncionario(id) {
  const referencia = ref(db, "funcionarios/" + id);
  return remove(referencia);
}
