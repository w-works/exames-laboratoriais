const selecao2 = document.getElementById('selecao2')
const selecao3 = document.getElementById('selecao3')
const espacoExibirPagina = document.getElementById('espaco-exibir-pagina')

const loadPage = async (page) => {
  // lê o conteúdo da página
  const pageContent = await fetch(page).then((content) => content.text())

  // alimenta a div espacoExibirPagina
  espacoExibirPagina.innerHTML = pageContent

  // lê todos os <script src=""></script> da página carregada
  const scriptsToLoad = espacoExibirPagina.querySelectorAll('script')
  for (const loadScript of scriptsToLoad) {
    const scriptElement = document.createElement('script')
    scriptElement.textContent = await fetch(loadScript.src).then((content) => content.text())
    document.head.appendChild(scriptElement)
    // remove from dom
    loadScript.parentNode.removeChild(loadScript)
  }
}

async function verificarSelecao() {
  // Verifica se selecao2 é 'Hemácias' e selecao3 é 'Diminuído'
  if (selecao2.value === 'Hemácias' && selecao3.value === 'Diminuído') {
    // pega o conteúdo do outro arquivo
    await loadPage('anemia.html')
  } else {
    // Limpa o conteúdo da div se não atender aos critérios
    espacoExibirPagina.innerHTML = ''
    // remove os script adidionados
    document.querySelectorAll('head script').forEach((scrpt) => scrpt.parentNode.removeChild(scrpt))
  }
}

// Adiciona um listener para os eventos de mudança nos menus suspensos
selecao2.addEventListener('change', verificarSelecao)
selecao3.addEventListener('change', verificarSelecao)