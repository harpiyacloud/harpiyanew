import { Component } from "@harpiya/owl";

export class HarpiyaLogo extends Component {
    static template = "point_of_sale.HarpiyaLogo";
    static props = {
        class: { type: String, optional: true },
        style: { type: String, optional: true },
        monochrome: { type: Boolean, optional: true },
    };
    static defaultProps = {
        class: "",
        style: "",
        monochrome: false,
    };
}
