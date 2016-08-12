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
        },1800);
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
//侧栏收缩按钮
$(document).ready(function(){
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
});
//人力资源添加默认字段搜索
 $(document).ready(function(){
     setTimeout(function(){
         var stra=$("li.active>a.oe_menu_toggler>span.oe_menu_text").html().trim();
         if(stra==="人力资源"){
            addSearchKey();
         }
     },2500);

     $(".oe_menu_toggler").click(function (){
         var strb=$(this).children("span.oe_menu_text").html().trim();
         if(strb==="人力资源"){
             setTimeout(function(){
                addSearchKey();
             },2500)
         }
     });
     function addSearchKey(){
         var $div=$('<div class="col-md-12">'+
                 '<ul data-tag="work_age"><li>工作年限：</li><li><a href="1">1年</a></li><li><a href="2">2年</a></li><li><a href="3">3年</a></li><li><a href="4">4年</a></li><li><a href="5">5年</a></li><li><a href="6">6年</a></li><li><a href="7">7年以上</a></li></ul>'+
                 '<ul data-tag="certificate_institutions_id"><li>证书：</li><li><a href="cisco">Cisco</a></li><li><a href="华为">华为</a></li><li><a href="华三">华三</a></li><li><a href="F5">F5</a></li><li><a href="IBM">IBM</a></li></ul>'+
                 '<ul data-tag="level"><li>级别：</li><li><a href="1">1级</a></li><li><a href="2">2级</a></li><li><a href="3">3级</a></li><li><a href="4">4级</a></li><li><a href="5">5级</a></li><li><a href="6">6级</a></li></ul>'+
                 '<ul data-tag="category"><li>人员归属：</li><li><a href="在公司">在公司</a></li><li><a href="在合同中">在合同中</a></li><li><a href="赠送">赠送</a></li><li><a href="开发">开发</a></li><li><a href="其他">其他</a></li></ul>'+
                 '<ul data-tag="project_id"><li>客户：</li><li><a href="中行">中行</a></li><li><a href="建行">建行</a></li><li><a href="农行">农行</a></li><li><a href="国开">国开</a></li><li><a href="广大">广大</a></li><li><a href="农发">农发</a></li><li><a href="信达">信达</a></li></ul>'+
             '</div>');
         // var $div=$("<form><input type='submit' value='查询'></form>");
         $(".oe_searchview_drawer").append($div);
         var indexObj={};
         $("div.col-md-12>ul>li>a").click(function(e){
             var e=e||event;
             e.preventDefault();
             //定义删除已选项字段函数
             function removeSelect(index) {
                 $(".oe_searchview_facets div:eq("+index+")>span.oe_facet_remove").trigger("click");
                 $.each(indexObj,function (i,v) {
                     if(v>index){
                         indexObj[i]=v-2;
                     }
                 });
             }
             var liActive=$(this).parent().attr("class");
             if(liActive){
                 $(this).parent().removeClass("active");
                 var tag=$(this).parents("ul[data-tag]").attr("data-tag");
                 removeSelect(indexObj[tag]);
                 indexObj[tag]=undefined;
             }else{
                 $(this).parent("li").addClass("active").siblings("li").removeClass("active");
                 var tag=$(this).parents("ul[data-tag]").attr("data-tag");
                 // $("form .searchview_extended_prop_field").append($("<option value='"+tag+"'>"+tag+"</option>"));
                 $("form .searchview_extended_prop_field").val(tag);
                 $("form .searchview_extended_prop_field").trigger("change");
                 if(tag==="level"){
                     if(indexObj.level){
                         removeSelect(indexObj.level);
                     }
                     $("form .searchview_extended_prop_op").val("=");
                     var level=$(this).attr("href");
                     $("form .searchview_extended_prop_value>select").val(level);
                     $("form button.oe_apply:first").trigger("submit");
                     var divNum=$(".oe_searchview_facets div").length;
                     indexObj.level=divNum-2;
                 }else if(tag==="certificate_institutions_id"){
                    if(indexObj.certificate_institutions_id){
                        removeSelect(indexObj.certificate_institutions_id);
                    }
                     $("form .searchview_extended_prop_op").val("ilike");
                     var value=$(this).attr("href");
                     $("form .searchview_extended_prop_value>input.field_char").val(value);
                     $("form button.oe_apply:first").trigger("submit");
                     var divNum=$(".oe_searchview_facets div").length;
                     indexObj.certificate_institutions_id=divNum-2;
                 }else if(tag==="category"){
                    if(indexObj.category){
                        removeSelect(indexObj.category);
                    }
                     $("form .searchview_extended_prop_op").val("=");
                     var value=$(this).attr("href");
                     $("form .searchview_extended_prop_value>select").val(value);
                     $("form button.oe_apply:first").trigger("submit");
                     var divNum=$(".oe_searchview_facets div").length;
                     indexObj.category=divNum-2;
                 }else if(tag==="project_id"){
                    if(indexObj.project_id){
                        removeSelect(indexObj.project_id);
                    }
                     $("form .searchview_extended_prop_op").val("ilike");
                     var value=$(this).attr("href");
                     $("form .searchview_extended_prop_value>input.field_char").val(value);
                     $("form button.oe_apply:first").trigger("submit");
                     var divNum=$(".oe_searchview_facets div").length;
                     indexObj.project_id=divNum-2;
                 }else if(tag==="work_age"){
                    if(indexObj.work_age){
                        removeSelect(indexObj.work_age);
                    }
                     $("form .searchview_extended_prop_op").val("=");
                     var value=$(this).attr("href");
                     if(value=="7"){
                         $("form .searchview_extended_prop_op").val(">=");
                     }
                     $("form .searchview_extended_prop_value>input.field_integer").val(value);
                     $("form button.oe_apply:first").trigger("submit");
                     var divNum=$(".oe_searchview_facets div").length;
                     indexObj.work_age=divNum-2;
                 }
             }
         });
         $("div.oe_searchview_clear").click(function () {
             $("div.col-md-12>ul>li").removeClass("active");
             indexObj={};
         });
     }
 });

// //固定表头脚本
// $(document).ready(function () {
//     setTimeout(function () {
//         fixedHeader();
//         console.log($("a.oe_vm_switch_list"))
//         $("a.oe_vm_switch_list").click(function () {
//             fixedHeader();
//             console.log(123)
//         });
//     },5000)
//     function fixedHeader() {
//              var n=0;//记录复选框的点击次数
//             var $div = $("<div class='fixedHead'></div>");
//             var $table=$("<table></table>");
//             $table.append($("table.oe_list_content>thead").clone(true));
//             $div.append($table);
//             $("div.oe_view_manager_wrapper>div").append($div);
//             $.each($("tr.oe_list_header_columns:first>th"),function (i,v) {
//                 var width=parseInt($(v).css("width"));
//                 console.log(width);
//                 var cloneDate=$("tr.oe_list_header_columns:last>th")[i];
//                 $(cloneDate).attr("width",width-12);
//             });
//             $(".fixedHead input.oe_list_record_selector").click(function(){
//                 if(n===0){
//                     n=1;
//                     for(var i=0;i<2;i++){
//                         $("div.oe_list input.oe_list_record_selector").trigger("click");
//                     }
//                 }else{
//                     $("div.oe_list input.oe_list_record_selector").trigger("click");
//                 }
//             });
//     }
// });
