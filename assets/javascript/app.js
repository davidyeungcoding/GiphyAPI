var topic = ['Christian Pulisic', 'Zlatan Ibrahimovic', 'Leonel Messi'];

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

            var playerDiv = $('<div class="player">');
            var rating = response.rated;
            var ratingHolder = $('<p>').text('Rating: ' + rating);
            playerDiv.append(ratingHolder);
            var gifURL = response.url;
            playerDiv.append(gifURL);
            buttonBin.prepend(playerDiv);
        });
    };

    function populateButtons() {
        $('#gifs').empty();
        for (i = 0; i < topic.length; i++) {
            var btn = $('<button>');
            btn.addClass('playerBtn');
            btn.attr('dataPlayer', topic[i]);
            btn.text(topic[i]);
            $('#gifs').append(btn);
        };
    };

    $('#addPlayer').click(function(event) {
        event.preventDefault();
        var player = $('#playerSearch').val().trim();
        topic.push(player);
        populateButtons();
    });

    $(document).on('click', '.playerBtn', playerGifs);

    populateButtons();
});