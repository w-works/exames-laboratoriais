function pesquisar() {
    var termoPesquisa = document.querySelector('.search-box').value.toLowerCase();
    var espacoExibirPagina = document.getElementById('espaco-exibir-pagina');
    espacoExibirPagina.innerHTML = "";

    // Verifica se o termo de pesquisa está vazio
    if (termoPesquisa.trim() === "") {
        espacoExibirPagina.innerHTML = '<p class="resultado">Digite uma causa na caixa de pesquisa</p>';
        return;
    }

    // Restante do código para realizar a pesquisa...
    // (mantenha o restante do código após essa verificação)





    // Função para carregar conteúdo de uma página
    function carregarConteudoPagina(pagina) {
        return fetch(pagina).then(response => response.text());
    }

    // Realizar a pesquisa nas páginas
    Promise.all([
        carregarConteudoPagina('anemia-hemacias.html'),
        carregarConteudoPagina('eritrocitose-hemacias.html')
    ]).then(resultados => {
        var tituloEncontrado = null;

        resultados.forEach(html => {
            var div = document.createElement('div');
            div.innerHTML = html;
            var causas = div.querySelectorAll('#causas li');

            causas.forEach(causa => {
                var causaTexto = causa.textContent.toLowerCase();
                if (causaTexto.includes(termoPesquisa)) {
                    // Obter apenas o título sem "Causas de"
                    tituloEncontrado = div.querySelector('h2').textContent.replace("Causas de ", "").trim();
                }
            });
        });

        if (tituloEncontrado) {
            // Divide o título usando espaços como delimitadores
            var palavras = tituloEncontrado.split(/\s+/);
        
            // Obtém a última palavra, que deve conter o termo desejado
            var termoExibido = palavras[palavras.length - 1].trim();
        
            // Coloca a primeira letra da palavra em maiúscula
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
    resultadoElemento.style.color = '#333';
    resultadoElemento.style.fontSize = '16px';
        
            // Aplicar o estilo do CSS
            adicionarEstiloCSS();
        } else {
            espacoExibirPagina.innerHTML = '<p class="resultado">Nenhum resultado encontrado para: ' + termoPesquisa + '</p>';
        }
        
        
    }).catch(error => {
        console.error('Erro ao carregar conteúdo das páginas', error);
    });
}
