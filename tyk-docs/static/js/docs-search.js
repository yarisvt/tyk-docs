/**
 * INIT INSTAN SEARCH
 */

const searchClient = algoliasearch(
	"ALGOLIA_APP_ID",
	"ALGOLIA_API_KEY"
);

const search = instantsearch({
	indexName: "tyk-docs",
	searchClient,
	searchFunction: function(helper) {
		const searchResults = document.getElementById('hits');
		const searchbox = document.getElementById('searchbox');

		if (helper.state.query === '') {
		  searchResults.style.display = 'none';
		  searchbox.classList.remove('js-active');
		  return;
		}
		helper.search();
		searchResults.style.display = 'block';
		searchbox.classList.add('js-active');
	}
});


/**
 * TEMPLATE VARIABLES
 */

const noResultsTemplate = query => `<li class="hit media">No results found matching <strong>${query}</strong>.</li>`;
	  
const hitTemplate = hit => {
	return `<li class="hit media">
				<div class="media-body">
					<div class="media-body-title"><a href="/docs${hit.path}" <h4 class="media-heading">${hit.section} - ${instantsearch.highlight({ attribute: 'title', hit })}.</h4></p> </a></div>
					<div class="media-body-body"><a href="/docs${hit.path}" <h4 class="media-heading em">..${instantsearch.snippet({ attribute: 'article', hit })}..</h4></p> </a></div>
				</div>
			</li>`;
}

/**
 * INFINITE SCROLL
 */

const infiniteHits = instantsearch.connectors.connectInfiniteHits(
  (renderArgs, isFirstRender) => {
    const { hits, showMore, widgetParams } = renderArgs;
    const { container } = widgetParams;

	lastRenderArgs = renderArgs;
	
    if (isFirstRender) {
		const sentinel = document.createElement('div');
		container.appendChild(document.createElement('ul'));
		container.appendChild(sentinel);

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !lastRenderArgs.isLastPage) {
				showMore();
				}
			});
		});

		observer.observe(sentinel);

		return;
    }


	if (hits.length > 0 && hits != null) {
		container.querySelector('ul').innerHTML = hits
			.map(hit => hitTemplate(hit))
			.join('');
	} else {
		container.querySelector('ul').innerHTML = noResultsTemplate(renderArgs.results.query);
	}
  }
);


/**
 * ADDING WIDGETS TO INITIAL INSTANTSEARCH
 */

search.addWidgets([
	instantsearch.widgets.searchBox({
			container: '#searchbox',
			autofocus: false,
			placeholder: 'Search...'
	}),
	infiniteHits({
		container: document.querySelector('#hits')
	}),
	instantsearch.widgets.configure({
		hitsPerPage: 8
	})
]);


/**
 * Start the search
 */

search.start();
