import { animationFrame } from "@harpiya/hoot-mock";

import * as spreadsheet from "@harpiya/o-spreadsheet";
import { createModelWithDataSource } from "@spreadsheet/../tests/helpers/model";
const uuidGenerator = new spreadsheet.helpers.UuidGenerator();

/**
 * @typedef {import("@harpiya/o-spreadsheet").Model} Model
 * @typedef {import("@spreadsheet").HarpiyaSpreadsheetModel} HarpiyaSpreadsheetModel
 */

/**
 *
 * @param {Model} model
 * @param {string} type
 * @param {import("@spreadsheet/chart/harpiya_chart/harpiya_chart").HarpiyaChartDefinition} definition
 */
export function insertChartInSpreadsheet(
    model,
    type = "harpiya_bar",
    definition = getChartDefinition(type)
) {
    model.dispatch("CREATE_CHART", {
        sheetId: model.getters.getActiveSheetId(),
        id: definition.id,
        position: {
            x: 10,
            y: 10,
        },
        definition,
    });
    return definition.id;
}
/**
 *
 * @param {Object} params
 * @param {function} [params.definition]
 * @param {function} [params.mockRPC]
 * @param {string} [params.type]
 * @param {import("./data").ServerData} [params.serverData]
 *
 * @returns { Promise<{ model: HarpiyaSpreadsheetModel, env: Object }>}
 */
export async function createSpreadsheetWithChart(params = {}) {
    const { model, env } = await createModelWithDataSource(params);

    insertChartInSpreadsheet(model, params.type, params.definition);

    await animationFrame();
    return { model, env };
}

function getChartDefinition(type) {
    return {
        metaData: {
            groupBy: ["foo", "bar"],
            measure: "__count",
            order: null,
            resModel: "partner",
        },
        searchParams: {
            comparison: null,
            context: {},
            domain: [],
            groupBy: [],
            orderBy: [],
        },
        stacked: true,
        title: { text: "Partners" },
        background: "#FFFFFF",
        legendPosition: "top",
        verticalAxisPosition: "left",
        dataSourceId: uuidGenerator.uuidv4(),
        id: uuidGenerator.uuidv4(),
        type,
    };
}
