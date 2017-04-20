$(document).ready(function() {
	var currentPage = location.pathname,
  currentPageGH = currentPage.replace(/\/$/, ""),
  githubIndexLink = currentPage.replace(/\/docs/, "/"),
  githubCustomLink = currentPageGH.replace(/\/docs/, "/"),
	prevPage, nextPage, currentPageIndex,
	links = $('.st-treed a');

	function getCurrentPageIndex(arr, page) {
		var i;

		for (i = 0; i < arr.length; i++) {
			if(arr[i].link + '/' === page || arr[i].link === page) {
				return i;
			}
		}
		return -1;
	}

	links = links.map(function(index, item) { 
		return {
			text: $(item).text(),
			link: $(item).attr('href')
		}; 
	}).toArray();

	currentPageIndex = getCurrentPageIndex(links, currentPage);
	nextPage = (currentPageIndex === links.length - 1) ? '' : links[currentPageIndex + 1];
	prevPage = (currentPageIndex === 0) ? '' : links[currentPageIndex - 1];


	if(!nextPage) {
		$('#nextArticle').hide();
	}

	if(!prevPage) {
		$('#previousArticle').hide();
	}

	$('#nextArticle').on('click', function(e) {
		e.preventDefault();
		location.href = nextPage.link;
	});

	$('#previousArticle').on('click', function(e) {
		e.preventDefault();
		location.href = prevPage.link;
	});

	$("#previousArticle").html('<'+ prevPage.text);
  $("#nextArticle").html(nextPage.text + '>');

	$('.container-github').on('click', function (e){
		e.preventDefault();
    if ( $('.active').hasClass('st-open')){
			window.open("https://github.com/TykTechnologies/tyk-docs/tree/master/tyk-docs/content" + githubIndexLink + 'index.md', "_blank");
		}
		else if ( $('.active').hasClass('st-file') && $('.active').closest('.st-open').length === 0) {
			window.open("https://github.com/TykTechnologies/tyk-docs/tree/master/tyk-docs/content" + githubIndexLink + 'index.md', "_blank");
		}
		else if ( $('.active').hasClass('st-file') ) {
			window.open("https://github.com/TykTechnologies/tyk-docs/tree/master/tyk-docs/content" + githubCustomLink + ".md", "_blank");
		}
	});
});