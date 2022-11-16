
console.log('local::::::' + localStorage.token);
var urlBase = "https://www.apinaser.ibitsoluciones.com/public/api/"
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "Bearer " + localStorage.token);
console.log("--------HEADERS INIT----------------");

var raw = JSON.stringify({ "": "" });

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
};

$('#cerrarSesion').on("click", function() {
    accionLogout('logout');
});

fetch(urlBase + "isvalid", requestOptions)
    .then(resp => {
        if (resp.status != 200) {
            location.href = 'login.html';
        } else {
            $('body').show()
        }
    })
    .catch(error => console.log('error', error));


function accionLogout(accion) {

    fetch(urlBase + accion, requestOptions)
        .then(resp => {
            if (resp.status == 200)
                location.href = 'login.html';
        })
        .catch(error => console.log('error', error));
}


// nube de palabras
anychart.onDocumentReady(function () {

    var data = [
      {"x": "Mandarin chinese", "value": 1090000000, category: "Sino-Tibetan"},
      {"x": "English", "value": 983000000, category: "Indo-European"},
      {"x": "Hindustani", "value": 544000000, category: "Indo-European"},
      {"x": "Spanish", "value": 527000000, category: "Indo-European"},
      {"x": "Arabic", "value": 422000000, category: "Afro-Asiatic"},
      {"x": "Malay", "value": 281000000, category: "Austronesian"},
      {"x": "Russian", "value": 267000000, category: "Indo-European"},
      {"x": "Bengali", "value": 261000000, category: "Indo-European"},
      {"x": "Portuguese", "value": 229000000, category: "Indo-European"},
      {"x": "French", "value": 229000000, category: "Indo-European"},
      {"x": "Hausa", "value": 150000000, category: "Afro-Asiatic"},
      {"x": "Punjabi", "value": 148000000, category: "Indo-European"},
      {"x": "Japanese", "value": 129000000, category: "Japonic"},
      {"x": "German", "value": 129000000, category: "Indo-European"},
      {"x": "Persian", "value": 121000000, category: "Indo-European"}
    ];
  
    // create a tag cloud chart
    var chart = anychart.tagCloud(data);
  
    // set the chart title
    chart.title('15 most spoken languages')
    // set array of angles, by which words will be placed
    chart.angles([0, -45, 90])
    // enable color range
    chart.colorRange(true);
    // set color range length
    chart.colorRange().length('80%');
  
    // format tooltips
    var formatter = "{%value}{scale:(1)(1000)(1000)(1000)|()( thousand)( million)( billion)}";
    var tooltip = chart.tooltip();
    tooltip.format(formatter);
  
    // add an event listener
    chart.listen("pointClick", function(e){
      var url = "https://en.wikipedia.org/wiki/" + e.point.get("x");
      window.open(url, "_blank");
    });
  
    // display chart
    chart.container("container");
    chart.draw();
  });