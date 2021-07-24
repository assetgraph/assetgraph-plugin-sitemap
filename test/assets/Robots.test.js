const AssetGraph = require('assetgraph');
const extendWithSitemaps = require('../../lib/index');
const expect = require('../unexpected-with-plugins');
const Robots = require('../../lib/assets/Robots');

function getGraph(options) {
  const graph = new AssetGraph(options);
  extendWithSitemaps(graph);

  return graph;
}

describe('assets/Robots', function() {
  describe('type inference', () => {
    it('should load the Robots type with explicit typing', async () => {
      const graph = getGraph();

      await graph.loadAssets({
        type: 'Robots',
        path: '/',
        fileName: 'robots.txt',
        text: ''
      });

      expect(graph, 'to contain asset', 'Robots');
      expect(graph, 'to contain no asset', 'Text');
    });

    it('should infer the Robots type', async () => {
      const graph = getGraph();

      await graph.loadAssets({
        path: '/',
        fileName: 'robots.txt',
        text: ''
      });

      expect(graph, 'to contain asset', 'Robots');
      expect(graph, 'to contain no asset', 'Text');
    });

    it.skip('should infer a Text type when inference fails', async () => {
      const graph = getGraph();

      await graph.loadAssets({
        type: 'Robots',
        path: '/',
        fileName: 'roots.txt',
        text: ''
      });

      expect(graph, 'to contain no asset', 'Robots');
      expect(graph, 'to contain asset', 'Text');
    });
  });

  describe('#findOutgoingRelationsInParseTree', () => {
    it('should find no outgoing relations in empty robots.txt', () => {
      const asset = new Robots({ text: '' }, getGraph());

      expect(
        asset.findOutgoingRelationsInParseTree(),
        'to exhaustively satisfy',
        []
      );
    });

    it('should find no outgoing relations in robots.txt without Sitemap directives', () => {
      const asset = new Robots(
        {
          text: `User-agent: *
Disallow: /`
        },
        getGraph()
      );

      expect(
        asset.findOutgoingRelationsInParseTree(),
        'to exhaustively satisfy',
        []
      );
    });

    it('should find a relation to a text sitemap', () => {
      const graph = getGraph();

      graph.addAsset({
        type: 'Robots',
        text: `Sitemap: https://example.com/sitemap.txt`
      });

      expect(graph, 'to contain relation', {
        type: 'RobotsSitemap',
        href: 'https://example.com/sitemap.txt',
        to: {
          // At this point the asset has not yet been upgraded
          type: 'Text' // Fixme: This should be changed to TextSitemap when the type exists
        }
      });
    });

    it('should find a relation to an XML sitemap', () => {
      const graph = getGraph();

      graph.addAsset({
        type: 'Robots',
        text: `Sitemap: https://example.com/sitemap.xml`
      });

      expect(graph, 'to contain relation', {
        type: 'RobotsSitemap',
        href: 'https://example.com/sitemap.xml',
        to: {
          // At this point the asset has not yet been upgraded
          type: 'Xml'
        }
      });
    });

    it('should find a relation to an atom feed as sitemap', () => {
      const graph = getGraph();

      graph.addAsset({
        type: 'Robots',
        text: `Sitemap: https://example.com/feed.atom`
      });

      expect(graph, 'to contain relation', {
        type: 'RobotsSitemap',
        href: 'https://example.com/feed.atom',
        to: {
          type: 'Atom'
        }
      });
    });

    it('should find a relation to an RSS feed sitemap', () => {
      const graph = getGraph();

      graph.addAsset({
        type: 'Robots',
        text: `Sitemap: https://example.com/feed.rss`
      });

      expect(graph, 'to contain relation', {
        type: 'RobotsSitemap',
        href: 'https://example.com/feed.rss',
        to: {
          type: 'Rss'
        }
      });
    });

    it('should find find multiple sitemaps', () => {
      const graph = getGraph();

      graph.addAsset({
        type: 'Robots',
        text: `Sitemap: https://example.com/feed.rss
Sitemap: https://example.com/feed.atom
Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/sitemap.txt`
      });

      expect(graph, 'to contain relations', 'RobotsSitemap', 4);
    });
  });
});
