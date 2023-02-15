(function(){

'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItems);

function FoundItems(){
	var ddo = {

		templateUrl: 'FoundItems.html',
		scope:{
			menu: '=myList'

		}


	}

	return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){

	var menu = this;
	menu.name = 'soup';

	menu.sendRequest = function(name){
		var promise =  MenuSearchService.getMatchedMenuItems(name);

		promise.then(function(response){
		
		menu.categories = response.data;

		console.log(menu.categories);

	}).catch(function(erro){
	
		console.log("erro");
	});	
		

	};

};




	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http){
	var service = this;

		service.getMatchedMenuItems = function(name){
			var response = $http({
				method:"GET",
				url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"),
				params: {
					category: name
				}
				
			});

			return response;
		};
	}; //endOf MenuSearchService


})();