var updatePageNav = function() {
	
	var ToC = $('.documentation-table-of-contents');
	var ToContent = $('.toc-content');
	var ToClbl = $('<label class="f-12">In this section:</label>');

    if (!ToC[0]) {
        return
    }

    ToContent.html('')
	
	$(".page-content h2").each(function() {
		ToContent.prepend(ToClbl);
	ToContent.append('<a href="#' + $(this).find('a').attr("name") +'" class="button blue outline">' + $(this).text() +'</a><br>');
	});
	
	var ToClength = ToContent.children().length;
	
	if(ToClength < 3) {
		ToC.remove();
	}
	
}

$(document).ready(updatePageNav)
$(document).on("turbolinks:load", updatePageNav)
