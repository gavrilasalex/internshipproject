//CONTROLLER FOR THE APPROVED TABLE FROM MANAGER

sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, MessageToast, History, UIComponent, Filter, FilterOperator) {
   "use strict";

    return BaseController.extend("intern2020.controller.ManagerApproved", {

		onInit : function() {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("managerApproved").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function(oEvent) {
        
            this._onFilterUser();
		},
		
		_onFilterUser : function () {

			var oFilter = new Filter({
                path: 'Status',
                operator: 'EQ',
                value1: 'APPROVED'
			});
			
			var oTileValueA = this.getView().byId("title_managerA");
				
			this.getView().getModel().read("/TripSet/$count", {
				filters: [oFilter],
	
				success: function(oData, oResponse){
					var nCount = Number(oResponse.body);
					oTileValueA.setText("Business Trips (" + nCount + ")"); 
				}
			});
        },

		/*
        * When you press the table tile -> navTo detailApproved page
        */
		_onPress: function (oEvent) {

			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext();

			this.getRouter().navTo("detailApproved",{
                employeeId : oCtx.getProperty("Id"),
				employeeEmail : oCtx.getProperty("EmailAddress")
			});
		}
    });
});