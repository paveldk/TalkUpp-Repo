var MovieService,
    Query = require("../../lib/everlive.all.min").Query,
    authenticationService = require("../authentication/authentication-service"),
    backendServices = require("../../providers/data-provider"),
    moviesData = backendServices.data("Movies"),
    userRatesData = backendServices.data("UserRates"),
    _consts;

_consts = {
    baseURL: "http://www.omdbapi.com/?plot=short&r=json&t="
};

function _addWatched(movie) {
    return authenticationService.getCurrentUser()
        .then(function (user) {
            return userRatesData.create({
                movie: movie.id || movie.Id,
                rate: parseFloat(movie.myRate),
                user: user.result.Id
            });
        });
}

function _addToWatchlist(movie) {
    return authenticationService.getCurrentUser()
        .then(function (user) {
            return backendServices.Users.rawUpdate({
                "$addToSet": {
                    "watchlist": movie.id || movie.Id
                }
            }, {
                "Id": user.result.Id
            });
        });
}

function MovieService() {}

MovieService.prototype.getMovieByTitle = function (title) {
    return moviesData.get({
            "title": title
        })
        .then(function (result) {
            return result;
        })
        .then(null, function (err) {
            console.log(err);
        });
};

MovieService.prototype.addToWatchlist = function (args) {
    var that = this;

    if (!args.title) {
        throw new Error("MoviesService: addToWatchList - missing title");
    }

    return this.getMovieByTitle(args.title)
        .then(function (result) {
            if (result.count === 0) {
                that.addMovie(args)
                    .then(function (movieResult) {
                        return _addToWatchlist(movieResult.result);
                    });
            } else {
                _addToWatchlist(result.result[0]);
            }
        })
        .then(null, function (err) {
            console.log(err);
        });
};

MovieService.prototype.addToWatched = function (args) {
    var that = this;

    return this.getMovieByTitle(args.title)
        .then(function (result) {
            if (result.count === 0) {
                that.addMovie(args)
                    .then(function (movieResult) {
                        movieResult.result.myRate = args.myRate;

                        return _addWatched(movieResult.result);
                    });
            } else {
                result.result[0].myRate = args.myRate;

                return _addWatched(result.result[0]);
            }
        })
        .then(null, function (err) {
            console.log(err);
        });
};

MovieService.prototype.getUserWatchlist = function () {
    return authenticationService.getCurrentUser()
        .then(function (user) {
            var query = new Query();

            query.where().isin('Id', user.result.watchlist);

            return moviesData.get(query).then(function (result) {
                    return result.result;
                })
                .then(null, function (err) {
                    console.log(JSON.stringify(err));
                });
        });
};

MovieService.prototype.getUserRated = function () {
    return authenticationService.getCurrentUser()
        .then(function (user) {
            var query = new Query();

            query.where().eq('user', user.result.Id);

            return userRatesData.expand({
                    "movie": true
                }).get(query).then(function (result) {
                    return result.result;
                })
                .then(null, function (err) {
                    console.log(JSON.stringify(err));
                });
        });
};

MovieService.prototype.addMovie = function (args) {
    return moviesData.create(args);
};

module.exports = new MovieService();
