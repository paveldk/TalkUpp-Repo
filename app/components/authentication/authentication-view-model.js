var MainViewModel,
    _consts,
    _extends = require("../../utils/extends"),
    observable = require("data/observable");

_consts = {
    visibility: {
        visible: "visible",
        invisible: "collapsed"
    }
};

function Authentication() {
    observable.Observable.apply(this, arguments);
}

_extends(Authentication, observable.Observable);

Authentication.prototype.username = "";
Authentication.prototype.password = "";
Authentication.prototype.repeatPassword = "";
Authentication.prototype.email = "";

Authentication.prototype.isLoginVisible = _consts.visibility.visible;
Authentication.prototype.isRegisterVisible = _consts.visibility.invisible;

Authentication.prototype.events = {
    login: "login",
    register: "register"
};

Authentication.prototype.onLogin = function() {
    this.notify({
        eventName: this.events.login,
        username: this.get("username"),
        password: this.get("password")
    });
};

Authentication.prototype.onRegister = function() {
    this.notify({
        eventName: this.events.register,
        username: this.get("username"),
        password: this.get("password"),
        email: this.get("email")
    });
};

Authentication.prototype.onShowRegister = function() {
    this.set("isLoginVisible", _consts.visibility.invisible);
    this.set("isRegisterVisible", _consts.visibility.visible);
};

Authentication.prototype.onShowLogin = function() {
    this.set("isLoginVisible", _consts.visibility.visible);
    this.set("isRegisterVisible", _consts.visibility.invisible);
};

module.exports = new Authentication();
