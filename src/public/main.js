const showdown = require('showdown')

function getSourceText () {
  const sourceEl = window.document.querySelector('#textSource')
  return sourceEl && sourceEl.innerText
}

function getTargetElement () {
  return document.querySelector('markdownTarget')
}

/**
 * Converts the raw text to Markdown and inject it.
 *
 * @type {String} sourceText
 * @type {HTMLElement} targetEl
 * @return {void}
 */
function convertToMarkdown () {
  const sourceText = getSourceText() || ''
  const targetEl = getTargetElement()
  if (!sourceText || !targetEl) {
    return
  }

  const converter = new showdown.Converter()
  targetEl.innerHTML = converter.makeHtml(sourceText)
}

window.document.addEventListener(
  'selectionchange', evt => {
    /* delay trigger */
    setTimeout(
      () => convertToMarkdown(), 150
    )
  }
)
