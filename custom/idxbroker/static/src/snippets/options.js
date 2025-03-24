/** @harpiya-module **/

import options from "@web_editor/js/editor/snippets.options";
import dynamicSnippetOptions from "@website/snippets/s_dynamic_snippet/options";

import { rpc } from "@web/core/network/rpc";

const dynamicSnippetIDXBrokerOptions = dynamicSnippetOptions.extend({
  init: function () {
    this._super.apply(this, arguments);
    this.limitOptions = [-1, 3, 6, 9, 12];
    this.categories = {};
  },

  async _fetchCategories() {
    const result = await rpc("/idxbroker/categories/json");
    if (result.success) {
      this.categories = {};
      result.categories.forEach((cat) => {
        this.categories[cat.id] = cat;
      });
    }
  },

  _renderCustomXML: async function (uiFragment) {
    await this._super.apply(this, arguments);
    await this._renderCategorySelector(uiFragment);
    await this._renderLimitSelector(uiFragment);
  },

  async _renderCategorySelector(uiFragment) {
    await this._fetchCategories();
    if (!Object.keys(this.categories).length) {
      await this._fetchCategories();
    }
    const categorySelectorEl = uiFragment.querySelector(
      '[data-name="category_opt"]'
    );
    return this._renderSelectUserValueWidgetButtons(
      categorySelectorEl,
      this.categories
    );
  },

  async _renderLimitSelector(uiFragment) {
    const limitSelectorEl = uiFragment.querySelector('[data-name="number_of_records_opt"]');
    
    const limitOptions = {};
    this.limitOptions.forEach(
      (opt) => (limitOptions[opt] = { id: opt, name: `${opt}` })
    );
    return this._renderSelectUserValueWidgetButtons(
      limitSelectorEl,
      limitOptions
    );
  },

  _setOptionsDefaultValues: function () {
    this._setOptionValue("category", 5400);
    this._super.apply(this, arguments);
  },
});

options.registry.dynamic_snippet_estate=
  dynamicSnippetIDXBrokerOptions;

export default dynamicSnippetIDXBrokerOptions;
