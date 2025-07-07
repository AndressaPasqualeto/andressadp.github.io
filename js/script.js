/**
 * Ouve o evento DOMContentLoaded, que é acionado quando o HTML da página
 * foi completamente carregado e analisado, sem aguardar por folhas de estilo e imagens.
 */
document.addEventListener('DOMContentLoaded', () => {

  // ===================================================================
  // FUNÇÕES GLOBAIS DE ANIMAÇÃO
  // ===================================================================

  /**
   * Executa uma sequência de animações em uma lista de elementos.
   * @param {Array<HTMLElement>} elements - A lista de elementos a serem animados.
   * @param {number} index - O índice do elemento atual na lista a ser processado.
   */
  function runAnimationSequence(elements, index = 0) {
    if (index >= elements.length) return;
    const currentElement = elements[index];
    const onComplete = () => runAnimationSequence(elements, index + 1);

    if (currentElement && currentElement.tagName === 'IMG') {
      currentElement.style.opacity = 1;
      onComplete();
      return;
    }
    
    if (currentElement && currentElement.textContent !== null) {
      const text = currentElement.textContent;
      currentElement.textContent = '';
      currentElement.style.visibility = 'visible';
      type(currentElement, text, 0, onComplete);
    } else {
      onComplete();
    }
  }

  /**
   * Aplica o efeito de "digitação" em um elemento de texto, um caractere por vez.
   * @param {HTMLElement} element - O elemento HTML onde o texto será digitado.
   * @param {string} text - O texto completo a ser digitado.
   * @param {number} charIndex - O índice do caractere atual a ser "digitado".
   * @param {Function} onComplete - A função a ser chamada quando a digitação terminar.
   */
  function type(element, text, charIndex, onComplete) {
    if (charIndex < text.length) {
      element.textContent += text.charAt(charIndex);
      setTimeout(() => type(element, text, charIndex + 1, onComplete), 50);
    } else {
      onComplete();
    }
  }

  // ===================================================================
  // LÓGICA DE DETECÇÃO DE PÁGINAS E TRIGGERS DE ANIMAÇÃO
  // ===================================================================

  // --- Lógica para animação condicional da página "Sobre Mim" ---
  const sobreMimLink = document.querySelector('a[href="sobre.html"]');
  if (sobreMimLink) {
    sobreMimLink.addEventListener('click', () => {
      sessionStorage.setItem('animateSobreMim', 'true');
    });
  }

  // --- Lógica para a PÁGINA INICIAL ---
  const indexPageIdentifier = document.querySelector('main img.foto-perfil');
  if (indexPageIdentifier) {
    const h1 = document.querySelector('.texto-principal h1');
    const h2 = document.querySelector('.texto-principal h2');
    const paragraphs = document.querySelectorAll('.texto-principal p');
    
    paragraphs.forEach(p => p.style.visibility = 'hidden');
    h2.style.visibility = 'hidden';
    
    const indexElements = [h1, indexPageIdentifier, h2, ...paragraphs];
    runAnimationSequence(indexElements);
  }

  // --- Lógica para a PÁGINA SOBRE MIM ---
  const sobrePageIdentifier = document.querySelector('.habilidades-container');
  if (sobrePageIdentifier) {
    const h1 = document.querySelector('.conteudo-pagina > h1');
    const h2s = document.querySelectorAll('.conteudo-pagina h2');

    if (sessionStorage.getItem('animateSobreMim') === 'true') {
      sessionStorage.removeItem('animateSobreMim');
      
      h1.style.visibility = 'hidden';
      h2s.forEach(h2 => h2.style.visibility = 'hidden');
      const sobreElements = [h1, ...h2s];
      runAnimationSequence(sobreElements);

    } else {
      h1.style.visibility = 'visible';
      h2s.forEach(h2 => h2.style.visibility = 'visible');
    }
  }

  // --- Lógica para a PÁGINA DE FORMAÇÃO ---
  const formacaoPageIdentifier = document.querySelector('.timeline');
  if (formacaoPageIdentifier) {
     const h1 = document.querySelector('.conteudo-pagina > h1');
     h1.style.visibility = 'hidden';
     const formacaoElements = [h1];
     runAnimationSequence(formacaoElements);
  }

  // --- Lógica para a PÁGINA DE PORTFÓLIO ---
  const portfolioPageIdentifier = document.querySelector('.portfolio-container');
  if (portfolioPageIdentifier) {
     const h1 = document.querySelector('.conteudo-pagina > h1');
     h1.style.visibility = 'hidden';
     const portfolioElements = [h1];
     runAnimationSequence(portfolioElements);
  }
   
  // --- Lógica para a PÁGINA DE CONTATO ---
  const contatoPageIdentifier = document.querySelector('form');
  if (contatoPageIdentifier && document.querySelector('.conteudo-contato')) {
     const h1 = document.querySelector('.conteudo-contato > h1');
     if(h1) h1.style.visibility = 'hidden';
     // CORREÇÃO do erro de digitação de 'contaloElements' para 'contatoElements'
     const contatoElements = [h1];
     runAnimationSequence(contatoElements);
  }

});