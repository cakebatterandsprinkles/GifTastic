let characters = ["Ice King", "Finn", "Jake", "Princess Bubblegum", "Lumpy Space Princess", "Marceline", "Lady Rainicorn", "Beemo", "Lemongrab", "Prismo"];

let makeNewButton = function (index, element) {
    $("<button>")
        .text(characters[index])
        .appendTo("#buttons")
        .addClass("btn btn-lg btn-outline-dark justify-content-center mr-1 mt-1 userButton")
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
    $(".randomQuotes").addClass("border");
    let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
        clickedButton +
        "&api_key=wSCP998sGk4ILdpbjPhlS0EMr9227bNx&limit=10&lang=en";

    let randomQuoteUrl = "https://adventure-time-quote-api.glitch.me/api/random";
    $.get(queryUrl).then(function (data) {
        $("#gifs").empty();
        for (let i = 0; i < 10; i++) {
            console.log(data);
            let gif = $("<img>")
            .attr("src", data.data[i].images.original_still.url)
            .attr("data-still", "true")
            .attr("data-still-url", data.data[i].images.original_still.url)
            .attr("data-original-url", data.data[i].images.original.url)
            .on("click", gifClicked);

            let title = $("<p>").text("Title: " + data.data[i].title);
            let wrapper = $("<div>");
            wrapper.append(gif).append(title);
            $("#gifs").append(wrapper);
        }
    });
    $.get(randomQuoteUrl).then(function (data) {
        let randomQuote = $("<p>").text(data);
        randomQuote.addClass("lead");
        $(".randomQuotes").empty();
        $(".randomQuotes").append(randomQuote);
    });
}

function gifClicked() {
    let clickedGif = $(this);

    if(clickedGif.attr("data-still") === "true") {
        clickedGif.attr("data-still", "false");
        clickedGif.attr("src", clickedGif.attr("data-original-url"));
    } else {
        clickedGif.attr("data-still", "true");
        clickedGif.attr("src", clickedGif.attr("data-still-url"));
    }
}