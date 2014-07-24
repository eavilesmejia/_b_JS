/**
 * Created with JetBrains PhpStorm.
 * User: Geolffrey
 * Date: 25/11/13
 * Time: 12:22
 * To change this template use File | Settings | File Templates.
 */

'use strict';
var Chat,
    WARNING_CHAT = {
        ERROR: {
            NO_OBJECT: "Object Needed",
            NO_CHAT: "Need initialize the chat"
        }
    };
Chat = function () {
    var _socket = new _.Socket,
        _proto = this.__proto__;

    this.localUser = null;
    this.remoteUser = null;

    _proto.send_to = function (id) {
        this.remoteUser = id;
    };

    _proto.open = function (conf, callback) {
        _.assert(conf, WARNING_CHAT.ERROR.NO_OBJECT)

        this.localUser = conf.id;

        _socket.set({
            user: conf.id,
            admin: conf.admin,
            protocol: 'chat',
            port: !!conf.port ? conf.port : false
        });

        if (callback) {
            callback(true);
        }

    };

    _proto.message = function (callback) {
        _socket.on('message', function (msg) {
            var ms = JSON.parse(msg.data);

            if (callback) {
                callback(ms);
            }

        });
    };


    _proto.send = function (msg) {
        _.assert(this.localUser, WARNING_CHAT.ERROR.NO_CHAT)

        var mymsg = {};
        mymsg.to = this.remoteUser;
        mymsg.all = !mymsg.to;
        mymsg.message = msg

        _socket.send(mymsg);
    }

};