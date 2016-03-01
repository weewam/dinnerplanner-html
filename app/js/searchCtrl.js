// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope, Dinner) {
  	$scope.status = 'loading';
  	$scope.query = '';
  	$scope.course = 'main';

	$scope.search = function() {
  		$scope.status = 'loading';

		var searchString = ($scope.query === "") ? $scope.course : $scope.query + " " + $scope.course;

		Dinner.DishSearch.get({ title_kw: searchString }, function(data) {
			$scope.dishes = data.Results;
  			$scope.status = (data.Results.length > 0) ? 'success' : 'no-result';
		}, function(data) {
  			$scope.status = 'no-connection'
		});
	}

	var init = function() {
		$scope.search();
	}

	init();
});