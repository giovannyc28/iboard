
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
      {"x": "#ConMisHijosNoTeMetas", "value": 50, category: "Twitter"},
      {"x": "#DesarrolloEs", "value": 49, category: "Twitter"},
      {"x": "#100DiasDeCambio", "value": 48, category: "Twitter"},
      {"x": "Bad Bunny", "value": 47, category: "Twitter"},
      {"x": "Qatar", "value": 46, category: "Twitter"},
      {"x": "OTAN", "value": 45, category: "Twitter"},
      {"x": "#TimsTwitterListeningParty", "value": 44, category: "Twitter"},
      {"x": "#PetroVa", "value": 43, category: "Twitter"},
      {"x": "Rusia", "value": 42, category: "Twitter"},
      {"x": "Duki", "value": 41, category: "Twitter"},
      {"x": "Maluma", "value": 40, category: "Twitter"},
      {"x": "Daniel Mendoza", "value": 39, category: "Twitter"},
      {"x": "Moncayo", "value": 38, category: "Twitter"},
      {"x": "Ucrania", "value": 37, category: "Twitter"},
      {"x": "Tercera Guerra Mundial", "value": 36, category: "Twitter"},
      {"x": "Invima", "value": 35, category: "Twitter"},
      {"x": "Fracaso", "value": 34, category: "Twitter"},
      {"x": "Duko", "value": 33, category: "Twitter"},
      {"x": "Bolillo", "value": 32, category: "Twitter"},
      {"x": "Nike", "value": 31, category: "Twitter"}
    ];
  
    // create a tag cloud chart
    var chart = anychart.tagCloud(data);
  
    // set the chart title
    chart.title('')
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
      var url = "http://twitter.com/search?q=" + e.point.get("x");
      window.open(url, "_blank");
    });
  
    // display chart
    chart.container("container");
    chart.draw();
  });
