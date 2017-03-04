/* global Store */

/**
 * @param {Object} data
 */
function callback (data) {
  Store.init('selectedImages')
  setUpGallery(data)
}

/**
 * @param {Object} imageData
 */
function createImage (imageData) {
  var imgEl = document.createElement('img')
  imgEl.src = imageData.media.m
  imgEl.title = imageData.title
  return imgEl
}

/**
 * @param {HTMLImgElement} imgEl
 */
function createWrappingDiv (imgEl) {
  const containingDiv = document.createElement('div')
  containingDiv.classList.add('gallery_item')

  containingDiv.appendChild(imgEl)
  containingDiv.addEventListener('click', toggleSelected, false)
  return containingDiv
}

/**
 * @param {Object} data
 */
function setUpGallery (data) {
  const container = document.getElementById('gallery')
  let selectedImgs = []
  let wrappingDiv
  let imageEl

  for (var i = 0; i < data['items'].length; i++) {
    imageEl = createImage(data['items'][i])
    wrappingDiv = createWrappingDiv(imageEl)

    if (Store.contains(imageEl.src)) {
      wrappingDiv.classList.toggle('is-selected')
      selectedImgs.push(imageEl.src)
    }

    container.appendChild(wrappingDiv)
  }
  // prune unneded images from Store
  Store.prune(selectedImgs)
}

/**
 * @param {Event} e
 */
function toggleSelected (e) {
  this.classList.toggle('is-selected')

  // find out the current state
  const isSelected = this.classList.contains('is-selected')

  if (isSelected) {
    Store.addItem(this.firstChild.src)
  } else {
    Store.removeItem(this.firstChild.src)
  }
}

(function () {
  var tags = 'london'
  var script = document.createElement('script')
  script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=callback&tags=' + tags
  document.head.appendChild(script)
})()
