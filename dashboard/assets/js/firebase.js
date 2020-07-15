const alertList = document.querySelector('.alerts');

// function to set attributes for different elements
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}
// Function that returns name of the place from latitude and longitude works only if the lat,long are exact and have more decimal places
function reverseGeocoding(latitude, longitude) {
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + latitude + "," + longitude + ".json?types=poi&access_token=pk.eyJ1IjoiaXNoYW5rNDciLCJhIjoiY2tibm8xbHF3MTc1ZDJycW55Znh6YWppdSJ9.zCHaLlcI36pxVctNkFZ5Sg").then(
        res => {
            res.json().then(
                data => {
                    return data.features[0].place_name;
                }
            )
        }
    );
}

function renderAlert(doc) {
    count_id = 0;
    let li = document.createElement('li');
    setAttributes(li, { 'class': 'list-group-item dropdown', 'id': doc.id });

    let message = document.createElement('button');
    message.innerHTML = 'Alert: ' + doc.data().alert;
    setAttributes(message, { 'class': 'alertMessage mb-2 mr-2 dropdown-toggle btn btn-danger', 'data-toggle': 'dropdown' });
    let menu = document.createElement('div');
    setAttributes(menu, { 'class': 'dropdown-menu', 'tabIndex': -1 })

    let divider = document.createElement('div');
    setAttributes(divider, { 'class': 'dropdown-divider', 'tabIndex': -1 });

    let coordinates = document.createElement('li');
    //Round off the coordinates to 3 decimal places
    // doc.data().coordinates[0] = Number(parseFloat(doc.data().coordinates[0]).toFixed(3));
    // doc.data().coordinates[1] = Number(parseFloat(doc.data().coordinates[1]).toFixed(3));
    coordinates.innerHTML = '<strong>Coordinates</strong>: ' + doc.data().location.latitude + ' ' + doc.data().location.longitude;
    setAttributes(coordinates, { 'class': 'dropdown-item', 'tabIndex': 0 });

    let time = document.createElement('li');
    time.innerHTML = '<strong>Time: </strong>: ' + doc.data().timeStamp;
    setAttributes(time, { 'class': 'dropdown-item', 'tabIndex': 0 });

    let uniqueId = document.createElement('li');
    uniqueId.innerHTML = '<strong>ID: </strong>' + doc.id;
    setAttributes(uniqueId, { 'class': 'dropdown-item', 'tabIndex': 0 });

    let nameOfSender = document.createElement('li');
    nameOfSender.innerHTML = '<strong>Name : </strong>' + doc.data().sender;
    setAttributes(nameOfSender, { 'class': 'dropdown-item', 'tabIndex': 0 });

    let locateOnMap = document.createElement('li');
    locateOnMap.textContent = 'Locate';
    setAttributes(locateOnMap, { 'class': 'dropdown-item font-weight-bold text-danger', 'tabIndex': 0 });

    menu.appendChild(uniqueId);
    menu.appendChild(divider);
    menu.appendChild(coordinates);
    menu.appendChild(divider.cloneNode(true));
    menu.appendChild(time);
    menu.appendChild(divider.cloneNode(true));
    menu.appendChild(nameOfSender);
    menu.appendChild(locateOnMap);
    li.appendChild(message);
    li.appendChild(menu);
    alertList.appendChild(li);
    console.log(doc.data().alert)
    // event listener added to alert button

    var location = []
    latitude = doc.data().location.latitude;
    longitude = doc.data().location.longitude;
    location.push(longitude);
    location.push(latitude);

    locateOnMap.addEventListener('click', function () {

        mapAlert = '<strong>id: </strong>' + doc.id + '<br><strong>Name: </strong> :' + doc.data().sender + '<br><strong>Message: </strong>' + '<br><strong>Location: </strong>' + location + '<br><strong>Time: </strong>' + new Date(doc.data().timeStamp) + '<br><strong>Place Name: </strong>' + reverseGeocoding(latitude, longitude);
        var marker = new mapboxgl.Marker()
            .setLngLat(location)
            .addTo(map);

        var popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(location)
            .setHTML(mapAlert)
            .addTo(map);
        map.flyTo({
            center: location,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    });
}
var docRef = db.collection('Emergency Mode').get().then((snapshot) => {

    snapshot.docs.forEach(doc => {
        renderAlert(doc);
    })
});
