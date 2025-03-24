import * as spreadsheet from "@harpiya/o-spreadsheet";
const { otRegistry } = spreadsheet.registries;

otRegistry
    .addTransformation(
        "INSERT_HARPIYA_LIST",
        ["INSERT_HARPIYA_LIST", "DUPLICATE_HARPIYA_LIST"],
        transformNewListCommand
    )
    .addTransformation(
        "DUPLICATE_HARPIYA_LIST",
        ["INSERT_HARPIYA_LIST", "DUPLICATE_HARPIYA_LIST"],
        transformNewListCommand
    )
    .addTransformation(
        "REMOVE_HARPIYA_LIST",
        ["RENAME_HARPIYA_LIST", "UPDATE_HARPIYA_LIST_DOMAIN", "UPDATE_HARPIYA_LIST"],
        (toTransform, executed) => {
            if (toTransform.listId === executed.listId) {
                return undefined;
            }
            return toTransform;
        }
    )
    .addTransformation(
        "REMOVE_HARPIYA_LIST",
        ["RE_INSERT_HARPIYA_LIST", "DUPLICATE_HARPIYA_LIST"],
        (toTransform, executed) => {
            if (toTransform.id === executed.listId) {
                return undefined;
            }
            return toTransform;
        }
    );

function transformNewListCommand(toTransform) {
    const idKey = "newListId" in toTransform ? "newListId" : "id";
    return {
        ...toTransform,
        [idKey]: (parseInt(toTransform[idKey], 10) + 1).toString(),
    };
}
