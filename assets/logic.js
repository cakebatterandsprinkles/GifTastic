let characters = ["Ice King", "Finn", "Jake", "Princess Bubblegum", "Lumpy Space Princess", "Marceline", "Lady Rainicorn", "Beemo", "Lemongrab", "Prismo"];

let makeNewButton = function (index, element) {
    $("<button>")
        .text(characters[index])
        .appendTo("#buttons")
        .addClass("btn btn-sm justify-content-center mr-1 mt-1 userButton")
        .on("click", characterClicked);
};

$(characters).each(makeNewButton);

$("#new-show").on("click", function () {
    let newShow = $("#show-input").val();
    for (let i = 0; i < characters.length; i++) {
        if (characters.indexOf(newShow) === -1) {
            characters.push(newShow);
            $("#show-input").val("");
            $("#buttons").empty();
            $(characters).each(makeNewButton);
        } else {
            $("#show-input").val("");
        }
    }
});

function characterClicked() {
    let clickedButton = $(this).text().replace(/ /g, "+");
    let queryUrl = "http://api.giphy.com/v1/gifs/search?q=" +
        clickedButton +
        "&api_key=wSCP998sGk4ILdpbjPhlS0EMr9227bNx&limit=10&lang=en";
        
    let randomQuoteUrl = "https://adventure-time-quote-api.glitch.me/api/random";
    $.get(queryUrl).then(function (data) {
        $("#gifs").empty();
        for (let i = 0; i < 10; i++) {
            let gif = $("<img>").attr("src", data.data[i].images.original.url);
            let title = $("<p>").text("Title: " + data.data[i].title);
            $("#gifs").append(gif).append(title);
        }
    });
    $.get(randomQuoteUrl).then(function (data) {
        let randomQuote = $("<p>").text(data);
        randomQuote.addClass("lead");
        $(".randomQuotes").empty();
        $(".randomQuotes").append(randomQuote);
    });
}