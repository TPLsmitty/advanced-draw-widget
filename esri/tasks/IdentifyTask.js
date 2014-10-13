//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/has", "../kernel", "../request", "../geometry/normalizeUtils", "./Task", "./IdentifyResult"], function(b, h, l, r, s, m, n, p, q) {
    b = b(p, {
        declaredClass: "esri.tasks.IdentifyTask",
        _eventMap: {
            complete: ["results"]
        },
        constructor: function(a, f) {
            this._url.path += "/identify";
            this._handler = h.hitch(this, this._handler);
            this.gdbVersion = f && f.gdbVersion;
            this.registerConnectEvents()
        },
        __msigns: [{
            n: "execute",
            c: 3,
            a: [{
                i: 0,
                p: ["geometry"]
            }],
            e: 2
        }],
        _handler: function(a, f, b,
            d, c) {
            try {
                var e = [];
                l.forEach(a.results, function(a, b) {
                    e[b] = new q(a)
                });
                this._successHandler([e], "onComplete", b, c)
            } catch (g) {
                this._errorHandler(g, d, c)
            }
        },
        execute: function(a, b, k, d) {
            var c = d.assembly;
            a = this._encode(h.mixin({}, this._url.query, {
                f: "json"
            }, a.toJson(c && c[0])));
            var e = this._handler,
                g = this._errorHandler;
            this.gdbVersion && (a.gdbVersion = this.gdbVersion);
            return m({
                url: this._url.path,
                content: a,
                callbackParamName: "callback",
                load: function(a, c) {
                    e(a, c, b, k, d.dfd)
                },
                error: function(a) {
                    g(a, k, d.dfd)
                }
            })
        },
        onComplete: function() {}
    });
    n._createWrappers(b);
    return b
});