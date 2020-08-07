sap.ui.define([
     "intern2020/controller/BaseController",
     'sap/m/MessageToast',
 ], function (BaseController, MessageToast) {
    "use strict";

   return BaseController.extend("intern2020.controller.Login", {

      _onLoginPress : function (oEvent) {

         var oView = this.getView();
         var oModel = oView.getModel();
         var page = this;

         var sEmail = oView.byId("emailInput").getValue();
         var sPassword = oView.byId("passwordInput").getValue();
         
         var sUsername = {"Username" : sEmail};
         var oModel2 = new sap.ui.model.json.JSONModel(sUsername);
         this.getOwnerComponent().setModel(oModel2, "sUsername");
      
         oModel.callFunction("/Login", {
                                       method: "POST", 
                                       urlParameters: {
                                                      Email : sEmail,
                                                      Password : sPassword
                                                      },    

            success : function(oData, response) {

               var jModel = new sap.ui.model.json.JSONModel();
               var myData = {};
               myData.Fare = oData;
               jModel.setData(myData);
               var sPosition = myData.Fare.UserPosition;

               if(sPosition == "MANAGER"){
                     var oRouter = sap.ui.core.UIComponent.getRouterFor(page);
                     oRouter.navTo("dashboardManager");
               }
               else if(sPosition == "USER"){
                     var oRouter = sap.ui.core.UIComponent.getRouterFor(page);
                     oRouter.navTo("dashboard");
               }
               else if(sPosition == ""){
                     MessageToast.show("Email or password is incorrect. Try again.", {
                        duration: 4000,
                        autoClose: false
                     });
                     $( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger " );
               }
            },
            
            error : function(oError){
               alert("An error ocurred. Please refresh.");
            } 
         }); 
      }, 
            
      _validateEmail : function(){

         var sEmail = this.getView().byId("emailInput").getValue();
         var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;

         if(!sEmail){
            MessageToast.show("Please enter an email adress.", {
               duration: 4000,
               autoClose: false
            });
            $( ".sapMMessageToast" ).addClass( "sapMMessageToastWarning " );
         }
         else if (!mailregex.test(sEmail)) {
            MessageToast.show(sEmail + " is not a valid email address!", {
               duration: 4000,
               autoClose: false
            });
            $( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger " );
         }
      },
   });
})