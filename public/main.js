var modObj = angular.module("myApp", ['ui.router', 'ui.bootstrap']);
modObj.config( [ "$stateProvider", "$urlRouterProvider",function($stateProvider, $urlRouterProvider){
   $urlRouterProvider
   $urlRouterProvider.otherwise('/customerview');
    $stateProvider
//loading customerview into the main frame which is index    
   .state('customerview', {
       url: '/customerview',
       templateUrl: 'templates/customerView.html',
        controller: 'customerViewCtrl'
   })
    //loading kitchenview into the main frame which is index  
   .state('kitchen', {
    //  params: [1,2,3,4,5,6],
       url: '/kitchen',
       templateUrl: 'templates/kitchenView.html',
       controller: 'kitchenCtrl'
    
   })
     //loading cashierview into the main frame which is index
   .state('cashierview', {
       url: '/cashierview',
       templateUrl: 'templates/cashierView.html'
   })
    //loading startersview into customerview template "using nested routing"
    .state('customerview.starters', {
        url: '/starters',
        templateUrl: 'templates/nested templates/starters.html',
        controller: ["$scope","$http","menuService","$rootScope",function($scope, $http, menuService, $rootScope) {
           
          
          
              
            
            //adding starter items to right pane
            $scope.selectitem = function($index){
            // assigning the selected item to obj using '$index' index of an array    
                 var obj= $scope.menuitem[$index];
                console.log($index);
                console.log("I am sending a request to server to edit menuitem");
                console.log(obj._id);
                $scope.selectedStarter = obj;
                console.log($scope.selectedStarter.name);
                menuService.setSelectedStarter(obj);
                 $rootScope.$broadcast("starteritem", $scope.selectedStarter);  
          
        }
       
   }]
    })
   //loading maincourse into customerview template "using nested routing"
     .state('customerview.maincourse', {
        url:'/maincourse', 
        templateUrl: '/templates/nested templates/maincourse.html',
        controller: ["$scope","$rootScope", function($scope, $rootScope){
        //selecting the maincourse items
            $scope.selectmaincourse = function($index){
                console.log("I selected this item");
                $scope.selectedmaincourse = $scope.maincourseitems[$index];
                console.log($scope.selectedmaincourse);
        //pushing the maincourse items to StarterArray
                $rootScope.selectedStarterArray.push($scope.selectedmaincourse);
                if($rootScope.selectedStarterArray.length!==0){
                       $rootScope.orderSummaryPanel = true;
                }
            }
        }]
    })
     //loading sizzlers into customerview template "using nested routing"
    .state('customerview.sizzlers', {
        url: '/sizzlers',
        templateUrl: 'templates/nested templates/sizzlers.html',
        controller: ["$scope", "$rootScope", function($scope, $rootScope){
    // selecting sizzlers and pushing them to StarterArray to merge to final order
            $scope.selectsizzler = function($index) {
                $scope.selectedsizzler = $scope.sizzleritems[$index];
                $rootScope.selectedStarterArray.push($scope.selectedsizzler);
                if($rootScope.selectedStarterArray.length!==0){
                       $rootScope.orderSummaryPanel = true;
                }
            }
        }]
    })
     //loading bread into customerview template "using nested routing"
    .state('customerview.bread', {
        url: '/bread', 
        templateUrl: 'templates/nested templates/bread.html',
        controller: ["$scope","$rootScope", function($scope,$rootScope){
            //selecting bread
            $scope.selectbread=function($index){
                $scope.selectedbread=$scope.breaditems[$index];
                $rootScope.selectedStarterArray.push($scope.selectedbread);
                if($rootScope.selectedStarterArray.length!==0){
                       $rootScope.orderSummaryPanel = true;
                }
            }
        }]
    })
     //loading drinks into customerview template "using nested routing"
      .state('customerview.drinks', {
        url: '/drinks', 
        templateUrl: 'templates/nested templates/drinks.html',
        controller: ["$scope","$rootScope", function($scope,$rootScope){
            //selecting drinks
            $scope.selectdrink = function($index){
                $scope.selecteddrink = $scope.drinkitems[$index];
                $rootScope.selectedStarterArray.push($scope.selecteddrink);
                if($rootScope.selectedStarterArray.length!==0){
                       $rootScope.orderSummaryPanel = true;
                }
            }
        }]
    }) 
     //loading deserts into customerview template "using nested routing"
      .state('customerview.deserts', {
        url: '/deserts', 
        templateUrl: 'templates/nested templates/deserts.html',
        controller: ["$scope","$rootScope", function($scope,$rootScope){
            //selecting deserts
            $scope.selectdesert = function($index){
                $scope.selecteddesert = $scope.desertsitems[$index];
                $rootScope.selectedStarterArray.push($scope.selecteddesert);
                if($rootScope.selectedStarterArray.length!==0){
                       $rootScope.orderSummaryPanel = true;
                }
            }
        }]
    }) 
     //loading entertainment into customerview template "using nested routing"
    .state('customerview.entertainment', {
        url: '/entertainment',
        templateUrl: 'templates/nested templates/entertainment.html'
    })
     //loading reviews into customerview template "using nested routing"
    .state('customerview.reviews', {
        templateUrl: 'templates/nested templates/reviews.html'
    })
    .state('customerview.customerhistory', {
        templateUrl: 'templates/nested templates/customerhistory.html'
    })
     //loading signup into customerview template "using nested routing"
    .state('customerview.signup', {
        templateUrl: 'templates/nested templates/signup.html'
    })
       

}]);
/*modObj.controller('menulistCtrl', ["$scope", function($scope){
    $scope.starters = function(){
        console.log('This is starters function');
    }
}]); */
modObj.service("menuService", function(){
    this.SelectedStarter="";
    this.setSelectedStarter = function(obj) {
        this.selectedStarter= obj;
    }
    this.getSelectedStarter = function() {
        return this.selectedStarter; 
    }
    
    // linking deleted item on right pane in customer view to servie to delete price
    this.setdeleteitem = function(obj){
        this.deleteitem = obj;
    }
    this.getdeleteditem = function(){
        return this.deleteitem;
    }
});
modObj.factory("sendRequestFac", ["$http","$q", function($http, $q){
    return {
     // sending a request to node server to get data for maincourse   
        maincourse: function(){
            var deffered = $q.defer();
            $http.get('/maincourse').then(function success(response){
             
                deffered.resolve(response);
            })
            return deffered.promise;
        }
    }
}]);

modObj.service("ordertokitchen", function(){
   // adding the confirmed order array to kitchen view
    this.setconfirmedorder = function(order){
        this.confirmedorder = order;
    }
    this.getconfirmedorder = function(){
        return this.confirmedorder;
    }
    
    //capturing the selected table from customer view and sending to kitchen
    this.setSelectedTable = function(selectedTable){
        this.ans = selectedTable;
        console.log(this.ans);
    }
    this.getSelectedTable = function(){
        return this.ans;
      
    }
});

// table 2 order service

modObj.service("table2Service", function(){
    // table 2 order getter setter functions
    this.settable2Order = function(table2Order){
        this.table2Order = table2Order;
    }
    this.gettable2Order = function(){
        return this.table2Order;
    }
    
    // table 3 order getter setter functions
    this.settable3Order = function(table3Order) {
        this.table3Order = table3Order;
    }
    this.gettable3Order = function() {
        return this.table3Order;
    }
    
    // table 4 order getter setter functions
     this.settable4Order = function(table4Order) {
        this.table4Order = table4Order;
    }
    this.gettable4Order = function() {
        return this.table4Order;
    }
    
    // table 5 order getter setter functions
     this.settable5Order = function(table5Order) {
        this.table5Order = table5Order;
    }
    this.gettable5Order = function() {
        return this.table5Order;
    }
    
    // table 6 order getter setter functions
     this.settable6Order = function(table6Order) {
        this.table6Order = table6Order;
    }
    this.gettable6Order = function() {
        return this.table6Order;
    }
});

modObj.service("confirmedOrderService", function(){
    this.settable2Confirmation = function(orderConfirmation){
        this.table2Confirmation = orderConfirmation;
    }
    
    this.gettable2Confirmation = function() {
        return this.table2Confirmation;
    }
})
