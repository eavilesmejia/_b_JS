/**
 * Created by gmena on 01-27-14.
 */

//QUOTE VIEW
Template.add('my_template', function (data, callback) {
    var _self = this;
    _self.get('my_template', function (template) {
        if (_.is_set(callback)) {
            _self.parse(template, data, callback);
        }
    });
});
