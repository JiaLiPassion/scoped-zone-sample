let fs: any;
try {
  fs = require('fs');
} catch (err) {}

let cryoto: any;
try {
  cryoto = require('cryoto');
} catch (err) {}

const _globalNode: any = typeof window !== 'undefined' ? window : global;

const pathcedTargetsNode = [
  {
    target: process,
    prop: 'nextTick',
  },
  {
    target: cryoto,
    prop: 'randomBytes',
  },
  {
    target: cryoto,
    prop: 'pbkdf2',
  },
];

const TO_PATCH_MACROTASK_METHODS = [
  'access',
  'appendFile',
  'chmod',
  'chown',
  'close',
  'exists',
  'fchmod',
  'fchown',
  'fdatasync',
  'fstat',
  'fsync',
  'ftruncate',
  'futimes',
  'lchmod',
  'lchown',
  'link',
  'lstat',
  'mkdir',
  'mkdtemp',
  'open',
  'read',
  'readdir',
  'readFile',
  'readlink',
  'realpath',
  'rename',
  'rmdir',
  'stat',
  'symlink',
  'truncate',
  'unlink',
  'utimes',
  'write',
  'writeFile',
];

if (fs) {
  TO_PATCH_MACROTASK_METHODS.forEach((m) => {
    pathcedTargets.push({
      target: fs,
      prop: m,
    });
  });
}

_globalNode['Zone'].disableZoneNode = function disableZoneNode() {
  pathcedTargetsNode.forEach((pt) => {
    console.log('try to disable Zone patch', pt);
    if (!pt.target[pt.prop]) {
      return;
    }
    const originalDelegate = pt.target[_globalNode['Zone'].__symbol__(pt.prop)];
    pt.target[_globalNode['Zone'].__symbol__(`patched_${pt.prop}`)] =
      pt.target[pt.prop];
    if (originalDelegate) {
      pt.target[pt.prop] = originalDelegate;
      console.log('Zone patch disabled', pt);
    }
  });
};

_globalNode['Zone'].enableZoneNode = function enableZoneNode() {
  pathcedTargets.forEach((pt) => {
    console.log('try to enable Zone patch', pt);
    if (!pt.target[pt.prop]) {
      return;
    }
    const patchedDelegate =
      pt.target[_globalNode['Zone'].__symbol__(`patched_${pt.prop}`)];
    if (patchedDelegate) {
      pt.target[pt.prop] = patchedDelegate;
      console.log('Zone patch enabled', pt);
    }
  });
};
