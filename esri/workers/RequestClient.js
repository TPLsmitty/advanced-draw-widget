//>>built
define(["../sniff", "../kernel", "dojo/_base/declare", "dojo/Deferred", "dojo/_base/lang", "dojo/_base/xhr", "../config", "./WorkerClient"], function(q, r, k, s, t, l, g, m) {
    function n(a, b) {
        var c = new e;
        c.addWorkerCallback(a, b);
        f.unshift({
            id: b ? a + "::" + b : a,
            client: c
        });
        f.length > h && f.pop().client.terminate();
        return c
    }
    var e = k([m], {
            declaredClass: "esri.workers.RequestClient",
            constructor: function() {
                this.setWorker(["./mutableWorker", "./requestWorker"])
            },
            get: function(a) {
                return this._send("GET", a)
            },
            post: function(a) {
                return this._send("POST",
                    a)
            },
            _send: function(a, b) {
                var c = l._ioSetArgs(b);
                c.xhr = null;
                var d = c.ioArgs,
                    e = d.url;
                delete d.url;
                delete d.args;
                this.postMessage({
                    method: a,
                    url: e,
                    options: d
                }).then(this._getSuccessHandler(c), this._getErrorHandler(c), this._getProgressHandler(c));
                return c
            },
            _addHeaderFunctions: function(a) {
                a.getResponseHeader = function(b) {
                    var c, d = a.headers;
                    Object.keys(d).forEach(function(a) {
                        if (a.toLowerCase() == b.toLowerCase()) return c = d[a], !1
                    });
                    return c
                };
                a.getAllResponseHeaders = function() {
                    var b = [],
                        c = a.headers;
                    Object.keys(c).forEach(function(a) {
                        b.push(a +
                            ": " + c[a])
                    });
                    return b = b.join("\n")
                };
                return a
            },
            _getSuccessHandler: function(a) {
                var b = this,
                    c = a.ioArgs;
                return function(d) {
                    a.xhr = b._addHeaderFunctions(d);
                    d = a.xhr.getResponseHeader("content-type");
                    if (("xml" == c.handleAs || -1 < d.indexOf("xml")) && "string" == typeof a.xhr.response) a.xhr.response = (new DOMParser).parseFromString(a.xhr.response, "text/xml");
                    a.resolve(a.xhr.response, a.xhr)
                }
            },
            _getErrorHandler: function(a) {
                return function(b) {
                    a.reject(b)
                }
            },
            _getProgressHandler: function(a) {
                return function(b) {
                    a.progress(b)
                }
            }
        }),
        f = [],
        h = g.defaults.io.maxRequestWorkers,
        p = new e;
    e.getClient = function(a, b) {
        if (a) {
            var c;
            f.some(function(d) {
                if (d.id == (b ? a + "::" + b : a)) c = d.client;
                return !0
            });
            return c || n(a, b)
        }
        return p
    };
    e.setLimit = function(a) {
        h = g.defaults.io.maxRequestWorkers = a
    };
    return e
});