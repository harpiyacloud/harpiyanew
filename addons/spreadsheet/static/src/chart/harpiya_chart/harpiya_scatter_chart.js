import { registries, chartHelpers } from "@harpiya/o-spreadsheet";
import { _t } from "@web/core/l10n/translation";
import { HarpiyaChart } from "./harpiya_chart";
import { onHarpiyaChartItemHover, onHarpiyaChartItemClick } from "./harpiya_chart_helpers";

const { chartRegistry } = registries;

const {
    getScatterChartDatasets,
    CHART_COMMON_OPTIONS,
    getChartLayout,
    getScatterChartScales,
    getLineChartTooltip,
    getChartTitle,
    getScatterChartLegend,
    getChartShowValues,
    getTrendDatasetForLineChart,
} = chartHelpers;

export class HarpiyaScatterChart extends HarpiyaChart {
    constructor(definition, sheetId, getters) {
        super(definition, sheetId, getters);
        this.verticalAxisPosition = definition.verticalAxisPosition;
        this.axesDesign = definition.axesDesign;
    }

    getDefinition() {
        return {
            ...super.getDefinition(),
            verticalAxisPosition: this.verticalAxisPosition,
            axesDesign: this.axesDesign,
        };
    }
}

chartRegistry.add("harpiya_scatter", {
    match: (type) => type === "harpiya_scatter",
    createChart: (definition, sheetId, getters) =>
        new HarpiyaScatterChart(definition, sheetId, getters),
    getChartRuntime: createHarpiyaChartRuntime,
    validateChartDefinition: (validator, definition) =>
        HarpiyaScatterChart.validateChartDefinition(validator, definition),
    transformDefinition: (definition) => HarpiyaScatterChart.transformDefinition(definition),
    getChartDefinitionFromContextCreation: () =>
        HarpiyaScatterChart.getDefinitionFromContextCreation(),
    name: _t("Scatter"),
});

function createHarpiyaChartRuntime(chart, getters) {
    const background = chart.background || "#FFFFFF";
    const { datasets, labels } = chart.dataSource.getData();

    const definition = chart.getDefinition();
    const locale = getters.getLocale();

    const trendDataSetsValues = datasets.map((dataset, index) => {
        const trend = definition.dataSets[index]?.trend;
        return !trend?.display
            ? undefined
            : getTrendDatasetForLineChart(trend, dataset.data, labels, "category", locale);
    });

    const chartData = {
        labels,
        dataSetsValues: datasets.map((ds) => ({ data: ds.data, label: ds.label })),
        locale,
        trendDataSetsValues,
    };

    const config = {
        type: "line",
        data: {
            labels: chartData.labels,
            datasets: getScatterChartDatasets(definition, chartData),
        },
        options: {
            ...CHART_COMMON_OPTIONS,
            layout: getChartLayout(definition),
            scales: getScatterChartScales(definition, chartData),
            plugins: {
                title: getChartTitle(definition),
                legend: getScatterChartLegend(definition, chartData),
                tooltip: getLineChartTooltip(definition, chartData),
                chartShowValuesPlugin: getChartShowValues(definition, chartData),
            },
            onHover: onHarpiyaChartItemHover(),
            onClick: onHarpiyaChartItemClick(getters, chart),
        },
    };

    return { background, chartJsConfig: config };
}
