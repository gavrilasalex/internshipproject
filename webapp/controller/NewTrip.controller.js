//CONTROLLER FOR THE TO BE APPROVED FORM

sap.ui.define([
	"intern2020/controller/BaseController",
	"sap/ui/core/Fragment",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (BaseController, Fragment, MessageToast, History, UIComponent) {
   "use strict";

    return BaseController.extend("intern2020.controller.NewTrip", {

        onInit : function() {

			this._Page = this.byId("page_newTrip");
			this._Page.setFloatingFooter(!this._Page.getFloatingFooter());

			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // oRouter.getRoute("newTrip").attachMatched(this._onRouteMatched, this);
		},
		
		// _onRouteMatched : function(oEvent) {
            
        //     var oArgs = oEvent.getParameter("arguments");
		// 	var oView = this.getView();

        //     oView.bindElement({
		// 		path : "/TripDetailsSet(Id='" + oArgs.employeeId + "',EmailAddress='" + oArgs.employeeEmail + "')",
        //     });
		// },
		
		toggleVisibility: function () {
            this._Page.setShowFooter(!this._Page.getShowFooter());
		}, 
		
        toggleFooter: function () {
			this._Page.setFloatingFooter(!this._Page.getFloatingFooter());
		},
		
		/*
        * When you press the navigation button -> navTo previous page/managerToBeApproved
        */
        _onNavBack : function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("userBT", {}, true);
			}
		}
    });
});