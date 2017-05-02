angular.module('starter.controllers', [])


   
.controller('MyCtrl', function($scope) {
 $scope.locationChanged = function (location) {
   alert(location);
 };})




.controller('MarkerRemoveCtrl', function($scope, $ionicLoading, $compile) {

   $scope.init = function() {

 directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

     directionsService = new google.maps.DirectionsService();
        var myLatlng = new google.maps.LatLng(34.076815,10.1538083);

        var mapOptions = {
          center: myLatlng,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP, };


        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
      var image = 'images/man_arrow-0.png';
       directionsService = new google.maps.DirectionsService();
   navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
           // var myLocation = new google.maps.Marker({
             //   position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
               // map: map,
              //  title: "My Location",
                //color:'positive',
                //icon:image });

var meLat=pos.coords.latitude;
var meLon=pos.coords.longitude;
$scope.calcRoute(meLat,meLon);
        }); 

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directionsPanel"));

         /**
   var dd=new google.map.Marker(35.3174814,9.8583655);


var destination=google.maps.event.addListener(map, 'click', function (event) {
    new google.maps.Marker({
  map: map,
  position: event.latLng,
  draggable:true
    });
    google.maps.event.removeListener(destination);
}); **/
         directionsDisplay = new google.maps.DirectionsRenderer();


     directionsService = new google.maps.DirectionsService();
 };
$scope.calcRoute=  function(meLat,meLon) {
  var start = new google.maps.LatLng(meLat, meLon);
  var end = new google.maps.LatLng(meLat, meLon);
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    };
  });

  directionsDisplay = new google.maps.DirectionsRenderer({draggable:true});
};



$scope.map = map;

})



















.controller('AppCtrl', function($scope, $state) {
 
})


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
                else{   $state.go('app.HomeAdmin '); };
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

$scope.getTaxi();
})


.controller('AffectationCtrl', function($scope, Rest, Config, $ionicHistory, $state) {
$scope.LoggedIn=function(){
  if(window.localStorage['LoggedIn'] !=true)
    $state.go('login');
};

$scope.Affect={};
$scope.Affect.nom=JSON.parse(window.localStorage['LoggedUserAffect']).nom;
$scope.Affect.matricule=JSON.parse(window.localStorage['LoggedTaxiAffect']).matricule;
$scope.taxiAF = {  };
$scope.listeTaxiAFF = [];
$scope.listeAffect = [];
$scope.affectation={};


    $scope.getAffectation = function() {
    Rest.get(Config.URL.GETAFFECTATION+ JSON.parse(window.localStorage['LoggedUser']))
        .then(function success(res){  
          $state.go('app.ListeAffectation')
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
 window.localStorage['LoggedTaxiAffect'] = JSON.stringify(taxi);
  $state.go('app.Affectation'); 
  };


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
  
    
 window.localStorage['LoggedUserAffect'] = JSON.stringify(user);
  $state.go('app.Affectation'); 
  };
 
$scope.Affect.user_id=JSON.parse(window.localStorage['LoggedUserAffect']).id;
$scope.Affect.taxi_id=JSON.parse(window.localStorage['LoggedTaxiAffect']).idTaxi;

$scope.AjoutAffect=function(){
        Rest.post(Config.URL.AJOUTAFFECT, $scope.Affect)
         .then(function success(res){
          if (!res.error) {         
            Rest.showToast("Register succssed!");
       $state.go('app.ListeAffectation')
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