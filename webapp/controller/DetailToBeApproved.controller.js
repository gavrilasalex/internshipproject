//CONTROLLER FOR THE TO BE APPROVED FORM

sap.ui.define([
	"intern2020/controller/BaseController",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox",
    'sap/m/MessageToast',
    "sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (BaseController, Fragment, MessageBox, MessageToast, History, UIComponent) {
   "use strict";

    return BaseController.extend("intern2020.controller.DetailToBeApproved", {

        onInit : function() {

			this._Page = this.byId("page_toBeApproved");
			this._Page.setFloatingFooter(!this._Page.getFloatingFooter());

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
				});
			} else {
				this.byId("dialog_reject").open();
			}
		},

		/*
		*Function for the Submit Button in Dialog
		*
		*On press: the dialog closes and a rejection message appears on screen.
		*/
		_onSubmitReject : function (oEvent) {

			var oView = this.getView();
			var oModel = oView.getModel();
			var that = this;
			 
			var sId = oEvent.getSource().getBindingContext().getObject().Id;
			var sReason = oView.byId("textArea_reject").mProperties.value;

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

		_onCancelReject : function(oEvent){
			this.byId("dialog_reject").close();
		},

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
		*Function for the Approve Button in To be approved form
		*
		*On press: the dialog closes and a rejection message appears on screen.
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

		_onCancelApprove : function(oEvent){
			this.byId("dialog_approved").close();
		}
    });
});