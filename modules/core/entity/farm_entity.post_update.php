<?php

/**
 * @file
 * Post update hooks for the farm_entity module.
 */

declare(strict_types=1);

/**
 * Implements hook_removed_post_updates().
 */
function farm_entity_removed_post_updates() {
  return [
    'farm_entity_post_update_enforce_plan_eri' => '4.x',
    'farm_entity_post_update_rebuild_bundle_field_maps' => '4.x',
    'farm_entity_post_update_uninstall_exif_orientation' => '4.x',
  ];
}
