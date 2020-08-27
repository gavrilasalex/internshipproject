sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/ui/core/format/NumberFormat",
    "sap/ui/model/json/JSONModel"
], function (Controller, History, Button, Dialog, Text, NumberFormat, JSONModel) { // eslint-disable-line id-match
    "use strict";

    // noinspection UnnecessaryLocalVariableJS
    /**
     * BaseController.js
     *
     * General Base controller which is extended by all other controllers.
     * Used to provide global functions that can be reused throughout the application
     *
     * @param {String} [sId] id for the new control, generated automatically if no id is given
     * @param {Object} [mSettings] initial settings for the new control
     *
     * @class BaseController.js
     *
     * @constructor
     * @public
     * @aliasintern2020.BaseController
     */
    var oBaseController = Controller.extend("intern2020.controller.BaseController", {



        /* =========================================================== */
        /* Getter functions                                            */
        /* =========================================================== */



        /* =========================================================== */
        /* Helper functions */
        /* =========================================================== */

        /**
         * Get router for current view
         * @returns {sap.m.routing.Router} router object
         * @memberOf porsche.pbs.controller.BaseController
         */
        getRouter: function () {
            // return the Router for the current view
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        /**
         * Getter for the resource bundle.
         * @public
         * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
         */
        getResourceBundle: function () {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle();
        },

        getModel : function(sText) {
            return this.getView().getModel(sText);
        },

        //Function for navigation to the previous page
        _onNavBack : function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
        },

        //Function for navigation to the login page, killing the current session
        _onSignOutPress : function() {

            var oModel = this.getView().getModel("oUsername");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            if(!(oModel === undefined)){
                oModel.setProperty("/Username", "");
            }

            oRouter.navTo("login");
            this.bInitialLogin = true;
        },

        //Visibility for the floating footer
        toggleVisibility: function () {
            this._Page.setShowFooter(!this._Page.getShowFooter());
		}, 
		
        toggleFooter: function () {
			this._Page.setFloatingFooter(!this._Page.getFloatingFooter());
        },
        
        _formatRowHighlight: function (oValue) {
            // Your logic for rowHighlight goes here
                if (oValue === "DENIED") {
                    return "Error";
                } else if (oValue === "IN PROGRESS") {
                    return "Information";
                } else if (oValue === "APPROVED") {
                    return "Success";
                }
                return "None";
        },
    });

    return oBaseController;
});
