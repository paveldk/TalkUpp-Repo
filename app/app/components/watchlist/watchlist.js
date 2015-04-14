var movieService = require("../movie/movie-service"),
    watchlistViewModel = require("./watchlist-view-model");

function pageLoaded(args) {
    var page = args.object;

    page.bindingContext = watchlistViewModel;

    movieService.getUserWatchlist()
        .then(function(result) {
            watchlistViewModel.set("watchlist", result);
        });
}

exports.pageLoaded = pageLoaded;
