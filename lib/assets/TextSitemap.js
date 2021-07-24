const Text = require('assetgraph/lib/assets/Text');

class TextSitemap extends Text {
  /**
   * @returns {RelationConfig[]}
   */
  findOutgoingRelationsInParseTree() {
    const lines = this.text.split('\n');
    const relationLines = lines.filter(l => {
      try {
        new URL(l); // eslint-disable-line no-new

        return true;
      } catch (err) {
        return false;
      }
    });

    /** @type {RelationConfig[]} */
    const relationConfigs = relationLines.map(l => ({
      type: 'TextSitemapUrl',
      href: l,
      hrefType: 'absolute'
    }));

    return relationConfigs;
  }
}

Object.assign(TextSitemap.prototype, {
  notDefaultForContentType: true,
  contentType: 'text/plain',

  supportedExtensions: []
});

module.exports = TextSitemap;
