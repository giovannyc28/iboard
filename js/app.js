console.log('local::::::' + localStorage.token);
var urlBase = window.location.origin.replace('portal.', 'api.').replace('8080', '8000') + "/public/api/";
if (window.location.origin == "http://naser.local:8080")
    var urlBase = "http://apinaser.local:8000/public/api/"
if (window.location.origin == "https://www.naser.ibitsoluciones.com")
    var urlBase = "https://www.apinaser.ibitsoluciones.com/public/api/"
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "Bearer " + localStorage.token);
console.log("--------HEADERS INIT----------------");
var seccionInicial = 1;
var edadLimite = 18;
var updateBen = false;

var planesRequest = null;

var raw = JSON.stringify({ "": "" });

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
};

fetch(urlBase + "isvalid", requestOptions)
    .then(resp => {
        if (resp.status != 200) {
            location.href = 'login.html';
        } else {
            $('body').show()
        }
    })
    .catch(error => console.log('error', error));
