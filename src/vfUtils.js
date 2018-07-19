import Vex from 'vexflow';

const VF = Vex.Flow;

const getNewStave = config => {
  const { x, y, width } = config;
  const staveOptions = config.options || {};
  const clef = config.clef || 'treble';
  const ts = config.ts || '4/4';
  const stave = new VF.Stave(x, y, width, staveOptions);

  // Add a clef and time signature.
  stave.addClef(clef).addTimeSignature(ts);

  return stave;
};

export { getNewStave };
