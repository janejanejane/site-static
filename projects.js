var app = angular.module('projects', []);

app.controller('thumbs', ['$scope', '$http', function($scope, $http) {
	$scope.data = {
		style: 'close-it',
		image: null,
		desc: null,
		url: null,
		list: []
	};


	$scope.showPic = function(str, img, desc) {
		console.log('clicked!', str, img);
		$scope.data.style = 'show-it';
		$scope.data.image = '/assets/images/' + img;
		$scope.data.desc = desc;
		$scope.data.url = str;
		console.log($scope.data.style);
	};

	$scope.closeIt = function() {
		$scope.data.style = 'close-it';
		$scope.data.image = null;
		$scope.data.desc = null;
		$scope.data.url = null;
		console.log($scope.data.style);
	}

	$http.get('projects.data.json').success(function(data) {
		$scope.data.list = data.projects;
		console.log($scope.data.list);
	});
}]);