'use strict'

class Wakanda {

    constructor(encryptkey, apikey) {
        this.server = "https://wakanda-statistic-receiver.herokuapp.com/statistics";
        this.async = true;
        this.encryptkey = encryptkey;
        this.apiKey = apikey;

        var wakanda = this;
        jQuery(".wakanda").bind('click', function (event) {
            wakanda.fireRegisterStatistic(wakanda, event);
        });
    }

    fireRegisterStatistic(context, event) {
        var altAttribute = event ? event.currentTarget.attributes['alt'] ? event.currentTarget.attributes['alt'] : event.currentTarget.innerHTML : context.linkClicked;
        var json = {
            apiKey: context.apiKey,
            data: context.encrypt(JSON.stringify({
                "client": context.client,
                "module": context.module,
                "submodule": context.submodule,
                "title": context.title,
                "linkClicked": altAttribute,
                "location": context.getGeoLocation()
            }))
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": context.server,
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "d4db44ae-d915-c323-aa56-feb9289cfdef"
            },
            "processData": false,
            "data": JSON.stringify(json)
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }

    getGeoLocation() {
        if (!this.sendGeoLocation) {
            return "";
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log(pos.lat);
                console.log(pos.lng);
            }, function () {
                console.log("Geo location not found");
            });
        } else {
            console.log("Geo location not supported");
        }
    }

    set client(client) {
        this._client = client;
    }

    get client() {
        return this._client;
    }

    set module(module) {
        this._module = module;
    }

    get module() {
        this._module;
    }

    set submodule(submodule) {
        this._submodule = submodule;
    }

    get submodule() {
        return this._submodule;
    }

    set title(title) {
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set linkClicked(linkClicked) {
        this._linkClicked = linkClicked;
    }

    get linkClicked() {
        return this._linkClicked;
    }

    set async(isAsync) {
        this._async = isAsync;
    }

    set sendGeoLocation(sendGeoLocation) {
        this._sendGeoLocation = sendGeoLocation;
    }

    get sendGeoLocation() {
        return this._sendGeoLocation;
    }

    encrypt(text) {
        return CryptoJS.AES.encrypt(text, this.encryptkey, {
            mode: CryptoJS.mode.CTR
        }).toString();
    }
}