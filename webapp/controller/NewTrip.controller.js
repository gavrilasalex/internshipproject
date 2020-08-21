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
			 
			this.byId("startInput").setMinDate(new Date());
			this.byId("endInput").setMinDate(new Date());
		},

		_onSavePress : function(oEvent){
            var oView = this.getView();
            var oModel = oView.getModel();
            var sEmail = oView.byId("emailInput").getValue();
            var sStartDate = oView.byId("startInput").getValue();
            var sEndDate = oView.byId("endInput").getValue();
			var sNoDays = oView.byId("noDaysInput").getValue();
            var sJob = oView.byId("jobInput").getValue();
			var sClient = oView.byId("clientInput").getValue();
			var sReason = oView.byId("reasonInput").getValue();
            var sCountry = oView.byId("countryInput").getValue();
            var sCity = oView.byId("cityInput").getValue();
            var sRequester = oView.byId("requesterInput").getValue();
            var sRate = oView.byId("rateInput").getValue();
			var sMeals = oView.byId("mealsInput").getValue();
			var sFood = oView.byId("foodInput").getValue();
            var sRental = oView.byId("rentalInput").getValue();
            var sGas = oView.byId("gasInput").getValue();
            var sAllowance = oView.byId("allowanceInput").getValue();
            var sTrain = oView.byId("trainInput").getValue();
			var sBank = oView.byId("bankInput").getValue();
			var sIt = oView.byId("itInput").getValue();
            var sAirfare = oView.byId("airfareInput").getValue();
            var sOffice = oView.byId("officeInput").getValue();
            var sHotel = oView.byId("hotelInput").getValue();
			var sApayment = oView.byId("apaymentInput").getSelectedItem().getText();
			var sAsum = oView.byId("asumInput").getValue();
			var sCurrency = oView.byId("currencyInput").getSelectedItem().getText();
			var sExchange = oView.byId("exchangeInput").getValue();

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
                error : function(oData){
					MessageToast.show("Failed to add trip.");
					$( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger" );
            }
            });
		},
		
		toggleVisibility: function () {
            this._Page.setShowFooter(!this._Page.getShowFooter());
		}, 
		
        toggleFooter: function () {
			this._Page.setFloatingFooter(!this._Page.getFloatingFooter());
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
		},

		
		/*
        * When you press the navigation button -> navTo previous page/managerToBeApproved
        */
        _onNavBack : function () {
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