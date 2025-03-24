import { CorePlugin, CoreViewPlugin, UIPlugin } from "@harpiya/o-spreadsheet";

/**
 * An o-spreadsheet core plugin with access to all custom Harpiya plugins
 * @type {import("@spreadsheet").HarpiyaCorePluginConstructor}
 **/
export const HarpiyaCorePlugin = CorePlugin;

/**
 * An o-spreadsheet CoreView plugin with access to all custom Harpiya plugins
 * @type {import("@spreadsheet").HarpiyaUIPluginConstructor}
 **/
export const HarpiyaCoreViewPlugin = CoreViewPlugin;

/**
 * An o-spreadsheet UI plugin with access to all custom Harpiya plugins
 * @type {import("@spreadsheet").HarpiyaUIPluginConstructor}
 **/
export const HarpiyaUIPlugin = UIPlugin;
