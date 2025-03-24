declare module "@spreadsheet" {
    import { CommandResult, CorePlugin, UIPlugin } from "@harpiya/o-spreadsheet";
    import { CommandResult as CR } from "@spreadsheet/o_spreadsheet/cancelled_reason";
    type HarpiyaCommandResult = CommandResult | typeof CR;

    export interface HarpiyaCorePlugin extends CorePlugin {
        getters: HarpiyaCoreGetters;
        dispatch: HarpiyaCoreDispatch;
        allowDispatch(command: AllCoreCommand): string | string[];
        beforeHandle(command: AllCoreCommand): void;
        handle(command: AllCoreCommand): void;
    }

    export interface HarpiyaCorePluginConstructor {
        new (config: unknown): HarpiyaCorePlugin;
    }

    export interface HarpiyaUIPlugin extends UIPlugin {
        getters: HarpiyaGetters;
        dispatch: HarpiyaDispatch;
        allowDispatch(command: AllCommand): string | string[];
        beforeHandle(command: AllCommand): void;
        handle(command: AllCommand): void;
    }

    export interface HarpiyaUIPluginConstructor {
        new (config: unknown): HarpiyaUIPlugin;
    }
}
