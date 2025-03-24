import { AbstractFigureClipboardHandler, registries } from "@harpiya/o-spreadsheet";
const { clipboardHandlersRegistries } = registries;

class HarpiyaLinkClipboardHandler extends AbstractFigureClipboardHandler {
    copy(data) {
        const sheetId = this.getters.getActiveSheetId();
        const figure = this.getters.getFigure(sheetId, data.figureId);
        if (!figure) {
            throw new Error(`No figure for the given id: ${data.figureId}`);
        }
        if (figure.tag !== "chart") {
            return;
        }
        const harpiyaMenuId = this.getters.getChartHarpiyaMenu(data.figureId);
        if (harpiyaMenuId) {
            return { harpiyaMenuId };
        }
    }
    paste(target, clippedContent, options) {
        if (!target.figureId || !clippedContent.harpiyaMenuId) {
            return;
        }
        const { figureId } = target;
        const { harpiyaMenuId } = clippedContent;
        this.dispatch("LINK_HARPIYA_MENU_TO_CHART", {
            chartId: figureId,
            harpiyaMenuId: harpiyaMenuId.xmlid || harpiyaMenuId.id,
        });
    }
}

clipboardHandlersRegistries.figureHandlers.add("harpiya_menu_link", HarpiyaLinkClipboardHandler);
