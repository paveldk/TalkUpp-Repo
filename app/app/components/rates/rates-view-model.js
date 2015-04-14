var _extends = require("../../utils/extends"),
    observable = require("data/observable");

function RatesViewModel() {
    observable.Observable.apply(this, arguments);
}

_extends(RatesViewModel, observable.Observable);

RatesViewModel.prototype.ratedList = [];

RatesViewModel.prototype.onMovieSelect = function() {

};

module.exports = new RatesViewModel();
