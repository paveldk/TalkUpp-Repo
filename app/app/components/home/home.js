var frameModule = require("ui/frame"),
    homeViewModel = require("./home-view-model");

function pageLoaded(args) {
    var page = args.object;

    page.bindingContext = homeViewModel;
}

function menuItemTap(args) {
    var navigateToPath = homeViewModel.get("menuItems")[args.index].modulePath;

    frameModule.topmost().navigate(navigateToPath);
}

exports.pageLoaded = pageLoaded;
exports.menuItemTap = menuItemTap;
