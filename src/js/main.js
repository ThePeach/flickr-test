import Flickr from './flickr'
import Store from './store'

/**
 * @param {Object} imageData
 */
function createImage (imageData) {
  var imgEl = document.createElement('img')
  imgEl.src = Flickr.buildUrl(imageData, 'thumbnail')
  imgEl.title = imageData.title
  imgEl.id = imageData.id
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

  Flickr.fetchRecent('london')
    .then((images) => {
      for (let i = 0; i < images.photo.length; i++) {
        imageEl = createImage(images.photo[i])
        wrappingDiv = createWrappingDiv(imageEl)

        if (Store.contains(imageEl.id)) {
          wrappingDiv.classList.toggle('is-selected')
          selectedImgs.push(imageEl.id)
        }

        container.appendChild(wrappingDiv)
      }
      // prune unneded images from Store
      Store.prune(selectedImgs)
    })
}

/**
 * @param {Event} e
 */
function toggleSelected (e) {
  this.classList.toggle('is-selected')

  // find out the current state
  const isSelected = this.classList.contains('is-selected')

  if (isSelected) {
    Store.addItem(this.firstChild.id)
  } else {
    Store.removeItem(this.firstChild.id)
  }
}

Store.init('selectedImages')
setUpGallery()
