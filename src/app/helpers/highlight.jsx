import $ from "jquery";

$.fn.highlight = function(what,spanClass) {
    return this.each(function(){
        var container = this,
            content = container.innerHTML,
            pattern = new RegExp('(>[^<.]*)(' + what + ')([^<.]*)','g'),
            replaceWith = '$1<span ' + ( spanClass ? 'class="' + spanClass + '"' : '' ) + '">$2</span>$3',
            highlighted = content.replace(pattern,replaceWith);
        container.innerHTML = highlighted;
    });
};