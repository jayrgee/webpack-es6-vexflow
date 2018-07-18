import 'babel-polyfill';

import blah from './blah';
import sayHello from './hello';
import './index.scss';

document.getElementById('root').innerHTML = sayHello();

const vex = document.getElementById('vex');
blah(vex.id);