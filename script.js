if (typeof jQuery != "undefined") {

    jQuery(function () {
        jQuery("#news-slider").slick({
            adaptiveHeight: true,
            autoplay: true,
            arrows: false,
            dots: true
        });
    })

    jQuery(function () {
        jQuery("#store-slider").slick({
            adaptiveHeight: true,
            autoplay: true,
            arrows: false,
            dots: true
        });
    })
}

var playground = document.getElementById("playground");
if (playground) {
    var
        games = playground.querySelector(".games"),
        buttons = playground.querySelector(".buttons");
    fetch("/data.json")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (json) {
            if (json.length) {
                for (var ix in json) {
                    var
                        item = json[ix],
                        div = document.createElement("div"),
                        button = document.createElement("button");
                    button.innerHTML = item.name;
                    button.setAttribute("id", "pg-" + item.id);
                    button.addEventListener("click", function(e){
                        e.preventDefault()
                        var 
                            curID = "o" + this.getAttribute("id"),
                            listGames = games.querySelectorAll(".pg-game");
                        if (listGames.length){
                            for (var j = 0; j<listGames.length; j++){
                                var curEl = listGames[j];
                                if (curEl.getAttribute("id") == curID){
                                    curEl.style.display = "block";
                                }else{
                                    curEl.style.display = "none";
                                }
                            }
                        }

                    });
                    div.appendChild(button);
                    buttons.appendChild(div);
                    var gameplace = document.createElement("div");
                    gameplace.classList.add("pg-game");
                    gameplace.style.display = "none";
                    gameplace.setAttribute("id", "opg-" + item.id)
                    if (item.games.length) {
                        for (var jx in item.games) {
                            var
                                game = item.games[jx],
                                span = document.createElement("span");
                               
                            span.innerHTML = game.name;
                            gameplace.appendChild(span);
                            

                        }
                    }
                    games.appendChild(gameplace)
                }
                
            }
        });
}