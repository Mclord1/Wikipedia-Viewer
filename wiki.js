var apiURL = "https://en.wikipedia.org/w/api.php?callback=?";

$('document').ready(function() {

    // trigger submit on use of enter key
    $("#input").keypress(function(e) {
        if (e.keyCode == 13) {
            $("#search").click();
        }
    });

    // Click On Search
    $('#search').click(function() {
        // Clear data in result div
        $('#result').empty();

        // Hide header hi and Random Button
        $('#header').hide(1000);
        $('#randomBtn').hide(1100);

        // Slide search and results div up, change opacity of background image
        $(".input-group").animate({opacity: 0}, 0, function() {
            $(this).animate({opacity: 1}, 1500);
        });
        $('.bg').animate({opacity: 0.5}, 500);
        $('.jumbotron').css('margin-top', '0px');

        // Show Result, Home button and clear results div
        $('#home').show(500);
        $('#result').show(1000);

        // Get and display Json Data from endpoint
        var data = {
            action : 'query',
            list : 'search',
            srsearch : $("input").val(),
            format : 'json',
            inprop: "url",
        };

        $.getJSON(apiURL, data, function(result) {
            console.log(result);
            $.each(result.query.search, function(index, resp) {
                $('#result').append(
                    "<div class='results'><h1>" + resp.title + "</h1><p>" + resp.snippet + "</p><hr></div>")

            });

            // Slide in results from the right
            $('.results').animate({
                    marginLeft: '0px'},
                1500)
        });
    });

    // Onclick home button
    $("#home").click(function() {

        // Slide out results to the right
        $('.results').animate({
                marginRight: '200%'},
            1000)

        // Hide Result, Home button
        $('#home').hide(500);
        $('#result').hide(1000);

        // Slide search and results div down, change opacity of background image
        $(".input-group").animate({opacity: 0}, 0, function() {
            $(this).animate({opacity: 1}, 1500);
        });
        $('.bg').animate({opacity: 1}, 500);
        $('.jumbotron').css('margin-top', '100px');

        // Show header hi and Random Button
        $('#header').show(1000);
        $('#randomBtn').show(1100);
    });

});