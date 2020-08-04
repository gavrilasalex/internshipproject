sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("intern2020.controller.Dashboard", {
    onInit : function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("dashboard").attachMatched(this._onRouteMatched, this);
        
    },

    _onRouteMatched: function(oEvent) {
        var oModel = this.getView().getModel("username");
        MessageToast.show("Welcome " + oModel.getProperty("/Username") + "!", {
            duration: 10000
         })
    },

    onSignOutPress : function (oEvent) {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("login");
        // window.history.go(-1);
    },
   });
});