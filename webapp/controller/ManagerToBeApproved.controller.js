/*
*MANAGER TO BE APPROVED 
*the manager can see ALL the to be approved business trips from the data base and he 
*can see the details about a selected business trip 
*/

sap.ui.define([
    "intern2020/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterType",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
], function (BaseController, Filter, FilterType, FilterOperator, History, UIComponent) {
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
        * @param {Array} [aFilter] building a filter for 'equals email'
        * @param {Object} [oValue] the value (empty) for the page title
        * @param {Object} [oList] the list (empty) of values from the table which needs to be populated
        * @param {Object} [oBinding] we're binding the BTs from the items path to [oList] and filter them after email
        * 
        * After the binding we count the rows so the user can see how many BTs he has
        * [oValue] is set to "Business Trips" and the number of entries
        */
		_onFilterUser : function () {

			var aFilter = [];
			aFilter.push(new Filter("Status", FilterOperator.EQ, "IN PROGRESS"));
			
			var oValue = this.getView().byId("title_managerTBA"); 
			var oList = this.getView().byId("table_managerTBA");
			var oBinding = oList.getBinding("items");

			oBinding.filter(aFilter);
            
            this.getView().getModel().read("/TripSet/$count", {
				filters: [aFilter],
	
				success: function(oData, oResponse){
					var nCount = Number(oResponse.body);
					oValue.setText("Business Trips (" + nCount + ")"); 
				}
			});
		},
		
		/*
        * Filters the business trips from the data base after lastName or firstName
        * 
        * @param {String} [sQuery] the selected name from the search field
        * 
        * IF the search field is empty: th table is populated using only the email filter, no lastName/firstName
        * @param {Object} [oList] the list (empty) of values from the table which needs to be populated
        * @param {Object} [oBinding] we're binding the BTs from the items path to [oList] and filter them after email
        * 
        * IF the search field is has a value:
        * @param {Array} [aFilter] building a filter for 'Contains name'
        * @param {Object} [oList] the list of values from the table which needs to be filtered
        * @param {Object} [oBinding] we're binding the BTs from the items path to [oList] and filter them after name
        */
		_onSearch : function (oEvent) {

			var sQuery = oEvent.getParameter("query");

            if(sQuery)
            {	
				sQuery = sQuery.substring(0,1).toUpperCase()+ sQuery.substring(1,sQuery.length);

				var aFilter = new Filter({
					filters: [
					  new Filter("LastName", FilterOperator.Contains, sQuery),
					]
				});

                var oList = this.getView().byId("table_managerTBA");
				var oBinding = oList.getBinding("items");
				
                oBinding.filter(aFilter, FilterType.Application);
			}
			else{
				var oList = this.getView().byId("table_managerTBA");
				var oBinding = oList.getBinding("items");
				
                oBinding.filter(aFilter, FilterType.Application);
			}
		},
		
		_handleAppointmentSelect: function(oEvent){

			var oItem = oEvent.getParameter("appointment")
			var oCtx = oItem.getBindingContext();

			if(oCtx.getProperty("Status") === "APPROVED"){

				this.getRouter().navTo("detailApproved",{
					employeeId : oCtx.getProperty("Id"),
					employeeEmail : oCtx.getProperty("EmailAddress")
				});
			}
			else{
				this.getRouter().navTo("detailToBeApproved",{
					employeeId : oCtx.getProperty("Id"),
					employeeEmail : oCtx.getProperty("EmailAddress")
				});
			}
		},

		_formatCalendarHighlight: function (oValue) {
			if (oValue === "IN PROGRESS") {
				return "Type06";
			} else if (oValue === "APPROVED") {
				return "Type08";
			}
			return "None";
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
		},

		_onNavBack: function () {
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