//CONTROLLER FOR THE DENIED TABLE FROM MANAGER


sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
], function (BaseController, MessageToast, History, UIComponent, Filter, FilterOperator, FilterType) {
   "use strict";

    return BaseController.extend("intern2020.controller.ManagerDenied", {

        onInit : function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("managerDenied").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function(oEvent) {
        
            this._onFilterUser();
        },

		_onFilterUser : function () {

			var aFilter = new Filter({
                path: 'Status',
                operator: 'EQ',
                value1: 'DENIED'
			});
			
			var oTileValueTBA = this.getView().byId("managerDenied_table");
				
			this.getView().getModel().read("/TripSet/$count", {
				filters: [aFilter],
	
				success: function(oData, oResponse){
					var count = Number(oResponse.body);
					oTileValueTBA.setText("Business Trips (" + count + ")"); 
				}
			});
        },
		
		/*
        * When you press the table tile -> navTo detailDenied page
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
        * When you press the navigation button -> navTo previous page/dashboardManager
        */
        _onNavBack : function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("dashboardManager", {}, true);
			}
		}
    });
});