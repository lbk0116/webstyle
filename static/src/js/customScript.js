/**
 * Created by Administrator on 2016/8/1.
 */
$(document).ready(function(){
    //设置body的overflow为scroll和媒体查询的meta标签
    var title=$("title").html();
    if(title!=="Homepage | localhost"){
        $("body").css("overflow","auto");
        var $meta=$('<meta name="viewport" content="width=device-width,initial-scale=1"/>');
        $("head").append($meta);
    }
});
//二级菜单样式的点击事件
$(document).ready(function () {
    //搜索中高级搜索的点击事件重定义
    function red(){
        setTimeout(function(){
            var $search=$(".oe_searchview_unfold_drawer");
            $search.click(function(e){
                $(".oe_searchview_drawer").css({"position":"relative","top":"-140px"});
                $(".oe_searchview_drawer").animate({"top":"0"},300);
            });
        },1600);
    }
    red();
    $("#oe_main_menu_placeholder ul.navbar-left li a").click(function(){
        $(".oe_secondary_menu .oe_secondary_menu_section:first-child").addClass("show");
        $(".oe_secondary_menu .oe_secondary_menu_section:first-child")
            .siblings(".oe_secondary_menu_section").removeClass("show")
            .next("ul.nav").css("display","none");
        red();
    });
});
//侧栏的二级菜单的展开效果
$(document).ready(function(){
    var menu_node=$(".oe_secondary_menu .oe_secondary_menu_section");
    $(".oe_secondary_menu .oe_secondary_menu_section:first-child").addClass("show");
    $(".oe_secondary_menu ul.nav").css("display","none");
    menu_node.click(function(){
        $(this).addClass("show").next("ul.nav").slideDown(200);
        $(this).siblings(".oe_secondary_menu_section").removeClass("show")
            .next("ul.nav").slideUp(200);
    });
});

