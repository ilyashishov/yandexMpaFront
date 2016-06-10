var AppDispatcher = require('../dispatcher/AppDispatcher');

var Actions = {
	send: function (type, data, callback) {
		const actionData = data || {};
		actionData.actionType = type;
		actionData.callback = callback;
		AppDispatcher.handleAction(actionData);
	}
};

module.exports = Actions;
