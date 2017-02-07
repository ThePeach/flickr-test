function callback(data) {

    if (sessionStorage.array === undefined) {
        sessionStorage.array = [];

    }
    setUpImages(data);

}


function setUpImages(data) {
    var containingDiv = document.createElement('DIV');

    for (var i = 0; i < data["items"].length; i++) {
        var img = document.createElement('IMG');
        img.src = data["items"][i]["media"]["m"];
        img.alt = data["items"][i]["title"];
        img.width = "200";
        img.height = "200";

        var classAttribute = document.createAttribute("class");
        classAttribute.value = '';
        img.setAttributeNode(classAttribute);

        if (sessionStorage.array === "") {
            var sesh = [];
        }
        else {
            var sesh = sessionStorage.array.split(",");

        }

        if (sesh.indexOf(img.getAttribute("src")) !== -1) {
            img.setAttribute("class", "selected");
        }


        containingDiv.appendChild(img);

        containingDiv.addEventListener('click', toggleSelected, false);

    }

    document.body.appendChild(containingDiv);
}

function toggleSelected(e) {
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
