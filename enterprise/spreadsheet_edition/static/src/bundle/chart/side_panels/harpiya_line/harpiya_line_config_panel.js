import { CommonHarpiyaChartConfigPanel } from "../common/config_panel";
import { components } from "@harpiya/o-spreadsheet";

const { Checkbox } = components;

export class HarpiyaLineChartConfigPanel extends CommonHarpiyaChartConfigPanel {
    static template = "spreadsheet_edition.HarpiyaLineChartConfigPanel";
    static components = {
        ...CommonHarpiyaChartConfigPanel.components,
        Checkbox,
    };

    get stackedLabel() {
        const definition = this.props.definition;
        return definition.fillArea
            ? this.chartTerms.StackedAreaChart
            : this.chartTerms.StackedLineChart;
    }

    onUpdateStacked(stacked) {
        this.props.updateChart(this.props.figureId, {
            stacked,
        });
    }
    onUpdateCumulative(cumulative) {
        this.props.updateChart(this.props.figureId, {
            cumulative,
        });
    }
}
