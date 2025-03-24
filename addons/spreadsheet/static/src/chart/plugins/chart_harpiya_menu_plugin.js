import { HarpiyaCorePlugin } from "@spreadsheet/plugins";
import { coreTypes, helpers } from "@harpiya/o-spreadsheet";
import { omit } from "@web/core/utils/objects";
const { deepEquals } = helpers;

/** Plugin that link charts with Harpiya menus. It can contain either the Id of the harpiya menu, or its xml id. */
export class ChartHarpiyaMenuPlugin extends HarpiyaCorePlugin {
    static getters = /** @type {const} */ (["getChartHarpiyaMenu"]);
    constructor(config) {
        super(config);
        this.harpiyaMenuReference = {};
    }

    /**
     * Handle a spreadsheet command
     * @param {Object} cmd Command
     */
    handle(cmd) {
        switch (cmd.type) {
            case "LINK_HARPIYA_MENU_TO_CHART":
                this.history.update("harpiyaMenuReference", cmd.chartId, cmd.harpiyaMenuId);
                break;
            case "DELETE_FIGURE":
                this.history.update("harpiyaMenuReference", cmd.id, undefined);
                break;
            case "DUPLICATE_SHEET":
                this.updateOnDuplicateSheet(cmd.sheetId, cmd.sheetIdTo);
                break;
        }
    }

    updateOnDuplicateSheet(sheetIdFrom, sheetIdTo) {
        for (const oldChartId of this.getters.getChartIds(sheetIdFrom)) {
            if (!this.harpiyaMenuReference[oldChartId]) {
                continue;
            }
            const oldChartDefinition = this.getters.getChartDefinition(oldChartId);
            const oldFigure = this.getters.getFigure(sheetIdFrom, oldChartId);
            const newChartId = this.getters.getChartIds(sheetIdTo).find((newChartId) => {
                const newChartDefinition = this.getters.getChartDefinition(newChartId);
                const newFigure = this.getters.getFigure(sheetIdTo, newChartId);
                return (
                    deepEquals(oldChartDefinition, newChartDefinition) &&
                    deepEquals(omit(newFigure, "id"), omit(oldFigure, "id")) // compare size and position
                );
            });

            if (newChartId) {
                this.history.update(
                    "harpiyaMenuReference",
                    newChartId,
                    this.harpiyaMenuReference[oldChartId]
                );
            }
        }
    }

    /**
     * Get harpiya menu linked to the chart
     *
     * @param {string} chartId
     * @returns {object | undefined}
     */
    getChartHarpiyaMenu(chartId) {
        const menuId = this.harpiyaMenuReference[chartId];
        return menuId ? this.getters.getIrMenu(menuId) : undefined;
    }

    import(data) {
        if (data.chartHarpiyaMenusReferences) {
            this.harpiyaMenuReference = data.chartHarpiyaMenusReferences;
        }
    }

    export(data) {
        data.chartHarpiyaMenusReferences = this.harpiyaMenuReference;
    }
}

coreTypes.add("LINK_HARPIYA_MENU_TO_CHART");
