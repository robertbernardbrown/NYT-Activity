$(document).ready(function(){
  var searchTerms = "";
  var numRecs = 0;
  var startYear = 0;
  var endYear = 0;

  function articleSearch() {


      var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      url += '?' + $.param({
        'api-key': "bdb59ae4073c4dd2a76b63604b28c1ec",
        'q': searchTerms,
        'begin_date': startYear + "0101",
        'end_date': endYear + "1231",
      });
                  $.ajax({
                    url: url,
                    method: 'GET',
                  }).done(function(result) {

                  var article = result.response.docs;
                  console.log(url);

                          if (numRecs === "1") {
                            console.log("hello")
                            console.log(article[0].headline.main);
                            var title =  article[0].headline.main;
                            var byLine =  article[0].byline.original;

                            var  articleDiv = $("<div>").addClass("well");

                            var titleHtml = $('<h3>').text(title);
                            var byLineHtml =  $('<p>').text(byLine);

                            $(articleDiv).append(titleHtml);
                              $(articleDiv).append(byLineHtml);
                            $("#article-body").prepend(articleDiv);
                          }

                          else if (numRecs === "5") {
                            for (var i = 0; i < 5; i++) {
                            console.log(article[i].headline.main);
                            var  title =  article[i].headline.main;
                            var  byLine =  article[i].byline.original;

                            var  articleDiv = $("<div>").addClass("well");

                            var titleHtml = $('<h3>').text(title);
                            var byLineHtml =  $('<p>').text(byLine);

                            $(articleDiv).append(titleHtml);
                              $(articleDiv).append(byLineHtml);
                            $("#article-body").prepend(articleDiv);

                            }
                          }
                          else if (numRecs === "10") {
                            for (var i = 0; i < 10; i++) {
                              console.log(article[i].headline.main);
                          var title =  article[i].headline.main;
                              var byLine =  article[i].byline.original;

                              var  articleDiv = $("<div>").addClass("well");

                              var titleHtml = $('<h3>').text(title);
                              var byLineHtml =  $('<p>').text(byLine);

                              $(articleDiv).append(titleHtml);
                                $(articleDiv).append(byLineHtml);
                              $("#article-body").prepend(articleDiv);

                            }
                          }

                  }).fail(function(err) {
                    throw err;
                  });

      }


  function search(){
    event.preventDefault();

    searchTerms = $("#search-term").val().trim();
    numRecs = $("#num-recs").val();
    startYear = $("#start-year").val();
    endYear = $("#end-year").val();

    console.log(searchTerms);
    console.log(numRecs);
    console.log(startYear);
    console.log(endYear);

    articleSearch();

  }

  function clear() {
    $("#article-body").empty();
  }

  $("#search-button").on("click", search);

  $("#clear-button").on("click", clear);

});
