var modObj = angular.module("myApp");
modObj.controller("kitchenCtrl", ["$scope", "$rootScope","ordertokitchen", "$http","table2Service", "confirmedOrderService", function($scope, $rootScope, ordertokitchen, $http, table2Service, confirmedOrderService){
    
//updateorder function is triggered once the kitchenview page is loaded   
    $scope.updateorder = function(){ 
     $http.get('/kitchenview/table1').then(function success(response){
         $scope.table1Order = response.data;
         console.log(response.data);
     })
    } 
 
        
}]);
