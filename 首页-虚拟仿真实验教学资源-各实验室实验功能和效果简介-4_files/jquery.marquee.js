/**
* @classDescription 模拟Marquee，无间断滚动内容
* @author Aken Li(www.kxbd.com)
* @DOM
*       <div id="marquee">
*           <ul>
*                <li></li>
*                <li></li>
*           </ul>
*       </div>
* @CSS
*       #marquee {width:200px;height:50px;overflow:hidden;}
* @Usage
*       $('#marquee').marquee(options);
* @options
*     isEqual:true,//所有滚动的元素长宽是否相等,true,false
*       loop: 0,//循环滚动次数，0时无限
*     direction: 'left',//滚动方向，'left','right','up','down'
*     scrollAmount:1,//步长
*     scrollDelay:20//时长
*/
(function($){

     $.fn.marquee = function(options){
         var opts = $.extend({},$.fn.marquee.defaults, options);
        
         return this.each(function(){
             var $marquee = $(this);//滚动元素容器
             var _scrollObj = $marquee.get(0);//滚动元素容器DOM
             var scrollW = $marquee.width();//滚动元素容器的宽度
             var scrollH = $marquee.height();//滚动元素容器的高度
             var $element = $marquee.children(); //滚动元素
             var $kids = $element.children();//滚动子元素
             var scrollSize=0;//滚动元素尺寸
             var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//滚动类型，1左右，0上下
            
             //防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
             $element.css(_type?'width':'height',10000);
             //获取滚动元素的尺寸
             if (opts.isEqual) {
                 scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
             }else{
                 $kids.each(function(){
                     scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
                 });
             }
             //滚动元素总尺寸小于容器尺寸，不滚动
             if (scrollSize<(_type?scrollW:scrollH)) return; 
             //克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
             $element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
            
             var numMoved = 0;
             function scrollFunc(){
                 var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
                 if (opts.loop > 0) {
                     numMoved+=opts.scrollAmount;
                     if(numMoved>scrollSize*opts.loop){
                         _scrollObj[_dir] = 0;
                         return clearInterval(moveId);
                     } 
                 }
                 if(opts.direction == 'left' || opts.direction == 'up'){
                     _scrollObj[_dir] +=opts.scrollAmount;
                     if(_scrollObj[_dir]>=scrollSize){
                         _scrollObj[_dir] = 0;
                     }
                 }else{
                     _scrollObj[_dir] -=opts.scrollAmount;
                     if(_scrollObj[_dir]<=0){
                         _scrollObj[_dir] = scrollSize;
                     }
                 }
             }
             //滚动开始
             var moveId = setInterval(scrollFunc, opts.scrollDelay);
             //鼠标划过停止滚动
             $marquee.hover(
                 function(){
                     clearInterval(moveId);
                 },
                 function(){
                     clearInterval(moveId);
                     moveId = setInterval(scrollFunc, opts.scrollDelay);
                 }
             );
            
         });
     };
     $.fn.marquee.defaults = {
         isEqual:true,//所有滚动的元素长宽是否相等,true,false
         loop: 0,//循环滚动次数，0时无限
         direction: 'left',//滚动方向，'left','right','up','down'
         scrollAmount:1,//步长
         scrollDelay:20//时长

     };
     $.fn.marquee.setDefaults = function(settings) {
         $.extend( $.fn.marquee.defaults, settings );
     };
})(jQuery);
$(function(){
	$(".marquee").each(function(){
		var dir = $(this).attr("direction");
		if(dir=='undefined' || dir =="")
			dir = 'left';
		$(this).marquee({
			isEqual:true,//所有滚动的元素长宽是否相等,true,false
			loop: 0,//循环滚动次数，0时无限
			direction: dir,//滚动方向，'left','right','up','down'
			scrollAmount:1,//步长
			scrollDelay:20//时长
		});
	});
});
