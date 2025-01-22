"use strict"

let amigos = [];

function adicionarAmigo() {
    const nome = document.getElementById("amigo").value.trim();
    let nomeNormalizado = nome.toLowerCase();
    if (!nome) {
        alert("Por favor, insira um nome válido!");
        return;
    }

    if (amigos.some(amigo => amigo.toLowerCase() === nomeNormalizado)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    document.getElementById("amigo").value = "";
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = amigo;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.classList.add("button-remove");
        removeButton.onclick = () => removerAmigo(index);

        listItem.appendChild(removeButton);
        lista.appendChild(listItem);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 3) {
        alert("Você precisa adicionar pelo menos 3 nomes para sortear um amigo secreto!");
        return;
    }
    let indiceSorteado = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indiceSorteado];
    const resultadoAmigo = document.getElementById("resultadoAmigo");
    resultadoAmigo.textContent = `Seu amigo secreto é ${amigoSorteado}!`;
    resultadoAmigo.style.visibility = "visible";

    atualizarBotaoSorteio("Novo Sorteio", resetarInterface);
}

function resetarInterface() {
    amigos = [];
    atualizarLista();
    const resultadoAmigo = document.getElementById("resultadoAmigo");
    resultadoAmigo.textContent = "Seu amigo secreto é ...!";
    resultadoAmigo.style.visibility = "hidden";
    atualizarBotaoSorteio("Sortear amigo", sortearAmigo)
}

function atualizarBotaoSorteio(texto, callback) {
    const buttonDraw = document.querySelector(".button-draw");
    buttonDraw.innerHTML = `<img src="assets/play_circle_outline.png" alt="Ícone para sortear"> ${texto}`;
    buttonDraw.onclick = callback;
}