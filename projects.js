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
			projectUrl: '=',
			projectImage: '=',
			projectDesc: '=',
			projectPrev: '=',
			projectNext: '=',
			projectList: '='
		},
		replace: true,
		link: function(scope, elm, attrs) {
			scope.clicked = function(data) {
				var prev = scope.projectList[data.prev],
					next = scope.projectList[data.next];

				if(data.direction === 'prev') {
					scope.projectImage = '/assets/images/' + prev.img;
					scope.projectDesc = prev.desc;
					scope.projectUrl = prev.str;
					scope.projectPrev = restrictPrev(data.prev - 1);
					scope.projectNext = restrictPrev(data.next - 1);
				}

				if(data.direction === 'next') {
					scope.projectImage = '/assets/images/' + next.img;
					scope.projectDesc = next.desc;
					scope.projectUrl = next.str;
					scope.projectPrev = restrictNext(data.prev + 1);
					scope.projectNext = restrictNext(data.next + 1);
				}
			};

			var restrictPrev = function(val) {
				return (val) === -1 ? scope.projectList.length - 1 : val;
			};

			var restrictNext = function(val) {
				return (val) === scope.projectList.length ? 0 : val;
			};
		},
		template:
			'<div>'+
				'<i class="fa fa-chevron-left" ng-click="clicked({str: projectUrl, img: projectImage, desc: projectDesc, prev: projectPrev, next: projectNext, direction: \'prev\'})"></i>'+
				'<img ng-src="{{projectImage}}">'+
				'<span>{{projectDesc}} <a ng-href="{{projectUrl}}" target="_blank">[open in new tab]</a></span>'+
				'<i class="fa fa-chevron-right" ng-click="clicked({str: projectUrl, img: projectImage, desc: projectDesc, prev: projectPrev, next: projectNext, direction: \'next\'})"></i>'+
			'</div>'
	}
}]);