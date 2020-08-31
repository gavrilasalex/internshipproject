sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
 ], function (UIComponent, JSONModel, RejectionDialog, Device) {
   "use strict";

   return UIComponent.extend("intern2020.Component", {
      metadata : {
            manifest: "json"
      },
       
      init : function () {
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);

         this.getRouter().initialize();

         // set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
      },

      exit : function() {
			this._rejectDialog.destroy();
			delete this._rejectDialog;
		},

		openRejectionDialog : function () {
         this._rejectDialog.open();
      },

		getContentDensityClass : function() {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
      
    });
 });