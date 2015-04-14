var movieService = require("../movie/movie-service"),
    ratesViewModel = require("./rates-view-model");

function pageLoaded(args) {
    var page = args.object;

    page.bindingContext = ratesViewModel;

    movieService.getUserRated()
        .then(function(result) {
            var ratedList = [];

            result.forEach(function(item) {
                ratedList.push({
                    title: item.movie.title,
                    rate: item.rate,
                    poster: item.movie.poster
                });
            });

            ratesViewModel.set("ratedList", ratedList);
        });
}

exports.pageLoaded = pageLoaded;
