import { registries, chartHelpers } from "@harpiya/o-spreadsheet";
import { _t } from "@web/core/l10n/translation";
import { HarpiyaChart } from "./harpiya_chart";
import { onHarpiyaChartItemClick, onHarpiyaChartItemHover } from "./harpiya_chart_helpers";

const { chartRegistry } = registries;

const {
    getLineChartDatasets,
    CHART_COMMON_OPTIONS,
    getChartLayout,
    getLineChartScales,
    getLineChartTooltip,
    getChartTitle,
    getLineChartLegend,
    getChartShowValues,
    getTrendDatasetForLineChart,
} = chartHelpers;

export class HarpiyaLineChart extends HarpiyaChart {
    constructor(definition, sheetId, getters) {
        super(definition, sheetId, getters);
        this.verticalAxisPosition = definition.verticalAxisPosition;
        this.stacked = definition.stacked;
        this.cumulative = definition.cumulative;
        this.axesDesign = definition.axesDesign;
        this.fillArea = definition.fillArea;
    }

    getDefinition() {
        return {
            ...super.getDefinition(),
            verticalAxisPosition: this.verticalAxisPosition,
            stacked: this.stacked,
            cumulative: this.cumulative,
            axesDesign: this.axesDesign,
            fillArea: this.fillArea,
        };
    }
}

chartRegistry.add("harpiya_line", {
    match: (type) => type === "harpiya_line",
    createChart: (definition, sheetId, getters) => new HarpiyaLineChart(definition, sheetId, getters),
    getChartRuntime: createHarpiyaChartRuntime,
    validateChartDefinition: (validator, definition) =>
        HarpiyaLineChart.validateChartDefinition(validator, definition),
    transformDefinition: (definition) => HarpiyaLineChart.transformDefinition(definition),
    getChartDefinitionFromContextCreation: () => HarpiyaLineChart.getDefinitionFromContextCreation(),
    name: _t("Line"),
});

function createHarpiyaChartRuntime(chart, getters) {
    const background = chart.background || "#FFFFFF";
    let { datasets, labels } = chart.dataSource.getData();
    datasets = computeCumulatedDatasets(chart, datasets);

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

    const chartJsDatasets = getLineChartDatasets(definition, chartData);
    const config = {
        type: "line",
        data: {
            labels: chartData.labels,
            datasets: chartJsDatasets,
        },
        options: {
            ...CHART_COMMON_OPTIONS,
            layout: getChartLayout(definition),
            scales: getLineChartScales(definition, chartData),
            plugins: {
                title: getChartTitle(definition),
                legend: getLineChartLegend(definition, chartData),
                tooltip: getLineChartTooltip(definition, chartData),
                chartShowValuesPlugin: getChartShowValues(definition, chartData),
            },
            onHover: onHarpiyaChartItemHover(),
            onClick: onHarpiyaChartItemClick(getters, chart),
        },
    };

    return { background, chartJsConfig: config };
}

function computeCumulatedDatasets(chart, datasets) {
    const cumulatedDatasets = [];
    for (const dataset of datasets) {
        if (chart.cumulative) {
            let accumulator = dataset.cumulatedStart || 0;
            const data = dataset.data.map((value) => {
                accumulator += value;
                return accumulator;
            });
            cumulatedDatasets.push({ ...dataset, data });
        } else {
            cumulatedDatasets.push(dataset);
        }
    }
    return cumulatedDatasets;
}
