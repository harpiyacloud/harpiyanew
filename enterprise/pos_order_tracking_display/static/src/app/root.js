import { Component, whenReady } from "@harpiya/owl";
import { Orders } from "@pos_order_tracking_display/app/components/orders/orders";
import { HarpiyaLogo } from "@point_of_sale/app/components/harpiya_logo/harpiya_logo";
import { useOrderStatusDisplay } from "./services/order_tracking_display_service";
import { mountComponent } from "@web/env";

export class OrderStatusDisplay extends Component {
    static template = "pos_order_tracking_display.OrderStatusDisplay";
    static components = { Orders, HarpiyaLogo };
    static props = {};
    setup() {
        this.orders = useOrderStatusDisplay();
    }
}
whenReady(() => mountComponent(OrderStatusDisplay, document.body));
