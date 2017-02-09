/**
 * Returns a div with the class specified
 */
function createBootstrapDiv (x) {
  var div = document.createElement('DIV')
  div.setAttribute('class', x)

  return div
}

function callback (data) {
  if (window.sessionStorage.getItem('array') === null) {
    window.sessionStorage.setItem('array', [])
  }
  setUpImages(data)
}

function setUpImages (data) {
  var htmlDiv = document.querySelector('.container-fluid')
  var rowDiv = createBootstrapDiv('row')

  for (var i = 0; i < data['items'].length; i++) {
    var img = document.createElement('IMG')
    img.src = data['items'][i]['media']['m']
    img.alt = data['items'][i]['title']

    var columnDiv = createBootstrapDiv('col-sm-3')
    columnDiv.appendChild(img)

    var sesh
    if (window.sessionStorage.getItem('array') === '') {
      sesh = []
    } else {
      sesh = window.sessionStorage.getItem('array').split(',')
    }

    columnDiv.addEventListener('click', toggleSelected, false)
    if (sesh.indexOf(img.getAttribute('src')) !== -1) {
      img.parentNode.classList.add('selected')
    }

    rowDiv.appendChild(columnDiv)
  }
  htmlDiv.appendChild(rowDiv)
}

function toggleSelected (e) {
  if (e.target.parentNode.classList.length === 1 || e.target.parentNode.classList.contains('deselected')) {
    var sesh

    if (!e.target.parentNode.classList.contains('row')) {
      if (e.target.parentNode.classList.contains('deselected')) {
        e.target.parentNode.classList.remove('deselected')
      }

      e.target.parentNode.classList.add('selected')
      if (window.sessionStorage.getItem('array') === '') {
        sesh = []
      } else {
        sesh = window.sessionStorage.getItem('array').split(',')
      }

      sesh.push(e.target.getAttribute('src'))

      window.sessionStorage.setItem('array', sesh)
    }
  } else {
    e.target.parentNode.classList.remove('selected')

    e.target.parentNode.classList.add('deselected')

    sesh = window.sessionStorage.getItem('array').split(',')

    var index = sesh.indexOf(e.target.getAttribute('src'))

    if (index !== -1) {
      sesh.splice(index, 1)
    }

    window.sessionStorage.setItem('array', sesh)
  }
}

(function () {
  var tags = 'london'
  var script = document.createElement('script')
  script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=callback& tags=' + tags
  document.head.appendChild(script)
})()


// const and let
// variable for 'array'
// JSON.stringify() and JSON.parse() for storing array
