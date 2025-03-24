import { Component } from "@harpiya/owl";

export class NewContentRefreshBanner extends Component {
    static template = "social.NewContentRefreshBanner";
    static props = [
        "refreshRequired",
        "onClickRefresh",
    ];
}
