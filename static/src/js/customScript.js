/**
 * Created by Administrator on 2016/8/1.
 */

//一个全局对象用来固定表头和判断当前页面所处的菜单位置
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
                        $('.oe_view_manager_body:first>div>div.oe_list>table.oe_list_content>thead:first').css("transform","translateY("+me.top+"px)");
                    }else{
                        $('.oe_view_manager_body:first>div>div.oe_list>table.oe_list_content>thead:first').css("transform","translateY(0px)");
                    }
                }
            });
        }
    },
    menuPosition:function () {
        var obj={m1:null,m2:null,m3:null};
        obj.m1=$("ul.navbar-left>li.active>a>span.oe_menu_text");
        if(obj.m1.length>0){
            obj.m1=obj.m1.html().trim();
        }
        obj.m2=$("div.oe_secondary_menus_container>div.oe_secondary_menu>ul li.active>a>span.oe_menu_text");
        if(obj.m2.length>0){
            obj.m2=obj.m2.html().trim();
        }
        obj.m3=$("ul.oe_view_manager_switch>li.active>a.oe_vm_switch_form").attr("data-view-type");
        return obj;
    }
}

$(document).ready(function () {
    //设置body的overflow为scroll和媒体查询的meta标签
    var title=$("title").html();
    //设置页签上的icon图标
    if($("head>link[rel*=shortcut]").length){
        $("head>link[rel*=shortcut]").attr("href","/webstyle/static/src/img/favicon.ico");
    }else{
        $("head").append('<link rel="shortcut icon" href="/webstyle/static/src/img/favicon.ico" type="image/x-icon">');
    }
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
        $(this).toggleClass("show").next("ul.nav").slideToggle(200);
        $(this).siblings(".oe_secondary_menu_section").removeClass("show")
            .next("ul.nav").slideUp(200);
    });

    //侧栏收缩按钮
    var $btn=$("<div class='btn_hid' title='点击此处隐藏侧栏！'></div>");
    $btn.click(function(){
        if(this.className=="btn_hid"){
            var width=$(this).parent().css("width");
            $(this).parent().animate({"margin-left":"-"+width},150);
            this.className="btn_show";
            this.title="点击此处显示侧栏！";
        }else{
            $(this).parent().animate({"margin-left":"0px"},150);
            this.className="btn_hid";
            this.title="点击此处隐藏侧栏！";
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
                    $(".oe_searchview_drawer").animate({"top":"0"},200);
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
    $("body").on("click","ul.oe_secondary_submenu>li",function () {
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
     $("body").on("click","ul.oe_secondary_submenu>li",function () {
         var tarText=$(this).find("a>span.oe_menu_text").html().trim();
         if(tarText=="员工"){
            setTimeout(boot,500);
         }
     });
     function addSearchKey(){
         var $div=$('<div class="col-md-12">'+
                 '<ul data-tag="certificate_institutions_id"><li><span class="oe_i">w</span>证书</li><li><a href="cisco">Cisco</a></li><li><a href="华为">华为</a></li><li><a href="华三">华三</a></li><li><a href="F5">F5</a></li><li><a href="IBM">IBM</a></li></ul>'+
                 '<ul data-tag="level"><li><span class="oe_i">w</span>级别</li><li><a href="1">1级</a></li><li><a href="2">2级</a></li><li><a href="3">3级</a></li><li><a href="4">4级</a></li><li><a href="5">5级</a></li><li><a href="6">6级</a></li></ul>'+
                 '<ul data-tag="project_id"><li><span class="oe_i">w</span>工作组</li><li><a href="中行">中行</a></li><li><a href="建行">建行</a></li><li><a href="农行">农行</a></li><li><a href="国开">国开</a></li><li><a href="光大">光大</a></li><li><a href="农发">农发</a></li><li><a href="信达">信达</a></li></ul>'+
                 '<ul data-tag="work_age"><li><span class="oe_i">w</span>工作年限</li><li><a href="1">1年</a></li><li><a href="2">2年</a></li><li><a href="3">3年</a></li><li><a href="4">4年</a></li><li><a href="5">5年</a></li><li><a href="6">6年</a></li><li><a href="7">7年以上</a></li></ul>'+
                 '<ul data-tag="category"><li><span class="oe_i">w</span>人员状态</li><li><a href="公司储备">公司储备</a></li><li><a href="合同在岗">合同在岗</a></li><li><a href="合同备岗">合同备岗</a></li><li><a href="合同赠送">合同赠送</a></li><li><a href="公司项目">公司项目</a></li></ul>'+
             '</div>');
         // var $div=$("<form><input type='submit' value='查询'></form>");
         $(".oe_searchview_drawer").append($div);
         var indexObj={};
         //{"work_age":["1","2","3","4","5","6","7"],"certificate_institutions_id":["cisco","华为","华三","F5","IBM"],"level":["1","2","3","4","5","6"],"category":["在公司","在合同中","赠送","开发","其他"],"project_id":["中行","建行","农行","国开","广大","农发","信达"]}
         function refreshData(obj,t) {
             //开始先删除相关的已选择的选项标签
             var tag={level:"Level",
                 certificate_institutions_id:"证书颁发机构或行业",
                 category:"人员状态",
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

//js生成使用流程页面
$(document).ready(function(){
    var n=0;
    var timer=setInterval(function () {
        n++;
        if(n>240){
            clearInterval(timer);
            return;
        }
        var $last=$("div.oe_im_content");
        if($last.length===1){
            clearInterval(timer);
            init();
        }
    },500)
    function init() {
        var projectId;
        $("ul.navbar-nav.navbar-left>li>a>span").each(function (i,v) {
            if($(v).html().trim()==="人力资源"||$(v).html().trim()==="Human Resources"){
                $(v).parents("li").attr('data-name','hr');
            }else if($(v).html().trim()==="项目"||$(v).html().trim()==="Project"){
                $(v).parents("li").attr('data-name','project');
                projectId=$(v).parent("a").attr("data-menu");
            }
        });
        $(".oe_secondary_menu[data-menu-parent="+projectId+"] a.oe_menu_leaf span").each(function (i,v) {
            if($(v).html().trim()==="合同"||$(v).html().trim()==="nantian_contract"){
                $(v).parents("li").attr('data-name','contract');
            }else if($(v).html().trim()==="服务客户"||$(v).html().trim()==="partner"){
                $(v).parents("li").attr('data-name','partner');
            }else if($(v).html().trim()==="工作组"||$(v).html().trim()==="Products"){
                $(v).parents("li").attr('data-name','wordGroup');
            }
        });
        if(!localStorage.isLoaded){
           popBox();
        }
    }
    function popBox() {
        var $discover=$('<div class="discover"></div>');
        $('body').append($discover);
        var $dialog=$('<div class="modal" style="display: block" data-backdrop="static">'+
            '<div class="modal-dialog">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<h4 class="modal-title">温馨提醒:</h4>'+
                    '</div>'+
                    '<div class="modal-body">'+
                        '<p>感谢您使用我们的系统，如果您是第一次登陆，可点击 <a href="#">此处使用向导</a>来帮助您完成操作，如果是已经知道如何操作，点击我知道了按钮退出向导！</p>'+
                    '</div>'+
                    '<div class="modal-footer" style="text-align: right">'+
                        '<button type="button" class="btn btn-info">以后再说！</button>'+
                        '<button type="button" class="btn btn-warning">我知道了，不必再提醒了！</button> '+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>');
        $('body').append($dialog);
        $dialog.find("div.modal-body a").click(function (e) {
           var e=e||event;
           e.preventDefault();
           statr();
       });
       $dialog.find("div.modal-footer>.btn-info").click(dismiss);
       $dialog.find("div.modal-footer>.btn-warning").click(function () {
           localStorage.isLoaded=true;
           dismiss();
       });
        function dismiss() {
           $dialog.slideUp('normal',function () {
               $dialog.remove();
           });
           $discover.fadeOut('normal',function () {
               $discover.remove();
           });
        }
        function statr() {
            $dialog.find("h4.modal-title").html("请选择模块名称");
            $dialog.find("div.modal-body").html(
                "<button class='btn btn-success' style='margin:5px 10px' data-click='hr'>人力资源</button>"+
                "<button class='btn btn-success' style='margin:5px 10px' data-click='work-group'>工作组</button>"+
                "<button class='btn btn-success' style='margin:5px 10px' data-click='contract'>合同</button>"+
                "<button class='btn btn-success' style='margin:5px 10px' data-click='partner'>服务客户</button>"
            );
            $("button[data-click]").click(function () {
                var dc=$(this).attr("data-click");
                if(dc=="hr"){
                    showIllustrate(hrList,0);
                    dismiss();
                }else if(dc=="work-group"){
                    showIllustrate(projectList,0);
                    dismiss();
                }else if(dc=="contract"){
                    showIllustrate(contractList,0);
                    dismiss();
                }else if(dc=="partner"){
                    showIllustrate(partnerList,0);
                    dismiss();
                }
            });
        }
        //用来保存hr点击的路径
        var hrList=[
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"li[data-name=hr]>a",html:"点击此处 切换到人力资源视图!",imgDir:false},
            {x:0,y:0,needTrigger:false,needScroll:["",0],tar:"ul.nav>li.active>a.oe_menu_leaf>span.oe_menu_text",html:"点击此处 查看员工信息!",imgDir:false},
            {x:0,y:0,needTrigger:false,needScroll:["",0],tar:"div.oe_searchview_unfold_drawer[title]",html:"点击此处 进行高级搜索和过滤!",imgDir:true},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"table.oe_list_content tr[data-id]:first",html:"点击此处 查看个人和团队信息!",imgDir:false},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:".oe_view_manager_buttons button.oe_form_button_edit",html:"点击此处 编辑个人信息!",imgDir:false},
            {x:0,y:0,needTrigger:true,needScroll:["div.oe_view_manager_body:first",200],tar:"ul.oe_notebook>li:nth-child(2)>a.ui-tabs-anchor",html:"点击此处 编辑团队信息!",imgDir:false},
            {x:0,y:0,needTrigger:false,needScroll:["div.oe_view_manager_body:first",600],tar:".oe_form_label:eq(26)",html:"点击此处 编辑工作组归属!",imgDir:false},
            null,
            null,
        ];
        //用来保存工作组点击的路径
        var projectList=[
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"li[data-name=project]>a",html:"点击此处 切换到项目视图!",imgDir:false},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"li[data-name=wordGroup]>a",html:"点击此处 修改和查看工作组信息!",imgDir:false},
            {x:0,y:0,needTrigger:false,needScroll:["",0],tar:"div.oe_searchview_unfold_drawer[title]",html:"点击此处 进行高级搜索和过滤!",imgDir:true},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"table.oe_list_content tr[data-id]:first",html:"点击此处 查看工作组详细信息!",imgDir:false},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:".oe_view_manager_buttons button.oe_form_button_edit",html:"点击此处 编辑工作组信息!",imgDir:false},
            null,
            null,
        ];
        //用来保存客户点击的路径
        var partnerList=[
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"li[data-name=project]>a",html:"点击此处 切换到项目视图!",imgDir:false},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"li[data-name=partner]>a",html:"点击我，查看和修改客户信息!",imgDir:false},
            {x:0,y:0,needTrigger:false,needScroll:["",0],tar:"div.oe_searchview_unfold_drawer[title]",html:"点击此处 进行高级搜索和过滤!",imgDir:true},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"table.oe_list_content tr[data-id]:first",html:"点击此处 查看服务客户信息!",imgDir:false},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:".oe_view_manager_buttons button.oe_form_button_edit",html:"点击此处 编辑服务客户信息!",imgDir:false},
            null,
            null,
        ];
        //用来保存合同点击的路径
        var contractList=[
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"li[data-name=project]>a",html:"点击此处 切换到项目视图!",imgDir:false},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"li[data-name=contract]>a",html:"点击我，查看和修改合同信息!",imgDir:false},
            {x:0,y:0,needTrigger:false,needScroll:["",0],tar:"div.oe_searchview_unfold_drawer[title]",html:"点击此处 进行高级搜索和过滤!",imgDir:true},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:"table.oe_list_content tr[data-id]:first",html:"点击此处 查看合同详细信息!",imgDir:false},
            {x:0,y:0,needTrigger:true,needScroll:["",0],tar:".oe_view_manager_buttons button.oe_form_button_edit",html:"点击此处 编辑合同信息!",imgDir:false},
            null,
            null,
        ];

        function showIllustrate(obj,n) {
            var that=arguments.callee;
            var l=obj.length;
            //打印流程元素
            obj[l-2]=$('<div class="discover1"></div>');
            $('body').append(obj[l-2]);
            var sel=obj[n].needScroll[0];
            if(sel){
                $(sel).scrollTop(obj[n].needScroll[1]);
            }
            var num=0;
            var timer=setInterval(function () {
                var p=$(obj[n].tar).offset();
                num++;
                if(p){
                    clearInterval(timer);
                    obj[l-1]=$('<div class="tip"></div>');
                    obj[l-1].css("background","url('/webstyle/static/src/img/guideL.png') no-repeat");
                    obj[n].x=p.left+$(obj[n].tar).width()/2;
                    if(obj[n].imgDir){
                        obj[n].x-=177;
                        obj[l-1].css("background","url('/webstyle/static/src/img/guideR.png') no-repeat");
                    }
                    obj[n].y=p.top+$(obj[n].tar).height();
                    obj[l-1].html(obj[n].html);
                    obj[l-1].css({
                        "left":obj[n].x+"px",
                        "top":obj[n].y+"px"
                    });
                    $('body').append(obj[l-1]);
                    //添加元素点击事件
                    obj[l-1].click(function (e) {
                        obj[l-2].remove();
                        obj[l-1].remove();
                        if(obj[n].needTrigger){
                            $(obj[n].tar).trigger("click");
                        }
                        if(n===(l-3)){return;}
                        that(obj,n+1);
                    });
                }else if(num>15){
                    clearInterval(timer);
                    obj[l-1]=$('<div class="modal" style="display: block" data-backdrop="static">'+
                        '<div class="modal-dialog">'+
                            '<div class="modal-content">'+
                                '<div class="modal-header">'+
                                    '<h4 class="modal-title">提示:</h4>'+
                                '</div>'+
                                '<div class="modal-body">'+
                                    '<p>您没有相关操作权限，请点击退出按钮退出向导！</p>'+
                                '</div>'+
                                '<div class="modal-footer" style="text-align: right">'+
                                    '<button type="button" class="btn btn-warning">退出</button> '+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>');
                    $('body').append(obj[l-1]);
                    obj[l-1].find("button.btn").click(function () {
                        obj[l-2].remove();
                        obj[l-1].remove();
                    });
                }
            },100);
        }
    }
});

//添加提示工具
$(document).ready(function () {
    var tipList={
        "项目":{
            "合同":{
                "合同约定人数":"只读：通过合同岗位动态计算得出！",
                "现场人数":"只读：根据人员状态动态计算得出！",
                "人员要求":"合同内规定的对人员相关要求！",
                "资源要求":"合同内规定的对资源相关要求！",
                "单价(人/时间)":"此处为税前单价(注:只能填写数字,不需要其他特殊符号)！",
                "实际收款金额":"请根据实际收款情况填写，一旦该字段不为0，则收款状态变为“已收款”！",
				"税率":"6%:人力外包;<br/>17%:设备维保;"
            }
        },
        "人力资源":{
            "员工":{
                "所在工作组":"必须先关联该字段，才能匹配人员状态、合同、合同岗位等字段！"
            }
        }
    }
    var $tipSelf=$("<div class='tipSelf'><i></i><span></span></div>");
    $("body").append($tipSelf);
    function addHoverEvent (childSelector) {
        $('body').on("mouseover",childSelector,function () {
            //判断当前的菜单位置
            var obj=fixTableHead.menuPosition();
            var html=$(this).html().trim();
            var offset=$(this).offset();
            var text=tipList[obj.m1];
            if(text&&(obj.m3=="form")){
                text=text[obj.m2];
                if(text){
                    text=text[html];
                    if(text){
                        $tipSelf.children("span").html(text);
                        $tipSelf.css({
                            "top":offset.top-$tipSelf.height()-15+"px",
                            "left":offset.left+"px"
                        });
                        $tipSelf.fadeIn(100);
                    }
                }
            }
        });
        $('body').on("mouseout",childSelector,function () {
            $tipSelf.fadeOut(100);
        });
    }
    addHoverEvent ("label.oe_form_label");
    addHoverEvent ("th.oe_sortable>div");
});

//服务台中二级表格溢出的问题
$(document).ready(function () {
    var isEditing=false;
    var isAddEvent=false;//用来判断是否添加按钮的绑定时间
    $("body").on("click","a.ui-tabs-anchor",function () {
        $('table.oe_list_content td').off("click",addTdClickEvent);
        var text=$(this).html().trim();
        if(text==="处理过程与客户反馈"&&!isEditing){
            $('table.oe_list_content td').on("click",addTdClickEvent);
        }
    });
    $("body").on("click",".oe_form_buttons_view button.oe_form_button_edit",function () {
        //判断当前的菜单位置
        var o=fixTableHead.menuPosition();
        if(o.m1=="服务台"&&o.m2=="待处理"&&o.m3=="form"){
            isEditing=true;
            startEdit();
        }
        if(!isAddEvent){
            $(".oe_form_buttons_edit [class*=oe_form_button]").click(function () {
                isEditing=false;
                isAddEvent=true;
                $('div.oe_view_manager_body a.ui-tabs-anchor:first').trigger('click');
                hiddenTacBtn(10);
            });
        }
    });
    var $tipSelfP=$("<p class='tipSelf'><i></i><span></span><b>×</b></p>");
    function addTdClickEvent() {
        var text=$(this).html();
        var offset=$(this).offset();
        if(text.length>7){
            if(text){
                $tipSelfP.children("span").html(text);
                var n=$("body>p.tipSelf").length;
                if(n<1){
                    $("body").append($tipSelfP);
                    $("body>p.tipSelf").on("click","b",function () {
                        $tipSelfP.remove();
                    });
                    $('div.oe_view_manager_body:first').scroll(function () {
                        $tipSelfP.remove();
                    });
                }
                $tipSelfP.css({
                    "top":offset.top-$tipSelfP.height()-15+"px",
                    "left":offset.left+"px"
                });
                $tipSelfP.fadeIn(150);
            }
        }
    }
    //根据不同的case状态修改输入区域为只读 for（Feng Yan）
    function startEdit() {
        var status=$('.oe_form_field_status>li.oe_active>span.label').html();
        var n=0;
        var timer=setInterval(function () {
            n++;
            if(n>120){
                clearInterval(timer);
                return;
            }
            var length=$("table.oe_list_content tr[data-id]").length;
            if(length>0){
                clearInterval(timer);
                $("table.oe_list_content tr[data-id] td").click(function () {
                    setTimeout(function () {
                        if(status!=="客户反馈"){
                            $('.oe_form_nosheet span[data-fieldname=result]>input').attr("disabled",true);
                            $('.oe_form_nosheet div[data-fieldname=note]>textarea').attr("disabled",true);
                        }else{
                            $('.oe_form_nosheet div[data-fieldname=record]>textarea').attr("disabled",true);
                        }
                    },100);
                });
            }
        },500);
    }
    // 根据页面隐藏字段属性判断是否隐藏TAC二线线处理按钮 for(Li Nana)
    $("body").on("click","table.oe_list_content tr.oe_group_header",function () {
        var n=0;
        var timer0=setInterval(function () {
            n++;
            if(n>200){
                clearInterval(timer0);
                return;
            }
            if($('table.oe_list_content td[data-field]').length>6){
                clearInterval(timer0);
                $('table.oe_list_content td[data-field]').click(function(){
                    hiddenTacBtn(20);
                });
            }
        },100);
    });
    var t1=0;
    var timer1=setInterval(function () {
        t1++;
        if(t1>120){
            clearInterval(timer1);
            return;
        }
        var is_oem=$("span>input[name=is_oem]").length;
        if(is_oem>0){
            clearInterval(timer1);
            //判断当前的菜单位置
            var o=fixTableHead.menuPosition();
            if(o.m1=="服务台"&&o.m2=="待处理"&&o.m3=="form"){
                hiddenTacBtn(10);
            }
        }
    },500);
    function hiddenTacBtn(m) {
        var n=0;
        var timer=setInterval(function () {
            n++;
            if(n>m){
                clearInterval(timer);
                return;
            }
            var is_oem=$("span>input[name=is_oem]:checked").length;
            if(is_oem){
                $("header button.oe_button span").each(function (i,v) {
                    if($(v).html()=="转TAC二线团队"){
                        $(v).parent("button").attr("disabled",true);
                    }
                });
            }
        },300);
    }
});
