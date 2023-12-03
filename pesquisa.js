function pesquisar() {
    var termoPesquisa = document.querySelector('.search-box').value.toLowerCase();
    var espacoExibirPagina = document.getElementById('espaco-exibir-pagina');
    espacoExibirPagina.innerHTML = "";

    if (termoPesquisa.trim() === "") {
        espacoExibirPagina.innerHTML = '<p class="resultado" style="text-align: center; font-weight: bold; text-transform: uppercase; color: red; font-size: 14px;">Digite uma causa na caixa de pesquisa</p>';
        return;
    }

    function carregarConteudoPagina(pagina) {
        return fetch(pagina).then(response => response.text());
    }

    Promise.all([
        carregarConteudoPagina('anemia-hemacias.html'),
        carregarConteudoPagina('eritrocitose-hemacias.html')
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

                        var tituloElemento = document.createElement('p');
                        var termoPesquisaMaiusculo = termoPesquisa.toUpperCase();
                        tituloElemento.innerHTML = `<strong style="font-size: 16px; margin-top: 10px; margin-left: 10px; color: #000000;">ALTERAÇÕES DEVIDO A ${termoPesquisa.toUpperCase()}</strong>`;

                        espacoExibirPagina.appendChild(tituloElemento);

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
                            var lembreteElemento = document.createElement('div');
                            lembreteElemento.id = 'lembrete';
                            lembreteElemento.innerHTML = `
                                <div id="fechar-lembrete" onclick="fecharLembrete()">Fechar (X)</div>
                                <p id="lembrete-conteudo">${lembreteEncontrado}</p>
                            `;
                            espacoExibirPagina.appendChild(lembreteElemento);

                            lembreteElemento.style.display = 'block';
                            lembreteElemento.style.fontFamily = 'Arial, sans-serif';
                            lembreteElemento.style.textAlign = 'center';
                            lembreteElemento.style.backgroundColor = '#000000';
                            lembreteElemento.style.color = '#fff';
                            lembreteElemento.style.fontSize = '14px';
                            lembreteElemento.style.padding = '20px';
                            lembreteElemento.style.position = 'absolute';
                            lembreteElemento.style.top = '50%';
                            lembreteElemento.style.left = '50%';
                            lembreteElemento.style.transform = 'translate(-50%, -50%)';
                            lembreteElemento.style.borderRadius = '10px';
                            lembreteElemento.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
                            lembreteElemento.style.zIndex = '999';
                            lembreteElemento.style.maxWidth = '400px';

                            var fecharLembreteElemento = document.getElementById('fechar-lembrete');
                            if (fecharLembreteElemento) {
                                fecharLembreteElemento.style.cursor = 'pointer';
                            }

                            fecharLembreteElemento.addEventListener('click', fecharLembrete);
                        });
                    }
                }
            });
        });

        if (resultadosEncontrados.length === 0) {
            espacoExibirPagina.innerHTML = `<p class="resultado" style="text-align: center; font-weight: bold; text-transform: uppercase; color: red; font-size: 14px;">Nenhum resultado encontrado para: ${termoPesquisa}</p>`;
        }
    }).catch(error => {
        console.error('Erro ao carregar conteúdo das páginas', error);
    });
}

function fecharLembrete() {
    var lembreteElemento = document.getElementById('lembrete');
    if (lembreteElemento) {
        lembreteElemento.parentNode.removeChild(lembreteElemento);
    }
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

    Promise.all([
        carregarConteudoPagina('anemia-hemacias.html'),
        carregarConteudoPagina('eritrocitose-hemacias.html')
    ]).then(resultados => {
        var sugestoesEncontradas = [];

        resultados.forEach(html => {
            var div = document.createElement('div');
            div.innerHTML = html;
            var causas = div.querySelectorAll('[data-palavras-chave]');

            causas.forEach(causa => {
                var palavrasChave = causa.getAttribute('data-palavras-chave').split(';');

                palavrasChave.forEach(palavra => {
                    var palavraFormatada = palavra.trim();
                    if (palavraFormatada.toLowerCase().startsWith(termoPesquisa)) {
                        sugestoesEncontradas.push(palavraFormatada);
                    }
                });
            });
        });

        if (sugestoesEncontradas.length > 0) {
            sugestoesEncontradas.forEach(sugestao => {
                var sugestaoElemento = document.createElement('p');
                sugestaoElemento.textContent = sugestao.charAt(0).toUpperCase() + sugestao.slice(1).toLowerCase();
                espacoExibirSugestao.appendChild(sugestaoElemento);

                sugestaoElemento.addEventListener('click', function () {
                    document.querySelector('.search-box').value = sugestao;

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
}
