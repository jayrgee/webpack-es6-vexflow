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

const stave1 = (context, config) => {
  const stave = getNewStave(config);
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
  new VF.Formatter().joinVoices([voice]).format([voice], 400);

  // Render voice
  voice.draw(context, stave);
};
const stave2 = (context, config) => {
  const stave = getNewStave(config);
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
  new VF.Formatter().joinVoices(voices).format(voices, 400);

  // Render voices
  voices.forEach(function(v) {
    v.draw(context, stave);
  });
};

const stave3 = (context, config) => {
  const stave = getNewStave(config);
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
      keys: ['eb/4', 'd/5'],
      duration: 'h'
    }).addDot(1),

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

const stave4 = (context, config) => {
  const stave = getNewStave(config);
  stave.setContext(context).draw();

  const notes = [
    new VF.StaveNote({
      clef: 'treble',
      keys: ['g/4', 'b/4', 'cb/5', 'e/5', 'g#/5', 'b/5'],
      duration: 'h'
    })
      .addAccidental(0, new VF.Accidental('bb'))
      .addAccidental(1, new VF.Accidental('b'))
      .addAccidental(2, new VF.Accidental('#'))
      .addAccidental(3, new VF.Accidental('n'))
      .addAccidental(4, new VF.Accidental('b'))
      .addAccidental(5, new VF.Accidental('##')),
    new Vex.Flow.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'h' })
  ];

  // Helper function to justify and draw a 4/4 voice
  VF.Formatter.FormatAndDraw(context, stave, notes);
};

const blah = async (id, width = 500, height = 500) => {
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
    options: { stave: {}, clef: 'treble', ts: '4/4' }
  };

  await stave1(context, { ...config, ...{ y: 40 } });
  await stave2(context, { ...config, ...{ y: 160 } });
  await stave3(context, { ...config, ...{ y: 280 } });
  await stave4(context, { ...config, ...{ y: 400 } });

  const ids = Array.from(div.getElementsByClassName('vf-stavenote')).map(
    e => e.id
  );
  console.log(ids);
};

export default blah;
