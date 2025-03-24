// @ts-check

import { helpers } from "@harpiya/o-spreadsheet";

const { getFunctionsFromTokens } = helpers;

/**
 * @typedef {import("@harpiya/o-spreadsheet").Token} Token
 * @typedef  {import("@spreadsheet/helpers/harpiya_functions_helpers").HarpiyaFunctionDescription} HarpiyaFunctionDescription
 */

/**
 * @param {Token[]} tokens
 * @returns {number}
 */
export function getNumberOfAccountFormulas(tokens) {
    return getFunctionsFromTokens(tokens, ["HARPIYA.BALANCE", "HARPIYA.CREDIT", "HARPIYA.DEBIT", "HARPIYA.RESIDUAL", "HARPIYA.PARTNER.BALANCE"]).length;
}

/**
 * Get the first Account function description of the given formula.
 *
 * @param {Token[]} tokens
 * @returns {HarpiyaFunctionDescription | undefined}
 */
export function getFirstAccountFunction(tokens) {
    return getFunctionsFromTokens(tokens, ["HARPIYA.BALANCE", "HARPIYA.CREDIT", "HARPIYA.DEBIT", "HARPIYA.RESIDUAL", "HARPIYA.PARTNER.BALANCE"])[0];
}
