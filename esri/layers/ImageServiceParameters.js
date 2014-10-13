//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/json", "dojo/has", "../kernel", "../lang"], function(b, e, d, g, h, f) {
    b = b(null, {
        declaredClass: "esri.layers.ImageServiceParameters",
        extent: null,
        width: null,
        height: null,
        imageSpatialReference: null,
        format: null,
        interpolation: null,
        compressionQuality: null,
        bandIds: null,
        timeExtent: null,
        mosaicRule: null,
        renderingRule: null,
        noData: null,
        toJson: function(c) {
            var a = this.bbox || this.extent;
            c = (a = a && c && a._normalize(!0)) ? a.spatialReference.wkid || d.toJson(a.spatialReference.toJson()) :
                null;
            var b = this.imageSpatialReference,
                a = {
                    bbox: a ? a.xmin + "," + a.ymin + "," + a.xmax + "," + a.ymax : null,
                    bboxSR: c,
                    size: null !== this.width && null !== this.height ? this.width + "," + this.height : null,
                    imageSR: b ? b.wkid || d.toJson(b.toJson()) : c,
                    format: this.format,
                    interpolation: this.interpolation,
                    compressionQuality: this.compressionQuality,
                    bandIds: this.bandIds ? this.bandIds.join(",") : null,
                    mosaicRule: this.mosaicRule ? d.toJson(this.mosaicRule.toJson()) : null,
                    renderingRule: this.renderingRule ? d.toJson(this.renderingRule.toJson()) : null,
                    noData: this.noData,
                    noDataInterpretation: this.noDataInterpretation
                };
            c = this.timeExtent;
            a.time = c ? c.toJson().join(",") : null;
            return f.filter(a, function(a) {
                if (null !== a && void 0 !== a) return !0
            })
        }
    });
    e.mixin(b, {
        INTERPOLATION_BILINEAR: "RSP_BilinearInterpolation",
        INTERPOLATION_CUBICCONVOLUTION: "RSP_CubicConvolution",
        INTERPOLATION_MAJORITY: "RSP_Majority",
        INTERPOLATION_NEARESTNEIGHBOR: "RSP_NearestNeighbor",
        NODATA_MATCH_ALL: "esriNoDataMatchAll",
        NODATA_MATCH_ANY: "esriNoDataMatchAny"
    });
    return b
});