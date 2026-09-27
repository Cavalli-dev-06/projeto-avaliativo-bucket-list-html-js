/*
===========================================================
PROVA PRÁTICA DE JAVASCRIPT
Arquivo que deverá ser desenvolvido pelo aluno.
===========================================================

IMPORTANTE:
- Não altere os IDs existentes no index.html.
- As viagens deverão ser inseridas dentro de #listaViagens.
- Cada viagem deverá ser uma <tr> com a classe "viagem-item".
- Dentro da linha criada, utilize obrigatoriamente:

  .viagem-foto        -> célula que contém a imagem
  .viagem-pais        -> país/destino
  .viagem-data        -> data
  .viagem-descricao   -> descrição
  .viagem-status      -> "Já fui" ou "Quero ir"
  .btn-editar         -> botão de edição
  .btn-excluir        -> botão de exclusão

Isso permite que o sistema de correção automática identifique
o resultado gerado pelo seu programa.
*/

// Desenvolva sua solução abaixo.

const inputPais = document.querySelector('#pais');
const inputFoto = document.querySelector('#foto');
const inputData = document.querySelector('#dataViagem');
const inputDescricao = document.querySelector('#descricao');
const checkJaFui = document.querySelector('#jaFui');


const btnSalvar = document.querySelector('#btnSalvar');
const mensagemErro = document.querySelector('#mensagemErro');
const listaVazia = document.querySelector('#listaVazia');


const listaViagens = document.querySelector('#listaViagens');
const contadorViagens = document.querySelector('#contadorViagens');


let linhaEmEdicao = null;


btnSalvar.addEventListener('click', function() {
    
    
    if (inputPais.value.trim() === '' || 
        inputFoto.value.trim() === '' || 
        inputData.value.trim() === '' || 
        inputDescricao.value.trim() === '') {
        
        mensagemErro.classList.remove('d-none'); 
        return; 
    }
    
    
    mensagemErro.classList.add('d-none');

    
    const textoStatus = checkJaFui.checked ? "Já fui" : "Quero ir";

    
    if (linhaEmEdicao !== null) {
        
        
        linhaEmEdicao.querySelector('.viagem-pais').textContent = inputPais.value;
        linhaEmEdicao.querySelector('.viagem-foto img').src = inputFoto.value;
        linhaEmEdicao.querySelector('.viagem-foto img').alt = inputPais.value;
        linhaEmEdicao.querySelector('.viagem-data').textContent = inputData.value;
        linhaEmEdicao.querySelector('.viagem-descricao').textContent = inputDescricao.value;
        linhaEmEdicao.querySelector('.viagem-status').textContent = textoStatus;
        
        
        linhaEmEdicao = null;
        
    } else {
        
        criarNovaLinha(textoStatus);
    }

    
    limparFormulario();
    atualizarInterface();
});



function criarNovaLinha(textoStatus) {
    const tr = document.createElement('tr');
    tr.classList.add('viagem-item'); 

    
    tr.innerHTML = `
        <td class="viagem-foto">
            <img src="${inputFoto.value}" alt="${inputPais.value}" width="100">
        </td>
        <td class="viagem-pais">${inputPais.value}</td>
        <td class="viagem-data">${inputData.value}</td>
        <td class="viagem-descricao">${inputDescricao.value}</td>
        <td class="viagem-status">${textoStatus}</td>
        <td class="text-end">
            <button type="button" class="btn btn-sm btn-outline-primary btn-editar">Editar</button>
            <button type="button" class="btn btn-sm btn-outline-danger btn-excluir">Excluir</button>
        </td>
    `;

    
    const btnExcluir = tr.querySelector('.btn-excluir');
    btnExcluir.addEventListener('click', function() {
        tr.remove(); 
        atualizarInterface(); 
    });

    
    const btnEditar = tr.querySelector('.btn-editar');
    btnEditar.addEventListener('click', function() {
        
        
        inputPais.value = tr.querySelector('.viagem-pais').textContent;
        inputFoto.value = tr.querySelector('.viagem-foto img').src;
        inputData.value = tr.querySelector('.viagem-data').textContent;
        inputDescricao.value = tr.querySelector('.viagem-descricao').textContent;
        
        
        checkJaFui.checked = (tr.querySelector('.viagem-status').textContent === "Já fui");
        
        
        mensagemErro.classList.add('d-none');

        
        linhaEmEdicao = tr;
    });

    listaViagens.appendChild(tr);
}


function limparFormulario() {
    inputPais.value = '';
    inputFoto.value = '';
    inputData.value = '';
    inputDescricao.value = '';
    checkJaFui.checked = false;
}

function atualizarInterface() {
    
    const totalViagens = document.querySelectorAll('.viagem-item').length;
    
    contadorViagens.textContent = `${totalViagens} viagem(ns)`;

    if (totalViagens === 0) {
        listaVazia.classList.remove('d-none');
    } else {
        listaVazia.classList.add('d-none');
    }
}