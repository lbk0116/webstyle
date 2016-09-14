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
            linkUrl: "/web?#page=0&amp;limit=80&amp;view_type=list&amp;model=nantian_erp.contract&amp;menu_id=738&amp;action=1085"
        }
    };
    var selfShortcutList=["1","2"];
    function startPrint(arr,sl) {
        $.each(arr,function (ietm,val) {
            var $li=$('<li>'
                +'<a href="'+sl[val].linkUrl+'">'+
                    '<i class="icon_cygn" style="background-position: '+sl[val].positionX+'px '+sl[val].positionY+'px"></i>'+
                    '<p>'+sl[val].name+'</p>'+
                '</a>'
             +'</li>');
            $("#setCYGN1").append($li);
        });
    }
    startPrint(selfShortcutList,shortcutList);
})();
