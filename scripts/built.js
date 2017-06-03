var callback = function(){

    var body = document.querySelector('body');
    document.addEventListener('mousemove',function(e) { slideBorders(e); });

    function slideBorders(e) {
        if (window.outerWidth <= 560) return;
        var offsetSizeY = 100;
        var offsetSizeX = 20;
        var multiplier = 8;
        var elements = document.querySelectorAll("article");
        Array.prototype.forEach.call(elements, function(el, i){
            if (el.querySelector('.moving-border') == null) return;
            var rect = el.getBoundingClientRect();
            var offset = { top: rect.top + document.body.scrollTop,
                left: rect.left + document.body.scrollLeft };
            var halfHeight = el.offsetHeight / 2;
            var halfWidth = el.offsetWidth / 2;
            var pcY = el.getAttribute('data-pcY') ? el.getAttribute('data-pcY') : 0;
            var pcX = el.getAttribute('data-pcX') ? el.getAttribute('data-pcX') : 0;
            if (e.pageY >= (offset.top - offsetSizeY + halfHeight) && e.pageY < (offset.top + halfHeight)) {
                var pcY = -(((offset.top + halfHeight) - e.pageY) / offsetSizeY * multiplier);
                el.setAttribute('data-pcY',pcY);
            } else if (e.pageY <= (offset.top + halfHeight + offsetSizeY) && e.pageY > (offset.top + halfHeight)) {
                var pcY = (e.pageY - (offset.top + halfHeight)) / offsetSizeY * multiplier;
                el.setAttribute('data-pcY',pcY);
            }
            var horizontalCatchSpace = halfWidth + offsetSizeX;
            if (e.pageX >= (offset.left - offsetSizeX) && e.pageX < (offset.left + halfWidth)) {
                var pcX = -(((offset.left + halfWidth) - e.pageX) / horizontalCatchSpace * multiplier);
                el.setAttribute('data-pcX',pcX);
            } else if (e.pageX <= (offset.left + el.offsetWidth + halfWidth + offsetSizeX) && e.pageX > (offset.left + halfWidth)) {
                var pcX = (e.pageX - (offset.left + halfWidth)) / horizontalCatchSpace * multiplier;
                el.setAttribute('data-pcX',pcX);
            }
            el.querySelector('.moving-border').style.transform = 'translate3d('+pcX+'px, '+pcY+'px, 0';

        });

    };
};

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    callback();
} else {
    document.addEventListener("DOMContentLoaded", callback);
}