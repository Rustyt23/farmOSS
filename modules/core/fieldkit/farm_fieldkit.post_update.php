<?php

/**
 * @file
 * Post update functions for farm_fieldkit module.
 */

declare(strict_types=1);

/**
 * Implements hook_removed_post_updates().
 */
function farm_fieldkit_removed_post_updates() {
  return [
    'farm_fieldkit_post_update_enable_password_grant' => '4.x',
  ];
}
