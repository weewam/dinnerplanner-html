// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookies) {
  var dishesInMenu = {
    "Appetizers": null, 
    "Main Dish": null, 
    "Desserts": null
  };

  var currentDish = {
    'id':100,
    'name':'',
    'type':'',
    'image':'',
    'description':'',
    'ingredients':[]
  };

  //Update number of guests
  this.setNumberOfGuests = function(num) {
    $cookies["guests"] = num;
  };

  this.getNumberOfGuests = function() {
    return parseInt($cookies["guests"]); 
  };


  //Gets dishes
  //Gets current dish
  this.setCurrentDish = function(dish) {
    currentDish = {
      'id': dish.RecipeID,
      'name': dish.Title,
      'category': dish.Category,
      'image': dish.ImageURL,
      'description': dish.Description,
      'instructions' : dish.Instructions,
      'ingredients' : this.getIngredientsOfDish(dish)
    };
  };

  this.getCurrentDish = function() {
    return currentDish; 
  };

  //Returns the dish that is on the menu for selected type
  this.getSelectedDish = function(type) {
    var menu = this.getFullMenu();

    for (x in menu) {
      if (menu[x].category === type) {
        return menu[x];
      }
    };

    return null;
  };

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    var dishes = [];
    
    for (x in dishesInMenu) {
      var dish = dishesInMenu[x];

      if (dish !== null) {
        dishes.push(dish);
      };
    };

    return dishes;
  };

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addCurrentDishToMenu = function() {
    $cookies[currentDish.category] = currentDish.id
    dishesInMenu[currentDish.category] = this.getCurrentDish();
  }
  
  //Gets the ingredients of a dish
  this.getIngredientsOfDish = function(dish) {
    ingredients = [];
    
    for (x in dish.Ingredients) {
      var ingredient = dish.Ingredients[x];

      ingredients.push({ name : ingredient.Name, quantity : Math.ceil(ingredient.Quantity), unit : ingredient.Unit });
    };

    return ingredients;
  };

  //Price stuff
  //Calculates the price by multiplying the quantity with the number of guests
  this.getPriceOfDish = function(dish) {
    if (this.getNumberOfGuests() == 0) {
      return 0;
    };

    var sum = 0,
      ingredients = dish.ingredients;

    for (x in ingredients) {
      var ingredient = ingredients[x]
      sum += ingredient.quantity;
    };
    
    return Math.round(sum * this.getNumberOfGuests());
  };

  //Gets the price of the current dish
  this.getPriceOfCurrentDish = function() {
    return this.getPriceOfDish(this.getCurrentDish());
  };

  //Gets the price of the entire menu
  this.getPriceOfMenu = function() {
    var menu = this.getFullMenu(),
      sum = 0;

    for(x in menu) {
      sum += this.getPriceOfDish(menu[x])
    }

    return sum;
  }

  //AJAX
  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{ pg: 1, rpp:25 , api_key : '18f3cT02U9f6yRl3OKDpP8NA537kxYKu'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{ api_key : '18f3cT02U9f6yRl3OKDpP8NA537kxYKu'});

  this.loadDishToMenu = function(id) {
    var that = this;

    this.Dish.get({ id }, function(dish) {
      dishesInMenu[dish.Category] = {
        'id': dish.RecipeID,
        'name': dish.Title,
        'category': dish.Category,
        'image': dish.ImageURL,
        'description': dish.Description,
        'instructions' : dish.Instructions,
        'ingredients' : that.getIngredientsOfDish(dish)
      }
    });
  }



  //Data consistency
  if(typeof $cookies["guests"] === 'undefined'){
    $cookies["guests"] = 1
  }

  if(typeof $cookies["Appetizers"] === 'undefined'){
    $cookies["Appetizers"] = null
  } else {
    this.loadDishToMenu($cookies["Appetizers"])
  }

  if(typeof $cookies["Main Dish"] === 'undefined'){
    $cookies["Main Dish"] = null
  } else {
    this.loadDishToMenu($cookies["Main Dish"])

  }

  if(typeof $cookies["Desserts"] === 'undefined'){
    $cookies["Desserts"] = null
  } else {
    this.loadDishToMenu($cookies["Desserts"])
  }


  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});