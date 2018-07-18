import 'babel-polyfill';

import vfDemo from './vfDemo';
import sayHello from './hello';
import './index.scss';

document.getElementById('root').innerHTML = sayHello();

const vex = document.getElementById('vex');
vfDemo(vex.id);