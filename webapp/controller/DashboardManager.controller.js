/*
*MANAGER DASHBOARD
*the manger can select which business trips to see based on the status
*/

sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/model/Filter",
], function (BaseController, MessageToast, Filter) {
   "use strict";

    return BaseController.extend("intern2020.controller.DashboardManager", {

        bInitialLogin: true,
        
        /* 
        *  Matching the route from the login page based on email
        */
        onInit : function() {

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("dashboardManager").attachMatched(this._onRouteMatched, this); 
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

            this.getTileValue();
        },

        /*
        * Filters the business trips from the data base after status 
        * 
        * @param {Array} [oFilterTBA, oFilterA, oFilterD] building a filter for 'equals status'
        * @param {Object} [oTileValueTBA, oTileValueA, oTileValueD] the value (empty) for the tiles
        * 
        * After the binding we count the rows so the manager can see how many BTs he has based on the status
        * [oTileValueTBA, oTileValueA, oTileValueD] are set to the number of entries
        */
        getTileValue: function () {
            var oTileValueTBA = this.getView().byId("numericContent_TBA");
            var oTileValueA = this.getView().byId("numericContent_A");
            var oTileValueD = this.getView().byId("numericContent_D");
            var oFilterTBA,oFilterA,oFilterD;

            oFilterTBA = new Filter({
                path: 'Status',
                operator: 'EQ',
                value1: 'IN PROGRESS'
            });

            oFilterA = new Filter({
                path: 'Status',
                operator: 'EQ',
                value1: 'APPROVED'
            });

            oFilterD = new Filter({
                path: 'Status',
                operator: 'EQ',
                value1: 'DENIED'
            });

            this.getView().getModel().read("/TripSet/$count", {
                filters: [oFilterTBA],

                success: function(oData, oResponse){
                    var nCount = Number(oResponse.body);
                    oTileValueTBA.setValue(nCount);   
                }
            });

            this.getView().getModel().read("/TripSet/$count", {
                filters: [oFilterA],

                success: function(oData, oResponse){
                    var nCount2 = Number(oResponse.body);
                    oTileValueA.setValue(nCount2);   
                }
            });

            this.getView().getModel().read("/TripSet/$count", {
                filters: [oFilterD],

                success: function(oData, oResponse){
                    var nCount3 = Number(oResponse.body);
                    oTileValueD.setValue(nCount3);   
                }
            });
        },

        /*
        * When you press the To Be Approved Tile -> navTo managerToBeApproved page
        */
        _onPressToBeApproved : function (oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("managerToBeApproved");
        },
        
        /*
        * When you press the Approved Tile -> navTo managerApproved page
        */
        _onPressApproved : function (oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("managerApproved");
        },
        
        /*
        * When you press the Denied Tile -> navTo managerDenied page
        */
        _onPressDenied : function (oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("managerDenied");
		},

    });
});