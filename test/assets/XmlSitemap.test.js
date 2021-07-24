const pathModule = require('path');
const AssetGraph = require('assetgraph');
const extendWithSitemaps = require('../../lib/index');
const expect = require('../unexpected-with-plugins');

function getGraph(options) {
  const graph = new AssetGraph(options);
  extendWithSitemaps(graph);

  return graph;
}

describe('assets/XmlSitemap', function() {
  describe('when loading a sitemap', function() {
    it('should find outgoing relations', async () => {
      const assetGraph = getGraph({
        canonicalRoot: 'http://assetgraph.org',
        root: pathModule.resolve(__dirname, '../../testdata/assets/XmlSitemap')
      });

      await assetGraph.loadAssets('sitemap.xml');
      await assetGraph.populate();

      expect(assetGraph, 'to contain asset', 'XmlSitemap');
      expect(assetGraph, 'to contain assets', 'Html', 2);
      expect(assetGraph, 'to contain relations', 'XmlSitemapUrl', 2);
    });
  });
});
