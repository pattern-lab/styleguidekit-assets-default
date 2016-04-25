/*!
 * Panels Util
 * For both styleguide and viewer
 *
 * Copyright (c) 2013-16 Brad Frost, http://bradfrostweb.com & Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * @requires url-handler.js
 *
 */

var panelsUtil = {
  
  addClickEvents: function(templateRendered, patternPartial) {
    
    var els = templateRendered.querySelectorAll('#sg-'+patternPartial+'-tabs li');
    for (var i = 0; i < els.length; ++i) {
      els[i].onclick = (function() {
        var patternPartial = this.getAttribute('data-patternpartial');
        var panelID = this.getAttribute('data-panelid');
        panelsUtil.show(patternPartial, panelID);
      });
    }
    
    return templateRendered;
    
  },
  
  show: function(patternPartial, panelID) {
    
    var els;
    
    // turn off all of the active tabs
    els = document.querySelectorAll('sg-'+patternPartial+'-tabs li');
    for (i = 0; i < els.length; ++i) {
      els[i].classList.remove('sg-code-title-active');
    }
    
    // hide all of the panels
    els = document.querySelectorAll('sg-'+patternPartial+'-tabs li');
    for (i = 0; i < els.length; ++i) {
      els[i].style.display = 'none';
    }
    
    // add active tab class
    document.getElementById('sg-'+patternPartial+'-'+panelID+'-tab').classList.add('sg-tab-title-active');
    
    // show the panel
    document.getElementById('sg-'+patternPartial+'-'+panelID+'-panel').style.display = 'block';
    
    /*
    if (codeViewer.copyOnInit) {
      codeViewer.selectCode();
      codeViewer.copyOnInit = false;
    }
    */
    
  }
    
};
