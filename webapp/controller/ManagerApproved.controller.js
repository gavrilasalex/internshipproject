//CONTROLLER FOR THE APPROVED TABLE FROM MANAGER

sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, MessageToast, History, UIComponent, Filter, FilterOperator) {
   "use strict";

    return BaseController.extend("intern2020.controller.ManagerApproved", {

        onInit : function(oEvent) {
		},

		/*
        * When you press the table tile -> navTo detailApproved page
        */
		_onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext();
			this.getRouter().navTo("detailApproved",{
                employeeId : oCtx.getProperty("Id"),
				employeeEmail : oCtx.getProperty("EmailAddress")
			});
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