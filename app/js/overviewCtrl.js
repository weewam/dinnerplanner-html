// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('OverviewCtrl', function ($scope, Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.appetizer = Dinner.getSelectedDish("Appetizers");
  $scope.main = Dinner.getSelectedDish("Main Dish");
  $scope.desserts = Dinner.getSelectedDish("Desserts");

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.getCostOfMenu = function() {
    return Dinner.getPriceOfMenu();
  }

  $scope.getCostOfDish = function(dish) {
    return Dinner.getPriceOfDish(dish);
  }

  $scope.getAppetizer = function() {
    return Dinner.getSelectedDish("Appetizers");
  }

  $scope.getMainDish = function() {
    return Dinner.getSelectedDish("Main Dish")
  }

  $scope.getDessert = function() {
    return Dinner.getSelectedDish("Desserts");
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});