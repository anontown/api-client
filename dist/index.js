"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var AtError = /** @class */ (function () {
    function AtError(statusCode, type, errors) {
        this.statusCode = statusCode;
        this.type = type;
        this.errors = errors;
    }
    return AtError;
}());
exports.AtError = AtError;
exports.defaltConfig = {
    httpOrigin: 'https://api.anontown.com',
    socketOrigin: 'wss://api.anontown.com'
};
var API = /** @class */ (function () {
    function API(config) {
        if (config === void 0) { config = exports.defaltConfig; }
        this.config = config;
    }
    API.prototype.toAuthToken = function (token) {
        return token !== null ? { id: token.id, key: token.key } : null;
    };
    API.prototype.stream = function (name, params, token, authUser, recaptcha) {
        var authToken = this.toAuthToken(token);
        var query = "name=" + encodeURIComponent(name) + "&params=" + encodeURIComponent(JSON.stringify({
            authUser: authUser,
            authToken: authToken,
            recaptcha: recaptcha,
            params: params
        }));
        return rxjs_1.Observable.webSocket(this.config.socketOrigin + '?' + query);
    };
    API.prototype.request = function (path, params, token, authUser, recaptcha) {
        var authToken = this.toAuthToken(token);
        var url = this.config.httpOrigin + path;
        return rxjs_1.Observable.ajax({
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authUser: authUser, authToken: authToken, recaptcha: recaptcha, params: params }),
            crossDomain: true
        })
            .map(function (res) {
            var json = res.response;
            if (res.status === 200) {
                return json;
            }
            else {
                return rxjs_1.Observable.throw(new AtError(res.status, json.type, json.errors));
            }
        });
    };
    //[res]
    API.prototype.createRes = function (authToken, params) {
        return this.request('/res/create', params, authToken, null, null);
    };
    API.prototype.findResOne = function (authToken, params) {
        return this.request('/res/find/one', params, authToken, null, null);
    };
    API.prototype.findResIn = function (authToken, params) {
        return this.request('/res/find/in', params, authToken, null, null);
    };
    API.prototype.findRes = function (authToken, params) {
        return this.request('/res/find', params, authToken, null, null);
    };
    API.prototype.findResNew = function (authToken, params) {
        return this.request('/res/find/new', params, authToken, null, null);
    };
    API.prototype.findResHash = function (authToken, params) {
        return this.request('/res/find/hash', params, authToken, null, null);
    };
    API.prototype.findResReply = function (authToken, params) {
        return this.request('/res/find/reply', params, authToken, null, null);
    };
    API.prototype.findResNotice = function (authToken, params) {
        return this.request('/res/find/notice', params, authToken, null, null);
    };
    API.prototype.findResNoticeNew = function (authToken, params) {
        return this.request('/res/find/notice/new', params, authToken, null, null);
    };
    API.prototype.uvRes = function (authToken, params) {
        return this.request('/res/uv', params, authToken, null, null);
    };
    API.prototype.dvRes = function (authToken, params) {
        return this.request('/res/dv', params, authToken, null, null);
    };
    API.prototype.cvRes = function (authToken, params) {
        return this.request('/res/cv', params, authToken, null, null);
    };
    API.prototype.delRes = function (authToken, params) {
        return this.request('/res/del', params, authToken, null, null);
    };
    //[topic]
    API.prototype.createTopicNormal = function (authToken, params) {
        return this.request('/topic/create/normal', params, authToken, null, null);
    };
    API.prototype.createTopicOne = function (authToken, params) {
        return this.request('/topic/create/one', params, authToken, null, null);
    };
    API.prototype.createTopicFork = function (authToken, params) {
        return this.request('/topic/create/fork', params, authToken, null, null);
    };
    API.prototype.findTopicOne = function (params) {
        return this.request('/topic/find/one', params, null, null, null);
    };
    API.prototype.findTopicIn = function (params) {
        return this.request('/topic/find/in', params, null, null, null);
    };
    API.prototype.findTopicTags = function (params) {
        return (this.request('/topic/find/tags', params, null, null, null));
    };
    API.prototype.findTopic = function (params) {
        return this.request('/topic/find', params, null, null, null);
    };
    API.prototype.findTopicFork = function (params) {
        return this.request('/topic/find/fork', params, null, null, null);
    };
    API.prototype.updateTopic = function (authToken, params) {
        return this.request('/topic/update', params, authToken, null, null);
    };
    //[history]
    API.prototype.findHistoryOne = function (params) {
        return this.request('/history/find/one', params, null, null, null);
    };
    API.prototype.findHistoryIn = function (params) {
        return this.request('/history/find/in', params, null, null, null);
    };
    API.prototype.findHistoryAll = function (params) {
        return this.request('/history/find/all', params, null, null, null);
    };
    //[msg]
    API.prototype.findMsgOne = function (authToken, params) {
        return this.request('/msg/find/one', params, authToken, null, null);
    };
    API.prototype.findMsgIn = function (authToken, params) {
        return this.request('/msg/find/in', params, authToken, null, null);
    };
    API.prototype.findMsg = function (authToken, params) {
        return this.request('/msg/find', params, authToken, null, null);
    };
    API.prototype.findMsgNew = function (authToken, params) {
        return this.request('/msg/find/new', params, authToken, null, null);
    };
    //[profile]
    API.prototype.createProfile = function (authToken, params) {
        return this.request('/profile/create', params, authToken, null, null);
    };
    API.prototype.findProfileOne = function (authToken, params) {
        return this.request('/profile/find/one', params, authToken, null, null);
    };
    API.prototype.findProfileIn = function (authToken, params) {
        return this.request('/profile/find/in', params, authToken, null, null);
    };
    API.prototype.findProfileAll = function (authToken) {
        return this.request('/profile/find/all', null, authToken, null, null);
    };
    API.prototype.updateProfile = function (authToken, params) {
        return this.request('/profile/update', params, authToken, null, null);
    };
    //[token]
    API.prototype.findTokenOne = function (authToken) {
        return this.request('/token/find/one', null, authToken, null, null);
    };
    API.prototype.findTokenAll = function (authToken) {
        return this.request('/token/find/all', null, authToken, null, null);
    };
    API.prototype.deleteTokenClient = function (authToken, params) {
        return this.request('/token/client/delete', params, authToken, null, null);
    };
    API.prototype.findTokenClientAll = function (authToken) {
        return this.request('/token/find/client/all', null, authToken, null, null);
    };
    API.prototype.createTokenMaster = function (authUser) {
        return this.request('/token/create/master', null, null, authUser, null);
    };
    API.prototype.createTokenGeneral = function (authToken, params) {
        return this.request('/token/create/general', params, authToken, null, null);
    };
    API.prototype.setTokenStorage = function (authToken, params) {
        return this.request('/token/storage/set', params, authToken, null, null);
    };
    API.prototype.getTokenStorage = function (authToken, params) {
        return this.request('/token/storage/get', params, authToken, null, null);
    };
    API.prototype.delTokenStorage = function (authToken, params) {
        return this.request('/token/storage/delete', params, authToken, null, null);
    };
    API.prototype.listTokenStorage = function (authToken) {
        return this.request('/token/storage/list', null, authToken, null, null);
    };
    API.prototype.createTokenReq = function (authToken) {
        return this.request('/token/req/create', null, authToken, null, null);
    };
    API.prototype.findTokenReq = function (params) {
        return this.request('/token/find/req', params, null, null, null);
    };
    //[user]
    API.prototype.findUserID = function (params) {
        return this.request('/user/find/id', params, null, null, null);
    };
    API.prototype.findUserSN = function (params) {
        return this.request('/user/find/sn', params, null, null, null);
    };
    API.prototype.createUser = function (recaptcha, params) {
        return this.request('/user/create', params, null, null, recaptcha);
    };
    API.prototype.updateUser = function (authUser, params) {
        return this.request('/user/update', params, null, authUser, null);
    };
    //[client]
    API.prototype.createClient = function (authToken, params) {
        return this.request('/client/create', params, authToken, null, null);
    };
    API.prototype.updateClient = function (authToken, params) {
        return this.request('/client/update', params, authToken, null, null);
    };
    API.prototype.findClientOne = function (authToken, params) {
        return this.request('/client/find/one', params, authToken, null, null);
    };
    API.prototype.findClientIn = function (authToken, params) {
        return this.request('/client/find/in', params, authToken, null, null);
    };
    API.prototype.findClientAll = function (authToken) {
        return this.request('/client/find/all', null, authToken, null, null);
    };
    API.prototype.authUser = function (authUser) {
        return this.request('/user/auth', null, null, authUser, null);
    };
    API.prototype.streamUpdateTopic = function (authToken, params) {
        return this.stream('topic-update', params, authToken, null, null);
    };
    return API;
}());
exports.API = API;
//# sourceMappingURL=index.js.map