sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "./controller/RejectionDialog"
 ], function (UIComponent, JSONModel, RejectionDialog) {
    "use strict";
    return UIComponent.extend("intern2020.Component", {
       metadata : {
             manifest: "json"
       },
       init : function () {
          // call the init function of the parent
          UIComponent.prototype.init.apply(this, arguments);

          this.getRouter().initialize();

          // set dialog
			this._rejectDialog = new RejectionDialog(this.getRootControl());
          
       },

       exit : function() {
			this._rejectDialog.destroy();
			delete this._rejectDialog;
		   },

		openRejectionDialog : function () {
			this._rejectDialog.open();
		}
    });
 });