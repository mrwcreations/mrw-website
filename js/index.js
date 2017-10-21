'use strict';

var channels = ['freecodecamp', 'bobross'],
    all = document.getElementById('all-collection'),
    tabs = document.getElementById('tabs-swipe');
var onCounter = 0,
    onEnabled = false,
    offEnabled = false;

channels.forEach(function (channel) {
	all.innerHTML += '<li id="' + channel + '" class="collection-item avatar"></li>';
});

$(document).ready(function () {
	$('#tabs-swipe').tabs({ 'swipeable': true });

	channels.forEach(function (channel) {
		// return getChannelInfo(channel);
	});
	document.getElementById('spinner').classList.add('hide');
	document.getElementsByClassName('tabs-content')[0].setAttribute('style', 'height: auto;');
	all.classList.remove('hide');
	// channels.forEach(channel => getStreamInfo(channel));
});