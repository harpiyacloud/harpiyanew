from harpiya.addons.account.models.chart_template import template
from harpiya import models


class AccountChartTemplate(models.AbstractModel):
    _inherit = 'account.chart.template'

    @template('in', 'res.company')
    def _get_in_res_company_enterprise(self):
        return {
            self.env.company.id: {
                'sign_invoice': True,
            },
        }
