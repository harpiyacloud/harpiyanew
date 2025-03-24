import * as spreadsheet from "@harpiya/o-spreadsheet";

const { chartComponentRegistry } = spreadsheet.registries;
const { ChartJsComponent } = spreadsheet.components;

chartComponentRegistry.add("harpiya_bar", ChartJsComponent);
chartComponentRegistry.add("harpiya_line", ChartJsComponent);
chartComponentRegistry.add("harpiya_pie", ChartJsComponent);
chartComponentRegistry.add("harpiya_radar", ChartJsComponent);
chartComponentRegistry.add("harpiya_waterfall", ChartJsComponent);
chartComponentRegistry.add("harpiya_pyramid", ChartJsComponent);
chartComponentRegistry.add("harpiya_scatter", ChartJsComponent);
chartComponentRegistry.add("harpiya_combo", ChartJsComponent);

import { HarpiyaChartCorePlugin } from "./plugins/harpiya_chart_core_plugin";
import { ChartHarpiyaMenuPlugin } from "./plugins/chart_harpiya_menu_plugin";
import { HarpiyaChartUIPlugin } from "./plugins/harpiya_chart_ui_plugin";

export { HarpiyaChartCorePlugin, ChartHarpiyaMenuPlugin, HarpiyaChartUIPlugin };
