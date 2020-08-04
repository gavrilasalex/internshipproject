sap.ui.define([
     "intern2020/controller/BaseController",
     'sap/m/MessageToast',
 ], function (BaseController, MessageToast) {
    "use strict";
    return BaseController.extend("intern2020.controller.Login", {
      onLoginPress : function (oEvent) {
         this.email=this.byId('emailInput').getValue();
         this.password=this.byId('passwordInput').getValue();
      
         var username = {
            "Username" : this.email
         };
         var oModel = new sap.ui.model.json.JSONModel(username);
         this.getOwnerComponent().setModel(oModel, "username");
         var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
         oRouter.navTo("dashboard")
   },

   validateEmail :function(){

      var email = this.getView().byId("emailInput").getValue();

      var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

      if (!mailregex.test(email)) {
         MessageToast.show(email + " is not a valid email address!", {
            duration: 10000,
            autoClose: false
         });

      this.getView().byId("emailInput").setValueState(sap.ui.core.ValueState.Error);

   }

}

 });
 });