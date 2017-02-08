function callback(data) {

    if (sessionStorage.array === undefined) {
        sessionStorage.array = [];

    }
    setUpImages(data);

}

/**
 * Returns a div with the class specified
 */
function createBootstrapDiv(x) {
    var div = document.createElement('DIV');
    div.setAttribute("class", x);

    return div;
}


function setUpImages(data) {
    var htmlDiv = document.querySelector('.container-fluid');
    var rowDiv = createBootstrapDiv("row");


    for (var i = 0; i < data["items"].length; i++) {

        var img = document.createElement('IMG');
        img.src = data["items"][i]["media"]["m"];
        img.alt = data["items"][i]["title"];

        if (sessionStorage.array === "") {
            var sesh = [];
        }
        else {
            var sesh = sessionStorage.array.split(",");

        }

        if (sesh.indexOf(img.getAttribute("src")) !== -1) {
            img.setAttribute("class", "selected");
        }


        var columnDiv = createBootstrapDiv("col-sm-3");
        columnDiv.appendChild(img);

        columnDiv.addEventListener('click', toggleSelected, false);


        rowDiv.appendChild(columnDiv);

    }
    htmlDiv.appendChild(rowDiv);


}

function toggleSelected(e) {
    if (e.target.nodeName === 'DIV') {
        // console.log(e.target.children[0]);

        return;
        // e.target = e.target.children[0];
        // console.log(e.target.children);
        // console.log(e.target);

    }


    if (e.target.getAttribute("class") === "" || e.target.getAttribute("class") === "deselected") {

        e.target.setAttribute("class", "selected");

        if (sessionStorage.array === "") {
            sesh = [];
        }
        else {
            sesh = sessionStorage.array.split(",");
        }

        sesh.push(e.target.getAttribute("src"));

        sessionStorage.array = sesh;

        console.log(sessionStorage.array);

    }
    else {
        e.target.setAttribute("class", "deselected");

        var sesh = sessionStorage.array.split(",");

        var index = sesh.indexOf(e.target.getAttribute("src"));

        if (index > -1) {
            sesh.splice(index, 1);
        }

        sessionStorage.array = sesh;
        console.log(sessionStorage.array);

    }
}

(function () {
    var tags = 'london';
    var script = document.createElement('script');
    script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=callback& tags=' + tags;
    document.head.appendChild(script);
})();
