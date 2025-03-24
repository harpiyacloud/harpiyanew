/**
 * This file is meant to load the different subparts of the module
 * to guarantee their plugins are loaded in the right order
 *
 * dependency:
 *             other plugins
 *                   |
 *                  ...
 *                   |
 *                filters
 *                /\    \
 *               /  \    \
 *           pivot  list  Harpiya chart
 */

/** TODO: Introduce a position parameter to the plugin registry in order to load them in a specific order */
import * as spreadsheet from "@harpiya/o-spreadsheet";
const { corePluginRegistry, coreViewsPluginRegistry, featurePluginRegistry } =
    spreadsheet.registries;

import {
    GlobalFiltersCorePlugin,
    GlobalFiltersUIPlugin,
    GlobalFiltersCoreViewPlugin,
} from "@spreadsheet/global_filters/index";
import {
    PivotHarpiyaCorePlugin,
    PivotCoreViewGlobalFilterPlugin,
    PivotUIGlobalFilterPlugin,
} from "@spreadsheet/pivot/index"; // list depends on filter for its getters
import { ListCorePlugin, ListCoreViewPlugin, ListUIPlugin } from "@spreadsheet/list/index"; // pivot depends on filter for its getters
import {
    ChartHarpiyaMenuPlugin,
    HarpiyaChartCorePlugin,
    HarpiyaChartUIPlugin,
} from "@spreadsheet/chart/index"; // Harpiyachart depends on filter for its getters
import { PivotCoreGlobalFilterPlugin } from "./pivot/plugins/pivot_core_global_filter_plugin";
import { PivotHarpiyaUIPlugin } from "./pivot/plugins/pivot_harpiya_ui_plugin";
import { ListCoreGlobalFilterPlugin } from "./list/plugins/list_core_global_filter_plugin";

corePluginRegistry.add("HarpiyaGlobalFiltersCorePlugin", GlobalFiltersCorePlugin);
corePluginRegistry.add("PivotHarpiyaCorePlugin", PivotHarpiyaCorePlugin);
corePluginRegistry.add("HarpiyaPivotGlobalFiltersCorePlugin", PivotCoreGlobalFilterPlugin);
corePluginRegistry.add("HarpiyaListCorePlugin", ListCorePlugin);
corePluginRegistry.add("HarpiyaListCoreGlobalFilterPlugin", ListCoreGlobalFilterPlugin);
corePluginRegistry.add("harpiyaChartCorePlugin", HarpiyaChartCorePlugin);
corePluginRegistry.add("chartHarpiyaMenuPlugin", ChartHarpiyaMenuPlugin);

coreViewsPluginRegistry.add("HarpiyaGlobalFiltersCoreViewPlugin", GlobalFiltersCoreViewPlugin);
coreViewsPluginRegistry.add(
    "HarpiyaPivotGlobalFiltersCoreViewPlugin",
    PivotCoreViewGlobalFilterPlugin
);
coreViewsPluginRegistry.add("HarpiyaListCoreViewPlugin", ListCoreViewPlugin);
coreViewsPluginRegistry.add("harpiyaChartUIPlugin", HarpiyaChartUIPlugin);

featurePluginRegistry.add("HarpiyaPivotGlobalFilterUIPlugin", PivotUIGlobalFilterPlugin);
featurePluginRegistry.add("HarpiyaGlobalFiltersUIPlugin", GlobalFiltersUIPlugin);
featurePluginRegistry.add("harpiyaPivotUIPlugin", PivotHarpiyaUIPlugin);
featurePluginRegistry.add("harpiyaListUIPlugin", ListUIPlugin);
