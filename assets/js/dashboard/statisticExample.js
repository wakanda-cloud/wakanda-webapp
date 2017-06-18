'use strict';

class Wakanda {

    constructor(encryptkey, apikey) {
        this.server = "https://wakanda-statistic-receiver/statistics";
        this.async = true;
        this.encryptkey = encryptkey;
        this.apiKey = apikey;

        var wakanda = this;
        jQuery(".wakanda").bind('click', function(event) {
            wakanda.fireRegisterStatistic(wakanda, event);
        });
    }

    fireRegisterStatistic(context, event) {
        var element = event.currentTarget;
        var altAttribute = element.attributes['alt'];
        var data = {
            apiKey: context.apiKey,
            data : context.encrypt(JSON.stringify({
                "client": context.client,
                "module": context.module,
                "submodule": context.submodule,
                "title": context.title,
                "linkClicked": altAttribute === undefined ? element.innerHTML.trim() : altAttribute.value,
                "token": context.token.call(this)
            }))
        }

        jQuery.ajax({
            "async": this._async,
            "crossDomain": true,
            "headers" : {
                "content-json" : "application/json"
            },
            "url": context.server,
            "type": "POST",
            "data": JSON.stringify(data)
        });

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

    encrypt(text) {
        return CryptoJS.AES.encrypt(text, this.encryptkey, {
            mode: CryptoJS.mode.CTR
        }).toString();
    }
}