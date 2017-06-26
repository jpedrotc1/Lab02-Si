angular.module("johnTv").controller("johnTvCtrl", function($scope, $http) {

		$scope.series = [];
        $scope.profile = [];
        $scope.watchList = [];

	  	$scope.searchSeries = function(serieName){
        	$http.get('https://omdbapi.com/?s=' + serieName +'&type=series&apikey=93330d3c')
        	.then(function (response) {
        			
        		if(response.data.Response == "False"){
        			let message = "Filme não encontrado!";
          	 		alert(message);
        		}
           		$scope.series = response.data.Search;

           }

           )
        }

        $scope.addSerieWatchlist = function (serie) {
           $scope.watchList.push(angular.copy(serie));
        }

        $scope.addSerieProfile = function (serie) {
        	let arrayID = $scope.profile.map(function (serie){
        	return serie.imdbID;
        });
       	  	let indexOfSearch = arrayID.indexOf(serie.imdbID);
          	if(indexOfSearch == -1){
          		$http.get('https://omdbapi.com/?i=' + serie.imdbID +'&plot=full&apikey=93330d3c').then(function (response) {
        		$scope.profile.push(angular.copy(response.data));	
           	})
          }else{
          	 	let message = "Filme Já Adicionado!";
          	 	alert(message);
          }	
        }

        $scope.setGrade = function (serie,grade) {
        	serie.Grade = grade; 
        }

        $scope.getInfoForModal = function (serie){
        	$scope.objModal = angular.copy(serie);
        }

        $scope.getInfoForModalRemove = function (serie){
        	$scope.objModalRemove = angular.copy(serie);
        }

        $scope.removeSerieProfile = function () {
           let index = $scope.profile.map(function(item){
           	return item.imdbID;
           }).indexOf($scope.objModalRemove.imdbID);
           $scope.profile.splice(index, 1);
        }

        $scope.setLastEpisode = function(serie,ep){
  			serie.lastEpisode = ep;
  		}

	 });