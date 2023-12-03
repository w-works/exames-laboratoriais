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
    await loadPage('anemia-hemacias.html')
  } else if (selecao2.value === 'Hemácias' && selecao3.value === 'Aumentado') {
    await loadPage('eritrocitose-hemacias.html')

  } else if (selecao2.value === 'Hemoglobina' && selecao3.value === 'Diminuído') {
    await loadPage('anemia-hemoglobina.html')
  } else if (selecao2.value === 'Hemoglobina' && selecao3.value === 'Aumentado') {
    await loadPage('eritrocitose-hemoglobina.html')

  } else if (selecao2.value === 'Hematócrito' && selecao3.value === 'Diminuído') {
    await loadPage('anemia-hematocrito.html')
  } else if (selecao2.value === 'Hematócrito' && selecao3.value === 'Aumentado') {
    await loadPage('eritrocitose-hematocrito.html')

  } else {
    espacoExibirPagina.innerHTML = ''
    document.querySelectorAll('head script').forEach((scrpt) => scrpt.parentNode.removeChild(scrpt))
  }
}


selecao2.addEventListener('change', verificarSelecao)
selecao3.addEventListener('change', verificarSelecao)
