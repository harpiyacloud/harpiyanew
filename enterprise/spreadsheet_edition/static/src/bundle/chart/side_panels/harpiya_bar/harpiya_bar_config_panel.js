import { CommonHarpiyaChartConfigPanel } from "../common/config_panel";
import { components } from "@harpiya/o-spreadsheet";

const { Checkbox } = components;

export class HarpiyaBarChartConfigPanel extends CommonHarpiyaChartConfigPanel {
    static template = "spreadsheet_edition.HarpiyaBarChartConfigPanel";

    static components = {
        ...CommonHarpiyaChartConfigPanel.components,
        Checkbox,
    };

    onUpdateStacked(stacked) {
        this.props.updateChart(this.props.figureId, {
            stacked,
        });
    }
}
