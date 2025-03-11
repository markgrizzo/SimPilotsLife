"use strict";
$(function () {
    if (window.google && window.google.maps) {
        initMap()
    }
});

function initMap() {
    const locations = [
        {
            lat: 35.2140120000,
            lng: -80.9431230000,
            //label: 'B',
            draggable: false,
            title: 'Charlotte Douglas International Airport',
            www: 'http://www.cltairport.com/Pages/default.aspx'
        },
        {
            lat: 37.394694,
            lng: -122.150333,
            label: 'T',
            draggable: false,
            title: 'Tesla',
            www: 'https://www.tesla.com/'
        },
        {
            lat: 37.331681,
            lng: -122.030100,
            label: 'A',
            draggable: false,
            title: 'Apple',
            www: 'https://www.apple.com/'
        },
        {
            lat: 37.484722,
            lng: -122.148333,
            label: 'F',
            draggable: false,
            title: 'Facebook',
            www: 'https://www.facebook.com/'
        }
    ];
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.2140120000, lng: -80.9431230000 },
        zoom: 11
    });
    const markers = locations.map(function (location, i) {

        const contentString = "<a href=\"" + location.www + "\" target=\"_blank\"><strong>" + location.title + "</strong></a>";
        // const contentString = `<a href="${location.www}" target="_blank"><strong>${location.title}</strong></a>`;
        const infoWindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        });
        const marker = new google.maps.Marker({
            position: location,
            label: location.label,
            map: map,
            title: location.title,
            contentString: contentString
        });
        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
        return marker;
    });
}
