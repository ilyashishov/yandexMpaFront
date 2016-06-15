var Dispatcher = require('flux').Dispatcher;
var PayloadSources = require("../constants/PayloadSources");

var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function (action) {
    var payload = {
        source: PayloadSources.VIEW_ACTION,
        action: action
    };
    this.dispatch(payload);
};

module.exports = AppDispatcher;
