import { registries, chartHelpers } from "@harpiya/o-spreadsheet";
import { _t } from "@web/core/l10n/translation";
import { HarpiyaChart } from "./harpiya_chart";
import { onHarpiyaChartItemClick, onHarpiyaChartItemHover } from "./harpiya_chart_helpers";

const { chartRegistry } = registries;

const {
    getBarChartDatasets,
    CHART_COMMON_OPTIONS,
    getChartLayout,
    getBarChartScales,
    getBarChartTooltip,
    getChartTitle,
    getBarChartLegend,
    getChartShowValues,
    getTrendDatasetForBarChart,
} = chartHelpers;

export class HarpiyaBarChart extends HarpiyaChart {
    constructor(definition, sheetId, getters) {
        super(definition, sheetId, getters);
        this.verticalAxisPosition = definition.verticalAxisPosition;
        this.stacked = definition.stacked;
        this.axesDesign = definition.axesDesign;
        this.horizontal = definition.horizontal;
    }

    getDefinition() {
        return {
            ...super.getDefinition(),
            verticalAxisPosition: this.verticalAxisPosition,
            stacked: this.stacked,
            axesDesign: this.axesDesign,
            trend: this.trend,
            horizontal: this.horizontal,
        };
    }
}

chartRegistry.add("harpiya_bar", {
    match: (type) => type === "harpiya_bar",
    createChart: (definition, sheetId, getters) => new HarpiyaBarChart(definition, sheetId, getters),
    getChartRuntime: createHarpiyaChartRuntime,
    validateChartDefinition: (validator, definition) =>
        HarpiyaBarChart.validateChartDefinition(validator, definition),
    transformDefinition: (definition) => HarpiyaBarChart.transformDefinition(definition),
    getChartDefinitionFromContextCreation: () => HarpiyaBarChart.getDefinitionFromContextCreation(),
    name: _t("Bar"),
});

function createHarpiyaChartRuntime(chart, getters) {
    const background = chart.background || "#FFFFFF";
    const { datasets, labels } = chart.dataSource.getData();
    const definition = chart.getDefinition();

    const trendDataSetsValues = datasets.map((dataset, index) => {
        const trend = definition.dataSets[index]?.trend;
        return !trend?.display || chart.horizontal
            ? undefined
            : getTrendDatasetForBarChart(trend, dataset.data);
    });

    const chartData = {
        labels,
        dataSetsValues: datasets.map((ds) => ({ data: ds.data, label: ds.label })),
        locale: getters.getLocale(),
        trendDataSetsValues,
    };

    const config = {
        type: "bar",
        data: {
            labels: chartData.labels,
            datasets: getBarChartDatasets(definition, chartData),
        },
        options: {
            ...CHART_COMMON_OPTIONS,
            indexAxis: chart.horizontal ? "y" : "x",
            layout: getChartLayout(definition),
            scales: getBarChartScales(definition, chartData),
            plugins: {
                title: getChartTitle(definition),
                legend: getBarChartLegend(definition, chartData),
                tooltip: getBarChartTooltip(definition, chartData),
                chartShowValuesPlugin: getChartShowValues(definition, chartData),
            },
            onHover: onHarpiyaChartItemHover(),
            onClick: onHarpiyaChartItemClick(getters, chart),
        },
    };

    return { background, chartJsConfig: config };
}
