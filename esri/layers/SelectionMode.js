//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "./RenderMode"], function(b, d, e, f, c) {
    return b([c], {
        declaredClass: "esri.layers._SelectionMode",
        constructor: function(a) {
            this.featureLayer = a;
            this._featureMap = {}
        },
        propertyChangeHandler: function(a) {
            this._init && 0 === a && this._applyTimeFilter()
        },
        resume: function() {
            this.propertyChangeHandler(0)
        }
    })
});