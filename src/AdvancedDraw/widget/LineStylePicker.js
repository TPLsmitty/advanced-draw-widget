define( [
            'dojo/_base/declare',
            'dojo/_base/lang',
            'dojo/_base/array',
            'dijit/_WidgetBase',
            'dijit/_TemplatedMixin',
            'dijit/_WidgetsInTemplateMixin',
            'dojo/text!./templates/LineStylePicker.html',
            'dijit/form/Select',
            'xstyle/css!./css/LineStylePicker.css'

        ],
        function( declare,
                  lang,
                  array,
                  _WidgetBase,
                  _TemplatedMixin,
                  _WidgetsInTemplateMixin,
                  template
            ) {

            var LineStylePicker = declare( [ _WidgetBase,
                _TemplatedMixin,
                _WidgetsInTemplateMixin
            ],
            {

                widgetsInTemplate: true,
                templateString: template,
                fillStyle: 'esriSLSDash',

                constructor: function() {
                    //TODO implementation
                    this.set( 'lineStyle', 'esriSLSSolid' );

                },

                _setLineStyleAttr: function ( value ) {

                    this._updateSelectDijit( value );
                    this._set( 'lineStyle', value );

                },

                _updateSelectDijit: function ( value ) {

                    if ( this.selectDijit ) {
                        this.selectDijit.set( 'value', value );
                    }

                },

                _onSelectDijitChange: function( newIndex ) {

                    var value = this.selectDijit.get( 'value' );
                    this._set( 'lineStyle', value );

                }

            } );

            return LineStylePicker;

        }

);