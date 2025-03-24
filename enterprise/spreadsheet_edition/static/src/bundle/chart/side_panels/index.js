import * as spreadsheet from "@harpiya/o-spreadsheet";
import { CommonHarpiyaChartConfigPanel } from "./common/config_panel";
import { HarpiyaBarChartConfigPanel } from "./harpiya_bar/harpiya_bar_config_panel";
import { HarpiyaLineChartConfigPanel } from "./harpiya_line/harpiya_line_config_panel";
import { _t } from "@web/core/l10n/translation";

const { chartSidePanelComponentRegistry, chartSubtypeRegistry } = spreadsheet.registries;
const {
    ComboChartDesignPanel,
    PieChartDesignPanel,
    ChartWithAxisDesignPanel,
    RadarChartDesignPanel,
    WaterfallChartDesignPanel,
} = spreadsheet.components;

chartSidePanelComponentRegistry
    .add("harpiya_line", {
        configuration: HarpiyaLineChartConfigPanel,
        design: ChartWithAxisDesignPanel,
    })
    .add("harpiya_bar", {
        configuration: HarpiyaBarChartConfigPanel,
        design: ChartWithAxisDesignPanel,
    })
    .add("harpiya_pie", {
        configuration: CommonHarpiyaChartConfigPanel,
        design: PieChartDesignPanel,
    })
    .add("harpiya_radar", {
        configuration: CommonHarpiyaChartConfigPanel,
        design: RadarChartDesignPanel,
    })
    .add("harpiya_waterfall", {
        configuration: CommonHarpiyaChartConfigPanel,
        design: WaterfallChartDesignPanel,
    })
    .add("harpiya_pyramid", {
        configuration: CommonHarpiyaChartConfigPanel,
        design: ChartWithAxisDesignPanel,
    })
    .add("harpiya_scatter", {
        configuration: CommonHarpiyaChartConfigPanel,
        design: ChartWithAxisDesignPanel,
    })
    .add("harpiya_combo", {
        configuration: CommonHarpiyaChartConfigPanel,
        design: ComboChartDesignPanel,
    });

chartSubtypeRegistry.add("harpiya_line", {
    matcher: (definition) =>
        definition.type === "harpiya_line" && !definition.stacked && !definition.fillArea,
    subtypeDefinition: { stacked: false, fillArea: false },
    displayName: _t("Line"),
    chartSubtype: "harpiya_line",
    chartType: "harpiya_line",
    category: "line",
    preview: "o-spreadsheet-ChartPreview.LINE_CHART",
});
chartSubtypeRegistry.add("harpiya_stacked_line", {
    matcher: (definition) =>
        definition.type === "harpiya_line" && definition.stacked && !definition.fillArea,
    subtypeDefinition: { stacked: true, fillArea: false },
    displayName: _t("Stacked Line"),
    chartSubtype: "harpiya_stacked_line",
    chartType: "harpiya_line",
    category: "line",
    preview: "o-spreadsheet-ChartPreview.STACKED_LINE_CHART",
});
chartSubtypeRegistry.add("harpiya_area", {
    matcher: (definition) =>
        definition.type === "harpiya_line" && !definition.stacked && definition.fillArea,
    subtypeDefinition: { stacked: false, fillArea: true },
    displayName: _t("Area"),
    chartSubtype: "harpiya_area",
    chartType: "harpiya_line",
    category: "area",
    preview: "o-spreadsheet-ChartPreview.AREA_CHART",
});
chartSubtypeRegistry.add("harpiya_stacked_area", {
    matcher: (definition) =>
        definition.type === "harpiya_line" && definition.stacked && definition.fillArea,
    subtypeDefinition: { stacked: true, fillArea: true },
    displayName: _t("Stacked Area"),
    chartSubtype: "harpiya_stacked_area",
    chartType: "harpiya_line",
    category: "area",
    preview: "o-spreadsheet-ChartPreview.STACKED_AREA_CHART",
});
chartSubtypeRegistry.add("harpiya_bar", {
    matcher: (definition) =>
        definition.type === "harpiya_bar" && !definition.stacked && !definition.horizontal,
    subtypeDefinition: { stacked: false, horizontal: false },
    displayName: _t("Column"),
    chartSubtype: "harpiya_bar",
    chartType: "harpiya_bar",
    category: "column",
    preview: "o-spreadsheet-ChartPreview.COLUMN_CHART",
});
chartSubtypeRegistry.add("harpiya_stacked_bar", {
    matcher: (definition) =>
        definition.type === "harpiya_bar" && definition.stacked && !definition.horizontal,
    subtypeDefinition: { stacked: true, horizontal: false },
    displayName: _t("Stacked Column"),
    chartSubtype: "harpiya_stacked_bar",
    chartType: "harpiya_bar",
    category: "column",
    preview: "o-spreadsheet-ChartPreview.STACKED_COLUMN_CHART",
});
chartSubtypeRegistry.add("harpiya_horizontal_bar", {
    matcher: (definition) =>
        definition.type === "harpiya_bar" && !definition.stacked && definition.horizontal,
    subtypeDefinition: { stacked: false, horizontal: true },
    displayName: _t("Bar"),
    chartSubtype: "harpiya_horizontal_bar",
    chartType: "harpiya_bar",
    category: "bar",
    preview: "o-spreadsheet-ChartPreview.BAR_CHART",
});
chartSubtypeRegistry.add("harpiya_horizontal_stacked_bar", {
    matcher: (definition) =>
        definition.type === "harpiya_bar" && definition.stacked && definition.horizontal,
    subtypeDefinition: { stacked: true, horizontal: true },
    displayName: _t("Stacked Bar"),
    chartSubtype: "harpiya_horizontal_stacked_bar",
    chartType: "harpiya_bar",
    category: "bar",
    preview: "o-spreadsheet-ChartPreview.STACKED_BAR_CHART",
});
chartSubtypeRegistry.add("harpiya_combo", {
    displayName: _t("Combo"),
    chartSubtype: "harpiya_combo",
    chartType: "harpiya_combo",
    category: "line",
    preview: "o-spreadsheet-ChartPreview.COMBO_CHART",
});
chartSubtypeRegistry.add("harpiya_pie", {
    displayName: _t("Pie"),
    matcher: (definition) => definition.type === "harpiya_pie" && !definition.isDoughnut,
    subtypeDefinition: { isDoughnut: false },
    chartSubtype: "harpiya_pie",
    chartType: "harpiya_pie",
    category: "pie",
    preview: "o-spreadsheet-ChartPreview.PIE_CHART",
});
chartSubtypeRegistry.add("harpiya_doughnut", {
    matcher: (definition) => definition.type === "harpiya_pie" && definition.isDoughnut,
    subtypeDefinition: { isDoughnut: true },
    displayName: _t("Doughnut"),
    chartSubtype: "harpiya_doughnut",
    chartType: "harpiya_pie",
    category: "pie",
    preview: "o-spreadsheet-ChartPreview.DOUGHNUT_CHART",
});
chartSubtypeRegistry.add("harpiya_scatter", {
    displayName: _t("Scatter"),
    chartType: "harpiya_scatter",
    chartSubtype: "harpiya_scatter",
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.SCATTER_CHART",
});
chartSubtypeRegistry.add("harpiya_waterfall", {
    displayName: _t("Waterfall"),
    chartSubtype: "harpiya_waterfall",
    chartType: "harpiya_waterfall",
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.WATERFALL_CHART",
});
chartSubtypeRegistry.add("harpiya_pyramid", {
    displayName: _t("Population Pyramid"),
    chartSubtype: "harpiya_pyramid",
    chartType: "harpiya_pyramid",
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.POPULATION_PYRAMID_CHART",
});
chartSubtypeRegistry.add("harpiya_radar", {
    matcher: (definition) => definition.type === "harpiya_radar" && !definition.fillArea,
    displayName: _t("Radar"),
    chartSubtype: "harpiya_radar",
    chartType: "harpiya_radar",
    subtypeDefinition: { fillArea: false },
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.RADAR_CHART",
});
chartSubtypeRegistry.add("harpiya_filled_radar", {
    matcher: (definition) => definition.type === "harpiya_radar" && !!definition.fillArea,
    displayName: _t("Filled Radar"),
    chartType: "harpiya_radar",
    chartSubtype: "harpiya_filled_radar",
    subtypeDefinition: { fillArea: true },
    category: "misc",
    preview: "o-spreadsheet-ChartPreview.FILLED_RADAR_CHART",
});
