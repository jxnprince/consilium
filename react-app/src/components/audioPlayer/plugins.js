// import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min";

export const pluginSpecs = [
  { plugin: TimelinePlugin, 
      options: { container: "#timeline" } 
  },
  { plugin: CursorPlugin }
];