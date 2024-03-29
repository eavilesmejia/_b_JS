/**
 * Created with JetBrains PhpStorm.
 * User: Geolffrey
 * Date: 25/11/13
 * Time: 12:22
 * To change this template use File | Settings | File Templates.
 */

__.fn('tooltip', function (_conf) {
    var _self = this,
        _tool = __.$('<div class="tooltip"></div>'),
        _storage = _.Repository,
        _ajax = _.Ajax,
        _template = _.Template;


    if (!__.$('.tooltip').exist) {
        __.$('body').append(_tool);
    }

    return this.each(function (elem) {
        var _domObject = __.$(elem),
            _html = '',
            _defaults = {
                ajax: false,
                delegate: null,
                transition: 'fast',
                basic_class: 'tooltip'
            },
            _config = _.extend(_defaults, _conf);


        _self.fn('Tooltip', {

            position: function (ev) {
                ev.stopPropagation();
                var _cartesian = _.cartesian_plane(ev.target),
                    _outHeight = window.outerHeight,
                    _innerHeight = window.innerHeight,
                    _x = _cartesian.left + 10,
                    _y = _cartesian.top + 40;

                if (_y > _innerHeight - 50) {
                    _y -= (_outHeight - _cartesian.bottom);
                    _tool.removeClass(_config.basic_class);
                    _tool.addClass(_config.reverse_class);
                }

                _tool.offset({y: _y, x: _x});
            },

            show: function ($data, callback) {
                if (typeof $data == 'object') {
                    _template.tooltip_content($data, callback)
                } else {
                    _template.tooltip($data, callback);
                }
                return _html;
            },
            set: function (index, result) {
                var q = {};
                q[index] = result;
                _storage.append('tooltipData', q);
            },

            get: function (index, dato) {
                var _ajaxConf = {
                    url: _config.url,
                    data: {match: dato}
                }, _self = this;

                _ajax.request(_ajaxConf, function (result) {
                    _self.set(index, result);
                });

            }

        });

        _domObject.addListener('mousemove', function (event) {
            _self.Tooltip.position(event);
        }).addListener('mouseenter',function () {
            var _dato = _domObject.data('tooltip'),
                _index = this.className,
                _storage_t = _storage.get('tooltipData');

            if (!_.is_empty(_dato)) {
                if (!!_config.ajax && !(_storage_t[_index])) {
                    _self.Tooltip.show('Cargando..', function (html) {
                        _tool.html(html);
                        _self.Tooltip.get(_index, _dato);
                    });
                    _tool
                        .fadeIn(_config.transition)
                } else {
                    if (!!_storage_t[_index]) {
                        _tool.html(_storage_t[_index])
                            .fadeIn(_config.transition)
                    } else {
                        _self.Tooltip.show(_dato, function (html) {
                            _self.Tooltip.set(_index, html);
                            _tool.html(html)
                                .fadeIn(_config.transition)
                        });
                    }


                }
            }

        }).on('mouseleave', _config.delegate, function () {
            _tool.hide()
                .html('')
                .removeClass(_config.reverse_class)
                .addClass(_config.basic_class);
        })

    });
});

