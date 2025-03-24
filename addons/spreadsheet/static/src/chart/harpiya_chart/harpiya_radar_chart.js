import { registries, chartHelpers } from "@harpiya/o-spreadsheet";
import { _t } from "@web/core/l10n/translation";
import { HarpiyaChart } from "./harpiya_chart";
import { onHarpiyaChartItemHover, onHarpiyaChartItemClick } from "./harpiya_chart_helpers";

const { chartRegistry } = registries;

const {
    getRadarChartDatasets,
    CHART_COMMON_OPTIONS,
    getChartLayout,
    getChartTitle,
    getChartShowValues,
    getRadarChartScales,
    getRadarChartLegend,
    getRadarChartTooltip,
} = chartHelpers;

export class HarpiyaRadarChart extends HarpiyaChart {
    constructor(definition, sheetId, getters) {
        super(definition, sheetId, getters);
        this.fillArea = definition.fillArea;
    }

    getDefinition() {
        return {
            ...super.getDefinition(),
            fillArea: this.fillArea,
        };
    }
}

chartRegistry.add("harpiya_radar", {
    match: (type) => type === "harpiya_radar",
    createChart: (definition, sheetId, getters) => new HarpiyaRadarChart(definition, sheetId, getters),
    getChartRuntime: createHarpiyaChartRuntime,
    validateChartDefinition: (validator, definition) =>
        HarpiyaRadarChart.validateChartDefinition(validator, definition),
    transformDefinition: (definition) => HarpiyaRadarChart.transformDefinition(definition),
    getChartDefinitionFromContextCreation: () => HarpiyaRadarChart.getDefinitionFromContextCreation(),
    name: _t("Radar"),
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

    const config = {
        type: "radar",
        data: {
            labels: chartData.labels,
            datasets: getRadarChartDatasets(definition, chartData),
        },
        options: {
            ...CHART_COMMON_OPTIONS,
            layout: getChartLayout(definition),
            scales: getRadarChartScales(definition, chartData),
            plugins: {
                title: getChartTitle(definition),
                legend: getRadarChartLegend(definition, chartData),
                tooltip: getRadarChartTooltip(definition, chartData),
                chartShowValuesPlugin: getChartShowValues(definition, chartData),
            },
            onHover: onHarpiyaChartItemHover(),
            onClick: onHarpiyaChartItemClick(getters, chart),
        },
    };

    return { background, chartJsConfig: config };
}
