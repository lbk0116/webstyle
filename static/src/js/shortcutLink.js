/**
 * Created by Administrator on 2016-09-14.
 */

//添加快捷链接
(function () {
    $("body").addClass("bg");
    $("body>div.shortcut>div.toggleBtn").click(function () {
        var divClass=$(this).parent().attr("class");
        if(divClass.indexOf("hid")>=0){
            $(this).parent().removeClass("hid");
            $("body>div.openerp_webclient_container").addClass("showShortcut");
            $("body").addClass("bg");
        }else{
            $(this).parent().addClass("hid");
            $("body>div.openerp_webclient_container").removeClass("showShortcut");
            $("body").removeClass("bg");
        }
    });
    $("body>div.openerp_webclient_container").addClass("showShortcut");
    var shortcutList= {
        "1": {
            name: "人力资源",
            positionX: -293,
            positionY: -78,
            linkUrl: "web?#page=0&amp;limit=80&amp;view_type=list&amp;model=hr.employee&amp;menu_id=189&amp;action=205"
        },
        "2": {
            name: "合同",
            positionX: -438,
            positionY: -79,
            linkUrl: "web?#page=0&amp;limit=80&amp;view_type=list&amp;model=nantian_erp.contract&amp;menu_id=738&amp;action=1085"
        }
    };
    var selfShortcutList=["1","2","1","2"];
    function startPrint(tarSelector,arr,sl) {
        $(tarSelector).html("");
        $.each(arr,function (ietm,val) {
            var $li=$('<li>'
                +'<a data-href="'+sl[val].linkUrl+'">'+
                    '<i class="icon_cygn" style="background-position: '+sl[val].positionX+'px '+sl[val].positionY+'px"></i>'+
                    '<p>'+sl[val].name+'</p>'+
                    '<s></s>'+
                '</a>'
             +'</li>');
            $(tarSelector).append($li);
        });
        $("#setCYGN1>li>a").click(function (e) {
            var e=e||event;
            e.preventDefault();
            var url=$(this).attr("data-href");
            window.open(url,"_self");
            $("body").scrollTop(300);
        });
    }
    startPrint("#setCYGN1",selfShortcutList,shortcutList);
    $("div.shortcut span.selfSet").click(function () {
        var $discover=$('<div class="discover"></div>');
        $('body').css("overflow","hidden").append($discover);
        var $dialog=$('<div class="modal" style="display: block" data-backdrop="static">'+
            '<div class="modal-dialog" style="width:740px">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<h4 class="modal-title">定制常用功能</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<p>您已选中的热门功能：</p>'+
                        '<ul id="selectedShortcut"></ul>'+
                        '<p>可选择的热门功能：</p>'+
                        '<ul id="unselectedShortcut"></ul>'+
                    '</div>'+
                    '<div class="modal-footer" style="text-align: right">'+
                        '<button type="button" class="btn btn-info">保存</button>'+
                        '<button type="button" class="btn btn-warning">退出</button> '+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>');
        $('body').append($dialog);
    });
})();
