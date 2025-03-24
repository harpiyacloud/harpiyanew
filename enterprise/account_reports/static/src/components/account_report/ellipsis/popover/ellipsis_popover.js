import { Component } from "@harpiya/owl";

export class AccountReportEllipsisPopover extends Component {
    static template = "account_reports.AccountReportEllipsisPopover";
    static props = {
        close: Function,
        name: String,
        copyEllipsisText: Function,
    };
}
