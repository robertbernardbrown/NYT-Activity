$(document).ready(function(){
  var searchTerms = "";
  var numRecs = "";
  var startYear = "";
  var endYear = "";

  function articleSearch() {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "bdb59ae4073c4dd2a76b63604b28c1ec",
      'q': searchTerms,
    });

    /* Need to consider optional parameters. */
    /* Years will be "" if not set by user on form (optional). */
    url = (startYear === "") ? url : url += '&begin_date=' + startYear + '0101';
    url = (endYear === "") ? url : url += '&end_date=' + endYear + '1231';
    
    console.log(url);

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {

      console.log(result);

      clear(); /* Need to clear previous search if not done by user. */

      var article = result.response.docs;

      var intNumRecs = parseInt(numRecs);

      for (var i = 0; i < intNumRecs ; i++) {
        var title   = article[i].headline.main;
        var byLine  = "";
        var section = "null";
        var pubDate = article[i].pub_date;
        var webUrl  = article[i].web_url;

        byLine = (typeof article[i].byline === 'undefined') ?
                 byLine : /* initialized to empty string */
                 article[i].byline.original;

        section = (typeof article[i].section_name === 'undefined') ?
                 section : /* initialized to "null" string */
                 article[i].section_name;

        console.log(title);
        console.log(byLine);
        console.log(section);
        console.log(pubDate);
        console.log(webUrl);

        var  articleDiv = $('<div>').addClass('well');

        var titleHtml = $('<h3>').text(title);
        $(articleDiv).append(titleHtml);
  
        if (byLineHtml !== "") {
          var byLineHtml =  $('<p>').text(byLine);
          $(articleDiv).append(byLineHtml);
        }

        var sectionHtml =  $('<p>').text('Section: ' + section);
        $(articleDiv).append(sectionHtml);

        var pubDateHtml = $('<p>').text(pubDate);
        $(articleDiv).append(pubDateHtml);

        var webUrlLink = $('<a>').text(webUrl)
                                 .attr('href', webUrl)
                                 .attr('target', "_blank");
        $(articleDiv).append(webUrlLink);

        $("#article-body").prepend(articleDiv);
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
