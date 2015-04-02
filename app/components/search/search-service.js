var SearchService,
    _consts,
    _ = require("../../lib/lodash.compat"),
    http = require("http");

_consts = {
    baseURL: "http://www.omdbapi.com/?plot=short&r=json&t="
};

function SearchService() { }

SearchService.prototype.searchByTitle = function(title) {
    return http.getJSON(_consts.baseURL + title)
            .then(function(result) {
                return [{
                    title: result.Title,
                    poster: result.Poster,
                    plot: result.Plot,
                    director: result.Director,
                    actors: result.Actors,
                    genre: result.genre,
                    imdbRating: result.imdbRating,
                    awards: result.Awards,
                    runtime: result.Runtime,
                    release: result.Released,
                    year: result.Year
                }];
            })
            .then(null, function(e) {
                console.log(e);
            });
};

module.exports = new SearchService();
