
console.log('local::::::' + localStorage.token);
var urlBase = "https://www.apinaser.ibitsoluciones.com/public/api/"
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "Bearer " + localStorage.token);
console.log("--------HEADERS INIT----------------");

var listaHashtag;
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

function getHashtag() {
    requestOptionsTar = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(urlBase + "twitterTrends", requestOptionsTar)
        .then(resp => {
            localStorage.setItem("codeRespondeTwitterTrends", resp.status);
            return resp.json();
        })
        .then(data => {
            if (localStorage.codeRespondeTwitterTrends == 200) {
                listaHashtag = data;
                /*$.each(planesRequest, function(key, value) {
                    $('<option>').val(value.id).text(value.plan_type).appendTo('#plan');
                });
                $('#plan').selectpicker('refresh');*/
            } else
                $('#mensaje').text('Tu nombre de usuario o contraseña no coinciden')

        })
        .catch(error => console.log('error', error));
}
getHashtag()
console.log(listaHashtag)

var words = [
    {text: "Qatar", weight: 50, link: 'http://twitter.com/search?q=Qatar'},
    {text: "#YoDeseo", weight: 49, link: 'http://twitter.com/search?q=%23YoDeseo'},
    {text: "#ConMisHijosNoTeMetas", weight: 48, link: 'http://twitter.com/search?q=%23ConMisHijosNoTeMetas'},
    {text: "Esperanza Gómez", weight: 47, link: 'http://twitter.com/search?q=%22Esperanza+G%C3%B3mez%22'},
    {text: "Comesaña", weight: 46, link: 'http://twitter.com/search?q=Comesa%C3%B1a'},
    {text: "Bad Bunny", weight: 45, link: 'http://twitter.com/search?q=%22Bad+Bunny%22'},
    {text: "Junior", weight: 44, link: 'http://twitter.com/search?q=Junior'},
    {text: "#FelizJueves", weight: 43, link: 'http://twitter.com/search?q=%23FelizJueves'},
    {text: "Colpensiones", weight: 43, link: 'http://twitter.com/search?q=Colpensiones'},
    {text: "Arturo Reyes", weight: 42, link: 'http://twitter.com/search?q=%22Arturo+Reyes%22'},
    {text: "Red Bull", weight: 41, link: 'http://twitter.com/search?q=%22Red+Bull%22'},
    {text: "Daniel Mendoza", weight: 40, link: 'http://twitter.com/search?q=%22Daniel+Mendoza%22'},
    {text: "#MissVenezuela2022", weight: 39, link: 'http://twitter.com/search?q=%23MissVenezuela2022'},
    {text: "#espnf90colombia", weight: 38, link: 'http://twitter.com/search?q=%23espnf90colombia'},
    {text: "Maluma", weight: 37, link: 'http://twitter.com/search?q=Maluma'},
    {text: "Duki", weight: 36, link: 'http://twitter.com/search?q=Duki'},
    {text: "Chocorramo", weight: 37, link: 'http://twitter.com/search?q=Chocorramo'},
    {text: "Arctic Monkeys", weight: 34, link: 'http://twitter.com/search?q=%22Arctic+Monkeys%22'},
    {text: "Invima", weight: 32, link: 'http://twitter.com/search?q=Invima'},
    {text: "La SolarA", weight: 31, link: 'http://twitter.com/search?q=%22La+Solar%22'},
  ];
/*
  var word_list = [
    {text: "Lorem", weight: 13, link: "https://github.com/DukeLeNoir/jQCloud"},
    {text: "Ipsum", weight: 10.5, html: {title: "My Title", "class": "custom-class"}, link: {href: "http://jquery.com/", target: "_blank"}},
    {text: "Dolor", weight: 9.4},
    {text: "Sit", weight: 8},
    {text: "Amet", weight: 6.2},
    {text: "Consectetur", weight: 5},
    {text: "Adipiscing", weight: 5},
    {text: "Elit", weight: 5},
    {text: "Nam et", weight: 5},
    {text: "Leo", weight: 4},
    {text: "Sapien", weight: 4},
    {text: "Pellentesque", weight: 3},
    {text: "habitant", weight: 3},
    {text: "morbi", weight: 3},
    {text: "tristisque", weight: 3},
    {text: "senectus", weight: 3},
    {text: "et netus", weight: 3},
    {text: "et malesuada", weight: 3},
    {text: "fames", weight: 2},
    {text: "ac turpis", weight: 2},
    {text: "egestas", weight: 2},
    {text: "Aenean", weight: 2},
    {text: "vestibulum", weight: 2},
    {text: "elit", weight: 2},
    {text: "sit amet", weight: 2},
    {text: "metus", weight: 2},
    {text: "adipiscing", weight: 2},
    {text: "ut ultrices", weight: 2},
    {text: "justo", weight: 1},
    {text: "dictum", weight: 1},
    {text: "Ut et leo", weight: 1},
    {text: "metus", weight: 1},
    {text: "at molestie", weight: 1},
    {text: "purus", weight: 1},
    {text: "Curabitur", weight: 1},
    {text: "diam", weight: 1},
    {text: "dui", weight: 1},
    {text: "ullamcorper", weight: 1},
    {text: "id vuluptate ut", weight: 1},
    {text: "mattis", weight: 1},
    {text: "et nulla", weight: 1},
    {text: "Sed", weight: 1}
  ];*/
  $(function() {
    $("#my_favorite_latin_words").jQCloud(words);
  });