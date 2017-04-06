$(document).ready(function() {
	
var ToC = $("<div>").addClass("table-of-contents"),
		newLine, el, title, link;

$("article h2").each(function() {

  el = $(this);
  title = el.text();
  link = "#" + el.find('a').attr("name");

newline = $("<li>").text(title).html('<a href=' + link + '>' + title + '</a>');

ToC.append(newline);

});

var ToClength = ToC[0].childNodes.length;

if(ToClength < 2 || link === '#undefined') {
	ToC = $("<div>").removeClass("table-of-contents");
}

$(ToC).insertAfter( $( ".wysiwyg h1" ) );

});