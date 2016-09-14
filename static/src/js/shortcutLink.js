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
})()
