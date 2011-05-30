ABOUT SASS
----------

Experimental Sass versions of Zen's CSS files. To learn more about Sass, visit:
  http://sass-lang.com


To automatically generate the css versions of the scss while you are doing theme
development, you'll need to tell sass to "watch" the sass directory so that any
time a .scss file is changed it will automatically place a generated CSS file
into your sub-theme's css directory:

  sass -l --watch <sass source folder>:<css destination folder>

If you want to add support for the FireSass plug-in, add the "-g" flag:

  sass -g --watch <source>:<destination>

Once you have finished your sub-theme development and are ready to move your CSS
files to your production server, you'll need to tell sass to update all your CSS
files and to compress them (to improve performance). Note: the sass command will
only generate CSS for .scss files that have recently changed; in order to force
it to regenerate all the CSS files, you can use the UNIX "touch" command to
force update the modification date of all your .scss files.

  touch <sass source folder>/*.scss
  sass -t compressed --update <sass source folder>:<css destination folder>


For example, from your sub-theme's root directory, you can run these commands:

- During sub-theme development:
    sass -l --watch sass:css

- During sub-theme development (w/ FireSass support):
    sass -g --watch sass:css

- After completion of development:
    touch sass/*.scss
    sass -t compressed --update sass:css
