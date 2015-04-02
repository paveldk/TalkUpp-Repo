var MovieService,
    authenticationService = require("../authentication/authentication-service"),
    backendServices = require("../../providers/data-provider"),
    moviesData = backendServices.data("Movies"),
    userRatesData = backendServices.data("UserRates"),
    _consts;

_consts = {
    baseURL: "http://www.omdbapi.com/?plot=short&r=json&t="
};

function _addToWatchlist(movie) {
    authenticationService.getCurrentUser()
        .then(function(user) {
            return backendServices.Users.rawUpdate({
                "$addToSet": {
                    "watchlist": movie.Id
                }
            }, {
                "Id": user.Id
            });
        });
}

function MovieService() { }

MovieService.prototype.getMovieByTitle = function(title) {
    return moviesData.get({ "title": title })
        .then(function(result) {
            return result;
        })
        .then(null, function(err) {
            console.log(err);
        });
};

MovieService.prototype.addToWatchlist = function(args) {
    var that = this;

    if(!args.title) {
        throw new Error("MoviesService: addToWatchList - missing title");
    }

    return this.getMovieByTitle(args.title)
        .then(function(result) {
            if(result.count === 0) {
                that.addMovie(args)
                    .then(function(movieResult) {
                        return _addToWatchlist(movieResult);
                    });
            } else {
                _addToWatchlist(result.result[0]);
            }
        })
        .then(null, function(err) {
            console.log(err);
        });
};

MovieService.prototype.addToWatched = function() {

};

MovieService.prototype.addMovie = function(args) {
    return moviesData.create(args);
};

module.exports = new MovieService();
