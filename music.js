(function() {
    var app = angular.module('music', []);

    app.controller('MusicianController', ['$scope', function($scope) {
        $scope.name = '';
        $scope.genre = '';
        $scope.albums = '';
        $scope.song = '';
        
        $scope.order = 'name';
        $scope.shown = false;
        
        $scope.addingSongFlag = false;
        $scope.rememberName = '';
        
        var remember;

        $.getJSON('getMusician', function(result) {
            $scope.musicians = result;
        });
        
        $.getJSON('getSong', function(result) {
            $scope.songs = result;
        });
        
        $scope.shownClicked = function() {
            $scope.shown = true;
        };
        
        $scope.add = function() {
            var newMusician = {
                "name" : $scope.name,
                "genre" : $scope.genre,
                "albums" : $scope.albums,
                //"songs" : $scope.songs
            };
            $scope.musicians.push(newMusician);
            $.post('putMusician', newMusician);
          $scope.name = $scope.genre = $scope.albums = '';
        };

        $scope.remove = function(musician) {
            $scope.musicians.splice($scope.musicians.indexOf(musician), 1);
            $.post('removeMusician', musician);
        };

        $scope.edit = function(musician) {
            $scope.name = musician.name;
            $scope.genre = musician.genre;
            //$scope.songs = musician.songs;
            $scope.albums = musician.albums;
            $scope.editing = true;
            remember = musician;
        };
        
        $scope.update = function(musician) {
            $scope.remove(remember);
            $scope.add();
            $scope.editing = false;
        };

        $scope.addingSong = function(musician) {
            $scope.rememberName = musician.name; // we pass name outside of loop so we must remember
            $scope.addingSongFlag = true;
        };

        $scope.addSong = function() {
            var newSong = {
                "artist" : $scope.rememberName,
                "song" : $scope.song
            };
            $scope.songs.push(newSong);
            $.post('putSong', newSong);
            $scope.song = '';
            $scope.addingSongFlag = false;
        };

        $scope.removeSong = function(song) {
            $scope.songs.splice($scope.songs.indexOf(song), 1);
            $.post('removeSong', song);
        };
    }]);
}());
