'use strict';

var postcss = require('postcss');

/**
 * parse CSS as a config file format
 *
 * Set result.root.config to the parsed config object. Set result.root.after to
 * the JSON serialization of the config.
 */
module.exports = postcss.plugin('postcss-config', function (opts) {
  opts = opts || {};

  return function (css, result) {
    var config = {};

    css.walkDecls(function (decl) {
      var value = decl.value;

      if (/^(["'])(\s|.)*\1$/.test(value)) {
        /* remove quotes around values */
        value = value.slice(1, -1);
      }

      if (decl.parent
          && decl.parent.selector
          && decl.parent.selector !== ':root') {
        var parents = decl.parent.selector.split(/\s*,\s*/);

        for (var i = 0; i < parents.length; i++) {
          if (!(parents[i] in config)) {
              config[parents[i]] = {};
          }

          config[parents[i]][decl.prop] = value;
        }

      } else {
        config[decl.prop] = value;

      }

    });

    result.root = postcss.root({
      raws : { after: JSON.stringify(config), },
    });

    result.root.config = config;
  };
});
