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
	"sap/ui/table/library",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterType",
	"sap/ui/model/FilterOperator",
], function (BaseController, MessageToast, History, UIComponent, library, Filter, FilterType, FilterOperator, Sorter) {
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
		
		_onSearch : function (oEvent) {

			var sQuery = oEvent.getParameter("query");

            if(sQuery)
            {
				// var aFilter = [new Filter("LastName", FilterOperator.Contains, sQuery)];
				var aFilter = [];
				aFilter.push(new Filter("LastName", FilterOperator.EQ, sQuery));

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

		// sortDeliveryDate : function(oEvent) {
		// 	var oDeliveryDateColumn = this.byId("column_date");

		// 	oEvent.preventDefault();

		// 	var sOrder = oEvent.getParameter("sortOrder");
		// 	var oDateFormat = DateFormat.getDateInstance({pattern: "dd/MM/yyyy"});

		// 	oDeliveryDateColumn.setSorted(true);
		// 	oDeliveryDateColumn.setSortOrder(sOrder);

		// 	var oSorter = new Sorter(oDeliveryDateColumn.getSortProperty(), sOrder === SortOrder.Descending);

		// 	oSorter.fnCompare = function(a, b) {
		// 		if (b == null) {
		// 			return -1;
		// 		}
		// 		if (a == null) {
		// 			return 1;
		// 		}

		// 		var aa = oDateFormat.parse(a).getTime();
		// 		var bb = oDateFormat.parse(b).getTime();

		// 		if (aa < bb) {
		// 			return -1;
		// 		}
		// 		if (aa > bb) {
		// 			return 1;
		// 		}
		// 		return 0;
		// 	};

		// 	this.byId("table_managerTBA").getBinding("items").sort(oSorter);
		// },

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