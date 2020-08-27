// CONTROLLER FOR LOGIN PAGE

sap.ui.define([
    "intern2020/controller/BaseController",
    "sap/ui/core/Fragment",
    'sap/m/MessageToast',
    'sap/m/Page'
], function (BaseController, Fragment, MessageToast, Page) {
   "use strict";

  return BaseController.extend("intern2020.controller.AdminDashboard", {

    bInitialLogin: true,

        /* 
        *  Setting the floating footer 
        *  Matching the route from the login page based on email
        */
        onInit : function(oEvent) {

            this.getView().setBusy(true);
            
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("adminDashboard").attachMatched(this._onRouteMatched, this)
		},

        /*
        * Matches the route for the email (and Username)
        * 
        * @param {Object} [oModel] gets the value sent from the login page for Username
        * @param {Boolean} [bActive] the variable is set to /true/
        * 
        * IF the Username is undefined or empty (the login was not done right/nothing is sent from the login page)
        * [bActive] the variable is set to /false/
        * 
        * IF [bActive] is false -> the login was not succesfull so the user can't see the page -> _onSignOutPress
        * ELSE IF bActive is true -> the login was succesfull
        *                         -> Welcome message shows up on the screen, customized with the Username (if it's the initial login)
        * 
        */
		_onRouteMatched : function(oEvent) {

            var bActive = true;
            var oModel = this.getView().getModel("oUsername");

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
                if(this.bInitialLogin){

                    MessageToast.show("Welcome " + oModel.getProperty("/Username") + "!", {
                        duration: 3000
                    });
                    $( ".sapMMessageToast" ).addClass( "sapMMessageToastSuccess" );
                    this.bInitialLogin = false;
                }
            }
            
            this.getView().setBusy(false);
            var oArgs = oEvent.getParameter("arguments");
        },

    _onCreatePress : function (oEvent) {
        var oView = this.getView();

        if (!this.byId("dialog_create")) {
            
            Fragment.load({
                id: oView.getId(),
                  name: "intern2020.view.CreateDialog",
                  controller: this
            }).then(function (oDialog) {
                
                oView.addDependent(oDialog);
                oDialog.open();
            });
        } else {
            this.byId("dialog_create").open();
        }
    },

    _onSubmitCreate : function (oEvent) {
        var oView = this.getView();
        var oModel = oView.getModel();

        var sEmail = oView.byId("input_email").getValue();
        var sPassword = oView.byId("input_password").getValue();
        var sConfirm = oView.byId("input_confirm").getValue();
        var sPosition = oView.byId("select_position").getSelectedItem().getText();

        if(sConfirm === sPassword){

            oModel.create("/UserSet",
            {
                Email: sEmail,
                Password: sPassword,
                UserPosition: sPosition
            },
            {
                success : function(oData){

                    MessageToast.show("User created.");
                    $( ".sapMMessageToast" ).addClass( "sapMMessageToastSuccess" );
                },
                error : function(){

                    MessageToast.show("Failed to add user.");
                    $( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger" );
                }
            });
        }
        else {
            MessageToast.show("The passwords don't match.");
            $( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger" );
        }

    }, 

    _onCancelCreate : function(oEvent){
        this.byId("dialog_create").close();
    },

    _onUpdatePress : function (oEvent) {
        var oView = this.getView();

        if (!this.byId("dialog_update")) {
            
            Fragment.load({
                id: oView.getId(),
                  name: "intern2020.view.UpdateDialog",
                  controller: this
            }).then(function (oDialog) {
                
                oView.addDependent(oDialog);
                oDialog.open();
            });
        } else {
            this.byId("dialog_update").open();
        }
    },

    _onSubmitUpdate : function(oEvent){
        var oView = this.getView();
        var oModel = oView.getModel();

        var sEmail = oView.byId("input_email").getValue();
        var sPassword = oView.byId("input_password").getValue();
        var sConfirm = oView.byId("input_confirm").getValue();
        var sPosition = oView.byId("select_position").getSelectedItem().getText();

        if(sConfirm === sPassword){
            oModel.update("/UserSet(Email='" + sEmail + "')",
            {
                Email: sEmail,
                Password: sPassword,
                UserPosition: sPosition
            },
            {
                success : function(oData){

                    MessageToast.show("User updated.");
                    $( ".sapMMessageToast" ).addClass( "sapMMessageToastSuccess" );

                    var sEmail = oView.byId("input_email").setValue();
                    var sPassword = oView.byId("input_password").setValue();
                    var sPosition = oView.byId("select_position").getSelectedItem().setText();
                },
                error : function(){

                    MessageToast.show("Failed to update user.");
                    $( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger" );
                }   
            });
        }
        else {
            MessageToast.show("The passwords don't match.");
            $( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger" );
        }
    },

    _onCancelUpdate : function(oEvent){
        this.byId("dialog_update").close();
    },

    /*
    * Function for email validation
    *
    * @param {String} [sEmail] email value from the Email Input
    * @param {String} [mailregex] regex for email validation -> eg: mail@adress.com
    * 
    * IF the email input field is empty -> warning message 
    * ELSE IF the email input value is not valid -> error message
    * 
    */
    _validateEmail : function(){

        var sEmail = this.getView().byId("input_email").getValue();
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
    }

  });
})