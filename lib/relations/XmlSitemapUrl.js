const Relation = require('assetgraph/lib/relations/Relation');

/**
 *
 * @extends {Relation}
 */
class XmlSitemapUrl extends Relation {
  /**
   * A fully qualified URL to the sitemap.
   *
   * @type {string}
   */
  get href() {
    return this.node.childNodes[0] && this.node.childNodes[0].data;
  }

  set href(href) {
    this.node.childNodes[0].data = href;
  }

  inline() {
    throw new Error('XmlSitemapUrl.inline: Not supported');
  }

  attach() {
    throw new Error('XmlSitemapUrl.attach: Not supported');
  }

  detach() {
    this.node.parentNode.removeChild(this.node);
    this.node = undefined;
    super.detach();
  }
}

/**
 * The [`<loc>` node](https://en.wikipedia.org/wiki/Sitemaps#Element_definitions) containing the relations href.
 *
 * @see {@link https://en.wikipedia.org/wiki/Sitemaps#Element_definitions}
 *
 * @member {Node} XmlSitemapUrl.node
 */

module.exports = XmlSitemapUrl;
