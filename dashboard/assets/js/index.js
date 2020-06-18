// Police fetc
fetch("http://aman28.pythonanywhere.com/police/").then(
    res=>{
        res.json().then(
            data=>{
                    var temp = "";
                    data.forEach((u)=>{
                        temp+="<tr>";
                        temp += "<td>"+u.id+"</td>";
                        temp += "<td>"+ u.name+"</td>";
                        temp += "<td>"+u.rank + "</td>";
                    });
                    totalPolice = data.length
                    document.getElementById("police").innerHTML = temp;
            }
        )
    }
);
// Zone fetch
fetch("http://aman28.pythonanywhere.com/zone/").then(
    res=>{
        res.json().then(
            data=>{
                    var temp = "";
                    data.forEach((u)=>{
                        temp+="<tr>";
                        temp += "<td>"+u.id+"</td>";
                        temp += "<td>"+ u.name+"</td>";
                        temp += "<td>"+u.priority + "</td>";
                    });
                    document.getElementById("zones").innerHTML = temp;
                    totalZones = data.length
                    console.log(data.length)
            }
        )
    }
);
// Police fetc
fetch("http://aman28.pythonanywhere.com/allocation/").then(
    res=>{
        res.json().then(
            data=>{
                    var temp = "";
                    data.forEach((u)=>{
                        temp+="<tr>";
                        temp += "<td>"+u.id+"</td>";
                        temp += "<td>"+u.zone+"</td>";
                        temp += "<td>"+u.priority + "</td>";
                        temp += "<td>"+u.police_allotted + "</td>";
                        temp += "<td>"+u.date_posted + "</td>";
                        temp += "<td>"+u.time_slot + "</td>";
                    });
                    document.getElementById("allocation").innerHTML = temp;
                    zoneAlloted = data.length
                    document.getElementById('zone-alloted-live').innerHTML = "<h4>"+ zoneAlloted + "/"+totalZones+" Alloted</h4>"
                    zoneNotAlloted = totalZones-data.length
                    document.getElementById('zone-na-live').innerHTML = "<h4>"+ zoneNotAlloted + "/"+totalZones+" Not Alloted</h4>"
                    policeAlloted = data.length
                    document.getElementById("onduty-live").innerHTML = "<h4>"+policeAlloted+ "/"+totalPolice+" Alloted</h4>"


            }
        )
    }
);
