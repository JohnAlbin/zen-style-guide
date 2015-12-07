# KSS Style Guide

This style guide documents the designs of this website which are built with component-based styles and Sass variables, functions and mixins. To ensure it is always up-to-date, this style guide is automatically generated from comments in the Sass files.

## Organization

We categorize our CSS styles to make them easy to find and apply to our HTML.

- Defaults: These are the default base styles applied to HTML elements. Since all of the rulesets in this class of styles are HTML elements, the styles apply automatically.
- Layouts: These are the layout components that position major chunks of the page. They just apply positioning, no other styles.
- Forms: Form components are specialized design components that are applied to forms or form elements.
- Components: Design components are reusable designs that can be applied using just the CSS class names specified in the component.
- Colors and Sass: Colors used throughout the site. And Sass documentation for mixins, etc.

While our styles are organized as above in the style guide, our Sass files are organized in a file hierarchy like this:

- `sass/init`: The Sass used to initalize everything we need: variables, 3rd-party libraries, custom mixins and custom functions.
- `sass/base`: default HTML styles
- `sass/components`: component-based styles
- `sass/layouts`: component styles that only apply layout to major chunks of the page
- `sass/style-guide`: some helper files needed to build this automated style guide
