/******************************************
* Author: Anush Pederla
* Date: 01/05/2016
* Comments: For smooth scrolling JSON posts for submitting gest requests and messages
*******************************************/
//jQuery for page smooth scrolling feature - requires jQuery Easing plugin
$(function() {
	PreLoadValues();
	$('#btnOverview').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
	$('#btnToTheParty').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
	$('#btnToLeaveMessage').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});
});
function PreLoadValues(){
	$.getJSON("server/guests.json", function(json) {
		$("#ulAttendingList").empty();
		$.each(json, function(idx, obj){
			$('#ulAttendingList').append('<li class="list-group-item" >'+ obj.name + ', (' + obj.totalguests + ')' +'</li>');
		});
	});

	$.getJSON("server/messages.json", function(json) {
		$("#ulMessageList").empty();
		$.each(json, function(idx, obj){
			$('#ulMessageList').append('<li class="list-group-item" > <b>Message from:</b> '+ obj.name + ' &nbsp; &nbsp; &nbsp; <b>On:</b>&nbsp; ' + obj.messagedate.substring(0, 16) + ' <br />' + obj.message + '</li>');
		});
	});
}

function mobileNavFunc(){
    // If it's an iPhone..
    if( (navigator.platform.indexOf("iPhone") != -1)
        || (navigator.platform.indexOf("iPod") != -1)
        || (navigator.platform.indexOf("iPad") != -1))
         window.open("maps://maps.google.com/maps?q=314 E. Michigan Ave, Lansing, MI");
    else
         window.open("http://maps.google.com/maps?q=314 E. Michigan Ave, Lansing, MI");
}
function showVideo(){
	//$('#myModal').modal('show'); 
	return true;
}
function submitGuest()
{
	var guestName = document.getElementById("guestName").value;
	var guestEmail = document.getElementById("guestEmail").value;
	var guestTotalCount = document.getElementById("guestTotal").value;
	/*if (guestName == '' || guestEmail =='' || guestTotalCount == ''){
		$('#myModal').modal('show');
			document.getElementById("errorMsg").innerHTML = " Please enter your Name/Email & Guest  Count";
			return true;
	}*/

	var $myForm = $('#guestForm');
	if (!$myForm[0].checkValidity()) {
		// If the form is invalid, submit it. The form won't actually submit;
		// this will just cause the browser to display the native HTML5 error messages.
		$myForm.find(':submit').click();
	}
	else{
		var object = {
			name: guestName,
			email: guestEmail,
			totalguests : guestTotalCount
		}
		//var params = JSON.stringify(object);

		$.ajax({
			type: 'POST',
			data: {params:object},
			url: 'server/submitGuest.php',
			success: function(data){
				// do something on success
				PreLoadValues();
				document.getElementById("guestName").value = '';
				document.getElementById("guestEmail").value = '';
				document.getElementById("guestTotal").value = '';
				document.getElementById("lblGuest").innerHTML = ' Thanks...!'
			}
		});
	}
}
function submitMessage()
{
	var guestNameMsg = document.getElementById("guestNameMsg").value;
	var guestMessage = document.getElementById("guestMessage").value;
	var guestMessageDate = new Date();
	//alert($.datepicker.formatDate('MM dd, yy', new Date()));
	var $myForm = $('#messageForm');
	if (!$myForm[0].checkValidity()) {
		// If the form is invalid, submit it. The form won't actually submit;
		// this will just cause the browser to display the native HTML5 error messages.
		$myForm.find(':submit').click();
	}
	else{

		var object = {
			name: guestNameMsg,
			message: guestMessage,
			messagedate : guestMessageDate
		}
		var paramse = JSON.stringify(object);

		$.ajax({
			type: 'POST',
			data: {params:object},
			url: 'server/submitMessage.php',
			success: function(data){
				// do something on success
				PreLoadValues();
				document.getElementById("guestNameMsg").value = '';
				document.getElementById("guestMessage").value = '';
				document.getElementById("lblMessage").innerHTML = ' Thanks...!'
			}
		});
	}
}
