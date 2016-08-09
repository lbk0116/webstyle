#coding:utf8

from openerp import http

class WebStyle(http.Controller):

    @http.route("/web", auth="none", web=True)
    def webstyle(self):
        return http.request.render("webstyle.idname", {})