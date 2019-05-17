function createCascader (options) {
    $ = jQuery;
    var settings = {
        contentBox: '',
        showLabelBox: '#showCascader',
        data: [],
        initValue: [],
        valueArr: [],
        labelArr: [],
        width: 200,
        height: 300,
        activeColor: '#409EFF',
        titleArr: []
    }

    if (options) {
        $.extend(settings, options); 
    }

    // css设置：
    $(settings.contentBox).addClass('cascader');
    $(settings.contentBox).css({
        height: settings.height + 50 + 'px'
    });
    // $(settings.showLabelBox).addClass('show-label');

    var showBox = `
        <div class="showCascader" id="showCascader">
        </div>
    `
    $(settings.contentBox).append(showBox);
    
    var addIndex = function (index, item, fatherIndex) {
        if (fatherIndex) {
            item.indexString = fatherIndex + ',' + + index;
        } else {
            item.indexString = index + '';
        }
        let fatherIndex2 = item.indexString;
        if (item.children) {
            $.each(item.children, function (index2, item2){
                addIndex(index2, item2, fatherIndex2);
            })
        }
    }
    $.each(settings.data, function (index, item){
        addIndex(index, item);
    })
    console.log(settings.data);


    var contentBoxHTML = `<div class="demo" 
        style="height:${settings.height}px;min-width: ${settings.width}px;">
        `;

    var lastHtml = '</div>';

    var initFirstBox = function (data, titleIndex) {
        if (data && data.length > 0) {
            var contentTitle = `
                <div class="header">
                    <div class="title">${settings.titleArr[titleIndex] || ''}</div>
                </div>
            `;
            var thisHtml = contentBoxHTML + contentTitle;
            $.each(data, function(index, item){
                var contentCase = `
                    <div class="case" data-value="${item.value}" data-label="${item.label}" data-index="${item.indexString}">
                        ${item.label}
                    </div>
                `;
                thisHtml += contentCase;
            })
            thisHtml += lastHtml;
            console.log(thisHtml);
            $(settings.contentBox).append(thisHtml);
            $('.case').click(function(){
                $(this).addClass('activeSelect');
                $(this).css({
                    'background-color': settings.activeColor,
                    color: '#fff'
                });
                $(this).siblings().removeClass('activeSelect');
                $(this).siblings().css({
                    'background-color': '#fff',
                    color: '#000'
                })
                $('.header').css({
                    'background-color': '#f5f7fa'
                })
                var this_index = $(this).attr('data-index');
                var indexArr = this_index.split(',');
                var nextData = settings.data;
                indexArr.forEach((item) => {
                    nextData = nextData[item].children
                });
                var boxes = $(settings.contentBox).find('.demo');
                var minNum = boxes.length - indexArr.length;
                for (minNum; minNum >0 ;minNum--) {
                    boxes = $(settings.contentBox).find('.demo');
                    boxes.eq(boxes.length - 1).remove();
                }
                initFirstBox(nextData, indexArr.length);
                var allActive = $('.activeSelect');
                settings.valueArr = [];
                settings.labelArr = [];
                var showHtml = '当前选择的是:';
                $.each(allActive, function(item, index){
                    settings.valueArr.push($(this).attr('data-value'));
                    settings.labelArr.push($(this).attr('data-label'));
                    showHtml += index === 0 ? $(this).attr('data-label') : ' > ' + $(this).attr('data-label');
                });
                $(settings.showLabelBox).html(showHtml);
            })
        }
    }
    initFirstBox(settings.data, 0);
    for(var i = 0; i < settings.initValue.length; i++){
        $($($('.demo')[i]).find('.case')[settings.initValue[i]]).triggerHandler('click');
    }
    this.data = settings;
}