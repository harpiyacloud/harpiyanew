import { Component, whenReady } from "@harpiya/owl";
import { HarpiyaLogo } from "@point_of_sale/app/components/harpiya_logo/harpiya_logo";
import { MainComponentsContainer } from "@web/core/main_components_container";
import { session } from "@web/session";
import { useService } from "@web/core/utils/hooks";
import { mountComponent } from "@web/env";
import { roundPrecision as round_pr } from "@web/core/utils/numbers";

export class CustomerDisplay extends Component {
    static template = "point_of_sale.CustomerDisplay";
    static components = { HarpiyaLogo, MainComponentsContainer };
    static props = [];
    setup() {
        this.session = session;
        this.dialog = useService("dialog");
        this.order = useService("customer_display_data");
    }

    get netWeight() {
        const weight = round_pr(this.order.weight || 0, this.order.scaleData.uomRounding);
        const weightRound = weight.toFixed(
            Math.ceil(Math.log(1.0 / this.order.scaleData.uomRounding) / Math.log(10))
        );
        return weightRound - parseFloat(this.order.tare);
    }
}
whenReady(() => mountComponent(CustomerDisplay, document.body));
