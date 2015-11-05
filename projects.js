var app = angular.module('projects', []);

app.controller('thumbs', ['$scope', '$http', function($scope, $http) {
	$scope.data = {
		style: 'close-it',
		image: null,
		desc: null,
		url: null,
		prev: null,
		next: null,
		list: []
	};


	$scope.showPic = function(str, img, desc, prev, next) {
		$scope.data.style = 'show-it';
		$scope.data.image = '/assets/images/' + img;
		$scope.data.desc = desc;
		$scope.data.url = str;
		$scope.data.prev = prev;
		$scope.data.next = next;
	};

	$scope.closeIt = function() {
		$scope.data.style = 'close-it';
		$scope.data.image = null;
		$scope.data.desc = null;
		$scope.data.url = null;
		$scope.data.prev = null;
		$scope.data.next = null;
	};

	$http.get('projects.data.json').success(function(data) {
		$scope.data.list = data.projects.filter(function(val) { 
			if(val.active) { 
				return val 
			} 
		});
	});
}])

.directive('detailsDisplay', [function() {
	return {
		restrict: 'E',
		scope: {
			projectData: '=',
			showpicFn: '&'
		},
		replace: true,
		link: function(scope, elm, attrs) {
			scope.clicked = function(data) {
				var prev = scope.projectData.list[data.prev],
					next = scope.projectData.list[data.next];

				if(data.direction === 'prev') {
					scope.showpicFn({
						str: prev.str, 
						img: prev.img, 
						desc: prev.desc, 
						prev: restrictPrev(data.prev - 1), 
						next: restrictPrev(data.next - 1)
					});
				}

				if(data.direction === 'next') {
					scope.showpicFn({
						str: next.str, 
						img: next.img, 
						desc: next.desc, 
						prev: restrictNext(data.prev + 1), 
						next: restrictNext(data.next + 1)
					});
				}
			};

			var restrictPrev = function(val) {
				return (val) === -1 ? scope.projectData.list.length - 1 : val;
			};

			var restrictNext = function(val) {
				return (val) === scope.projectData.list.length ? 0 : val;
			};
		},
		template:
			'<div>'+
				'<i class="fa fa-chevron-circle-left" ng-click="clicked({str: projectData.url, img: projectData.image, desc: projectData.desc, prev: projectData.prev, next: projectData.next, direction: \'prev\'})"></i>'+
				'<img ng-src="{{projectData.image}}">'+
				'<span>{{projectData.desc}} <a ng-href="{{projectData.url}}" target="_blank">[open in new tab]</a></span>'+
				'<i class="fa fa-chevron-circle-right" ng-click="clicked({str: projectData.url, img: projectData.image, desc: projectData.desc, prev: projectData.prev, next: projectData.next, direction: \'next\'})"></i>'+
			'</div>'
	}
}]);