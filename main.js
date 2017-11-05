$(document).ready(function(){
	$('#add-book').on('submit', function(e){
		e.preventDefault();
	
		var title 	= $('#title').val();
		var genre 	= $('#genre').val();
		var author 	= $('#author').val();
		var read 	= false;

		if ($("#read").is(":checked")) {  
    		read = true;
		} 


		$.ajax({
				url:"http://laughtelegram-laughtelegram.rhcloud.com/api/books/",
				data: JSON.stringify({
					"title": title,
					"genre": genre,
					"author": author,
					"read": read
				}),
				type:"POST",
				contentType:"application/json",
				success: function(data) {
					window.location.href = "index.html";
				},
				error: function(xhr,status,err){
					console.log(err);
				}
		});
	});
});

function getBooks(){
	$.ajax({
		url:"http://laughtelegram-laughtelegram.rhcloud.com/api/books/",
				
	}).done(function(data){
		var output ='<div class = "container">';
		output += '<table id = "book-table" class="table table-striped">';
		output += '<thead><tr>';		        
		output += '<th>title</th>';
        output += '<th>genre</th>';
        output += '<th>author</th>';
        output += '<th>isRead</th>';
        output += '</tr></thead>';
        output += '<tbody>';
    	$.each(data, function(key,data){
			output += '<tr>';
			output += '<div class="col-sm-3">';
			output += '<td>'+data.title+'</td>';
			output += '<td>'+data.genre+'</td>';
			output += '<td>'+data.author+'</td>';
			if (data.read){
				output += '<td><input type="checkbox" name="" value="" checked></td>';
			}
			else{
				output += '<td><input type="checkbox" name="" value=""></td>';
			}
			//output += '<td>'+data.read+'</td>';
			output += '</tr>';
		});
		output +="</tbody></table></div>";
		$('#books').html(output);
	});

	$('book-table').dataTable({
		"targets":3,
		"render": function(data, type, full, meta){
			console.log("data =" + data);
		}
	});

}