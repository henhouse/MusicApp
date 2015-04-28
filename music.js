(function() {
    var app = angular.module('music', []);

    app.controller('MusicianController', ['$scope', function($scope) {
        $scope.name = '';
        $scope.genre = '';
        $scope.albums = '';
        $scope.songs = '';
        
        $scope.order = 'name';
        
        var remember;

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

        $scope.edit = function(musician) {
            $scope.name = musician.name;
            $scope.genre = musician.genre;
            $scope.songs = musician.songs;
            $scope.albums = musician.albums;
            $scope.editing = true;
            remember = musician;
        };
        
        $scope.update = function(musician) {
            $scope.remove(remember);
            $scope.add();
            $scope.editing = false;
        };
    }]);
}());
