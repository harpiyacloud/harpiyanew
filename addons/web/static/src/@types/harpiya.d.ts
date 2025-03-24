interface HarpiyaModuleErrors {
    cycle?: string | null;
    failed?: Set<string>;
    missing?: Set<string>;
    unloaded?: Set<string>;
}

interface HarpiyaModuleFactory {
    deps: string[];
    fn: HarpiyaModuleFactoryFn;
    ignoreMissingDeps: boolean;
}

class HarpiyaModuleLoader {
    bus: EventTarget;
    checkErrorProm: Promise<void> | null;
    /**
     * Mapping [name => factory]
     */
    factories: Map<string, HarpiyaModuleFactory>;
    /**
     * Names of failed modules
     */
    failed: Set<string>;
    /**
     * Names of modules waiting to be started
     */
    jobs: Set<string>;
    /**
     * Mapping [name => module]
     */
    modules: Map<string, HarpiyaModule>;

    constructor(root?: HTMLElement);

    addJob: (name: string) => void;

    define: (
        name: string,
        deps: string[],
        factory: HarpiyaModuleFactoryFn,
        lazy?: boolean
    ) => HarpiyaModule;

    findErrors: (jobs?: Iterable<string>) => HarpiyaModuleErrors;

    findJob: () => string | null;

    reportErrors: (errors: HarpiyaModuleErrors) => Promise<void>;

    sortFactories: () => void;

    startModule: (name: string) => HarpiyaModule;

    startModules: () => void;
}

type HarpiyaModule = Record<string, any>;

type HarpiyaModuleFactoryFn = (require: (dependency: string) => HarpiyaModule) => HarpiyaModule;

declare const harpiya: {
    csrf_token: string;
    debug: string;
    define: HarpiyaModuleLoader["define"];
    loader: HarpiyaModuleLoader;
};
