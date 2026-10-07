// Renders BLOG_POSTS (see blog-data.js) into a .blog-grid container.
// prefix: root-relative path prefix for this page ('' at site root, '../' one level deep)
// limit: optional max number of cards to render (omit for all)
function renderBlogCards(containerSelector, prefix, limit) {
  var container = document.querySelector(containerSelector);
  if (!container || typeof BLOG_POSTS === 'undefined') return;
  var posts = limit ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;
  container.innerHTML = posts.map(function (post) {
    return (
      '<a class="blog-card" href="' + prefix + 'blog/' + post.slug + '/" data-cat="' + post.category + '">' +
        '<div class="blog-card-img"><img src="' + prefix + post.image + '" alt="' + post.title + '" loading="lazy"></div>' +
        '<div class="blog-card-body">' +
          '<p class="blog-cat">' + post.category + '</p>' +
          '<h3 class="blog-title">' + post.title + '</h3>' +
          '<p class="blog-excerpt">' + post.excerpt + '</p>' +
        '</div>' +
      '</a>'
    );
  }).join('');
}
