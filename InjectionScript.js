(function () {
    let exclusions = [
        "facebook.com/places",
        "facebook.com/friends",
        "facebook.com/groups",
        "facebook.com/pages",
        "facebook.com/watch",
        "facebook.com/marketplace",
        "facebook.com/facebook_pay",
        "facebook.com/games",
        "facebook.com/messages",
        "facebook.com/offers",
        "facebook.com/ads",
        "facebook.com/weather",
        "facebook.com/community_help",
        "facebook.com/gaming",
        "facebook.com/memories",
        "facebook.com/events",
        "facebook.com/saved",
        "facebook.com/fundraisers"
    ];
    console.log("Hey, Facebook!");
    if (exclusions.find(e => window.location.href.indexOf(e) != -1) != undefined) {
        console.log("It doesn't interest us. Exiting.");
        return;
    }

    let personNameRx = /"__isProfile":"User","name":"(.+?)"/g;
    let userNamesRx = /"userVanity":"([A-Za-z0-9\.]+)","userID":"([0-9]+)"/g
    let profileUrlRx = /profile.php\?id=([0-9]+)/g
    let allScripts = document.getElementsByTagName("script")
    let gotPersonName = false;
    let gotUserNames = false;
    let userData = { UserName: '', UserId: '', FullName: '' }

    let urlMatch = profileUrlRx.exec(window.location.href);
    if(urlMatch != null)
    {
        userData.UserId = urlMatch[1];
        gotUserNames = true;
    }

    for (let script of allScripts) {
        if (!gotPersonName) {
            var match = personNameRx.exec(script.innerText);
            if (match != null) {
                userData.FullName = match[1];
                gotPersonName = true;
            }
        }

        if (!gotUserNames) {
            var match = userNamesRx.exec(script.innerText);
            if (match != null) {
                userData.UserName = match[1];
                userData.UserId = match[2];
                gotUserNames = true;
            }
        }

        if (gotPersonName && gotUserNames)
            break;
    }
    console.log(userData);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Stored data on webserver.");
          	window.close();
        }
    };
    xhttp.open("POST", "http://localhost:5010/listen", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(userData));
})();