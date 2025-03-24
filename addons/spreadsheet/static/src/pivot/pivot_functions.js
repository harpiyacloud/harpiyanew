// @ts-check

import { _t } from "@web/core/l10n/translation";

import * as spreadsheet from "@harpiya/o-spreadsheet";

const { arg, toString } = spreadsheet.helpers;
const { functionRegistry } = spreadsheet.registries;

/**
 * @typedef {import("@spreadsheet").CustomFunctionDescription} CustomFunctionDescription
 * @typedef {import("@harpiya/o-spreadsheet").FPayload} FPayload
 */

//--------------------------------------------------------------------------
// Spreadsheet functions
//--------------------------------------------------------------------------

const HARPIYA_FILTER_VALUE = /** @satisfies {CustomFunctionDescription} */ ({
    description: _t("Return the current value of a spreadsheet filter."),
    args: [arg("filter_name (string)", _t("The label of the filter whose value to return."))],
    category: "Harpiya",
    /**
     * @param {FPayload} filterName
     */
    compute: function (filterName) {
        const unEscapedFilterName = toString(filterName).replaceAll('\\"', '"');
        return this.getters.getFilterDisplayValue(unEscapedFilterName);
    },
    returns: ["STRING"],
});

functionRegistry
    .add("HARPIYA.FILTER.VALUE", HARPIYA_FILTER_VALUE);
