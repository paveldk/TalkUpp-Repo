var _ = require("../../lib/lodash.compat"),
    _extends = require("../../utils/extends"),
    frameModule = require("ui/frame"),
    searchService = require("./search-service"),
    searchViewModel = require("./search-view-model"),
    observable = require("data/observable");

function onSearch(data) {
    var searchTerm = data.searchTerm.split(" ").join("+");

    searchService.searchByTitle(searchTerm)
        .then(function(result) {
            var searchList = [];

            result.forEach(function(movie) {
                var myMovie = new observable.Observable(),
                    movieKeys = Object.keys(movie);

                movieKeys.forEach(function(key) {
                    myMovie.set(key, movie[key]);
                });

                searchList.push(myMovie);
            });

            searchViewModel.set("searchResultList", searchList);
        });
}

function pageLoaded(args) {
    var page = args.object;

    page.bindingContext = searchViewModel;

    searchViewModel.on(searchViewModel.events.search, onSearch);
}

function onMovieSelect(args) {
    var movieData = searchViewModel.get("searchResultList")[args.index];

    frameModule.topmost().navigate({
        moduleName: "app/components/movieDetails/movieDetails",
        context: movieData
    });
}

exports.pageLoaded = pageLoaded;
exports.onMovieSelect = onMovieSelect;
