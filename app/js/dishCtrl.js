// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope, $routeParams, Dinner) {
	var load = function(id) {
  		$scope.status = 'loading';

  		Dinner.Dish.get({ id }, function(data) {
  			if (data.StatusCode && data.StatusCode === 400) {
				$scope.status = 'no-connection';
  			} else {
  				Dinner.setCurrentDish(data);
				$scope.status = 'success';
  			}

		}, function(data) {
  			$scope.status = 'no-connection'
		});
	}

	$scope.getNumberOfGuests = function() {
		return Dinner.getNumberOfGuests();
	}

	$scope.getDish = function() {
		return Dinner.getCurrentDish();
	}

	$scope.getPriceOfDish = function() {
		return Dinner.getPriceOfCurrentDish();
	}

	$scope.addDishToMenu = function() {
		Dinner.addCurrentDishToMenu();
	}

  	$scope.status = 'loading';

	load($routeParams.dishId);
});