---
title: {{ plant.data.name }}
layout: 'layouts/plant.html'
pagination:
  data: collections.genus
  size: 1
  alias: plant
permalink: '{{ plant | getPlantPermalink }}'
eleventyComputed:
    title: "Plant Genus: {{ plant.data.name }}"
---
