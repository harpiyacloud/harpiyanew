declare module "@spreadsheet" {
    import { Model } from "@harpiya/o-spreadsheet";

    export interface HarpiyaSpreadsheetModel extends Model {
        getters: HarpiyaGetters;
        dispatch: HarpiyaDispatch;
    }

    export interface HarpiyaSpreadsheetModelConstructor {
        new (
            data: object,
            config: Partial<Model["config"]>,
            revisions: object[]
        ): HarpiyaSpreadsheetModel;
    }
}
