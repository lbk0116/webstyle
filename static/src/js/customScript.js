/**
 * Created by Administrator on 2016/8/1.
 */

$(document).ready(function () {
    //设置body的overflow为scroll和媒体查询的meta标签
    var title=$("title").html();
    //设置页签上的icon图标
    $("head>link[rel*=shortcut]").attr("href","/webstyle/static/src/img/favicon.ico");
    if(title!=="Homepage | localhost"){
        $("body").css("overflow","auto");
        var $meta=$('<meta name="viewport" content="width=device-width,initial-scale=1"/>');
        $("head").append($meta);
    }

    //侧栏的二级菜单的展开效果
    var menu_node=$(".oe_secondary_menu .oe_secondary_menu_section");
    $(".oe_secondary_menu .oe_secondary_menu_section:first-child").addClass("show");
    $(".oe_secondary_menu ul.nav").css("display","none");
    menu_node.click(function(){
        $(this).addClass("show").next("ul.nav").slideDown(200);
        $(this).siblings(".oe_secondary_menu_section").removeClass("show")
            .next("ul.nav").slideUp(200);
    });

    //侧栏收缩按钮
    var $btn=$("<div class='btn_hid'></div>");
    $btn.click(function(){
        if(this.className=="btn_hid"){
            var width=$(this).parent().css("width");
            $(this).parent().animate({"margin-left":"-"+width},200);
            this.className="btn_show";
        }else{
            $(this).parent().animate({"margin-left":"0px"},200);
            this.className="btn_hid";
        }
    });
    $(".openerp .oe_leftbar > div").append($btn);

    //搜索中高级搜索的点击事件重定义
    function red(){
        var n=0;
        var timer=setInterval(function(){
            n++;
            var $search=$(".oe_searchview_unfold_drawer");
            if($search.length==1||n>120){
                clearInterval(timer);
                $search.click(function(e){
                    $(".oe_searchview_drawer").css({"position":"relative","top":"-140px"});
                    $(".oe_searchview_drawer").animate({"top":"0"},300);
                });
            }
        },500);
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

//人力资源添加默认字段搜索
 $(document).ready(function(){
     var n=0;
     function boot(){
         n++;
         if(n>200){return;}
         var stra=$("li.active>a.oe_menu_toggler>span.oe_menu_text").html();
         if(stra){
             stra=stra.trim();
             if(stra==="人力资源"){
                addSearchKey();
             }
         }else{
             setTimeout(boot,500);
         }
     }
     setTimeout(boot,500);
     $(".oe_menu_toggler").click(function (){
         var strb=$(this).children("span.oe_menu_text").html().trim();
         if(strb==="人力资源"){
             setTimeout(boot,500);
         }
     });
     function addSearchKey(){
         var $div=$('<div class="col-md-12">'+
                 '<ul data-tag="work_age"><li>工作年限：</li><li><a href="1">1年</a></li><li><a href="2">2年</a></li><li><a href="3">3年</a></li><li><a href="4">4年</a></li><li><a href="5">5年</a></li><li><a href="6">6年</a></li><li><a href="7">7年以上</a></li></ul>'+
                 '<ul data-tag="certificate_institutions_id"><li>证书：</li><li><a href="cisco">Cisco</a></li><li><a href="华为">华为</a></li><li><a href="华三">华三</a></li><li><a href="F5">F5</a></li><li><a href="IBM">IBM</a></li></ul>'+
                 '<ul data-tag="level"><li>级别：</li><li><a href="1">1级</a></li><li><a href="2">2级</a></li><li><a href="3">3级</a></li><li><a href="4">4级</a></li><li><a href="5">5级</a></li><li><a href="6">6级</a></li></ul>'+
                 '<ul data-tag="category"><li>人员归属：</li><li><a href="在公司">在公司</a></li><li><a href="在合同中">在合同中</a></li><li><a href="赠送">赠送</a></li><li><a href="开发">开发</a></li><li><a href="其他">其他</a></li></ul>'+
                 '<ul data-tag="project_id"><li>客户：</li><li><a href="中行">中行</a></li><li><a href="建行">建行</a></li><li><a href="农行">农行</a></li><li><a href="国开">国开</a></li><li><a href="光大">光大</a></li><li><a href="农发">农发</a></li><li><a href="信达">信达</a></li></ul>'+
             '</div>');
         // var $div=$("<form><input type='submit' value='查询'></form>");
         $(".oe_searchview_drawer").append($div);
         var indexObj={};
         //{"work_age":["1","2","3","4","5","6","7"],"certificate_institutions_id":["cisco","华为","华三","F5","IBM"],"level":["1","2","3","4","5","6"],"category":["在公司","在合同中","赠送","开发","其他"],"project_id":["中行","建行","农行","国开","广大","农发","信达"]}
         function refreshData(obj,t) {
             //开始先删除相关的已选择的选项标签
             var tag={level:"Level",
                 certificate_institutions_id:"证书颁发机构或行业",
                 category:"人员所属",
                 project_id:"Project",
                 work_age:"Work age"};
             $("span.oe_facet_values>span.oe_facet_value").each(function (i,span) {
                 var html=$(span).html().trim();
                 if(html.indexOf(tag[t])===0){
                     $(this).parent("span").siblings("span.oe_facet_remove").trigger("click");
                 }
             });

             //开始根据页面上勾选的选择去自动添加查询
             var length=obj[t].length;
             for(var i=1;i<length;i++){
                 $('.oe_add_condition').trigger("click");
             }
             for(var i=0;i<length;i++){
                 $("form li:eq("+i+") .searchview_extended_prop_field").val(t);
                 $("form li:eq("+i+") .searchview_extended_prop_field").trigger("change");
                 if(t==="level"){
                     $("form li:eq("+i+") .searchview_extended_prop_op").val("=");
                     $("form li:eq("+i+") .searchview_extended_prop_value>select").val(obj[t][i]);
                 }else if(t==="certificate_institutions_id"){
                     $("form li:eq("+i+") .searchview_extended_prop_op").val("ilike");
                     $("form li:eq("+i+") .searchview_extended_prop_value>input.field_char").val(obj[t][i]);
                 }else if(t==="category"){
                     $("form li:eq("+i+") .searchview_extended_prop_op").val("=");
                     $("form li:eq("+i+") .searchview_extended_prop_value>select").val(obj[t][i]);
                 }else if(t==="project_id"){
                     $("form li:eq("+i+") .searchview_extended_prop_op").val("ilike");
                     $("form li:eq("+i+") .searchview_extended_prop_value>input.field_char").val(obj[t][i]);
                 }else if(t==="work_age"){
                     if(obj[t][i]=="7"){
                         $("form li:eq("+i+") .searchview_extended_prop_op").val(">=");
                     }else{
                         $("form li:eq("+i+") .searchview_extended_prop_op").val("=");
                     }
                     $("form li:eq("+i+") .searchview_extended_prop_value>input.field_integer").val(obj[t][i]);
                 }
             }
             if(length>0){
                 $("form button.oe_apply:first").trigger("submit");
             }
         }
         $("div.col-md-12>ul>li>a").click(function(e){
             var e=e||event;
             e.preventDefault();
             var tag=$(this).parents("ul[data-tag]").attr("data-tag");
             var value=$(this).attr("href");
             var liActive=$(this).parent().attr("class");
             if(liActive){
                 $(this).parent().removeClass("active");
                 $.each(indexObj[tag],function (i,v) {
                     if(v===value){
                         indexObj[tag].splice(i,1);
                     }
                 })
             }else{
                 $(this).parent("li").addClass("active");
                 if(!indexObj[tag]){
                     indexObj[tag]=[];
                 }
                 indexObj[tag].push(value);
             }
             // console.log(JSON.stringify(indexObj));
            refreshData(indexObj,tag);

         });
         $("div.oe_searchview_clear").click(function () {
             $("div.col-md-12>ul>li").removeClass("active");
             indexObj={};
         });
     }
 });

//滚动时固定表头
$(document).ready(function () {
    fixTableHead.init();
    $("#oe_main_menu_placeholder ul.navbar-left li a").click(function(){
        fixTableHead.init();
    });
    $("div.oe_secondary_menus_container ul.oe_secondary_submenu>li>a").click(function () {
        fixTableHead.init();
    });
});
var fixTableHead={
    top:0,
    startTop:0,
    isIE:false,
    init:function () {
        var me = this;
        setTimeout(boot, 500);
        var n = 0;
        function boot() {
            n++;
            if (n > 240) { return }
            if ($('div.oe_view_manager_body').length == 1) {
                start();
            } else {
                setTimeout(boot, 500);
            }
        }
        function start() {
            $('div.oe_view_manager_body:first').scroll(function () {
                me.startTop=$('div.oe_view_manager_body').offset().top;
                var offset = $('.oe_view_manager_view_list').offset();
                if(offset){
                    me.top=me.startTop-offset.top;
                    if(offset.top<=me.startTop){
                        $(this).find("table.oe_list_content>thead:first").css("transform","translateY("+me.top+"px)");
                    }else{
                        $(this).find("table.oe_list_content>thead:first").css("transform","translateY(0px)")
                    }
                }
            });
        }
    }
}
