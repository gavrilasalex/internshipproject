//CONTROLLER FOR THE APPROVED TABLE FROM USER

sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType"
], function (BaseController, MessageToast, History, UIComponent, Filter, FilterOperator, FilterType) {
   "use strict";

    return BaseController.extend("intern2020.controller.UserBT", {

        onInit : function(oEvent) {

            this.getView().setBusy(true);

            this._Page = this.byId("page_user");
            this._Page.setFloatingFooter(!this._Page.getFloatingFooter());
            
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("userBT").attachMatched(this._onRouteMatched, this)
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
            
            this.getView().setBusy(false);
            var oArgs = oEvent.getParameter("arguments");
            this._onFilterUser(oArgs.employeeEmail);
        },

        _onFilterUser : function (email) {

			var aFilter = [];
            aFilter.push(new Filter("EmailAddress", FilterOperator.EQ, email));
            var oTileValueTBA = this.getView().byId("titleUser");

			var oList = this.getView().byId("userTable");
			var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
            
            this.getView().getModel().read("/TripSet/$count", {
                filters: [aFilter],

                success: function(oData, oResponse){
                    var count = Number(oResponse.body);
                    oTileValueTBA.setText("My request (" + count + ")");   
                }
            });
        },
        
        _onFilterSelect : function (oEvent) {

            var sStatus = oEvent.getParameter("selectedItem").getKey("key");

            if(sStatus === "ALL"){
                var oList = this.getView().byId("userTable");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter, FilterType.Application);
            }
            else
            {
                var aFilter = [new Filter("Status", FilterOperator.EQ, sStatus.toUpperCase())];
                var oList = this.getView().byId("userTable");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter, FilterType.Application);
            }
        },

        toggleVisibility: function () {
            this._Page.setShowFooter(!this._Page.getShowFooter());
		}, 
		
        toggleFooter: function () {
			this._Page.setFloatingFooter(!this._Page.getFloatingFooter());
		},

        /*
        * When you press the table tile -> navTo detailApproved page
        */
		_onPress: function (oEvent) {
            
			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext();
			this.getRouter().navTo("detailDenied",{
                employeeId : oCtx.getProperty("Id"),
				employeeEmail : oCtx.getProperty("EmailAddress")
			});
        },

        _onAddTripPress: function (oEvent) {
            
			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext();
			this.getRouter().navTo("newTrip");
        },
        
		/*
        * When you press the sign out button -> navTo login page
        *
        * Set /Username to "" -> bActive is set to /false/
        */
	   _onSignOutPress : function(oEvent) {

			var oModel = this.getView().getModel("sUsername");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			if(!(oModel === undefined)){
				oModel.setProperty("/Username", "");
			}
			oRouter.navTo("login");
		}
    });
});