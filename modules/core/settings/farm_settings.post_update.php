<?php

/**
 * @file
 * Post update functions for farm_settings module.
 */

declare(strict_types=1);

/**
 * Implements hook_removed_post_updates().
 */
function farm_settings_removed_post_updates() {
  return [
    'farm_settings_post_update_install_farm_setup' => '4.x',
  ];
}
