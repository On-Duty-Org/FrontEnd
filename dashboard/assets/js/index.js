function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
// Police fetch
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
                    console.log(totalPolice)
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
                        temp += "<td class = btn btn-primary><a href = 'http://aman28.pythonanywhere.com/admin/police/polices/"+u.id+"/change/'>EDIT</td>";
                    });
                    document.getElementById("zones").innerHTML = temp;
                    totalZones = data.length
                    console.log(data.length)
            }
        )
    }
);
// Police fetch
wait(100) // prevent fetching this before police and zone fetch

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
                        u.date_posted = u.date_posted.replace('Z', ' ').replace('T', ' ');
                        temp += "<td>"+u.date_posted + "</td>";
                        temp += "<td>"+u.time_slot + "</td>";
                        temp += "<td class = btn btn-primary><a href = 'http://aman28.pythonanywhere.com/admin/allocations/allocations/"+u.id+"/change/'>EDIT</td>";
                    });
                    document.getElementById("allocation").innerHTML = temp;
                    //calculate zones alloted 
                    zoneAlloted = data.length
                    document.getElementById('zone-alloted-live').innerHTML = "<h4>"+ zoneAlloted + "/"+totalZones+" Alloted</h4>"
                    //calculate zones not alloted
                    zoneNotAlloted = totalZones-data.length
                    document.getElementById('zone-na-live').innerHTML = "<h4>"+ zoneNotAlloted + "/"+totalZones+" Not Deployed</h4>"
                    // calculate police alloted
                    policeAlloted = data.length
                    document.getElementById("onduty-live").innerHTML = "<h4>"+policeAlloted+ "/"+totalPolice+" Deployed</h4>";


            }
        )
    }
);
// wait(1000) 