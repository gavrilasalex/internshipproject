//CONTROLLER FOR THE TO BE APPROVED FORM

sap.ui.define([
	"intern2020/controller/BaseController",
	"sap/ui/core/Fragment",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (BaseController, Fragment, MessageToast, History, UIComponent) {
   "use strict";

    return BaseController.extend("intern2020.controller.NewTrip", {

        onInit : function() {

			this._Page = this.byId("page_newTrip");
			this._Page.setFloatingFooter(!this._Page.getFloatingFooter());
			 
			this.byId("input_startDate").setMinDate(new Date());
			this.byId("input_endDate").setMinDate(new Date());
		},

		_onSavePress : function(oEvent){
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
		},

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