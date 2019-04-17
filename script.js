function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}



var ws = null;
try {
    ws = new WebSocket("ws://127.0.0.1:5555");
    ws.onopen = function () {
        sendMessage("auth");
        // var sendM = {
        //     "action": "login",
        //     "data": {
        //         "name": UserName
        //     }
        // };
        // ws.send(JSON.stringify(sendM));
        // document.querySelector("#sender").addEventListener("click", function(e) {
        //     e.preventDefault();
        //     var text = document.querySelector("#message").value.trim();
        //     if (text.length > 0) {
        //         //#1 - вывести в чат
        //         writeToChatList(text, "Я");
        //         //#2 - отправить сообщение на сервер
        //         var sendM = {
        //             action: "message",
        //             data: {
        //                 name: UserName,
        //                 text: text
        //             }
        //         };
        //         ws.send(JSON.stringify(sendM));
        //         //#3 - очистить строку
        //         document.querySelector("#message").value = '';
        //     }
        // });
    }
    ws.onmessage = function (message) {
        var input = JSON.parse(message.data);
        console.log(input);
        // writeToChatList(input.text, input.from);
    }
} catch (err) {

}

var sendMessage = function (action, data) {
    var authCookie = getCookie("auth");
    if (authCookie === undefined) {
        let value = Math.random()  + "_" + (new Date().getTime());
        setCookie("auth", value, {
            expires: 60*60*24*365
        });
        authCookie = getCookie("auth");
    }

    var data = data ? data : {};
    if (ws) {
        var message = JSON.stringify({
            "action": action,
            "auth": authCookie,
            "data": data
        });
        ws.send(message);
    }
}






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
                    let item = json[ix];
                    var
                        div = document.createElement("div"),
                        button = document.createElement("button");
                    button.innerHTML = item.name;
                    button.setAttribute("id", "pg-" + item.id);
                    button.addEventListener("click", function (e) {
                        e.preventDefault()
                        var
                            curID = "o" + this.getAttribute("id"),
                            listGames = games.querySelectorAll(".pg-game");
                        if (listGames.length) {
                            for (var j = 0; j < listGames.length; j++) {
                                var curEl = listGames[j];
                                if (curEl.getAttribute("id") == curID) {
                                    curEl.style.display = "block";
                                } else {
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
                            let = game = item.games[jx];
                            var
                                a = document.createElement("a");
                            a.setAttribute("href", "javascript:;");
                            a.addEventListener("click", function (e) {
                                e.preventDefault();
                                sendMessage("find-partner", {
                                    platform: item.name,
                                    game: game.id
                                });
                            })

                            a.innerHTML = game.name;
                            gameplace.appendChild(a);


                        }
                    }
                    games.appendChild(gameplace)
                }

            }
        });
}