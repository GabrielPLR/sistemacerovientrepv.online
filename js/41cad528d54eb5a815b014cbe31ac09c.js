(() => {
   "use strict";
   class elementorHelloThemeHandler {
      constructor() {
         this.initSettings(), this.initElements(), this.bindEvents()
      }
      initSettings() {
         this.settings = {
            selectors: {
               header: "header.site-header",
               footer: "footer.site-footer",
               menuToggle: ".site-header .site-navigation-toggle",
               menuToggleHolder: ".site-header .site-navigation-toggle-holder",
               dropdownMenu: ".site-header .site-navigation-dropdown"
            }
         }
      }
      initElements() {
         this.elements = {
            $window: jQuery(window),
            $document: jQuery(document),
            $header: jQuery(this.settings.selectors.header),
            $footer: jQuery(this.settings.selectors.footer),
            $menuToggle: jQuery(this.settings.selectors.menuToggle),
            $menuToggleHolder: jQuery(this.settings.selectors.menuToggleHolder),
            $dropdownMenu: jQuery(this.settings.selectors.dropdownMenu)
         }
      }
      bindEvents() {
         this.elements.$menuToggle.on("click", (() => this.handleMenuToggle())).on("keyup", (e => {
            13 !== e.keyCode && 32 !== e.keyCode || e.currentTarget.click()
         })), this.elements.$dropdownMenu.on("click", ".menu-item-has-children > a", this.handleMenuChildren)
      }
      closeMenuItems() {
         this.elements.$menuToggleHolder.removeClass("elementor-active"), this.elements.$window.off("resize", (() => this.closeMenuItems()))
      }
      handleMenuToggle() {
         const e = !this.elements.$menuToggleHolder.hasClass("elementor-active");
         this.elements.$menuToggle.attr("aria-expanded", e), this.elements.$dropdownMenu.attr("aria-hidden", !e), this.elements.$menuToggleHolder.toggleClass("elementor-active", e), this.elements.$dropdownMenu.find(".elementor-active").removeClass("elementor-active"), e ? this.elements.$window.on("resize", (() => this.closeMenuItems())) : this.elements.$window.off("resize", (() => this.closeMenuItems()))
      }
      handleMenuChildren(e) {
         const t = jQuery(e.currentTarget).parent("li");
         t.hasClass("elementor-active") ? t.removeClass("elementor-active") : t.addClass("elementor-active")
      }
   }
   jQuery((() => {
      new elementorHelloThemeHandler
   }))
})();