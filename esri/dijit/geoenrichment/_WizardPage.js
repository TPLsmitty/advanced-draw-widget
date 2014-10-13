//>>built
define(["../../declare", "dojo/string", "dojo/dom-class", "dojox/mvc/Templated", "dojo/text!./templates/_WizardPage.html", "./Grid"], function(h, k, g, l, m, b) {
    var f = {
        busy: "Wizard_Loading",
        done: "Wizard_Done",
        error: "Wizard_Error"
    };
    return h("esri.dijit.geoenrichment._WizardPage", [l], {
        buttonsNode: null,
        progressPromises: null,
        buildRendering: function() {
            var a = this.templateString;
            0 < a.length && "\ufeff" == a[0] && (a = a.substr(1));
            this.templateString = k.substitute(m, {
                content: a
            });
            this.inherited(arguments);
            this.layoutGrid.rows = [b.AUTO, b.AUTO, b.AUTO]
        },
        resize: function() {
            this.layoutGrid.resize()
        },
        _setStackingAttr: function(a) {
            switch (a) {
                case "stretch":
                    this.layoutGrid.rows[1] = b.STRETCH;
                    break;
                case "stack":
                    this.layoutGrid.rows[1] = b.STACK
            }
        },
        showProgress: function(a, d) {
            this.progressPromises || (this.progressPromises = {});
            var c;
            c = "string" == typeof d || d instanceof String ? d : Math.random().toString();
            this.progressPromises[c] && this.progressPromises[c].cancel();
            var b = a.isResolved(),
                e = this;
            b || (this.progressPromises[c] = a, a.always(function() {
                    delete e.progressPromises[c]
                }),
                this._setState("busy"));
            a.then(function() {
                (d instanceof Function ? d : e[d]).apply(e, arguments);
                b || e._setState("done")
            }, function(a) {
                "CancelError" == a.name ? b || e._setState("done") : e._setState("error", a.toString())
            })
        },
        cancelProgress: function(a) {
            (a = this.progressPromises && this.progressPromises[a]) && a.cancel()
        },
        _setState: function(a, b) {
            if (this.progressDiv) {
                this.progressDiv.innerHTML = b || "";
                for (var c in f) c == a ? g.add(this.progressDiv, f[c]) : g.remove(this.progressDiv, f[c])
            }
        },
        destroy: function() {
            if (this.progressPromises) {
                for (var a in this.progressPromises) this.progressPromises[a].cancel();
                this.progressPromises = null
            }
            this.inherited(arguments)
        }
    })
});