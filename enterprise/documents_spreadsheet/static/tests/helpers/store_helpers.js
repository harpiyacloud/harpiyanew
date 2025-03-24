import { stores } from "@harpiya/o-spreadsheet";
const { HighlightStore, RendererStore } = stores;

export function getHighlightsFromStore(env) {
    const rendererStore = env.getStore(RendererStore);
    return Object.values(rendererStore["renderers"])
        .flat()
        .filter((renderer) => renderer instanceof HighlightStore)
        .flatMap((store) => store["providers"])
        .flatMap((getter) => getter.highlights);
}
