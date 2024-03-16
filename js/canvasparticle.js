window.onload = function() {
    var n = layui.jquery;
    var a = document.getElementById("canvas");
    var e = a.getContext("2d");
    t();
    window.onresize = t;

    function t() {
        a.height = n("#canvas").parent(".site-banner").height();
        a.width = n("#canvas").parent(".site-banner").width()
    }
    var i = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(n) {
            window.setTimeout(n, 1e3 / 60)
        }
    }();
    var o = {
        x: null,
        y: null,
        max: 2e4
    };
    window.onmousemove = function(n) {
        n = n || window.event;
        o.x = n.clientX;
        o.y = n.clientY
    };
    window.onmouseout = function(n) {
        o.x = null;
        o.y = null
    };
    var r = [];
    for (var u = 0; u < 200; u++) {
        var m = Math.random() * a.width;
        var l = Math.random() * a.height;
        var w = Math.random() * 2 - 1;
        var d = Math.random() * 2 - 1;
        r.push({
            x: m,
            y: l,
            xa: w,
            ya: d,
            max: 5e3
        })
    }
    setTimeout(function() {
        x()
    }, 100);

    function x() {
        e.clearRect(0, 0, a.width, a.height);
        var n = [o].concat(r);
        r.forEach(function(t) {
            t.x += t.xa;
            t.y += t.ya;
            t.xa *= t.x > a.width || t.x < 0 ? -1 : 1;
            t.ya *= t.y > a.height || t.y < 0 ? -1 : 1;
            e.fillStyle = "#fff";
            e.fillRect(t.x - .5, t.y - .5, 1, 1);
            for (var i = 0; i < n.length; i++) {
                var r = n[i];
                if (t === r || r.x === null || r.y === null) continue;
                var u = t.x - r.x;
                var m = t.y - r.y;
                var l = u * u + m * m;
                var w;
                if (l < r.max) {
                    if (r === o && l > r.max / 2) {
                        t.x -= u * .03;
                        t.y -= m * .03
                    }
                    w = (r.max - l) / r.max;
                    e.beginPath();
                    e.lineWidth = w / 2;
                    e.strokeStyle = "rgba(15,255,255," + (w + .2) + ")";
                    e.moveTo(t.x, t.y);
                    e.lineTo(r.x, r.y);
                    e.stroke()
                }
            }
            n.splice(n.indexOf(t), 1)
        });
        i(x)
    }
};