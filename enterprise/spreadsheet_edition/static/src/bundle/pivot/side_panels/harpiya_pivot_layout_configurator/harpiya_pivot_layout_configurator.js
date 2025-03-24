import { components } from "@harpiya/o-spreadsheet";
import { HARPIYA_AGGREGATORS } from "@spreadsheet/pivot/pivot_helpers";
const { PivotLayoutConfigurator } = components;

export class HarpiyaPivotLayoutConfigurator extends PivotLayoutConfigurator {
    setup() {
        super.setup(...arguments);
        this.AGGREGATORS = HARPIYA_AGGREGATORS;
    }
}
