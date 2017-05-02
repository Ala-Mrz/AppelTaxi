angular.module('starter.controllers', [])


   
.controller('MyCtrl', function($scope) {
 $scope.locationChanged = function (location) {
   alert(location);
 };})




.controller('MarkerRemoveCtrl', function($scope, Rest, Config, $state, $ionicHistory,$ionicPopup, $timeout, $ionicLoading, $compile) {



 $scope.init = function() {


  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;
  


 directionsDisplay = new google.maps.DirectionsRenderer({draggable:true});
 directionsService = new google.maps.DirectionsService();

directionsDisplay.setPanel(document.getElementById("directionsPanel"));


   directionsDisplay.setMap($scope.map);
   navigator.geolocation.getCurrentPosition(function(positions) {
$scope.map.setCenter(new google.maps.LatLng(positions.coords.latitude, positions.coords.longitude));

var meLat=positions.coords.latitude;
var meLon=positions.coords.longitude;

calcRoute(meLat,meLon);
 Rest.showToast("deplacer B pour choisir votre destination");
 }); 
});

 };

$scope.init();

function calcRoute(meLat,meLon) {
  var start = new google.maps.LatLng(meLat, meLon);
  var end = new google.maps.LatLng(meLat, meLon);
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  $scope.directionsService = new google.maps.DirectionsService();
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
   

 google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        directions = directionsDisplay.getDirections();


          

        // Display the distance:
        document.getElementById('distance').innerHTML =
          directions.routes[0].legs[0].distance.value /1000+ "Km";
          
            document.getElementById('Tarif').innerHTML =Math.round(
          directions.routes[0].legs[0].distance.value *4/10 + 450) /1000+"dt";
          
        // Display the duration:
        document.getElementById('duration').innerHTML =Math.round(
          directions.routes[0].legs[0].duration.value /60 )+ "Min";
           
               
});
    }     

  });
}
    $scope.showTaxi = function(event, Taxi) {
            $scope.selectedTaxi = Taxi;
            $scope.map.showInfoWindow('myInfoWindow', this);
        };



$scope.listeTaxi=[];
$scope.taxi={};

  $scope.getTaxiDisponible = function() {
    Rest.get(Config.URL.GETTAXIDISPONIBLE)
        .then(function success(res){
             if (!res.error) {

          $scope.listeTaxi = res.Taxi;
          
};
        }, function error(err){
          Rest.showToast(err.error_msg);
        });  
  };

$scope.getTaxiDisponible(); 


$scope.Reservation = function(Taxi) {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Reservation de Taxi',
       template: 'vous êtes sure de réserver ce taxi?'  });
     confirmPopup.then(function(res) {
  if(res) {

$scope.reservation={
  longitude_depart:'',
  latitude_depart: '',
  longitude_dest:'',
  latitude_dest:'',
  tarif:'',
  duree:'',
distance:'',
taxi_id:'',
user_id:''

};


  directions = directionsDisplay.getDirections();

 $scope.reservation.longitude_depart=directions.routes[0].legs[0].start_location.lng();
 $scope.reservation.latitude_depart=directions.routes[0].legs[0].start_location.lat();
 $scope.reservation.longitude_dest=directions.routes[0].legs[0].end_location.lng();
 $scope.reservation.latitude_dest=directions.routes[0].legs[0].end_location.lat();
 $scope.reservation.tarif=Math.round(directions.routes[0].legs[0].distance.value *4/10 + 450) /1000;
 $scope.reservation.duree=Math.round( directions.routes[0].legs[0].duration.value /60 );
 $scope.reservation.distance=directions.routes[0].legs[0].distance.value /1000;

$scope.reservation.taxi_id=Taxi.idTaxi;
$scope.reservation.user_id=JSON.parse(window.localStorage['LoggedUser']);

  Rest.post('http://localhost/AppelTaxi1/v1/AjoutReservationTemps',$scope.reservation)
        .then(function success(res1){
          if (!res1.error) 

                 {   Rest.showToast("Reservation envoyer");}
           else  { Rest.showToast("error1");};
            
      }, function error(err){
        console.log(err);
    
      });


       }
    
     });
   };






})
.controller('AppCtrl', function($scope, $state) {
 
})


.controller('ReservationCtrl', function($scope, Rest, Config, $state, $ionicHistory) {

})

.controller('ProfileCtrl', function($scope, Rest, Config, $state, $ionicHistory) {
    // Set Header
 $scope.user=JSON.parse(window.localStorage['LoggedUser1']);})
.controller('HomeProprietaireCtrl', function($scope, Rest, Config, $state, $ionicHistory) {



$scope.goEspacePassager=function(){   $state.go('app.EspacePassager');};
$scope.goEspaceChauffeur=function(){     $state.go('app.EspaceChauffeur');};
$scope.goEspaceProprietaire=function() {  $state.go('app.EspaceProprietaire');};


})
.controller('EspaceProprietaireCtrl', function($scope, Rest, Config, $state, $ionicHistory) {



})


.controller('UserCtrl', function($scope, Rest, Config, $state, $ionicHistory) {

  $scope.user = {};
  $scope.date={};
  $scope.pass={};
  $scope.userpas = {};
  $scope.isValid = true;
  $scope.isValidLogin = true;

  $scope.doLogin = function(){
    $scope.checkentry();
    //if ($scope.isValidLogin) {



      Rest.post(Config.URL.LOGIN, $scope.user)
      .then(function success(res){
          //navigate
          if (!(res.error)) 
          {     
            window.localStorage['LoggedIn'] = true;
            window.localStorage['LoggedUser'] = JSON.stringify(res.id);
               window.localStorage['LoggedUser1'] = JSON.stringify(res);
          
                if(res.groupe_id==1){   
              
                 $state.go('app.EspacePassager');}
               else if(res.groupe_id==2){
                $state.go('app.HomeChauffeur');}
               else if(res.groupe_id==3){  $state.go('app.HomeProprietaire');}
                else   $state.go('app.HomeAdmin'); 
           }
           else 
           {
           Rest.showToast("L'adresse e-mail et le mot de passe saisis ne correspondent pas.");
         };
            
      }, function error(err){
        console.log(err);
      });
  
  };
  $scope.doResgister = function(){
    $scope.checkUser();
    if ($scope.isValid) {
        Rest.post(Config.URL.REGISTREPASSAGER, $scope.userpas)
        .then(function success(res){
          if (!res.error) {
                window.localStorage['LoggedUser'] = JSON.stringify($scope.userpas.id);
               window.localStorage['LoggedUser1'] = JSON.stringify($scope.userpas);

                if($scope.userpas.groupe_id==1){    $state.go('app.EspacePassager');}
               else if($scope.userpas.groupe_id==2){  $state.go('app.HomeChauffeur');}
               else if($scope.userpas.groupe_id==3){  $state.go('app.HomeProprietaire');}
                else{   $state.go('app.HomeAdmin'); };
            Rest.showToast("Register succssed!");
       
          } else {
            Rest.showToast("error1");
          };
        }, function error(err){
          Rest.showToast("error2");
        });
    };
  }; 
  $scope.LoggedIn=function(){
  if(!JSON.parse(window.localStorage['LoggedIn']))
    $state.go('login');
};






$scope.Deconnexion=function(){
window.localStorage['LoggedIn']=false;
window.localStorage['LoggedUser'] =undefined;
window.localStorage['LoggedUser1'] =undefined;
$ionicHistory.clearHistory();
$state.go("login");
};

  $scope.checkUser = function(){
    if ($scope.userpas.nom == null || $scope.userpas.nom == "") {
        Rest.showToast("Quel est votre nom ?");
        $scope.isValid = false;}

else if(!($scope.userpas.password==$scope.pass.password)){
  Rest.showToast("Verfier votre mot de passe ");
        $scope.isValid = false;


    } else if ($scope.userpas.email == null || $scope.userpas.email == "") {
        Rest.showToast("Veuillez entrer une adresse email valide.");
        $scope.isValid = false;
    }
    else{ $scope.isValid = true; };
  
  };


  $scope.checkchauf = function(){
    if ($scope.user.nom == null || $scope.user.nom == "") {
        Rest.showToast("Quel est votre nom ?");
        $scope.isValid = false;
    } else if ($scope.user.email == null || $scope.user.email == "") {
        Rest.showToast("Veuillez entrer une adresse email valide.");
        $scope.isValid = false;}
        else if ($scope.user.permis == null || $scope.user.permis == "") {
        Rest.showToast("Veuillez entrer votre num de permis.");
        $scope.isValid = false;}
        else if ($scope.user.dateNaissance == null || $scope.user.dateNaissance == "") {
        Rest.showToast("Veuillez entrer une adresse email valide.");
        $scope.isValid = false;
    } else if ($scope.user.password == null || $scope.user.password == "") {
        Rest.showToast("Veuillez entrer un mot de passe.");
        $scope.isValid = false;
    } else $scope.isValid = true; 
  };


  $scope.checkentry = function(){
    if ($scope.user.email == null || $scope.user.email == "") {
        Rest.showToast("Veuillez entrer une adresse email valide.");
        $scope.isValidLogin = false;
    } else if ($scope.user.password == null || $scope.user.password == "") {
        Rest.showToast("Veuillez entrer un mot de passe.");
        $scope.isValidLogin = false;
    } else $scope.isValidLogin = true; 
  };



})




.controller('ModifierProfileCtrl', function($scope, Rest, Config, $state, $ionicHistory) {


  $scope.user=JSON.parse(window.localStorage['LoggedUser1']);

  $scope.putuser = function() {
   Rest.post(Config.URL.PUTUSER+JSON.parse(window.localStorage['LoggedUser']), $scope.userpas)

         .then(function success(res){
          if (!res.error) {   

            Rest.showToast("modification enregistrer");
          } else {
            Rest.showToast("error1");
          };
        }, function error(){
          Rest.showToast("error2");
        });};


 
})
  


.controller('ListeResPassHis', function($scope, Rest, Config, $ionicHistory, $state) {


  $scope.reservation = {};
  $scope.listeReservation = [];

  $scope.getRes = function() {
    Rest.get(Config.URL.GETRESPASSAGER+ JSON.parse(window.localStorage['LoggedUser']))
        .then(function success(res){
  
               
          $scope.listeReservation = res.reservation;
        }, function error(err){
          Rest.showToast(err.error_msg);
        });  
  };
$scope.getRes();
 $scope.reservationAvance = {};
  $scope.listeReservationAvance = [];

  $scope.getResAvance = function() {
    Rest.get(Config.URL.GETRESPASSAGERAVANCE+ JSON.parse(window.localStorage['LoggedUser']))
        .then(function success(res){
  
               
          $scope.listeReservationAvance = res.reservationAvance;
        }, function error(err){
          Rest.showToast(err.error_msg);
        });  
  };

$scope.getResAvance();
})









.controller('ResAvanceCtrl', function($scope, Rest, Config, $state, $ionicHistory) {

$scope.ResAvance={};

var directionDisplay;

  var directionsService = new google.maps.DirectionsService();
  var map;

 directionsDisplay = new google.maps.DirectionsRenderer({draggable:true});
 directionsService = new google.maps.DirectionsService();

  directionsService = new google.maps.DirectionsService();


 $scope.calcRoute= function() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    $scope.directionsService = new google.maps.DirectionsService();
 $scope.directionsService = new google.maps.DirectionsService();
  
     directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    directions = directionsDisplay.getDirections();
        // Display the distance:
        document.getElementById('distance').innerHTML =
          directions.routes[0].legs[0].distance.value /1000+ "Km";
          
            document.getElementById('Tarif').innerHTML =Math.round(
          directions.routes[0].legs[0].distance.value *4/10 + 450) /1000+"dt";
          
        // Display the duration:
        document.getElementById('duration').innerHTML =Math.round(
          directions.routes[0].legs[0].duration.value /60 )+ "Min";

};

      });
              directionsDisplay.setPanel(document.getElementById("route"));

}

  $scope.ResAvance = function(res){
  // $scope.checkUser();
    //if ($scope.isValid) {
    
        Rest.post(Config.URL.RESAVANCE, $scope.ResAvance)
         .then(function success(res){
          if (!res.error) {         
            Rest.showToast("Register succssed!");
           $state.go('app.ListeTaxi');
          } else {
            Rest.showToast("error1");
          };
        }, function error(){
          Rest.showToast("error2");
        });};
})
  
.controller('MainController', function($scope, Rest, Config, $state, $ionicHistory) {


    $scope.myJson = {
        globals: {
            shadow: false,
            fontFamily: "Verdana",
            fontWeight: "100"
        },
        type: "pie",
        backgroundColor: "#fff",

        legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
                borderRadius: 10,
                borderColor: "transparent"
            }
        },
        tooltip: {
            text: "%v requests"
        },
        plot: {
            refAngle: "-90",
            borderWidth: "0px",
            valueBox: {
                placement: "in",
                text: "%npv %",
                fontSize: "15px",
                textAlpha: 1,
            }
        },
        series: [{
            text: "10.0.0.80",
            values: [4660],
            backgroundColor: "#FA6E6E #FA9494",
        }, {
            text: "167.114.156.198",
            values: [1807],
            backgroundColor: "#F1C795 #feebd2"
        }, {
            text: "103.24.77.25",
            values: [1611],
            backgroundColor: "#FDAA97 #FC9B87"
        }, {
            text: "46.4.68.142",
            values: [1341],
            backgroundColor: "#28C2D1"
        }, {
            text: "10.0.0.117",
            values: [1269],
            backgroundColor: "#D2D6DE",
        }]
    };
})

.controller('AjoutTaxiCtrl', function($scope, Rest, Config, $state, $ionicHistory) {

  $scope.taxi={ };
  $scope.AjoutTaxi = function(res){
  // $scope.checkUser();
    //if ($scope.isValid) {
       $scope.taxi.id=JSON.parse(window.localStorage['LoggedUser']);
        Rest.post(Config.URL.TAXI, $scope.taxi)
         .then(function success(res){
          if (!res.error) {         
            Rest.showToast("Register succssed!");
           $state.go('app.ListeTaxi');
          } else {
            Rest.showToast("error1");
          };
        }, function error(){
          Rest.showToast("error2");
        });};
})
  

.controller('ListeTaxiCtrl', function($scope, Rest, Config, $ionicHistory, $state) {


  $scope.taxi = {  };
  $scope.listeTaxi = [];
  $scope.listeUserAFF = [];
  $scope.UserAffect={};
  $scope.getTaxi = function() {
    Rest.get(Config.URL.GetTAXI+ JSON.parse(window.localStorage['LoggedUser']))
        .then(function success(res){
  
               
          $scope.listeTaxi = res.taxi;
        }, function error(err){
          Rest.showToast(err.error_msg);
        });  
  };
$scope.getTaxi();

    $scope.deleteTaxi = function(taxi) {
    Rest.delete(Config.URL.DELETETAXI + taxi.idTaxi)
      .then(function success(res){      
     if (!res.error) {  
  
      Rest.showToast("Taxi deleted succesfully"+taxi.idTaxi);
     }
      else{ Rest.showToast("Taxi n'existe pas ");
   };
        }, function error(err){
          Rest.showToast("error1");
        });
             };

 $scope.ModifierTaxi = function(taxi){
 window.localStorage['LoggedTaxi'] = JSON.stringify(taxi);
  $state.go('app.ModifierTaxi'); 

  };


})


.controller('AffectationCtrl', function($scope, Rest, Config, $ionicHistory, $state) {

$scope.Affect={};
$scope.taxiAF = {  };
$scope.listeTaxiAFF = [];
$scope.listeAffect = [];
$scope.affectation={};

 $scope.getAffectation = function() {
    Rest.get(Config.URL.GETAFFECTATION+ JSON.parse(window.localStorage['LoggedUser']))
        .then(function success(res){  
        
          $scope.listeAffect = res.affectation;
        }, function error(err){
          Rest.showToast("error1");
        });    
  };

  $scope.getAffectation();
  $scope.getTaxiAffect = function() {
    Rest.get(Config.URL.GetTAXI+ JSON.parse(window.localStorage['LoggedUser']))
        .then(function success(res){
          $scope.listeTaxiAFF = res.taxi;
        }, function error(err){
          Rest.showToast(err.error_msg);
        });  
  };

  $scope.getTaxiAffect();
 $scope.TaxiSelect = function(taxi){
 $scope.taxiAF=taxi;
$state.go("app.Affectation");};
$scope.Affect.matricule=$scope.taxiAF.matricule;


  $scope.getUserAffect = function() {
    Rest.get(Config.URL.getUserAFFECT+ JSON.parse(window.localStorage['LoggedUser']))
        .then(function success(res){

          $scope.listeUserAFF = res.user;
        }, function error(err){
          Rest.showToast(err.error_msg);
        });  
  };
$scope.getUserAffect();


 $scope.UserSelect = function(user){
$scope.UserSelect=user;
 $state.go("app.Affectation");
  };
$scope.Affect.nom=$scope.UserSelect.nom;


$scope.AjoutAffect=function(){
        Rest.post(Config.URL.AJOUTAFFECT, $scope.Affect)
         .then(function success(res){
          if (!res.error) {         
            Rest.showToast("Register succssed!");
       
          } else {
            Rest.showToast("error1");
          };
        }, function error(){
          Rest.showToast("error2");
        });};

$scope.modifierAffectation = function() {
  Rest.put(Config.URL.PUTTAXI+JSON.parse(window.localStorage['LoggedTaxiAffect']).idTaxi, $scope.taxi)
         .then(function success(res){
          if (!res.error) {     
                      Rest.showToast("modification enregistrer");
          } else {
            Rest.showToast("error1");
          };
        }, function error(){
          Rest.showToast("error2");
        });};


 $scope.ModifierAffect = function(affectation){
 window.localStorage['LoggedAffectation'] = JSON.stringify(affectation);
  $state.go('app.ModifierAffectation'); 
  };


})






.controller('ModifierTaxiCtrl', function($scope, Rest, Config, $state, $ionicHistory) {
  
$scope.taxi=JSON.parse(window.localStorage['LoggedTaxi']);
$scope.putTaxi = function() {
  Rest.put(Config.URL.PUTTAXI+JSON.parse(window.localStorage['LoggedTaxi']).idTaxi, $scope.taxi)
         .then(function success(res){
          if (!res.error) {     
           Rest.showToast("modification enregistrer");
          } else {
            Rest.showToast("error1"+$scope.taxi.matricule);
          };
        }, function error(){
          Rest.showToast("error2");
        });};



})


/*
.controller('AccCtrl', function($scope, Rest, Config, $ionicModal, $state) {
   $scope.accessoire = {
    image1 : 'img/take.png',
    image2 : 'img/take.png',
    image3 : 'img/take.png'
  };
  $scope.listAcc = [];

  $scope.getAcc = function() {
    Rest.get(Config.URL.ACCESSOIRES)
    .then(function success(res){
      $scope.listAcc = res.accessoire;
    }, function error(err){
      Rest.showToast(err.error_msg);
    });
  };

 $ionicModal.fromTemplateUrl('templates/modal/acc-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.showModal = function() {
    $scope.modal.show();
  };

  $ionicModal.fromTemplateUrl('templates/modal/acc-search.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSearch = modal;
  });

  $scope.closeSearch = function() {
    $scope.modalSearch.hide();
  };

  // Open the login modal
  $scope.showSearch = function() {
    $scope.modalSearch.show();
  };


 $scope.goToDetails = function(accessoire){
    $state.go('app.AccessDetail', {details : accessoire});
  };
  $scope.getAcc();
})

.controller('ProductCtrl', function($scope, Rest, Config) {
  $scope.mesAcc = [];
  $scope.mesAnim = [];

  $scope.getAcc = function() {
    Rest.get(Config.URL.MY_ACCESSOIRES + '/?id=' + JSON.parse(window.localStorage['LoggedUser']).id)
    .then(function success(res){
      console.log(res)
      $scope.mesAcc = res.accessoire;
    }, function error(err){
      Rest.showToast(err.error_msg);
    });
  };

  $scope.getAnimaux = function() {
    Rest.get(Config.URL.MY_ANIMALS + '/?id=' + JSON.parse(window.localStorage['LoggedUser']).id)
    .then(function success(res){
      console.log(res)
      $scope.mesAnim = res.animal;
    }, function error(err){
      Rest.showToast(err.error_msg);
    });
  };

  $scope.getAnimaux();
  $scope.getAcc();
})

.controller('AnimoiCtrl', function($scope) {

})

.controller('AnimDetailCtrl', function($scope, $stateParams) {

  $scope.selectedAnimal = $stateParams.details;
  console.log($scope.selectedAnimal);

})

.controller('AccessDetailCtrl', function($scope, $stateParams) {

  $scope.selectedAccessoire = $stateParams.details;
  console.log($scope.selectedAccessoire);

})

.controller('ProfilCtrl', function($scope, $ionicHistory, $state, Rest, Config) {

  $scope.me = {};

  $scope.myProfil = function(){
    Rest.get(Config.URL.PROFIL + '/?id=' + JSON.parse(window.localStorage['LoggedUser']).id)
    .then(function success(res){
      console.log(res)
      $scope.me = res.user[0];
    }, function error(err){
      Rest.showToast(err.error_msg);
    });
  };

  $scope.signOut = function(){
    window.localStorage['LoggedIn'] = false;
    window.localStorage['LoggedUser'] = null;
    $state.go('login');
    $ionicHistory.clearHistory();
  };


  $scope.myProfil();
}); 
*/