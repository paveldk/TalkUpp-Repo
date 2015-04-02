var _ = require("../../lib/lodash.compat"),
    frameModule = require("ui/frame"),
    searchService = require("./search-service"),
    searchViewModel = require("./search-view-model");

function onSearch(data) {
    var searchTerm = data.searchTerm.split(" ").join("+");

    searchService.searchByTitle(searchTerm)
        .then(function(result) {
            searchViewModel.set("searchResultList", result);
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
