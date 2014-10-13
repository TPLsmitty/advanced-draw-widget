//>>built
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/kernel", "dojo/has", "dojo/window", "dojo/Stateful", "dojo/query", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dijit/registry", "../kernel", "../lang", "../domUtils", "../geometry/Polyline", "../geometry/Polygon", "../InfoWindowBase", "../PopupBase", "dojo/i18n!../nls/jsapi", "dojo/NodeList-dom", "require", "require"], function(D, y, q, f, g, E, F, G, O, B, t, e, C, A, n, H, P, u, I, J, K, L, M, N) {
    return D([L, M, G], {
        declaredClass: "esri.dijit.Popup",
        offsetX: 3,
        offsetY: 3,
        zoomFactor: 4,
        marginLeft: 25,
        marginTop: 25,
        highlight: !0,
        pagingControls: !0,
        pagingInfo: !0,
        keepHighlightOnHide: !1,
        popupWindow: !0,
        titleInBody: !0,
        anchor: "auto",
        visibleWhenEmpty: !0,
        hideDelay: 1E3,
        location: null,
        constructor: function(a, c) {
            this.initialize();
            y.mixin(this, a);
            this.domNode = B.byId(c);
            var b = this._nls = y.mixin({}, N.widgets.popup),
                d = this.domNode;
            e.add(d, "esriPopup");
            (this._isRTL = !A.isBodyLtr()) && n.set(d, "direction", "rtl");
            t.set(d, "innerHTML", "\x3cdiv class\x3d'esriPopupWrapper' style\x3d'position: absolute;'\x3e\x3cdiv class\x3d'sizer'\x3e\x3cdiv class\x3d'titlePane'\x3e\x3cdiv class\x3d'spinner hidden' title\x3d'" +
                b.NLS_searching + "...'\x3e\x3c/div\x3e\x3cdiv class\x3d'title'\x3e\x3c/div\x3e\x3cdiv class\x3d'titleButton prev hidden' title\x3d'" + b.NLS_prevFeature + "'\x3e\x3c/div\x3e\x3cdiv class\x3d'titleButton next hidden' title\x3d'" + b.NLS_nextFeature + "'\x3e\x3c/div\x3e\x3cdiv class\x3d'titleButton maximize' title\x3d'" + b.NLS_maximize + "'\x3e\x3c/div\x3e\x3cdiv class\x3d'titleButton close' title\x3d'" + b.NLS_close + "'\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'sizer content'\x3e\x3cdiv class\x3d'contentPane'\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'sizer'\x3e\x3cdiv class\x3d'actionsPane'\x3e\x3cdiv class\x3d'actionList hidden'\x3e\x3ca title\x3d" +
                b.NLS_zoomTo + " class\x3d'action zoomTo' href\x3d'javascript:void(0);'\x3e\x3cspan\x3e" + b.NLS_zoomTo + "\x3c/span\x3e\x3c/a\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'pointer hidden'\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'outerPointer hidden'\x3e\x3c/div\x3e");
            this._sizers = g.query(".sizer", d);
            b = g.query(".titlePane", d)[0];
            B.setSelectable(b, !1);
            this._title = g.query(".title", b)[0];
            this._prevFeatureButton = g.query(".prev", b)[0];
            this._nextFeatureButton = g.query(".next", b)[0];
            this._maxButton =
                g.query(".maximize", b)[0];
            this._spinner = g.query(".spinner", b)[0];
            this._contentPane = g.query(".contentPane", d)[0];
            this._positioner = g.query(".esriPopupWrapper", d)[0];
            this._pointer = g.query(".pointer", d)[0];
            this._outerPointer = g.query(".outerPointer", d)[0];
            this._actionList = g.query(".actionsPane .actionList", d)[0];
            this._eventConnections = [f.connect(g.query(".close", b)[0], "onclick", this, this.hide), f.connect(this._prevFeatureButton, "onclick", this, this.selectPrevious), f.connect(this._nextFeatureButton, "onclick",
                this, this.selectNext), f.connect(this._maxButton, "onclick", this, this._toggleSize), f.connect(g.query(".zoomTo", this._actionList)[0], "onclick", this, this._zoomToFeature), f.connect(this, "onClearFeatures", this, this._featuresCleared), f.connect(this, "onSelectionChange", this, this._featureSelected), f.connect(this, "onDfdComplete", this, this._updateUI)];
            E("esri-touch") && (d = I.setScrollable(this._contentPane), this._eventConnections.push(d[0], d[1]));
            this._toggleVisibility(!1)
        },
        onMaximize: function() {},
        onRestore: function() {},
        setMap: function(a) {
            this.inherited(arguments);
            C.place(this.domNode, a.root);
            this.highlight && this.enableHighlight(a);
            this._maxHeight = n.get(this._contentPane, "maxHeight")
        },
        unsetMap: function() {
            this.disableHighlight(this.map);
            this.inherited(arguments)
        },
        setTitle: function(a) {
            if (this.popupWindow) {
                if (!u.isDefined(a) || "" === a) a = "\x26nbsp;";
                this.destroyDijits(this._title);
                this.place(a, this._title);
                this.isShowing && (this.startupDijits(this._title), this.reposition())
            }
        },
        setContent: function(a) {
            if (this.popupWindow) {
                if (!u.isDefined(a) ||
                    "" === a) a = "\x26nbsp;";
                this.destroyDijits(this._contentPane);
                this.place(a, this._contentPane);
                this.isShowing && (this.startupDijits(this._contentPane), this.reposition())
            }
        },
        show: function(a, c) {
            if (this.popupWindow)
                if (this._delayHide = !1, a) {
                    var b = this.map,
                        d;
                    a.spatialReference ? (this.location = a, d = b.toScreen(a)) : (this.location = b.toMap(a), d = a);
                    var p = b._getFrameWidth();
                    if (-1 !== p && (d.x %= p, 0 > d.x && (d.x += p), b.width > p))
                        for (b = (b.width - p) / 2; d.x < b;) d.x += p;
                    this._maximized ? this.restore() : this._setPosition(d);
                    c && c.closestFirst &&
                        this.showClosestFirst(this.location);
                    this.isShowing || (this._toggleVisibility(!0), this._followMap(), this.startupDijits(this._title), this.startupDijits(this._contentPane), this.reposition(), this.showHighlight(), this.onShow())
                } else this._toggleVisibility(!0)
        },
        hide: function() {
            this.isShowing && (this._toggleVisibility(!1), this._unfollowMap(), this.keepHighlightOnHide || this.hideHighlight(), this.onHide())
        },
        resize: function(a, c) {
            this.popupWindow && (this._sizers.style({
                width: a + "px"
            }), n.set(this._contentPane, "maxHeight",
                c + "px"), this._maxHeight = c, this.isShowing && this.reposition())
        },
        reposition: function() {
            this.popupWindow && this.map && (this.location && !this._maximized && this.isShowing) && this._setPosition(this.map.toScreen(this.location))
        },
        maximize: function() {
            var a = this.map;
            if (a && !this._maximized && this.popupWindow) {
                this._maximized = !0;
                var c = this._maxButton;
                e.remove(c, "maximize");
                e.add(c, "restore");
                t.set(c, "title", this._nls.NLS_restore);
                var c = this.marginLeft,
                    b = this.marginTop,
                    d = a.width - 2 * c,
                    a = a.height - 2 * b;
                n.set(this.domNode, {
                    left: this._isRTL ? null : c + "px",
                    right: this._isRTL ? c + "px" : null,
                    top: b + "px",
                    bottom: null
                });
                n.set(this._positioner, {
                    left: null,
                    right: null,
                    top: null,
                    bottom: null
                });
                this._savedWidth = n.get(this._sizers[0], "width");
                this._savedHeight = n.get(this._contentPane, "maxHeight");
                this._sizers.style({
                    width: d + "px"
                });
                n.set(this._contentPane, {
                    maxHeight: a - 65 + "px",
                    height: a - 65 + "px"
                });
                this._showPointer("");
                this._unfollowMap();
                e.add(this.domNode, "esriPopupMaximized");
                this.onMaximize()
            }
        },
        restore: function() {
            if (this.map && this._maximized &&
                this.popupWindow) {
                this._maximized = !1;
                var a = this._maxButton;
                e.remove(a, "restore");
                e.add(a, "maximize");
                t.set(a, "title", this._nls.NLS_maximize);
                n.set(this._contentPane, "height", null);
                this.resize(this._savedWidth, this._savedHeight);
                this._savedWidth = this._savedHeight = null;
                this.show(this.location);
                this._followMap();
                e.remove(this.domNode, "esriPopupMaximized");
                this.onRestore()
            }
        },
        startup: function() {},
        destroy: function() {
            this.map && this.unsetMap();
            this.cleanup();
            this.isShowing && this.hide();
            this.destroyDijits(this._title);
            this.destroyDijits(this._content);
            q.forEach(this._eventConnections, f.disconnect);
            C.destroy(this.domNode);
            this._sizers = this._contentPane = this._actionList = this._positioner = this._pointer = this._outerPointer = this._title = this._prevFeatureButton = this._nextFeatureButton = this._spinner = this._eventConnections = this._pagerScope = this._targetLocation = this._nls = this._maxButton = null
        },
        selectNext: function() {
            this.select(this.selectedIndex + 1)
        },
        selectPrevious: function() {
            this.select(this.selectedIndex - 1)
        },
        setFeatures: function() {
            this.inherited(arguments);
            this._updateUI()
        },
        postscript: null,
        _highlightSetter: function(a) {
            var c = this.highlight,
                b = this.map;
            this.highlight = a;
            if (b && a !== c)
                if (a) {
                    if (this.enableHighlight(b), a = this.features && this.features[this.selectedIndex]) this.updateHighlight(b, a), this.showHighlight()
                } else this.disableHighlight(b)
        },
        _pagingControlsSetter: function(a) {
            var c = this.pagingControls,
                b = this.map;
            this.pagingControls = a;
            b && a !== c && this._updatePagingControls()
        },
        _pagingInfoSetter: function(a) {
            var c = this.pagingInfo,
                b = this.map;
            this.pagingInfo = a;
            b &&
                (a !== c && this.features && this.features.length) && this._updatePagingInfo()
        },
        _popupWindowSetter: function(a) {
            var c = this.popupWindow,
                b = this.map;
            this.popupWindow = a;
            b && a !== c && (a ? (this._updateUI(), this._updateWindow()) : (this.hide(), this.showHighlight()))
        },
        _anchorSetter: function(a) {
            var c = this.anchor;
            this.anchor = a;
            this.map && a !== c && this.reposition()
        },
        _featuresCleared: function() {
            this.setTitle("\x26nbsp;");
            this.setContent("\x26nbsp;");
            this._setPagerCallbacks(this);
            this._updateUI();
            this.hideHighlight()
        },
        _featureSelected: function() {
            this._updateUI();
            this._updateWindow()
        },
        _updateWindow: function() {
            var a = this.selectedIndex;
            if (0 <= a) {
                var c = this.features[a].getContent(),
                    b;
                !this.titleInBody && c && y.isString(c.id) && (b = H.byId(c.id)) && (b.set && /_PopupRenderer/.test(b.declaredClass)) && b.set("showTitle", !1);
                this.setContent(c);
                this.updateHighlight(this.map, this.features[a]);
                this.showHighlight()
            }
        },
        _toggleVisibility: function(a) {
            this._setVisibility(a);
            this.isShowing = a
        },
        _setVisibility: function(a) {
            n.set(this.domNode, "visibility", a ? "visible" : "hidden");
            e.toggle(this.domNode,
                "esriPopupVisible", a)
        },
        _waitAndHide: function(a) {
            var c = this;
            this._delayHide = !0;
            setTimeout(function() {
                c._delayHide && (c._delayHide = !1, c.hide())
            }, a)
        },
        _followMap: function() {
            this._unfollowMap();
            var a = this.map;
            this._handles = [f.connect(a, "onPanStart", this, this._onPanStart), f.connect(a, "onPan", this, this._onPan), f.connect(a, "onZoomStart", this, this._onZoomStart), f.connect(a, "onExtentChange", this, this._onExtentChange)]
        },
        _unfollowMap: function() {
            var a = this._handles;
            a && (q.forEach(a, f.disconnect), this._handles = null)
        },
        _onPanStart: function() {
            var a = this.domNode.style;
            this._panOrigin = {
                left: a.left,
                top: a.top,
                right: a.right,
                bottom: a.bottom
            }
        },
        _onPan: function(a, c) {
            var b = this._panOrigin,
                d = c.x,
                p = c.y,
                e = b.left,
                h = b.top,
                r = b.right,
                b = b.bottom;
            e && (e = parseFloat(e) + d + "px");
            h && (h = parseFloat(h) + p + "px");
            r && (r = parseFloat(r) - d + "px");
            b && (b = parseFloat(b) - p + "px");
            n.set(this.domNode, {
                left: e,
                top: h,
                right: r,
                bottom: b
            })
        },
        _onZoomStart: function() {
            this._setVisibility(!1)
        },
        _onExtentChange: function(a, c, b) {
            b && (this._setVisibility(!0), this.show(this._targetLocation ||
                this.location));
            this._targetLocation = null
        },
        _toggleSize: function() {
            this._maximized ? this.restore() : this.maximize()
        },
        _setPosition: function(a) {
            var c = a.x,
                b = a.y;
            a = this.offsetX || 0;
            var d = this.offsetY || 0,
                e = 0,
                f = 0,
                h = A.position(this.map.container, !0),
                r = h.w,
                g = h.h,
                l = "Left",
                m = "bottom",
                s = A.getContentBox(this._positioner),
                q = s.w / 2,
                y = s.h / 2,
                v = n.get(this._sizers[0], "height") + this._maxHeight + n.get(this._sizers[2], "height"),
                z = v / 2,
                t = 0,
                u = 0,
                w = c,
                x = b,
                k = this.anchor.toLowerCase();
            if ("auto" === k) {
                if (k = F.getBox) k = k(), t = Math.max(k.l,
                    h.x), r = Math.min(k.l + k.w, h.x + h.w), u = Math.max(k.t, h.y), g = Math.min(k.t + k.h, h.y + h.h), w += h.x, x += h.y;
                h = x - u >= v;
                v = g - x >= v;
                k = r - w >= s.w;
                s = w - t >= s.w;
                x - u > z && g - x >= z && (k ? (m = "", l = "Left") : s && (m = "", l = "Right"));
                l && m && (w - t > q && r - w >= q) && (h ? (l = "", m = "bottom") : v && (l = "", m = "top"));
                l && m && (k && h ? (l = "Left", m = "bottom") : k && v ? (l = "Left", m = "top") : s && v ? (l = "Right", m = "top") : s && h && (l = "Right", m = "bottom"))
            } else m = l = "", -1 !== k.indexOf("top") ? m = "bottom" : -1 !== k.indexOf("bottom") && (m = "top"), -1 !== k.indexOf("left") ? l = "Right" : -1 !== k.indexOf("right") &&
                (l = "Left");
            z = m + l;
            switch (z) {
                case "top":
                case "bottom":
                    f = 14;
                    break;
                case "Left":
                case "Right":
                    e = 13;
                    break;
                case "topLeft":
                case "topRight":
                case "bottomLeft":
                case "bottomRight":
                    f = 14, e = -16
            }
            n.set(this.domNode, {
                left: c + "px",
                top: b + "px",
                right: null,
                bottom: null
            });
            c = {
                left: null,
                right: null,
                top: null,
                bottom: null
            };
            l ? c[l.toLowerCase()] = e + a + "px" : c.left = -q + "px";
            m ? c[m] = f + d + "px" : c.top = -y + "px";
            n.set(this._positioner, c);
            this._showPointer(z)
        },
        _showPointer: function(a) {
            e.remove(this._pointer, "top bottom right left topLeft topRight bottomRight bottomLeft hidden".split(" "));
            e.remove(this._outerPointer, ["right", "left", "hidden"]);
            "Right" === a || "Left" === a ? (a = a.toLowerCase(), e.add(this._outerPointer, a)) : e.add(this._pointer, a)
        },
        _setPagerCallbacks: function(a, c, b) {
            if (this.pagingControls && !(a === this && (!this._pagerScope || this._pagerScope === this)) && a !== this._pagerScope) {
                this._pagerScope = a;
                a === this && (c = this.selectPrevious, b = this.selectNext);
                var d = this._eventConnections;
                f.disconnect(d[1]);
                f.disconnect(d[2]);
                c && (d[1] = f.connect(this._prevFeatureButton, "onclick", a, c));
                b && (d[2] = f.connect(this._nextFeatureButton,
                    "onclick", a, b))
            }
        },
        _getLocation: function(a) {
            var c = this.map,
                b, d, e = 0,
                f;
            if (a = a && a.geometry) switch (a.type) {
                case "point":
                    b = a;
                    break;
                case "multipoint":
                    b = a.getPoint(0);
                    d = a.getExtent();
                    break;
                case "polyline":
                    b = a.getPoint(0, 0);
                    d = a.getExtent(); - 1 !== c._getFrameWidth() && (q.forEach(a.paths, function(a) {
                        a = (new J({
                            paths: [a, c.spatialReference]
                        })).getExtent();
                        var b = Math.abs(a.ymax - a.ymin),
                            d = Math.abs(a.xmax - a.xmin),
                            b = d > b ? d : b;
                        b > e && (e = b, f = a)
                    }), f.spatialReference = d.spatialReference, d = f);
                    break;
                case "polygon":
                    b = a.getPoint(0,
                        0), d = a.getExtent(), -1 !== c._getFrameWidth() && (q.forEach(a.rings, function(a) {
                        a = (new K({
                            rings: [a, c.spatialReference]
                        })).getExtent();
                        var b = Math.abs(a.ymax - a.ymin),
                            d = Math.abs(a.xmax - a.xmin),
                            b = d > b ? d : b;
                        b > e && (e = b, f = a)
                    }), f.spatialReference = d.spatialReference, d = f)
            }
            return [b, d]
        },
        _zoomToFeature: function(a) {
            a.preventDefault();
            var c = this.features,
                b = this.selectedIndex;
            a = this.map;
            if (c) {
                b = this._getLocation(c[b]);
                c = b[0];
                b = b[1];
                c || (c = this.location);
                if (!b || !b.intersects(this.location)) this.location = c;
                if (b) a.setExtent(b, !0);
                else {
                    var d = a.getNumLevels(),
                        b = a.getLevel(),
                        e = a.getMaxZoom(),
                        f = this.zoomFactor || 1;
                    0 < d ? b !== e && (d = b + f, d > e && (d = e), a.navigationManager._wheelZoom({
                        value: d - b,
                        mapPoint: c
                    }, !0)) : a.navigationManager._wheelZoom({
                        value: 2 * (1 / Math.pow(2, f)),
                        mapPoint: c
                    }, !0)
                }
            }
        },
        _updatePagingControls: function() {
            var a = this._prevFeatureButton,
                c = this._nextFeatureButton,
                b = this.selectedIndex,
                d = this.features ? this.features.length : 0;
            this.pagingControls && 1 < d ? (0 === b ? e.add(a, "hidden") : e.remove(a, "hidden"), b === d - 1 ? e.add(c, "hidden") : e.remove(c,
                "hidden")) : (e.add(a, "hidden"), e.add(c, "hidden"))
        },
        _updatePagingInfo: function() {
            var a = this.features ? this.features.length : 0,
                c = this._nls,
                b = "\x26nbsp;";
            this.pagingInfo && (1 < a && c.NLS_pagingInfo) && (b = u.substitute({
                index: this.selectedIndex + 1,
                total: a
            }, c.NLS_pagingInfo));
            if (a && (c = this.getSelectedFeature(), a = c.getInfoTemplate(), c = c.getTitle(), (!a || /esri\.InfoTemplate/.test(a.declaredClass) || !this.titleInBody) && c)) b = c + ("\x26nbsp;" === b ? "" : " " + b);
            this.setTitle(b)
        },
        _updateUI: function() {
            if (this.popupWindow) {
                var a =
                    this.features,
                    c = this.deferreds,
                    b = a ? a.length : 0,
                    d = this._spinner,
                    f = this._actionList,
                    g = this._nls;
                this._updatePagingControls();
                this._updatePagingInfo();
                b ? e.remove(f, "hidden") : e.add(f, "hidden");
                c && c.length ? a ? e.remove(d, "hidden") : this.setContent("\x3cdiv style\x3d'text-align: center;'\x3e" + g.NLS_searching + "...\x3c/div\x3e") : (e.add(d, "hidden"), b || (this.setContent("\x3cdiv style\x3d'text-align: center;'\x3e" + g.NLS_noInfo + ".\x3c/div\x3e"), this.visibleWhenEmpty || this._waitAndHide(this.hideDelay)))
            }
        }
    })
});