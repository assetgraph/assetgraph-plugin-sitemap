const Text = require('assetgraph/lib/assets/Text');

/**
 * An Asset representation of `robots.txt`
 *
 * ## Outgoing relations:
 *
 * - {@link RobotsSitemap} - A fully qualified URL to a sitemap
 *
 * @extends {Text}
 * @see {@link https://en.wikipedia.org/wiki/Robots_exclusion_standard}
 */
class Robots extends Text {
  /**
   * @returns {RelationConfig[]}
   */
  findOutgoingRelationsInParseTree() {
    const lines = this.text.split('\n');
    const sitemapLines = lines
      .filter(l => l.match(/^sitemap:/i))
      .map(removeComments);

    /** @type {RelationConfig[]} */
    const relationConfigs = [];

    for (const line of sitemapLines) {
      const maybeUrl = line.replace(/^sitemap:\s*/i, '').trim();

      try {
        // Sitemaps must use fully qualified URL's
        const url = new URL(maybeUrl);

        relationConfigs.push({
          type: 'RobotsSitemap',
          href: url.toString(),
          hrefType: 'absolute'
        });
      } catch (err) {
        console.error(err);
      }
    }

    return relationConfigs;
  }
}

Object.assign(Robots.prototype, {
  notDefaultForContentType: true,
  contentType: 'text/plain',

  supportedExtensions: []
});

module.exports = Robots;

/**
 * @private
 * @param {string} line
 * @returns {string}
 */
function removeComments(line) {
  return line.split('#')[0];
}
