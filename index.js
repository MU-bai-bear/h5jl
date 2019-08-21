
   window.onload = function() {
    new bbin_music(document.getElementById('bbin_music'), 'Live.mp3');
    var pag = document.getElementsByClassName('pag');
    var pagC = pag.length;
    for (var i = 0; i < pagC; i++) {
        var p = pag[i];
        p.addEventListener('touchstart', touchstart, false);
        p.addEventListener('touchmove', touchmove, false);
        p.addEventListener('touchend', touchend, false);
    }
    var x, y, dx, dy, n;

    function touchstart(event) {
        n = this.id.substring(1);
        y = event.touches[0].clientY;
        dy = 0;
    }

    function touchmove(event) {
        dy = event.touches[0].clientY - y;
        if (n == 1 && dy > 0) {
            return;
        } else if (n == pagC && dy < 0) {
            return
        }
        this.style.top = dy + 'px';
    }

    function touchend(event) {
        if (dy < -95) {
            if (n == pagC) {
                return;
            }
            this.style.transition = 'top .5s';
            this.style.top = '-100%'
            setTimeout(next, 500)
        } else if (dy > 95) {
            if (n == 1) {
                return;
            }
            this.style.transition = 'top .5s';
            this.style.top = '100%'
            setTimeout(last, 500)
        } else {
            this.style.top = '0%'
        }
    }

    function last() {
        var p = document.getElementById('p' + n);
        p.style.display = "none"
        p.style.top = '0%';
        p.style.transition = 'top 0s';
        var lp = document.getElementById('p' + --n);
        lp.style.display = "block"
    }

    function next() {
        var p = document.getElementById('p' + n);
        p.style.display = "none"
        p.style.top = '0%';
        p.style.transition = 'top 0s';
        var np = document.getElementById('p' + ++n);
        np.style.display = "block"
    }
}

function bbin_music($dom, $src) {
    this.dom = $dom;
    this.music_src = $src;
    this.init();
    this.render();
    this.bind();
}
bbin_music.prototype.init = function() {}
bbin_music.prototype.render = function() {
    this.dom.setAttribute('class', 'bbin_music play');
    this.dom.innerHTML = '<div><audio id="bbin_audio" autoplay="true"><source src="' + this.music_src + '" type="audio/mpeg"></audio></div>'
}
bbin_music.prototype.bind = function() {
    var dom = this.dom;
    var audio = document.getElementById('bbin_audio');
    this.dom.addEventListener('touchstart', function() {
        if (audio.paused) {
            audio.play();
            dom.setAttribute('class', 'bbin_music play');
        } else {
            audio.pause();
            dom.setAttribute('class', 'bbin_music');
        }
    }, false);
}
