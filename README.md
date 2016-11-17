## Configuration _&_ Settings Store

or shortly,

# CSS

Yes, you read that right. Use CSS as a config file format.

You can use CSS as simple key-value store:

    foo: bar;
    quux: baz;

or use any of the more advanced features below.

## How to use

Write a config file `config.css`:

    challenge: accepted;

    master: mind;

    systems {
        all: engaged;
    }

If you are uneasy with putting declarations directly in the root without
selector, use `:root`:

    :root {
        challenge: accepted;
        master: mind;
    }

Install [`postcss`](https://github.com/postcss/postcss) and convert your
CSS file into JSON:

    postcss --use postcss-config config.css

To load imported configs, include
[postcss-import](https://github.com/postcss/postcss-import) before:

    echo '@import "config.css"' | \
        postcss --use postcss-import --use postcss-config

In your node.js scripts you can access the config directly without JSON
detour:

    var postcss = require('postcss');
    var postcss_config = require('postcss-config');

    var config = postcss([ postcss_config() ])
        .process('config:string;')
        .root.config;

## Advantages over JSON:

Enjoy good new-line support:

    foo: bar
    baz;

    /* JSON: {"foo":"bar\nbaz"} */

CSS has native support for sections:

    section {
        foo: bar;
    }

    /* JSON: {"section":{"foo":"bar"}} */

and for setting common values for several sections at once:

    section1, section2 {
        foo: bar;
    }

    /* JSON: {"section1":{"foo":"bar"},"section2":{"foo":"bar"}} */

Comment your config files:

    /* this should not be changed: */
    important: value;

    /* JSON: not available :( */

Import common settings files (needs pre-processing with
[postcss-import](https://github.com/postcss/postcss-import)):

    @import "base.css";

    overwrite: base-settings;

    /* JSON: not available :( */

Quote strings optionally:

    foo: "bar";
    foo: bar;

    foo: "foo { bar: baz; }";

    /* JSON: not available :( */

Lazy but well-defined syntax with optional trailing semicolons:

    foo: bar /* no semicolon here... */

    /* JSON: not available :( */

Define the used encoding (not suggested, better use UTF-8 globally):

    @charset "UTF-8";

    /* JSON: not available :( */

## Advantages over XML

Do we really need to talk about this one?

## Other Syntax Goodies

Use `:root` to set global properties, too:

    foo: bar;

    /* is equivalent to */

    :root {
        foo: bar;
    }

Since this is basically CSS, you can also use other pre-processors like Sass
or Less to automate some configuration parts before feeding them to
`postcss-config`.

### To Do

Extending on this idea: Things that are not yet implemented:

* Use `@media` and options for conditional parts:

        @media "additional" {
            /* include only, when option is set */
        }

        postcss --use postcss-config --postcss-config.media=additional

* Nested sections (which stresses the CSS similarity a bit):

        a {
            b {
                c: d;
            }
        }

* Parsing of some values:

        foo: none;
        /* translates to JS foo === null */
        bar: true;
        baz = "true";
        /* translates to bar === true and baz === "true" */

## Disadvantages

* You need an adequately lenient CSS Parser.
* No syntax for arrays/lists.
* People getting mad at you for no apparent reason.

## But, for all that is holy, why?

Fun. This isn't used in production yet. Please consider this more a case
study in CSS syntax, PostCSS plugin development and config file structure.

## Who?

This experiment is brought to you by Manuel Strehl,
[@m_strehl](http://twitter.com/m_strehl), and open-sourced by Port 8000 UG.

## License

This code is published under the terms of the MIT license.
