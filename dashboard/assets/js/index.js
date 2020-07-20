function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
// Fetch allocation table
fetch("http://aman28.pythonanywhere.com/allocation/").then(
    res => {
        res.json().then(
            data => {
                var temp = "";
                data.forEach((u) => {
                    temp += "<tr>";
                    temp += "<td>" + u.id + "</td>";
                    temp += "<td>" + u.zone_name + "</td>";
                    temp += "<td>" + u.police_name + "</td>";
                    temp += "<td>" + new Date(u.date_posted).toLocaleString() + "</td>";
                    temp += "<td>" + u.time + "</td>";
                });
            }
        )
    }
);
// fetch zone count
fetch("http://aman28.pythonanywhere.com/zonecount/").then(
    res => {
        res.json().then(
            data => {
                console.log(data);
                document.getElementById('zone-alloted-live').innerHTML = "<h5>" + data.alloted_zones + "/" + data.total_zones + " Alloted</h5>";
                document.getElementById('zone-na-live').innerHTML = "<h5>" + data.unalloted_zones + "/" + data.total_zones + " Not Deployed</h5>"
            }
        )
    }
);
// fetch police count
fetch("http://aman28.pythonanywhere.com/policecount/").then(
    res => {
        res.json().then(
            data => {
                console.log(data);
                document.getElementById("onduty-live").innerHTML = "<h5>" + data.alloted_police + "/" + data.total_police + " Deployed</h5>";
            }
        )
    }
);