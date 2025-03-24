import { defineDocumentSpreadsheetModels } from "@documents_spreadsheet/../tests/helpers/data";
import { expect, test } from "@harpiya/hoot";
import { getBasicServerData } from "@spreadsheet/../tests/helpers/data";
import { createSpreadsheetTemplate } from "@documents_spreadsheet/../tests/helpers/spreadsheet_test_utils";
import { Model } from "@harpiya/o-spreadsheet";
import { setCellContent } from "@spreadsheet/../tests/helpers/commands";
import { getCellValue } from "@spreadsheet/../tests/helpers/getters";

defineDocumentSpreadsheetModels();

test("open template with non Latin characters", async function () {
    const model = new Model();
    setCellContent(model, "A1", "😃");
    const serverData = getBasicServerData();
    serverData.models["spreadsheet.template"].records = [
        {
            id: 99,
            name: "template",
            spreadsheet_data: JSON.stringify(model.exportData()),
        },
    ];
    const { model: template } = await createSpreadsheetTemplate({
        serverData,
        spreadsheetId: 99,
    });
    expect(getCellValue(template, "A1")).toBe("😃", {
        message: "It should show the smiley as a smiley 😉",
    });
});
