import { patch } from "@web/core/utils/patch";
import * as spreadsheet from "@harpiya/o-spreadsheet";
import { IrMenuSelector } from "@spreadsheet_edition/bundle/ir_menu_selector/ir_menu_selector";

const { GenericChartConfigPanel, ScorecardChartConfigPanel, GaugeChartConfigPanel, Section } =
    spreadsheet.components;

/**
 * Patch the chart configuration panel to add an input to
 * link the chart to an Harpiya menu.
 */
function patchChartPanelWithMenu(PanelComponent) {
    patch(PanelComponent.prototype, {
        get harpiyaMenuId() {
            const menu = this.env.model.getters.getChartHarpiyaMenu(this.props.figureId);
            return menu ? menu.id : undefined;
        },
        /**
         * @param {number | undefined} harpiyaMenuId
         */
        updateHarpiyaLink(harpiyaMenuId) {
            if (!harpiyaMenuId) {
                this.env.model.dispatch("LINK_HARPIYA_MENU_TO_CHART", {
                    chartId: this.props.figureId,
                    harpiyaMenuId: undefined,
                });
                return;
            }
            const menu = this.env.model.getters.getIrMenu(harpiyaMenuId);
            this.env.model.dispatch("LINK_HARPIYA_MENU_TO_CHART", {
                chartId: this.props.figureId,
                harpiyaMenuId: menu.xmlid || menu.id,
            });
        },
    });
    PanelComponent.components = {
        ...PanelComponent.components,
        IrMenuSelector,
        Section,
    };
}
patchChartPanelWithMenu(GenericChartConfigPanel);
patchChartPanelWithMenu(GaugeChartConfigPanel);
patchChartPanelWithMenu(ScorecardChartConfigPanel);
