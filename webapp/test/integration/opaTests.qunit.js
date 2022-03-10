/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"hpc/so/zhpcsoapp/test/integration/AllJourneys"
	], function() {
		QUnit.start();
	});
});