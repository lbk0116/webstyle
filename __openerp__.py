# -*- coding: utf-8 -*-
{
    'name': "webstyle",

    'summary': """
        web style and script module""",

    'description': """
        Long description of module's purpose
    """,

    'author': "Wang Haipeng",
    'website': "http://www.nantian.com.cn",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/master/openerp/addons/base/module/module_data.xml
    # for the full list
    'category': 'style、script',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['web'],

    # always loaded
    'data': [
        #"ir.model.access.csv",
        "views/wetstyle_template.xml"
    ],
    # only loaded in demonstration mode
    'application': True,
}
