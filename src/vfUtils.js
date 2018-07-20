import Vex from 'vexflow';

const VF = Vex.Flow;

const getNewStave = config => {
  const { x, y, width } = config;
  const options = config.options || {};
  const staveOptions = options.stave || {};
  const clef = options.clef || 'treble';
  const ts = options.ts || '4/4';
  const stave = new VF.Stave(x, y, width, staveOptions);

  // Add a clef and time signature.
  stave.addClef(clef).addTimeSignature(ts);

  return stave;
};

export { getNewStave };
