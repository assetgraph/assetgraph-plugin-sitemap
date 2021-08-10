const Relation = require('assetgraph/lib/relations/Relation');

/**
 * A relation to a page, starting from the XML sitemap `<loc>`-node
 *
 * @extends {Relation}
 * @see {@link https://en.wikipedia.org/wiki/Sitemaps#Element_definitions}
 */
class TextSitemapUrl extends Relation {
  inline() {
    throw new Error('TextSitemapUrl.inline: Not supported');
  }

  attach() {
    throw new Error('TextSitemapUrl.attach: Not supported');
  }

  detach() {
    throw new Error('TextSitemapUrl.detach: Not supported');
  }
}

module.exports = TextSitemapUrl;
