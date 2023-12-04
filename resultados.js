function exibirLembrete(titulo, justificativa) {
    
    var espacoExibirLembrete = document.getElementById('espaco-exibir-lembrete');

    var lembreteElemento = document.createElement('div');
    lembreteElemento.classList.add('resultado-pagina', 'lembrete');
    lembreteElemento.innerHTML = `
        <strong class="resultado-pagina-titulo">${titulo.toUpperCase()}</strong>
        <p class="resultado-pagina-justificativa">${justificativa}</p>
    `;

    lembreteElemento.querySelector('.resultado-pagina-titulo').style.fontFamily = 'Arial, sans-serif';
    lembreteElemento.querySelector('.resultado-pagina-titulo').style.textAlign = 'left';
    lembreteElemento.querySelector('.resultado-pagina-titulo').style.color = '#000000';
    lembreteElemento.querySelector('.resultado-pagina-titulo').style.fontSize = '16px';
    lembreteElemento.querySelector('.resultado-pagina-titulo').style.marginLeft = '12px';

    lembreteElemento.querySelector('.resultado-pagina-justificativa').style.textAlign = 'left';
    lembreteElemento.querySelector('.resultado-pagina-justificativa').style.backgroundColor = '#ffffff';
    lembreteElemento.querySelector('.resultado-pagina-justificativa').style.borderRadius = '8px';
    lembreteElemento.querySelector('.resultado-pagina-justificativa').style.padding = '12px';
    lembreteElemento.querySelector('.resultado-pagina-justificativa').style.marginBottom = '12px';
   
    lembreteElemento.querySelector('.resultado-pagina-justificativa').style.color = '#000000';
    lembreteElemento.querySelector('.resultado-pagina-justificativa').style.fontSize = '16px';
    lembreteElemento.querySelector('.resultado-pagina-justificativa').style.marginLeft = '8px';
    lembreteElemento.querySelector('.resultado-pagina-justificativa').style.marginRight = '8px';

    lembreteElemento.style.marginTop = '15px';

    espacoExibirLembrete.innerHTML = "";
    espacoExibirLembrete.appendChild(lembreteElemento);
}
