import { IrMenuSelector } from "@spreadsheet_edition/bundle/ir_menu_selector/ir_menu_selector";
import { Domain } from "@web/core/domain";
import { DomainSelector } from "@web/core/domain_selector/domain_selector";
import { DomainSelectorDialog } from "@web/core/domain_selector_dialog/domain_selector_dialog";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { components, constants } from "@harpiya/o-spreadsheet";

import { Component, onWillStart, onWillUpdateProps } from "@harpiya/owl";
const { Section, ValidationMessages } = components;
const { ChartTerms } = constants;

export class CommonHarpiyaChartConfigPanel extends Component {
    static template = "spreadsheet_edition.CommonHarpiyaChartConfigPanel";
    static components = { IrMenuSelector, DomainSelector, Section, ValidationMessages };
    static props = {
        figureId: String,
        definition: Object,
        updateChart: Function,
        canUpdateChart: Function,
    };

    chartTerms = ChartTerms;

    setup() {
        this.dialog = useService("dialog");
        const loadData = async (figureId) => {
            const dataSource = this.env.model.getters.getChartDataSource(figureId);
            this.isModelValid = dataSource.isModelValid();
            this.isDataLoaded = dataSource.isReady();
            if (this.isModelValid) {
                this.modelDisplayName = await dataSource.getModelLabel();
            }
        };
        onWillStart(() => loadData(this.props.figureId));
        onWillUpdateProps((nextProps) => loadData(nextProps.figureId));
    }

    get invalidChartModel() {
        const model = this.env.model.getters.getChartDefinition(this.props.figureId).metaData
            .resModel;
        return _t(
            "The model (%(model)s) of this chart is not valid (it may have been renamed/deleted). Please re-insert a new chart.",
            {
                model,
            }
        );
    }

    get model() {
        const definition = this.env.model.getters.getChartDefinition(this.props.figureId);
        return definition.metaData.resModel;
    }

    get domain() {
        const definition = this.env.model.getters.getChartDefinition(this.props.figureId);
        return new Domain(definition.searchParams.domain).toString();
    }

    onNameChanged(title) {
        const definition = {
            ...this.env.model.getters.getChartDefinition(this.props.figureId),
            title,
        };
        this.env.model.dispatch("UPDATE_CHART", {
            id: this.props.figureId,
            sheetId: this.env.model.getters.getFigureSheetId(this.props.figureId),
            definition,
        });
    }

    /**
     * Get the last update date, formatted
     *
     * @returns {string} date formatted
     */
    getLastUpdate() {
        const dataSource = this.env.model.getters.getChartDataSource(this.props.figureId);
        const lastUpdate = dataSource.lastUpdate;
        if (lastUpdate) {
            return new Date(lastUpdate).toLocaleTimeString();
        }
        return _t("never");
    }

    openDomainEdition() {
        this.dialog.add(DomainSelectorDialog, {
            resModel: this.model,
            domain: new Domain(this.domain).toString(),
            isDebugMode: !!this.env.debug,
            onConfirm: (domain) => {
                const definition = this.env.model.getters.getChartDefinition(this.props.figureId);
                const updatedDefinition = {
                    ...definition,
                    searchParams: {
                        ...definition.searchParams,
                        domain: new Domain(domain).toJson(),
                    },
                };
                this.env.model.dispatch("UPDATE_CHART", {
                    id: this.props.figureId,
                    sheetId: this.env.model.getters.getFigureSheetId(this.props.figureId),
                    definition: updatedDefinition,
                });
            },
        });
    }

    get harpiyaMenuId() {
        const menu = this.env.model.getters.getChartHarpiyaMenu(this.props.figureId);
        return menu ? menu.id : undefined;
    }
    /**
     * @param {number | undefined} harpiyaMenuId
     */
    updateHarpiyaLink(harpiyaMenuId) {
        if (!harpiyaMenuId) {
            this.env.model.dispatch("LINK_HARPIYA_MENU_TO_CHART", {
                chartId: this.props.figureId,
                harpiyaMenuId: undefined,
            });
            return;
        }
        const menu = this.env.model.getters.getIrMenu(harpiyaMenuId);
        this.env.model.dispatch("LINK_HARPIYA_MENU_TO_CHART", {
            chartId: this.props.figureId,
            harpiyaMenuId: menu.xmlid || menu.id,
        });
    }
}
