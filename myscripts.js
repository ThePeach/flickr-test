/* global Store */

function callback (data) {
  Store.init('selectedImages')
  setUpGallery(data)
}

function createImage (imageData) {
  var imgEl = document.createElement('img')
  imgEl.src = imageData.media.m
  imgEl.title = imageData.title
  return imgEl
}

function setUpGallery (data) {
  const container = document.getElementById('gallery')
  let imgEl = null
  let selectedImgs = []

  for (var i = 0; i < data['items'].length; i++) {
    const containingDiv = document.createElement('div')
    containingDiv.classList.add('col-md-3')

    imgEl = createImage(data['items'][i])

    if (Store.inStore(imgEl.src)) {
      containingDiv.classList.toggle('selected')
      selectedImgs.push(imgEl.src)
    }

    containingDiv.appendChild(imgEl)
    containingDiv.addEventListener('click', toggleSelected, false)

    container.appendChild(containingDiv)
  }
  // prune unneded images from Store
  Store.prune(selectedImgs)
}

function toggleSelected (e) {
  this.classList.toggle('selected')

  // find out the current state
  const isSelected = this.classList.contains('selected')

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
