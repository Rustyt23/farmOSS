<?php

/**
 * @file
 * Updates farm_owner module.
 */

declare(strict_types=1);

/**
 * Implements hook_removed_post_updates().
 */
function farm_owner_removed_post_updates() {
  return [
    'farm_owner_post_update_add_asset_owner' => '4.x',
  ];
}
