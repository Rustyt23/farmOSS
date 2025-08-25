(function (Drupal, drupalSettings) {
  Drupal.behaviors.farmAnimalAncestryTree = {
    attach: function (context, settings) {
      const container = context.querySelector('#animal-ancestry-chart');
      if (!container || container.dataset.processed) {
        return;
      }
      container.dataset.processed = true;
      const data = drupalSettings.farmAnimalAncestry && drupalSettings.farmAnimalAncestry.tree;
      if (!data) {
        return;
      }

      const dx = 60;
      const dy = 120;
      const tree = d3.tree().nodeSize([dx, dy]);
      const root = d3.hierarchy(data);
      tree(root);

      // Invert the tree so ancestors appear above the selected asset.
      root.each(d => d.y = -d.depth * dy);

      let x0 = Infinity;
      let x1 = -x0;
      root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });

      const width = x1 - x0 + dx * 2;
      const height = root.height * dy + dx * 2;
      container.style.overflow = 'auto';
      // Position the chart vertically using positive coordinates. The previous
      // implementation set the viewBox's y-origin to -height, which shifted all
      // nodes outside the visible area. Start the y-origin at 0 so translated
      // nodes remain within the SVG's bounds.
      const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [x0 - dx, 0, width, height]);

      const g = svg.append('g')
        .attr('transform', `translate(0, ${height - dx})`);

      g.append('g')
        .attr('fill', 'none')
        .attr('stroke', '#000')
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(root.links())
        .join('path')
        .attr('d', d => `M${d.source.x},${d.source.y}V${d.target.y}H${d.target.x}`);

      const node = g.append('g')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .selectAll('g')
        .data(root.descendants())
        .join('g')
        .attr('transform', d => `translate(${d.x},${d.y})`);

      node.append('circle')
        .attr('fill', d => d.data.selected ? '#f00' : d.children ? '#555' : '#999')
        .attr('r', 4);

      node.append('a')
        .attr('xlink:href', d => d.data.url)
        .append('text')
        .attr('dy', '0.31em')
        .attr('x', 6)
        .attr('text-anchor', 'start')
        .attr('font-size', 12)
        .text(d => d.data.name)
        .clone(true).lower()
        .attr('stroke', 'white');
    }
  };
})(Drupal, drupalSettings);
