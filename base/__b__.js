/**
 * Created with JetBrains PhpStorm.
 * User: Geolffrey
 * Date: 25/11/13
 * Time: 12:22
 * To change this template use File | Settings | File Templates.
 */

'use strict';
/**SuperGlobal
 * Un objeto conteniendo los warning o errores de ejecucion.
 * */

if (!window.localStorage || !window.File || !window.FileReader || !window.FileList || !window.Blob || !window.Worker || !window.WebSocket) {
    location.href = 'http://browsehappy.com/';
}

/**Modificando el objeto Function
 * @param child
 */

Function.prototype.extend = function (child) {
    var name = child.prototype.constructor.name || (child.toString().match(/(([^function])([a-zA-z])+(?=\())/)[0]).trim();
    this.prototype[name] = child;
};

/**Add method to class
 * @param name
 * @param fn
 */
Function.prototype.add = function (name, fn) {
    name = name.trim();
    this.prototype[name] = fn;
};

/*Array.prototype.splice = function (from, to) {
 return this.filter(function (v, i) {
 if (i >= from && i < to) {
 return true
 }
 return false;
 })
 }*/

var WARNING_BASE = {
        ERROR: {
            NOPARAM: 'Param needed',
            NOOBJECT: 'An object necessary.',
            NOARRAY: 'An array necessary.',
            NOFUNCTION: 'An function necessary.',
            NODATE: 'Invalid Date',
            NOSTRING: 'String is required',
            NODOM: ' not exist in the DOM document',
            NOCALLBACK: 'Callback error on execution time.',
            NOPROTOCOL: 'No protocol specified in the configuration.',
            NOURL: 'URL is required for the request.',
            NOHTML: 'Html string is required',
            NOPOPUP: 'There are no popup created.'
        }
    },
    scriptCalls = {},
    waitingCalls = {},
    _navigator = navigator.userAgent.toLowerCase(),
    _script = document.getElementsByTagName('script');

/**Modelo Base
 * @constructor
 */

function __b__() {
    this._r_str = false;
}

/**_$_
 * @constructor
 */
function _$_() {
    this.collection = null;
    this.exist = null;
}

/**Dom Traversing
 * @param dom
 * @returns {_$_}
 */
_$_.add('$', function (dom) {
    var _tmp,
        _self = new _$_;

    if (_.is_html(dom)) {
        _tmp = document.createElement('div');
        _tmp.innerHTML = dom;
        _self.collection = _tmp.children.length > 1
            ? _tmp.children
            : _tmp.firstChild;

    } else {
        _self.collection = !_.is_object(dom) && _.is_string(dom)
            ? dom.indexOf('+') > -1
            ? document.querySelectorAll(_.replace(dom, '+', ''))
            : document.querySelector(dom)
            : dom;

    }

    /*if (!_.is_set(_self.collection)) {
     _.error(dom + WARNING_BASE.ERROR.NODOM);
     }*/

    _self.exist = _.is_set(_self.collection);
    return _self;
});

_$_.add('fn', function (name, fn) {
    return __.__proto__[name] = fn;
});

/***Event Handler
 * @param callback
 */
_$_.add('ready', function (callback) {
    var _self = this;
    if (_.is_global(_self.collection)) {
        _self.collection.addEventListener("DOMContentLoaded", callback);
    }
});

/***Event Loadr
 * @param callback
 */
_$_.add('load', function (callback) {
    var _self = this;
    if (_.is_global(_self.collection)) {
        _self.collection.onload = callback;
    }
});


/**Event Listener
 */
_$_.add('addListener', function (event, delegate, callback) {
    if (_.is_function(delegate)) {
        callback = delegate;
    }

    var _self = this,
        _event = function (e) {
            e = e || window.event;
            var _target = event.srcElement || e.target;
            if (_.is_set(delegate) && !_.is_function(delegate)) {
                if (_.is_set(_target.className.baseVal)) {
                    if (_target.className.baseval === delegate) {
                        _.callback_audit(callback, e);
                    }
                } else {
                    __.$(_target).filter(delegate, function () {
                        _.callback_audit(callback, e);
                    });
                }

            } else {
                _.callback_audit(callback, e);
            }

        };

    _self.each(function (elem) {
        if (elem.addEventListener) {
            elem.addEventListener(event, _event, true)
        } else {
            if (elem.attachEvent) {
                elem.attachEvent('on' + event, _event);
            } else {
                elem['on' + event] = _event;
            }
        }
    });

    return this;
});

//TODO
_$_.add('removeListener', function () {

});

/**Filter Pattern match
 *@param filter
 *@param callback
 *@return Object
 */
_$_.add('filter', function (filter, callback, e_handler) {
    this.each(function (elem) {
        var match = elem.matchesSelector ||
            elem.webkitMatchesSelector ||
            elem.mozMatchesSelector ||
            elem.oMatchesSelector ||
            elem.msMatchesSelector;

        if (match.call(elem, filter)) {
            _.callback_audit(callback, __.$(elem));
        } else {
            if (_.is_function(e_handler))
                _.callback_audit(e_handler, elem);
        }
    });

    return this;
});

/**Empty Dom*/

_$_.add('empty', function () {
    this.each(function (v) {
        v.innerHTML = '';
    });
});

/**Clone Objects
 * @param childs
 * @returns {Array}
 */
_$_.add('clone', function (childs) {
    childs = _.is_set(childs);
    var _clones = [];
    this.each(function (v) {
        _clones.push(__.$(v.cloneNode(childs)));
    });
    return _.spec_array(_clones);

});


/***Data set
 * @param name
 * @param value
 * @returns {Array}
 */
_$_.add('data', function (name, value) {
    var _self = this,
        _data_set,
        _values = [];
    _self.each(function (dom, i) {
        if (!_.is_set(dom.dataset)) {
            _data_set = 'data-' + name;
            if (_.is_set(value)) {
                var _set = {};
                _set[_data_set] = value;
                _self.attr(_set);
            } else {
                var _attr = _self.attr(_data_set);
                _values = _.is_array(_attr)
                    ? _attr : [_attr];
            }
        } else {
            _data_set = dom.dataset;
            if (_.is_set(value) || _.is_number(value)) {
                _data_set[name] = _.is_array(value) ? value[i] : value;
            } else {
                if (_.is_set(_data_set[name])) {
                    _values.push(_data_set[name])
                }
            }
        }
    });

    return _.spec_array(_values);
});

/***Assign Properties
 * @param _prop
 * @returns {Array}
 */
_$_.add('prop', function (_prop) {
    var _props = [];
    this.each(function (v) {
        if (_.is_string(_prop)) {
            _props.push(v[_prop]);
        } else {
            _.each(_prop, function (value, index) {
                v[index] = value;
            });
        }
    });

    return _.spec_array(_props);
});

/***Assign Atributes
 * @param _attr
 * @returns {Array}
 */
_$_.add('attr', function (attr) {
    var _attr = [];
    this.each(function (v) {
        if (_.is_string(attr)) {
            _attr.push(v.getAttribute(attr));
        } else {
            _.each(attr, function (value, index) {
                v.setAttribute(index, value);
            });
        }
    });
    return _.spec_array(_attr);
});

/***Remove Atributes
 * @param _attr
 * @returns {Array}
 */
_$_.add('removeAttr', function (attr) {
    this.each(function (v) {
        if (v[attr]) {
            v[attr] = false;
        } else {
            v.removeAttr(attr);
        }
    });
    return this;
});

/**CSS
 * @param _css
 * @returns {_$_}
 */
_$_.add('css', function (css) {
    var _css = [];
    this.each(function (dom) {
        if (_.is_string(css)) {
            var _style = window.getComputedStyle(dom, null);
            _css.push(_style.getPropertyValue(css));
        } else {
            _.each(css, function (value, index) {
                dom.style[index] = value;
            });
        }
    });

    return _.spec_array(_css);
});

/***Insert After
 * @param elem
 */

_$_.add('after', function (elem) {
    if (_.is_html(elem) || !_.is_$(elem)) {
        elem = __.$(elem);
    }
    this.each(function (obj) {
        var _parent = obj.parentNode;
        elem.each(function (v) {
            _parent.insertBefore(v, obj.nextSibling)
        })
    });
    return this;
});

/***Insert Before
 * @param elem
 */

_$_.add('before', function (elem) {
    if (_.is_html(elem) || !_.is_$(elem)) {
        elem = __.$(elem);
    }
    this.each(function (obj) {
        var _parent = obj.parentNode;
        elem.each(function (v) {
            _parent.insertBefore(v, obj)
        })
    });

    return this;
});
/**Append Element or Html
 * @param childs
 * @returns {_$_}
 */
_$_.add('append', function (childs) {
    var parent = this;
    if (_.is_html(childs) || !_.is_$(childs)) {
        childs = __.$(childs);
    }

    parent.each(function (p) {
        childs.each(function (elm) {
            p.appendChild(elm)
        });
    });

    return this;
});

/**Prepend Element or Html
 * @param childs
 * @returns {_$_}
 */
_$_.add('prepend', function (childs) {
    var parent = this;
    if (_.is_html(childs) || !_.is_$(childs)) {
        childs = __.$(childs);
    }

    parent.each(function (p) {
        childs.each(function (elm) {
            p.insertBefore(elm, p.firstChild)
        });
    });

    return this;
});

/**Inner HTML
 * @param html
 * @returns {_$_}
 */
_$_.add('html', function (html) {
    if (_.is_html(html) || _.is_string(html)) {
        this.prop({'innerHTML': html});
    } else {
        return this.prop('innerHTML');
    }
    return this;
});

/**Inner Text
 * @param html
 * @returns {_$_}
 */
_$_.add('text', function (text) {
    if (_.is_string(text)) {
        this.prop({'textContent': text});
    } else {
        return this.prop('textContent');
    }
    return this;
});

/**ISet value
 * @param html
 * @returns {_$_}
 */
_$_.add('val', function (text) {
    if (_.is_string(text)) {
        this.prop({'value': text});
        return this;
    } else {
        return this.prop('value');
    }
});

//Hide Element
_$_.add('hide', function () {
    this.each(function (_elem) {
        _elem.style.display = 'none';
    });
    return this;
});

//Show Element
_$_.add('show', function () {
    this.each(function (_elem) {
        _elem.style.display = 'block';
    });
    return this;
});

/**Parent Node
 * @param callback
 */
_$_.add('parent', function (callback) {
    this.each(function (_elem) {
        _.callback_audit(callback, __.$(_elem.parentNode))
    });
    return this;
});

/**Childs Nodes
 * @param callback
 */
_$_.add('children', function (callback) {
    var _self = this;
    _self.each(function (_elem) {
        if (_elem.children.length > 0) {
            _.each(_elem.children, function (v, i) {
                if (_.is_object(v)
                    && !_.is_function(v)
                    && _.is_set(_elem.children[i])) {
                    _.callback_audit(callback, __.$(v))
                }
            })
        }
    });
    return this;
});

/**Next Node
 * @param callback
 */
_$_.add('next', function (callback) {
    var _self = this;
    _self.each(function (_elem) {
        _.callback_audit(callback, __.$(_elem.nextElementSibling));
    });

    return this;
});

/**Nexts Node
 * @param callback
 */
_$_.add('nexts', function (filter, callback) {
    callback = _.is_function(filter) ? filter : callback;
    var _self = this;
    _self.next(function (elem) {
        var _sibling = elem;
        do {
            if (_.is_set(filter) && !_.is_function(filter)) {
                _sibling.filter(filter, function (elem) {
                    _.callback_audit(callback, elem);
                })
            } else {
                _.callback_audit(callback, _sibling);
            }
            elem = _sibling;
        } while ((_sibling = __.$(elem.collection.nextElementSibling)).exist)
    });

    return this;
});

/**Trigger
 * @param event
 */
_$_.add('trigger', function (event, callback) {
    var _event = new CustomEvent(event, {
        bubbles: true,
        cancelable: true
    });

    if (document.createEvent) {
        _event = document.createEvent('Event');
        _event.initEvent(event, true, false);
        //_event.eventType = event;
    }

    this.each(function (v) {
        v.dispatchEvent(_event);
    });

    _.callback_audit(callback, _event);

    return this;
});

/**Find Elements
 * @param filter
 * @param callback
 */
_$_.add('find', function (filter, callback) {
    var _self = this;
    _self.children(function (elem) {
        elem.filter(filter, function (e) {
            _.callback_audit(callback, e);
        }, function () {
            elem.find(filter, callback);
        })
    });

    return this;
});

/**Full Parent
 * @param parent_class
 * @param callback
 * @returns {_$_}
 */
_$_.add('parents', function (parent_class, callback) {
    var _self = this;
    _self.each(function (_elem) {
        var _parent = __.$(_elem.parentNode);
        _parent.filter(parent_class, function (parent) {
            _.callback_audit(callback, parent);
        }, function () {
            _parent.parents(parent_class, callback);
        });
    });
    return _self;
});

/***Veriy Class
 * @param elem
 * @param cls
 */
_$_.add('hasClass', function (elem, cls) {
    return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(
        _.is_set(elem.className.baseVal)
            ? elem.className.baseVal : elem.className);
});

/**AddClass Element
 * @param elem
 * @param cls
 */
_$_.add('addClass', function (cls) {
    var _self = this;
    _self.each(function (elem) {
        if (!_self.hasClass(elem, cls)) {
            if (elem.classList) {
                elem.classList.add(cls)
            } else {
                if (_.is_set(elem.className.baseVal)) {
                    elem.className.baseVal += ' ' + cls
                } else {
                    elem.className += ' ' + cls;
                }

            }
        }
    });
    return this;
});

/**ToggleClass Element
 * @param elem
 * @param cls
 */
_$_.add('toggleClass', function (cls) {
    var _self = this;
    _self.each(function (elem) {
        if (_self.hasClass(elem, cls)) {
            elem.classList.toggle(cls)
        }
    });
    return this;
});

/**Remove Class
 * @param cls
 */
_$_.add('removeClass', function (cls) {
    var _self = this;
    _self.each(function (elem) {
        if (_self.hasClass(elem, cls)) {
            if (elem.classList) {
                elem.classList.remove(cls)
            } else {
                var _regex = new RegExp(cls, 'g');
                if (_.is_set(elem.className.baseVal)) {
                    elem.className.baseVal = elem.className.baseVal.replace(_regex, '')
                } else {
                    elem.className = elem.className.replace(_regex, '')
                }

            }
        }
    });
    return this;
});

/**Fade Out
 * @param delay
 * @returns {_$_}
 */
_$_.add('fadeOut', function (delay) {
    this.each(function (_elem) {
        _.interval(function (x) {
            _elem.style.opacity = (x - 1) / 0xA;
        }, {
            delay: delay || 0x32,
            limit: 0xA
        });
    });

    return this;
});

/**Fade In
 * @param delay
 * @returns {_$_}
 */
_$_.add('fadeIn', function (delay) {
    this.each(function (_elem) {
        _elem.style.opacity = 0;
        _.interval(function (x) {
            _elem.style.opacity = x / 0xA;
        }, {
            delay: delay || 0x32,
            limit: -0xA
        });
    });

    return this;
});

/**Return and set Heigth of DOM
 * @param height
 * @returns {Object}
 */
_$_.add('height', function (height) {
    if (_.is_set(height)) {
        this.css({'height': _.is_number(height)
            ? height + 'px' : height});
    }

    var _height = [];
    this.each(function (elem) {
        _height.push((_.cartesian_plane(elem)).height);
    });
    return _.spec_array(_height);
});

/**Return and set width of DOM
 * @param width
 * @returns {Object}
 */
_$_.add('width', function (width) {
    if (_.is_set(width)) {
        this.css({'width': _.is_number(width)
            ? width + 'px' : width});
    }
    var _width = [];
    this.each(function (elem) {
        _width.push((_.cartesian_plane(elem)).width);
    });

    return _.spec_array(_width);
});

/**Validate is
 * @param context
 * @return Object
 * */
_$_.add('is', function (context) {
    _.assert(context, WARNING_BASE.ERROR.NOPARAM);
    var _return = false;
    this.each(function (v) {
        __.$(v).filter(context, function () {
            _return = true;
        }, function () {
            _return = v[context] || __.hasClass(v, context) || v['type'] === context;
        });

        if (_return)
            return false;
    });

    return _return;
});

/***Get Childs Element
 * @param find
 * */
_$_.add('get', function (find) {
    var _return = [],
        _self = this;
    _self.each(function (v) {
        _return.push(__.$(v.querySelector(find)));
    });
    return _.spec_array(_return);
});

/***Remove Element*/
_$_.add('remove', function () {
    this.each(function (v) {
        if (v.remove) {
            v.remove();
        } else {
            v.parentNode.removeChild(v);
        }
    });
});

/***Each Element
 * @param callback
 * @returns {_$_}
 */
_$_.add('each', function (callback) {
    var _element = this.collection;
    if (_.is_set(_element.childNodes)
        || _.is_global(_element)) {
        _.callback_audit(callback, _element, 0);
    } else {
        _.each(_element, function (v, i, p) {
            if (_.is_object(v) && _.is_set(v)) {
                _.callback_audit(callback, v, i, p);
            }
        });
    }
    return this;
});

/**Return and set offset of DOM
 * @param _object
 * @returns {Object}
 * */
_$_.add('offset', function (_object) {
    var _offset = [];
    this.each(function (elem) {
        var _cartesian = _.cartesian_plane(elem);
        if (_.is_object(_object)) {
            elem.style.position = 'absolute';
            if (_.is_set(_object.x)) {
                elem.style.left = _.is_number(_object.x)
                    ? _object.x + 'px' : _object.x;
            }

            if (_.is_set(_object.y)) {
                elem.style.top = _.is_number(_object.y)
                    ? _object.y + 'px' : _object.y;
            }
        }

        _offset.push({
            top: _cartesian.top,
            left: _cartesian.left,
            bottom: _cartesian.bottom,
            right: _cartesian.right
        })
    });

    return _.spec_array(_offset);
});


/**Ordena Elementos
 * @param _prop
 * @param _desc
 * @param _object
 * @returns {*|Array}
 */
_$_.add('sort', function (_prop, _desc, _object) {
    if (_.is_boolean(_prop)) {
        _desc = arguments[0];
        _prop = false;
    }

    _desc = !_desc ? 1 : -1;
    _prop = _prop ? _prop : 'innerHTML';
    _object = _.is_object(_object) ? _object : this.collection;
    _object = _.to_array(_object);

    return _object.sort(function (a, b) {

        var _a = a[_prop],
            _b = b[_prop];

        if (_.is_set(_a) && _.is_set(_b)) {
            a = !isNaN(+_a) ? +_a : _a.toLowerCase();
            b = !isNaN(+_b) ? +_b : _b.toLowerCase();
        }

        return (a > b)
            ? _desc : (_desc * -1);
    });

});


/**Animate element
 * @param prop
 * @param conf
 * @return Object
 */
_$_.add('animate', function (prop, conf) {
    this.each(function (elem) {
        _.each(prop, function (v, i) {
            conf[i].from = conf[i].from || 0;
            conf[i].to = conf[i].to || 0x64;
            conf[i].measure = conf[i].measure || 'px';


            elem.style[v] = conf[i].from + conf[i].measure;
            _.interval(function (e) {
                elem.style[v] = e + conf[i].measure;
            }, {
                delay: conf[i].smooth || 0x32,
                limit: -parseInt(conf[i].to)
            })
        })

    });
    return this;
});

/**Return object
 * @returns {Object|Array}
 */
_$_.add('object', function () {
    return this.collection;
});


__b__.extend(_$_);

/** Holders
 * Son funciones de uso global, las cuales sirven de
 * bases prototipicas o plantillas para otros metodos,
 * permitiendo el encapsulamiento y clasificacion.
 * */

/**Router
 * @constructor
 */
function Router() {
}

/**Delega rutas
 * @param path
 * @param callback
 * @returns {boolean}
 */
Router.add('route', function (path, callback) {
    _.assert(path, WARNING_BASE.ERROR.NOPARAM);
    var _location = window.location.pathname,
        _result = _.is_array(path)
            ? _.match_in_array(_location, path)
            : new RegExp(path, 'g').test(_location);

    if (!_result) {
        return false;
    }

    _.callback_audit(callback, path);
});

__b__.extend(Router);


/**Template
 * @constructor
 */
function Template() {
    this.repo = new Repository;
    this.template = null;
}

/***Get Template with Ajax
 * @param template
 * @param callback
 */
Template.add('lookup', function (template, callback) {
    var _ajax = new Ajax,
        _conf = {
            url: setting.app_path + 'templates/' + template,
            dataType: 'text/plain',
            processor: '.html'
        };

    _ajax.request(_conf, function (response) {
        _.callback_audit(callback, response);
    })
});

/**Set Template
 * @param template
 * @param callback
 */
Template.add('get', function (template, callback) {
    var _self = this,
        _repo = this.repo,
        _save = {},
        _template = _repo.get('templates');

    this.template = template;
    if (_.is_set(_template)) {
        if (_.is_set(_template[template])) {
            _.callback_audit(callback, _template[template])
        } else {
            _self.lookup(template, function (temp) {
                _save[template] = temp;
                _repo.append('templates', _save);
                _.callback_audit(callback, temp);
            })
        }
    } else {
        _repo.set('templates', {});
        this.get(template, callback)
    }
});

/**Delete Template
 * @return void;
 */
Template.add('remove', function () {
    this.repo.clear(this.template);
});


/**Parser
 * @param _template
 * @param _fields
 * @param callback
 */
Template.add('parse', function (_template, _fields, callback) {
    var _worker = new Workers;

    _worker.set('workers/Parser', function () {
        _worker.send({template: _template, fields: _fields});
    });

    _worker.on('message', function (e) {
        _.callback_audit(callback, e.data)
    })
});

__b__.extend(Template);

/** Repository
 * @constructor
 */
function Repository() {
}

/**Guarda un elemento en el almacenamiento local
 * @param key
 * @param data
 * @param callback
 */
Repository.add('set', function (key, data, callback) {
    localStorage.setItem(key, JSON.stringify(data));
    _.callback_audit(callback, data, this);
});

/**Retorna un elemento almacenado
 * @param key
 * @returns {*}
 */
Repository.add('get', function (key) {
    return _.is_json(localStorage.getItem(key))
        ? JSON.parse(localStorage.getItem(key)) : null;
});

/**Almacena en la cola a un elemento existente
 * @param key
 * @param element
 * @returns {Object}
 */

Repository.add('append', function (key, element, callback) {
    var _existent = this.get(key),
        _new = _.extend(_.is_set(_existent) ? _existent : {}, element);
    this.set(key, _new, false);
    _.callback_audit(callback, _new);
});

//Limpia el almacenamiento local
Repository.add('clear_all', function () {
    localStorage.clear();
});

/**Limpia un elemento del almacenamiento local
 * @param key
 */
Repository.add('clear', function (key) {
    localStorage.removeItem(key);
});

//Retorna la cantidad de elementos en el almacenamiento
Repository.add('count', function () {
    return localStorage.length;
});

__b__.extend(Repository);
//Termina Repository

/**Socket Factory
 * @constructor
 */
function Socket() {
    this.socket = null;
    this.open = null;
    this.close = null;
    this.message = null;
    this.error = null;
    this.protocol = null;
    this.user = null;
    this.admin = null;
    this.host = window.location.host;
    this.host = this.host.indexOf('127.0.0.1') > -1 ? 'localhost' : this.host;
}

/**Establece e inicializa el socket
 * @param config
 * @returns {*}
 */
Socket.add('set', function (config) {
    var self = this;

    if (!config && !(_.is_object(config))) {
        throw (WARNING_BASE.ERROR.NOOBJECT);
    }

    var protocol = !!config.protocol ? config.protocol : false,
        user = !!config.user ? config.user : false,
        port = !!config.port ? config.port : 0x1F90,
        admin = !!config.admin ? config.admin : 'default';

    self.user = user;
    self.protocol = protocol;
    self.admin = admin;

    if (!!protocol && !!user) {
        var _query = '?protocol=' + protocol + '&user=' + user + '&admin=' + admin;
        self.socket = new WebSocket('ws://' + self.host + ':' + port + _query);
        self.socket.addEventListener('open', function (e) {
            if (self.open) {
                self.open(e)
            }
        });
        self.socket.addEventListener('error', function (e) {
            if (self.error) {
                self.error(e)
            }
        });
        self.socket.addEventListener('close', function (e) {
            if (self.close) {
                self.close(e)
            }
        });
        self.socket.addEventListener('message', function (e) {
            if (self.message) {
                self.message(e);
            }
        });
        return self.socket;
    } else {
        return false;
    }

});

/**Socket Event Handler
 * @param event
 * @param callback
 * @returns {Array}
 */
Socket.add('on', function (event, callback) {
    var self = this;
    return [{
        message: function () {
            self.message = callback;
        },
        open: function () {
            self.open = callback;
        },
        close: function () {
            self.close = callback;
        },
        error: function () {
            self.error = callback;
        }
    }[event]()]
});

/**Envia un mensaje por el socket
 * @param config
 * */
Socket.add('send', function (config) {
    var _myconf = {};

    _myconf.all = false;
    _myconf.protocol = this.protocol;
    _myconf.from = this.user;
    _myconf.admin = this.admin;

    config = _.extend(_myconf, config);

    if (!config.protocol) {
        throw (WARNING_BASE.ERROR.NOPROTOCOL);
    }

    if (this.socket) {
        this.socket.send(JSON.stringify(config));
    }
});

//Elimina el socket actual
Socket.add('clear', function () {
    this.socket = null;
});

//Retorna el socket actual
Socket.add('get', function () {
    return this.socket;
});

//Stop Socket
Socket.add('stop', function () {
    this.socket.close();
});

__b__.extend(Socket);

/**Workers Fatory
 * @constructor
 */
function Workers() {
    this.Worker = null;
    this.onsuccess = null;
}

/**Worker Event Handler
 * @param event
 * @param callback
 * @returns {Array}
 */
Workers.add('on', function (event, callback) {
    var self = this;
    return [{
        message: function () {
            self.onsuccess = callback;
        }
    }[event]()]
});

/**Establece e inicializa un worker
 * @param url
 * @param callback
 */
Workers.add('set', function (url, callback) {
    var self = this;
    self.Worker = (new Worker(setting.app_path + url + '.min.js'));
    self.Worker.addEventListener('message', function (e) {
        _.callback_audit(self.onsuccess, e);
    }, false);
    _.callback_audit(callback);

});

/**Envia un mensaje al worker
 * @param message
 */
Workers.add('send', function (message) {
    this.Worker.postMessage(!!message ? message : '');
});

/**Detiene un worker
 * @param callback
 */
Workers.add('kill', function (callback) {
    if (this.Worker) {
        this.Worker.terminate();
        this.Worker = null;
        _.callback_audit(callback);
    }
});

//Retorna el worker actual
Workers.add('get', function () {
    return  this.Worker;
});

__b__.extend(Workers);


/**Shorcuts
 * @constructor
 */
function Shortcuts() {

}

/**Shorcuts Ajax Get
 * @param url
 * @param data
 * @param callback
 */
Shortcuts.add('ajax_get', function (url, data, callback) {
    var _ajax = new Ajax,
        _conf = {
            url: !!url ? url : '#',
            processData: true,
            data: !!data ? data : null
        };

    _ajax.kill();
    _ajax.request(_conf, callback);
});

/**Shorcuts Ajax Post
 * @param url
 * @param data
 * @param callback
 */
Shortcuts.add('ajax_post', function (url, data, callback) {
    var _ajax = new Ajax,
        _conf = {
            url: !!url ? url : '#',
            data: !!data ? data : null,
            type: 'POST'
        };

    _ajax.kill();
    _ajax.request(_conf, callback);
});


Shortcuts.add('socket_send', function (send) {
    var _socket = new Socket,
        _conf = {
            user: _.get_encoded_id(8),
            protocol: 'update',
            admin: 'default'
        };

    send = _.extend(_conf, send)
    _socket.set(send);
    if (!!send) {
        _socket.on('open', function () {
            _socket.send(send);
        })
    }

});

/**Shorcuts Socket Listen
 * @param conf
 * @param callback
 */
Shortcuts.add('socket_listen', function (conf, callback) {
    var _socket = new Socket,
        _conf = {
            user: _.get_encoded_id(8),
            protocol: 'update',
            admin: 'default'
        };

    if (_.is_function(conf)) {
        callback = conf;
        conf = {};
    }

    _conf = extend(_conf, conf);
    _socket.set(_conf);
    if (!!conf) {
        _socket.on('message', function (msg) {
            _.callback_audit(callback, JSON.parse(msg.data));
        });
    }

});

__b__.extend(Shortcuts);


/**Ajax
 * @constructor
 */
function Ajax() {
    this.xhr = new window.XMLHttpRequest || new window.ActiveXObject("Microsoft.XMLHTTP");
    this.xhr_list = [];
    this.upload = null;
    this.before = null;
    this.complete = null;
    this.progress = null;
    this.state = null;
    this.abort = null;
    this.error = null;
}


Ajax.add('on', function (event, callback) {
    var self = this;
    return [{
        before: function () {
            self.before = callback;
        },
        complete: function () {
            self.complete = callback;
        },
        error: function () {
            self.error = callback;
        },
        abort: function () {
            self.abort = callback;
        },
        state: function () {
            self.state = callback;
        },
        progress: function () {
            self.progress = callback;
        }
    }[event]()]
});

/**Ejecuta una consulta Ajax
 * @param config
 * @param callback
 * @returns {*}
 */
Ajax.add('request', function (config, callback) {
    var _self = this,
        _xhr = _self.xhr,
        _processor = config.processor || setting.ajax_processor || '',
        _token = config.token || true,
        _data = config.data
            ? config.data : null,
        _contentHeader = config.contentHeader || [
            {
                header: 'Content-Type',
                value: 'application/x-www-form-urlencoded;charset=utf-8'
            }
        ],
        _type = config.type || 'GET';

    if (!_.is_object(config)) {
        throw (WARNING_BASE.ERROR.NOOBJECT)
    }

    if (!_.is_set(config.url)) {
        throw (WARNING_BASE.ERROR.NOURL);
    }

    if (!_.is_form_data(_data)
        && _.is_set(_data)
        && _contentHeader !== 'auto') {
        _data = _.parse_json_url(_data);
    }

    if (_type === 'GET' && _.is_set(_data)) {
        _processor += '?' + _data;
    }

    _processor = config.url + (_processor || '');
    _xhr.open(_type, _processor, true);
    if (!_.is_form_data(_data) && _contentHeader !== 'auto') {
        _.each(_contentHeader, function (v) {
            _self.request_header(v.header, v.value);
        });
    }

    if (_.is_set(_token))
        _self.request_header("X-CSRFToken", _.get_cookie('csrftoken'));

    if (_.is_set(config.upload)) {
        _self.upload = _self.xhr.upload;
        _xhr = _self.upload;
    }

    _xhr.addEventListener('load', function (e) {
        if (this.status >= 0xC8 && this.status < 0x190) {
            var _response = this.response || this.responseText;
            if (_.is_json(_response)) {
                _response = JSON.parse(_response);
            }
            _.callback_audit(callback, _response, e);

        }
    });

    _xhr.addEventListener('progress', function (e) {
        if (_self.progress) {
            _self.progress(e);
        }
    }, false);

    _xhr.addEventListener('readystatechange', function (e) {
        if (this.readyState) {
            if (!!_self.state) {
                _self.state(this.readyState, e);
            }
        }
    });

    _xhr.addEventListener('abort', function (e) {
        if (!!_self.abort) {
            _self.abort(e);
        }
    });

    _xhr.addEventListener('loadend', function (e) {
        if (!!_self.complete) {
            _self.complete(e);
        }
    });

    _xhr.addEventListener('loadstart', function (e) {
        if (!!_self.before) {
            _self.before(e);
        }
    });

    _xhr.addEventListener('error', function (e) {
        if (!!_self.error) {
            _self.error(e);
        }
    });


    _self.xhr_list.push(_self.xhr);
    _xhr.send(_type !== 'GET' ? _data : null);

    return _self.xhr;

});

/**Establece cabeceras
 * @param header
 * @param type
 */
Ajax.add('request_header', function (header, type) {
    this.xhr.setRequestHeader(header, type);
});

//Detiene la ejecucion de un request
Ajax.add('kill', function () {
    var i = this.xhr_list.length;
    while (i--) {
        if (!!this.xhr_list[i])
            this.xhr_list[i].abort();
    }
    this.xhr_list.length = 0;
});

__b__.extend(Ajax);

/**Popup
 * @constructor
 */
function Popup(_conf) {

    var _nav = _.get_nav();
    this.popup = null;
    this.popupClass = '.popupBox';
    this.overlay = null;
    this.overlayClass = '.overlayFondo';
    this.conf = {
        popup: {
            'overflow': 'hidden',
            'backgroundColor': 'transparent',
            'position': 'absolute',
            'zIndex': '1200'
        },
        overlay: {
            'backgroundColor': 'rgba(0, 0, 0, 0.7)',
            'height': '100%',
            'width': '100%',
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'zIndex': '1000'
        }
    };

    this.conf.popup[_nav.nav === 'firefox'
        ? 'MozBoxSizing' : 'boxSizing'] = 'border-box';

    if (_.is_set(_conf.popup)) {
        _.extend(this.conf.popup, _conf.popup, true);
    }

    if (_.is_set(_conf.overlay)) {
        _.extend(this.conf.overlay, _conf.overlay, true);
    }

}

/** Create Popup
 * @param contenido
 * @param width
 * @param height
 * @returns {{top: number, left: number, width: *, height: *}}
 */
Popup.add('create', function (contenido, width, height) {
    var _popup = __.$('<div class="popupBox"></div>'),
        _overlay = __.$('<div class="overlayFondo"></div>'),
        _top , _left,
        _body = __.$('body'),
        _window = __.$(window),
        _windowWidth = _window.width(),
        _windowHeigth = _window.height();

    this.popup = _popup;
    this.overlay = _overlay;

    _overlay.css(this.conf.overlay);
    _popup.css(this.conf.popup);
    _body.append(_popup);
    _body.append(_overlay);
    _popup.html(contenido);

    if (!_.is_set(height)) {
        height = _popup.height();
    }

    if (!_.is_set(width)) {
        width = _popup.width();
    }

    _top = Math.abs(Math.ceil((_windowHeigth - height) / 2));
    _left = Math.abs(Math.ceil((_windowWidth - width) / 2));

    if (height > _windowHeigth) {
        height = (_windowHeigth - (_top * 2));
    }

    if (width > _windowWidth) {
        width = (_windowWidth - (_left * 2));
    }

    _popup.width(width);
    _popup.height(height);
    _popup.offset({y: _top, x: _left});
    return {top: _top, left: _left, width: width, height: height};
});

//Remove Popup
Popup.add('remove', function () {
    if (!this.overlay || !this.popup) {
        _.warning(WARNING_BASE.ERROR.NOPOPUP);
        return;
    }

    this.overlay.remove();
    this.popup.remove();
    this.overlay = null;
    this.popup = null;
});

__b__.extend(Popup);

/**CSRF
 * @constructor
 */
function CSRF() {
    this.storage = new Repository;
    this.name = 'csrf'
    this.tokenAt = null;
}

/**Retorna el token almacenado
 * @param key
 * @returns {*}
 */
CSRF.add('get', function (key) {
    var _db = this.storage.get(this.name);
    if (!!_db) {
        if (_.is_set(key) && _.is_set(_db[key])) {
            return _db[key];
        } else {
            return _db;
        }
    }
    return null;
});

/**Guarda el token
 * @param key
 */
CSRF.add('save', function (key) {
    var _db = this.get(this.name),
        _tokens = !!_db ? _db : {};

    _tokens[key] = this.tokenAt;
    this.storage.set(this.name, _tokens, false);
});

/**Valida si exsite una cookie almacenada y la retorna sino es false
 * @param name
 * @returns {null|*}
 */
CSRF.add('token', function (name) {
    this.tokenAt = _.get_cookie(name);
    return this.tokenAt;
});

/**Limpia session CSRF
 * @param key
 */
CSRF.add('clear', function (key) {
    var _db = this.get(false);
    if (_db && _db[key]) {
        _db[key] = null;
        this.storage.set(this.name, _db, false);
    }
});

//Destruye la session
CSRF.add('destroy', function () {
    this.storage.clear(this.name);
});

/**Verifica si es necesario el csrf
 * @param method
 * @returns {*|boolean}
 */
CSRF.add('is_safe_method', function (method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
});

__b__.extend(CSRF);


/**Valida si esta seteado un elemento y envia un mensaje
 * @param obj
 * @param msg
 * @returns {object}
 */
__b__.add('assert', function (obj, msg) {
    if (!_.is_set(obj)) {
        _.error(_.is_set(msg) ? msg : 'Param needed');
    }
    return this;
});


/**Valida si un elemento es un arreglo
 * @param obj
 * @returns {boolean}
 */
__b__.add('is_array', function (obj) {
    return  _.object_as_string(obj) === '[object Array]';
});

/**Valida si un elemento es un object
 * @param obj
 * @returns {boolean}
 */
__b__.add('is_object', function (obj) {
    return (_.object_as_string(obj) === '[object Object]' || (typeof obj === 'object' && _.object_as_string(obj) !== '[object Null]'));
});

/**Valida si un elemento es un object
 * @param obj
 * @returns {boolean}
 */
__b__.add('is_global', function (obj) {
    return (_.object_as_string(obj) === "[object global]"
        || _.object_as_string(obj) === "[object Window]"
        || _.object_as_string(obj) === "[object HTMLDocument]"
        || _.object_as_string(obj) === "[object Document]");
});
/**Valida si un elemento es un object _$_
 * @param obj
 * @returns {boolean}
 */
__b__.add('is_$', function (obj) {
    return (obj instanceof _$_);
});

/**Valida si es un FormData
 * @param obj
 * @returns {boolean}
 */
__b__.add('is_form_data', function (obj) {
    return _.object_as_string(obj) === "[object FormData]";
});

/**Valida si es un String
 * @param obj
 * @returns {boolean}
 */
__b__.add('is_string', function (obj) {
    return _.object_as_string(obj) === '[object String]';
});

/**Valida si un elemento es ua funcion
 * @param obj
 * @returns {boolean}
 */
__b__.add('is_function', function (obj) {
    return _.object_as_string(obj) === '[object Function]';
});

/**Comprueba si la estring es un html
 * @param html
 * @returns {boolean}
 */
__b__.add('is_html', function (html) {
    return /(<([^>]+)>)/ig.test(html);
});

/**Comprueba si es booleano
 * @param bool
 * @returns {boolean}
 */
__b__.add('is_boolean', function (bool) {
    return this.object_as_string(bool) === '[object Boolean]';
});

/**Comprueba si es una expresion regular
 * @param regex
 * @returns {boolean}
 */
__b__.add('is_regexp', function (regex) {
    return this.object_as_string(regex) === '[object RegExp]';
});

/**Verifica si un elemento esta seteado
 * @param elm
 * @return Boolean
 */
__b__.add('is_set', function (elm) {
    return typeof elm !== 'undefined' && elm !== null && !!elm;
});

/**Valida Input
 * @param input
 * @returns {boolean}
 */
__b__.add('is_empty', function (input) {
    if (_.is_array(input)) {
        return input.length === 0;
    }

    var value = _.is_string(input)
        ? input
        : input.value;
    return (!value || value === '' || /^\s+$/.test(value))
});

/**Validar Url
 * @param url
 * @returns {boolean}
 */
__b__.add('is_url', function (url) {
    return /(http:\/\/|https:\/\/|\/\/)[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g.test(url);
});

/**Valida Correo
 * @param mail
 * @returns {boolean}
 */
__b__.add('is_mail', function (mail) {
    return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(mail);
});

/**Valida JSON
 * @param str
 * @returns {boolean}
 */
__b__.add('is_json', function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
});

/**Valida Numero
 * @param number
 * @returns {boolean}
 */
__b__.add('is_number', function (number) {
    return !isNaN(number);
});

/**Console Log con tiempo de ejecucion
 * @param msg
 */
__b__.add('warning', function (msg) {
    var date = _.get_date(false);
    console.log(date.hour + ':' + date.minutes + ':' + date.seconds + ' ' + date.meridian + ' -> ' + msg);
});

/**Console Log error con tiempo de ejecucion
 * @param msg
 */
__b__.add('error', function (msg) {
    var date = _.get_date(false);
    throw (date.hour + ':' + date.minutes + ':' + date.seconds + ' ' + date.meridian + ' -> ' + msg);
});


/**Html entities
 * @param str
 * @returns {String}
 */
__b__.add('html_entities', function (str) {
    var match = {
        '<': '&lt',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '&': '&amp;'
    };
    return _.replace(str, /<|>|&|"|'/g, match);
});

/**Truncate String
 * @param string
 * @param limit
 * @returns {String}
 */
__b__.add('truncate_string', function (string, limit) {
    return string.split(' ').slice(0, limit).join(' ');
});

/**Replace String
 * @param _string
 * @param _find
 * @param _replace
 * @para _case
 * @return String
 */
__b__.add('replace', function (_string, _find, _replace) {
    var o = _string.toString(),
        s = o.toLowerCase(),
        r = '',
        b = 0,
        i = -1,
        e = -1;


    if (!_.is_regexp(_find)) {
        _find = _find.toLowerCase();
    } else {
        _find = o.match(_find);
        i = _find.length;
        this._r_str = s;
    }

//TODO pasarlo a worker
    while (i > 0 ? i-- : ((e = s.indexOf(_find)) > -1)) {
        if (_.is_object(_find)) {
            this._r_str = _.replace(this._r_str, _find[i], _replace[_find[i]]);
        } else {
            r += o.substring(b, b + e) + _replace;
            s = s.substring(e + _find.length, s.length);
            b += e + _find.length;
        }

    }

    if (!_.is_empty(s) > 0 && i == -1) {
        r += o.substring(o.length - s.length, o.length);
    }

    if (!_.is_empty(r)) {
        this._r_str = r;
    }

    return this._r_str;
});


/**Retorna la fecha en un objeto
 * @param fecha
 * @returns {*}
 */
__b__.add('get_date', function (fecha) {
    var _fecha = new Date(),
        meridiano_,
        mes_ = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        minutos_ = _fecha.getMinutes(),
        hora_ = _fecha.getHours(),
        segundos_ = _fecha.getSeconds(),
        dia_ = _fecha.getDate();

    _fecha = _.is_set(fecha)
        ? new Date(fecha) : _fecha;

    if (_fecha === 'Invalid Date') {
        _.error(_fecha);
    }

    dia_ = dia_ < 0xA
        ? '0' + dia_ : dia_;

    meridiano_ = hora_ > 0xC
        ? 'PM' : 'AM';

    hora_ = hora_ > 0xC
        ? (hora_ - 0xC) === 0
        ? 0xC : (hora_ - 0xC) : hora_ < 0xA
        ? '0' + hora_ : hora_;

    minutos_ = minutos_ < 0xA
        ? '0' + minutos_ : minutos_;

    segundos_ = segundos_ < 0xA
        ? '0' + segundos_ : segundos_;

    return {
        day: dia_,
        month: mes_[_fecha.getMonth()],
        year: _fecha.getFullYear(),
        hour: hora_,
        minutes: minutos_,
        seconds: segundos_,
        meridian: meridiano_
    }
});

/**Retorna informacion del navegador
 * @returns (Object|null)
 */
__b__.add('get_nav', function () {
    var _regex = /(?:trident\/(?=\w.+rv:)|(?:chrome\/|firefox\/|opera\/|msie\s|safari\/))[\w.]{1,4}/,
        _matches = _navigator.match(_regex),
        _split = _.is_set(_matches) ? _matches[0].split('/') : false;

    return _split ? {
        nav: !!_split[0] ? _.replace(_split[0], 'trident', 'msie') : false,
        version: !!_split[1] ? _split[1] : false,
        platform: navigator.platform.toLocaleLowerCase()
    } : false;
});

/**Genera un id
 * @param longitud
 * @returns {string}
 */
__b__.add('get_encoded_id', function (longitud) {
    var _text = "",
        _longitud = !!longitud ? longitud : 5,
        _possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=_";

    for (var i = 0; i < _longitud; i++)
        _text += _possible.charAt(Math.floor(Math.random() * _possible.length));

    return _text;
});

/**Devuelve el tamano de un objeto
 * @param obj
 * @returns (Number|null|Boolean)
 */
__b__.add('get_object_size', function (obj) {
    try {
        return Object.keys(obj).length;
    } catch (e) {
        return false;
    }
});

/**Retorna un objeto en String
 * @param obj
 * @returns {string}
 */
__b__.add('object_as_string', function (obj) {
    return Object.prototype.toString.call(obj);
});

/** Interval Manager
 * @param callback
 * @param delay
 * @param max
 * @param orientation
 */
__b__.add('interval', function (callback, conf) {
    var _worker = new Workers;

    _worker.set('workers/Interval', function () {
        _worker.send(conf);
    });

    _worker.on('message', function (e) {
        _.callback_audit(callback, e.data);
    })
});

/**Devuelve la cookie segun el nombre
 * @param name
 * @returns {*}
 */
__b__.add('get_cookie', function (name) {
    var _mcookie = document.cookie,
        _cookie = null;
    if (!!_mcookie && _mcookie !== '') {
        var cookies = _mcookie.split(';');
        _.each(cookies, function (cookie) {
            cookie = cookie.split('=');
            var _pre = cookie[0].trim(),
                _pos = cookie[1].trim();
            if (_pre === name) {
                _cookie = _pos;
                return false;
            }
        })
    }
    return _cookie;
});

/**Limita la cantidad de elementos ingresados en un input
 * @param _event
 * @param _max_value
 * @returns {*}
 */
__b__.add('limit_box_input', function (_event, _max_value) {
    if (!_.is_object(_event) && !_event.target) {
        _.error('Event Object Needed');
    }
    var _obj = _event.target,
        _value = _obj.value.length,
        _out = _max_value - _value;

    if (
        (_out <= 0 && _event.keyCode !== 8)
        || (_value === 0 && _event.keyCode === 8)
        || _event.type == 'paste'
        ) {
        _event.preventDefault();
    }

    return _out;
});

/**Pasa Json a format URL
 * @param _object
 * @returns {string}
 */
__b__.add('parse_json_url', function (_object) {
    var _return = '',
        _size = _.is_object(_object) ? _.get_object_size(_object) : 0;

    _.each(_object, function (value, key) {
        _return += key + '=' + value;
        if (_size > 1) {
            _return += '&';
        }
    });

    return _return.lastIndexOf('&') > -1
        ? _return.slice(0, -1) : _return;
});


/**Get Script
 * @param url
 * @param callback
 */
__b__.add('get_script', function (url, callback) {
    var _script = document.createElement('script'),
        _body = document.body,
        _loaded = function () {
            /* var _nav = _.get_nav();
             if (_nav.nav.indexOf('msie') == -1 && _nav.nav.indexOf('safari') == -1)*/
            __.$(_script).remove();
            _.callback_audit(callback);
        };

    if (_.is_set(_script.readyState)) {
        _script.addEventListener('readystatechange', function () {
            if (_script.readyState == 'loaded'
                || _script.readyState == 'complete') {
                _loaded();
            }
        }, false);
    } else {
        _script.addEventListener('load', _loaded, false);
    }

    _script.src = url;
    _script.async = true;
    _body.appendChild(_script);
});

/**Simple Each
 * @param _object
 * @param callback
 * @returns {boolean}
 */
__b__.add('each', function (_object, callback) {

    if (_.is_array(_object)) {
        var i = 0,
            max = _object.length;
        for (; i < max; i++) {
            _.callback_audit(callback, _object[i], i);
        }
    } else {
        if (_.is_object(_object)) {
            var _keys = Object.keys(_object),
                _i = _keys.length;

            while (_i--) {
                _.callback_audit(callback, _object[_keys[_i]], _keys[_i]);
            }
        }
    }

    return this;
});

/**Retorna la pocision exacta de un elemento y sus caracteristicas
 * @param _dom
 * @param all
 * @returns {*}
 */
__b__.add('cartesian_plane', function (_dom, all) {
    _dom = _.is_$(_dom)
        ? __.$(_dom).object()
        : _dom;

    if (_.is_global(_dom)) {
        return {
            top: _dom.pageYOffset,
            left: _dom.pageXOffset,
            width: _dom.outerWidth,
            height: _dom.outerHeight
        }
    }

    return !!all
        ? _dom.getClientRects()
        : _dom.getBoundingClientRect();

});

/**Verifica el callback y sirve de auditor
 * @param callback
 * @returns {boolean}
 */
__b__.add('callback_audit', function (callback) {
    try {
        if (!_.is_set(callback)) {
            return false;
        }

        var _args = _.to_array(arguments);
        _args = _.filter_array(_args, function (v, i) {
            return !_.is_function(v);
        });

        callback.apply(null, _args.length > 0
            ? _args : null);

    } catch (e) {
        _.error(WARNING_BASE.ERROR.NOCALLBACK);
    }
    return true;
});

/**Elimina elementos falsos de un Array
 * @param arr

 */
__b__.add('compact_array', function (arr) {
    return _.filter_array(arr, function (i) {
        return !!i ? i : false;
    });
});

/**Elimina elementos falsos de un Array
 * @param arr
 * @param callback
 */
__b__.add('spec_array', function (arr) {
    if (!_.is_array(arr)) {
        _.error(WARNING_BASE.ERROR.NOARRAY);
    }

    return arr.length > 1
        ? arr : _.is_set(arr[0])
        ? arr[0] : null;
});


__b__.add('repeat_string', function (str, times) {
    return Array(times + 1).join(str);
});

/**Filtra Arreglos
 * @param array
 * @param filter
 * @returns {Array}
 */
__b__.add('filter_array', function (array, filter) {
    return array.filter(filter);
});

/**Busca un elemento en un arreglo
 * @param needle
 * @param haystack
 * @returns {boolean}
 */
__b__.add('in_object', function (needle, haystack) {
    var _exist = false;
    _.each(haystack, function (v, i) {
        if (_.is_object(v)) {
            _exist = _.in_object(needle, v);
            if (_exist) {
                return false;
            }
        } else {
            if (v === needle) {
                _exist = i;
                return false;
            }
        }
    });
    return _exist === 0 ? true : _exist;
});

/**Busca un elemento en un arreglo por RegExp
 * @param find
 * @param haystack
 * @returns {boolean}
 */
__b__.add('match_in_array', function (find, haystack) {
    var needle = new RegExp(haystack.join('|'), 'g');
    return needle.test(find);
});

/**Crea un arreglo unico de valores
 * @param object
 * @returns Array
 */
__b__.add('unique_array', function (array) {
    var _new = [];
    _.each(array, function (v) {
        if (!_.in_object(v, _new)) {
            _new.push(v);
        }
    });

    return _new;
});

/**Parse to Array
 * @param element
 * @returns {Array}
 */
__b__.add('to_array', function (element) {

    if (_.is_object(element)) {
        return [].slice.apply(element);
    } else {
        if (_.is_string(element)) {
            return element.split('');
        }
    }
});

/**Parse to Object
 * @param element
 * @returns {Object}
 */
__b__.add('to_object', function (element) {
    if (_.is_string(element)) {
        element = element.split('');
    }

    if (!_.is_array(element)) {
        _.error(WARNING_BASE.ERROR.NOARRAY);
    }

    return element.reduce(function (o, v, i) {
        o[i] = v;
        return o;
    }, {});


});

/**Distribute Array by index
 * @param obj
 * @param index
 * @return {Object}
 */

__b__.add('object_distribute', function (obj, index) {
    var _new = {};

    if (!_.is_object(obj[index])) {
        _new[obj[index]] = obj;
    } else {
        _.each(obj[index], function (v, i) {
            _new[v] = {};
            _.each(obj, function (r, j) {
                if (j !== index) {
                    _new[v][j].push(r[i]);
                }
            });

        });
    }

    return _new;
});


/**Get Element Index
 * @param node
 * @returns {number}
 */
__b__.add('get_element_index', function (node) {
    var i = 1,
        prop = document.body.previousElementSibling
            ? 'previousElementSibling' : 'previousSibling';
    while (node = node[prop]) {
        ++i
    }
    return i;
});

/**Extend
 * @param target
 * @param source
 * @returns {*}
 */
__b__.add('extend', function extend(target, source, overwrite) {
    if (!_.is_object(target) || !source) {
        return target;
    }

    if (_.is_function(source)) {
        source = new source;
        target = target.__proto__
    }

    _.each(source, function (v, i) {
        if (!target.hasOwnProperty(i)
            || _.is_set(overwrite)) {
            target[i] = v;
        }
    });
    return target;
});


/**Include
 * @param script
 * @param wait
 * @param callback
 * @return (Boolean|null)
 */
__b__.add('include', function include(script, wait, callback) {
    var _url = !_.is_url(script)
        ? setting.app_path + script + '.min.js'
        : script + '.min.js';
    _script = script
        .split('/')
        .pop();

    if (_.is_function(wait)) {
        callback = arguments[1];
        wait = false;
    }

    if (
        wait
        && _.is_set(scriptCalls[wait])
        && _.is_set(waitingCalls[wait])
        ) {
        if (waitingCalls[wait] !== 'done') {
            if (!waitingCalls[wait]) {
                waitingCalls[wait] = [];
            }

            waitingCalls[wait].push(function () {
                include(script, false, callback)
            });

            return false;
        }
    }


    if (scriptCalls[_script]) {
        _.callback_audit(callback);
        return false;
    }

    scriptCalls[_script] = script;
    _.get_script(_url, function (e) {
        if (!!waitingCalls[_script]) {
            if (_.is_object(waitingCalls[_script])) {
                _.each(waitingCalls[_script], function (v) {
                    v(e);
                });
                waitingCalls[_script] = 'done';
            }
        }
        _.callback_audit(callback);
    });

});

//Object Instance
var _ = (function () {
        return new __b__();
    })(),

    __ = (function () {
        return new _$_();
    })();

