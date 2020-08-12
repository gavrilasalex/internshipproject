//CONTROLLER FOR THE TO BE APPROVED FORM

sap.ui.define([
	"intern2020/controller/BaseController",
	"sap/ui/core/Fragment",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (BaseController, Fragment, MessageToast, History, UIComponent) {
   "use strict";

    return BaseController.extend("intern2020.controller.DetailToBeApproved", {

        onInit : function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detailToBeApproved").attachMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched : function(oEvent) {
            
            var oArgs = oEvent.getParameter("arguments");
			var oView = this.getView();

            oView.bindElement({
				path : "/TripDetailsSet(Id='" + oArgs.employeeId + "',EmailAddress='" + oArgs.employeeEmail + "')",
            });
        },
		
		//Function for the Reject Button in To be approved form
		_onRejectPress : function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.byId("rejectDialog")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
          			name: "intern2020.view.RejectionDialog",
          			controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("rejectDialog").open();
			}
		},

		/*
		*Function for the Submit Button in Dialog
		*
		*On press: the dialog closes and a rejection message appears on screen.
		*/
		_onSubmitDialog : function () {
			this.byId("rejectDialog").close();

			MessageToast.show("Business trip denied!", {
				duration: 10000
			});
			$( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger" );
		},
		
		/*
		*Function for the Approve Button in To be approved form
		*
		*On press: the dialog closes and a rejection message appears on screen.
		*/
		_onApprovedPress : function (){
			 
			MessageToast.show("Business trip approved!", {
				duration: 10000
			});
			$( ".sapMMessageToast" ).addClass( "sapMMessageToastSuccess" );
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
				oRouter.navTo("managerToBeApproved", {}, true);
			}
		}
    });
});