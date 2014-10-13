define( [
            'dojo/_base/declare',
            'dojo/_base/lang',
            'dojo/_base/array',
            'dojo/_base/Color',
            'dijit/_WidgetBase',
            'dijit/_TemplatedMixin',
            'dijit/_WidgetsInTemplateMixin',
            'dijit/layout/TabContainer',
            'dijit/layout/ContentPane',
            'src/AdvancedDraw/widget/SymColorPicker',
            'src/AdvancedDraw/widget/LineStylePicker',
            'src/AdvancedDraw/widget/FillStylePicker',
            'src/AdvancedDraw/widget/MarkerStylePicker',
            'src/AdvancedDraw/widget/NumericSlider',
            'src/AdvancedDraw/widget/_ColorMixin',
            'dojo/text!./templates/SymbolEditor.html',
            'dojo/i18n!../nls/resource',
            '../modules/_defaultConfig',
            'xstyle/css!./css/SymbolEditor.css'

        ],
        function( declare,
                  lang,
                  array,
                  Color,
                  _WidgetBase,
                  _TemplatedMixin,
                  _WidgetsInTemplateMixin,
                  TabContainer,
                  ContentPane,
                  SymColorPicker,
                  LineStylePicker,
                  FillStylePicker,
                  MarkerStylePicker,
                  NumericSlider,
                  _ColorMixin,
                  template,
                  i18n,
                  defaultConfig
            ) {

            var SMSEditor = declare( [ _WidgetBase,
                                       _TemplatedMixin,
                                       _WidgetsInTemplateMixin,
                                       _ColorMixin
                                     ],
                                     {

                                         widgetsInTemplate: true,
                                         templateString: template,
                                         i18n: i18n,
                                         baseClass: 'symbolEditor',

                                         constructor: function( options ) {

                                             options = options || {};
                                             lang.mixin( this, options );
                                             this.defaultSymbol = defaultConfig.defaultPolylineSymbol;
                                             this.initialized = false;

                                         },

                                         _getDefaultSymbol: function () {

                                             var symbol = this.defaultSymbol;
                                             return symbol;

                                         },

                                         postCreate: function () {

                                             this.inherited( arguments );

                                             if ( !this.symbol ) {
                                                 this.symbol = this._getDefaultSymbol();
                                             }

                                             this._initTabContainer();
                                             this._initOutlineStylePicker();
                                             this._initOutlineColorPicker();
                                             this._initOutlineWidthSlider();

                                             this.initialized = true;

                                         },

                                         startup: function () {

                                             this.inherited( arguments );
                                             this.tabContainer.resize();

                                         },

                                         _initTabContainer: function () {

                                             this.tabContainer = new TabContainer( {
                                                    style: 'height: 100%; width: 100%;',
                                                    doLayout: false,
                                                    tabPosition: 'top'
                                             }, this.tabContainerNode );

                                             this.outlinePane = this._getContentPane( 'Line Style' );
                                             this.tabContainer.addChild( this.outlinePane );
                                             this.tabContainer.startup();
                                         },

                                         _initOutlineStylePicker: function () {

                                             this.outlineStylePicker = new LineStylePicker( {
                                                 lineStyle: this.symbol.style,
                                                 class: 'symbolEditorControl'
                                             } );

                                             this.outlineStylePicker.watch( 'lineStyle', lang.hitch( this, function ( name, oldValue, value ) {

                                                 this._updateSymbolAtt();

                                             } ) );

                                             this.outlinePane.addChild( this.outlineStylePicker );

                                         },

                                         _initOutlineColorPicker: function () {

                                             this.outlineColorPicker = new SymColorPicker( {
                                                  color: this._esriColorArrayToDojoColor( this.symbol.color ),
                                                  class: 'symbolEditorControl'
                                             } );

                                             this.outlineColorPicker.watch( 'color', lang.hitch( this, function ( name, oldValue, value ) {

                                                 this._updateSymbolAtt();

                                             } ) );

                                             this.outlinePane.addChild( this.outlineColorPicker );

                                         },

                                         _initOutlineWidthSlider: function () {

                                             this.outlineWidthSlider = new NumericSlider( {
                                                 value: this.symbol.width,
                                                 min: 1,
                                                 max: 10,
                                                 class: 'symbolEditorControl'
                                             });

                                             this.outlineWidthSlider.watch( 'value', lang.hitch( this, function ( name, oldValue, value ) {

                                                 this._updateSymbolAtt();

                                             } ) );

                                             this.outlinePane.addChild( this.outlineWidthSlider );

                                         },

                                         _getContentPane: function ( title ) {

                                             var contentPane = new ContentPane( {
                                                title: title
                                             } );

                                             return contentPane;
                                         },

                                         _updateSymbolAtt: function () {

                                             if ( !this.initialized ) {
                                                 return;
                                             }

                                             var symbol = lang.clone( this.symbol );

                                             var lineStyle = this.outlineStylePicker.get( 'lineStyle' );
                                             symbol.style = lineStyle;

                                             var lineColor = this.outlineColorPicker.get( 'color' );
                                             symbol.color = this._dojoColorToEsriColorArray( lineColor );

                                             var lineWidth = this.outlineWidthSlider.get( 'value' );
                                             symbol.width = lineWidth;

                                             this._set( 'symbol', symbol );
                                         },

                                         _setSymbolAttr: function ( value ) {

                                             if ( this.initialized ) {

                                                 this.outlineColorPicker.set( 'color', this._esriColorArrayToDojoColor( value.color ) );
                                                 this.outlineWidthSlider.set( 'value', this.symbol.width );
                                                 this.outlineStylePicker.set( 'lineStyle', this.symbol.style );

                                             }

                                             this.symbol = value;

                                         }

                                     } );

            return SMSEditor;



        }

);