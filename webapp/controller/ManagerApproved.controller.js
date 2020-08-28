/*
*MANAGER APPROVED
*the manager can see ALL the approved business trips from the data base and he 
*can see the details about a selected business trip
*/

sap.ui.define([
    "intern2020/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
], function (BaseController, Filter, FilterOperator, FilterType) {
   "use strict";

    return BaseController.extend("intern2020.controller.ManagerApproved", {

	onInit : function() {

		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.getRoute("managerApproved").attachMatched(this._onRouteMatched, this);
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
		aFilter.push(new Filter("Status", FilterOperator.EQ, "APPROVED"));

		var oValue = this.getView().byId("title_managerA");
		var oList = this.getView().byId("table_managerA");
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
			var aFilter = new Filter({
				filters: [
				  new Filter("LastName", FilterOperator.Contains, sQuery),
				  new Filter("FirstName", FilterOperator.Contains, sQuery),
				],
				and: false,
			});

			var oList = this.getView().byId("table_managerA");
			var oBinding = oList.getBinding("items");

			oBinding.filter(aFilter, FilterType.Application);
		}
		else{
			var oList = this.getView().byId("table_managerA");
			var oBinding = oList.getBinding("items");
			
			oBinding.filter(aFilter, FilterType.Application);
		}
	},

	/*
    * When you press the table row -> navTo detailApproved page
    * The navigation is made based on the email (from login) and id of the user
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