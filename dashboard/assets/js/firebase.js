const alertList = document.querySelector('.alerts');
function renderAlert(doc){
    let li = document.createElement('div');
    let message = document.createElement('button');
    let coordinates = document.createElement('p');
    li.setAttribute('id',doc.id);
    message.textContent = doc.data().message;
    coordinates.textContent = doc.data().coordinates;
    li.appendChild(coordinates);
    li.appendChild(message)
    alertList.appendChild(li);
    
    document.getElementById(doc.id).addEventListener('click', function() {
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
