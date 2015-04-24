$(document).ready(function(){
    $('button').click(function(e){
        e.preventDefault(); //This is to stop the page from reloading when clicking the ADD
        //make a row clone
        var $newRow = $('.row:first-child').clone();//clones class="row",id="artistContainer"
        //copy variables from text fields
        var $artist = $('#inputArtist').val();
        var $genre = $('#inputGenre').val();
        var $songs = $('#inputSongs').val();
        var $album = $('#inputAlbums').val();
        //append variables to related elements in the cloned row
        
        //append to content
        $('#content').append($newRow);
                             
    });
});

