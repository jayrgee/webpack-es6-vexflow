import Vex from 'vexflow';

import { getNewStave } from '../vfUtils';

const VF = Vex.Flow;
let idCount = 1000;

const getStaveNote = (note = { keys: ['c/4'] }, idPrefix) => {
  const noteDefaults = { duration: 'q' };
  const staveNote = new VF.StaveNote({ ...noteDefaults, ...note });

  staveNote.setAttribute('id', `${idPrefix}-${++idCount}`);
  console.log(staveNote);
  return staveNote;
};

const staveDoReMi = (context, config) => {
  const stave = getNewStave(config);
  stave.setContext(context).draw();
  console.log(config.contextId);
  const idPrefix = config.contextId;

  const notes = [
    getStaveNote({ keys: ['c/4'] }, idPrefix),
    getStaveNote({ keys: ['d/4'] }, idPrefix),
    getStaveNote({ keys: ['e/4'] }, idPrefix),
    getStaveNote({ keys: ['f/4'] }, idPrefix),
    getStaveNote({ keys: ['g/4'] }, idPrefix),
    getStaveNote({ keys: ['a/4'] }, idPrefix),
    getStaveNote({ keys: ['b/4'] }, idPrefix),
    getStaveNote({ keys: ['c/5'] }, idPrefix)
  ];
  VF.Formatter.FormatAndDraw(context, stave, notes);
};

const demo = async (root, width = 500, height = 300) => {
  // Create an SVG renderer and attach it to the DIV element.
  const div = document.getElementById(root.id);
  const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Size our svg:
  renderer.resize(width, height);

  // And get a drawing context:
  const context = renderer.getContext();
  const config = {
    x: 10,
    width: 400,
    contextId: context.element.id,
    options: { stave: {}, clef: VF.clefProperties.treble, ts: '4/4' }
  };

  await staveDoReMi(context, { ...config, ...{ y: 40 } });

  const ids = Array.from(div.getElementsByClassName('vf-stavenote')).map(
    el => el.id
  );
  console.log(ids);
};

export default demo;
