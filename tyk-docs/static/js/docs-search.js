var search = instantsearch({
  appId: 'EIXQM46UN9',
  apiKey: '2ac5e9a2564f4a3a187ab44500f42062',
  indexName: 'tyk-test',
  urlSync: {},
  searchFunction(helper) {
  	var hits = document.getElementById("hits");
  	var pagination = document.getElementById("pagination");

    setTimeout(history.replaceState(null, "", "?q="), 750);

    if (helper.state.query === '') {
    	hits.style.display = 'none';
    	pagination.style.display = 'none';
      return;
    }

		hits.style.display = 'block';
		pagination.style.display = 'block';

    helper.search();
  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q'
  })
);


var hitTemplate =
  '<div class="hit media">' +
    '<div class="media-body">' +
      '<h4 class="media-heading">{{{_highlightResult.title.value}}}</h4>' +
      '<p class="year">{{year}}</p><p><span class="badge">{{.}}</span></p>' +
    '</div>' +
  '</div>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root: 'pagination',
      active: 'active'
    }
  })
);

search.start();