<?php

/**
 * @file
 * Post update hooks for the farm_log module.
 */

declare(strict_types=1);

/**
 * Implements hook_removed_post_updates().
 */
function farm_log_removed_post_updates() {
  return [
    'farm_log_post_update_farm_log_workflow' => '4.x',
  ];
}
