var authenticationService = require("./authentication-service"),
    authenticationViewModel = require("./authentication-view-model"),
    frameModule = require("ui/frame");

function onLogged() {
    frameModule.topmost().navigate("app/components/home/home");
}

function onLogin(data) {
    authenticationService.login(data)
        .then(onLogged);
}

function onRegister(data) {
    authenticationService.register(data)
        .then(onLogged);
}

function pageLoaded(args) {
    var page = args.object;

    page.bindingContext = authenticationViewModel;

    authenticationViewModel.on(authenticationViewModel.events.login, onLogin);
    authenticationViewModel.on(authenticationViewModel.events.register, onRegister);
}

exports.pageLoaded = pageLoaded;
