var app = angular.module("onePageUnisportApp", ["ui.router", "ngResource"]);
app.config(["$stateProvider", "$urlRouterProvider", function (a, b) {
    a.state("home", {
        url: "/",
        templateUrl: "pages/home.html"
    }), b.otherwise("/404")
}]), app.controller("productsCtl", ["$scope", "$http", function (a, b) {
    b.get("data.json").success(function (b) {
        a.product = b.products, console.log(a.product)
    })
}]);