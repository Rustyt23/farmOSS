<?php

declare(strict_types=1);

namespace Drupal\farm_animal_ancestry\Controller;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Controller\ControllerBase;
use Drupal\asset\Entity\AssetInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Controller for animal ancestry charts.
 */
class AncestryController extends ControllerBase {

  /**
   * Display an ancestry chart for the provided animal asset.
   */
  public function chart(AssetInterface $asset) {
    if ($asset->bundle() !== 'animal') {
      throw new NotFoundHttpException();
    }
    return [
      '#title' => $this->t('Ancestry for @name', ['@name' => $asset->label()]),
      'chart' => [
        '#type' => 'container',
        '#attributes' => ['id' => 'animal-ancestry-chart'],
      ],
      '#attached' => [
        'library' => ['farm_animal_ancestry/tree'],
        'drupalSettings' => [
          'farmAnimalAncestry' => [
            'tree' => $this->buildTreeData($asset, $asset->id()),
          ],
        ],
      ],
    ];
  }

  /**
   * Recursively build ancestry data for the JavaScript tree.
   */
  protected function buildTreeData(AssetInterface $asset, ?int $selected_id = NULL): array {
    $selected_id = $selected_id ?? $asset->id();
    $node = [
      'name' => $asset->label(),
      'url' => $asset->toUrl()->toString(),
      'selected' => $asset->id() === $selected_id,
      'children' => [],
    ];
    foreach (['mother', 'father'] as $role) {
      /** @var \Drupal\asset\Entity\AssetInterface|null $parent */
      $parent = $asset->get($role)->entity;
      if ($parent) {
        $node['children'][] = $this->buildTreeData($parent, $selected_id);
      }
    }
    return $node;
  }

  /**
   * Access callback to limit route to animal assets.
   */
  public function access(AssetInterface $asset): AccessResult {
    return AccessResult::allowedIf($asset->bundle() === 'animal')->addCacheableDependency($asset);
  }

}
