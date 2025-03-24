# Part of Harpiya. See LICENSE file for full copyright and licensing details.
from harpiya import models
from harpiya.addons.account.models.chart_template import template


class AccountChartTemplate(models.AbstractModel):
    _inherit = 'account.chart.template'

    @template('ro', 'account.tax')
    def _get_ro_saft_account_tax(self):
        return self._parse_csv('ro', 'account.tax', module='l10n_ro_saft')
