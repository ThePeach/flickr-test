
function callback (data) {
  STORE.init('selectedImages')
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

  for (var i = 0; i < data['items'].length; i++) {
    const containingDiv = document.createElement('div')
    containingDiv.classList.add('col-md-3')

    imgEl = createImage(data['items'][i])

    if (window.sessionStorage.getItem(imgEl.src)) {
      imgEl.classList.toggle('selected')
    }

    containingDiv.appendChild(imgEl)
    containingDiv.addEventListener('click', toggleSelected, false)

    container.appendChild(containingDiv)
  }
}

function toggleSelected (e) {
  this.classList.toggle('selected')

  // find out the current state
  const isSelected = this.classList.contains('selected')

  if (isSelected) {
    window.sessionStorage.setItem(this.src, true)
  } else {
    window.sessionStorage.removeItem(this.src)
  }
}

(function () {
  var tags = 'london'
  var script = document.createElement('script')
  script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=callback&tags=' + tags
  document.head.appendChild(script)
})()
