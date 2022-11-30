
console.log('local::::::' + localStorage.token);
var urlBase = "https://www.apinaser.ibitsoluciones.com/public/api/"
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", "Bearer " + localStorage.token);
console.log("--------HEADERS INIT----------------");

var listaAutoresFilter;
var listaHashtag;
var listaAutores
var raw = JSON.stringify({ "": "" });
var words = [];
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
                localStorage.setItem("id_ps", listaHashtag[0].id_ps);
                listaHashtag.forEach(function(row){
                    words.push({text:row.name, weight:row.score, handlers: {
                        click: function() {
                            showDataAuthors(row.id_ps ,row.score);
                        },
                        mouseover: function() {
                            console.log(this)
                            $(this).addClass("over");
                            console.log('over')
                        },
                        mouseleave: function() {
                            console.log(this)
                            $(this).removeClass("over");
                            console.log('leave')
                        },
                      }
                    })
                });
                getAuthors()
                $('#my_favorite_latin_words').jQCloud(words, {
                    autoResize: true,
                    colors: ["#F44336", "#F96422", "#FB7418", "#FD830E", "#FF9800", "#FAB03B", "#F5C875", "#F2D492", "#F1D79B"],
                  });
            } else
                $('#mensaje').text('Tu nombre de usuario o contraseña no coinciden')

        })
        .catch(error => console.log('error', error));
}
getHashtag()
console.log(listaHashtag)

function getAuthors() {
    //var raw = JSON.stringify({ "": "" });
    //body: raw,
    requestOptionsTar = {
        method: 'POST',
        headers: myHeaders,  
        redirect: 'follow'
    };

    fetch(urlBase + "authors/"+localStorage.id_ps, requestOptionsTar)
        .then(resp => {
            localStorage.setItem("codeRespondeTwitterAuthors", resp.status);
            return resp.json();
        })
        .then(data => {
            if (localStorage.codeRespondeTwitterTrends == 200) {
                listaAutores = data;
                /*$.each(planesRequest, function(key, value) {
                    $('<option>').val(value.id).text(value.plan_type).appendTo('#plan');
                });
                $('#plan').selectpicker('refresh');*/
                $('#my_favorite_latin_words').jQCloud(words, {
                    autoResize: true,
                    colors: ["#6d0580", "#568052", "#b45e33", "#00bca7", "#93cd5f", "#e49343", "#5388ac", "#009eb3", "#a273ae"],
                  });
            } else
                $('#mensaje').text('Tu nombre de usuario o contraseña no coinciden')

        })
        .catch(error => console.log('error', error));
}


console.log(listaAutores)


function showDataAuthors(id_ps, score){
    listaAutoresFilter = listaAutores.filter(obj => {
         return  obj.score === score && obj.id_ps === id_ps;
      });
      $("#autores > tbody").html("");
      rowNumber = 1; 
      listaAutoresFilter.forEach(function(author) {
        $('#autores > tbody:last-child').append("<tr id='"+author.id_twt+"'><td scope='row'>"+rowNumber+"</td><td class='w-5'><ul class='list-unstyled users-list m-0 avatar-group d-flex align-items-center'><li data-bs-toggle='tooltip' data-popup='tooltip-custom' data-bs-placement='top' class='avatar avatar-md pull-up' title='"+decodeURIComponent(author.name)+"'><a href='https://twitter.com/jennaortega/'"+author.username+" target='_blank'><img src='"+author.url_img_profile+"' alt='Avatar' class='rounded-circle' /></a></li> <div class='ms-3'> <p class='fw-bold mb-1'>"+decodeURIComponent(author.name)+"</p><p class='text-muted mb-0'>"+decodeURIComponent(author.username)+"</p></div></ul></td><td  class='text-center w-5'><span class='badge bg-label-primary me-1'>"+author.followers+"</span></td><td class='text-center w-5'><span class='badge bg-label-primary me-1'>"+author.following+"</span></td><td class='text-center w-5'><span class='badge bg-label-primary me-1'>"+author.retweet_count+"</span></td><td class='text-center w-5'><span class='badge bg-label-primary me-1'>"+author.favorite_count+"</span></td><td class='text-center w-5'><span class='badge bg-label-primary me-1'>"+author.quotes+"</span></td></tr>");
        rowNumber++; 
    });
    $('#autores tr td:first-child').popover({
        html: true,
        placement : 'top',
        trigger : 'hover',
        content: function () {
          return '<div class="popover-message">'+getTrino($(this).closest("tr").prop('id'))+'</div>';
        }
      });
}

function getTrino (id_twt){
    trino = listaAutores.filter(obj => {
        return obj.id_twt == id_twt;
    });
    console.log(trino[0]);
    trino = decodeURIComponent(trino[0].text);
    console.log(trino);
    return trino;
}

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
  /*var words = [
	{text: "Lorem", weight: 13},
	{text: "Ipsum", weight: 10.5},
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
];
*/
 
    
    //$("#my_favorite_latin_words").jQCloud(words);
    //$('#my_favorite_latin_words').jQCloud('destroy');
    //$("#my_favorite_latin_words").jQCloud(words);
  