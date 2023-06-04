/* SCEditor v2.1.3 | (C) 2017, Sam Clarke | sceditor.com/license */

!(function (u, e) {
  "use strict";
  var a = e.dom,
    c =
      /(^|\s)(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/watch\?v=)([^"&?\/ ]{11})(?:\&[\&_\?0-9a-z\#]+)?(\s|$)/i;
  e.plugins.autoyoutube = function () {
    this.signalPasteRaw = function (e) {
      if (!a.closest(this.currentNode(), "code") && (e.html || e.text)) {
        var t = u.createElement("div");
        e.html ? (t.innerHTML = e.html) : (t.textContent = e.text),
          (function e(t) {
            for (var o, n = t.firstChild; n; ) {
              if (3 === n.nodeType) {
                var i = n.nodeValue,
                  r = n.parentNode,
                  s = i.match(c);
                s &&
                  (r.insertBefore(
                    u.createTextNode(i.substr(0, s.index) + s[1]),
                    n
                  ),
                  r.insertBefore(
                    a.parseHTML(
                      '<iframe width="560" height="315" frameborder="0" src="https://www.youtube-nocookie.com/embed/' +
                        (o = s[2]) +
                        '" data-youtube-id="' +
                        o +
                        '" allowfullscreen></iframe>'
                    ),
                    n
                  ),
                  (n.nodeValue = s[3] + i.substr(s.index + s[0].length)));
              } else a.is(n, "code") || e(n);
              n = n.nextSibling;
            }
          })(t),
          (e.html = t.innerHTML);
      }
    };
  };
})(document, sceditor);
