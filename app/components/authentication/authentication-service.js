var Authentication,
    _ = require("../../lib/lodash.compat"),
    backendServices = require("../../providers/data-provider"),
    localSettings = require("local-settings"),

_consts = {
    accessTokenKey: "accessToken"
};

function onRequestSuccess(e) {
    localSettings.setString(_consts.accessTokenKey, e.result.access_token);
    return "Success";
}

function onRequestFail(err) {
    return err;
}

function Authentication() { }

Authentication.prototype.login = function(args) {
    if (!args.username) {
        throw new Error("Authentication: login - missing username");
    }

    if (!args.password) {
        throw new Error("Authentication: login - missing password");
    }

    return backendServices.Users.login(args.username, args.password)
        .then(_.bind(onRequestSuccess, this))
        .then(null, _.bind(onRequestFail, this));
};

Authentication.prototype.register = function(args) {
    if(!args.username) {
        throw new Error("Authentication: register - missing username");
    }

    if(!args.password) {
        throw new Error("Authentication: register - missing password");
    }

    if(!args.email) {
        throw new Error("Authentication: register - missing email");
    }

    return backendServices.Users.register(args.username, args.password, { Email: args.email, DisplayName: args.username})
        .then(_.bind(onRequestSuccess, this))
        .then(null, _.bind(onRequestFail, this));
};

Authentication.prototype.getCurrentUser = function() {
    return backendServices.Users.currentUser();
};

Authentication.prototype.logout = function() {

};

Authentication.prototype.isAuthenticated = function() {
    return localSettings.getString(_consts.accessTokenKey);
};

Authentication.prototype.setAuthorization = function() {
    backendServices.Users.setAuthorization(localSettings.getString(_consts.accessTokenKey), "bearer");
};

module.exports = new Authentication();
