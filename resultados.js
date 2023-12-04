function exibirLembrete(titulo, justificativa) {
  console.log('this :>> ', this)

  var espacoExibirLembrete = document.getElementById('espaco-exibir-lembrete')

  var lembreteElemento = document.createElement('div')
  lembreteElemento.classList.add('resultado-pagina', 'lembrete')
  lembreteElemento.innerHTML = `
        <strong class="resultado-pagina-titulo">${titulo.toUpperCase()}</strong>
        <p class="resultado-pagina-justificativa">${justificativa}</p>
    `

  const resultPageTitle = lembreteElemento.querySelector('.resultado-pagina-titulo')

  resultPageTitle.style.fontFamily = 'Arial, sans-serif'
  resultPageTitle.style.textAlign = 'left'
  resultPageTitle.style.color = '#000000'
  resultPageTitle.style.fontSize = '16px'
  resultPageTitle.style.marginLeft = '12px'

  const resultPageJustification = lembreteElemento.querySelector('.resultado-pagina-justificativa')

  resultPageJustification.style.textAlign = 'left'
  resultPageJustification.style.backgroundColor = '#ffffff'
  resultPageJustification.style.borderRadius = '8px'
  resultPageJustification.style.padding = '12px'
  resultPageJustification.style.marginBottom = '12px'

  resultPageJustification.style.color = '#000000'
  resultPageJustification.style.fontSize = '16px'
  resultPageJustification.style.marginLeft = '8px'
  resultPageJustification.style.marginRight = '8px'

  lembreteElemento.style.marginTop = '15px'

  espacoExibirLembrete.innerHTML = ''
  espacoExibirLembrete.appendChild(lembreteElemento)
}

const lis = document.querySelectorAll('div#causas li')

const deactivateElements = (elements) => {
  elements.forEach((element) => element.classList.remove('active'))
}

for (const li of lis) {
  li.classList.remove('active')
  li.onclick = ({ target }) => {
    deactivateElements(lis)
    target.classList.toggle('active')
  }
}
