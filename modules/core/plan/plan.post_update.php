<?php

/**
 * @file
 * Post update hooks for the plan module.
 */

declare(strict_types=1);

/**
 * Implements hook_removed_post_updates().
 */
function plan_removed_post_updates() {
  return [
    'plan_post_update_install_plan_record' => '4.x',
    'plan_post_update_remove_plan_record_data_table' => '4.x',
  ];
}
