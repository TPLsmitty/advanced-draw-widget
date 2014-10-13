//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/Deferred", "dojo/_base/json", "dojo/has", "../kernel", "../request", "../deferredUtils", "../geometry/Extent", "../geometry/normalizeUtils", "./Task", "./FeatureSet"], function(l, g, p, q, m, w, x, k, r, s, t, u, n) {
    l = l(u, {
        declaredClass: "esri.tasks.QueryTask",
        _eventMap: {
            complete: ["featureSet"],
            "execute-for-count-complete": ["count"],
            "execute-for-ids-complete": ["objectIds"],
            "execute-relationship-query-complete": ["featureSets"]
        },
        constructor: function(a, f) {
            this._handler =
                g.hitch(this, this._handler);
            this._relationshipQueryHandler = g.hitch(this, this._relationshipQueryHandler);
            this._executeForIdsHandler = g.hitch(this, this._executeForIdsHandler);
            this._countHandler = g.hitch(this, this._countHandler);
            this._extentHandler = g.hitch(this, this._extentHandler);
            this.source = f && f.source;
            this.gdbVersion = f && f.gdbVersion;
            this.registerConnectEvents()
        },
        __msigns: [{
            n: "execute",
            c: 4,
            a: [{
                i: 0,
                p: ["geometry"]
            }],
            e: 2
        }, {
            n: "executeForIds",
            c: 3,
            a: [{
                i: 0,
                p: ["geometry"]
            }],
            e: 2
        }, {
            n: "executeForCount",
            c: 3,
            a: [{
                i: 0,
                p: ["geometry"]
            }],
            e: 2
        }, {
            n: "executeForExtent",
            c: 3,
            a: [{
                i: 0,
                p: ["geometry"]
            }],
            e: 2
        }],
        onComplete: function() {},
        onExecuteRelationshipQueryComplete: function() {},
        onExecuteForIdsComplete: function() {},
        onExecuteForCountComplete: function() {},
        onExecuteForExtentComplete: function() {},
        execute: function(a, f, e, c, b) {
            var d = b.assembly;
            a = this._encode(g.mixin({}, this._url.query, {
                f: "json"
            }, a.toJson(d && d[0])));
            var h = this._handler,
                v = this._errorHandler;
            this.source && (d = {
                source: this.source.toJson()
            }, a.layer = m.toJson(d));
            this.gdbVersion &&
                (a.gdbVersion = this.gdbVersion);
            return k({
                url: this._url.path + "/query",
                content: a,
                callbackParamName: "callback",
                load: function(a, d) {
                    h(a, d, f, e, b.dfd)
                },
                error: function(a) {
                    v(a, e, b.dfd)
                },
                callbackSuffix: c
            }, this.requestOptions)
        },
        executeRelationshipQuery: function(a, f, e) {
            a = this._encode(g.mixin({}, this._url.query, {
                f: "json"
            }, a.toJson()));
            var c = this._relationshipQueryHandler,
                b = this._errorHandler;
            this.gdbVersion && (a.gdbVersion = this.gdbVersion);
            var d = new q(r._dfdCanceller);
            d._pendingDfd = k({
                url: this._url.path + "/queryRelatedRecords",
                content: a,
                callbackParamName: "callback",
                load: function(a, b) {
                    c(a, b, f, e, d)
                },
                error: function(a) {
                    b(a, e, d)
                }
            }, this.requestOptions);
            return d
        },
        executeForIds: function(a, f, e, c) {
            var b = c.assembly;
            a = this._encode(g.mixin({}, this._url.query, {
                f: "json",
                returnIdsOnly: !0
            }, a.toJson(b && b[0])));
            var d = this._executeForIdsHandler,
                h = this._errorHandler;
            this.source && (b = {
                source: this.source.toJson()
            }, a.layer = m.toJson(b));
            this.gdbVersion && (a.gdbVersion = this.gdbVersion);
            return k({
                url: this._url.path + "/query",
                content: a,
                callbackParamName: "callback",
                load: function(a, b) {
                    d(a, b, f, e, c.dfd)
                },
                error: function(a) {
                    h(a, e, c.dfd)
                }
            }, this.requestOptions)
        },
        executeForCount: function(a, f, e, c) {
            var b = c.assembly;
            a = this._encode(g.mixin({}, this._url.query, {
                f: "json",
                returnIdsOnly: !0,
                returnCountOnly: !0
            }, a.toJson(b && b[0])));
            var d = this._countHandler,
                h = this._errorHandler;
            this.source && (b = {
                source: this.source.toJson()
            }, a.layer = m.toJson(b));
            this.gdbVersion && (a.gdbVersion = this.gdbVersion);
            return k({
                url: this._url.path + "/query",
                content: a,
                callbackParamName: "callback",
                load: function(a,
                    b) {
                    d(a, b, f, e, c.dfd)
                },
                error: function(a) {
                    h(a, e, c.dfd)
                }
            }, this.requestOptions)
        },
        executeForExtent: function(a, f, e, c) {
            var b = c.assembly;
            a = this._encode(g.mixin({}, this._url.query, {
                f: "json",
                returnExtentOnly: !0,
                returnCountOnly: !0
            }, a.toJson(b && b[0])));
            var d = this._extentHandler,
                h = this._errorHandler;
            this.source && (b = {
                source: this.source.toJson()
            }, a.layer = m.toJson(b));
            this.gdbVersion && (a.gdbVersion = this.gdbVersion);
            return k({
                url: this._url.path + "/query",
                content: a,
                callbackParamName: "callback",
                load: function(a, b) {
                    d(a,
                        b, f, e, c.dfd)
                },
                error: function(a) {
                    h(a, e, c.dfd)
                }
            }, this.requestOptions)
        },
        _handler: function(a, f, e, c, b) {
            try {
                var d = new n(a);
                this._successHandler([d], "onComplete", e, b)
            } catch (h) {
                this._errorHandler(h, c, b)
            }
        },
        _relationshipQueryHandler: function(a, f, e, c, b) {
            try {
                var d = a.geometryType,
                    h = a.spatialReference,
                    g = {};
                p.forEach(a.relatedRecordGroups, function(a) {
                    var b = {};
                    b.geometryType = d;
                    b.spatialReference = h;
                    b.features = a.relatedRecords;
                    b = new n(b);
                    if (null != a.objectId) g[a.objectId] = b;
                    else
                        for (var c in a) a.hasOwnProperty(c) &&
                            "relatedRecords" !== c && (g[a[c]] = b)
                });
                this._successHandler([g], "onExecuteRelationshipQueryComplete", e, b)
            } catch (k) {
                this._errorHandler(k, c, b)
            }
        },
        _executeForIdsHandler: function(a, f, e, c, b) {
            try {
                this._successHandler([a.objectIds], "onExecuteForIdsComplete", e, b)
            } catch (d) {
                this._errorHandler(d, c, b)
            }
        },
        _countHandler: function(a, f, e, c, b) {
            try {
                var d, g = a.features,
                    k = a.objectIds;
                if (k) d = k.length;
                else {
                    if (g) throw Error("Unable to perform query. Please check your parameters.");
                    d = a.count
                }
                this._successHandler([d], "onExecuteForCountComplete",
                    e, b)
            } catch (l) {
                this._errorHandler(l, c, b)
            }
        },
        _extentHandler: function(a, f, e, c, b) {
            try {
                a.extent && (a.extent = new s(a.extent)), this._successHandler([a], "onExecuteForExtentComplete", e, b)
            } catch (d) {
                this._errorHandler(d, c, b)
            }
        }
    });
    t._createWrappers(l);
    return l
});