const AssetGraph = require('assetgraph');

const Robots = require('./assets/Robots');
const TextSitemap = require('./assets/TextSitemap');
const XmlSitemap = require('./assets/XmlSitemap');

const RobotsSitemap = require('./relations/RobotsSitemap');
const TextSitemapUrl = require('./relations/TextSitemapUrl');
const XmlSitemapUrl = require('./relations/XmlSitemapUrl');

/** @typedef {import('assetgraph/lib/assets/Asset')} Asset */

/**
 *
 * @param {AssetGraph} graph
 */
function extendWithSitemaps(graph) {
  AssetGraph.registerAsset(Robots, 'Robots');
  AssetGraph.registerAsset(TextSitemap, 'TextSitemap');
  AssetGraph.registerAsset(XmlSitemap, 'XmlSitemap');

  AssetGraph.registerRelation(RobotsSitemap, 'RobotsSitemap');
  AssetGraph.registerRelation(TextSitemapUrl, 'TextSitemapUrl');
  AssetGraph.registerRelation(XmlSitemapUrl, 'XmlSitemapUrl');

  graph.on('addAsset', (/** @type {Asset} */ asset) => {
    if (
      asset.type === 'Text' &&
      asset.path === '/' &&
      asset.fileName === 'robots.txt'
    ) {
      asset._upgrade(Robots);
      return;
    }

    if (asset.type === 'Text') {
      asset.on('load', asset => {
        if (asset.incomingRelations.some(r => r.type === 'RobotsSitemap')) {
          asset._upgrade(TextSitemap);
        }
      });
    }

    if (asset.type === 'Xml') {
      asset.on('load', asset => {
        /** @type {Document} */
        const document = asset.parseTree;

        const urlset = document.querySelector('urlset');

        if (urlset) {
          const xmlns = urlset.getAttribute('xmlns');

          if (xmlns && xmlns.includes('sitemaps.org/schemas/sitemap')) {
            asset._upgrade(XmlSitemap);
          }
        }
      });
    }
  });
}

module.exports = extendWithSitemaps;
