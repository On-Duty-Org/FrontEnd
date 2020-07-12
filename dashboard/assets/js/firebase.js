const alertList = document.querySelector('.alerts');

// function to set attributes for different elements
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function renderAlert(doc){
    count_id = 0;
    let li = document.createElement('li');
    setAttributes(li, {'class' : 'list-group-item dropdown', 'id' : doc.id});

    let message = document.createElement('button');
    message.innerHTML = 'Alert: '+ doc.data().alert;
    setAttributes(message, {'class' : 'alertMessage mb-2 mr-2 dropdown-toggle btn btn-danger', 'data-toggle' : 'dropdown'});
    let menu = document.createElement('div');
    setAttributes(menu, {'class' : 'dropdown-menu', 'tabIndex' : -1})

    let divider = document.createElement('div');
    setAttributes(divider, {'class' : 'dropdown-divider', 'tabIndex' : -1});

    let coordinates = document.createElement('li');
//Round off the coordinates to 3 decimal places
    // doc.data().coordinates[0] = Number(parseFloat(doc.data().coordinates[0]).toFixed(3));
    // doc.data().coordinates[1] = Number(parseFloat(doc.data().coordinates[1]).toFixed(3));
    coordinates.innerHTML ='<strong>Coordinates</strong>: '+ doc.data().location.latitude + ' ' + doc.data().location.longitude;
    setAttributes(coordinates, {'class' : 'dropdown-item', 'tabIndex' : 0});

    let time = document.createElement('li');
    time.innerHTML = '<strong>Time: </strong>: '+doc.data().timeStamp;
    setAttributes(time, {'class' : 'dropdown-item', 'tabIndex' : 0});

    let uniqueId = document.createElement('li');
    uniqueId.innerHTML = '<strong>ID: </strong>'+doc.id;
    setAttributes(uniqueId, {'class' : 'dropdown-item', 'tabIndex' : 0});

    let nameOfSender = document.createElement('li');
    nameOfSender.innerHTML ='<strong>Name : </strong>'+ doc.data().sender;
    setAttributes(nameOfSender, {'class' : 'dropdown-item', 'tabIndex' : 0});

    let locateOnMap = document.createElement('li');
    locateOnMap.textContent = 'Locate';
    setAttributes(locateOnMap, {'class' : 'dropdown-item font-weight-bold text-danger', 'tabIndex' : 0});

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

// event listener added to alert button
    mapAlert = 'id:'+doc.id+'<br>name :'+doc.data().sender+'<br>message :'+doc.data().alert+'<br>Time:'+doc.data().timeStamp;
    var location = []
    location.push(doc.data().location.longitude); 
    location.push(doc.data().location.latitude);
    locateOnMap.addEventListener('click', function() {
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
var docRef = db.collection('Emergency Mode').get().then((snapshot) =>{

    snapshot.docs.forEach(doc=>{
        renderAlert(doc);
    })
});
