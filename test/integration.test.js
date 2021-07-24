const pathModule = require('path');
const AssetGraph = require('assetgraph');
const extendWithSitemaps = require('../lib/index');
const expect = require('./unexpected-with-plugins');

function getGraph(options) {
  const graph = new AssetGraph(options);
  extendWithSitemaps(graph);

  return graph;
}

describe('extension integration', () => {
  it('should populate an XmlSitemap starting from robots.txt', async () => {
    const graph = getGraph({
      root: pathModule.resolve(
        __dirname,
        '../testdata/integration/xmlsitemap/'
      ),
      canonicalRoot: 'https://example.com'
    });

    await graph.loadAssets('robots.txt');
    await graph.populate();

    expect(graph, 'to contain asset', 'Robots', 1);
    expect(graph, 'to contain relations', 'RobotsSitemap', 1);
    expect(graph, 'to contain asset', 'XmlSitemap', 1);
    expect(graph, 'to contain relations', 'XmlSitemapUrl', 2);
    expect(graph, 'to contain assets', 'Html', 2);
  });

  it('should populate an XmlSitemap starting from a webpage', async () => {
    const graph = getGraph({
      root: pathModule.resolve(
        __dirname,
        '../testdata/integration/xmlsitemap/'
      ),
      canonicalRoot: 'https://example.com'
    });

    await graph.loadAssets('/');
    await graph.populate();

    expect(graph, 'to contain asset', 'XmlSitemap', 1);
    expect(graph, 'to contain relations', 'XmlSitemapUrl', 2);
    expect(graph, 'to contain assets', 'Html', 2);
  });

  it('should populate a TextSitemap starting from a robots.txt', async () => {
    const graph = getGraph({
      root: pathModule.resolve(
        __dirname,
        '../testdata/integration/txtsitemap/'
      ),
      canonicalRoot: 'https://example.com'
    });

    await graph.loadAssets('robots.txt');
    await graph.populate();

    await graph.drawGraph('debug.svg');

    expect(graph, 'to contain asset', 'Robots', 1);
    expect(graph, 'to contain relations', 'RobotsSitemap', 1);
    expect(graph, 'to contain asset', 'TextSitemap', 1);
    expect(graph, 'to contain relations', 'TextSitemapUrl', 2);
    expect(graph, 'to contain assets', 'Html', 2);
  });

  it('should populate a Text asset starting from a webpage', async () => {
    const graph = getGraph({
      root: pathModule.resolve(
        __dirname,
        '../testdata/integration/txtsitemap/'
      ),
      canonicalRoot: 'https://example.com'
    });

    await graph.loadAssets('/');
    await graph.populate();

    expect(graph, 'to contain asset', 'Text', 1);
    expect(graph, 'to contain relations', 'TextSitemapUrl', 0);
    expect(graph, 'to contain assets', 'Html', 1);
  });
});
