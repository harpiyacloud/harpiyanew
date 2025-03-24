import * as spreadsheet from "@harpiya/o-spreadsheet";
import { HarpiyaPivot } from "@spreadsheet/pivot/harpiya_pivot";
import { patch } from "@web/core/utils/patch";
const { helpers } = spreadsheet;
const { formatValue } = helpers;

/**
 * @typedef {import("@harpiya/o-spreadsheet").PivotDomain} PivotDomain
 */

patch(HarpiyaPivot.prototype, {
    /**
     * High level method computing the formatted result of PIVOT.HEADER functions.
     *
     * @param {PivotDomain} domain
     */
    getPivotHeaderFormattedValue(domain) {
        const { value, format } = this.getPivotHeaderValueAndFormat(domain);
        if (typeof value === "string") {
            return value;
        }
        const locale = this.getters.getLocale();
        return formatValue(value, { format, locale });
    },
});
