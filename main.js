$(document).on('ready', function() {



// JS16 Restaurant Objects


var FoodItem = function(name, cal, vegan, glutenFree, citrusFree ){
	
	this.name		= name;
	this.cal		= cal;
	this.vegan		= vegan;
	this.glutenFree = glutenFree;
	this.citrusFree = citrusFree;


}

	FoodItem.prototype.toString = function(){
			var menu = " Name: " + this.name + " Calories: " + this.cal + " Vegan: " + this.vegan + " Gluten Free: " + this.glutenFree + " Citrus Free: " + this.citrusFree;
			return menu;
	}


// Food Items

	var burrito = new FoodItem('burrito', 400, false, false, true);
	var rice = new FoodItem('rice', 120, true, true, true);
	var beans = new FoodItem('beans', 300, true, true, true);

	var guacamole = new FoodItem('guacamole', 400, true, true, false);
	var cornChips = new FoodItem('cornChips', 300, true, true, true);
	var salsa = new FoodItem('salsa', 200, true, true, false);

	var tequila = new FoodItem('tequila', 200, true, true, true);
	var sweetSour = new FoodItem('sweetSour', 100, true, true, false);
	var salt = new FoodItem('salt', 0, true, true, true);

	var buyButton = $('<button class="btn order">Order</button>');

// Object Classes

var Drink = function(name, description, price, ingredients, id){

	this.name 			= name;
	this.description	= description;
	this.price			= price;
	this.ingredients	= ingredients;
	this.id 			= id;
}
	
	Drink.prototype.create = function(){
			var drink = $('<div class="menu-item">').attr("data-id", this.id);
			var descrip = $('<p> class="descrip"</p>').text( this.name + ' \n' + this.description + ' \n' + '$' + this.price );
			drink.append(descrip, buyButton);
			return drink;
		}


var Plate = function(name, description, price, ingredients, id){

	this.name 			= name;
	this.description	= description;
	this.price			= price;
	this.ingredients	= ingredients;
	this.id 			= id;
}
	// my create function to create the Div in the DOM
	Plate.prototype.create = function(){
			var food = $('<div class="menu-item">').attr("data-id", this.id);
			var foodName = $('<div class="food name"></div>').text( this.name );
			var foodDescrip = $('<div class="food descrip"></div>').text( this.description );
			var foodPrice = $('<div class="food price"></div>').text("$" + this.price);

			food.append(foodName, foodDescrip, foodPrice, buyButton.clone());
			return food;

		}


		Plate.prototype.isVegan = function(){
			for(var i = 0; i < ingredients.length; i++){
				if (FoodItem.vegan){
					return true
				}
				else return false
			}
		}

		Plate.prototype.isGlutenFree = function(){
			for(var i = 0; i < ingredients.length; i++){
				if (FoodItem.glutenFree){
					return true
				}
				else return false
			}
		}

		Plate.prototype.isCitrusFree = function(){
			for(var i = 0; i < ingredients.length; i++){
				if (FoodItem.citrusFree){
					return true
				}
				else return false
			}
		}

		var burritoPlate = new Plate('El Burrito', 'A delicious burrito! ', 8, [burrito, rice, beans], 0);

		var guacamolePlate = new Plate('The Guac', 'Green and Good! ', 4, [guacamole, cornChips, salsa], 1);

		var margaritaDrink = new Drink('Margarita', 'Top Shelf! ', 12, [tequila, sweetSour, salt], 2);

var Order = function(plate){
	this.plate = plate;
}

	Order.prototype.toString = function(){
			var ticket = "Your Order: " + this.plate;
			return ticket;
		}

// Menu Object
var Menu = function(plate){
	this.plate = plate;
}
	// Menu create method
	Menu.prototype.create = function(){
		var foodList = $('<div class="foodList">');
		var food = $('<h2></h2>').text( 'Love Our Food:');
		// var drinkList = $('<div class="drinkList">');
		var bev = $('<h2></h2>').text( 'Love Our Drinks: ');
		foodList.append(food, [burritoPlate.create(), guacamolePlate.create()], bev, [margaritaDrink.create()]);

			return foodList;
	}

// Restaurant object

var Restaurant = function(name, description, menu){
	this.name 	= name;
	this.description = description;
	this.menu = menu;
}
	// Restaurant create method
	Restaurant.prototype.create = function(){ 
		var joint = $('<div class="restaurant">');
		var header = $('<div class="page-header">');
		var title = $('<h1 class="title"></h1>').text('Welcome to ' + this.name);
		header.append(title);
		joint.append(header).append(MexMenu.create());
			return joint;
	}



var Customer = function(dietaryPreference){
	this.dietaryPreference = dietaryPreference;
}

	Customer.prototype.toString = function(){
		var person = "Dietary Preference: " + this.dietaryPreference;
		return person;
	}


var MexMenu = new Menu([burritoPlate, guacamolePlate, margaritaDrink]);
console.log(MexMenu.create());


var MexRestaurant = new Restaurant('BoCoMex ', 'The worst Mexican food in Colorado!', MexMenu);
 $('.container').append(MexRestaurant.create());



var itemsOrdered = []; // array of ordered items
// Event Handler for Placing Order
$('.container').on('click', '.btn.order', function(){
	

	var addOrder = confirm('Would you like to add this to your order?');
	
	if (addOrder){
		// this returns the plate that was clicked
		var orderItem = $(this).closest('.menu-item').data('id');
		var item = _.find(MexMenu.plate, function(plate){
			return plate.id === orderItem;
		});

	itemsOrdered.push(item.price); // Pushes each ordered item to an array

	// Creates the display language and displays the each ordered item
	var displayItem = item.name + " $" + item.price + '\n';
	var orderList = $('<div class="order-list"</div>').text(displayItem); 
	
	var sum = _.reduce(itemsOrdered, function(memo, num){return memo + num}, 0); // This sums the value of the array of ordered items

	// Adds the order total language and amount
	var orderTotal = $('<div class="order-total"></div>').text('Total Order Amount: $' + sum);
	
	// Makes the order window visible and then appends the ordered items and running total
	$('.order-total').remove(); // this is here to remove previous totals and before adding the new total
	$('.order-window').append(orderList, orderTotal).show();

	}
});
// this event handler removes the order window and resets for a new order
$('.btn.place').on('click', function(){
	$('.order-window').hide(); // hide the order
	$('.order-list').remove(); // remove the list of items ordered

	itemsOrdered.length = 0; // reset the array to empty
	confirm('Thank you for your order!!!');
});











});