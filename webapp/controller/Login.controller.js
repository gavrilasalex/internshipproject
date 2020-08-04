sap.ui.define([
     "intern2020/controller/BaseController",
     'sap/m/MessageToast',
 ], function (BaseController, MessageToast) {
    "use strict";
    return BaseController.extend("intern2020.controller.Login", {
      onLoginPress : function (oEvent) {
         this.email=this.byId('emailInput').getValue();
         this.password=this.byId('passwordInput').getValue();
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("dashboard", {
         success: function() {
            MessageToast.show("Hello!", {
               duration: 10000,
               autoClose: false
            });
         }
     })
   },

 });
 });