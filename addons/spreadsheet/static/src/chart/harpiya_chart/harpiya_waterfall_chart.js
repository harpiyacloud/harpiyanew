import { registries, chartHelpers } from "@harpiya/o-spreadsheet";
import { _t } from "@web/core/l10n/translation";
import { HarpiyaChart } from "./harpiya_chart";
import { onHarpiyaChartItemHover, onWaterfallHarpiyaChartItemClick } from "./harpiya_chart_helpers";

const { chartRegistry } = registries;

const {
    CHART_COMMON_OPTIONS,
    getChartLayout,
    getChartTitle,
    getChartShowValues,
    getWaterfallChartScales,
    getWaterfallChartLegend,
    getWaterfallChartTooltip,
    getWaterfallDatasetAndLabels,
} = chartHelpers;

export class HarpiyaWaterfallChart extends HarpiyaChart {
    constructor(definition, sheetId, getters) {
        super(definition, sheetId, getters);
        this.verticalAxisPosition = definition.verticalAxisPosition ?? "left";
        this.showConnectorLines = definition.showConnectorLines ?? true;
        this.positiveValuesColor = definition.positiveValuesColor;
        this.negativeValuesColor = definition.negativeValuesColor;
        this.subTotalValuesColor = definition.subTotalValuesColor;
        this.firstValueAsSubtotal = definition.firstValueAsSubtotal ?? false;
        this.showSubTotals = definition.showSubTotals ?? false;
        this.axesDesign = definition.axesDesign;
    }

    getDefinition() {
        return {
            ...super.getDefinition(),
            verticalAxisPosition: this.verticalAxisPosition,
            showConnectorLines: this.showConnectorLines,
            firstValueAsSubtotal: this.firstValueAsSubtotal,
            showSubTotals: this.showSubTotals,
            positiveValuesColor: this.positiveValuesColor,
            negativeValuesColor: this.negativeValuesColor,
            subTotalValuesColor: this.subTotalValuesColor,
            axesDesign: this.axesDesign,
        };
    }
}

chartRegistry.add("harpiya_waterfall", {
    match: (type) => type === "harpiya_waterfall",
    createChart: (definition, sheetId, getters) =>
        new HarpiyaWaterfallChart(definition, sheetId, getters),
    getChartRuntime: createHarpiyaChartRuntime,
    validateChartDefinition: (validator, definition) =>
        HarpiyaWaterfallChart.validateChartDefinition(validator, definition),
    transformDefinition: (definition) => HarpiyaWaterfallChart.transformDefinition(definition),
    getChartDefinitionFromContextCreation: () =>
        HarpiyaWaterfallChart.getDefinitionFromContextCreation(),
    name: _t("Waterfall"),
});

function createHarpiyaChartRuntime(chart, getters) {
    const background = chart.background || "#FFFFFF";
    const { datasets, labels } = chart.dataSource.getData();

    const definition = chart.getDefinition();
    const locale = getters.getLocale();

    const chartData = {
        labels,
        dataSetsValues: datasets.map((ds) => ({ data: ds.data, label: ds.label })),
        locale,
    };

    const chartJSData = getWaterfallDatasetAndLabels(definition, chartData);

    const config = {
        type: "bar",
        data: { labels: chartJSData.labels, datasets: chartJSData.datasets },
        options: {
            ...CHART_COMMON_OPTIONS,
            layout: getChartLayout(definition),
            scales: getWaterfallChartScales(definition, chartData),
            plugins: {
                title: getChartTitle(definition),
                legend: getWaterfallChartLegend(definition, chartData),
                tooltip: getWaterfallChartTooltip(definition, chartData),
                chartShowValuesPlugin: getChartShowValues(definition, chartData),
                waterfallLinesPlugin: { showConnectorLines: definition.showConnectorLines },
            },
            onHover: onHarpiyaChartItemHover(),
            onClick: onWaterfallHarpiyaChartItemClick(getters, chart),
        },
    };

    return { background, chartJsConfig: config };
}
