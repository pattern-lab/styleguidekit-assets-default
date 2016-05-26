/*!
* Modal for the Styleguide Layer
* For both annotations and code/info
*
* Copyright (c) 2016 Dave Olsen, http://dmolsen.com
* Licensed under the MIT license
*
* @requires panels-util.js
* @requires url-handler.js
*
*/

var modalStyleguide = {

  // set up some defaults
  active:       [ ],
  targetOrigin: (window.location.protocol === 'file:') ? '*' : window.location.protocol+'//'+window.location.host,
  
  /**
  * initialize the modal window
  */
  onReady: function() {
    
    // go through the panel toggles and add click event
    var els = document.querySelectorAll('.sg-pattern-extra-toggle');
    for (var i = 0; i < els.length; ++i) {
      els[i].onclick = (function(e) {
          e.preventDefault();
          var patternPartial = this.getAttribute('data-patternpartial');
          modalStyleguide.toggle(patternPartial);
      });
    }
    
  },
  
  /**
  * toggle the modal window open and closed
  */
  toggle: function(patternPartial) {
    if ((modalStyleguide.active[patternPartial] === undefined) || !modalStyleguide.active[patternPartial]) {
      var el = document.getElementById('sg-pattern-data-'+patternPartial);
      modalStyleguide.patternQueryInfo(el, true);
    } else {
      modalStyleguide.close(patternPartial);
    }
    
  },

  /**
  * open the modal window
  */
  open: function(patternPartial, content) {
    
    // make sure templateRendered is modified to be an HTML element
    var div       = document.createElement('div');
    div.innerHTML = content;
    content       = document.createElement('div').appendChild(div).querySelector('div');
    
    // add click events
    content = panelsUtil.addClickEvents(content, patternPartial);
    
    // make sure the modal viewer and other options are off just in case
    modalStyleguide.close(patternPartial);
    
    // note it's turned on in the viewer
    modalStyleguide.active[patternPartial] = true;
    
    // make sure there's no content
    div = document.getElementById('sg-pattern-extra-'+patternPartial);
    if (div.childNodes.length > 0) {
      div.removeChild(div.childNodes[0]);
    }
    
    // add the content
    document.getElementById('sg-pattern-extra-'+patternPartial).appendChild(content);
    
    // show the modal
    document.getElementById('sg-pattern-extra-toggle-'+patternPartial).classList.add('active');
    document.getElementById('sg-pattern-extra-'+patternPartial).classList.add('active');
    
  },
  
  clean: function(el, tag) {
    
  },
  
  /**
  * close the modal window
  */
  close: function(patternPartial) {
    
    // not that the modal viewer is no longer active
    modalStyleguide.active[patternPartial] = false;
    
    // hide the modal, look at info-panel.js
    document.getElementById('sg-pattern-extra-toggle-'+patternPartial).classList.remove('active');
    document.getElementById('sg-pattern-extra-'+patternPartial).classList.remove('active');
    
  },
  
  /**
  * return the pattern info to the top level
  */
  patternQueryInfo: function(el, iframePassback) {
    
    // send a message to the pattern
    try {
      var obj = JSON.stringify({ 'event': 'patternLab.patternQueryInfo', 'patternData': JSON.parse(el.innerHTML), 'iframePassback': iframePassback});
      parent.postMessage(obj, modalStyleguide.targetOrigin);
    } catch(e) {}
    
  },
  
  /**
  * toggle the comment pop-up based on a user clicking on the pattern
  * based on the great MDN docs at https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage
  * @param  {Object}      event info
  */
  receiveIframeMessage: function(event) {
   
    // does the origin sending the message match the current host? if not dev/null the request
    if ((window.location.protocol !== 'file:') && (event.origin !== window.location.protocol+'//'+window.location.host)) {
      return;
    }
    
    var data = (typeof event.data !== 'string') ? event.data : JSON.parse(event.data);
    
    // see if it got a path to replace
    if (data.event == 'patternLab.patternQuery') {
     
      var els, iframePassback;
      
      // find all elements related to pattern info
      els = document.querySelectorAll('.sg-pattern-data');
      iframePassback = (els.length > 1);
      
      // send each up to the parent to be read and compiled into panels
      for (var i = 0; i < els.length; i++) {
        modalStyleguide.patternQueryInfo(els[i], iframePassback);
      }
      
    } else if (data.event == 'patternLab.patternModalInsert') {
      
      // insert the previously rendered content being passed from the iframe
      modalStyleguide.open(data.patternPartial, data.modalContent);
      
    }
   
  }
 
};

// when the document is ready make sure the modal is ready
modalStyleguide.onReady();
window.addEventListener('message', modalStyleguide.receiveIframeMessage, false);
