if ('serviceWorker' in navigator) {
    window.addEventListener('load', (e) => {
        navigator.serviceWorker.register('../sw.js')
            .then(console.log('SW Registered'))
            .catch(e => console.log(e));
    });
}


var elem = document.getElementById("filterBooks");
var panel = document.querySelectorAll(".panel-body .row h3");
var row = document.querySelectorAll(".panel-body > .row");
var hr = document.querySelectorAll(".panel-body > .row + hr");

function filterForBook(val) {
    var a = val.value.toUpperCase();
    _.each(panel, function (value, index, list) {
        if (value.innerText.toUpperCase().indexOf(a) > -1) {
            row[index].style.display = "";
            hr[index].style.display = "";
        } else {
            row[index].style.display = "none";
            hr[index].style.display = "none";
        }

    });
}