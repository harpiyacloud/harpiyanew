/** @harpiya-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import { rpc } from "@web/core/network/rpc";

function generateSlug(address, city, zipcode) {
    const slug = `${address}-${city}-${zipcode}`
        .replace(/\s+/g, '-') 
        .replace(/,/g, '')
        .replace(/-+/g, '-')
        .toLowerCase();
    return encodeURIComponent(slug);
}

publicWidget.registry.IDXBrokerSnippet = publicWidget.Widget.extend({
  selector: ".s_dynamic_snippet_estate",
  start: function () {
    var self = this;
    const limit = parseInt(self.el.dataset.numberOfRecords);
    const category = parseInt(self.el.dataset.category);

    return rpc("/idxbroker/properties/json", { link_id: category }).then(
      function (data) {
        var container = self.$("#idx-properties-container");
        container.empty();

        if (data.success) {
          if (data.properties.length === 0 || data.properties === "No results returned") {
            container.append('<p class="text-center">No properties found.</p>');
          } else {
            const propertiesToShow = (limit === -1) ? data.properties : data.properties.slice(0, limit);

            propertiesToShow.forEach(function (property) {

              // Burada SEO uyumlu URL oluşturuyoruz:
              const seoUrl = `/listing/${property.listingID}/${generateSlug(property.address, property.cityName, property.zipcode)}`;

              container.append(`
                <div data-name="Card" class="col-lg-4 pt16 pb16">
                  <div class="s_card o_card_img_top card h-100 o_cc o_cc1 my-0 o_colored_level" style="border-radius: 0px !important;"> 
                    <figure class="o_card_img_wrapper ratio ratio-16x9 mb-0">
                      <img class="o_card_img card-img-top"
                           src="${property.image ? property.image[0].url : "/web/image/website/no_image"}"
                           alt="${property.address}"
                           loading="lazy" />
                    </figure>
                    <div class="card-body">
                      <p class="h4-fs">${property.listingPrice}</p>
                      <h5 class="card-title">
                        ${property.address} / ${category}
                      </h5>
                      <p class="card-text">
                        ${property.remarksConcat && property.remarksConcat.length > 100
                        ? property.remarksConcat.substring(0, 100) + "..."
                        : (property.remarksConcat || "")}
                      </p>
                      <a href="${seoUrl}" class="btn btn-primary mb-0">View details</a>
                    </div>
                  </div>
                </div>
              `);
            });
          }
        } else {
          container.append(
            `<div class="alert alert-danger">${data.error}</div>`
          );
        }
      }
    );
  },
});
