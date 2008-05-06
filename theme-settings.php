<?php
// $Id$

/**
 * Implementation of THEMEHOOK_settings() function.
 *
 * @param $saved_settings
 *   An array of saved settings for this theme.
 * @return
 *   A form array.
 */
function STARTERKIT_settings($saved_settings) {

  /*
   * The default values for the theme variables. Make sure $defaults exactly
   * matches the $defaults in the theme-settings-init.php file.
   */
  $defaults = array(
    'zen_block_editing' => 1,
    'zen_breadcrumb' => 'yes',
    'zen_breadcrumb_separator' => ' › ',
    'zen_breadcrumb_home' => 1,
    'zen_breadcrumb_trailing' => 1,
    'zen_breadcrumb_title' => 0,
    'zen_wireframes' => 0,
  );

  // Merge the saved variables and their default values
  $settings = array_merge($defaults, $saved_settings);

  /*
   * Create the form using Forms API: http://api.drupal.org/api/5
   */
  $form = array();
  /* -- Delete this line if you want to use this setting
  $form['subtheme_example'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Use this sample setting'),
    '#default_value' => $settings['subtheme_example'],
    '#description'   => t("This option doesn't do anything; it's just an example."),
  );
  // */

  // Add the base theme's settings.
  include_once './'. drupal_get_path('theme', 'zen') .'/theme-settings.php';
  $form += zen_settings($saved_settings, $defaults);

  // Remove some of the base theme's settings.
  unset($form['themedev']['zen_layout']); // We don't need to select the base stylesheet.

  // Return the form
  return $form;
}
