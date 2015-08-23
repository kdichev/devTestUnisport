/**
 * AngularJS SinglePage Unisport
 */

var app = angular.module('onePageUnisportApp', [
    'ui.router', 'ngResource',
]);


app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {

    $stateProvider

        // route to show our basic form (/form)
        .state('home', {
            url: '/',
            templateUrl: 'pages/home.html'
            //controller: ''
        })

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/404');
}]); 

app.controller('productsCtl',["$scope", "$http" , function ( $scope, $http )  {

    $http.get('data.json')
        .success(function (productsData) {
            $scope.product = productsData.products;
        console.log($scope.product);

        });

}]);






