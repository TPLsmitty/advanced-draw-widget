define( [
            'dojo/_base/declare',
            'dojo/_base/lang',
            'dijit/_WidgetBase',
            'dijit/_TemplatedMixin',
            'dijit/_WidgetsInTemplateMixin',
            'dijit/layout/TabContainer',
            'dijit/layout/ContentPane',
            'src/AdvancedDraw/widget/SymColorPicker',
            'src/AdvancedDraw/widget/LineStylePicker',
            'src/AdvancedDraw/widget/FillStylePicker',
            'src/AdvancedDraw/widget/NumericSlider',
            'src/AdvancedDraw/widget/_ColorMixin',
            'dojo/text!./templates/SymbolEditor.html',
            'dojo/i18n!../nls/resource',
            '../modules/_defaultConfig',
            'xstyle/css!./css/SymbolEditor.css'

        ],
        function( declare,
                  lang,
                  _WidgetBase,
                  _TemplatedMixin,
                  _WidgetsInTemplateMixin,
                  TabContainer,
                  ContentPane,
                  SymColorPicker,
                  LineStylePicker,
                  FillStylePicker,
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
                                             this.defaultSymbol = defaultConfig.defaultPolygonSymbol;
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
                                             this._initFillStylePicker();
                                             this._initFillColorPicker();

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

                                             this.fillPane = this._getContentPane( 'Fill' );
                                             this.outlinePane = this._getContentPane( 'Outline' );
                                             this.tabContainer.addChild( this.fillPane );
                                             this.tabContainer.addChild( this.outlinePane );
                                             this.tabContainer.startup();
                                         },

                                         _initFillStylePicker: function () {

                                             this.fillStylePicker = new FillStylePicker( {
                                                 fillStyle: this.symbol.style,
                                                 baseClass: 'symbolEditorControl'
                                             } );

                                             this.fillStylePicker.watch( 'fillStyle', lang.hitch( this, function () {

                                                 this._updateSymbolAtt();

                                             } ) );

                                             this.fillPane.addChild( this.fillStylePicker );

                                         },

                                         _initFillColorPicker: function () {

                                             this.fillColorPicker = new SymColorPicker( {
                                                 color: this._esriColorArrayToDojoColor( this.symbol.color ),
                                                 baseClass: 'symbolEditorControl'
                                             } );

                                             this.fillColorPicker.watch( 'color', lang.hitch( this, function () {

                                                 this._updateSymbolAtt();

                                             } ) );

                                             this.fillPane.addChild( this.fillColorPicker );

                                         },

                                         _initOutlineStylePicker: function () {

                                             this.outlineStylePicker = new LineStylePicker( {
                                                 lineStyle: this.symbol.outline.style,
                                                 baseClass: 'symbolEditorControl'
                                             } );

                                             this.outlineStylePicker.watch( 'lineStyle', lang.hitch( this, function () {

                                                 this._updateSymbolAtt();

                                             } ) );

                                             this.outlinePane.addChild( this.outlineStylePicker );

                                         },

                                         _initOutlineColorPicker: function () {

                                             this.outlineColorPicker = new SymColorPicker( {
                                                  color: this._esriColorArrayToDojoColor( this.symbol.outline.color ),
                                                  baseClass: 'symbolEditorControl'
                                             } );

                                             this.outlineColorPicker.watch( 'color', lang.hitch( this, function () {

                                                 this._updateSymbolAtt();

                                             } ) );

                                             this.outlinePane.addChild( this.outlineColorPicker );

                                         },

                                         _initOutlineWidthSlider: function () {

                                             this.outlineWidthSlider = new NumericSlider( {
                                                 value: this.symbol.outline.width,
                                                 min: 1,
                                                 max: 10,
                                                 baseClass: 'symbolEditorControl'
                                             });

                                             this.outlineWidthSlider.watch( 'value', lang.hitch( this, function () {

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

                                             var symStyle = this.fillStylePicker.get( 'fillStyle' );
                                             symbol.style = symStyle;

                                             var symColor = this.fillColorPicker.get( 'color' );
                                             symbol.color = this._dojoColorToEsriColorArray( symColor );

                                             var outlineStyle = this.outlineStylePicker.get( 'lineStyle' );
                                             symbol.outline.style = outlineStyle;

                                             var outlineColor = this.outlineColorPicker.get( 'color' );
                                             symbol.outline.color = this._dojoColorToEsriColorArray( outlineColor );

                                             var outlineWidth = this.outlineWidthSlider.get( 'value' );
                                             symbol.outline.width = outlineWidth;

                                             this._set( 'symbol', symbol );
                                         },

                                         _setSymbolAttr: function ( value ) {

                                             if ( this.initialized ) {

                                                 this.fillColorPicker.set( 'value', this._esriColorArrayToDojoColor( this.symbol.color ) );
                                                 this.fillStylePicker.set( 'value', this.symbol.style );
                                                 this.outlineColorPicker.set( 'value', this._esriColorArrayToDojoColor( this.symbol.outline.color ) );
                                                 this.outlineWidthSlider.set( 'value', this.symbol.outline.width );
                                                 this.outlineStylePicker.set( 'value', this.symbol.outline.style );

                                             }

                                             this.symbol = value;

                                         }

                                     } );

            return SMSEditor;



        }

);