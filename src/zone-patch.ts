const _global: any = typeof window !== 'undefined' ? window : global;
const Zone: any = _global['Zone'];

const pathcedTargets = [
  {
    target: _global,
    prop: 'queueMicrotask',
  },
  {
    target: _global,
    prop: 'setTimeout',
  },
  {
    target: _global,
    prop: 'clearTimeout',
  },
  {
    target: _global,
    prop: 'clearInterval',
  },
  {
    target: _global,
    prop: 'clearImmediate',
  },
  {
    target: _global,
    prop: 'requestAnimationFrame',
  },
  {
    target: _global,
    prop: 'cancelAnimationFrame',
  },
  {
    target: _global.EventTarget.prototype,
    prop: 'addEventListener',
  },
  {
    target: _global.EventTarget.prototype,
    prop: 'removeEventListener',
  },
  {
    target: _global.XMLHttpRequestEventTarget?.prototype,
    prop: 'addEventListener',
  },
  {
    target: _global.XMLHttpRequestEventTarget?.prototype,
    prop: 'removeEventListener',
  },
  {
    target: _global,
    prop: 'MutationObserver',
  },
  {
    target: _global,
    prop: 'IntersectionObserver',
  },
  {
    target: _global,
    prop: 'FileReader',
  },
  {
    target: _global,
    prop: 'FileReader',
  },
  {
    target: _global.customElements,
    prop: 'connectedCallback',
  },
  {
    target: _global.customElements,
    prop: 'disconnectedCallback',
  },
  {
    target: _global.customElements,
    prop: 'adoptedCallback',
  },
  {
    target: _global.customElements,
    prop: 'attributeChangedCallback',
  },
  {
    target: _global.XMLHttpRequest.prototype,
    prop: 'open',
  },
  {
    target: _global.XMLHttpRequest.prototype,
    prop: 'send',
  },
  {
    target: _global.XMLHttpRequest.prototype,
    prop: 'abort',
  },
  {
    target: _global.navigator?.geolocation,
    prop: 'getCurrentPosition',
  },
  {
    target: _global.navigator?.geolocation,
    prop: 'watchPosition',
  },
  {
    target: _global.HTMLCanvasElement.prototype,
    prop: 'toBlob',
  },
  {
    target: _global,
    prop: 'Promise',
  },
  {
    target: _global[Zone.__symbol__('Promise')]?.prototype,
    prop: 'then',
  },
  {
    target: _global.Function.prototype,
    prop: 'toString',
  },
  {
    target: _global,
    prop: 'fetch',
  },
  {
    target: _global,
    prop: 'AbortController',
  },
];

Zone.disableZone = function disableZone() {
  pathcedTargets.forEach((pt) => {
    console.log('try to disable Zone patch', pt);
    if (!pt.target[pt.prop]) {
      return;
    }
    const originalDelegate = pt.target[Zone.__symbol__(pt.prop)];
    pt.target[Zone.__symbol__(`patched_${pt.prop}`)] = pt.target[pt.prop];
    if (originalDelegate) {
      pt.target[pt.prop] = originalDelegate;
      console.log('Zone patch disabled', pt);
    }
  });
};

Zone.enableZone = function enableZone() {
  pathcedTargets.forEach((pt) => {
    console.log('try to enable Zone patch', pt);
    if (!pt.target[pt.prop]) {
      return;
    }
    const patchedDelegate = pt.target[Zone.__symbol__(`patched_${pt.prop}`)];
    if (patchedDelegate) {
      pt.target[pt.prop] = patchedDelegate;
      console.log('Zone patch enabled', pt);
    }
  });
};
