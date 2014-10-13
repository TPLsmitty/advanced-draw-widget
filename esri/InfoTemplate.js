//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "./kernel", "./lang"], function(b, c, e, f, d) {
    return b(null, {
        declaredClass: "esri.InfoTemplate",
        constructor: function(a, b) {
            a && c.isObject(a) && !c.isFunction(a) ? c.mixin(this, a) : (this.title = a || "${*}", this.content = b || "${*}")
        },
        setTitle: function(a) {
            this.title = a;
            return this
        },
        setContent: function(a) {
            this.content = a;
            return this
        },
        toJson: function() {
            return d.fixJson({
                title: this.title,
                content: this.content
            })
        }
    })
});