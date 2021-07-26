const Relation = require('assetgraph/lib/relations/Relation');

class XmlSitemapUrl extends Relation {
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

module.exports = XmlSitemapUrl;
