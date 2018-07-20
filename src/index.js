import 'babel-polyfill';

import doReMi from './doReMi';
import vfDemo from './vfDemo';
import sayHello from './hello';
import './index.scss';

document.getElementById('root').innerHTML = sayHello();

const drm = document.getElementById('do-re-mi');
doReMi(drm.id);

const vex = document.getElementById('vfdemo');
vfDemo(vex.id, 500, 900);
