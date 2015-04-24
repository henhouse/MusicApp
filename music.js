(function() {
    var app = angular.module('music', []);

    app.controller('MusicianController', ['$scope', function($scope) {
        $scope.name = '';
        $scope.genre = '';
        $scope.albums = '';
        $scope.songs = '';

        $.getJSON('getMusician', function(result) {
            $scope.musicians = result;
        });

        $scope.add = function() {
            var newMusician = {
                "name" : $scope.name,
                "genre" : $scope.genre,
                "albums" : $scope.albums,
                "songs" : $scope.songs
            };
            $scope.musicians.push(newMusician);
            $.post('putMusician', newMusician);
          $scope.name = $scope.genre = $scope.albums = $scope.songs = '';
        };
        
        $scope.remove = function(musician) {
            $scope.musicians.splice($scope.musicians.indexOf(musician), 1);
            $.post('removeMusician', musician);
        };                                     
    }]);
}());
