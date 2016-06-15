import Request from 'superagent';
//import {get as router} from '../router/RouterContainer';

import { browserHistory } from 'react-router';

function Data(request) {
    this.request = request;
}

Data.prototype.getRequest = function () {
    return this.request;
};

Data.prototype.getSuccess = function () {
    return this.success;
};

Data.prototype.setSuccess = function (value) {
    this.success = value;
};

Data.prototype.getError = function () {
    return this.error;
};

Data.prototype.setError = function (value) {
    this.error = value;
};

Data.prototype.getAlways = function () {
    return this.always;
};

Data.prototype.setAlways = function (value) {
    this.always = value;
};

var request = (function () {
    var _data;
    return {
        post: function (url, data, type) {
            var request = Request
                .post(url.startsWith('http') ? url : process.env.API + url)
            type ? request.type(type) : '';
            request.send(data);
            _data = new Data(request);
            return this;
        },
        get: function (url) {
            var request = Request
                .get(url.startsWith('http') ? url : process.env.API + url)
                .withCredentials()
                .set('content-type', 'application/json')
                .set('Access-Control-Allow-Origin', 'yandex.ru')
                .set('Access-Control-Allow-Credentials', 'true');
            _data = new Data(request);
            return this;
        },
        success: function (success) {
            _data.setSuccess(success);
            return this;
        },
        error: function (error) {
            _data.setError(error);
            return this;
        },
        always: function (always) {
            _data.setAlways(always);
            return this;
        },
        send: function () {
            var sendData = _data;
            sendData.getRequest()
                .accept('json')
                .end(function (err, res) {
                    if (!err) {
                        var _success = sendData.getSuccess();
                        if (_success) {
                            var result;
                            try {
                                result = JSON.parse(res.text);
                            } catch (e) {
                                result = res.text;
                            }
                            _success(result);
                        }
                    } else {
                        var _error = sendData.getError();
                        if (_error) {
                            try {
                                _error(err, JSON.parse(res.text));
                            } catch (e) {
                                try {
                                    _error(err, null);
                                } catch (ee) {
                                }
                            }
                        }
                        if(!err.status){
                            console.log(err);
                            browserHistory.push('/accessIsDenied')
                        }
                        if (err.status === 401) {
                            //if (!router().isActive('login')) {
                            //  router().transitionTo('login', {}, {back: router().getCurrentPath()});
                            //AuthStore.setUserLogged(false);
                            //}
                        }
                        if (err.status === 403) {
                            browserHistory.push('/accessIsDenied');
                        }
                        if (err.status === 404) {
                        }
                        if (err.status === 500) {
                        }
                    }
                    var _always = sendData.getAlways();
                    if (_always) {
                        _always();
                    }
                });
        }
    };
})();

module.exports = request;