const selecao2 = document.getElementById('selecao2')
const selecao3 = document.getElementById('selecao3')
const espacoExibirPagina = document.getElementById('espaco-exibir-pagina')

const loadPage = async (page) => {
  const pageContent = await fetch(page).then((content) => content.text())
  espacoExibirPagina.innerHTML = pageContent

  const scriptsToLoad = espacoExibirPagina.querySelectorAll('script')
  for (const loadScript of scriptsToLoad) {
    const scriptElement = document.createElement('script')
    scriptElement.textContent = await fetch(loadScript.src).then((content) => content.text())
    document.head.appendChild(scriptElement)
    loadScript.parentNode.removeChild(loadScript)
  }
}

async function verificarSelecao() {
  if (selecao2.value === 'Hemácias' && selecao3.value === 'Diminuído') {
    await loadPage('anemia.html')
  } else {
    espacoExibirPagina.innerHTML = ''
    document.querySelectorAll('head script').forEach((scrpt) => scrpt.parentNode.removeChild(scrpt))
  }
}

selecao2.addEventListener('change', verificarSelecao)
selecao3.addEventListener('change', verificarSelecao)
