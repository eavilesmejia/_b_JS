/**
 * Created by gmena on 01-27-14.
 */

//QUOTE VIEW
Template.add('quote_page', function (data, callback) {
    var _self = this;
    _self.get('quote_page', function (template) {
        if (_.is_set(callback)) {
            _self.parse(template, data, callback);
        }
    });
});

//ROUNDTRIP BOX
Template.add('roundtrip_box', function (data, callback) {
    var _self = this;
    _self.get('roundtrip_box', function (template) {
        if (_.is_set(callback)) {
            _self.parse(template, data, callback);
        }
    });
});


Template.add('header_relevance', function (data, callback) {
    var _self = this;
    _self.get('header_relevance', function (template) {
        if (_.is_set(callback)) {
            _self.parse(template, data, callback);
        }
    });
});

//ROUNDTRIP BOX
Template.add('roundtrip_box', function (data, callback) {
    var _self = this;
    _self.get('roundtrip_box', function (template) {
        if (_.is_set(callback)) {
            _self.parse(template, data, callback);
        }
    });
});


//ROUTE LIST
Template.add('route_list', function (data, callback) {
    var _self = this;
    if (_.is_empty(data)) {
        _.callback_audit(callback, '<tr class="routes_list"><td colspan="3" class="before_select_routes">No routes on the selected date <i class="icon-quote"></i></td></tr>')
    } else {
        _self.get('route_list', function (template) {
            if (_.is_set(callback)) {
                _self.parse(template, {'routes': data}, callback);
            }
        });
    }
});

//TRAVEL INFO
Template.add('report_travel_info', function (data, callback) {
    var _self = this;
    _self.get('report_travel_info', function (template) {
        if (_.is_set(callback)) {
            _self.parse(template, data, callback);
        }
    });

});

//REPORT TRAVEL
Template.add('report_travel_quote', function (data, callback) {
    var _self = this;
    _self.get('report_travel_quote', function (template) {
        if (_.is_set(callback)) {
            _self.parse(template, data, callback);
        }
    });

});

//LOGIN OR REGISTER
Template.add('login_or_register', function (callback) {
    this.get('login_or_register', callback, true);
});

//LOADER
Template.add('loader_box', function (data, callback) {
    var _self = this;
    _self.get('loader_box', function (template) {
        if (_.is_set(callback)) {
            _self.parse(template, data, callback);
        }
    });
});

//REGISTER FORM
Template.add('register_account', function (data, callback) {
    var _self = this;
    _self.get('register_account', function (template) {
        if (_.is_set(callback)) {
            _self.parse(template, data, callback);
        }
    });

});
