var topic = ['Christian Pulisic', 'Zlatan Ibrahimovic', 'Mesut Ozil'];

$(document).ready(function() {
    
    function playerGifs() {

        var player = $(this).attr('dataPlayer');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + player + '&api_key=503jON4WsLI5OcLlvaM1VWxnxADzT68B&limit=10';
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(queryURL);
            console.log(response);

            var results = response.data;

            for (i = 0; i < results.length; i++) {
                var playerDiv = $('<div class="player">');
                var titleHolder = $('<p class=info>').text('Title: ' + results[i].title);
                var ratingHolder = $('<p class=info>').text('Rating: ' + results[i].rating);
                var playerGif = $('<img>');
                playerGif.attr('src', results[i].images.fixed_height_still.url);
                playerGif.attr('data-still', results[i].images.fixed_height_still.url);
                playerGif.attr('data-animate', results[i].images.fixed_height.url);
                playerGif.attr('data-state', 'still')
                // playerGif.addClass('test')
                playerDiv.append(playerGif);
                playerDiv.append(titleHolder);
                playerDiv.append(ratingHolder);
                $('#gifs').prepend(playerDiv);
            };
        });
    };
    
    function populateButtons() {
        $('#buttonBin').empty();
        for (i = 0; i < topic.length; i++) {
            var btn = $('<button class=btn btn-secondary>');
            btn.addClass('playerBtn');
            btn.attr('dataPlayer', topic[i]);
            btn.text(topic[i]);
            $('#buttonBin').append(btn);
        };
    };
    
    $('#addPlayer').click(function(event) {
        event.preventDefault();
        var player = $('#playerSearch').val().trim();
        topic.push(player);
        populateButtons();
    });
    
    $('#gifs').click(function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            // $(this).attr('src', $(this).results[i].images.fixed_height.url);
            $(this).attr('data-state', 'animate');
            console.log('still check');
        }
        else if (state == 'animate') {
            $(this).attr('src', $(this).attr('data-still'));
            // $(this).attr('src', $(this).results[i].images.fixed_height_still.url);
            $(this).attr('data-state', 'still');
            console.log('animate check');
        }
        console.log('overall click check');
    })

    $(document).on('click', '.playerBtn', playerGifs);

    populateButtons();
});