var movieDetails,
    _extends = require("../../utils/extends"),
    observable = require("data/observable"),
    frameModule = require("ui/frame"),
    movieService = require("../movie/movie-service");

function navigatedTo(args) {
    var page = args.object;

    movieDetails = page.navigationContext;
    movieDetails.set("myRate", 3);

    page.bindingContext = movieDetails;
}

function onAddWatchlist() {
    movieService.addToWatchlist(movieDetails)
        .then(function() {
            frameModule.topmost().navigate("app/components/watchlist/watchlist");
        });
}

function onWatched() {
    movieService.addToWatched(movieDetails)
        .then(function() {
            frameModule.topmost().navigate("app/components/rates/rates");
        });
}

exports.navigatedTo = navigatedTo;
exports.onWatched = onWatched;
exports.onAddWatchlist = onAddWatchlist;
