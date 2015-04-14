var MainViewModel,
    _extends = require("../../utils/extends"),
    observable = require("data/observable");

function WatchlistViewModel() {
    observable.Observable.apply(this, arguments);
}

_extends(WatchlistViewModel, observable.Observable);

WatchlistViewModel.prototype.watchlist = [];

WatchlistViewModel.prototype.onMovieSelect = function() {

};

module.exports = new WatchlistViewModel();
