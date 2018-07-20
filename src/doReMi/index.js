import Vex from 'vexflow';

import { getNewStave } from '../vfUtils';

const VF = Vex.Flow;
let idCount = 0;

const getStaveNote = ( keys = ['c/4'], duration = 'q') => {
  const staveNote = new VF.StaveNote({ keys, duration });

  staveNote.setAttribute('id', 'blah-' + (++idCount).toString());
  console.log(staveNote);
  return staveNote;
};

const staveDoReMi = (context, config) => {
  const stave = getNewStave(config);
  stave.setContext(context).draw();

  const clef = config.clef || 'treble';
  const notes = [
    // A quarter-note C.
    //new VF.StaveNote({ clef, keys: ['c/4'], duration: 'q' }),
    getStaveNote(),
    new VF.StaveNote({ clef, keys: ['d/4'], duration: 'q' }),
    new VF.StaveNote({ clef, keys: ['e/4'], duration: 'q' }),
    new VF.StaveNote({ clef, keys: ['f/4'], duration: 'q' }),
    new VF.StaveNote({ clef, keys: ['g/4'], duration: 'q' }),
    new VF.StaveNote({ clef, keys: ['a/4'], duration: 'q' }),
    new VF.StaveNote({ clef, keys: ['b/4'], duration: 'q' }),
    new VF.StaveNote({ clef, keys: ['c/5'], duration: 'q' })
  ];
  VF.Formatter.FormatAndDraw(context, stave, notes);
};

const demo = async (id, width = 500, height = 300) => {
  // Create an SVG renderer and attach it to the DIV element.
  const div = document.getElementById(id);
  const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Size our svg:
  renderer.resize(width, height);

  // And get a drawing context:
  const context = renderer.getContext();
  const config = {
    x: 10,
    width: 400,
    options: { stave: {}, clef: VF.clefProperties.treble, ts: '4/4' }
  };

  await staveDoReMi(context, { ...config, ...{ y: 40 } });

  const ids = Array.from(div.getElementsByClassName('vf-stavenote')).map(
    e => e.id
  );
  console.log(ids);
};

export default demo;
