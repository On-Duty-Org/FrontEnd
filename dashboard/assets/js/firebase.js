const alertList = document.querySelector('.alerts');

// function to set attributes for different elements
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function renderAlert(doc){
    let li = document.createElement('li');
    setAttributes(li, {'class' : 'list-group-item dropdown', 'id' : doc.id});

    let message = document.createElement('button');
    message.textContent = doc.data().message;
    setAttributes(message, {'class' : 'alertMessage mb-2 mr-2 dropdown-toggle btn btn-dark', 'data-toggle' : 'dropdown'});

    let menu = document.createElement('div');
    setAttributes(menu, {'class' : 'dropdown-menu', 'tabIndex' : -1})

    let divider = document.createElement('div');
    setAttributes(divider, {'class' : 'dropdown-divider', 'tabIndex' : -1});

    let coordinates = document.createElement('button');
//Round off the coordinates to 3 decimal places
    // doc.data().coordinates[0] = Number(parseFloat(doc.data().coordinates[0]).toFixed(3));
    // doc.data().coordinates[1] = Number(parseFloat(doc.data().coordinates[1]).toFixed(3));
    coordinates.textContent = doc.data().coordinates;
    setAttributes(coordinates, {'class' : 'dropdown-item', 'tabIndex' : 0});

    let time = document.createElement('button');
    time.textContent = 'Time';
    setAttributes(time, {'class' : 'dropdown-item', 'tabIndex' : 0});

    let uniqueId = document.createElement('button');
    uniqueId.textContent = doc.id;
    setAttributes(uniqueId, {'class' : 'dropdown-item', 'tabIndex' : 0});

    let nameOfSender = document.createElement('button');
    nameOfSender.textContent = 'Name';
    setAttributes(nameOfSender, {'class' : 'dropdown-item', 'tabIndex' : 0});

    menu.appendChild(uniqueId);
    menu.appendChild(divider);
    menu.appendChild(coordinates);
    menu.appendChild(divider.cloneNode(true));
    menu.appendChild(time);
    menu.appendChild(divider.cloneNode(true));
    menu.appendChild(nameOfSender);
    li.appendChild(message);
    li.appendChild(menu);
    alertList.appendChild(li);

// event listener added to alert button
    message.addEventListener('click', function() {
        var marker = new mapboxgl.Marker()
        .setLngLat(doc.data().coordinates)
        .addTo(map);
        map.flyTo({
        center: doc.data().coordinates,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        });
}

var docRef = db.collection('alerts').get().then((snapshot) =>{
    snapshot.docs.forEach(doc=>{
        renderAlert(doc)
    })
});
