// import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { LorientBackGround } from "./components/LorientBackGround";
import { LorientBuildings } from "./components/LorientBuildings";
import { LorientGround } from "./components/LorientGround";
import { LorientMob } from "./components/LorientMob";
import { LorientPeople } from "./components/LorientPeople";
import { LorientSchema } from "./components/LorientSchema";
import { LorientTrees } from "./components/LorientTrees";
// import Map from "react-map-gl/maplibre"

import 'mapbox-gl/dist/mapbox-gl.css';
import Mapbox from "mapbox-gl";
import { Canvas } from 'react-three-map'
import Map from 'react-map-gl';
import { Box, Html } from "@react-three/drei";
import { MathUtils } from "three";

// import { Canvas } from "react-three-map" // if you are using MapBox
const mapStyle = {
  "version": 8,
  "name": "React-Three-Map",
  "metadata": {
    "mapbox:type": "default",
    "mapbox:origin": "monochrome-dark-v1",
    "mapbox:sdk-support": {
      "js": "3.0.0",
      "android": "11.0.0",
      "ios": "11.0.0"
    },
    "mapbox:autocomposite": true,
    "mapbox:variation": "monochrome-light-v1",
    "mapbox:uiParadigm": "layers",
    "mapbox:groups": {
      "Administrative boundaries, admin": {
        "collapsed": false,
        "name": "Administrative boundaries, admin"
      },
      "Point of interest labels, poi-labels": {
        "collapsed": true,
        "name": "Point of interest labels, poi-labels"
      },
      "Place labels, place-labels": {
        "collapsed": false,
        "name": "Place labels, place-labels"
      }
    },
    "mapbox:thumb": "data:image/webp;base64,UklGRkgLAABXRUJQVlA4WAoAAAAgAAAAOwAAOwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDhMWQkAAC87wA4AlwehkSRHUsaa44/t6axp6WdBCASS9qfaDEIjSY6kjN67d/zxPYzzszP/atu2YVanKTrj7/+VwBbItAUSpo0EMoUEMm0kTBsooU4ZpBIUEmoL04lBKmFagBG0hQp5WzaHQKYNClIhoVJbgOmDQ5iWzRBBqQRSCVc3P38qsN6YThDePjYHRm2BXN0cfkG4e9hdAaMCd0+HL4G8LZuLaWFAuLqB3RcSAlTI1cPmYnOAcPcQSNgcGCTcPYXNCMCAu6dAAgSSAU8vsA6EQMLTC4PBIE9vC2KRPL0BA0JYHADh7eML9/YRyAfxbflAT8tiYAufAx8Hy+q/vpUvOaQCiwJAp20kbU++Pm/tjY+ZmZmZeY6ZmZmZmZlpocu8w1hYaOrdSXubmwxkAmpixzrZL3l/YL8n9/YPIvoPMQDbto2yWg8aJAFQN9xuEbdyIiLk45YIs4wxrF3/lxuHWZa0jCViXJqsZggFdYhMxlgbz/zBHy9lrOLUFIeJzXl9d3VzlBBR1psKSEmXKEeRXbMQKRAF3q3gzl9EunzngdY/d17TMd00SY9193334DixBc2QukQ0zXuGUVquSgsNkrZIYaAgfOTTPhW8n4hkZgVZPUyGlhCLAjMka22WUaJzIi5MP5Hw8EURBI3Qi6Iv1SzkxCxhRjTBgihhoIYRDZEjbdjcEmlDH3zu4yACFb0L3WBpTjlKDIjIueVEhQw5HCZESxaRT5hnPfyNP3vl/YLnxycG6ATT3AMUqZcXCCwiCeeJ06RDSV5w+cNQPa61eNevvedHVwhY3H1rq5JwxLUhIceVKLb40jFhi9AUhnTSCCC4w50heMTfJjLH0YgESm6k1f0xOTU8ZqiDRAltaaIpY/l16Cm/Ma8ges5AFujkqfKZDpPslMh2URahRcT1yabMSZqlOVGgPAi8OQihwsqPLAjLpzC+in8SCXGzaIVPzhhGn0gWM4RHPjb0FTSCR1BhigKTHAu+MKkpO2dw8M9tm+NUZ2RpPR+XrZPrLua54AV3D+8niiCTE3Vxe1rwdR3NSiGTEy4RkUHWwnxoi+XX+lG03L/eTpj3BQ2uiK+okNb8y4Xt5MiZ97CPLiRfqX9bfDcEd/rAT7/znYuZd1mS7f7Obid1Z1WMqHByIOwTljST//jqLl/BfwchfMXuuwo3OpUUqvsdKooAOR8vmpSzAgvdJ6GVSWJDgKjxavvixgMLwglRqyNAifII+KKZzcX9xuRFjrltm2bL5D/5ye//2gdPBUGQPuglTZNRaRkcuVW5iMzJSV03kezVukIhjMSmum+MOAwQqn/f86WGDE1NwVj7sq2FdRJfPC3kpbU5NU4obXcKO2JBh2o+CPxHv/Ct2mA+qyorvYjbL6xPCOm/CQNIKJkyqo2dKSFpg2f6EAX+Tppceo02HaJiRqMLVyuIJQMqRomnGNLXcLDMOBwt+SpzAlChD5cRTtZ35nnBTLBX7q2eVP1dGo1g5LRY74wRMS8lJVs31GNEmha+At9XHykQceMIWw2bYO9A05D99S+NHUwMZ3agPWKTFHm2RS/SMRWhgjCE2z9qBRFH346rrkghbG21D5/cOPLXcy3R7OZDP/31UcqLIulqPSyfJEL36ExYiAKA6G5v/dVuJDMUBBDNSGX4jf60uOrPZ589IOox1ESSlFkI8xACzIcB3ONNI8Yo6sEFNzOZe/NAM7lxIlqd2kI6UG6KRHeVAh8UwK0VBAnDYQu2FwyEyUsSkjXo0LNCVYmLW9GdEQEfnoMg3PFYeMKnpAJ4VjHGkqGuGWjhHmXxREEmo4IKnffRhyAKwL/dvXoPiEL/7TwGhGQdBRkj7i9dqE6Yg3NO4bDLlAUPIgBo/Jw+EgWBejJRkRnCnhEwBc1mhFyDGc6cW8vxJtM6Y84L1Bzcjoh+GCkFryNm4xhvirktQg58UBK7xubFcQQFQaDKxdHWH6bgNt8UANPJtdLyyhrVAM1qzM+wMLC1AEEUgv+k0hV5wt09bDzeHQSCyNWpmkk0ExbEGhUDyp5e8IIIFDwFS9Fwmk9shDXtkNJ3U7CJ+F+oAa1lx1RKBUp5TyfESRxPsnurX7gDobanzCbtgjiSlWXk21F5EIKCF2JBk2/9Eukj6lVSDTkVuYtyauWgEB04PXPQ9AIVNMJ5eA1nx9b+vzs9hV0523P+7oG7RBnXEnmHrumZBq/RAAg/XlOWp9+HY8wQC1OWhGPwzoHytWn6p7P/0xt2q7KVg4Hz6NC88kM1B4s1THhLkJZboZpRX24whEmkXcYgJrNbtRZppSDwFBz/YFq9eeB96HnrtYwQXnDApMdMHZb47LPPv/7qtQ4B+CGoiO7zDXTM+L4fdIko5p1ruVLB/Ni2/u1ek6dEAFEI8OD+WZ92VJc96GOlf7AAcpdbNwgnKYPJy9bG5NbDU2EI6uk7z2o66eAbnm1ZPw4lWZNUS87WrI6rCsBX6uW7blsDa+n2KdOhKo7k0dF6PRyrF9cZAOGcenerLG4NAd/2fqZ+xSZnD1o3xJeSbVQJfhQuzH85ZUd1tJ7v2PHhUyhUuNW5JDFpWljsdFvHjpQbpu0WjyN1nl6pUVuL2m/+3DsPT5haXZPpo0faw1Pnn19tgFw3qDmsAk+pzg+fWva+5o+BfV/8BYZx9B/botxuzYEfqogO7KiiyIROnbwu/uTery+vzOjvgxO3bM0zrx5QqsLdH/3pR1/96kU/+0K8t9X+/uJ744kjwtIItj8yOv/HXhgF8HRad6Gs7j5793Xf+1x8Ai19+VLxD8+FamCIKejcwNOqe0pBA7wd1HeINtiM4zje+/mYd8TYqVKpNq1yhC8lZAdXnB+Ld7+51CIPfPA+SqV/OtQ5Ece//Mw7Pnv+qExMQOumS+sH8k5y8Dfnp0ud5t9/d2Sje7qztpGm3dYcj6PLZ1lN+cTPJ26eoDMFtUHc0EZuftzdk+yJsGejN0UlxcYoXl2Nf7bP5dD/e5ujwaDh34ve+vrNTXR+4njzphOX3sJrKwULTnqBerK+h/eMkgYOmhMDm9lrDmyPUjir5HOdfsOFlzzsXoF6mfDgGq9pXybHgDAJMfPrBlPdaoQvueND7x/d6w8D3itIgMMc83/VnOadP8t4JT861N1hD4nSPqUZhBE85yFffcVjXrAUI1nNf00y4TUHcnfsdRLKdQ+HpWtI9xhrrcdIAA=="
  },
  "center": [
    -0.23973304520623628,
    45.483154112820756
  ],
  "zoom": 8.208538774923326,
  "bearing": 0,
  "pitch": 8,
  "fog": {
    "color": [
      "interpolate",
      [
        "linear"
      ],
      [
        "zoom"
      ],
      0,
      "#c2c2c2",
      22,
      "#fbfefe"
    ],
    "horizon-blend": [
      "interpolate",
      [
        "linear"
      ],
      [
        "zoom"
      ],
      0,
      0,
      1,
      0.05,
      7,
      0.1,
      10,
      0.1,
      16.4,
      0,
      22,
      0
    ],
    "space-color": [
      "interpolate",
      [
        "linear"
      ],
      [
        "zoom"
      ],
      4,
      "#0f0f0f",
      7,
      "#bfdef3"
    ],
    "high-color": "#ffffff",
    "star-intensity": [
      "interpolate",
      [
        "linear"
      ],
      [
        "zoom"
      ],
      5,
      0.15,
      6,
      0
    ],
    "range": [
      0.5,
      10
    ]
  },
  "sources": {
    "mapbox://mapbox.mapbox-terrain-dem-v1": {
      "url": "mapbox://mapbox.mapbox-terrain-dem-v1",
      "type": "raster-dem",
      "tileSize": 256
    },
    "composite": {
      "url": "mapbox://mapbox.mapbox-streets-v8,mapbox.country-boundaries-v1,thomaslonjon.bydltmr3,thomaslonjon.306pb746,thomaslonjon.4qu97qqm,mapbox.mapbox-bathymetry-v2",
      "type": "vector"
    }
  },
  "sprite": "mapbox://sprites/thomaslonjon/clrj9mcqx00ou01qqfqkyc4t5/eqb6c9h8wr726m8yajmzffrfg",
  "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  "projection": {
    "name": "globe"
  },
  "layers": [
    {
      "id": "background",
      "type": "background",
      "layout": {},
      "paint": {
        "background-color": "#f2f2f2"
      }
    },
    {
      "id": "countries",
      "type": "fill",
      "source": "composite",
      "source-layer": "country_boundaries",
      "slot": "",
      "paint": {
        "fill-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#ffffff",
          13,
          "#ffffff",
          14,
          "#f2f2f2",
          22,
          "#f2f2f2"
        ]
      }
    },
    {
      "id": "parks",
      "type": "fill",
      "source": "composite",
      "source-layer": "landuse",
      "slot": "",
      "minzoom": 5,
      "filter": [
        "all",
        [
          ">=",
          [
            "to-number",
            [
              "get",
              "sizerank"
            ]
          ],
          0
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "agriculture",
            "wood",
            "grass",
            "scrub",
            "glacier",
            "pitch",
            "sand"
          ],
          [
            "step",
            [
              "zoom"
            ],
            false,
            11,
            true
          ],
          "residential",
          [
            "step",
            [
              "zoom"
            ],
            true,
            10,
            false
          ],
          [
            "park",
            "airport"
          ],
          [
            "step",
            [
              "zoom"
            ],
            false,
            8,
            [
              "case",
              [
                "==",
                [
                  "get",
                  "sizerank"
                ],
                1
              ],
              true,
              false
            ],
            10,
            true
          ],
          false
        ],
        [
          "<=",
          [
            "-",
            [
              "to-number",
              [
                "get",
                "sizerank"
              ]
            ],
            [
              "interpolate",
              [
                "exponential",
                1.5
              ],
              [
                "zoom"
              ],
              12,
              0,
              18,
              14
            ]
          ],
          8
        ]
      ],
      "paint": {
        "fill-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          10,
          "#ffffff",
          12,
          "#ffffff",
          13,
          "#f7f7f7",
          14,
          "#ebebeb"
        ],
        "fill-opacity": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          8,
          [
            "match",
            [
              "get",
              "class"
            ],
            "residential",
            0.8,
            0.2
          ],
          10,
          [
            "match",
            [
              "get",
              "class"
            ],
            "residential",
            0,
            1
          ]
        ],
        "fill-antialias": false
      }
    },
    {
      "id": "residential",
      "type": "fill",
      "source": "composite",
      "source-layer": "landuse",
      "slot": "",
      "filter": [
        "all",
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "residential"
          ],
          true,
          false
        ],
        [
          "match",
          [
            "get",
            "type"
          ],
          [
            "residential"
          ],
          true,
          false
        ]
      ],
      "paint": {
        "fill-color": "#f7f7f7",
        "fill-opacity": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          1,
          8,
          1,
          12,
          0
        ],
        "fill-outline-color": "rgba(0, 0, 0, 0)"
      }
    },
    {
      "id": "wetlands",
      "type": "fill",
      "source": "composite",
      "source-layer": "landuse_overlay",
      "minzoom": 12.8,
      "filter": [
        "match",
        [
          "get",
          "class"
        ],
        [
          "wetland",
          "wetland_noveg"
        ],
        true,
        false
      ],
      "paint": {
        "fill-color": "#e9ebec"
      }
    },
    {
      "id": "waterway",
      "type": "line",
      "source": "composite",
      "source-layer": "waterway",
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#b7c8d1",
          9.4,
          "#b7c8d1",
          18,
          "#b7c8d1",
          22,
          "#b7c8d1"
        ],
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          0.4,
          7.54,
          0.4,
          14,
          1.5,
          18,
          3
        ],
        "line-opacity": 0.75
      }
    },
    {
      "id": "rivers-7qxdi0",
      "type": "line",
      "source": "composite",
      "source-layer": "rivers-7qxdi0",
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#b7c8d1",
          18,
          "#b7c8d1",
          22,
          "#b7c8d1"
        ],
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          0.5,
          7.54,
          0.5,
          12.8,
          1.25,
          18,
          1.5
        ]
      }
    },
    {
      "id": "main-rivers",
      "type": "line",
      "source": "composite",
      "source-layer": "fleuves-b7teyc",
      "paint": {
        "line-color": "#b7c8d1",
        "line-width": 1.1,
        "line-opacity": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          0,
          2,
          0,
          4,
          0.36,
          9,
          0.47,
          12,
          0,
          22,
          0
        ]
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "composite",
      "source-layer": "water",
      "slot": "",
      "paint": {
        "fill-color": "#c5d5e2",
        "fill-opacity": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          0.3,
          3,
          0.3,
          10,
          1,
          22,
          1
        ]
      }
    },
    {
      "id": "depth",
      "type": "fill",
      "source": "composite",
      "source-layer": "depth",
      "filter": [
        "!=",
        [
          "get",
          "min_depth"
        ],
        0
      ],
      "paint": {
        "fill-color": "#5e7f8d",
        "fill-opacity": 0.1
      }
    },
    {
      "id": "estran-c2i85b",
      "type": "fill",
      "source": "composite",
      "source-layer": "estran-c2i85b",
      "paint": {
        "fill-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#b4c7d5",
          12,
          "#b4c7d5",
          15.65,
          "#bccedc",
          16,
          "#bccedc",
          22,
          "#b4c7d5"
        ]
      }
    },
    {
      "id": "rock",
      "type": "fill",
      "source": "composite",
      "source-layer": "landuse",
      "minzoom": 10,
      "filter": [
        "all",
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "rock",
            "sand"
          ],
          true,
          false
        ],
        [
          "match",
          [
            "get",
            "type"
          ],
          [
            "quarry"
          ],
          false,
          true
        ]
      ],
      "paint": {
        "fill-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#b4c7d5",
          12,
          "#b4c7d5",
          15.65,
          "#bccedc",
          16,
          "#bccedc",
          22,
          "#b4c7d5"
        ]
      }
    },
    {
      "id": "water patern",
      "type": "fill",
      "source": "composite",
      "source-layer": "water",
      "slot": "",
      "paint": {
        "fill-color": "#afc7d4",
        "fill-opacity": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          0.16,
          4.57,
          0.16,
          7,
          0.36,
          22,
          0.36
        ],
        "fill-pattern": "water64blue"
      }
    },
    {
      "id": "piers-line",
      "type": "line",
      "source": "composite",
      "source-layer": "structure",
      "filter": [
        "match",
        [
          "get",
          "type"
        ],
        [
          "pier"
        ],
        true,
        false
      ],
      "layout": {},
      "paint": {
        "line-color": "#ebebeb",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          13,
          0.25,
          22,
          6
        ]
      }
    },
    {
      "id": "aeroway",
      "type": "line",
      "source": "composite",
      "source-layer": "aeroway",
      "minzoom": 10,
      "filter": [
        "match",
        [
          "get",
          "type"
        ],
        [
          "runway"
        ],
        true,
        false
      ],
      "layout": {},
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          10,
          "#f2f2f2",
          11.42,
          "#e6e6e6",
          13.78,
          "#d1d1d1",
          22,
          "#d1d1d1"
        ],
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          10,
          0.25,
          12,
          1,
          22,
          3
        ]
      }
    },
    {
      "id": "structure",
      "type": "fill",
      "source": "composite",
      "source-layer": "structure",
      "slot": "",
      "filter": [
        "match",
        [
          "get",
          "type"
        ],
        [
          "bridge"
        ],
        true,
        false
      ],
      "paint": {
        "fill-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#ffffff",
          22,
          "#ededed"
        ]
      }
    },
    {
      "id": "railway",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "slot": "",
      "filter": [
        "all",
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "major_rail",
            "minor_rail"
          ],
          true,
          false
        ],
        [
          "match",
          [
            "get",
            "structure"
          ],
          [
            "none",
            "ford"
          ],
          true,
          false
        ]
      ],
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          13,
          "#dbdbdb",
          17,
          "#c2c2c2"
        ],
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.5
          ],
          [
            "zoom"
          ],
          14,
          0.5,
          20,
          1
        ],
        "line-opacity": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          13.75,
          0,
          14,
          1
        ]
      }
    },
    {
      "id": "roads",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "slot": "",
      "filter": [
        "all",
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "major_rail",
            "path"
          ],
          false,
          true
        ],
        [
          "match",
          [
            "get",
            "structure"
          ],
          [
            "",
            "tunnel"
          ],
          false,
          true
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "service"
          ],
          false,
          true
        ],
        [
          "match",
          [
            "get",
            "type"
          ],
          [
            "platform",
            "rail"
          ],
          false,
          true
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "ferry"
          ],
          false,
          true
        ]
      ],
      "layout": {
        "line-cap": [
          "step",
          [
            "zoom"
          ],
          "butt",
          14,
          "round"
        ],
        "line-join": [
          "step",
          [
            "zoom"
          ],
          "miter",
          14,
          "round"
        ]
      },
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          "#dedede",
          14,
          "#dedede",
          14.1,
          "#ffffff",
          22,
          "#ffffff"
        ],
        "line-opacity": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          0,
          8,
          0,
          12,
          0.82,
          22,
          1
        ],
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.5
          ],
          [
            "zoom"
          ],
          5,
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "motorway",
              "trunk",
              "primary"
            ],
            0.44999999999999996,
            [
              "secondary",
              "tertiary"
            ],
            0.06,
            0
          ],
          13,
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "motorway",
              "trunk",
              "primary"
            ],
            1.5,
            [
              "secondary",
              "tertiary"
            ],
            1,
            [
              "motorway_link",
              "trunk_link",
              "primary_link",
              "street",
              "street_limited"
            ],
            0.4,
            0.2
          ],
          18,
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "motorway",
              "trunk",
              "primary"
            ],
            19.2,
            [
              "secondary",
              "tertiary"
            ],
            15.6,
            [
              "motorway_link",
              "trunk_link",
              "primary_link",
              "street",
              "street_limited"
            ],
            10.799999999999999,
            6
          ],
          22,
          [
            "match",
            [
              "get",
              "class"
            ],
            [
              "motorway",
              "trunk",
              "primary"
            ],
            192,
            [
              "secondary",
              "tertiary"
            ],
            156,
            [
              "motorway_link",
              "trunk_link",
              "primary_link",
              "street",
              "street_limited"
            ],
            108,
            60
          ]
        ]
      }
    },
    {
      "id": "Paths",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "slot": "",
      "filter": [
        "all",
        [
          "==",
          [
            "get",
            "class"
          ],
          "path"
        ],
        [
          "step",
          [
            "zoom"
          ],
          [
            "!",
            [
              "match",
              [
                "get",
                "type"
              ],
              [
                "steps",
                "sidewalk",
                "crossing"
              ],
              true,
              false
            ]
          ],
          16,
          [
            "!=",
            [
              "get",
              "type"
            ],
            "steps"
          ]
        ],
        [
          "match",
          [
            "get",
            "structure"
          ],
          [
            "none",
            "ford"
          ],
          true,
          false
        ],
        [
          "==",
          [
            "geometry-type"
          ],
          "LineString"
        ],
        [
          "match",
          [
            "get",
            "id"
          ],
          [
            9292244051
          ],
          false,
          true
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": [
          "step",
          [
            "zoom"
          ],
          "miter",
          14,
          "round"
        ]
      },
      "paint": {
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.5
          ],
          [
            "zoom"
          ],
          13,
          0.5,
          14,
          1,
          15,
          1,
          18,
          4
        ],
        "line-color": "hsl(220, 1%, 100%)",
        "line-dasharray": [
          10,
          0
        ]
      }
    },
    {
      "id": "railway-bridge",
      "type": "line",
      "source": "composite",
      "source-layer": "road",
      "filter": [
        "all",
        [
          "==",
          [
            "get",
            "structure"
          ],
          "bridge"
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "major_rail",
            "minor_rail"
          ],
          true,
          false
        ]
      ],
      "layout": {},
      "paint": {
        "line-color": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          13,
          "hsl(220, 0%, 93%)",
          17,
          "#c2c2c2"
        ],
        "line-width": [
          "interpolate",
          [
            "exponential",
            1.5
          ],
          [
            "zoom"
          ],
          14,
          0.5,
          20,
          1
        ],
        "line-opacity": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          13.75,
          0,
          14,
          1
        ]
      }
    },
    {
      "id": "building 3D",
      "type": "fill-extrusion",
      "source": "composite",
      "source-layer": "building",
      "slot": "",
      "minzoom": 15,
      "filter": [
        "match",
        [
          "id"
        ],
        [
          1043723484,
          1043724485,
          13963402,
          1043723801,
          1043727066,
          1043724209,
          2557868757326925,
          1043718706,
          1043724697,
          1043718705,
          1043726293,
          1043726170,
          1043726624,
          1043724080,
          1043723861,
          1043726627,
          1043725606,
          1043725503,
          1043725539,
          1043724203,
          1043727069,
          1043724299,
          1043725933,
          1043724043,
          1043727132,
          1043726904,
          1043726214,
          1043727174,
          1043724157,
          1043726399,
          1043724754,
          1043724965,
          1043724267,
          1043725321,
          1043726212,
          1043725713,
          1043725604,
          1043724150,
          1043724134,
          1043724258,
          1043726971,
          1043725667,
          1043725267,
          1043727010,
          1043725402,
          1043726902,
          1043724106,
          1043723745,
          1043723527,
          1043725965,
          1043725191,
          1043724461,
          1043726654,
          1043724725,
          1043718599,
          1043718600,
          1043718596,
          1043727170,
          1043724936,
          1043726926,
          1043718598,
          1043723564,
          1043718597,
          1043723639,
          1043726153,
          1043727171,
          1043723982,
          1043727025,
          1043727187,
          1043726510,
          1043725446,
          1043725044,
          1043724830,
          1043725376,
          1043726815,
          1043724777,
          1043724431,
          1043725104,
          1043724297,
          1043725486,
          1043724979,
          1043724877,
          1043726452,
          1043724375,
          1043724885,
          1043723534,
          1043724714,
          1043726284,
          1043726788,
          1043725537,
          1043725501,
          1043726046,
          1043724808,
          1043723968,
          1043724051,
          1043724989,
          1043726710,
          1043725909,
          1043725431,
          1043724133,
          1043727196,
          1043724753,
          1043726817,
          1043724211,
          1043723718,
          1043724668,
          1043725648,
          1043725484,
          1043726764,
          1043725562,
          1043725807,
          1043725266,
          1043724964,
          1043725046,
          1043724912,
          1043725669,
          1043725699,
          1043725833,
          1043724023,
          1043725350,
          1043726541,
          1043724537,
          1043724159,
          1043724186,
          1043726181,
          1043725219,
          1043724832,
          1043724296,
          1043723742,
          1043726954,
          1043727035,
          1043726345,
          1043725244,
          1043726210,
          1043726152,
          1043724377,
          1043727065,
          1043725536,
          1043724566,
          1043723615,
          1043727141,
          1043724404,
          1043726596,
          1043724079,
          1043723536,
          1043725405,
          1043726567,
          1043726069,
          1043726874,
          1043725077,
          1043725455,
          1043724807,
          1043726237,
          1043725781,
          1043723799,
          1043723994,
          1043726295,
          1043726266,
          1043726484,
          1043723509,
          1043725510,
          1043725295,
          1043723588,
          1043725106,
          1043723938,
          1043725133,
          3783982495322625,
          1043724756,
          1043723914,
          1043724914,
          1043726502,
          1043726957,
          69951571,
          4613304764356715,
          1043724478,
          1043725037,
          1043725715,
          1043724433,
          1043726155,
          1043726324,
          1043727189,
          1043727082,
          1043727115,
          1043723566,
          1043723685,
          1043724246,
          1043727114,
          788529127312645,
          1043726126,
          1043725616,
          1043726512,
          1043725755,
          1043726787,
          1043726983,
          1043724514,
          1043724887,
          1043724779,
          1043724695,
          1237400582265205,
          5149836366974405,
          1716214807354665,
          5332706903383235,
          4403162998634665,
          5533413849390175,
          5134189278092215,
          2907587598967655,
          1580174930604835,
          1367029382829645,
          1665921061981305,
          1043726373,
          1043725859,
          1043725590,
          1043723667,
          1043726430,
          1043724699
        ],
        false,
        true
      ],
      "layout": {},
      "paint": {
        "fill-extrusion-color": "#dbdbdb",
        "fill-extrusion-height": [
          "get",
          "height"
        ],
        "fill-extrusion-base": [
          "get",
          "min_height"
        ],
        "fill-extrusion-opacity": 0.65,
        "fill-extrusion-vertical-gradient": false
      }
    },
    {
      "id": "mapbox-mapbox-terrain-dem-v1",
      "type": "hillshade",
      "source": "mapbox://mapbox.mapbox-terrain-dem-v1",
      "minzoom": 6.5,
      "maxzoom": 9,
      "paint": {
        "hillshade-shadow-color": "#4f4f4f"
      }
    },
    {
      "id": "admin-0-boundary",
      "type": "line",
      "source": "composite",
      "source-layer": "admin",
      "minzoom": 1,
      "filter": [
        "all",
        [
          "==",
          [
            "get",
            "admin_level"
          ],
          0
        ],
        [
          "==",
          [
            "get",
            "maritime"
          ],
          "false"
        ],
        [
          "match",
          [
            "get",
            "worldview"
          ],
          [
            "all",
            "US"
          ],
          true,
          false
        ]
      ],
      "paint": {
        "line-color": "#bdbdbd",
        "line-width": [
          "interpolate",
          [
            "linear"
          ],
          [
            "zoom"
          ],
          0,
          0,
          2.52,
          0,
          12,
          2
        ],
        "line-dasharray": [
          10,
          0
        ]
      }
    },
    {
      "id": "settlement-minor-label",
      "type": "symbol",
      "source": "composite",
      "source-layer": "place_label",
      "minzoom": 2,
      "maxzoom": 13,
      "filter": [
        "all",
        [
          "<=",
          [
            "get",
            "filterrank"
          ],
          2
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "settlement",
            "disputed_settlement"
          ],
          [
            "match",
            [
              "get",
              "worldview"
            ],
            [
              "all",
              "US"
            ],
            true,
            false
          ],
          false
        ],
        [
          "step",
          [
            "zoom"
          ],
          [
            ">",
            [
              "get",
              "symbolrank"
            ],
            6
          ],
          4,
          [
            ">=",
            [
              "get",
              "symbolrank"
            ],
            7
          ],
          6,
          [
            ">=",
            [
              "get",
              "symbolrank"
            ],
            8
          ],
          7,
          [
            ">=",
            [
              "get",
              "symbolrank"
            ],
            10
          ],
          10,
          [
            ">=",
            [
              "get",
              "symbolrank"
            ],
            11
          ],
          11,
          [
            ">=",
            [
              "get",
              "symbolrank"
            ],
            13
          ],
          12,
          [
            ">=",
            [
              "get",
              "symbolrank"
            ],
            15
          ]
        ],
        [
          "step",
          [
            "pitch"
          ],
          true,
          50,
          [
            "<",
            [
              "distance-from-center"
            ],
            3
          ],
          60,
          [
            "<",
            [
              "distance-from-center"
            ],
            4
          ],
          70,
          [
            "<",
            [
              "distance-from-center"
            ],
            5
          ]
        ],
        [
          "match",
          [
            "get",
            "iso_3166_1"
          ],
          [
            "FR"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "text-line-height": 1.1,
        "text-size": [
          "interpolate",
          [
            "cubic-bezier",
            0.2,
            0,
            0.9,
            1
          ],
          [
            "zoom"
          ],
          3,
          [
            "step",
            [
              "get",
              "symbolrank"
            ],
            11,
            9,
            10
          ],
          6,
          [
            "step",
            [
              "get",
              "symbolrank"
            ],
            14,
            9,
            12,
            12,
            10
          ],
          8,
          [
            "step",
            [
              "get",
              "symbolrank"
            ],
            16,
            9,
            14,
            12,
            12,
            15,
            10
          ],
          13,
          [
            "step",
            [
              "get",
              "symbolrank"
            ],
            22,
            9,
            20,
            12,
            16,
            15,
            14
          ]
        ],
        "symbol-sort-key": [
          "get",
          "symbolrank"
        ],
        "icon-image": "marker",
        "text-font": [
          "DIN Pro Regular",
          "Arial Unicode MS Regular"
        ],
        "text-justify": "auto",
        "icon-size": 0.5,
        "text-anchor": "bottom",
        "text-field": [
          "coalesce",
          [
            "get",
            "name_en"
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": 7
      },
      "paint": {
        "text-halo-color": "#ffffff",
        "text-halo-width": 2,
        "icon-opacity": 0.4,
        "text-color": "#a1a1a1"
      }
    },
    {
      "id": "settlement-major-label",
      "type": "symbol",
      "source": "composite",
      "source-layer": "place_label",
      "minzoom": 2,
      "maxzoom": 15,
      "filter": [
        "all",
        [
          "<=",
          [
            "get",
            "filterrank"
          ],
          3
        ],
        [
          "match",
          [
            "get",
            "class"
          ],
          [
            "settlement",
            "disputed_settlement"
          ],
          [
            "match",
            [
              "get",
              "worldview"
            ],
            [
              "all",
              "US"
            ],
            true,
            false
          ],
          false
        ],
        [
          "step",
          [
            "zoom"
          ],
          false,
          2,
          [
            "<=",
            [
              "get",
              "symbolrank"
            ],
            6
          ],
          4,
          [
            "<",
            [
              "get",
              "symbolrank"
            ],
            7
          ],
          6,
          [
            "<",
            [
              "get",
              "symbolrank"
            ],
            8
          ],
          7,
          [
            "<",
            [
              "get",
              "symbolrank"
            ],
            10
          ],
          10,
          [
            "<",
            [
              "get",
              "symbolrank"
            ],
            11
          ],
          11,
          [
            "<",
            [
              "get",
              "symbolrank"
            ],
            13
          ],
          12,
          [
            "<",
            [
              "get",
              "symbolrank"
            ],
            15
          ],
          13,
          [
            ">=",
            [
              "get",
              "symbolrank"
            ],
            11
          ],
          14,
          [
            ">=",
            [
              "get",
              "symbolrank"
            ],
            15
          ]
        ],
        [
          "step",
          [
            "pitch"
          ],
          true,
          50,
          [
            "<",
            [
              "distance-from-center"
            ],
            3
          ],
          60,
          [
            "<",
            [
              "distance-from-center"
            ],
            4
          ],
          70,
          [
            "<",
            [
              "distance-from-center"
            ],
            5
          ]
        ],
        [
          "match",
          [
            "get",
            "iso_3166_1"
          ],
          [
            "FR"
          ],
          true,
          false
        ]
      ],
      "layout": {
        "text-line-height": 1.1,
        "text-size": [
          "interpolate",
          [
            "cubic-bezier",
            0.2,
            0,
            0.9,
            1
          ],
          [
            "zoom"
          ],
          3,
          [
            "step",
            [
              "get",
              "symbolrank"
            ],
            13,
            6,
            11
          ],
          6,
          [
            "step",
            [
              "get",
              "symbolrank"
            ],
            18,
            6,
            16,
            7,
            14
          ],
          8,
          [
            "step",
            [
              "get",
              "symbolrank"
            ],
            20,
            9,
            16,
            10,
            14
          ],
          15,
          [
            "step",
            [
              "get",
              "symbolrank"
            ],
            24,
            9,
            20,
            12,
            16,
            15,
            14
          ]
        ],
        "symbol-sort-key": [
          "get",
          "symbolrank"
        ],
        "icon-image": [
          "step",
          [
            "zoom"
          ],
          [
            "case",
            [
              "==",
              [
                "get",
                "capital"
              ],
              2
            ],
            "marker",
            ""
          ],
          8,
          "marker"
        ],
        "text-font": [
          "DIN Pro Regular",
          "Arial Unicode MS Regular"
        ],
        "icon-size": 0.5,
        "text-anchor": [
          "step",
          [
            "zoom"
          ],
          [
            "get",
            "text_anchor"
          ],
          8,
          "center"
        ],
        "text-field": [
          "coalesce",
          [
            "get",
            "name_en"
          ],
          [
            "get",
            "name"
          ]
        ],
        "text-max-width": 7
      },
      "paint": {
        "text-color": [
          "step",
          [
            "get",
            "symbolrank"
          ],
          "rgb(163, 163, 163)",
          11,
          "#adadad",
          16,
          "#b8b8b8"
        ],
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "icon-opacity": 0.4
      }
    }
  ],
  "created": "2024-01-18T13:46:25.929Z",
  "modified": "2024-03-21T11:03:41.067Z",
  "id": "clrj9mcqx00ou01qqfqkyc4t5",
  "owner": "thomaslonjon",
  "visibility": "private",
  "protected": false,
  "draft": false
}

Mapbox.accessToken = 'pk.eyJ1IjoidGhvbWFzbG9uam9uIiwiYSI6ImNsaThwNTFnYzFsd3ozZnBjczN3aDlhYzcifQ.na2-On5k8L1PUKU8Em_-Ew'
const sceneBias = [-1041, -0.1, 804.9929687499973]
const latlon = {
  latitude: 47.765992454506346,
  longitude: -3.3733139311672686
}
const App = () => (
  (<Map
    initialViewState={{
      latitude: 47.765670529,
      longitude: -3.374462585,
      zoom: 15.7,
      pitch: 45
    }}
    mapStyle={mapStyle} >
    <Canvas latitude={latlon.latitude} longitude={latlon.longitude}>
      {/* <Box
        args={[5000, 5000, 5000]}
        position={[0, 250, 0]}
        rotation={[0, 45 * MathUtils.DEG2RAD, 0]}
        material-color={'purple'}
      /> */}
      {/* <LorientBackGround position ={sceneBias} actualZoom={16.945785542296452} renderOrder={2} rotation-y={0.082} /> */}
      <LorientBuildings position ={sceneBias} actualZoom={16.945785542296452} renderOrder={2} rotation-y={0.082} />
      <LorientPeople position ={sceneBias} actualZoom={16.945785542296452} renderOrder={2} rotation-y={0.082} />
      {/* <LorientGround position ={sceneBias} actualZoom={16.945785542296452} renderOrder={2} rotation-y={0.082} />
      <LorientMob position ={sceneBias} actualZoom={16.945785542296452} renderOrder={2} rotation-y={0.082} />
      <LorientSchema position ={sceneBias} actualZoom={16.945785542296452} renderOrder={2} rotation-y={0.082} />
      <LorientTrees position ={sceneBias} actualZoom={16.945785542296452} renderOrder={2} rotation-y={0.082} /> */}

      {/* <color attach="background" args={["#ececec"]} />
      <Experience /> */}
    </Canvas>
  </Map>)
)

// function App() {
//   return (
//     //   <Map 
//     //   initialViewState={{ latitude: 51, longitude: 0, zoom: 13 }} 
//     //   mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" >
//     //   <Canvas latitude={51} longitude={0}>
//     //     <pointLight position={[10, 10, 10]} />
//     //     <mesh>
//     //       <sphereGeometry />
//     //       <meshStandardMaterial color="hotpink" />
//     //     </mesh>
//     //   </Canvas>
//     // </Map>
//     <Map
//       antialias
//       initialViewState={{
//         latitude: 51,
//         longitude: 0,
//         zoom: 13,
//         pitch: 60
//       }}
//       mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
//     >
//       <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
//         <color attach="background" args={["#ececec"]} />
//         <Experience />
//       </Canvas>
//     </Map>
//   );
// }

export default App;
