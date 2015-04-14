var menuItems,
    observable = require("data/observable");
    homeViewModel = new observable.Observable();

menuItems = [{
        title: "My Watchlist",
        modulePath: "app/components/watchlist/watchlist"
    }, {
        title: "My Rates",
        modulePath: "app/components/rates/rates"
    }, {
        title: "Search",
        modulePath: "app/components/search/search"
    }];

homeViewModel.set("menuItems", menuItems);

module.exports = homeViewModel;
