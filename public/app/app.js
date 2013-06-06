'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: HomeCtrl});
    $routeProvider.when('/learn', {templateUrl: 'partials/learn.html', controller: LearnCtrl});
    $routeProvider.when('/learn/:class', {templateUrl : '/partials/learn.html', controller : LearnCtrl});
    $routeProvider.when('/teach', {templateUrl: 'partials/teach.html', controller: TeachCtrl});
    $routeProvider.when('/class', {templateUrl: 'partials/class.html', controller: ClassCtrl});
    $routeProvider.when('/class/create', {templateUrl: 'partials/class_create.html', controller: ClassCreateCtrl});
    $routeProvider.when('/class/:id', {templateUrl: 'partials/class_page.html', controller: ClassPageCtrl});
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl});
    $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: RegisterCtrl});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);