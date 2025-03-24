import { FieldMatching } from "./global_filter.d";
import {
    CorePlugin,
    UIPlugin,
    DispatchResult,
    CommandResult,
    AddPivotCommand,
    UpdatePivotCommand,
    CancelledReason,
} from "@harpiya/o-spreadsheet";
import * as HarpiyaCancelledReason from "@spreadsheet/o_spreadsheet/cancelled_reason";

type CoreDispatch = CorePlugin["dispatch"];
type UIDispatch = UIPlugin["dispatch"];
type CoreCommand = Parameters<CorePlugin["allowDispatch"]>[0];
type Command = Parameters<UIPlugin["allowDispatch"]>[0];

// TODO look for a way to remove this and use the real import * as HarpiyaCancelledReason
type HarpiyaCancelledReason = string;

declare module "@spreadsheet" {
    interface HarpiyaCommandDispatcher {
        dispatch<T extends HarpiyaCommandTypes, C extends Extract<HarpiyaCommand, { type: T }>>(
            type: {} extends Omit<C, "type"> ? T : never
        ): HarpiyaDispatchResult;
        dispatch<T extends HarpiyaCommandTypes, C extends Extract<HarpiyaCommand, { type: T }>>(
            type: T,
            r: Omit<C, "type">
        ): HarpiyaDispatchResult;
    }

    interface HarpiyaCoreCommandDispatcher {
        dispatch<T extends HarpiyaCoreCommandTypes, C extends Extract<HarpiyaCoreCommand, { type: T }>>(
            type: {} extends Omit<C, "type"> ? T : never
        ): HarpiyaDispatchResult;
        dispatch<T extends HarpiyaCoreCommandTypes, C extends Extract<HarpiyaCoreCommand, { type: T }>>(
            type: T,
            r: Omit<C, "type">
        ): HarpiyaDispatchResult;
    }

    interface HarpiyaDispatchResult extends DispatchResult {
        readonly reasons: (CancelledReason | HarpiyaCancelledReason)[];
        isCancelledBecause(reason: CancelledReason | HarpiyaCancelledReason): boolean;
    }

    type HarpiyaCommandTypes = HarpiyaCommand["type"];
    type HarpiyaCoreCommandTypes = HarpiyaCoreCommand["type"];

    type HarpiyaDispatch = UIDispatch & HarpiyaCommandDispatcher["dispatch"];
    type HarpiyaCoreDispatch = CoreDispatch & HarpiyaCoreCommandDispatcher["dispatch"];

    // CORE

    export interface ExtendedAddPivotCommand extends AddPivotCommand {
        pivot: ExtendedPivotCoreDefinition;
    }

    export interface ExtendedUpdatePivotCommand extends UpdatePivotCommand {
        pivot: ExtendedPivotCoreDefinition;
    }

    export interface AddThreadCommand {
        type: "ADD_COMMENT_THREAD";
        threadId: number;
        sheetId: string;
        col: number;
        row: number;
    }

    export interface EditThreadCommand {
        type: "EDIT_COMMENT_THREAD";
        threadId: number;
        sheetId: string;
        col: number;
        row: number;
        isResolved: boolean;
    }

    export interface DeleteThreadCommand {
        type: "DELETE_COMMENT_THREAD";
        threadId: number;
        sheetId: string;
        col: number;
        row: number;
    }

    // this command is deprecated. use UPDATE_PIVOT instead
    export interface UpdatePivotDomainCommand {
        type: "UPDATE_HARPIYA_PIVOT_DOMAIN";
        pivotId: string;
        domain: Array;
    }

    export interface AddGlobalFilterCommand {
        type: "ADD_GLOBAL_FILTER";
        filter: CmdGlobalFilter;
        [string]: any; // Fields matching
    }

    export interface EditGlobalFilterCommand {
        type: "EDIT_GLOBAL_FILTER";
        filter: CmdGlobalFilter;
        [string]: any; // Fields matching
    }

    export interface RemoveGlobalFilterCommand {
        type: "REMOVE_GLOBAL_FILTER";
        id: string;
    }

    export interface MoveGlobalFilterCommand {
        type: "MOVE_GLOBAL_FILTER";
        id: string;
        delta: number;
    }

    // UI

    export interface RefreshAllDataSourcesCommand {
        type: "REFRESH_ALL_DATA_SOURCES";
    }

    export interface SetGlobalFilterValueCommand {
        type: "SET_GLOBAL_FILTER_VALUE";
        id: string;
        value: any;
        displayNames?: string[];
    }

    export interface SetManyGlobalFilterValueCommand {
        type: "SET_MANY_GLOBAL_FILTER_VALUE";
        filters: { filterId: string; value: any }[];
    }

    type HarpiyaCoreCommand =
        | ExtendedAddPivotCommand
        | ExtendedUpdatePivotCommand
        | UpdatePivotDomainCommand
        | AddThreadCommand
        | DeleteThreadCommand
        | EditThreadCommand
        | AddGlobalFilterCommand
        | EditGlobalFilterCommand
        | RemoveGlobalFilterCommand
        | MoveGlobalFilterCommand;

    export type AllCoreCommand = HarpiyaCoreCommand | CoreCommand;

    type HarpiyaLocalCommand =
        | RefreshAllDataSourcesCommand
        | SetGlobalFilterValueCommand
        | SetManyGlobalFilterValueCommand;

    type HarpiyaCommand = HarpiyaCoreCommand | HarpiyaLocalCommand;

    export type AllCommand = HarpiyaCommand | Command;
}
