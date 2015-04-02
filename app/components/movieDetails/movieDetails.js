var movieDetails,
    movieService = require("../movie/movie-service");

function navigatedTo(args) {
    var page = args.object;

    page.bindingContext = page.navigationContext;
    movieDetails = page.navigationContext;
}

function onAddWatchlist() {
    movieService.addToWatchlist(movieDetails)
        .then(function() {
            console.log("SUCCESS");
        });
}

function onWatched() {
    movieService.addToWatched(movieDetails)
        .then(function() {
            console.log("SUCCESS");
        });
}

exports.navigatedTo = navigatedTo;
exports.onWatched = onWatched;
exports.onAddWatchlist = onAddWatchlist;
