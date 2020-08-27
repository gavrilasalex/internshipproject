/*
*USER DASHBOARD 
*the user can see ONLY his business trips, can filter after status, 
*can see the details about a selected business trip and can add a new trip
*/

sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
], function (BaseController, MessageToast, Filter, FilterOperator, FilterType) {
   "use strict";

    return BaseController.extend("intern2020.controller.UserBT", {

        bInitialLogin: true,

        /* 
        *  Setting the floating footer 
        *  Matching the route from the login page based on email
        */
        onInit : function(oEvent) {

            this.getView().setBusy(true);

            this._Page = this.byId("page_user");
            this._Page.setFloatingFooter(!this._Page.getFloatingFooter());
            
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("userBT").attachMatched(this._onRouteMatched, this)
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
            this._onFilterUser(oArgs.employeeEmail);
        },


        /*
        * Filters the business trips from the data base after email so the user can see ONLY his BT
        * 
        * @param {Array} [aFilter] building a filter for 'equals email'
        * @param {Object} [oValue] the value (empty) for the page title
        * @param {Object} [oList] the list (empty) of values from the table which needs to be populated
        * @param {Object} [oBinding] we're binding the BTs from the items path to [oList] and filter them after email
        * 
        * After the binding we count the rows so the user can see how many BTs he has
        * [oValue] is set to "My request" and the number of entries
        */
        _onFilterUser : function (sEmail) {

			var aFilter = [];
            aFilter.push(new Filter("EmailAddress", FilterOperator.EQ, sEmail));
            var oValue = this.getView().byId("title_user");

			var oList = this.getView().byId("table_user");
			var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
            
            this.getView().getModel().read("/TripSet/$count", {
                filters: [aFilter],

                success: function(oData, oResponse){
                    var nCount = Number(oResponse.body);
                    oValue.setText("My request (" + nCount + ")"); 
                }
            });
        },
        
        /*
        * Filters the business trips from the data base after status so the user can see only approved/in progress/denied BTs
        * 
        * @param {String} [sStatus] the selected status from the 'select' option 
        * 
        * IF the user want to see all his BTs: th table is populated using only the email filter, no status
        * @param {Object} [oList] the list (empty) of values from the table which needs to be populated
        * @param {Object} [oBinding] we're binding the BTs from the items path to [oList] and filter them after email
        * 
        * IF the user wants to see only approved/in progress/denied BTs: 
        * @param {Array} [aFilter] building a filter for 'equals status'
        * @param {Object} [oList] the list of values from the table which needs to be filtered
        * @param {Object} [oBinding] we're binding the BTs from the items path to [oList] and filter them after status
        */
        _onFilterSelect : function (oEvent) {

            var sStatus = oEvent.getParameter("selectedItem").getKey("key");

            if(sStatus === "ALL"){

                var oList = this.getView().byId("table_user");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter, FilterType.Application);
            }
            else
            {
                var aFilter = [new Filter("Status", FilterOperator.EQ, sStatus.toUpperCase())];
                var oList = this.getView().byId("table_user");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter, FilterType.Application);
            }
        },

        /*
        * When you press the table row -> navTo detailDenied page
        * The navigation is made based on the email (from login) and id of the user
        */
		_onPress: function (oEvent) {
            
			var oItem = oEvent.getSource();
            var oCtx = oItem.getBindingContext();
            
			this.getRouter().navTo("detailDenied",{

                employeeId : oCtx.getProperty("Id"),
				employeeEmail : oCtx.getProperty("EmailAddress")
			});
        },

        /*
        * When you press the table row -> navTo newTrip page
        */
        _onAddTripPress: function (oEvent) {
            var oModel = this.getView().getModel("oUsername");
            var oUsername2 = {"Username" : oModel.getProperty("/Username")};
            var oModelData = new sap.ui.model.json.JSONModel(oUsername2);
            this.getOwnerComponent().setModel(oModelData, "oUsername2");
            this.getRouter().navTo("newTrip");
        }
    });
});