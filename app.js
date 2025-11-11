import { db } from "./firebase.js";
import { ref, push, set, onValue, remove, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const refFuncionarios = ref(db, "funcionarios");

// ---------- ELEMENTOS ----------
const inputId = document.getElementById("id");
const inputNome = document.getElementById("nome");
const inputCargo = document.getElementById("cargo");
const inputSetor = document.getElementById("setor");
const inputHorarioInicio = document.getElementById("horarioInicio");
const inputHorarioFim = document.getElementById("horarioFim");
const inputDataAdm = document.getElementById("dataAdm");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const tabela = document.querySelector("#tabelaConsulta tbody");
const filtroInput = document.getElementById("filtroGeral");

let editandoId = null;

// ---------- SALVAR ----------
btnSalvar.onclick = async () => {
  if (!inputNome.value.trim()) {
    alert("O nome é obrigatório!");
    inputNome.focus();
    return;
  }

  const dados = {
    nome: inputNome.value.trim(),
    cargo: inputCargo.value.trim(),
    setor: inputSetor.value.trim(),
    horario: inputHorarioInicio.value + " às " + inputHorarioFim.value,
    admissao: inputDataAdm.value,
  };

  if (editandoId) {
    await update(ref(db, "funcionarios/" + editandoId), dados);
  } else {
    const novo = push(refFuncionarios);
    await set(novo, dados);
  }

  limparFormulario();
  abrirAba("consulta");
};

// ---------- LISTAR ----------
onValue(refFuncionarios, (snapshot) => {
  tabela.innerHTML = "";
  snapshot.forEach((child) => {
    const f = child.val();
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${child.key}</td>
      <td>${f.nome}</td>
      <td>${f.cargo}</td>
      <td>${f.setor}</td>
      <td>${f.horario}</td>
      <td>${formatarData(f.admissao)}</td>
      <td class="actions">
        <button class="edit" data-id="${child.key}">&#9998;</button>
        <button class="delete" data-id="${child.key}">&#10060;</button>
      </td>`;
    tabela.appendChild(tr);
  });
});

// ---------- EDITAR / EXCLUIR ----------
tabela.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;
  if (e.target.classList.contains("edit")) {
    const snap = await import("https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js")
      .then(({ get }) => get(ref(db, "funcionarios/" + id)));
  } else if (e.target.classList.contains("delete")) {
    if (confirm("Deseja excluir este registro?")) {
      await remove(ref(db, "funcionarios/" + id));
    }
  }
});

// ---------- FILTRAR ----------
filtroInput.addEventListener("input", () => {
  const termo = filtroInput.value.toUpperCase();
  document.querySelectorAll("#tabelaConsulta tbody tr").forEach(tr => {
    tr.style.display = tr.innerText.toUpperCase().includes(termo) ? "" : "none";
  });
});

// ---------- FUNÇÕES AUXILIARES ----------
function limparFormulario() {
  inputId.value = "";
  inputNome.value = "";
  inputCargo.value = "";
  inputSetor.value = "";
  inputHorarioInicio.value = "";
  inputHorarioFim.value = "";
  inputDataAdm.value = "";
  editandoId = null;
}

function formatarData(data) {
  if (!data) return "";
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR");
}

import { db } from "./firebase.js";
import { ref, push, set, onValue, remove, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// resto do seu código aqui...

import { db } from "./firebase.js";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

  import { adicionarFuncionario, ouvirFuncionarios, atualizarFuncionario, excluirFuncionario } from "./firebase.js";
