//ui-search 定义
$.fn.UiSearch=function(){
	var ui=$(this);
	$('.ui-search-selected').on('click',function(){
		$('.ui-search-selected-list').show();
		return false;
	});
	$('.ui-search-selected-list a ').on('click',function(){
		$('.ui-search-selected').text($(this).text())
		$('.ui-search-selected-list').hide();
		return false;
	});
	$('body').on('click',function(){
		$('.ui-search-selected-list').hide();

	})
}
//ui-tab 
/**
*@parm {string} header TAB组件的选显卡切换部分的className ，里面有若干个。item
*@parm {string} content TAB组件的内容区域，里面有若干个。item
*@parm {string} ffocus  tab组件中背景颜色的改变。

**/
$.fn.UiTab=function(header,content,focus){
	var ui=$(this);
	var tabs=$(header);
	var cons=$(content);
	
	tabs.on('click',function(){
		var index=$(this).index();
		tabs.removeClass(focus).eq(index).addClass(focus); 
		cons.hide().eq(index).show();
		
		return false;
	})
}
//ui-backTop
$.fn.UiBackTop=function(){
	var ui = $(this);
	var el = $('<a href="#0" class="ui-backTop"></a>');
	ui.append(el);


	$(window).on('scroll',function(){
		var top = $('body').scrollTop();
		if (top > $(window).height() ) {
			el.show();
		}else{
			el.hide();
		}
	}); 
	el.on('click',function(){
		
		$(window).scrollTop(0);
	
	});
}
//ui-slidder
//1. 左右箭头需要控制翻页
//2翻页的时候，进度的点，需要联动；
//3.翻页到第三页的时候下一页回到第一页，同理翻到第一页时候，回到
//4.进度点，在点击的时候需要切换到对应的页面，
//5、没有点击的时候需要进行自动播放；
//6、滚动过程中屏蔽其他操作（自动滚动，左右翻页，进度点击）
//7、高级无缝滚动；
$.fn.UiSlider=function(){
	var ui=$(this);

	var items = $('.ui-slider-wrap >.item',ui);
	var btn_prev= $('.ui-slider-arrow >.left',ui);
	var btn_next= $('.ui-slider-arrow >.right',ui);
	var tips=$('.ui-slider-process .item',ui);
	var wrap=$('.ui-slider-wrap',ui);
	//预定义
	var current = 0;
	var size = items.size();

	var width = items.eq(0).width();
	var enableAutO=true;
	//设置自动感应滚动（当鼠标在slider中使 ，不要动）
	ui.on('mouseover',function(){
		enableAutO=false;
		

	});
	ui.on('mouseout',function(){
		enableAutO=true;

	});
	//具体操作
	wrap.on('move_prev',function(){
		if(current<=0){
			current=size;
		};

		current=current-1;
		wrap.triggerHandler('move_to',current);
		
	});
	wrap.on('move_next',function(){
		if(current>= size-1){
			 current=-1;
		}

		current = current+1;
		wrap.triggerHandler('move_to',current);
		
	});
	wrap.on('move_to',function(evt,index){
		wrap.css('left',width*index*-1);
		tips.removeClass('item_focus').eq(index).addClass('item_focus');
	});
	wrap.on('auto_move',function(){
		
		setInterval( function(){
			enableAutO && wrap.triggerHandler('move_next');
		},2000);
	});
	wrap.triggerHandler('auto_move');
	//事件
	btn_prev.on('click',function(){
		
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	});
	tips.on('click',function(){
		var index = $(this).index();
		wrap.triggerHandler('move_to',index);
		//wrap.css('left',width*index*(-1));
	});
}

//页面脚本逻辑
$(function(){
	$('.ui-search').UiSearch();
	$('.content-tab').UiTab('.caption > .item','.block > .item','item_focus');
	$('.item').UiTab('.block-caption > .block-caption-item','.block-content > .block-content-item','block-caption-item_focus');
	$('body').UiBackTop();

	$('.ui-slider').UiSlider();
});

