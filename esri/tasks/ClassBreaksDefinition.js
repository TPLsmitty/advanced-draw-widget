//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/has", "../kernel", "./ClassificationDefinition"], function(d, c, f, g, e) {
    return d(e, {
        declaredClass: "esri.tasks.ClassBreaksDefinition",
        type: "classBreaksDef",
        classificationField: null,
        classificationMethod: null,
        breakCount: null,
        standardDeviationInterval: null,
        normalizationType: null,
        normalizationField: null,
        toJson: function() {
            var b = this.inherited(arguments),
                a;
            switch (this.classificationMethod.toLowerCase()) {
                case "natural-breaks":
                    a = "esriClassifyNaturalBreaks";
                    break;
                case "equal-interval":
                    a = "esriClassifyEqualInterval";
                    break;
                case "quantile":
                    a = "esriClassifyQuantile";
                    break;
                case "standard-deviation":
                    a = "esriClassifyStandardDeviation";
                    break;
                case "geometrical-interval":
                    a = "esriClassifyGeometricalInterval";
                    break;
                default:
                    a = this.classificationMethod
            }
            c.mixin(b, {
                type: this.type,
                classificationField: this.classificationField,
                classificationMethod: a,
                breakCount: this.breakCount
            });
            if (this.normalizationType) {
                switch (this.normalizationType.toLowerCase()) {
                    case "field":
                        a = "esriNormalizeByField";
                        break;
                    case "log":
                        a = "esriNormalizeByLog";
                        break;
                    case "percent-of-total":
                        a = "esriNormalizeByPercentOfTotal";
                        break;
                    default:
                        a = this.normalizationType
                }
                c.mixin(b, {
                    normalizationType: a
                })
            }
            this.normalizationField && c.mixin(b, {
                normalizationField: this.normalizationField
            });
            this.standardDeviationInterval && c.mixin(b, {
                standardDeviationInterval: this.standardDeviationInterval
            });
            return b
        }
    })
});