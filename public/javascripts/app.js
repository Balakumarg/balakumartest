	// create the module and name it myApp
	var myApp = angular.module('myApp', ['ngRoute']);

	// configure our routes
	myApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})
			// route for the contact page
			.when('/update/:id', {
				templateUrl : 'pages/update.html',
				controller  : 'contactController'
			});
	});


	myApp.factory('sample', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('data');
			},
			create : function(todoData) {
				return $http.post('/postdata', todoData);
			},
			delete : function(id) {
				return $http.delete('/delete/' + id);
			},put : function(id) {
			//	alert(id)
				return $http.put('/update/'+ id);
			},udate : function(id,data) {
					alert(id)
					alert(data)
					return $http.post('/updates/'+ id,data);
				}
		}
	}]);
	// create the controller and inject Angular's $scope
	myApp.controller('mainController', function($scope,sample,$location,$routeParams) {


	
	
	
		sample.get()
			.success(function(data) {
				$scope.values = data
			});


			$scope.delete = function(id) {
				sample.delete(id)
				.success(function(data) {
					$scope.value = data
				})
			}


			$scope.upp = function(id) {

				sample.get(id)
				.success(function(data) {
					$scope.value = data
				});
			
				
			
		};
			$scope.create = function() {

	
					sample.create($scope.formData)
	
						.success(function(data) {
							$scope.loading = false;
							$scope.formData = {}; // clear the form so our user is ready to enter another
							$scope.value = data; // assign our new list of todos
						});
				
			};

			
			$scope.update = function(id) {

		
				 $location.path('/update/'+id)
		
			
		};



	});



	myApp.controller('contactController', function($scope,sample,$routeParams) {
	

			sample.put($routeParams.id)
	
			.success(function(data) {
				console.log(data[0])

				console.log(data.name)
		
				
					$scope.data=data[0]
				
			});

			$scope.updatesave = function(id) {
				console.log($scope.name)
				
				console.log($scope.data)
						sample.udate(id,$scope.data)
					//	if successful creation, call our get function to get all the new todos
						.success(function(data) {
							console.log(data)
							//$scope.formData = {}; // clear the form so our user is ready to enter another
							$scope.value = data; // assign our new list of todos
						});
			}
	});