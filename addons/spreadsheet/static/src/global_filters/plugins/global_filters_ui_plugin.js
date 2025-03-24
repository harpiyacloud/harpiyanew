/** @ts-check */

/**
 * @typedef {import("@spreadsheet").GlobalFilter} GlobalFilter
 * @typedef {import("@spreadsheet").FieldMatching} FieldMatching
 * @typedef {import("@spreadsheet").DateGlobalFilter} DateGlobalFilter
 * @typedef {import("@spreadsheet").RelationalGlobalFilter} RelationalGlobalFilter
 */

import { HarpiyaUIPlugin } from "@spreadsheet/plugins";


export class GlobalFiltersUIPlugin extends HarpiyaUIPlugin {

    /**
     * Handle a spreadsheet command
     *
     * @param {import("@spreadsheet").AllCommand} cmd
     */
    handle(cmd) {
        switch (cmd.type) {
            case "SET_MANY_GLOBAL_FILTER_VALUE":
                for (const filter of cmd.filters) {
                    this.dispatch("SET_GLOBAL_FILTER_VALUE", {
                        id: filter.filterId,
                        value: filter.value,
                    });
                }
                break;
        }
    }
}
