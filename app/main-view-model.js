var menuItems,
    observable = require("data/observable");
    mainViewModel = new observable.Observable();

menuItems = [
    {
        title: "Authentication",
        modulePath: "/app/components/authentication/authentication"
    },
];

mainViewModel.set("menuItems", menuItems);

exports.mainViewModel = mainViewModel;
