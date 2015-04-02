var frameModule = require("ui/frame"),
    vmModule = require("./main-view-model"),
    EverliveData = require("./lib/everlive.all.min"),
    appData = new EverliveData("KoveJ5SWs3p0lPgu");

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    var page = args.object;

    page.bindingContext = vmModule.mainViewModel;
}

function menuItemTap(args) {
    var navigateToPath = mainViewModel.menuItems[args.index].modulePath;

    frameModule.topmost().navigate(navigateToPath);
}

exports.pageLoaded = pageLoaded;
exports.menuItemTap = menuItemTap;
