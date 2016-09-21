/**
 * Created by Administrator on 2016-09-14.
 */

//添加快捷链接
(function () {
    if(!localStorage.shortcut){
        localStorage.shortcut="{}";
    }
    var shortcut=JSON.parse(localStorage.shortcut);

    if(!shortcut.hidShortcut){
        $("body").addClass("bg");
        $("body>div.openerp_webclient_container").addClass("showShortcut");
    }else{
        $("body>div.shortcut").addClass("hid");
    }
    $("body>div.shortcut>div.toggleBtn").click(function () {
        var divClass=$(this).parent().attr("class");
        if(divClass.indexOf("hid")>=0){
            $(this).parent().removeClass("hid");
            $("body>div.openerp_webclient_container").addClass("showShortcut");
            $("body").addClass("bg");
            shortcut.hidShortcut=false;
        }else{
            $(this).parent().addClass("hid");
            $("body>div.openerp_webclient_container").removeClass("showShortcut");
            $("body").removeClass("bg");
            shortcut.hidShortcut=true;
        }
        localStorage.shortcut=JSON.stringify(shortcut);
    });

    //用来定义快捷链接的配置
    var shortcutList= {
        "1": {
            name: "人力资源",
            menuName:"员工",
            positionX: -291,
            positionY: -76,
            linkUrl: "web?#page=0&limit=80&view_type=list&model=hr.employee&menu_id=189&action=205"
        },
        "2": {
            name: "合同",
            menuName:"合同",
            positionX: -435,
            positionY: -76,
            linkUrl: "web?#page=0&limit=80&view_type=list&model=nantian_erp.contract&menu_id=738&action=1085"
        },
        "3": {
            name: "请假申请",
            menuName:"申请创建",
            positionX: -147,
            positionY: -147,
            linkUrl: "web?#page=0&limit=80&view_type=list&model=nantian_erp.hr_leave&menu_id=733&action=1076"
        },
        "4": {
            name: "工作组",
            menuName:"工作组",
            positionX: -75,
            positionY: -147,
            linkUrl: "web?#page=0&limit=80&view_type=list&model=project.project&action=1083"
        },
        "5": {
            name: "任务",
            menuName:"任务",
            positionX: -147,
            positionY: -147,
            linkUrl: "web?#view_type=kanban&model=project.task&action=192"
        },
        "6": {
            name: "服务客户",
            menuName:"服务客户",
            positionX: -435,
            positionY: -2,
            linkUrl: "web?#page=0&limit=80&view_type=list&model=res.partner&action=1084"
        },
        "7": {
            name: "待处理Case",
            menuName:"待处理",
            positionX: -435,
            positionY: -147,
            linkUrl: "web?#page=0&limit=&view_type=list&model=server_desk.case&action=774"
        },
        "8": {
            name: "收件箱",
            menuName:"收件箱",
            positionX: -3,
            positionY: -148,
            linkUrl: "web?#menu_id=105&action=98"
        },
        "9": {
            name: "我的仪表板",
            menuName:"我的仪表板",
            positionX: -218,
            positionY: -2,
            linkUrl: "web?#view_type=form&model=board.board&action=87"
        }
    };
    //初始化快捷链接
    if(!shortcut.selectedList){
        shortcut.selectedList=["1","5"];
    }
    if(!shortcut.unselectedList){
        shortcut.unselectedList=["2","3","4","6","7","8","9"];
    }
    //获取菜单权限
    var authority={};
    $("td.oe_leftbar span.oe_menu_text").each(function (i,v) {
        authority[$(v).html().trim()]=true;
    });

    //dom操作函数
    function startPrint(tarSelector,arr,sl) {
        $(tarSelector).html("");
        $.each(arr,function (ietm,val) {
            var a=authority[sl[val].menuName];
            function print() {
                var $li = $('<li>'
                    + '<a data-href="' + sl[val].linkUrl + '" href="' + val + '">' +
                    '<i class="icon_cygn" style="background-position: ' + sl[val].positionX + 'px ' + sl[val].positionY + 'px"></i>' +
                    '<p>' + sl[val].name + '</p>' +
                    '<s></s>' +
                    '</a>'
                    + '</li>');
                $(tarSelector).append($li);
            }
            if(tarSelector=="#setCYGN1") {
                a&&print();
            }else{
                print();
            }
        });
        switch(tarSelector){
            case "#setCYGN1":
                $("#setCYGN1>li>a").click(function (e) {
                    var e=e||event;
                    if (e.preventDefault){
						e.preventDefault(); 
						//IE中阻止函数器默认动作的方式
					}else{
						e.returnValue = false;
					}
                    var url=$(this).attr("data-href");
                    window.open(url,"_self");
                    $("body").scrollTop(300);
                });
            break;
            case "#selectedShortcut":
                $("#selectedShortcut>li>a").click(function () {
                    var e=e||event;
                    if (e.preventDefault){
						e.preventDefault(); 
						//IE中阻止函数器默认动作的方式
					}else{
						e.returnValue = false;
					}
                    var val=$(this).attr("href");
                    var i=shortcut.selectedList.indexOf(val);
                    var del=shortcut.selectedList.splice(i,1);
                    Array.prototype.push.apply(shortcut.unselectedList,del);
                    startPrint("#selectedShortcut",shortcut.selectedList,sl);
                    startPrint("#unselectedShortcut",shortcut.unselectedList,sl);
                });
            break;
            case "#unselectedShortcut":
                $("#unselectedShortcut>li>a").click(function () {
                    var e=e||event;
                    if (e.preventDefault){
						e.preventDefault(); 
						//IE中阻止函数器默认动作的方式
					}else{
						e.returnValue = false;
					}
                    var val=$(this).attr("href");
                    var a=authority[sl[val].menuName];
                    if(a){
                        if(shortcut.selectedList.length<6){
                            var i=shortcut.unselectedList.indexOf(val);
                            var del=shortcut.unselectedList.splice(i,1);
                            Array.prototype.push.apply(shortcut.selectedList,del);
                            startPrint("#selectedShortcut",shortcut.selectedList,sl);
                            startPrint("#unselectedShortcut",shortcut.unselectedList,sl);
                        }else{
                            alert("您选中的热门功能已经达到最大上限！");
                        }
                    }else{
                        alert("您要选的热门功能无访问权限！");
                    }
                });
            break;
        }
    }
    startPrint("#setCYGN1",shortcut.selectedList,shortcutList);
    $("div.shortcut span.selfSet").click(function () {
        var $discover=$('<div class="discover"></div>');
        $('body').css("overflow","hidden").append($discover);
        var $dialog=$('<div class="modal" id="dialogLink" style="display: block" data-backdrop="static">'+
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
        startPrint("#selectedShortcut",shortcut.selectedList,shortcutList);
        startPrint("#unselectedShortcut",shortcut.unselectedList,shortcutList);
        //取消按钮
        $("div.modal-footer>button.btn-warning").click(function () {
            dismiss();
            shortcut=JSON.parse(localStorage.shortcut);
        });
        //保存按钮
        $("div.modal-footer>button.btn-info").click(function () {
            dismiss();
            startPrint("#setCYGN1",shortcut.selectedList,shortcutList);
            localStorage.shortcut=JSON.stringify(shortcut);
        });
        function dismiss() {
            $dialog.slideUp('fast',function () {
               $dialog.remove();
            });
            $discover.fadeOut('fast',function () {
               $discover.remove();
            });
            $('body').css("overflow","auto");
        }
    });
})();
