

// showInfo function - this will show the information
//getInfo function - this will get the information
$(function(){
  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#query').val();
    getInfo(searchTerm);
  });
});

// we need to get the id! 


function getInfo(query){
	var params ={
		q: query,
		type: "artist"
	};

	url ="https://api.spotify.com/v1/search";


	$.getJSON(url, params, function(data){
		var id = data.artists.items[0].id;
		var name = data.artists.items[0].name;
		var image = data.artists.items[0].images[0].url;
		console.log(id);
		console.log(name);
		// console.log(image);
		getRelatedArtist(id);

  	});

}

function getRelatedArtist(id){

	url ="https://api.spotify.com/v1/artists/" + id + "/related-artists";

	$.getJSON(url, function(data){
		showInfo(data.artists);
    	// showInfo(data.artists);
  	});

};

function showInfo(results){ // I think i'm the most stuck here
	var html ="";
	console.log(results);
	$.each(results,function(key, value){
		var artist_name = results[key].name;
		var artist_picture = results[key].images[0].url;
		var artist_link = results[key].external_urls.spotify;
		html += '<div class="item_wrap">';
	    html += '<div class="name">' + artist_name + '</div>';
	    html += '<div class="picture"><img src="' + artist_picture + '" width="200px"/></div>';
	    html += '<div class="link"><a href="' + artist_link + '">Listen Now</a></div>';
	    html += '</div>';
 });
	 // console.log($('.newArtists .result'));
  // $('.newArtists').html('');
  $('.newArtists').html(html);
}

// for class  artists.name
// for picture artists.images.url
// for link 
