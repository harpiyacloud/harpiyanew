// @ts-check

import { helpers } from "@harpiya/o-spreadsheet";

const { getFunctionsFromTokens } = helpers;

/** @typedef {import("@harpiya/o-spreadsheet").Token} Token */

/**
 * Parse a spreadsheet formula and detect the number of LIST functions that are
 * present in the given formula.
 *
 * @param {Token[]} tokens
 *
 * @returns {number}
 */
export function getNumberOfListFormulas(tokens) {
    return getFunctionsFromTokens(tokens, ["HARPIYA.LIST", "HARPIYA.LIST.HEADER"]).length;
}

/**
 * Get the first List function description of the given formula.
 *
 * @param {Token[]} tokens
 *
 * @returns {import("../helpers/harpiya_functions_helpers").HarpiyaFunctionDescription|undefined}
 */
export function getFirstListFunction(tokens) {
    return getFunctionsFromTokens(tokens, ["HARPIYA.LIST", "HARPIYA.LIST.HEADER"])[0];
}
