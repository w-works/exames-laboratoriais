function exibirLembrete(causa, justificativa) {
    var lembreteDiv = document.getElementById("lembrete");
    var lembreteConteudo = document.getElementById("lembrete-conteudo");

    lembreteConteudo.innerText = justificativa;
    lembreteDiv.style.display = "block";
}

function fecharLembrete() {
    var lembreteDiv = document.getElementById("lembrete");
    lembreteDiv.style.display = "none";
}
