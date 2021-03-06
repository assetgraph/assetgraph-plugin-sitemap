const Xml = require('assetgraph/lib/assets/Xml');

/**
 *
 * ## Outgoing relations:
 * - {@link XmlSitemapUrl}
 *
 * @extends {Xml}
 * @see {@link https://en.wikipedia.org/wiki/Sitemaps#File_format}
 */
class XmlSitemap extends Xml {
  /**
   * @returns {RelationConfig[]}
   */
  findOutgoingRelationsInParseTree() {
    /**
     * @type {RelationConfig[]}
     */
    const outgoingRelations = super.findOutgoingRelationsInParseTree();
    if (!this.isLoaded) {
      return outgoingRelations;
    }

    /**
     * @type {Node[]}
     */
    const queue = [this.parseTree];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.childNodes) {
        for (let i = node.childNodes.length - 1; i >= 0; i -= 1) {
          queue.unshift(node.childNodes[i]);
        }
      }

      if (node.nodeType === 1) {
        // PROCESSING_INSTRUCTION_NODE
        if (node.nodeName === 'loc') {
          const location = node.childNodes[0] && node.childNodes[0].data;
          if (location) {
            outgoingRelations.push({
              type: 'XmlSitemapUrl',
              node,
              href: location
            });
          }
        }
      }
    }
    return outgoingRelations;
  }
}

Object.assign(XmlSitemap.prototype, {
  notDefaultForContentType: true,
  contentType: 'text/xml',

  supportedExtensions: []
});

module.exports = XmlSitemap;
