/////////////////////////////////////////////////////////////////////
// Autodesk.ADN.Viewing.Extension.ViewerRemote
// by Dmytro Yemelianov, March 2017
// Project site: http://ndesign.co/
// Source: http://github.com/naturalDesign/viewer-remote
/////////////////////////////////////////////////////////////////////
AutodeskNamespace("Autodesk.ADN.Viewing.Extension");

Autodesk.ADN.Viewing.Extension.ViewerRemote = function (viewer, options) {

  Autodesk.Viewing.Extension.call(this, viewer, options);
	
	var socketServerURL = "https://viewer-remote.herokuapp.com/"; // Define server URL
	var socketObj = null;
	socketObj =  io(socketServerURL); // Declare socket.io object

  require.config({
    paths: {
        'annyang': 'https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min',
        'speechkitt': 'https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/speechkitt.min'
    },
    waitSeconds: 15
});

  require(['annyang', 'speechkitt'], function (annyang, speechkitt){
  // Add our commands to annyang
  annyang.addCommands({
    'hello': function() { alert('Hello world!'); }
  });

  // Tell KITT to use annyang
  SpeechKITT.annyang();


  // Define a stylesheet for KITT to use
  SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

  // Render KITT's interface
  SpeechKITT.vroom();

  });
  
  var _panel = null;

  /////////////////////////////////////////////////////////////////
  // Extension load callback
  //
  /////////////////////////////////////////////////////////////////
  this.load = function () {

    _panel = new Panel(
      viewer.container,
      guid());

    _panel.setVisible(true);

    console.log('Autodesk.ADN.Viewing.Extension.ViewerRemote loaded');

    return true;
  }

  /////////////////////////////////////////////////////////////////
  //  Extension unload callback
  //
  /////////////////////////////////////////////////////////////////
  this.unload = function () {

    _panel.setVisible(false);

    console.log('Autodesk.ADN.Viewing.Extension.ViewerRemote unloaded');

    return true;
  }

  /////////////////////////////////////////////////////////////////
  // Generates random guid to use as DOM id
  //
  /////////////////////////////////////////////////////////////////
  function guid() {

    var d = new Date().getTime();

    var guid = 'xxxx-xxxx-xxxx-xxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
      });

    return guid;
  }

  /////////////////////////////////////////////////////////////////
  // The demo Panel
  //
  /////////////////////////////////////////////////////////////////
  var Panel = function(
    parentContainer, id) {

    var _thisPanel = this;

    _thisPanel.content = document.createElement('div');

    Autodesk.Viewing.UI.DockingPanel.call(
      this,
      parentContainer,
      id,
      'Viewer-Remote',
      {shadow:true});

    $(_thisPanel.container).addClass('docking-panel');

    /////////////////////////////////////////////////////////////
    // Custom html
    //
    /////////////////////////////////////////////////////////////
    var html = [
		'<script src="https://cdn.socket.io/socket.io-1.0.0.js"></script>',
    '<form class="form-inline docking-panel-controls" role="form">',
    
    '<a href="https://github.com/naturalDesign/viewer-remote">',
      '<img src="https://viewer-remote.herokuapp.com/img/vulpix_32.png" alt="Priject Vulpix" width="32" height="32">',
    '</a>',

		// Adding history box
		'<ul class="chat" id="' + id + '-chat">',
			'<li"><p>History</p></li>',
		'</ul>',

    '<input id="' + id +'-name" type="text"',
          'class="docking-panel-name" ',
          'placeholder=" Query ...";>',

        '<button type="button" class="btn btn-primary" id="' + id + '-submit-btn">',
              '<span class="glyphicon glyphicon-ok" aria-hidden="true"> ',
              '</span> ',
              'Submit',
        '</button>',


      '</form>'
    ];

    $(_thisPanel.container).append(html.join('\n'));

    $('#' + id + '-submit-btn').click(onButtonClicked);
    //$('#' + id + '-listen-btn').click(onButtonClicked1);
    $('#' + id + '-name').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
           onButtonClicked(event);
        }
    });

    /////////////////////////////////////////////////////////////
    // button clicked handler
    //
    /////////////////////////////////////////////////////////////
    function onButtonClicked(event) {

      event.preventDefault();

      var name = $('#' + id + '-name').val();

      if(name.length) {
		$('#' + id + '-chat').append($('<li>').text(name));
		socketObj.emit('chat message', name);
      }
      $('#' + id + '-name').val('');
    }
	
	socketObj.on('Forge JS', function(msg){ 
							$('#' + id + '-chat').append($('<li>').text(msg));
							eval(msg);
						});

    /////////////////////////////////////////////////////////////
    // setVisible override (not used in that sample)
    //
    /////////////////////////////////////////////////////////////
    _thisPanel.setVisible = function(show) {

      Autodesk.Viewing.UI.DockingPanel.prototype.
        setVisible.call(this, show);
    }

    /////////////////////////////////////////////////////////////
    // initialize override
    //
    /////////////////////////////////////////////////////////////
    _thisPanel.initialize = function() {

      this.title = this.createTitleBar(
        this.titleLabel ||
        this.container.id);

      this.closer = this.createCloseButton();

      this.container.appendChild(this.title);
      this.title.appendChild(this.closer);
      this.container.appendChild(this.content);

      this.initializeMoveHandlers(this.title);
      this.initializeCloseHandler(this.closer);
    };

    /////////////////////////////////////////////////////////////
    // onTitleDoubleClick override
    //
    /////////////////////////////////////////////////////////////
    var _isMinimized = false;

    _thisPanel.onTitleDoubleClick = function (event) {

      _isMinimized = !_isMinimized;

      if(_isMinimized) {

        $(_thisPanel.container).addClass(
          'docking-panel-minimized');
      }
      else {
        $(_thisPanel.container).removeClass(
          'docking-panel-minimized');
      }
    };
  };

  /////////////////////////////////////////////////////////////
  // Set up JS inheritance
  //
  /////////////////////////////////////////////////////////////
  Panel.prototype = Object.create(
    Autodesk.Viewing.UI.DockingPanel.prototype);

  Panel.prototype.constructor = Panel;

  /////////////////////////////////////////////////////////////
  // Add needed CSS
  //
  /////////////////////////////////////////////////////////////
  var css = [

    'form.docking-panel-controls{',
      'margin: 0;',
    '}',

    'input.docking-panel-name {',
      'height: 30px;',
      'width: 97%;',
      //'margin-left: 5px;',
      'margin-bottom: 5px;',
      'margin-top: 5px;',
      'border-radius:5px;',
    '}',

    'div.docking-panel {',
      'top: 0px;',
      'left: 0px;',
      'width: 305px;',
      'height: 330px;',
      'resize: none;',
    '}',

    'div.docking-panel-minimized {',
      'height: 34px;',
      'min-height: 34px',
    '}',

    //Hereinafter is chat-box CSS
	
	'.chat {',
		'margin-top: 5px;',
    'margin-bottom: 5px;',
		'padding: 0;',
		'list-style: none;',
		'height: 175px;',
		'overflow-y:scroll; ',
		'background-color: #FFFFFF',
	'}',
	
	'.chat li {',
    'margin-bottom: 10px;',
    'margin-left: 5px;',
    'margin-right: 5px;',
    'padding-bottom: 5px;',
    'border-bottom: 1px dotted #B3A9A9;',
	'}',
	
	'.chat li .chat-body p {',
	'	margin: 0;',
	'	color: #777777;',
	'}',
	
	'::-webkit-scrollbar-track',
	'{',
	'	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);',
	'	background-color: #F5F5F5;',
	'}',
	'::-webkit-scrollbar',
	'{',
	'	width: 6px;',
	'	background-color: #F5F5F5;',
	'}',
	'::-webkit-scrollbar-thumb',
	'{',
	'	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);',
	'	background-color: #555;',
	'}'
	
  ].join('\n');

  $('<style type="text/css">' + css + '</style>').appendTo('head');
};

Autodesk.ADN.Viewing.Extension.ViewerRemote.prototype =
  Object.create(Autodesk.Viewing.Extension.prototype);

Autodesk.ADN.Viewing.Extension.ViewerRemote.prototype.constructor =
  Autodesk.ADN.Viewing.Extension.ViewerRemote;

Autodesk.Viewing.theExtensionManager.registerExtension(
  'Autodesk.ADN.Viewing.Extension.ViewerRemote',
  Autodesk.ADN.Viewing.Extension.ViewerRemote);