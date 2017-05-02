
angular.module('starter',  [
  'ionic',
  'ngMap',
  'starter.controllers',
  'starter.services',
  'starter.config',
  'ion-place-tools',
 // 'zingchart-angularjs',

  ])


    .run(function($ionicPlatform) {
        $ionicPlatform.ready,(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })




.config(function($stateProvider, $urlRouterProvider) {

 $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller:'AppCtrl'

  })

  .state('app.ListeContact', {
    url: '/ListeContact',
    views: {
      'menuContent': {
        templateUrl: 'templates/ListeContact.html'
      }
    }
  })
  .state('app.HistPassager', {
    url: '/HistPassager',
    views: {
      'menuContent': {
        templateUrl: 'templates/HistPassager.html',
        controller:'ListeResPassHis'
      }
    }
  })
 
  .state('app.Apropos', {
    url: '/Apropos',
    views: {
      'menuContent': {
        templateUrl: 'templates/Apropos.html'
      }
    }
  })

    

.state('app.HomeProprietaire',{
    url:'/HomeProprietaire',
       views: {
        'menuContent': {
    templateUrl:'templates/HomeProprietaire.html',
    controller:'HomeProprietaireCtrl'
  }}})

.state('app.EspacePassager',{
    url:'/EspacePassager',
     views: {
      'menuContent': {
    templateUrl:'templates/EspacePassager.html'
  }}})
 

  .state('app.Affectation',{
    url:'/Affectation', views: {
      'menuContent': {
    templateUrl:'templates/Affectation.html',
    controller:'AffectationCtrl'
  }}})
 .state('app.ListeAffectation',{
    url:'/ListeAffectation', views: {
      'menuContent': {
    templateUrl:'templates/ListeAffectation.html',
    controller:'AffectationCtrl'
  }}})
  .state('app.ListeDETaxiAffect',{
    url:'/ListeDETaxiAffect', views: {
      'menuContent': {
    templateUrl:'templates/ListeDETaxiAffect.html',
     controller:'AffectationCtrl'
  }}})
    .state('app.ListeDEUserAffect',{
    url:'/ListeDEUserAffect', views: {
      'menuContent': {
    templateUrl:'templates/ListeDEUserAffect.html',
     controller:'AffectationCtrl'
  }}})
     .state('app.ModifierAffectation',{
    url:'/ModifierAffectation', views: {
      'menuContent': {
    templateUrl:'templates/ModifierAffectation.html',
     controller:'AffectationCtrl'
  }}})

  .state('app.AjoutTaxi',{
    url:'/AjoutTaxi', views: {
      'menuContent': {
    templateUrl:'templates/AjoutTaxi.html',
    controller:'AjoutTaxiCtrl'
  }}})

  .state('app.ModifierTaxi',{
    url:'/ModifierTaxi',
     views: {
      'menuContent': {
    templateUrl:'templates/ModifierTaxi.html',
    controller:'ModifierTaxiCtrl'
  }}})
    .state('app.ModifierProfile',{
    url:'/ModifierProfile',
     views: {
      'menuContent': {
    templateUrl:'templates/ModifierProfile.html',
    controller:'ModifierProfileCtrl'
  }}})
        .state('app.Profile',{
    url:'/Profile',
     views: {
      'menuContent': {
    templateUrl:'templates/Profile.html',
    controller:'ProfileCtrl'
  }}})
   .state('app.ListeTaxi',{
    url:'/ListeTaxi', views: {
      'menuContent': {
    templateUrl:'templates/ListeTaxi.html',
    controller:'ListeTaxiCtrl'
      }}})

  .state('app.EspaceChauffeur',{
    url:'/EspaceChauffeur',
     views: {
      'menuContent': {
    templateUrl:'templates/EspaceChauffeur.html'
  }}})


.state('app.ResAvance',{
    url:'/ResAvance',
     views: {
      'menuContent': {
    templateUrl:'templates/ResAvance.html',
    controller:'ResAvanceCtrl'
  }}})
  .state('app.ResTemps',{
    url:'/ResTemps',
   views: {
      'menuContent': {
      templateUrl: 'templates/ResTemps.html',
 controller:'MarkerRemoveCtrl'
    
  }}
  })
    .state('app.Taxi',{
    url:'/ResTemps',
   views: {
      'menuContent': {
      templateUrl: 'templates/Taxi.html',
      controller:'ReservationCtrl'
    
  }}
  })
  .state('app.HomeAdmin',{
    url:'/HomeAdmin', views: {
      'menuContent': {
    templateUrl:'templates/HomeAdmin.html'
  }}})
           
    .state('app.Statistique',{
    url:'/Statistique', views: {
      'menuContent': {
    templateUrl:'templates/Statistique.html',
    controller: 'MainController'
  }}})
    .state('app.HomeChauffeur',{
    url:'/HomeChauffeur', views: {
      'menuContent': {
    templateUrl:'templates/HomeChauffeur.html'
  }}})
      .state('app.EspaceProprietaire',{
    url:'/EspaceProprietaire',
     views: {
      'menuContent': {
    templateUrl:'templates/EspaceProprietaire.html',
    controller:'EspaceProprietaireCtrl'
  }}})
 $stateProvider.state('login',{
    url:'/login',
    templateUrl:'templates/login.html',
    controller: 'UserCtrl'
  })

  $stateProvider.state('inscription',{
    
    url:'/inscription',
    templateUrl:'templates/inscription.html',
      controller: 'UserCtrl'
  })
    $stateProvider.state('EspaceAdmin',{
    
    url:'/EspaceAdmin',
    templateUrl:'templates/EspaceAdmin.html'
  })

     $stateProvider.state('app.chauffeur',{
    
    url:'/chauffeur',
    templateUrl:'templates/chauffeur.html'
  })


$urlRouterProvider.otherwise('/login')
});


    