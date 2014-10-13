//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/connect", "dojo/_base/array", "dojo/has", "dojo/dom", "dojo/dom-class", "dojo/dom-construct", "dijit/Menu", "dijit/MenuItem", "dijit/form/Button", "dijit/form/ComboButton", "../tasks/PrintTask", "../tasks/PrintParameters", "../kernel", "../domUtils", "../Evented", "dojo/i18n!../nls/jsapi"], function(k, d, l, m, x, n, f, g, p, q, r, s, t, u, y, h, v, w) {
    return k([v], {
        declaredClass: "esri.dijit.Print",
        _eventMap: {
            "print-complete": ["result"],
            error: !0,
            "print-start": !0
        },
        onPrintComplete: function() {},
        onError: function() {},
        onPrintStart: function() {},
        constructor: function(a, b) {
            a = a || {};
            this.url = a.url;
            this.async = a.async;
            this.map = a.map;
            this.templates = a.templates;
            this.extraParams = a.extraParameters;
            var c = w.widgets.print;
            this._printText = c.NLS_print;
            this._printingText = c.NLS_printing;
            this._printoutText = c.NLS_printout;
            this.templates || (this.templates = [{
                label: this._printText,
                format: "PNG32",
                layout: "MAP_ONLY",
                exportOptions: {
                    width: 800,
                    height: 1100,
                    dpi: 96
                }
            }]);
            this.printDomNode = g.create("div");
            f.add(this.printDomNode, "esriPrint");
            b = n.byId(b);
            b.appendChild(this.printDomNode)
        },
        startup: function() {
            this._createPrintButton()
        },
        destroy: function() {
            this.map = null;
            g.destroy(this.printDomNode)
        },
        hide: function() {
            h.hide(this.printDomNode)
        },
        show: function() {
            h.show(this.printDomNode)
        },
        printMap: function(a) {
            this.onPrintStart();
            this._printButton.setAttribute("label", this._printingText);
            this._printButton.setAttribute("disabled", !0);
            var b = this.map,
                c = new t(this.url, {
                    async: this.async
                }),
                e = new u;
            e.map = b;
            e.template = a;
            e.extraParameters = this.extraParams;
            c.execute(e,
                d.hitch(this, this._printComplete), d.hitch(this, this._printError))
        },
        _createPrintButton: function() {
            var a = this.templates;
            if (1 === a.length) this._printButton = new r({
                label: this._printText,
                onClick: d.hitch(this, function() {
                    this.printMap(a[0])
                })
            }), this.printDomNode.appendChild(this._printButton.domNode);
            else {
                this._printButton = new s({
                    label: this._printText,
                    onClick: d.hitch(this, function() {
                        this.printMap(a[0])
                    })
                });
                this.printDomNode.appendChild(this._printButton.domNode);
                var b = new p({
                    style: "display: none;"
                });
                m.forEach(a,
                    function(a) {
                        var e = new q({
                            label: a.label,
                            onClick: d.hitch(this, function() {
                                this.printMap(a)
                            })
                        });
                        b.addChild(e)
                    }, this);
                this._printButton.setAttribute("dropDown", b)
            }
            f.add(this._printButton.domNode, "esriPrintButton")
        },
        _printComplete: function(a) {
            this.onPrintComplete(a);
            var b = window.location.host.split("."),
                b = 1 < b.length ? b[b.length - 2] + "." + b[b.length - 1] : window.location.host,
                c = a.url.split("://")[1].split("/")[0].split("."),
                c = 1 < c.length ? c[c.length - 2] + "." + c[c.length - 1] : a.url.split("://")[1].split("/")[0];
            b.toLowerCase() ===
                c.toLowerCase() ? (window.open(a.url), this._removeAllChildren(this.printDomNode), this._createPrintButton()) : (this._printButton.domNode.style.display = "none", a = g.create("a", {
                    href: a.url,
                    target: "_blank",
                    innerHTML: this._printoutText
                }), l.connect(a, "onclick", d.hitch(this, this._hyperlinkClick)), this._removeAllChildren(this.printDomNode), f.add(a, "esriPrintout"), this.printDomNode.appendChild(a))
        },
        _printError: function(a) {
            this._removeAllChildren(this.printDomNode);
            this._createPrintButton();
            console.error(a);
            this.onError(a)
        },
        _hyperlinkClick: function() {
            this._removeAllChildren(this.printDomNode);
            this._createPrintButton()
        },
        _removeAllChildren: function(a) {
            for (; a.hasChildNodes();) a.removeChild(a.lastChild)
        }
    })
});