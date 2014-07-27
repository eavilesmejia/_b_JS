/**
 * Created by gmena on 07-26-14.
 */

'use strict';

//Config
if (exports) {
    exports.files = {
        js: {
            output: 'base/include/init',
            src: [
                'config/init',
                'base/__b__', // Until here basic configuration
                'lib/Form',
                'lib/Upload' // Add all the necesary scripts
            ]

        },
        templates: {
            output: '',
            src: []

        }
    }
}