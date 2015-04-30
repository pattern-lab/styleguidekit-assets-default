/*!
 * Tab Support for the Viewer
 *
 * Copyright (c) 2013 Brad Frost, http://bradfrostweb.com & Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * @requires code-viewer.js
 *
 */

var tabs = [
	
	/**
	* describe the default tabs
	*/
	{ "id": "sg-code-tab-info", "name": "INFO", "default": true, "httpRequest": false, "prismHighlight": false, "template": true, "templateID": "pl-code-template-info-tab" },
	{ "id": "sg-code-tab-html", "name": "HTML", "default": false, "httpRequest": true, "httpRequestReplace": ".escaped.html", "httpRequestCompleted": false, "prismHighlight": true, "language": "markup", "template": false },
	{ "id": "sg-code-tab-pattern", "name": config.patternExtension.toUpperCase(), "default": false, "httpRequest": true, "httpRequestReplace": "."+config.patternExtension, "httpRequestCompleted": false, "prismHighlight": true, "language": "markup", "template": false }
	
];


var tabUtil = {
	
	/**
	* add a tab to the list of default tabs
	* @param  {Object}       the properties of the tab to tab that will be added
	*/
	add: function(tab) {
		
		// evaluate tabs array and create content
		for (i = 0; i < tabs.length; ++i) {
			if (tab.id == tabs[i].id) {
				return;
			}
		}
		
		// it wasn't found so push the tab onto the tabs
		tabs.push(tab);
		
	}
	
}