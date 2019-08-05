import MAP_STYLE from "../map/style.json";

export const mobilityData = {
  booking_distance_bins: {
    "From 0->1km": 4,
    "From 1->2km": 2,
    "From 2->3km": 6,
    "From 3->4km": 8
  },
  most_popular_dropoff_points:
    '{"type": "FeatureCollection", "features": [{"id": "1052", "type": "Feature", "properties": {"id": "u336zxds7qec", "name": "U Rehberge (Berlin)"}, "geometry": {"type": "Point", "coordinates": [13.340980096273526, 52.55661190032157]}}, {"id": "1965", "type": "Feature", "properties": {"id": "u33dcgw1h4mb", "name": "Berlin, Conrad-Blenkle-Str."}, "geometry": {"type": "Point", "coordinates": [13.44469855078991, 52.534058404146116]}}, {"id": "1933", "type": "Feature", "properties": {"id": "u33e10pwgd63", "name": "U Vinetastr. (Berlin)"}, "geometry": {"type": "Point", "coordinates": [13.413773519274576, 52.559764815584266]}}, {"id": "2735", "type": "Feature", "properties": {"id": "u33dcke5q7k1", "name": "Berlin, Husemannstr."}, "geometry": {"type": "Point", "coordinates": [13.41870024291705, 52.53994321040368]}}, {"id": "2348", "type": "Feature", "properties": {"id": "u33dcznm0x11", "name": "Berlin, Roelckestr."}, "geometry": {"type": "Point", "coordinates": [13.44488535751284, 52.55399663480332]}}, {"id": "2495", "type": "Feature", "properties": {"id": "u33dfw7dx86v", "name": "Berlin, Hansastr."}, "geometry": {"type": "Point", "coordinates": [13.474370533714957, 52.54941220429778]}}, {"id": "2847", "type": "Feature", "properties": {"id": "u33dfegwx8q2", "name": "Berlin, Hohenschönhauser Str/Weißenseer Weg"}, "geometry": {"type": "Point", "coordinates": [13.474375124955255, 52.536365074968465]}}, {"id": "2663", "type": "Feature", "properties": {"id": "u33dfu26ghb2", "name": "Berlin, Sandinostr."}, "geometry": {"type": "Point", "coordinates": [13.480697330598154, 52.53849196814174]}}, {"id": "2730", "type": "Feature", "properties": {"id": "u33dbzrb7f57", "name": "Berlin, Björnsonstr."}, "geometry": {"type": "Point", "coordinates": [13.403142567918275, 52.55452815461998]}}, {"id": "1941", "type": "Feature", "properties": {"id": "u33df5eps811", "name": "Berlin, Storkower Str./Gewerbegebiet"}, "geometry": {"type": "Point", "coordinates": [13.451580095744827, 52.53516229554003]}}, {"id": "1224", "type": "Feature", "properties": {"id": "u33dbn76hqzt", "name": "Berlin, Maxstr."}, "geometry": {"type": "Point", "coordinates": [13.36403067796564, 52.549361174743815]}}, {"id": "2585", "type": "Feature", "properties": {"id": "u33dcr0hj301", "name": "Berlin, Schönhauser Allee/Bornholmer Str."}, "geometry": {"type": "Point", "coordinates": [13.414532012698478, 52.55379291593042]}}, {"id": "1939", "type": "Feature", "properties": {"id": "u33dfzs54hft", "name": "Berlin, Stadion Buschallee/Hansastr."}, "geometry": {"type": "Point", "coordinates": [13.485807, 52.5563886]}}, {"id": "2817", "type": "Feature", "properties": {"id": "u33dc6gz04nv", "name": "Berlin, Prenzlauer Allee/Metzer Str."}, "geometry": {"type": "Point", "coordinates": [13.419465790225502, 52.53096791699267]}}, {"id": "1058", "type": "Feature", "properties": {"id": "u33dbrj8v9tc", "name": "Berlin, Uferstr."}, "geometry": {"type": "Point", "coordinates": [13.378158414242595, 52.55323771239874]}}, {"id": "2738", "type": "Feature", "properties": {"id": "u33dcevvp8kv", "name": "Berlin, Greifswalder Str./Danziger Str."}, "geometry": {"type": "Point", "coordinates": [13.43351794506717, 52.536108396784]}}, {"id": "2796", "type": "Feature", "properties": {"id": "u33dc59d0pzc", "name": "Berlin, Zionskirchplatz"}, "geometry": {"type": "Point", "coordinates": [13.405390878062475, 52.53425964434647]}}, {"id": "2637", "type": "Feature", "properties": {"id": "u33dg5n2nreb", "name": "Berlin, Reinhardsbrunner Str."}, "geometry": {"type": "Point", "coordinates": [13.500067418354345, 52.531168226748115]}}, {"id": "1943", "type": "Feature", "properties": {"id": "u33dfh7z5r69", "name": "Berlin, Stedingerweg"}, "geometry": {"type": "Point", "coordinates": [13.452558384983819, 52.539235110911335]}}, {"id": "2727", "type": "Feature", "properties": {"id": "u33dcwep57y7", "name": "Berlin, Prenzlauer Allee/ Ostseestr."}, "geometry": {"type": "Point", "coordinates": [13.429560732950295, 52.551576384069705]}}]}',
  most_popular_pickup_points:
    '{"type": "FeatureCollection", "features": [{"id": "1055", "type": "Feature", "properties": {"id": "u33dbm5ysexv", "name": "Berlin, Gerichtstr./Hochstr."}, "geometry": {"type": "Point", "coordinates": [13.375714782708314, 52.5432497038287]}}, {"id": "2603", "type": "Feature", "properties": {"id": "u33dbe09pzzg", "name": "U Naturkundemuseum (Berlin)"}, "geometry": {"type": "Point", "coordinates": [13.382377507298745, 52.531341827477306]}}, {"id": "1674", "type": "Feature", "properties": {"id": "u33dbvkuz273", "name": "Berlin, Lortzingstr."}, "geometry": {"type": "Point", "coordinates": [13.399172872838149, 52.544304476286854]}}, {"id": "1595", "type": "Feature", "properties": {"id": "u33db4f4sf74", "name": "Berlin, Poststadion"}, "geometry": {"type": "Point", "coordinates": [13.362329632441991, 52.53019629560221]}}, {"id": "1173", "type": "Feature", "properties": {"id": "u33dbpkge0w7", "name": "Berlin, Iranische Str."}, "geometry": {"type": "Point", "coordinates": [13.36603555578845, 52.55507792296157]}}, {"id": "167", "type": "Feature", "properties": {"id": "u33dbej7j9cv", "name": "S Nordbahnhof (Berlin)"}, "geometry": {"type": "Point", "coordinates": [13.388795816131024, 52.5316532848398]}}, {"id": "34", "type": "Feature", "properties": {"id": "u33dbwj5s3h1", "name": "S+U Gesundbrunnen Bhf (Berlin)"}, "geometry": {"type": "Point", "coordinates": [13.3884019, 52.5482138]}}, {"id": "2316", "type": "Feature", "properties": {"id": "u33dfnbz9hrr", "name": "Berlin, Mirbachplatz"}, "geometry": {"type": "Point", "coordinates": [13.448348534137773, 52.55303880837315]}}, {"id": "2734", "type": "Feature", "properties": {"id": "u33dchcbcb34", "name": "Berlin, Friedrich-Ludwig-Jahn-Sportpark"}, "geometry": {"type": "Point", "coordinates": [13.405800299035494, 52.54087143513778]}}, {"id": "1216", "type": "Feature", "properties": {"id": "u33dbv9yk2j6", "name": "Berlin, Swinemünder Str."}, "geometry": {"type": "Point", "coordinates": [13.394926904187189, 52.54593422050948]}}, {"id": "1559", "type": "Feature", "properties": {"id": "u33dbecz0ye3", "name": "Berlin, Gartenstr./Feldstr."}, "geometry": {"type": "Point", "coordinates": [13.383787675899177, 52.53648451148065]}}, {"id": "1537", "type": "Feature", "properties": {"id": "u33dbekkznxf", "name": "S Nordbahnhof/Gartenstr. (Berlin)"}, "geometry": {"type": "Point", "coordinates": [13.387495189970846, 52.533351853788744]}}, {"id": "2799", "type": "Feature", "properties": {"id": "u33dce4x7wgg", "name": "Berlin, Hufelandstr."}, "geometry": {"type": "Point", "coordinates": [13.428881584855965, 52.53240934593909]}}, {"id": "2671", "type": "Feature", "properties": {"id": "u33dgnmkdx5p", "name": "Berlin, Degnerstr./Suermondtstr."}, "geometry": {"type": "Point", "coordinates": [13.498532352533351, 52.5497919458726]}}, {"id": "2637", "type": "Feature", "properties": {"id": "u33dg5n2nreb", "name": "Berlin, Reinhardsbrunner Str."}, "geometry": {"type": "Point", "coordinates": [13.500067418354345, 52.531168226748115]}}, {"id": "2729", "type": "Feature", "properties": {"id": "u33dcp5vmrvn", "name": "Berlin, Schönfließer Str."}, "geometry": {"type": "Point", "coordinates": [13.408702447569542, 52.554044538416754]}}, {"id": "1950", "type": "Feature", "properties": {"id": "u33dcxnfu7ke", "name": "Berlin, Gustav-Adolf-Str./Langhansstr."}, "geometry": {"type": "Point", "coordinates": [13.434751268686853, 52.553590654306404]}}, {"id": "2561", "type": "Feature", "properties": {"id": "u33dgr0sww4y", "name": "Berlin, Gembitzer Str."}, "geometry": {"type": "Point", "coordinates": [13.503166658992273, 52.553906389081114]}}, {"id": "2001", "type": "Feature", "properties": {"id": "u33e42x1ytc9", "name": "Berlin, Gehringstr."}, "geometry": {"type": "Point", "coordinates": [13.468145968138092, 52.561671918823784]}}, {"id": "1275", "type": "Feature", "properties": {"id": "u33dbskpnych", "name": "Berlin, Usedomer Str./Feldstr."}, "geometry": {"type": "Point", "coordinates": [13.387131993270499, 52.53923302349636]}}]}'
};

export const chartData = {
  booking_distance_bins: {
    "From 0->1km": 4,
    "From 1->2km": 2,
    "From 2->3km": 6,
    "From 3->4km": 8
  }
};

export const chartDimension = {
  width: 960,
  height: 360
};

export const viewport = {
  width: 960,
  height: 400,
  latitude: 52.5072,
  longitude: 13.4248,
  zoom: 10
};

export const pointPaintProperties = {
  most_popular_dropoff_points: {
    "circle-color": "#ff0000",
    "circle-radius": 7
  },
  most_popular_pickup_points: {
    "circle-color": "#9333FF",
    "circle-radius": 7
  }
};

export const heatmapPaintProperties = {
  most_popular_dropoff_points: {
    "heatmap-weight": 1,
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 10, 2, 20, 4],
    "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 25, 25],
    "heatmap-opacity": 0.75
  },
  most_popular_pickup_points: {
    "heatmap-weight": 1,
    "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 10, 2, 20, 4],
    "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 25, 25],
    "heatmap-opacity": 0.75
  }
};

export const histogramDimension = {
  width: 960,
  height: 360
};

export const cdfDimension = {
  width: 960,
  height: 360
};

export const defaultMapStyle = MAP_STYLE;
