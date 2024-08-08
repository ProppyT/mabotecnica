/**
 * Made by ProppyT, 09-2015, revision 01-2016
 * Support functions for website_dollar_mabotecnica
***/

// to make the arrow in the rootmenu dark
function darkArrow(menuElement, arrowElement) {
	
	$(menuElement).on( "mouseenter", function() {
		
  		$(arrowElement).css( "background-image", "url(img/arrow_dark.png)" );
		
	});
}

// to make the arrow in the rootmenu light
function lightArrow(menuElement, arrowElement) {
	
	$(menuElement).on( "mouseleave", function() {
		
  		$(arrowElement).css( "background-image", "url(img/arrow_light.png)" );
		
	});
}

// to change the status of the arrow
function changeArrow(menuElement, arrowElement) {
	darkArrow(menuElement, arrowElement);
	lightArrow(menuElement, arrowElement);
}

// to change the colour of the text in the rootmenu
function darkText(menuElement, aElement) {
	
	$(menuElement).on( "mouseenter", function() {
		
  		$(aElement).css({'color' : '#F99B01'});
		
	});

}

// to change the colour of the text in the rootmenu
function lightText(menuElement, aElement) {
	
	$(menuElement).on( "mouseleave", function() {
		
  		$(aElement).css({'color' : '#555555'});
		
	});

}

// to change the status of the text in the rootmenu
function changeText(menuElement, aElement) {
	
	darkText(menuElement, aElement);
	lightText(menuElement, aElement);
}

// to activate the menu element by entering the button
function activate(button, menuElement) {
	
	$(button).on( "mouseenter", function() {
		
  		$(menuElement).show();
		
	});

}

// to deactivate the menu element by leaving the button
function deactivate(button, menuElement) {
	
	$(button).on( "mouseleave", function() {

  		$(menuElement).hide();
		
	});

}

// array of elements of type string
var elem = ["4r", "6r", "9r", "e", "h", "k", "l", "mr", "nr", "2d", "3d", "4d", "6d", "8d", "3a", "3r"];
var $basic = $("#outpanel"); // help panel to outfocus the menu and the submenu
var $button = $("#copelandbutton"); // help variable
var $element = null; // help variable
var $layer_laag = $("#laag"); // help variable for layer laag to focus the menu
$layer_laag.hide(); // hide the layer to focus the menu when active

// after load of the page make the rootmnenu again visible to overcome the issue showing this menu during load time
$(".rootmenu").css({"visibility" : "visible"}); // make again visible the rootmenu
for (var i = 0; i < elem.length; i++) {
	$("#linkmenu" + elem[i]).css({"visibility" : "visible"}); // make again visible all linkmenu's
	$("#arrow" + i).css({"visibility" : "visible"}); // make again visible all arrow's	
}

for (var i = 0; i < elem.length; i++) { // organizing the colours and the arrow's of the menu
	changeArrow("#linkmenu" + elem[i], "#arrow" + i);
	changeArrow("#submenu-" + elem[i], "#arrow" + i);
	changeText("#linkmenu" + elem[i], "#A" + i);
	changeText("#submenu-" + elem[i], "#A" + i);	
}

$(".rootmenu").hide(); // initialize the rootmenu in hide status
for (var i = 0; i < elem.length; i++) { // initialize the submenu's in hide status
	$("." + elem[i]).hide();
}

activate($button, $layer_laag); // de- and activating the layer with id laag to focus the menu
deactivate($button, $layer_laag);
activate(".rootmenu", $layer_laag); // layer laag stays activated when entering the rootmenu

activate($button, ".rootmenu"); // de- and activating the menu when hovering over button
deactivate($button, ".rootmenu");
activate(".rootmenu", ".rootmenu"); // static status for the menu to continue to submenu

$basic.on("mouseout", function () { // $rootmenu variable comes from the index.html, the home page	
	if ($rootmenu.is(":visible")) { // when mouseout to the left of the menu, hide the menu
		$rootmenu.hide();
	}
	if ($layer_laag.is(":visible")) { // when mousout to the left of the menu, hide the layer laag
		$layer_laag.hide();
	}
});

for (var i = 0; i < elem.length; i++) {	// organizing the interaction between menu, submenu and the layer laag
	activate("." + elem[i], ".rootmenu");
	deactivate("." + elem[i], ".rootmenu");
	
	activate("." + elem[i], $layer_laag);
	deactivate("." + elem[i], $layer_laag);
		
	deactivate("." + elem[i], "." + elem[i]);		
}

$button.on("mouseout", function () { // when the button mouseout, hide the submenu's too	
	for (var i = 0; i < elem.length; i++) {
		$element = $("." + elem[i]);
		if ($element.is(":visible")) { // checking if the element is hidden already
			$element.hide();
		}
		if ($layer_laag.is(":visible")) {
			$layer_laag.hide(); // hide also in this case the layer laag to focus the total menu
		}
	}
});

$basic.on("mouseout", function () { // when mouseout of the outpanel checking if both menu and submenu are visible and hide submenu
	for (var i = 0; i < elem.length; i++) {
		$element = $("." + elem[i]);
		if ($basic.is(":visible") && $element.is(":visible")) {
			$element.hide();
		}
	}
	if ($layer_laag.is(":visible")) {
		$layer_laag.hide(); // hide also in this case the layer laag to focus the total menu
	}
});

// to calculate the new extra width that changes when the window of the browser is resized
function newWidth(width) {
	return (width - 1280) / 2;
}

// when user change the size of the browser the position of the menu will be calculated
function adjustStyle(width) {
    width = parseInt(width); // converting into integer
	var newLeftOutpanel = 290 + newWidth(width);
	var newLeftSubmenu = 410 + newWidth(width);
	var newLeftRootmenu = 300 + newWidth(width);
	
    if (width > 1280) {
		$("#outpanel").css({"left" : newLeftOutpanel.toString() + "px"});
		for (var i = 0; i < elem.length; i++) {
	    	$("#submenu-" + elem[i]).css({"left" : newLeftSubmenu.toString() + "px"});
		}
		$(".rootmenu").css({"left" : newLeftRootmenu.toString() + "px"});
	} 
	else {
		$("#outpanel").css({"left" : "290px"});
		for (var i = 0; i < elem.length; i++) {
	    	$("#submenu-" + elem[i]).css({"left" : "410px"});
		}
		$(".rootmenu").css({"left" : "300px"});	
	}
}

// adjusting the element position when scrolling
function adjustPos(elemOffset) {
	var Scrolltop = $(window).scrollTop();
	var elementOffset = elemOffset;
	var curElemOffset = 0;
	
	if (elementOffset >= 0 && Scrolltop >= 0) {
		curElemOffset = (elementOffset - Scrolltop);
	}
	
	return curElemOffset;
}

// when starting determine the width of the viewport of the browser and calculate the position of the menu
window.onload = function(){ 
    adjustStyle($(this).width());
	var currentElementOffset = adjustPos(208); // when refreshing the page adjust the position of the layer laag
	// update the position of the layer laag
	$layer_laag.css({"top" : currentElementOffset.toString() + "px"}); 
}

// when resizing change the position of the menu too
$(window).resize(function() {
    adjustStyle($(this).width());
});

$('.box_skitter_large').css({width: 1280, height: 451}).skitter({ 
				theme: 'clean',
				dots: true,
				numbers_align: 'left',
				navigation: false,
				interval: 6000,
});

// when scrolling the page the menu and layer laag go in hide status
$(window).scroll(function() {
	$(".rootmenu").hide(); // hide the rootmenu when scrolling
	for (var i = 0; i < elem.length; i++) {
		$element = $("." + elem[i]);
		if ($element.is(":visible")) { // checking if the element is hidden already, and hide when scrolling
			$element.hide();
		}
	}
	$layer_laag.hide();
 });
 
// adjusting the layer laag position when scrolling down, in case you still see the button of the menu in browser window
$(window).bind('scroll', function() {
    var currentElementOffset = adjustPos(208);
	// update the position of the layer laag
	$layer_laag.css({"top" : currentElementOffset.toString() + "px"});
});

		