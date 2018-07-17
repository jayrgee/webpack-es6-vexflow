import Vex from 'vexflow';

const VF = Vex.Flow;

const getNewStave = (
  x,
  y,
  width,
  options = { stave: {}, clef: 'treble', ts: '4/4' }
) => {
  const stave = new VF.Stave(x, y, width, options.stave);

  // Add a clef and time signature.
  //stave.addClef('treble').addTimeSignature('4/4');
  if (options.clef) {
    stave.addClef(options.clef);
  }

  if (options.ts) {
    stave.addTimeSignature(options.ts);
  }

  return stave;
};

const stave1 = context => {
  const stave = getNewStave(10, 40, 400);
  stave.setContext(context).draw();

  const notes = [
    // A quarter-note C.
    new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'q' }),

    // A quarter-note D.
    new VF.StaveNote({ clef: 'treble', keys: ['d/4'], duration: 'q' }),

    // A quarter-note rest. Note that the key (b/4) specifies the vertical
    // position of the rest.
    new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }),

    // A C-Major chord.
    new VF.StaveNote({
      clef: 'treble',
      keys: ['c/4', 'e/4', 'g/4'],
      duration: 'q'
    })
  ];

  // Create a voice in 4/4 and add above notes
  const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
  voice.addTickables(notes);

  // Format and justify the notes to 400 pixels.
  const formatter = new VF.Formatter();
  formatter.joinVoices([voice]).format([voice], 400);

  // Render voice
  voice.draw(context, stave);
};

const stave2 = context => {
  const stave = getNewStave(10, 160, 400);
  stave.setContext(context).draw();

  const notes = [
    new VF.StaveNote({ clef: 'treble', keys: ['c/5'], duration: 'q' }),
    new VF.StaveNote({ clef: 'treble', keys: ['d/4'], duration: 'q' }),
    new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }),
    new VF.StaveNote({
      clef: 'treble',
      keys: ['c/4', 'e/4', 'g/4'],
      duration: 'q'
    })
  ];

  const notes2 = [
    new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'w' })
  ];

  // Create a voice in 4/4 and add above notes
  const voices = [
    new VF.Voice({ num_beats: 4, beat_value: 4 }).addTickables(notes),
    new VF.Voice({ num_beats: 4, beat_value: 4 }).addTickables(notes2)
  ];

  // Format and justify the notes to 400 pixels.
  const formatter = new VF.Formatter();
  formatter.joinVoices(voices).format(voices, 400);

  // Render voices
  voices.forEach(function(v) {
    v.draw(context, stave);
  });
};

const stave3 = context => {
  const stave = getNewStave(10, 280, 400);
  stave.setContext(context).draw();

  const notes = [
    new VF.StaveNote({ clef: 'treble', keys: ['e##/5'], duration: '8d' })
      .addAccidental(0, new VF.Accidental('##'))
      .addDotToAll(),

    new VF.StaveNote({
      clef: 'treble',
      keys: ['eb/5'],
      duration: '16'
    }).addAccidental(0, new VF.Accidental('b')),

    new VF.StaveNote({
      clef: 'treble',
      keys: ['d/5', 'eb/4'],
      duration: 'h'
    }).addDot(0),

    new VF.StaveNote({
      clef: 'treble',
      keys: ['c/5', 'eb/5', 'g#/5'],
      duration: 'q'
    })
      .addAccidental(1, new VF.Accidental('b'))
      .addAccidental(2, new VF.Accidental('#'))
      .addDotToAll()
  ];

  VF.Formatter.FormatAndDraw(context, stave, notes);
};

const blah = id => {
  // Create an SVG renderer and attach it to the DIV element named "boo".
  const div = document.getElementById(id);
  const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Size our svg:
  renderer.resize(500, 500);

  // And get a drawing context:
  const context = renderer.getContext();

  stave1(context);
  stave2(context);
  stave3(context);
};

export default blah;
