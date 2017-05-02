$scope.coords = geolocation.getLocation().then(function(data){
        /**
         * Fonction de géolocalisation
         */
        var positionText = 'Vous etes ici';
        var id = $stateParams.etab_id;
        var nom = $stateParams.nom;
        var pharmaLat = $stateParams.latitude;
        var pharmaLon = $stateParams.longitude;
        var meLat = data.coords.latitude;
        var meLon = data.coords.longitude;
        var map;
        var directionsDisplay;
        var directionsService;
        var stepDisplay;
        var markerArray = [];
        var centerpo;
        var marker = null;
        var img = '../img/marker.png';
        var neoud = '../img/marker.png';
        var mode;
        var deffered = $q.defer();

        $scope.onSuccess = function (position){
            //if(marker!=null) map.removeOverlay(marker);
            if(marker != null) marker.setMap(null);
            meLat   = position.coords.latitude;
            meLon   = position.coords.longitude;
            var userposition = new google.maps.LatLng(meLat, meLon);
            marker = new google.maps.Marker({
                position: userposition,
                map: map,
                draggable: false,
                title:positionText,
                icon: img
            });
        }

        function clearWatch() {
            if ($scope.watchID != null) {
                navigator.geolocation.clearWatch($scope.watchID);
                $scope.watchID = null;
            }
        }

        $scope.initialize = function () {
            nom = nom.replace(/%20/g, " ");
            var nomaf;
            if(nom.length > 20){
                nomaf = nom.substring(0, 20)+"...";
            } else nomaf = nom;
            document.getElementById('tle').innerHTML = '<b>' + nomaf + '</b>';
            centerpo = new google.maps.LatLng(pharmaLat, pharmaLon);
            var userp = new google.maps.LatLng(meLat, meLon);
            mode = document.getElementById('mode').value;

            if(mode == "COND"){
                mode = "DRIVING";
                //var url="http://maps.google.com/maps?f=d&z=12&t=m&&saddr=current%20%20location&q=loc:"+pharmaLat+"+"+pharmaLon;
                document.getElementById("mode").selectedIndex = 0;
                var url = "http://maps.google.com/maps?f=d&t=m&saddr="+userp+"&daddr="+centerpo;
                $window.open(url , '_system');
                //var url = "google.navigation:q="+pharmaLat+","+pharmaLon+"&mode=d";
                //window.open(url , '_system');
                //var url="http://maps.google.com/maps?f=d&t=m&saddr="+userp+"&daddr="+centerpo;
                //var ref=window.open(url , '_system');
            }
            // Instantiate a directions service.
            directionsService = new google.maps.DirectionsService();

            // Create a map and center it on Manhattan.
            var mapOptions = {
                zoom: 15,
                center: centerpo,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            // Create a renderer for directions and bind it to the map.
            var rendererOptions = {
                map: map
            }
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setOptions( { suppressMarkers: true } );

            // Instantiate an info window to hold step text.
            stepDisplay = new google.maps.InfoWindow();
            navigator.geolocation.getCurrentPosition($scope.myPositionSuccess, $scope.myPositionError);
            $scope.watchID = navigator.geolocation.watchPosition ($scope.onSuccess, $scope.myPositionError, { enableHighAccuracy: true }) ;
        }

        $scope.myPositionError = function (error) {
            switch(error.code){
                case error.PERMISSION_DENIED:
                    deffered.reject(data);
                    $ionicPopup.alert({
                        title: "Camer In A Click !",
                        template: "Impossible d'accéder à votre GPS. Veuillez l'activer"
                    });
                    break;
                case error.POSITION_UNAVAILABLE:
                    deffered.reject(data);
                    $ionicPopup.alert({
                        title: "Camer In A Click !",
         
                        template: "Impossible de récuperer votre position. Veuillez activer votre GPS"
                    });
                    break;
                case error.TIMEOUT:
                    deffered.reject(data);
                    $ionicPopup.alert({
                        title: "Camer In A Click !",
                        template: "Votre GPS met trop de temps à repondre. Veuillez vérifier qu'il est activé."
                    });
                    break;
            }
            myPosition.status = error.code;
        }

        $scope.myPositionSuccess = function(position) {
            meLat   = position.coords.latitude;
            meLon   = position.coords.longitude;
            var userposition = new google.maps.LatLng(meLat, meLon);
            var etabposition = new google.maps.LatLng(pharmaLat, pharmaLon);
            // First, remove any existing markers from the map.
            for (var i = 0; i < markerArray.length; i++) {
                markerArray[i].setMap(null);
            }

            // Now, clear the array itself.
            markerArray = [];

            // Retrieve the start and end locations and create
            // a DirectionsRequest using user select directions.
            var request = {
                origin      : userposition,
                destination : etabposition,
                travelMode  : google.maps.TravelMode.DRIVING
            };

            // Route the directions and pass the response to a
            // function to create markers for each step.
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var warnings = document.getElementById('warnings_panel');
                    warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
                    directionsDisplay.setDirections(response);
                    $scope.showSteps(response);
                }
            });
        };

        $scope.showSteps = function (directionResult) {
            // For each step, place a marker, and add the text to the marker's
            // info window. Also attach the marker to an array so we
            // can keep track of it and remove it when calculating new
            // routes.
            var myRoute = directionResult.routes[0].legs[0];

            var marker = new google.maps.Marker({
                position: myRoute.steps[0].start_location,
                map: map,
                icon: null
            });
            $scope.attachInstructionText(marker, positionText);
            markerArray[0] = marker;

            for (var i = 1; i < myRoute.steps.length; i++) {
                var marker = new google.maps.Marker({
                    position: myRoute.steps[i].start_location,
                    map: map,
                    icon: neoud
                });
                $scope.attachInstructionText(marker, myRoute.steps[i].instructions);
                markerArray[i] = marker;
            }

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(pharmaLat, pharmaLon),
                map: map,
                icon: new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/green.png")
            });
            $scope.attachInstructionText(marker, nom);
            markerArray[myRoute.steps.length] = marker;
        }

        $scope.attachInstructionText = function (marker, text) {
            google.maps.event.addListener(marker, 'click', function() {
                // Open an info window when the marker is clicked on,
                // containing the text of the step.
                stepDisplay.setContent(text);
                stepDisplay.open(map, marker);
            });
        }

    }, function(error){
        console.log(error);
    });
