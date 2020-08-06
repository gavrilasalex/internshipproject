sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
], function (BaseController, MessageToast) {
   "use strict";

    return BaseController.extend("intern2020.controller.Dashboard", {

        onInit : function() {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("dashboard").attachMatched(this._onRouteMatched, this)
        },

        _onRouteMatched : function(oEvent) {

            var bActive = true;
            var oModel = this.getView().getModel("sUsername");

            if(oModel === undefined){
                bActive = false;
            } 
            else if(oModel.getProperty("/Username") === ""){
                bActive = false;
            }
            if(!bActive){
                this._onSignOutPress();
            }
            else {
                MessageToast.show("Welcome " + oModel.getProperty("/Username") + "!", {
                    duration: 10000
                });
            }
        },

        _onPressApproved : function (oEvent) {

			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("userApproved");
        },
        
        _onPressDenied : function (oEvent) {

			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("userDenied");
		},

        _onSignOutPress : function(oEvent) {

            var oModel = this.getView().getModel("sUsername");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            if(!(oModel === undefined)){
                oModel.setProperty("/Username", "");
            }
            oRouter.navTo("login");
        }
    });
});