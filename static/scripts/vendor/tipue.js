var tipuesearch_stop_words = tipuesearch_stop_words || ["and", "be", "by", "do", "for", "he", "how", "if", "is", "it", "my", "not", "of", "or", "the", "to", "up", "what", "when"];
var tipuesearch_replace = tipuesearch_replace || {
    words: [{
        word: "tipua",
        replace_with: "tipue"
    }, {
        word: "javscript",
        replace_with: "javascript"
    }]
};
var tipuesearch_stem = tipuesearch_stem || {
    words: [{
        word: "e-mail",
        stem: "email"
    }, {
        word: "javascript",
        stem: "script"
    }, {
        word: "javascript",
        stem: "js"
    }]
};
(function(e) {
    function t(e, t, n) {
        if (!n) n = window.location.href;
        var r = new RegExp("([?&])" + e + "=.*?(&|#|$)(.*)", "gi"),
            i;
        if (r.test(n)) {
            if (typeof t !== "undefined" && t !== null) return n.replace(r, "$1" + e + "=" + t + "$2$3");
            else {
                i = n.split("#");
                n = i[0].replace(r, "$1$3").replace(/(&|\?)$/, "");
                if (typeof i[1] !== "undefined" && i[1] !== null) n += "#" + i[1];
                return n
            }
        } else {
            if (typeof t !== "undefined" && t !== null) {
                var s = n.indexOf("?") !== -1 ? "&" : "?";
                i = n.split("#");
                n = i[0] + s + e + "=" + t;
                if (typeof i[1] !== "undefined" && i[1] !== null) n += "#" + i[1];
                return n
            } else return n
        }
    }
    e.fn.tipuesearch = function(n) {
        var r = e.extend({
            show: 7,
            newWindow: false,
            showURL: true,
            minimumLength: 3,
            descriptiveWords: 25,
            highlightTerms: true,
            highlightEveryTerm: false,
            mode: "static",
            liveDescription: "*",
            liveContent: "*",
            contentLocation: "tipuesearch/tipuesearch_content.json"
        }, n);
        return this.each(function() {
            function o(e) {
                return decodeURIComponent(((new RegExp("[?|&]" + e + "=" + "([^&;]+?)(&|#|;|$)")).exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
            }

            function f(i, o, l) {
                e(document).trigger("tipue_search_started");
                e("#tipue_search_content").hide();
                var c = "";
                var h = "";
                var p = false;
                var d = false;
                var v = true;
                var m = 0;
                found = new Array;
                var g = e("#tipue_search_input").val().toLowerCase();
                g = e.trim(g);
                if (!l && window.history.pushState) {
                    var y = t("q", g);
                    y = t("page", u, y);
                    if (!a) {
                        window.history.replaceState({
                            event: "tipue",
                            query: g,
                            page: u
                        }, document.title, y)
                    } else {
                        window.history.pushState({
                            event: "tipue",
                            query: g,
                            page: u
                        }, document.title, y)
                    }
                }
                if (!a) {
                    a = true
                }
                if (g.match('^"') && g.match('"$') || g.match("^'") && g.match("'$")) {
                    v = false
                }
                if (v) {
                    var b = g.split(" ");
                    g = "";
                    for (var w = 0; w < b.length; w++) {
                        var E = true;
                        for (var S = 0; S < tipuesearch_stop_words.length; S++) {
                            if (b[w] == tipuesearch_stop_words[S]) {
                                E = false;
                                d = true
                            }
                        }
                        if (E) {
                            g = g + " " + b[w]
                        }
                    }
                    g = e.trim(g);
                    b = g.split(" ")
                } else {
                    g = g.substring(1, g.length - 1)
                } if (g.length >= r.minimumLength) {
                    if (v) {
                        if (o) {
                            var x = g;
                            for (var w = 0; w < b.length; w++) {
                                for (var S = 0; S < tipuesearch_replace.words.length; S++) {
                                    if (b[w] == tipuesearch_replace.words[S].word) {
                                        g = g.replace(b[w], tipuesearch_replace.words[S].replace_with);
                                        p = true
                                    }
                                }
                            }
                            b = g.split(" ")
                        }
                        var T = g;
                        for (var w = 0; w < b.length; w++) {
                            for (var S = 0; S < tipuesearch_stem.words.length; S++) {
                                if (b[w] == tipuesearch_stem.words[S].word) {
                                    T = T + " " + tipuesearch_stem.words[S].stem
                                }
                            }
                        }
                        b = T.split(" ");
                        for (var w = 0; w < n.pages.length; w++) {
                            var N = 1e9;
                            var C = n.pages[w].text;
                            var k = n.pages[w].title;
                            k = e("<div></div>").text(k).html();
                            C = e("<div></div>").text(C).html();
                            var L = null;
                            for (var S = 0; S < b.length; S++) {
                                var A = new RegExp(b[S], "i");
                                if (n.pages[w].title.search(A) != -1) {
                                    N -= 2e5 - w
                                }
                                if (n.pages[w].text.search(A) != -1) {
                                    N -= 15e4 - w
                                }
                                if (r.highlightTerms) {
                                    var O = new RegExp("(" + b[S] + ")", "gi");
                                    if (r.highlightEveryTerm) {
                                        var M = new RegExp("(" + b[S] + ")", "gi")
                                    } else {
                                        var M = new RegExp("(" + b[S] + ")", "i")
                                    } if (L === null) {
                                        L = 0
                                    }
                                    L += (C.match(O) || []).length;
                                    L += (k.match(O) || []).length;
                                    k = k.replace(O, '<span class="wh-search-term">$1</span>');
                                    C = C.replace(M, '<span class="wh-search-term">$1</span>')
                                }
                                if (n.pages[w].tags.search(A) != -1) {
                                    N -= 1e5 - w
                                }
                                if (b[S].match("^-")) {
                                    A = new RegExp(b[S].substring(1), "i");
                                    if (n.pages[w].title.search(A) != -1 || n.pages[w].text.search(A) != -1 || n.pages[w].tags.search(A) != -1) {
                                        N = 1e9
                                    }
                                }
                            }
                            if (N < 1e9) {
                                found[m++] = [N, k, C, n.pages[w].loc, L === null ? null : L]
                            }
                        }
                    } else {
                        var k = n.pages[w].title;
                        for (var w = 0; w < n.pages.length; w++) {
                            var N = 1e9;
                            var C = n.pages[w].text;
                            k = e("<div></div>").text(k).html();
                            C = e("<div></div>").text(C).html();
                            var A = new RegExp(g, "i");
                            if (n.pages[w].title.search(A) != -1) {
                                N -= 2e5 - w
                            }
                            if (n.pages[w].text.search(A) != -1) {
                                N -= 15e4 - w
                            }
                            var L = null;
                            if (r.highlightTerms) {
                                var O = new RegExp("(" + g + ")", "gi");
                                if (r.highlightEveryTerm) {
                                    var M = new RegExp("(" + g + ")", "gi")
                                } else {
                                    var M = new RegExp("(" + g + ")", "i")
                                } if (L === null) {
                                    L = 0
                                }
                                L += (C.match(O) || []).length;
                                L += (k.match(O) || []).length;
                                k = k.replace(O, '<span class="wh-search-term">$1</span>');
                                C = C.replace(M, '<span class="wh-search-term">$1</span>')
                            }
                            if (n.pages[w].tags.search(A) != -1) {
                                N -= 1e5 - w
                            }
                            if (N < 1e9) {
                                found[m++] = [N, k, C, n.pages[w].loc, L === null ? null : L]
                            }
                        }
                    } if (m != 0) {
                        c += '<dl class="wh-search-results">';
                        c += "<dt>";
                        if (m == 1) {
                            c += '<span class="wh-search-results-total">1 result for <span class="wh-search-term">' + g + "</span></span>"
                        } else {
                            c_c = m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            c += '<span class="wh-search-results-total">' + c_c + ' results for <span class="wh-search-term">' + g + "</span></span>"
                        } if (p == 1) {
                            c += '<span class="wh-search-instead">Search instead for <a href="javascript:void(0)" id="tipue_search_replaced">' + x + "?</span>"
                        }
                        c += "</dt>";
                        found.sort(function(e, t) {
                            if (e[0] < t[0]) {
                                return -1
                            } else if (e[0] > t[0]) {
                                return 1
                            } else {
                                if (e[4] > t[4]) {
                                    return -1
                                } else if (e[4] < t[4]) {
                                    return 1
                                } else {
                                    if (e[1] > t[1]) {
                                        return 1
                                    } else if (e[1] < t[1]) {
                                        return -1
                                    } else {
                                        if (e[2] > t[2]) {
                                            return 1
                                        } else if (e[2] < t[2]) {
                                            return -1
                                        } else {
                                            if (e[3] > t[3]) {
                                                return 1
                                            } else if (e[3] < t[3]) {
                                                return -1
                                            } else {
                                                return 0
                                            }
                                        }
                                    }
                                }
                            }
                        });
                        var _ = 0;
                        for (var w = 0; w < found.length; w++) {
                            var D = found[w];
                            var P = false;
                            if (_ >= i && _ < r.show + i) {
                                c += "<dd>";
                                c += '<a href="' + D[3] + '"' + s + ">";
                                c += "<h2>" + D[1] + "</h2>";
                                if (r.showURL) {
                                    c += '<p class="wh-search-url">' + D[3] + ' <span class="wh-search-term-in-page">(' + D[4] + " " + (D[4] === 1 ? "appearance" : "appearances") + ")</span></p>"
                                }
                                var H = D[2];
                                var B = "";
                                var j = H.split(" ");
                                if (j.length < r.descriptiveWords) {
                                    B = H
                                } else {
                                    var F = 0;
                                    for (var I = 0; I < j.length; I++) {
                                        var q = j[I];
                                        if (q.indexOf('class="wh-search-term">') !== -1) {
                                            F = I - 1;
                                            break
                                        }
                                    }
                                    F = F - r.descriptiveWords / 2;
                                    F = Math.floor(F);
                                    if (F < 0) {
                                        F = 0
                                    }
                                    if (F !== 0) {
                                        B += "&hellip;"
                                    }
                                    for (var S = F; S < F + r.descriptiveWords; S++) {
                                        if (S < j.length) {
                                            B += j[S] + " "
                                        } else {
                                            P = true
                                        }
                                    }
                                }
                                B = e.trim(B);
                                if (B.charAt(B.length - 1) != ".") {
                                    if (!P) B += "&hellip;"
                                }
                                c += '<p class="wh-search-body">' + B + "</p>";
                                c += "</a>";
                                c += "</dd>"
                            }
                            _++
                        }
                        c += "</dl>\n";
                        if (m > r.show) {
                            var R = Math.ceil(m / r.show);
                            var U = i / r.show + 1;
                            c += '<ul class="wh-search-paginate">\n';
                            if (U > 1) {
                                c += '<li><a href="javascript:void(0)" class="tipue_search_foot_box" id="' + (i - r.show) + "_" + o + '">&laquo;</a></li>\n'
                            }
                            if (U != 1) {
                                c += '<li><a href="javascript:void(0)" class="tipue_search_foot_box" id="' + 0 + "_" + o + '">' + 1 + "</a></li>\n"
                            } else {
                                c += '<li class="active"><a href="javascript:void(0)">' + U + "</a></li>\n"
                            } if (U > 4) {
                                c += '<li class="dots"><a href="">..</a></li>\n'
                            }
                            if (U > 3) {
                                c += '<li><a href="javascript:void(0)" class="tipue_search_foot_box" id="' + (U - 3) * r.show + "_" + o + '">' + (U - 2) + "</a></li>\n"
                            }
                            if (U > 2) {
                                c += '<li><a href="javascript:void(0)" class="tipue_search_foot_box" id="' + (U - 2) * r.show + "_" + o + '">' + (U - 1) + "</a></li>\n"
                            }
                            if (U !== 1 && U !== R) {
                                c += '<li class="active"><a href="javascript:void(0)">' + U + "</a></li>\n"
                            }
                            if (U < R - 1) {
                                c += '<li><a href="javascript:void(0)" class="tipue_search_foot_box" id="' + U * r.show + "_" + o + '">' + (U + 1) + "</a></li>\n"
                            }
                            if (U < R - 2) {
                                c += '<li><a href="javascript:void(0)" class="tipue_search_foot_box" id="' + (U + 1) * r.show + "_" + o + '">' + (U + 2) + "</a></li>\n"
                            }
                            if (U < R - 3) {
                                c += '<li class="dots"><a href="">..</a></li>\n'
                            }
                            if (U != R) {
                                c += '<li><a href="javascript:void(0)" class="tipue_search_foot_box" id="' + (R - 1) * r.show + "_" + o + '">' + R + "</a></li>\n"
                            } else {
                                c += '<li class="active"><a href="javascript:void(0)">' + R + "</a></li>\n"
                            } if (U != R) {
                                c += '<li><a href="javascript:void(0)" class="tipue_search_foot_box" id="' + (i + r.show) + "_" + o + '">&raquo;</a></li>\n'
                            }
                            c += "</ul>\n"
                        }
                    } else {
                        c += '<span class="wh-search-results-total">Nothing found</span>'
                    }
                } else {
                    if (d) {
                        c += '<span class="wh-search-error">Nothing found. Common words are largely ignored</span>'
                    } else {
                        c += '<span class="wh-search-error">Search too short.';
                        if (r.minimumLength == 1) {
                            c += " Should be one character or more."
                        } else {
                            c += " Should be " + r.minimumLength + " characters or more."
                        }
                        c += "</span>"
                    }
                }
                e("#tipue_search_content").html(c);
                e("#tipue_search_content").slideDown(200);
                e(document).trigger("tipue_search_finished");
                e("#tipue_search_replaced").click(function() {
                    u = 1;
                    f(0, false)
                });
                e(".tipue_search_foot_box").click(function() {
                    var t = e(this).attr("id");
                    var n = t.split("_");
                    u = n[0] / r.show + 1;
                    f(parseInt(n[0]), n[1])
                })
            }
            var n = {
                pages: []
            };
            e.ajaxSetup({
                async: false
            });
            if (r.mode == "live") {
                for (var i = 0; i < tipuesearch_pages.length; i++) {
                    e.get(tipuesearch_pages[i], "", function(t) {
                        var s = e(r.liveContent, t).text();
                        s = s.replace(/\s+/g, " ");
                        var o = e(r.liveDescription, t).text();
                        o = o.replace(/\s+/g, " ");
                        var u = t.toLowerCase().indexOf("<title>");
                        var a = t.toLowerCase().indexOf("</title>", u + 7);
                        if (u != -1 && a != -1) {
                            var f = t.slice(u + 7, a)
                        } else {
                            var f = "No title"
                        }
                        n.pages.push({
                            title: f,
                            text: o,
                            tags: s,
                            loc: tipuesearch_pages[i]
                        })
                    })
                }
            }
            if (r.mode == "json") {
                console.log("getting json");
                e.getJSON(r.contentLocation, function(t) {
                    console.log(t);
                    n = e.extend({}, t)
                })
            }
            if (r.mode == "static") {
                n = e.extend({}, tipuesearch)
            }
            var s = "";
            if (r.newWindow) {
                s = ' target="_blank"'
            }
            var u = o("page") || 1;
            var a = false;
            if (o("q")) {
                e("#tipue_search_input").val(o("q"));
                f((u - 1) * r.show, true)
            }
            e(this).keyup(function(e) {
                if (e.keyCode == "13") {
                    u = 1;
                    f(0, true)
                }
            });
            e(this).parents("form").on("submit", function(e) {
                e.preventDefault()
            });
            if (window.history.pushState) {
                window.onpopstate = function(t) {
                    var n = t.state;
                    if (n.event === "tipue") {
                        e("#tipue_search_input").val(n.query);
                        u = n.page;
                        f((n.page - 1) * r.show, true, true);
                        t.stopPropagation();
                        t.preventDefault()
                    }
                }
            }
        })
    }
})(jQuery)