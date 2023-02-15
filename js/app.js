(function () {
  'use strict';
  
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
  .directive('foundItems', FoundItemsDirective);
  
  function FoundItemsDirective() {
      var ddo = {
          templateUrl: 'FoundItems.html',
          scope: {
              items: '<',
              onRemove: '&'
          }
      };

      return ddo;
  }

  
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var nidctrl = this;
    nidctrl.searchTerm = '';
    nidctrl.found = [];

    nidctrl.search = function () {
      nidctrl.found = [];
      if (nidctrl.searchTerm.trim() != "") {
          var promise = MenuSearchService.getMatchedMenuItems(nidctrl.searchTerm);
          promise.then(function (result) {
              nidctrl.found = result;
              
          })
          .catch(function (error) {
              console.log("Oh no! Something went terribly wrong: " + error);
          });
      }
    }

    nidctrl.remove = function (index) {
      nidctrl.found.splice(index, 1);
    }
  
  }
  
  
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
  
    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });
  
      return response.then(function (result) {
          
          var foundItems = [];
          var data = result.data;
          for (var category in data) {
              //console.log(data[category]);
              foundItems.push(
                  data[category].menu_items.filter(
                      item => item.description.toLowerCase().includes(searchTerm.toLowerCase())
                  )
              );
          }
          return foundItems.flat();
      });
    };
  
  }
  
  })();
