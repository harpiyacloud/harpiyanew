import { SpreadsheetChildEnv as SSChildEnv } from "@harpiya/o-spreadsheet";
import { Services } from "services";

declare module "@spreadsheet" {
    import { Model } from "@harpiya/o-spreadsheet";

    export interface SpreadsheetChildEnv extends SSChildEnv {
        model: HarpiyaSpreadsheetModel;
        services: Services;
    }
}
