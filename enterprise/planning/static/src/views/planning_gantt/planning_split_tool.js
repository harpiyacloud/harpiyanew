import { Component } from "@harpiya/owl";

export class PlanningSplitTool extends Component {
    static props = {
        reactive: {
            type: Object,
            shape: {
                position: { type: String, optional: true },
            },
        },
    };
    static template = "planning.PlanningSplitTool";
}
