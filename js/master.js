var page = 1;
var showPerPage = 0;
$(document).ready(function() {
  getShows();
  $("#show_more").on("click", function(e) {
    getShows();
  });

  $("#search_form").submit(function(e) {
    e.preventDefault();
    var name = $("#search").val();
    searchShow(name);
  });
});


function getShows() {
  $.ajax({
    url: "https://api.tvmaze.com/shows?page=" + page,
    success: function(response) {
      for (var i = showPerPage; i < showPerPage + 10; i++) {
        getShowById(response[i].id);
      }
      if (showPerPage > response.lenght - 1) {
        page++;
        showPerPage = 0;
      }
      showPerPage += 10;
    },

    error: function() {
      console.log("error");
    }
  });
}

function getShowById(id) {
  $("#show_more").text("Loading...");
  $.ajax({
    url: "https://api.tvmaze.com/shows/" + id,
    success: function(response) {
      addContent(response);
      $("#show_more").text("Show more");
    },

    error: function() {
      console.log("error");
    }
  });
}


function searchShow(name) {
  $("#search_btn").text("Loading...");
  $("#shows-container").html("");
  $.ajax({
    url: "https://api.tvmaze.com/search/shows?q=" + name,
    success: function(response) {
      $("#search_btn").text("Search");
      $.each(response, function(i, obj) {
        addContent(obj.show);
      });
    },

    error: function() {
      console.log("error");
    }
  });
}

function addContent(show) {
  var image = null;
  var title = show.name;
  var link = show.officialSite;
  var summary = show.summary;
  if (show.image != null) {
    image = show.image.original;
  }
  var content = "<article class='show'><h1 class='show_title'>" + title + "</h1><a href=" + link + "><img src=" + image + "></a>" + summary + "</article>";
  $("#shows-container").append(content);
}
