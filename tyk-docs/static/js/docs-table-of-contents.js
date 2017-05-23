$(document).ready(function() {
	
	var ToC = $('.documentation-table-of-contents');
	
	$(".page-content h2").each(function(i) {
		i++;	
		ToC.append('<a href="#' + $(this).find('a').attr("name") +'" class="button blue outline">'+ i + '. ' + $(this).text() +'</a><br>');
	});
	
	var ToClength = ToC[0].childNodes.length;

	if(ToClength < 6) {
		ToC.remove();
	}
	
});