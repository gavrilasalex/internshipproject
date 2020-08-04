sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
], function (BaseController, MessageToast) {
   "use strict";
   return BaseController.extend("intern2020.controller.Dashboard", {
    onInit : function () {
        MessageToast.show("Hello!")
    },
    onSignOutPress : function (oEvent) {
     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
     oRouter.navTo("login");

    //  var oHistory = History.getInstance();
    // var sPreviousHash = oHistory.getPreviousHash();
 
    // if (sPreviousHash !== undefined) {
    //     window.history.go(-1);
    // } else {
    //     var oRouter = UIComponent.getRouterFor(this);
    //     oRouter.navTo("login", {}, true);
    // }
    },
   });
});