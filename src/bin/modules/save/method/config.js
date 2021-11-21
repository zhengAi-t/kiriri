let methods={};
import localstorage from './localstorage';
methods.localstorage=localstorage;
import indexeddb from './indexeddb';
methods.indexeddb=indexeddb;
import filesystem from './filesystem';
methods.filesystem=filesystem;
console.warn('choose methods needed only');
export default methods;