

function addSample () {
  const sample = `# text

  [![img](https://img.shields.io/badge/repo:-markdown%20editor-green.svg?style=flat-square)](http://github.com/andersonbosa/markdown-editor-app)
  
  - list item
    - subitem
  
  ###### Try others things :)
  
  #### xss example

  <img src=x onerror="alert('💥')" />
  `

  const el = (window.document.querySelector('#textSource') || {})
  el.value = sample
  document.dispatchEvent(
    new Event('selectionchange')
  )
}

/**
 * @author @markkop
 * @param {Function} callback
 * @param {number} [wait=500]
 */
function throttleFn (callback, wait = 500) {
  if (!this.isWaiting) {
    this.isWaiting = true;
    callback();
    setTimeout(() => (this.isWaiting = false), wait);
  }
}

/**
 * @return {string} 
 */
function getSourceText () {
  const sourceEl = window.document.querySelector('#textSource')
  return sourceEl && (sourceEl.value)
}

/**
 * @return {HTMLElement} 
 */
function getTargetElement () {
  return window.document.querySelector('#markdownTarget')
}

/**
 * @return {Converter} 
 */
function getConverter () {
  return Boolean(window.showdown) &&
    new window.showdown.Converter()
}

/**
 * Converts the raw text to Markdown and inject it.
 *
 * @type {String} sourceText
 * @type {HTMLElement} targetEl
 * @param {string} _content
 * @return {void}
 */
function convertToMarkdown (_content) {
  const sourceText = _content || getSourceText() || ''
  const targetEl = getTargetElement()
  if (!targetEl) {
    return
  }


  const converter = getConverter()
  if (!converter) {
    return
  }
  targetEl.innerHTML = converter.makeHtml(sourceText)
}

window.document.addEventListener('selectionchange', () => {
  throttleFn(convertToMarkdown, 100)
})
