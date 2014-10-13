//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/json", "dojo/has", "../kernel", "../geometry/jsonUtils"], function(e, f, c, g, h, d) {
    return e(null, {
        declaredClass: "esri.tasks.DistanceParameters",
        geometry1: null,
        geometry2: null,
        distanceUnit: null,
        geodesic: null,
        toJson: function() {
            var a = {},
                b = this.geometry1;
            b && (a.geometry1 = c.toJson({
                geometryType: d.getJsonType(b),
                geometry: b
            }));
            if (b = this.geometry2) a.geometry2 = c.toJson({
                geometryType: d.getJsonType(b),
                geometry: b
            });
            a.sr = c.toJson(this.geometry1.spatialReference.toJson());
            this.distanceUnit && (a.distanceUnit = this.distanceUnit);
            this.geodesic && (a.geodesic = this.geodesic);
            return a
        }
    })
});