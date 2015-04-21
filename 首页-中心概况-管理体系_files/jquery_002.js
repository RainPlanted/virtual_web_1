 /*
 * jquery.valign.js 0.1
 * Copyright (c) 2011 shareyue  http://www.shareyue.com/
 * Date: 2011-04-01
 * ʵ��div���ֵ��еĴ�ֱ���У��Լ�html����
 */
(function($) {
    $.fn.valign = function(options) {
        var defaults = {
            type: "center"
        };
        function attrtagname(elem) {
            if (elem.size() > 0)
                return elem.get(0).tagName;
            return "";
        };
        var options = $.extend(defaults, options);
        var fun = function(obj) {
            var parent = $(obj).parent();
            var tagName = attrtagname(parent);
            var display = parent.css("display");
            while (display != "list-item" && display.indexOf("block") < 0) {
                if ($.browser.msie && $.browser.version == "6.0") {
                    if (tagName == "DIV" || tagName == "LI")
                        break;
                }
                parent = parent.parent();
                var tagName = attrtagname(parent);
                var display = parent.css("display");
            }
            //alert(parent.attr("tagName") + parent.css("display"));

            var parentHeight = parent.height();
            if (attrtagname(parent).toLocaleUpperCase() == "BODY") {
                parentHeight = $(document).height();
            }
            //alert(parentHeight);
            //�����Լ���λ��
            if (options.type == "center") {
                $(obj).css("margin-top", (parentHeight - $(obj).height()) / 2);
            } else if (type == "bottom") {
                $(obj).css("margin-top", parentHeight - $(obj).height());
            }
        };
        this.each(function() {
            fun(this);
            if (attrtagname($(this)) == "IMG") {
                if ($(this).complete) {
                    fun(this);
                } else {
                    $(this).load(function() {
                        fun(this);
                    });
                }
            }
        });
    };
})(jQuery);
$(function(){
	$(".valign").valign();
	$(".valignbottom").valign({type:"bottom"});
	$(".imgcenters img").valign();
	$(".imgcenters img").parent().css("text-align","center");
});