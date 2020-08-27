/*
*ADD NEW TRIP 
*the user can add a new trip to the data base using form and input fields
*/

sap.ui.define([
	"intern2020/controller/BaseController",
	"sap/ui/core/Fragment",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter",
], function (BaseController, Fragment, MessageToast, History, UIComponent, Filter) {
   "use strict";

    return BaseController.extend("intern2020.controller.NewTrip", {

		/* 
        *  Setting the floating footer 
        *  Setting the startDate and endDate so the user can't select a date earlier than the current day
        */
        onInit : function() {

			this._Page = this.byId("page_newTrip");
			this._Page.setFloatingFooter(!this._Page.getFloatingFooter());
			 
			this.byId("input_startDate").setMinDate(new Date());
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("newTrip").attachMatched(this._onRouteMatched, this)

		},

		_onRouteMatched : function(oEvent) {

			var oModel = this.getView().getModel("oUsername2");
			var oInput = this.getView().byId("input_email");
			var oInput2 = this.getView().byId("input_requester");

			oInput.setValue(oModel.oData.Username);

			var oFilter = new Filter({
                path: 'EmailAddress',
                operator: 'EQ',
                value1: oModel.oData.Username
            });

            this.getView().getModel().read("/TripSet", {
                filters: [oFilter],

                success: function(oData, oResponse){
					var sFname = oData.results[0].FirstName;
					var sLname = oData.results[0].LastName;
                    oInput2.setValue(sFname + " " + sLname);   
                }
            });


        },

		/*
		*  Funtion used to create a new entry in the data base from the UI
		*  All the parameters are taken from input fields entered by the user
		*  Then we're sending the data to oData to create a new BT
		*  A message will show based on the succes/error message sent from oData
		*/

		_onSavePress : function (oEvent) {
			var oView = this.getView();
	
			if (!this.byId("dialog_newTrip")) {
				
				Fragment.load({
					id: oView.getId(),
					  name: "intern2020.view.NewDialog",
					  controller: this
				}).then(function (oDialog) {
					
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("dialog_newTrip").open();
			}
		},

		_onSubmitNewTrip : function(oEvent){
            var oView = this.getView();
            var oModel = oView.getModel();
            var sEmail = oView.byId("input_email").getValue();
            var sStartDate = oView.byId("input_startDate").getValue();
            var sEndDate = oView.byId("input_endDate").getValue();
			var sNoDays = oView.byId("input_noDays").getValue();
            var sJob = oView.byId("input_jobNumber").getValue();
			var sClient = oView.byId("input_client").getValue();
			var sReason = oView.byId("input_reason").getValue();
            var sCountry = oView.byId("input_country").getValue();
            var sCity = oView.byId("input_city").getValue();
            var sRequester = oView.byId("input_requester").getValue();
            var sRate = oView.byId("input_rate").getValue();
			var sMeals = oView.byId("input_meals").getValue();
			var sFood = oView.byId("input_food").getValue();
            var sRental = oView.byId("input_car").getValue();
            var sGas = oView.byId("input_gas").getValue();
            var sAllowance = oView.byId("input_allowance").getValue();
            var sTrain = oView.byId("input_train").getValue();
			var sBank = oView.byId("input_bank").getValue();
			var sIt = oView.byId("input_it").getValue();
            var sAirfare = oView.byId("input_airFare").getValue();
            var sOffice = oView.byId("input_office").getValue();
            var sHotel = oView.byId("input_hotel").getValue();
			var sApayment = oView.byId("input_aPayment").getSelectedItem().getText();
			var sAsum = oView.byId("input_aSum").getValue();
			var sCurrency = oView.byId("input_currency").getSelectedItem().getText();
			var sExchange = oView.byId("input_exchange").getValue();

            oModel.create("/NewTripSet",
            {	
				Id: "",
				EmailAddress: sEmail,
				StartTrip: sStartDate,
				EndTrip: sEndDate,
				NoOfDays: sNoDays,
				JobNumber: sJob,
				Client: sClient,
				Reason: sReason,
				TravelCountry: sCountry,
				TravelCity: sCity,
				Requester: sRequester,
				PerDiemRate: sRate,
				BusinessMeals: sMeals,
				FoodBeverages: sFood,
				RentalCar: sRental,
				GasForPrivateCar: sGas,
				PerDiemAllowance: sAllowance,
				TrainTickets: sTrain,
				BankCharges: sBank,
				ItSupplies: sIt,
				AirFare: sAirfare,
				OfficeSupplies: sOffice,
				HotelCosts: sHotel,
				AdvancePayment: sApayment,
				AdvanceSum: sAsum,
				Currency: sCurrency,
				ExchangeRate: sExchange
            },
            {
                success : function(oData){

					MessageToast.show("Trip for " + oData.EmailAddress + " created.");
					$( ".sapMMessageToast" ).addClass( "sapMMessageToastSuccess" );
            	},
                error : function(){

					MessageToast.show("Failed to add trip.");
					$( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger" );
            	}
			});
			
			var sEmail = oView.byId("input_email").setValue();
            var sStartDate = oView.byId("input_startDate").setValue();
            var sEndDate = oView.byId("input_endDate").setValue();
			var sNoDays = oView.byId("input_noDays").setValue();
            var sJob = oView.byId("input_jobNumber").setValue();
			var sClient = oView.byId("input_client").setValue();
			var sReason = oView.byId("input_reason").setValue();
            var sCountry = oView.byId("input_country").setValue();
            var sCity = oView.byId("input_city").setValue();
            var sRequester = oView.byId("input_requester").setValue();
            var sRate = oView.byId("input_rate").setValue();
			var sMeals = oView.byId("input_meals").setValue();
			var sFood = oView.byId("input_food").setValue();
            var sRental = oView.byId("input_car").setValue();
            var sGas = oView.byId("input_gas").setValue();
            var sAllowance = oView.byId("input_allowance").setValue();
            var sTrain = oView.byId("input_train").setValue();
			var sBank = oView.byId("input_bank").setValue();
			var sIt = oView.byId("input_it").setValue();
            var sAirfare = oView.byId("input_airFare").setValue();
            var sOffice = oView.byId("input_office").setValue();
            var sHotel = oView.byId("input_hotel").setValue();
			var sAsum = oView.byId("input_aSum").getValue();
			var sExchange = oView.byId("input_exchange").setValue();
		},

		_onCancelNewTrip : function(oEvent){
			this.byId("dialog_newTrip").close();
		},

		handleChange: function(oEvent){
			var sDate = oEvent.getParameter("newValue");
			var oDate = new Date(sDate);
			this.byId("input_endDate").setMinDate(oDate);
			this.byId("input_endDate").setValue();
		},

		handleChange2: function(oEvent){

			var dStart = this.byId("input_startDate").getDateValue();
			var dEnd = this.byId("input_endDate").getDateValue();
			var diff = Math.abs(dStart.getTime() - dEnd.getTime());
			var diffD = Math.ceil(diff / (1000 * 60 * 60 * 24)); 
			diffD.toString();

			this.getView().byId("input_noDays").setValue(diffD);
		},

		onChangeRate: function(oEvent){
			var sNoDays = this.getView().byId("input_noDays").getValue();
			parseInt(sNoDays);
			var sRate = oEvent.getParameter("newValue");
			parseInt(sRate);
			var sAllowance = sNoDays * sRate;
			sAllowance.toString();
			this.getView().byId("input_allowance").setValue(sAllowance);
		},
		
		/*
		*  Cancel add new trip -> navTo userBT
		*/
		_onCancelPress : function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("userBT", {}, true);
			}
		}
    });
});