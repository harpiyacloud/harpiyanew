// @harpiya-module ignore
// ! WARNING: this module must be loaded after `module_loader` but cannot have dependencies !

(function (harpiya) {
    "use strict";

    if (harpiya.define.name.endsWith("(hoot)")) {
        return;
    }

    const name = `${harpiya.define.name} (hoot)`;
    harpiya.define = {
        [name](name, dependencies, factory) {
            return harpiya.loader.define(name, dependencies, factory, !name.endsWith(".hoot"));
        },
    }[name];
})(globalThis.harpiya);
