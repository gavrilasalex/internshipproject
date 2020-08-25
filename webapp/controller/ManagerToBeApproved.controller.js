/*
*MANAGER TO BE APPROVED 
*the manager can see ALL the to be approved business trips from the data base and he 
*can see the details about a selected business trip 
*/

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

		/*
        * Filters the business trips from the data base after status 
        * 
        * @param {Object} [oFilter] building a filter for 'equals status'
        * @param {Object} [oTileValueTBA] the value (empty) for the page title
        * 
        * After the binding we count the rows so the manager can see how many BTs appear for the status 
        * [oTileValueTBA] is set to "Business Trips" and the number of entries
        */
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
        * When you press the table row -> navTo detailToBeApproved page
        * The navigation is made based on the email (from login) and id of the user
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