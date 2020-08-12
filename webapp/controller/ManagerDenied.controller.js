//CONTROLLER FOR THE DENIED TABLE FROM MANAGER


sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
], function (BaseController, MessageToast, History, UIComponent) {
   "use strict";

    return BaseController.extend("intern2020.controller.ManagerDenied", {

        onInit : function() {
        },

		/*
        * When you press the table tile -> navTo detailDenied page
        */
        _onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			oRouter.navTo("detailDenied");
		},

		/*
        * When you press the navigation button -> navTo previous page/dashboardManager
        */
        _onNavBack : function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("dashboardManager", {}, true);
			}
		}
    });
});