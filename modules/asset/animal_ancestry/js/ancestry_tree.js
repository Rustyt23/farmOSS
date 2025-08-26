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

      const width = 600;
      const dx = 10;
      const dy = 180;
      const tree = d3.tree().nodeSize([dx, dy]);
      const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x);

      const root = d3.hierarchy(data);
      tree(root);

      let x0 = Infinity;
      let x1 = -x0;
      root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
      });

      const svg = d3.select(container).append('svg')
        .attr('viewBox', [0, 0, width, x1 - x0 + dx * 2]);

      const g = svg.append('g')
        .attr('transform', `translate(${dy / 3},${dx - x0})`);

      g.append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(root.links())
        .join('path')
        .attr('d', diagonal);

      const node = g.append('g')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-width', 3)
        .selectAll('g')
        .data(root.descendants())
        .join('g')
        .attr('transform', d => `translate(${d.y},${d.x})`);

      node.append('circle')
        .attr('fill', d => d.children ? '#555' : '#999')
        .attr('r', 4);

      node.append('a')
        .attr('xlink:href', d => d.data.url)
        .append('text')
        .attr('dy', '0.31em')
        .attr('x', d => d.children ? -6 : 6)
        .attr('text-anchor', d => d.children ? 'end' : 'start')
        .text(d => d.data.name)
        .clone(true).lower()
        .attr('stroke', 'white');
    }
  };
})(Drupal, drupalSettings);
