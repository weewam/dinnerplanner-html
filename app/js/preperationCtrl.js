// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('PreperationCtrl', function ($scope, Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.appetizer = Dinner.getSelectedDish("Appetizers");
  $scope.main = Dinner.getSelectedDish("Main Dish");
  $scope.desserts = Dinner.getSelectedDish("Desserts");

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.getFullMenu = function() {
    console.log(Dinner.getFullMenu());
    return Dinner.getFullMenu();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});