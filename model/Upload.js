/**
 * Created with JetBrains PhpStorm.
 * User: Geolffrey
 * Date: 11/12/13
 * Time: 12:25
 * To change this template use File | Settings | File Templates.
 */

//(a_n_p)-> Archivo Subida - No Preview
//(i_f)-> Imagen Subida - Preview
//(i_s_p)-> Solo Preview
//(A)-> ALL

'use strict';
var Upload,
    WARNING_UPLOAD_FILE = {
        ERROR: {
            NOURL: 'Es necesaria la url.',
            NOPACK: 'Es necesario el paquete de archivos.'
        }
    };

Upload = function () {
    var _ajax = new _.Ajax,
        _proto = this.__proto__;


    this.url = null;
    this.formData = null;
    this.complete = null;
    this.progress = null;
    this.error = null;
    this.abort = null;


    _proto.action = function (url) {
        this.url = url;
    };

    _proto.pack = function (file, callback) {
        var self = this,
            _formData = new FormData(),
            _files = [],
            _campo = !!_.is_string(file)
                ? document.querySelector(file) : file;

        if (_campo.type === "file") {
            var _temp = _campo.files,
                x = _temp.length;

            while (x--) {
                _files[x] = _temp[x];
                _formData.append(_campo.name, _temp[x]);
            }
        }

        self.formData = _formData;
        if (callback) {
            callback(_formData);
        }
        return _files;
    };

    _proto.packAll = function (form) {
        var self = this,
            _formData = new FormData(),
            _files = {}, _temp,
            _form = !!_.is_object(form) ? form : document,
            _campos = _form.querySelectorAll('input[type="file"]'),
            z = _campos.length;

        while (z--) {
            _temp = self.pack(_campos[z]);
            _files[_campos[z].name] = _temp;
            _formData.append(_campos[z].name, _temp);
        }

        self.formData = _formData;
        return _files;
    };

    _proto.on = function (event, callback) {
        var self = this;
        if (!callback) {
            return false;
        }

        return [{
            start: function () {
                _ajax.on('before', callback);
            },
            complete: function () {
                self.complete = callback;
            },
            progress: function () {
                self.progress = callback;
            },
            error: function () {
                self.error = callback;
            }
        }[event]()]
    };

    _proto.upload = function (_files) {
        var self = this;
        if (!_files) {
            self.error(WARNING_UPLOAD_FILE.ERROR.NOPACK);
        }

        if (!self.url) {
            self.error(WARNING_UPLOAD_FILE.ERROR.NOURL);
        }


        var _request = {
            url: self.url,
            type: 'POST',
            data: _files,
            contentHeader: 'auto'
        };
        _ajax.kill();
        _ajax.request(_request, function (response) {
            var _upload = _ajax.xhr.upload;

            _upload.addEventListener('abort', self.abort, false);
            _upload.addEventListener('progress', function (progreso) {
                if (progreso.lengthComputable && self.progress) {
                    var pct = Math.round((progreso.loaded / progreso.total) * 100);
                    self.progress(pct);
                }
            }, false);
            _upload.addEventListener('error', self.error, false);

            if (self.complete) {
                self.complete(response);
            }
        })
    }


};