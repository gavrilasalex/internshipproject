/*
*DETAIL TO BE APPROVED 
*the manager can see the detail about the selected business trip from the form
*/

sap.ui.define([
	"intern2020/controller/BaseController",
	"sap/ui/core/Fragment",
	'sap/m/MessageToast',
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
], function (BaseController, Fragment, MessageToast, History, UIComponent) {
   "use strict";

    return BaseController.extend("intern2020.controller.DetailToBeApproved", {

		/* 
        *  Setting the floating footer 
        *  Matching the route from the login page based on email and id
        */
        onInit : function() {

			this._Page = this.byId("page_toBeApproved");
			this._Page.setFloatingFooter(!this._Page.getFloatingFooter());

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detailToBeApproved").attachMatched(this._onRouteMatched, this);
		},
		
		/*
		* Populating the form with the data from oData
		*/
		_onRouteMatched : function(oEvent) {
            
            var oArgs = oEvent.getParameter("arguments");
			var oView = this.getView();

            oView.bindElement({
				path : "/TripDetailsSet(Id='" + oArgs.employeeId + "',EmailAddress='" + oArgs.employeeEmail + "')",
            });
		},
		
		/*
		* Opens the Reject Dialog to enter a reason
		*/
		_onRejectPress : function (oEvent) {
			var oView = this.getView();

			if (!this.byId("dialog_reject")) {
				
				Fragment.load({
					id: oView.getId(),
          			name: "intern2020.view.RejectionDialog",
          			controller: this
				}).then(function (oDialog) {
					
					oView.addDependent(oDialog);
					oDialog.open();

					var sReason = oView.byId("textArea_reject").mProperties.value;
					oView.byId("button_reject").setEnabled(sReason.length > 0);
				});
			} else {
				this.byId("dialog_reject").open();

				var sReason = oView.byId("textArea_reject").mProperties.value;
				this.byId("button_reject").setEnabled(sReason.length > 0);
			}
		},

		_onChangeReason : function(){
			var oView = this.getView();
			var sReason = oView.byId("textArea_reject").mProperties.value;
			this.byId("button_reject").setEnabled(sReason.length > 0);
		},

		/*
		*Function for the Submit Button in Dialog
		*
		*On press: the dialog closes and a rejection message appears on screen.
		*The status is changed to 'DENIED'
		*/
		_onSubmitReject : function (oEvent) {

			var oView = this.getView();
			var oModel = oView.getModel();
			var that = this;
			 
			var sId = oEvent.getSource().getBindingContext().getObject().Id;
			var sReason = oView.byId("textArea_reject").mProperties.value;
			this.byId("button_reject").setEnabled(sReason.length > 0);


			oModel.callFunction("/Deny", {
										method: "POST",
										urlParameters: {
												Id: sId,
												Observations: sReason
										},
				success : function(oData, response) {
					that.byId("dialog_reject").close();

					MessageToast.show("Business trip denied!", {
						duration: 10000
					});
					$( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger" );

					that._onNavBack();
				},

				error : function(oError){
					that.byId("dialog_reject").close();

					MessageToast.show("Something went wrong...", {
						duration: 10000
					});
					$( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger" );
				}
			});

		},

		/*
		*Function for the Cancel Button in Dialog
		*On press: the dialog closes 
		*/
		_onCancelReject : function(oEvent){
			var oView = this.getView();
			var sReason = oView.byId("textArea_reject").mProperties.value;
			sReason = oView.byId("textArea_reject").setValue();
			this.byId("dialog_reject").close();
		},
		
		/*
		* Opens the Reject Dialog to enter a reason
		*/
		_onApprovedPress : function (oEvent) {

			var oView = this.getView();

			
			if (!this.byId("dialog_approved")) {
				
				Fragment.load({
					id: oView.getId(),
          			name: "intern2020.view.ApproveDialog",
          			controller: this
				}).then(function (oDialog) {
					
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("dialog_approved").open();
			}
		},

		/*
		*Function for the Submit Button in Dialog
		*
		*On press: the dialog closes and a rejection message appears on screen.
		*The status is changed to 'APPROVED'
		*/
		_onSubmitApprove : function (oEvent){

			var oView = this.getView();
			var oModel = oView.getModel();
			var sId = oEvent.getSource().getBindingContext().getObject().Id;
			var that = this;
			
			oModel.callFunction("/Approve", {
											method: "POST",
											urlParameters: {
												Id: sId
											},
				success : function(oData,response){
					that.byId("dialog_approved").close();

					MessageToast.show("Business trip approved!", {
						duration: 10000
					});
					$( ".sapMMessageToast" ).addClass( "sapMMessageToastSuccess" );

					that._onNavBack();
				},

				error : function(oError){
					that.byId("dialog_approved").close();
					
					MessageToast.show("Something went wrong...", {
						duration: 10000
					});
					$( ".sapMMessageToast" ).addClass( "sapMMessageToastDanger" );
				},
			});
		},
		
		/*
		*Function for the Cancel Button in Dialog
		*On press: the dialog closes 
		*/
		_onCancelApprove : function(oEvent){
			this.byId("dialog_approved").close();
		},

		_onNavBack: function () {
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