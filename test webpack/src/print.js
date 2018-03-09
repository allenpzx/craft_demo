console.log('The print.js module has loaded! See the network tab in dev tools...');
import { cube } from './math.js';

export default () => {
    console.log('Button Clicked: Here\'s "some text"!'+cube("10"));
}



