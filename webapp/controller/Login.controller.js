sap.ui.define([
     "intern2020/controller/BaseController",
     'sap/m/MessageToast',
 ], function (BaseController, MessageToast) {
    "use strict";
    return BaseController.extend("intern2020.controller.Login", {

      onLoginPress : function (oEvent) {

         var oView = this.getView();
         var oModel = oView.getModel();
         var email = oView.byId("emailInput").getValue();
         var password = oView.byId("passwordInput").getValue();

         var username = {
            "Username" : email
         };

         var oModel2 = new sap.ui.model.json.JSONModel(username);
         this.getOwnerComponent().setModel(oModel2, "username");

         var page = this;
      
         oModel.callFunction("/Login", {
                              method: "POST", 
                              urlParameters: {
                                 Email : email,
                                 Password : password
                              },    

            success : function(oData, response) {
               var jModel = new sap.ui.model.json.JSONModel();
               var myData = {};
               myData.Fare = oData;
               jModel.setData(myData);
               var position = myData.Fare.UserPosition;

               if(position == "MANAGER"){
                     var oRouter = sap.ui.core.UIComponent.getRouterFor(page);
                     oRouter.navTo("dashboardManager");
               }
               else if(position == "USER"){
                     var oRouter = sap.ui.core.UIComponent.getRouterFor(page);
                     oRouter.navTo("dashboard");
               }
               else if(position == ""){
                     MessageToast.show("Email or password is incorrect. Try again.", {
                        duration: 4000,
                        autoClose: false
                     });
               }
            },
            
            error : function(oError){
               alert("An error ocurred. Please refresh.");
            } 
         }); 
      }, 
            
      validateEmail : function(){

         var email = this.getView().byId("emailInput").getValue();

         var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

         if(!email){
            MessageToast.show("Please enter an email adress.", {
               duration: 4000,
               autoClose: false
            });
         }
         else if (!mailregex.test(email)) {
            MessageToast.show(email + " is not a valid email address!", {
               duration: 4000,
               autoClose: false
            });
            this.getView().byId("emailInput").setValueState(sap.ui.core.ValueState.Error);
         }
      },
 });
})