
var modObj = angular.module("myApp");

modObj.controller('customerViewCtrl', ["$scope", "menuService","$rootScope", "$uibModal", "ordertokitchen","$http","sendRequestFac","table2Service","confirmedOrderService", function($scope, menuService, $rootScope, modal,ordertokitchen,$http,sendRequestFac, table2Service,confirmedOrderService){
     // starter items display function
            $scope.starters = function() {
                          console.log("This is starter function");
                       
                   // $scope.starter = ["chicken Kiev", "chicken 65", "Fried Paneer"];
                           $http.get('/menuitem').then(function success(response){
                         
                          console.log(response.data);
                            $scope.menuitem = response.data;   
                           $scope.maincouredisplay = false;
    });
            }; 
    
    // maincourse items display function
            $scope.maincourse = function() {
                         
                         
                          sendRequestFac.maincourse().then(function(response) {
                   $scope.maincourseitems = response.data;  
                              console.log($scope.maincourseitems);
    });
            }; 
    // sizzlers items display function
           $scope.sizzlers = function() {
               $http.get('/sizzlers').then(function success(response){
                   $scope.sizzleritems = response.data;
               });
           }
    // bread items display function
            $scope.bread = function() {
               $http.get('/bread').then(function success(response){
                   $scope.breaditems = response.data;
               });
           }
    
    // drinks items display function
             $scope.drinks = function() {
               $http.get('/drinks').then(function success(response){
                   $scope.drinkitems = response.data;
               });
           }
        // desert items display function     
              $scope.deserts = function() {
               $http.get('/deserts').then(function success(response){
                   $scope.desertsitems = response.data;
               });
                   
   
               
           
           }
     //$css.add('css/customerView.css');
    // defining an array at root level to hold the selected items from menu
            $rootScope.selectedStarterArray = [];    
        $rootScope.$on('starteritem', function() {
    // receiving the selected starter from starter menu to add to right pane        
             $scope.selectedStarterItem = menuService.getSelectedStarter();
    // pushing the starter item to root array        
             $rootScope.selectedStarterArray.push($scope.selectedStarterItem);
             console.log($scope.selectedStarterItem);
             console.log($rootScope.selectedStarterArray);
             console.log($rootScope.selectedStarterArray.length);
   
        //to display the order summary panel    
              $rootScope.orderSummaryPanel = true;
    
           
            
        
           
           }
     )
       //deleting the item from right pane in customer view
        $scope.removeItem = function($index) {
            $scope.obj = $rootScope.selectedStarterArray[$index];
           console.log("I am about to delete this item");
            console.log($scope.obj);
            $rootScope.selectedStarterArray.splice($index, 1);
             $scope.totalSelectedItems = $rootScope.selectedStarterArray.length;
        // send this item to $watch collection to delete price of this item    
            menuService.setdeleteitem($scope.obj);
            if($rootScope.selectedStarterArray.length == 0) {
                $rootScope.orderSummaryPanel = false;
               
            }
          
        }
     
      
            
       // order confirmation from right panel to move to kitchen and cashier view
        $scope.confirmOrder = function() {
            $rootScope.selectedTable = ordertokitchen.getSelectedTable();        
    console.log($rootScope.selectedTable);
            console.log("I am about to confirm order");
    //if table not selected before confirming order and alert box pops up        
            if($rootScope.selectedTable == null){
                window.alert("Please select the table");
                    
                   } else {
    //if table is selected a modal opens with the order summary                   
            modal.open({
                templateUrl: 'modalWindows/confirmorder.html',
                controller: ["$scope","$uibModalInstance", function($scope, modalInstance){
                            $scope.closeModal = function() {
                                modalInstance.close();
                                // clearing the right side panel in customer view
                                $rootScope.selectedStarterArray = [];
                                 $rootScope.orderSummaryPanel = false;
                            } 
                           
                            
                             }],
                size: 'medium',
                backdrop: 'static'
            });
                  
       }
           
    // sending the order to different array's depending on the table selected        
            switch ($rootScope.selectedTable) {
                case 1: 
                    $http({
                        method: 'POST',
                        url: '/customerview/1',
                        data: $rootScope.selectedStarterArray
                    });
                    break;
                case 2: 
                    $http({
                        method: 'POST',
                        url: '/customerview/2',
                        data: $rootScope.selectedStarterArray
                    });
                    break;
}
            var order = $rootScope.selectedStarterArray;
            $scope.confirmedorder = order;
//sending the order to kitchen view from customerview            
            ordertokitchen.setconfirmedorder(order);
            console.log(order);
            
           
            
        } 
            
          
        // tables option values array
        $scope.tables = [1,2,3,4,5,6];
        
    // cancelling the order function
    $scope.cancelOrder = function(){
        $rootScope.selectedStarterArray = [];
         $rootScope.orderSummaryPanel = false;
    }
     $scope.setAns = function(selectedTable){
       ordertokitchen.setSelectedTable(selectedTable);
         console.log(selectedTable);
     } 
     //to calculate the price of selected items
      $rootScope.totalPrice=0;
// to watch for changes in the size of the array    
    $scope.$watchCollection('selectedStarterArray',function(){
        console.log($rootScope.selectedStarterArray.length);
//for initial item in the array to calculate the total price        
        if($rootScope.selectedStarterArray.length==1){
        for(i=0;i<$rootScope.selectedStarterArray.length;i=i+2){
            var obj = $rootScope.selectedStarterArray[i];  
           $rootScope.totalPrice = obj.Price;
            var index = $rootScope.selectedStarterArray.length-1;
        }
// to calculate the total price only if the array size increases            
            } else if($rootScope.selectedStarterArray.length > 1 && $rootScope.selectedStarterArray.length > $scope.index){
                for(i=$rootScope.selectedStarterArray.length-1; i<$rootScope.selectedStarterArray.length;i++) {
                    var obj = $rootScope.selectedStarterArray[i];
                    $rootScope.totalPrice = $rootScope.totalPrice + obj.Price;
                }
            }
        //to calculate total price if array size decreases or an item deleted
        else if($rootScope.selectedStarterArray.length < $scope.index){
                   var deleteditem = menuService.getdeleteditem();
              console.log("you deleted an item");
                $rootScope.totalPrice = $rootScope.totalPrice - deleteditem.Price;
            }
                            $scope.index = $rootScope.selectedStarterArray.length;
    });
       $scope.refresh = function() {
     $scope.orderConfirmation = confirmedOrderService.gettable2Confirmation();
          
       }
}]);