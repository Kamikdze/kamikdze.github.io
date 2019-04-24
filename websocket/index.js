var ws = require('ws'),
    wss = ws.Server;
var server = new wss({
    host: "127.0.0.1",
    port: 5555
});
var sessions = {},
    users = {}

var sendMessage = function(from, message) {
    for (var user of users) {
        if (user !== from) {
            user.send(message);
        }
    }
}

var redrawList = function(current, auth){
    var lst = [];
    for (var key in sessions){
        if (sessions[key].connection != current && sessions[key].connection != null){

            console.log(sessions[key].findPartner);
            if (
                
                typeof sessions[key].findPartner &&
                typeof sessions[auth].findPartner &&
                sessions[key].findPartner != null &&
                sessions[auth].findPartner != null &&
                typeof sessions[key].findPartner["game"] && 
                typeof sessions[key].findPartner["platform"] &&
                typeof sessions[auth].findPartner["game"] && 
                typeof sessions[auth].findPartner["platform"]
            ){
                if (
                    sessions[key].findPartner.game == sessions[auth].findPartner.game &&
                    sessions[key].findPartner.platform == sessions[auth].findPartner.platform
                ){
                    console.log(sessions[key]);
                    lst.push({
                        name: sessions[key].username,
                        game: sessions[key].findPartner.game,
                    });
                }
            }
        }
    }
    return lst;
}

server.on("listening", function() {
    console.log("Мы запустились 5555");
});

server.on("connection", function(thisUser) {
    console.log('К нам постучался пользователь');
    thisUser.on("message", function(message) {
        console.log("Пользователь написал " + message);
        var input = JSON.parse(message);
        if (typeof input.action != "undefined" && typeof input.auth != "undefined") {
            if (!sessions[input.auth]){
                sessions[input.auth] = {
                    connection: null,
                    findPartner: null,
                    username: null
                };
            }
            sessions[input.auth]["connection"] = thisUser;
            switch (input.action) {
                case "auth":
                    for (var key in sessions){
                        if (sessions[key].connection != null){
                            var lst = redrawList(sessions[key].connection, key);
                            console.log(input.data)
                            if (input.data.username){
                                sessions[key].username = input.data.username ? input.data.username : key;
                            }
                            sessions[key].connection.send(JSON.stringify({
                                "action": "find-partner",
                                "items": lst
                            }));
                        }
                    }
                    break;
                case "find-partner":
                    if (typeof input.data.platform != "undefined" && typeof input.data.game != "undefined") {
                        sessions[input.auth].findPartner = {
                            game: input.data.game,
                            platform: input.data.platform,
                        }
                    }
                    for (var key in sessions){
                        if (sessions[key].connection != null){
                            var lst = redrawList(sessions[key].connection, key);
                            sessions[key].connection.send(JSON.stringify({
                                "action": "find-partner",
                                "items": lst
                            }));
                        }
                    }
                    break;
            }
        }
    });
    thisUser.on("close", function() {
        console.log('Пользователь ушел');
        for (var key in sessions){
            if (sessions[key].connection == thisUser){
                sessions[key].connection = null;
            }
        }
        for (var key in sessions){
            if (sessions[key].connection != null){
                var lst = redrawList(sessions[key].connection, key);
                sessions[key].connection.send(JSON.stringify({
                    "action": "find-partner",
                    "items": lst
                }));
            }
        }
    });
});
``