document.querySelector('.search-box').addEventListener('click', function () {
    limparCampos();
    deselecionarBotoes();
    resetarSelecoes();
    permitirEntradaTexto();
});

function deselecionarBotoes() {
    var botoes = document.querySelectorAll('.search-button');

    botoes.forEach(function (botao) {
        botao.classList.remove('selected-button');
    });

    tipoSelecionado = '';
}

function limparCampos() {
    document.querySelector('.search-box').value = '';
    document.getElementById('espaco-exibir-pagina').innerHTML = '';
    document.getElementById('espaco-exibir-lembrete').innerHTML = '';
}

function resetarSelecoes() {
    limparOpcoes();

    var selecao = document.getElementById('selecao');
    selecao.selectedIndex = 0;

    var selecao2 = document.getElementById('selecao2');
    selecao2.selectedIndex = 0;

    var selecao3 = document.getElementById('selecao3');
    selecao3.selectedIndex = 0;
}

function limparOpcoes() {
    var selecao = document.getElementById('selecao');
    var selecao2 = document.getElementById('selecao2');
    var selecao3 = document.getElementById('selecao3');

    selecao.innerHTML = '';
    selecao2.innerHTML = '';
    selecao3.innerHTML = '';

    adicionarOpcao(selecao, 'Selecione um Parâmetro');
    adicionarOpcao(selecao2, 'Selecione uma Categoria');
    adicionarOpcao(selecao3, 'Selecione um Exame');
}

function adicionarOpcao(selectElement, texto) {
    var option = document.createElement('option');
    option.value = texto;
    option.text = texto;
    selectElement.add(option);
}

function permitirEntradaTexto() {
    document.querySelector('.search-box').focus();
}

function pesquisar() {
    var termoPesquisa = document.querySelector('.search-box').value.toLowerCase();
    var espacoExibirPagina = document.getElementById('espaco-exibir-pagina');
    espacoExibirPagina.innerHTML = "";

    if (termoPesquisa.trim().length < 3) {
        espacoExibirPagina.innerHTML = '<p class="resultado" style="text-align: center; font-weight: bold; text-transform: uppercase; color: red; font-size: 14px;">A pesquisa deve conter pelo menos 3 caracteres</p>';
        return;
    }

    var tituloElemento = document.createElement('p');
    var termoPesquisaMaiusculo = termoPesquisa.toUpperCase();
    tituloElemento.innerHTML = `<strong style="font-size: 16px; margin-top: 10px; margin-left: 10px; color: #000000;">ALTERAÇÕES DEVIDO A ${termoPesquisaMaiusculo}</strong>`;

    function carregarConteudoPagina(pagina) {
        return fetch(pagina).then(response => response.text());
    }

    Promise.all([
        carregarConteudoPagina('anemia-hemacias.html'),
        carregarConteudoPagina('eritrocitose-hemacias.html'),
        carregarConteudoPagina('anemia-hemoglobina.html'),
        carregarConteudoPagina('eritrocitose-hemoglobina.html'),
        carregarConteudoPagina('anemia-hematocrito.html'),
        carregarConteudoPagina('eritrocitose-hematocrito.html')
    ]).then(resultados => {
        var resultadosEncontrados = [];

        resultados.forEach((html, index) => {
            var div = document.createElement('div');
            div.innerHTML = html;
            var causas = div.querySelectorAll('#causas li');

            causas.forEach(causa => {
                var causaTexto = causa.textContent.toLowerCase();
                if (causaTexto.includes(termoPesquisa)) {
                    var tituloEncontrado = div.querySelector('h2').textContent.replace("Causas de ", "").trim();
                    var lembreteEncontrado = causa.getAttribute('onclick').match(/exibirLembrete\(".*",\s*"(.*)"\)/)[1];

                    var resultadoExistente = resultadosEncontrados.find(resultado => resultado.titulo === tituloEncontrado);
                    if (!resultadoExistente) {
                        resultadosEncontrados.push({ titulo: tituloEncontrado, lembrete: lembreteEncontrado });

                        var palavras = tituloEncontrado.split(/\s+/);
                        var termoExibido = palavras[palavras.length - 1].trim();
                        termoExibido = termoExibido.charAt(0).toUpperCase() + termoExibido.slice(1).toLowerCase();

                        var resultadoElemento = document.createElement('p');
                        resultadoElemento.classList.add('resultado-pagina');
                        resultadoElemento.textContent = termoExibido;
                        espacoExibirPagina.appendChild(resultadoElemento);

                        resultadoElemento.style.fontFamily = 'Arial, sans-serif';
                        resultadoElemento.style.textAlign = 'left';
                        resultadoElemento.style.backgroundColor = '#ffffff';
                        resultadoElemento.style.borderRadius = '8px';
                        resultadoElemento.style.padding = '12px';
                        resultadoElemento.style.marginBottom = '12px';
                        resultadoElemento.style.cursor = 'pointer';
                        resultadoElemento.style.color = '#000000';
                        resultadoElemento.style.fontSize = '16px';
                        resultadoElemento.style.marginLeft = '8px';
                        resultadoElemento.style.marginRight = '8px';

                        resultadoElemento.addEventListener('click', function () {
                            var espacoExibirLembrete = document.getElementById('espaco-exibir-lembrete');
                            var lembreteElemento = document.createElement('div');
                            lembreteElemento.classList.add('resultado-pagina', 'lembrete');
                            lembreteElemento.innerHTML = `
                                <strong class="resultado-pagina-titulo">${termoExibido.toUpperCase()}</strong>
                                <p class="resultado-pagina-justificativa">${lembreteEncontrado}</p>
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
                        });
                    }
                }
            });
        });

        if (resultadosEncontrados.length === 0) {
            espacoExibirPagina.innerHTML += `<p class="resultado" style="text-align: center; font-weight: bold; text-transform: uppercase; color: red; font-size: 14px;">Nenhum resultado encontrado para: ${termoPesquisa}</p>`;
        } else {
            espacoExibirPagina.insertBefore(tituloElemento, espacoExibirPagina.firstChild);
        }
    }).catch(error => {
        console.error('Erro ao carregar conteúdo das páginas', error);
    });
}

function buscarSugestoes() {
    var termoPesquisa = document.querySelector('.search-box').value.toLowerCase();
    var espacoExibirSugestao = document.getElementById('espaco-exibir-sugestao');
    espacoExibirSugestao.innerHTML = "";

    if (termoPesquisa.trim() === "") {
        return;
    }

    function carregarConteudoPagina(pagina) {
        return fetch(pagina).then(response => response.text());
    }

    var sugestoesEncontradas = [];

    Promise.all([
        carregarConteudoPagina('anemia-hemacias.html'),
        carregarConteudoPagina('eritrocitose-hemacias.html'),
        carregarConteudoPagina('anemia-hemoglobina.html'),
        carregarConteudoPagina('eritrocitose-hemoglobina.html'),
        carregarConteudoPagina('anemia-hematocrito.html'),
        carregarConteudoPagina('eritrocitose-hematocrito.html')
    ]).then(resultados => {
        resultados.forEach(html => {
            var div = document.createElement('div');
            div.innerHTML = html;
            var causas = div.querySelectorAll('[data-palavras-chave]');

            causas.forEach(causa => {
                var palavrasChave = causa.getAttribute('data-palavras-chave').split(';');

                palavrasChave.forEach(palavra => {
                    var palavraFormatada = palavra.trim();
                    if (palavraFormatada.toLowerCase().startsWith(termoPesquisa) &&
                        sugestoesEncontradas.indexOf(palavraFormatada) === -1) {
                        sugestoesEncontradas.push(palavraFormatada);
                    }
                });
            });
        });

        sugestoesEncontradas.sort(); 

        if (sugestoesEncontradas.length > 0) {
            sugestoesEncontradas.forEach(sugestao => {
                var sugestaoElemento = document.createElement('p');
                sugestaoElemento.textContent = sugestao.charAt(0).toUpperCase() + sugestao.slice(1).toLowerCase();
                espacoExibirSugestao.appendChild(sugestaoElemento);

                sugestaoElemento.addEventListener('click', function () {
                    document.querySelector('.search-box').value = sugestao;
                    pesquisar();

                    espacoExibirSugestao.innerHTML = "";
                });

                sugestaoElemento.style.fontFamily = 'Arial, sans-serif';
                sugestaoElemento.style.textAlign = 'left';
                sugestaoElemento.style.backgroundColor = '#ffffff';
                sugestaoElemento.style.borderRadius = '8px';
                sugestaoElemento.style.padding = '12px';
                sugestaoElemento.style.marginBottom = '12px';
                sugestaoElemento.style.cursor = 'pointer';
                sugestaoElemento.style.color = '#000000';
                sugestaoElemento.style.fontSize = '16px';
                sugestaoElemento.style.marginLeft = '8px';
                sugestaoElemento.style.marginRight = '8px';
            });
        } else {
            var mensagem = document.createElement('p');
            mensagem.textContent = 'Nenhuma sugestão encontrada para: ' + termoPesquisa;
            mensagem.style.textAlign = 'center';
            mensagem.style.fontWeight = 'bold';
            mensagem.style.textTransform = 'uppercase';
            mensagem.style.color = 'red';
            mensagem.style.fontSize = '14px';
            espacoExibirSugestao.appendChild(mensagem);
        }
    }).catch(error => {
        console.error('Erro ao carregar conteúdo das páginas', error);
    });
}

document.querySelector('.search-box').addEventListener('input', function () {
    buscarSugestoes();
});

function limparPesquisa() {
    document.querySelector('.search-box').value = '';
    document.getElementById('espaco-exibir-pagina').innerHTML = '';
    document.getElementById('espaco-exibir-sugestao').innerHTML = '';

    window.location.href = window.location.origin + window.location.pathname;
}
