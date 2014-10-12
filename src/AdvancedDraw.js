define([
    // dojo base
    'dojo/_base/declare',
    'dojo/_base/lang',
    //'dojo/_base/array',

    'dojo/_base/Color',
    
    // dom
    'dojo/dom-class',

    // events
    //'dojo/topic',
    'dojo/on',

    // default config
    './AdvancedDraw/modules/_defaultConfig',

    // test
    './AdvancedDraw/widget/DefaultSymbolEditors',

    // widget mixins and template
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',
    './AdvancedDraw/modules/_Init', // initialization mixin (layers, menus, etc)
    './AdvancedDraw/modules/_Draw', // draw mixin (the drawing related properties and methods including geom edit)
    'dojo/text!./AdvancedDraw/templates/AdvancedDraw.html',

    //i18n
    'dojo/i18n!./AdvancedDraw/nls/resource',

    // in template widgets and css
    'dijit/layout/StackContainer',
    'dijit/layout/TabContainer',
    'dijit/layout/ContentPane',
    'dijit/form/Button',
    'dijit/form/CheckBox',
    //'dijit/form/DropDownButton',
    'dijit/form/ComboButton',
    'dijit/form/ToggleButton',
    'xstyle/css!./AdvancedDraw/css/AdvancedDraw.css'
], function (
    declare,
    lang,
    //array,
    Color,

    domClass,

    //topic,
    on,

    _defaultConfig,

    //test
    DefaultSymbolEditors,

    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    _Init,
    _Draw,
    template,

    i18n
) {
    // the AdvancedDraw widget
    var AdvancedDraw = declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _Init, _Draw], {
        // class params
        map: null,
        config: null,
        stickyLayers: true,
        stickyPosition: 'bottom',

        // i18n
        i18n: i18n,

        //undocumented or unused
        manualLayerLoad: false, // unused - enhancement - don't _initLayers when true - add public method to init layers at devs discretion

        // widget
        templateString: template,
        baseClass: 'AdvancedDrawWidget',

        constructor: function () {
            // mixed into widget config param ==> this.config
            this.defaultConfig = _defaultConfig;

            // uncomment to inspect i18n strings
            //console.log(i18n);
        },

        postCreate: function () {
            this.inherited(arguments);
            this._initDefaultSymbolEditor();
        },

        _initDefaultSymbolEditor: function () {

            this.defaultSymbolEditors = new DefaultSymbolEditors( { symbols: this._symbols }, this.defaultSymbolEditorsNode );
            this.defaultSymbolEditors.startup();

        },

        // select a pane in the stack container
        //   simply calling or as a click evt callback will return to default pane
        _setPane: function (pane, evt) {
            this.stackNode.selectChild((evt) ? pane : this.defaultPane);
        },

        // set draw button click and label
        _setDrawButton: function (fnc, type, label) {
            console.log( type );
            this._drawButtonClickHandler.remove();
            if (type) {
                this._drawButtonClickHandler = on(this.drawButtonNode, 'click', lang.hitch(this, fnc, type, label));
            } else {
                this._drawButtonClickHandler = on(this.drawButtonNode, 'click', lang.hitch(this, fnc, label));
            }
            this.drawButtonNode.set('label', label);
            this._showDefaultSymbolEditor( type );
        },

        // temp method for snapping button
        _toggleSnapping: function (checked) {
            if (checked) {
                domClass.add(this.snappingToggleNode.iconNode, 'fa-check');
            } else {
                domClass.remove(this.snappingToggleNode.iconNode, 'fa-check');
            }
        },

        _showDefaultSymbolEditor: function ( type ) {

            switch ( type ) {

                case 'point':
                    this.defaultSymbolEditors.showSMSEditor();
                    break;
                case 'polyline':
                    this.defaultSymbolEditors.showSLSEditor();
                    break;
                case 'freehandpolyline':
                    this.defaultSymbolEditors.showSLSEditor();
                    break;
                case 'polygon':
                    this.defaultSymbolEditors.showSFSEditor();
                    break;
                case 'freehandpolygon':
                    this.defaultSymbolEditors.showSFSEditor();
                    break;
                case 'extent':
                    this.defaultSymbolEditors.showSFSEditor();
                    break;
                case 'circle':
                    this.defaultSymbolEditors.showSFSEditor();
                    break;
                default:
                    this.defaultSymbolEditors.showSMSEditor();
                    break;
            }
        }
    });

    return AdvancedDraw;
});