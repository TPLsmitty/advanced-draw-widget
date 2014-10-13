//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "../lang", "./LayerSource"], function(a, d, e, f, b, c) {
    return a(c, {
        declaredClass: "esri.layers.LayerMapSource",
        type: "mapLayer",
        toJson: function() {
            return b.fixJson({
                type: "mapLayer",
                mapLayerId: this.mapLayerId,
                gdbVersion: this.gdbVersion
            })
        }
    })
});