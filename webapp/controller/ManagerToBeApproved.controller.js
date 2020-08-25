//CONTROLLER FOR THE TO BE APPROVED TABLE FROM MANAGER

sap.ui.define([
    "intern2020/controller/BaseController",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
], function (BaseController, MessageToast, History, UIComponent, Filter) {
   "use strict";

    return BaseController.extend("intern2020.controller.ManagerToBeApproved", {

		onInit : function() {
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("managerToBeApproved").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function(oEvent) {
        
            this._onFilterUser();
        },

		_onFilterUser : function () {

			var oFilter = new Filter({
                path: 'Status',
                operator: 'EQ',
                value1: 'IN PROGRESS'
			});
			
			var oTileValueTBA = this.getView().byId("title_managerTBA");
				
			this.getView().getModel().read("/TripSet/$count", {
				filters: [oFilter],
	
				success: function(oData, oResponse){
					var nCount = Number(oResponse.body);
					oTileValueTBA.setText("Business Trips (" + nCount + ")"); 
				}
			});
        },

		/*
        * When you press the table tile -> navTo detailToBeApproved page
        */
		_onPress: function (oEvent) {

			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext();

			this.getRouter().navTo("detailToBeApproved",{
                employeeId : oCtx.getProperty("Id"),
				employeeEmail : oCtx.getProperty("EmailAddress")
			});
		}
    });
});