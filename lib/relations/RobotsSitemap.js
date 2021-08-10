const Relation = require('assetgraph/lib/relations/Relation');

/**
 * A relation to a sitemap in any format, starting from the
 * `Sitemap: ` directive in `robots.txt`
 *
 * @extends {Relation}
 * @see {@link https://en.wikipedia.org/wiki/Robots_exclusion_standard#Sitemap}
 */
class RobotsSitemap extends Relation {
  inline() {
    throw new Error('RobotsSitemap.inline(): Not supported.');
  }

  attach() {
    throw new Error('RobotsSitemap.attach(): Not supported.');
  }

  detach() {
    throw new Error('RobotsSitemap.detach(): Not supported.');
  }
}

module.exports = RobotsSitemap;
