sap.ui.define([
   "intern2020/controller/BaseController"
], function (BaseController) {
   "use strict";

   return BaseController.extend("intern2020.controller.App", {
      
      onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},

   });
});