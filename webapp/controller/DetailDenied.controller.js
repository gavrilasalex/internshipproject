//CONTROLLER FOR THE DENIED FORM

sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
], function (BaseController, MessageToast, History, UIComponent) {
   "use strict";

    return BaseController.extend("intern2020.controller.DetailDenied", {

        onInit : function() {

            this.getView().setBusy(true);
            
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detailDenied").attachMatched(this._onRouteMatched, this);
		},

        /*
        * Matches the route for Username 
        * 
        * @param {Boolean} [bActive] when login is succesfull and the dashboard loads the variable is set to /true/
        * 
        * IF the oModel is undefined bActive is set to /false/
        * ELSE IF the /Username is empty (the login part is skipped) bActive is set to /false/
        * 
        * IF bActiv is false -> call _onSignOutPress to exit
        * ELSE IF bActive is true -> Welcome message shows up on the screen, customized with the username
        * 
        */
		_onRouteMatched : function(oEvent) {
            
            var oArgs = oEvent.getParameter("arguments");
			var oView = this.getView();

            oView.bindElement({
				path : "/TripDetailsSet(Id='" + oArgs.employeeId + "',EmailAddress='" + oArgs.employeeEmail + "')",
            });

            this.getView().setBusy(false);
        },

    });
});