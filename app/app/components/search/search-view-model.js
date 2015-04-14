var MainViewModel,
    _extends = require("../../utils/extends"),
    observable = require("data/observable");

function SearchViewModel() {
    observable.Observable.apply(this, arguments);
}

_extends(SearchViewModel, observable.Observable);

SearchViewModel.prototype.searchTerm = "";
SearchViewModel.prototype.searchResultList = [];

SearchViewModel.prototype.events = {
    search: "search"
};

SearchViewModel.prototype.onSearch = function() {
    this.notify({
        eventName: this.events.search,
        searchTerm: this.get("searchTerm")
    });
};

module.exports = new SearchViewModel();
