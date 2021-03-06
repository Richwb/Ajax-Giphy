// Holds topics
var topics = ["Looney Tunes", "Scuba", "Trending", "Evil Cats", "Laser", "Coding"];

$("#addfav").prop("disabled", true);

loadFavBar();



// Detect enter button on searchbox and call search function
$(document).on("keyup", '#searchbox', function(key){
	if(key.keyCode === 13){
		loadGif($(this).val());
	}
});

// Call search function on search button click
$("#searchsubmit").on("click",function(event){
	
	event.preventDefault();
	
	loadGif($("#searchbox").val());
	console.log($("#searchbox").val());
});

// on button click get gifs with that topic name
$(document).on("click", ".favs", function(){
	loadGif($(this).text());
});

// Switches the static image with the Gif and vice versa
$(document).on("click", ".gif", function(){
	var newDataUrl =  $(this).attr("src");
	$(this).attr("src", $(this).attr("data-url"));
	$(this).attr("data-url", newDataUrl); 
});

$("#addfav").on("click", function(){
	if($(this).attr("data-fav") !== ""){
		topics.push($(this).attr("data-fav"));
		loadFavBar();
	}
});


function loadFavBar(){
	$("#favbtnlist").empty();

	var gifTopics = "<div class='col-md-auto'>";
	// Loops through topics and creates buttons
	$.each(topics, function(index, value){
		gifTopics += "<button class='favs btn btn-primary'>" + value + "</button>";
	});

	gifTopics += "</div>";

	$("#favbtnlist").prepend(gifTopics);
}

// Giphy api call
function loadGif(topic){
	
	if(topic === ""){
		$("#addfav").prop("disabled", true);
	}else{
		$("#addfav").prop("disabled", false);

		$("#addfav").attr("data-fav", topic);

		$("#searchbox").val("");

		// clear previous images
		$("#images").html("");

		$.ajax({
		   url: "https://api.giphy.com/v1/gifs/search?q=" + topic + "&rating=g&rating=pg&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC",
		   method: "GET"
		}).done(function(response) {
			console.log(response);
		 	// Loops through api and gets the gifs and static image and put them in a image tag
			$.each(response.data, function(index, gif){

		   	$("#images").append("<div id='gif' class='inline px-3 pt-3 pb-2'><img src='" + gif.images.fixed_height_still.url + "'' class='gif' data-url='" + gif.images.fixed_height.url + "'></img><div id='rating' class='pt-2 text-center align-middle'>Rating: " + gif.rating.toUpperCase() +"</div><div>");

			});

		});
	}
}