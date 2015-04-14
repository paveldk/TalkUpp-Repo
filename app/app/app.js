var application = require("application"),
    authenticationService = require("./components/authentication/authentication-service");

if (authenticationService.isAuthenticated()) {
    authenticationService.setAuthorization();
    application.mainModule = "app/components/home/home";
} else {
    application.mainModule = "app/components/authentication/authentication";
}

application.cssFile = "app/app.css";
application.start();
