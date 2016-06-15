import {EventEmitter} from 'events';
import _ from 'lodash';

var CHANGE = 'change';

var Store = _.extend({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE, callback);
    }

});

module.exports = Store;
