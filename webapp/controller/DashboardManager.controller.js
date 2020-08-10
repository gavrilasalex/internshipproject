//CONTROLLER FOR MANAGER DASHBOARD

sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
], function (BaseController, MessageToast) {
   "use strict";

    return BaseController.extend("intern2020.controller.DashboardManager", {

        // Recives the Username from the login page
        onInit : function() {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("dashboardManager").attachMatched(this._onRouteMatched, this); 
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
                $( ".sapMMessageToast" ).addClass( "sapMMessageToastSuccess" );
            }
        },

        /*
        * When you press the To Be Approved Tile -> navTo managerToBeApproved page
        */
        _onPressToBeApproved : function (oEvent) {

			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("managerToBeApproved");
        },
        
        /*
        * When you press the Approved Tile -> navTo managerToBeApproved page
        */
        _onPressApproved : function (oEvent) {

			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("managerApproved");
        },
        
        /*
        * When you press the Denied Tile -> navTo managerDenied page
        */
        _onPressDenied : function (oEvent) {

			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("managerDenied");
		},

        /*
        * When you press the sign out button -> navTo login page
        *
        * Set /Username to "" -> bActive is set to /false/
        */
        _onSignOutPress : function() {

            var oModel = this.getView().getModel("sUsername");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            if(!(oModel === undefined)){
                oModel.setProperty("/Username", "");
            }
            oRouter.navTo("login");
        }
    });
});