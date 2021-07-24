const Relation = require('assetgraph/lib/relations/Relation');

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
