# replaced every \ with \\
content = '''
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(4);
__webpack_require__(11);
__webpack_require__(27);
__webpack_require__(45);
__webpack_require__(65);
__webpack_require__(67);
module.exports = __webpack_require__(68);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var worker_rpc_1 = __webpack_require__(2);
exports.rpc = new worker_rpc_1.RPC(self);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var disposable_1 = __webpack_require__(3);
var IS_WORKER = (true);
var handlers = new Map();
function registerRPC(key, handler) {
    handlers.set(key, handler);
}
exports.registerRPC = registerRPC;
;

var RPC = function () {
    function RPC(target) {
        _classCallCheck(this, RPC);

        this.target = target;
        this.objects = new Map();
        this.nextId = IS_WORKER ? -1 : 0;
        target.onmessage = e => {
            var data = e.data;
            handlers.get(data.functionName).call(this, data);
        };
    }

    _createClass(RPC, [{
        key: 'set',
        value: function set(id, value) {
            this.objects.set(id, value);
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            this.objects.delete(id);
        }
    }, {
        key: 'get',
        value: function get(id) {
            return this.objects.get(id);
        }
    }, {
        key: 'getRef',
        value: function getRef(x) {
            var rpcId = x['id'];
            var obj = this.get(rpcId);
            obj.referencedGeneration = x['gen'];
            obj.addRef();
            return obj;
        }
    }, {
        key: 'invoke',
        value: function invoke(name, x, transfers) {
            x.functionName = name;
            this.target.postMessage(x, transfers);
        }
    }, {
        key: 'newId',
        value: function newId() {
            return IS_WORKER ? this.nextId-- : this.nextId++;
        }
    }]);

    return RPC;
}();

exports.RPC = RPC;
;

var SharedObject = function (_disposable_1$RefCoun) {
    _inherits(SharedObject, _disposable_1$RefCoun);

    function SharedObject() {
        _classCallCheck(this, SharedObject);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SharedObject).call(this, ...args));

        _this.rpc = null;
        _this.rpcId = null;
        return _this;
    }

    _createClass(SharedObject, [{
        key: 'initializeSharedObject',
        value: function initializeSharedObject(rpc) {
            var rpcId = arguments.length <= 1 || arguments[1] === undefined ? rpc.newId() : arguments[1];

            this.rpc = rpc;
            this.rpcId = rpcId;
            this.isOwner = false;
            rpc.set(rpcId, this);
        }
    }, {
        key: 'initializeCounterpart',
        value: function initializeCounterpart(rpc) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            this.initializeSharedObject(rpc);
            this.unreferencedGeneration = 0;
            this.referencedGeneration = 0;
            this.isOwner = true;
            options['id'] = this.rpcId;
            rpc.invoke('SharedObject.new', options);
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            var rpc = this.rpc;

            if (rpc != null) {
                this.rpc = null;
                var rpcId = this.rpcId;

                rpc.delete(rpcId);
                rpc.invoke('SharedObject.dispose', { 'id': rpcId });
            }
        }
        /**
         * Precondition: this.isOwner === true.
         */

    }, {
        key: 'addCounterpartRef',
        value: function addCounterpartRef() {
            return { 'id': this.rpcId, 'gen': ++this.referencedGeneration };
        }
    }, {
        key: 'refCountReachedZero',
        value: function refCountReachedZero() {
            if (this.isOwner === true) {
                if (this.referencedGeneration === this.unreferencedGeneration) {
                    this.ownerDispose();
                }
            } else if (this.isOwner === false) {
                this.rpc.invoke('SharedObject.refCountReachedZero', { 'id': this.rpcId, 'gen': this.referencedGeneration });
            } else {
                _get(Object.getPrototypeOf(SharedObject.prototype), 'refCountReachedZero', this).call(this);
            }
        }
        /**
         * Precondition: this.isOwner === true.
         */

    }, {
        key: 'ownerDispose',
        value: function ownerDispose() {
            _get(Object.getPrototypeOf(SharedObject.prototype), 'refCountReachedZero', this).call(this);
            var rpc = this.rpc;
            var rpcId = this.rpcId;

            rpc.delete(rpcId);
            rpc.invoke('SharedObject.dispose', { 'id': rpcId });
        }
        /**
         * Precondition: this.isOwner === true.
         *
         * This should be called when the counterpart's refCount is decremented and reaches zero.
         */

    }, {
        key: 'counterpartRefCountReachedZero',
        value: function counterpartRefCountReachedZero(generation) {
            this.unreferencedGeneration = generation;
            if (this.refCount === 0 && generation === this.referencedGeneration) {
                this.ownerDispose();
            }
        }
    }]);

    return SharedObject;
}(disposable_1.RefCounted);

exports.SharedObject = SharedObject;
;
/**
 * Base class for defining a SharedObject type that will never be owned.
 */

var SharedObjectCounterpart = function (_SharedObject) {
    _inherits(SharedObjectCounterpart, _SharedObject);

    function SharedObjectCounterpart(rpc) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, SharedObjectCounterpart);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SharedObjectCounterpart).call(this));

        if (rpc != null) {
            _this2.initializeSharedObject(rpc, options['id']);
        }
        return _this2;
    }

    return SharedObjectCounterpart;
}(SharedObject);

exports.SharedObjectCounterpart = SharedObjectCounterpart;
;
registerRPC('SharedObject.dispose', function (x) {
    var obj = this.get(x['id']);
    obj.dispose();
    this.delete(obj.rpcId);
    obj.rpcId = null;
    obj.rpc = null;
});
registerRPC('SharedObject.refCountReachedZero', function (x) {
    var obj = this.get(x['id']);
    var generation = x['gen'];
    obj.counterpartRefCountReachedZero(generation);
});
var sharedObjectConstructors = new Map();
function registerSharedObject(name, constructorFunction) {
    sharedObjectConstructors.set(name, constructorFunction);
}
exports.registerSharedObject = registerSharedObject;
registerRPC('SharedObject.new', function (x) {
    var rpc = this;
    var typeName = x['type'];
    var constructorFunction = sharedObjectConstructors.get(typeName);
    var obj = new constructorFunction(rpc, x);
    // Counterpart objects start with a reference count of zero.
    --obj.refCount;
});

/***/ },
/* 3 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RefCounted = function () {
    function RefCounted() {
        _classCallCheck(this, RefCounted);

        this.refCount = 1;
    }

    _createClass(RefCounted, [{
        key: "addRef",
        value: function addRef() {
            ++this.refCount;
            return this;
        }
    }, {
        key: "dispose",
        value: function dispose() {
            if (--this.refCount !== 0) {
                return;
            }
            this.refCountReachedZero();
        }
    }, {
        key: "refCountReachedZero",
        value: function refCountReachedZero() {
            this.disposed();
            var disposers = this.disposers;

            if (disposers != null) {
                var numDisposers = disposers.length;
                for (var i = numDisposers; i > 0; --i) {
                    var disposer = disposers[i - 1];
                    if (typeof disposer === 'object') {
                        disposer.dispose();
                    } else {
                        disposer.call(this);
                    }
                }
                this.disposers = null;
            }
        }
    }, {
        key: "disposed",
        value: function disposed() {}
    }, {
        key: "registerDisposer",
        value: function registerDisposer(f) {
            var disposers = this.disposers;

            if (disposers == null) {
                this.disposers = [f];
            } else {
                disposers.push(f);
            }
            return f;
        }
    }, {
        key: "unregisterDisposer",
        value: function unregisterDisposer(f) {
            var disposers = this.disposers;

            if (disposers != null) {
                var index = disposers.indexOf(f);
                if (index !== -1) {
                    disposers.splice(index, 1);
                }
            }
            return f;
        }
    }, {
        key: "registerSignalBinding",
        value: function registerSignalBinding(binding) {
            this.registerDisposer(() => binding.detach());
        }
    }, {
        key: "registerEventListener",
        value: function registerEventListener(target, eventType, listener, arg) {
            target.addEventListener(eventType, listener, arg);
            this.registerDisposer(() => target.removeEventListener(eventType, listener, arg));
        }
    }]);

    return RefCounted;
}();

exports.RefCounted = RefCounted;
;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var base_1 = __webpack_require__(5);
var worker_rpc_1 = __webpack_require__(2);
var signals_1 = __webpack_require__(6);
var pairing_heap_0_1 = __webpack_require__(7);
var pairing_heap_1_1 = __webpack_require__(8);
var linked_list_0_1 = __webpack_require__(9);
var linked_list_1_1 = __webpack_require__(10);
var worker_rpc_context_1 = __webpack_require__(1);
var DEBUG_CHUNK_UPDATES = false;

var Chunk = function () {
    function Chunk() {
        _classCallCheck(this, Chunk);

        // Node properties used for eviction/promotion heaps and LRU linked lists.
        this.child0 = null;
        this.next0 = null;
        this.prev0 = null;
        this.child1 = null;
        this.next1 = null;
        this.prev1 = null;
        this.source = null;
        this.key = null;
        this.state = base_1.ChunkState.NEW;
        /**
         * Specifies existing priority within priority tier.  Only meaningful if priorityTier in
         * CHUNK_ORDERED_PRIORITY_TIERS.
         */
        this.priority = 0;
        /**
         * Specifies updated priority within priority tier, not yet reflected in priority queue state.
         * Only meaningful if newPriorityTier in CHUNK_ORDERED_PRIORITY_TIERS.
         */
        this.newPriority = 0;
        this.priorityTier = base_1.ChunkPriorityTier.RECENT;
        /**
         * Specifies updated priority tier, not yet reflected in priority queue state.
         */
        this.newPriorityTier = base_1.ChunkPriorityTier.RECENT;
        this.backendOnly = false;
    }

    _createClass(Chunk, [{
        key: 'initialize',
        value: function initialize(key) {
            this.key = key;
            this.state = base_1.ChunkState.NEW;
            this.priority = Number.NEGATIVE_INFINITY;
            this.priorityTier = base_1.ChunkPriorityTier.RECENT;
            this.newPriority = Number.NEGATIVE_INFINITY;
            this.newPriorityTier = base_1.ChunkPriorityTier.RECENT;
        }
        /**
         * Sets this.priority{Tier,} to this.newPriority{Tier,}, and resets this.newPriorityTier to
         * ChunkPriorityTier.RECENT.
         *
         * This does not actually update any queues to reflect this change.
         */

    }, {
        key: 'updatePriorityProperties',
        value: function updatePriorityProperties() {
            this.priorityTier = this.newPriorityTier;
            this.priority = this.newPriority;
            this.newPriorityTier = base_1.ChunkPriorityTier.RECENT;
            this.newPriority = Number.NEGATIVE_INFINITY;
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.source = null;
        }
    }, {
        key: 'downloadFailed',
        value: function downloadFailed() {
            this.queueManager.updateChunkState(this, base_1.ChunkState.FAILED);
        }
    }, {
        key: 'downloadSucceeded',
        value: function downloadSucceeded() {
            this.queueManager.updateChunkState(this, base_1.ChunkState.SYSTEM_MEMORY_WORKER);
        }
    }, {
        key: 'freeSystemMemory',
        value: function freeSystemMemory() {}
    }, {
        key: 'cancelDownload',
        value: function cancelDownload() {}
    }, {
        key: 'serialize',
        value: function serialize(msg, transfers) {
            msg['id'] = this.key;
            msg['source'] = this.source.rpcId;
            msg['new'] = true;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.key;
        }
    }, {
        key: 'chunkManager',
        get: function () {
            return this.source.chunkManager;
        }
    }, {
        key: 'queueManager',
        get: function () {
            return this.source.chunkManager.queueManager;
        }
    }], [{
        key: 'priorityLess',
        value: function priorityLess(a, b) {
            return a.priority < b.priority;
        }
    }, {
        key: 'priorityGreater',
        value: function priorityGreater(a, b) {
            return a.priority > b.priority;
        }
    }]);

    return Chunk;
}();

exports.Chunk = Chunk;
;

var ChunkSource = function (_worker_rpc_1$SharedO) {
    _inherits(ChunkSource, _worker_rpc_1$SharedO);

    function ChunkSource(rpc, options) {
        _classCallCheck(this, ChunkSource);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChunkSource).call(this, rpc, options));

        _this.chunks = new Map();
        _this.freeChunks = new Array();
        // No need to add a reference, since the owner counterpart will hold a reference to the owner
        // counterpart of chunkManager.
        _this.chunkManager = rpc.get(options['chunkManager']);
        return _this;
    }

    _createClass(ChunkSource, [{
        key: 'getNewChunk_',
        value: function getNewChunk_(chunkType) {
            var freeChunks = this.freeChunks;
            var freeChunksLength = freeChunks.length;
            if (freeChunksLength > 0) {
                var _chunk = freeChunks[freeChunksLength - 1];
                freeChunks.length = freeChunksLength - 1;
                _chunk.source = this;
                return _chunk;
            }
            var chunk = new chunkType();
            chunk.source = this;
            return chunk;
        }
    }, {
        key: 'download',
        value: function download(chunk) {}
        /**
         * Adds the specified chunk to the chunk cache.
         *
         * If the chunk cache was previously empty, also call this.addRef() to increment the reference
         * count.
         */

    }, {
        key: 'addChunk',
        value: function addChunk(chunk) {
            var chunks = this.chunks;

            if (chunks.size === 0) {
                this.addRef();
            }
            chunks.set(chunk.key, chunk);
        }
        /**
         * Remove the specified chunk from the chunk cache.
         *
         * If the chunk cache becomes empty, also call this.dispose() to decrement the reference count.
         */

    }, {
        key: 'removeChunk',
        value: function removeChunk(chunk) {
            var chunks = this.chunks;
            var freeChunks = this.freeChunks;

            chunks.delete(chunk.key);
            chunk.dispose();
            freeChunks[freeChunks.length] = chunk;
            if (chunks.size === 0) {
                this.dispose();
            }
        }
    }]);

    return ChunkSource;
}(worker_rpc_1.SharedObjectCounterpart);

exports.ChunkSource = ChunkSource;
;
function handleChunkDownloadPromise(chunk, promise, chunkDecoder) {
    chunk.cancelDownload = function () {
        chunk.cancelDownload = null;
        promise.cancel();
    };
    promise.then(response => {
        if (chunk.cancelDownload === null) {
            // Download was cancelled.
            return;
        }
        chunk.cancelDownload = null;
        try {
            chunkDecoder.call(undefined, chunk, response);
            chunk.downloadSucceeded();
        } catch (e) {
            console.log(`Failed to decode chunk ${ chunk }: ${ e }`);
            chunk.downloadFailed();
        }
    }, function (xhr) {
        if (chunk.cancelDownload === null) {
            // Download was cancelled.
            return;
        }
        chunk.cancelDownload = null;
        chunk.downloadFailed();
        console.log(`Download failed for chunk ${ chunk }`);
    });
}
exports.handleChunkDownloadPromise = handleChunkDownloadPromise;
var ChunkPriorityQueueType;
(function (ChunkPriorityQueueType) {
    // Queue finds lowest priority chunks.
    ChunkPriorityQueueType[ChunkPriorityQueueType["MIN"] = 0] = "MIN";
    // Queue finds highest priority chunks.
    ChunkPriorityQueueType[ChunkPriorityQueueType["MAX"] = 1] = "MAX";
})(ChunkPriorityQueueType || (ChunkPriorityQueueType = {}));

var ChunkPriorityQueue = function () {
    function ChunkPriorityQueue(heapOperations, linkedListOperations) {
        _classCallCheck(this, ChunkPriorityQueue);

        this.heapOperations = heapOperations;
        this.linkedListOperations = linkedListOperations;
        /**
         * Heap roots for VISIBLE and PREFETCH priority tiers.
         */
        this.heapRoots = [null, null];
        /**
         * Head node for RECENT linked list.
         */
        this.recentHead = new Chunk();
        linkedListOperations.initializeHead(this.recentHead);
    }

    _createClass(ChunkPriorityQueue, [{
        key: 'add',
        value: function add(chunk) {
            var priorityTier = chunk.priorityTier;
            if (priorityTier === base_1.ChunkPriorityTier.RECENT) {
                this.linkedListOperations.insertAfter(this.recentHead, chunk);
            } else {
                var heapRoots = this.heapRoots;

                heapRoots[priorityTier] = this.heapOperations.meld(heapRoots[priorityTier], chunk);
            }
        }
    }, {
        key: 'candidates',
        value: function* candidates() {
            if (this.heapOperations.compare === Chunk.priorityLess) {
                // Start with least-recently used RECENT chunk.
                var linkedListOperations = this.linkedListOperations;
                var recentHead = this.recentHead;

                while (true) {
                    var chunk = linkedListOperations.back(recentHead);
                    if (chunk == null) {
                        break;
                    } else {
                        yield chunk;
                    }
                }
                var heapRoots = this.heapRoots;

                for (var tier = base_1.ChunkPriorityTier.LAST_ORDERED_TIER; tier >= base_1.ChunkPriorityTier.FIRST_ORDERED_TIER; --tier) {
                    while (true) {
                        var root = heapRoots[tier];
                        if (root == null) {
                            break;
                        } else {
                            yield root;
                        }
                    }
                }
            } else {
                var _heapRoots = this.heapRoots;
                for (var _tier = base_1.ChunkPriorityTier.FIRST_ORDERED_TIER; _tier <= base_1.ChunkPriorityTier.LAST_ORDERED_TIER; ++_tier) {
                    while (true) {
                        var _root = _heapRoots[_tier];
                        if (_root == null) {
                            break;
                        } else {
                            yield _root;
                        }
                    }
                }
                var _linkedListOperations = this.linkedListOperations;
                var _recentHead = this.recentHead;

                while (true) {
                    var _chunk2 = _linkedListOperations.front(_recentHead);
                    if (_chunk2 == null) {
                        break;
                    } else {
                        yield _chunk2;
                    }
                }
            }
        }
        /**
         * Deletes a chunk from this priority queue.
         * @param chunk The chunk to delete from the priority queue.
         */

    }, {
        key: 'delete',
        value: function _delete(chunk) {
            var priorityTier = chunk.priorityTier;
            if (priorityTier === base_1.ChunkPriorityTier.RECENT) {
                this.linkedListOperations.pop(chunk);
            } else {
                var heapRoots = this.heapRoots;
                heapRoots[priorityTier] = this.heapOperations.remove(heapRoots[priorityTier], chunk);
            }
        }
    }]);

    return ChunkPriorityQueue;
}();

;
function makeChunkPriorityQueue0(compare) {
    return new ChunkPriorityQueue(new pairing_heap_0_1.default(compare), linked_list_0_1.default);
}
function makeChunkPriorityQueue1(compare) {
    return new ChunkPriorityQueue(new pairing_heap_1_1.default(compare), linked_list_1_1.default);
}
function tryToFreeCapacity(size, capacity, priorityTier, priority, evictionCandidates, evict) {
    while (capacity.availableItems < 1 || capacity.availableSize < size) {
        var evictionCandidate = evictionCandidates.next().value;
        if (evictionCandidate === undefined) {
            // No eviction candidates available, promotions are done.
            return false;
        } else {
            var evictionTier = evictionCandidate.priorityTier;
            if (evictionTier < priorityTier || evictionTier === priorityTier && evictionCandidate.priority >= priority) {
                // Lowest priority eviction candidate has priority >= highest
                // priority promotion candidate.  No more promotions are
                // possible.
                return false;
            }
            evict(evictionCandidate);
        }
    }
    return true;
}

var ChunkQueueManager = function (_worker_rpc_1$SharedO2) {
    _inherits(ChunkQueueManager, _worker_rpc_1$SharedO2);

    function ChunkQueueManager(rpc, options) {
        _classCallCheck(this, ChunkQueueManager);

        /**
         * Contains all chunks in QUEUED state.
         */

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChunkQueueManager).call(this, rpc, options));

        _this2.queuedPromotionQueue = makeChunkPriorityQueue1(Chunk.priorityGreater);
        /**
         * Contains all chunks in DOWNLOADING state.
         */
        _this2.downloadEvictionQueue = makeChunkPriorityQueue1(Chunk.priorityLess);
        /**
         * Contains all chunks that take up memory (DOWNLOADING, SYSTEM_MEMORY,
         * GPU_MEMORY).
         */
        _this2.systemMemoryEvictionQueue = makeChunkPriorityQueue0(Chunk.priorityLess);
        /**
         * Contains all chunks in SYSTEM_MEMORY state not in RECENT priority tier.
         */
        _this2.gpuMemoryPromotionQueue = makeChunkPriorityQueue1(Chunk.priorityGreater);
        /**
         * Contains all chunks in GPU_MEMORY state.
         */
        _this2.gpuMemoryEvictionQueue = makeChunkPriorityQueue1(Chunk.priorityLess);
        _this2.updatePending = null;
        _this2.numQueued = 0;
        _this2.numFailed = 0;
        _this2.gpuMemoryCapacity = base_1.AvailableCapacity.fromObject(options['gpuMemoryCapacity']);
        _this2.systemMemoryCapacity = base_1.AvailableCapacity.fromObject(options['systemMemoryCapacity']);
        _this2.downloadCapacity = base_1.AvailableCapacity.fromObject(options['downloadCapacity']);
        return _this2;
    }

    _createClass(ChunkQueueManager, [{
        key: 'scheduleUpdate',
        value: function scheduleUpdate() {
            if (this.updatePending === null) {
                this.updatePending = setTimeout(this.process.bind(this), 0);
            }
        }
    }, {
        key: 'chunkQueuesForChunk',
        value: function* chunkQueuesForChunk(chunk) {
            switch (chunk.state) {
                case base_1.ChunkState.QUEUED:
                    yield this.queuedPromotionQueue;
                    break;
                case base_1.ChunkState.DOWNLOADING:
                    yield this.downloadEvictionQueue;
                    yield this.systemMemoryEvictionQueue;
                    break;
                case base_1.ChunkState.SYSTEM_MEMORY_WORKER:
                case base_1.ChunkState.SYSTEM_MEMORY:
                    yield this.systemMemoryEvictionQueue;
                    if (chunk.priorityTier !== base_1.ChunkPriorityTier.RECENT && !chunk.backendOnly) {
                        yield this.gpuMemoryPromotionQueue;
                    }
                    break;
                case base_1.ChunkState.GPU_MEMORY:
                    yield this.systemMemoryEvictionQueue;
                    yield this.gpuMemoryEvictionQueue;
                    break;
            }
        }
    }, {
        key: 'adjustCapacitiesForChunk',
        value: function adjustCapacitiesForChunk(chunk, add) {
            var factor = add ? -1 : 1;
            switch (chunk.state) {
                case base_1.ChunkState.FAILED:
                    this.numFailed -= factor;
                    break;
                case base_1.ChunkState.QUEUED:
                    this.numQueued -= factor;
                    break;
                case base_1.ChunkState.DOWNLOADING:
                    this.downloadCapacity.adjust(factor, 0);
                    this.systemMemoryCapacity.adjust(factor, 0);
                    break;
                case base_1.ChunkState.SYSTEM_MEMORY:
                case base_1.ChunkState.SYSTEM_MEMORY_WORKER:
                    this.systemMemoryCapacity.adjust(factor, factor * chunk.systemMemoryBytes);
                    break;
                case base_1.ChunkState.GPU_MEMORY:
                    this.systemMemoryCapacity.adjust(factor, factor * chunk.systemMemoryBytes);
                    this.gpuMemoryCapacity.adjust(factor, factor * chunk.gpuMemoryBytes);
                    break;
            }
        }
    }, {
        key: 'removeChunkFromQueues_',
        value: function removeChunkFromQueues_(chunk) {
            for (var queue of this.chunkQueuesForChunk(chunk)) {
                queue.delete(chunk);
            }
        }
        // var freedChunks = 0;

    }, {
        key: 'addChunkToQueues_',
        value: function addChunkToQueues_(chunk) {
            if (chunk.state === base_1.ChunkState.QUEUED && chunk.priorityTier === base_1.ChunkPriorityTier.RECENT) {
                // Delete this chunk.
                var source = chunk.source;
                source.removeChunk(chunk);
                this.adjustCapacitiesForChunk(chunk, false);
                return false;
            } else {
                for (var queue of this.chunkQueuesForChunk(chunk)) {
                    queue.add(chunk);
                }
                return true;
            }
        }
    }, {
        key: 'performChunkPriorityUpdate',
        value: function performChunkPriorityUpdate(chunk) {
            if (chunk.priorityTier === chunk.newPriorityTier && chunk.priority === chunk.newPriority) {
                chunk.newPriorityTier = base_1.ChunkPriorityTier.RECENT;
                chunk.newPriority = Number.NEGATIVE_INFINITY;
                return;
            }
            if (DEBUG_CHUNK_UPDATES) {
                console.log(`${ chunk }: changed priority ${ chunk.priorityTier }:${ chunk.priority } -> ${ chunk.newPriorityTier }:${ chunk.newPriority }`);
            }
            this.removeChunkFromQueues_(chunk);
            chunk.updatePriorityProperties();
            if (chunk.state === base_1.ChunkState.NEW) {
                chunk.state = base_1.ChunkState.QUEUED;
                this.adjustCapacitiesForChunk(chunk, true);
            }
            this.addChunkToQueues_(chunk);
        }
    }, {
        key: 'updateChunkState',
        value: function updateChunkState(chunk, newState) {
            if (newState === chunk.state) {
                return;
            }
            if (DEBUG_CHUNK_UPDATES) {
                console.log(`${ chunk }: changed state ${ chunk.state } -> ${ newState }`);
            }
            this.adjustCapacitiesForChunk(chunk, false);
            this.removeChunkFromQueues_(chunk);
            chunk.state = newState;
            this.adjustCapacitiesForChunk(chunk, true);
            this.addChunkToQueues_(chunk);
            this.scheduleUpdate();
        }
    }, {
        key: 'processGPUPromotions_',
        value: function processGPUPromotions_() {
            var queueManager = this;
            function evictFromGPUMemory(chunk) {
                queueManager.freeChunkGPUMemory(chunk);
                chunk.source.chunkManager.queueManager.updateChunkState(chunk, base_1.ChunkState.SYSTEM_MEMORY);
            }
            var promotionCandidates = this.gpuMemoryPromotionQueue.candidates();
            var evictionCandidates = this.gpuMemoryEvictionQueue.candidates();
            var capacity = this.gpuMemoryCapacity;
            var visibleChunksChanged = false;
            while (true) {
                var promotionCandidate = promotionCandidates.next().value;
                if (promotionCandidate === undefined) {
                    break;
                } else {
                    var priorityTier = promotionCandidate.priorityTier;
                    var priority = promotionCandidate.priority;
                    if (!tryToFreeCapacity(promotionCandidate.gpuMemoryBytes, capacity, priorityTier, priority, evictionCandidates, evictFromGPUMemory)) {
                        break;
                    }
                    this.copyChunkToGPU(promotionCandidate);
                    this.updateChunkState(promotionCandidate, base_1.ChunkState.GPU_MEMORY);
                    if (priorityTier === base_1.ChunkPriorityTier.VISIBLE) {
                        visibleChunksChanged = true;
                    }
                }
            }
        }
    }, {
        key: 'freeChunkGPUMemory',
        value: function freeChunkGPUMemory(chunk) {
            worker_rpc_context_1.rpc.invoke('Chunk.update', { 'id': chunk.key, 'state': base_1.ChunkState.SYSTEM_MEMORY, 'source': chunk.source.rpcId });
        }
    }, {
        key: 'freeChunkSystemMemory',
        value: function freeChunkSystemMemory(chunk) {
            if (chunk.state === base_1.ChunkState.SYSTEM_MEMORY_WORKER) {
                worker_rpc_context_1.rpc.invoke('Chunk.update', { 'id': chunk.key, 'state': base_1.ChunkState.EXPIRED, 'source': chunk.source.rpcId });
            } else {
                chunk.freeSystemMemory();
            }
        }
    }, {
        key: 'copyChunkToGPU',
        value: function copyChunkToGPU(chunk) {
            if (chunk.state === base_1.ChunkState.SYSTEM_MEMORY) {
                worker_rpc_context_1.rpc.invoke('Chunk.update', { 'id': chunk.key, 'source': chunk.source.rpcId, 'state': base_1.ChunkState.GPU_MEMORY });
            } else {
                var msg = {};
                var transfers = [];
                chunk.serialize(msg, transfers);
                msg['state'] = base_1.ChunkState.GPU_MEMORY;
                worker_rpc_context_1.rpc.invoke('Chunk.update', msg, transfers);
            }
        }
    }, {
        key: 'processQueuePromotions_',
        value: function processQueuePromotions_() {
            var queueManager = this;
            function evict(chunk) {
                switch (chunk.state) {
                    case base_1.ChunkState.DOWNLOADING:
                        chunk.cancelDownload();
                        break;
                    case base_1.ChunkState.GPU_MEMORY:
                        queueManager.freeChunkGPUMemory(chunk);
                    case base_1.ChunkState.SYSTEM_MEMORY_WORKER:
                    case base_1.ChunkState.SYSTEM_MEMORY:
                        queueManager.freeChunkSystemMemory(chunk);
                        break;
                }
                // Note: After calling this, chunk may no longer be valid.
                chunk.source.chunkManager.queueManager.updateChunkState(chunk, base_1.ChunkState.QUEUED);
            }
            var promotionCandidates = this.queuedPromotionQueue.candidates();
            var downloadEvictionCandidates = this.downloadEvictionQueue.candidates();
            var systemMemoryEvictionCandidates = this.systemMemoryEvictionQueue.candidates();
            var downloadCapacity = this.downloadCapacity;
            var systemMemoryCapacity = this.systemMemoryCapacity;
            while (true) {
                var promotionCandidateResult = promotionCandidates.next();
                if (promotionCandidateResult.done) {
                    return;
                }
                var promotionCandidate = promotionCandidateResult.value;
                var size = 0; /* unknown size, since it hasn't been downloaded yet. */
                var priorityTier = promotionCandidate.priorityTier;
                var priority = promotionCandidate.priority;
                // console.log("Download capacity: " + downloadCapacity);
                if (!tryToFreeCapacity(size, downloadCapacity, priorityTier, priority, downloadEvictionCandidates, evict)) {
                    return;
                }
                if (!tryToFreeCapacity(size, systemMemoryCapacity, priorityTier, priority, systemMemoryEvictionCandidates, evict)) {
                    return;
                }
                this.updateChunkState(promotionCandidate, base_1.ChunkState.DOWNLOADING);
                promotionCandidate.source.download(promotionCandidate);
            }
        }
    }, {
        key: 'process',
        value: function process() {
            if (!this.updatePending) {
                return;
            }
            this.updatePending = null;
            this.processGPUPromotions_();
            this.processQueuePromotions_();
            this.logStatistics();
        }
    }, {
        key: 'logStatistics',
        value: function logStatistics() {
            if (DEBUG_CHUNK_UPDATES) {
                console.log(`[Chunk status] QUEUED: ${ this.numQueued }, FAILED: ${ this.numFailed }, DOWNLOAD: ${ this.downloadCapacity }, MEM: ${ this.systemMemoryCapacity }, GPU: ${ this.gpuMemoryCapacity }`);
            }
        }
    }]);

    return ChunkQueueManager;
}(worker_rpc_1.SharedObjectCounterpart);

exports.ChunkQueueManager = ChunkQueueManager;
;
worker_rpc_1.registerSharedObject('ChunkQueueManager', ChunkQueueManager);

var ChunkManager = function (_worker_rpc_1$SharedO3) {
    _inherits(ChunkManager, _worker_rpc_1$SharedO3);

    function ChunkManager(rpc, options) {
        _classCallCheck(this, ChunkManager);

        /**
         * Array of chunks within each existing priority tier.
         */

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChunkManager).call(this, rpc, options));

        _this3.existingTierChunks = [];
        /**
         * Array of chunks whose new priorities have not yet been reflected in the
         * queue states.
         */
        _this3.newTierChunks = [];
        _this3.updatePending = null;
        _this3.recomputeChunkPriorities = new signals_1.Signal();
        _this3.queueManager = rpc.get(options['chunkQueueManager']).addRef();
        for (var tier = base_1.ChunkPriorityTier.FIRST_TIER; tier <= base_1.ChunkPriorityTier.LAST_TIER; ++tier) {
            if (tier === base_1.ChunkPriorityTier.RECENT) {
                continue;
            }
            _this3.existingTierChunks[tier] = [];
        }
        return _this3;
    }

    _createClass(ChunkManager, [{
        key: 'scheduleUpdateChunkPriorities',
        value: function scheduleUpdateChunkPriorities() {
            if (this.updatePending === null) {
                this.updatePending = setTimeout(this.recomputeChunkPriorities_.bind(this), 0);
            }
        }
    }, {
        key: 'recomputeChunkPriorities_',
        value: function recomputeChunkPriorities_() {
            this.updatePending = null;
            this.recomputeChunkPriorities.dispatch();
            this.updateQueueState([base_1.ChunkPriorityTier.VISIBLE]);
        }
    }, {
        key: 'requestChunk',

        /**
         * @param chunk
         * @param tier New priority tier.  Must not equal ChunkPriorityTier.RECENT.
         * @param priority Priority within tier.
         */
        value: function requestChunk(chunk, tier, priority) {
            if (chunk.newPriorityTier === base_1.ChunkPriorityTier.RECENT) {
                this.newTierChunks.push(chunk);
            }
            chunk.newPriorityTier = tier;
            chunk.newPriority = priority;
        }
        /**
         * Update queue state to reflect updated contents of the specified priority tiers.  Existing
         * chunks within those tiers not present in this.newTierChunks will be moved to the RECENT tier
         * (and removed if in the QUEUED state).
         */

    }, {
        key: 'updateQueueState',
        value: function updateQueueState(tiers) {
            var existingTierChunks = this.existingTierChunks;
            var queueManager = this.queueManager;
            for (var tier of tiers) {
                var chunks = existingTierChunks[tier];
                for (var chunk of chunks) {
                    if (chunk.newPriorityTier === base_1.ChunkPriorityTier.RECENT) {
                        // Downgrade the priority of this chunk.
                        queueManager.performChunkPriorityUpdate(chunk);
                    }
                }
                chunks.length = 0;
            }
            var newTierChunks = this.newTierChunks;
            for (var _chunk3 of newTierChunks) {
                queueManager.performChunkPriorityUpdate(_chunk3);
                existingTierChunks[_chunk3.priorityTier].push(_chunk3);
            }
            if (DEBUG_CHUNK_UPDATES) {
                console.log(`updateQueueState: newTierChunks.length = ${ newTierChunks.length }`);
            }
            newTierChunks.length = 0;
            this.queueManager.scheduleUpdate();
        }
    }]);

    return ChunkManager;
}(worker_rpc_1.SharedObjectCounterpart);

exports.ChunkManager = ChunkManager;
;
worker_rpc_1.registerSharedObject('ChunkManager', ChunkManager);

/***/ },
/* 5 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (ChunkState) {
    // Chunk is stored in GPU memory in addition to system memory.
    ChunkState[ChunkState["GPU_MEMORY"] = 0] = "GPU_MEMORY";
    // Chunk is stored only in system memory but not in GPU memory.
    ChunkState[ChunkState["SYSTEM_MEMORY"] = 1] = "SYSTEM_MEMORY";
    // Chunk is stored in system memory on worker.
    ChunkState[ChunkState["SYSTEM_MEMORY_WORKER"] = 2] = "SYSTEM_MEMORY_WORKER";
    // Chunk is downloading.
    ChunkState[ChunkState["DOWNLOADING"] = 3] = "DOWNLOADING";
    // Chunk is not yet downloading.
    ChunkState[ChunkState["QUEUED"] = 4] = "QUEUED";
    // Chunk has just been added.
    ChunkState[ChunkState["NEW"] = 5] = "NEW";
    // Download failed.
    ChunkState[ChunkState["FAILED"] = 6] = "FAILED";
    ChunkState[ChunkState["EXPIRED"] = 7] = "EXPIRED";
})(exports.ChunkState || (exports.ChunkState = {}));
var ChunkState = exports.ChunkState;
;
(function (ChunkPriorityTier) {
    ChunkPriorityTier[ChunkPriorityTier["FIRST_TIER"] = 0] = "FIRST_TIER";
    ChunkPriorityTier[ChunkPriorityTier["FIRST_ORDERED_TIER"] = 0] = "FIRST_ORDERED_TIER";
    ChunkPriorityTier[ChunkPriorityTier["VISIBLE"] = 0] = "VISIBLE";
    ChunkPriorityTier[ChunkPriorityTier["PREFETCH"] = 1] = "PREFETCH";
    ChunkPriorityTier[ChunkPriorityTier["LAST_ORDERED_TIER"] = 1] = "LAST_ORDERED_TIER";
    ChunkPriorityTier[ChunkPriorityTier["RECENT"] = 2] = "RECENT";
    ChunkPriorityTier[ChunkPriorityTier["LAST_TIER"] = 2] = "LAST_TIER";
})(exports.ChunkPriorityTier || (exports.ChunkPriorityTier = {}));
var ChunkPriorityTier = exports.ChunkPriorityTier;
;

var AvailableCapacity = function () {
    function AvailableCapacity(maxItems, maxSize) {
        _classCallCheck(this, AvailableCapacity);

        /**
         * Number of additional items that are available.
         */
        this.availableItems = maxItems;
        /**
         * Total number of items that can be accomodated.
         */
        this.itemCapacity = maxItems;
        /**
         * Aggregate additional size capacity that is available.
         */
        this.availableSize = maxSize;
        /**
         * Total aggregate item size that can be accomodated.
         */
        this.sizeCapacity = maxSize;
    }
    /**
     * Adjust available capacity by the specified amounts.
     */


    _createClass(AvailableCapacity, [{
        key: "adjust",
        value: function adjust(items, size) {
            this.availableItems += items;
            this.availableSize += size;
        }
    }, {
        key: "toString",
        value: function toString() {
            return `${ this.availableItems }/${ this.itemCapacity } items, ${ this.availableSize }/${ this.sizeCapacity } size`;
        }
    }, {
        key: "toObject",
        value: function toObject() {
            return { 'itemCapacity': this.itemCapacity, 'sizeCapacity': this.sizeCapacity };
        }
    }], [{
        key: "fromObject",
        value: function fromObject(x) {
            return new AvailableCapacity(x['itemCapacity'], x['sizeCapacity']);
        }
    }]);

    return AvailableCapacity;
}();

AvailableCapacity.INFINITE = new AvailableCapacity(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
exports.AvailableCapacity = AvailableCapacity;
;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
/*global define:false, require:false, exports:false, module:false, signals:false */

/** @license
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license
 * Author: Miller Medeiros
 * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
 */

(function(global){

    // SignalBinding -------------------------------------------------
    //================================================================

    /**
     * Object that represents a binding between a Signal and a listener function.
     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
     * @author Miller Medeiros
     * @constructor
     * @internal
     * @name SignalBinding
     * @param {Signal} signal Reference to Signal object that listener is currently bound to.
     * @param {Function} listener Handler function bound to the signal.
     * @param {boolean} isOnce If binding should be executed just once.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. (default = 0).
     */
    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {

        /**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
        this._listener = listener;

        /**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
        this._isOnce = isOnce;

        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
        this.context = listenerContext;

        /**
         * Reference to Signal object that listener is currently bound to.
         * @type Signal
         * @private
         */
        this._signal = signal;

        /**
         * Listener priority
         * @type Number
         * @private
         */
        this._priority = priority || 0;
    }

    SignalBinding.prototype = {

        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active : true,

        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params : null,

        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute : function (paramsArr) {
            var handlerReturn, params;
            if (this.active && !!this._listener) {
                params = this.params? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        },

        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach : function () {
            return this.isBound()? this._signal.remove(this._listener, this.context) : null;
        },

        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound : function () {
            return (!!this._signal && !!this._listener);
        },

        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce : function () {
            return this._isOnce;
        },

        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener : function () {
            return this._listener;
        },

        /**
         * @return {Signal} Signal that listener is currently bound to.
         */
        getSignal : function () {
            return this._signal;
        },

        /**
         * Delete instance properties
         * @private
         */
        _destroy : function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
        }

    };


/*global SignalBinding:false*/

    // Signal --------------------------------------------------------
    //================================================================

    function validateListener(listener, fnName) {
        if (typeof listener !== 'function') {
            throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
        }
    }

    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @name Signal
     * @author Miller Medeiros
     * @constructor
     */
    function Signal() {
        /**
         * @type Array.<SignalBinding>
         * @private
         */
        this._bindings = [];
        this._prevParams = null;

        // enforce dispatch to aways work on same context (#47)
        var self = this;
        this.dispatch = function(){
            Signal.prototype.dispatch.apply(self, arguments);
        };
    }

    Signal.prototype = {

        /**
         * Signals Version Number
         * @type String
         * @const
         */
        VERSION : '1.0.0',

        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize : false,

        /**
         * @type boolean
         * @private
         */
        _shouldPropagate : true,

        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active : true,

        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        _registerListener : function (listener, isOnce, listenerContext, priority) {

            var prevIndex = this._indexOfListener(listener, listenerContext),
                binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
                }
            } else {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }

            if(this.memorize && this._prevParams){
                binding.execute(this._prevParams);
            }

            return binding;
        },

        /**
         * @param {SignalBinding} binding
         * @private
         */
        _addBinding : function (binding) {
            //simplified insertion sort
            var n = this._bindings.length;
            do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
            this._bindings.splice(n + 1, 0, binding);
        },

        /**
         * @param {Function} listener
         * @return {number}
         * @private
         */
        _indexOfListener : function (listener, context) {
            var n = this._bindings.length,
                cur;
            while (n--) {
                cur = this._bindings[n];
                if (cur._listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        },

        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has : function (listener, context) {
            return this._indexOfListener(listener, context) !== -1;
        },

        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add : function (listener, listenerContext, priority) {
            validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        },

        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce : function (listener, listenerContext, priority) {
            validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        },

        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove : function (listener, context) {
            validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
                this._bindings.splice(i, 1);
            }
            return listener;
        },

        /**
         * Remove all listeners from the Signal.
         */
        removeAll : function () {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        },

        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners : function () {
            return this._bindings.length;
        },

        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
        halt : function () {
            this._shouldPropagate = false;
        },

        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch : function (params) {
            if (! this.active) {
                return;
            }

            var paramsArr = Array.prototype.slice.call(arguments),
                n = this._bindings.length,
                bindings;

            if (this.memorize) {
                this._prevParams = paramsArr;
            }

            if (! n) {
                //should come after memorize
                return;
            }

            bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
            //reverse loop since listeners with higher priority will be added at the end of the list
            do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        },

        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
        forget : function(){
            this._prevParams = null;
        },

        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose : function () {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
        }

    };


    // Namespace -----------------------------------------------------
    //================================================================

    /**
     * Signals namespace
     * @namespace
     * @name signals
     */
    var signals = Signal;

    /**
     * Custom event broadcaster
     * @see Signal
     */
    // alias for backwards compatibility (see #gh-44)
    signals.Signal = Signal;



    //exports to multiple environments
    if(true){ //AMD
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return signals; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = signals;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        /*jslint sub:true */
        global['signals'] = signals;
    }

}(this));


/***/ },
/* 7 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * Pairing heap.
 *
 * The root node is the minimum element according to comparator.
 *
 * @final
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Implementation = function () {
    /**
     * @param compare Returns true iff a < b.
     */

    function Implementation(compare) {
        _classCallCheck(this, Implementation);

        this.compare = compare;
    }

    _createClass(Implementation, [{
        key: "meld",
        value: function meld(a, b) {
            if (b === null) {
                return a;
            }
            if (a === null) {
                return b;
            }
            var compare = this.compare;

            if (compare(b, a)) {
                var temp = a;
                a = b;
                b = temp;
            }
            var aChild = a.child0;
            b.next0 = aChild;
            b.prev0 = a;
            if (aChild !== null) {
                aChild.prev0 = b;
            }
            a.child0 = b;
            return a;
        }
    }, {
        key: "combineChildren",
        value: function combineChildren(node) {
            var cur = node.child0;
            if (cur === null) {
                return null;
            }
            // While in this function, we will use the nextProperty to create a
            // singly-linked list of pairwise-merged nodes that still need to be
            // merged together.
            var head = null;
            while (true) {
                var curNext = cur.next0;
                var next = void 0,
                    m = void 0;
                if (curNext === null) {
                    next = null;
                    m = cur;
                } else {
                    next = curNext.next0;
                    m = this.meld(cur, curNext);
                }
                m.next0 = head;
                head = m;
                if (next === null) {
                    break;
                }
                cur = next;
            }
            var root = head;
            head = head.next0;
            while (true) {
                if (head === null) {
                    break;
                }
                var _next = head.next0;
                root = this.meld(root, head);
                head = _next;
            }
            root.prev0 = null;
            root.next0 = null;
            return root;
        }
    }, {
        key: "removeMin",
        value: function removeMin(root) {
            var newRoot = this.combineChildren(root);
            root.next0 = null;
            root.prev0 = null;
            root.child0 = null;
            return newRoot;
        }
    }, {
        key: "remove",
        value: function remove(root, node) {
            if (root === node) {
                return this.removeMin(root);
            }
            var prev = node.prev0;
            var next = node.next0;
            if (prev.child0 === node) {
                prev.child0 = next;
            } else {
                prev.next0 = next;
            }
            if (next !== null) {
                next.prev0 = prev;
            }
            root = this.meld(root, this.combineChildren(node));
            node.next0 = null;
            node.prev0 = null;
            node.child0 = null;
            return root;
        }
        /**
         * Returns a new iterator over the entries in the heap.
         */

    }, {
        key: "entries",
        value: function* entries(root) {
            if (root !== null) {
                var child = root.child0;
                yield root;
                while (child !== null) {
                    var next = child.next0;
                    yield* this.entries(child);
                    child = next;
                }
            }
        }
        /**
         * Returns a new iterator over the entries in the heap.  The entries
         * will be removed as they are iterated.
         */

    }, {
        key: "removedEntries",
        value: function* removedEntries(root) {
            if (root !== null) {
                var child = root.child0;
                root.child0 = null;
                root.next0 = null;
                root.prev0 = null;
                yield root;
                while (child !== null) {
                    var next = child.next0;
                    child.child0 = null;
                    child.next0 = null;
                    child.prev0 = null;
                    yield* this.entries(child);
                    child = next;
                }
            }
        }
    }]);

    return Implementation;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Implementation;
;

/***/ },
/* 8 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * Pairing heap.
 *
 * The root node is the minimum element according to comparator.
 *
 * @final
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Implementation = function () {
    /**
     * @param compare Returns true iff a < b.
     */

    function Implementation(compare) {
        _classCallCheck(this, Implementation);

        this.compare = compare;
    }

    _createClass(Implementation, [{
        key: "meld",
        value: function meld(a, b) {
            if (b === null) {
                return a;
            }
            if (a === null) {
                return b;
            }
            var compare = this.compare;

            if (compare(b, a)) {
                var temp = a;
                a = b;
                b = temp;
            }
            var aChild = a.child1;
            b.next1 = aChild;
            b.prev1 = a;
            if (aChild !== null) {
                aChild.prev1 = b;
            }
            a.child1 = b;
            return a;
        }
    }, {
        key: "combineChildren",
        value: function combineChildren(node) {
            var cur = node.child1;
            if (cur === null) {
                return null;
            }
            // While in this function, we will use the nextProperty to create a
            // singly-linked list of pairwise-merged nodes that still need to be
            // merged together.
            var head = null;
            while (true) {
                var curNext = cur.next1;
                var next = void 0,
                    m = void 0;
                if (curNext === null) {
                    next = null;
                    m = cur;
                } else {
                    next = curNext.next1;
                    m = this.meld(cur, curNext);
                }
                m.next1 = head;
                head = m;
                if (next === null) {
                    break;
                }
                cur = next;
            }
            var root = head;
            head = head.next1;
            while (true) {
                if (head === null) {
                    break;
                }
                var _next = head.next1;
                root = this.meld(root, head);
                head = _next;
            }
            root.prev1 = null;
            root.next1 = null;
            return root;
        }
    }, {
        key: "removeMin",
        value: function removeMin(root) {
            var newRoot = this.combineChildren(root);
            root.next1 = null;
            root.prev1 = null;
            root.child1 = null;
            return newRoot;
        }
    }, {
        key: "remove",
        value: function remove(root, node) {
            if (root === node) {
                return this.removeMin(root);
            }
            var prev = node.prev1;
            var next = node.next1;
            if (prev.child1 === node) {
                prev.child1 = next;
            } else {
                prev.next1 = next;
            }
            if (next !== null) {
                next.prev1 = prev;
            }
            root = this.meld(root, this.combineChildren(node));
            node.next1 = null;
            node.prev1 = null;
            node.child1 = null;
            return root;
        }
        /**
         * Returns a new iterator over the entries in the heap.
         */

    }, {
        key: "entries",
        value: function* entries(root) {
            if (root !== null) {
                var child = root.child1;
                yield root;
                while (child !== null) {
                    var next = child.next1;
                    yield* this.entries(child);
                    child = next;
                }
            }
        }
        /**
         * Returns a new iterator over the entries in the heap.  The entries
         * will be removed as they are iterated.
         */

    }, {
        key: "removedEntries",
        value: function* removedEntries(root) {
            if (root !== null) {
                var child = root.child1;
                root.child1 = null;
                root.next1 = null;
                root.prev1 = null;
                yield root;
                while (child !== null) {
                    var next = child.next1;
                    child.child1 = null;
                    child.next1 = null;
                    child.prev1 = null;
                    yield* this.entries(child);
                    child = next;
                }
            }
        }
    }]);

    return Implementation;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Implementation;
;

/***/ },
/* 9 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var default_1 = function () {
    function default_1() {
        _classCallCheck(this, default_1);
    }

    _createClass(default_1, null, [{
        key: "insertAfter",
        value: function insertAfter(head, x) {
            var next = head.next0;
            x.next0 = next;
            x.prev0 = head;
            head.next0 = x;
            next.prev0 = x;
        }
    }, {
        key: "insertBefore",
        value: function insertBefore(head, x) {
            var prev = head.prev0;
            x.prev0 = prev;
            x.next0 = head;
            head.prev0 = x;
            prev.next0 = x;
        }
    }, {
        key: "front",
        value: function front(head) {
            var next = head.next0;
            if (next === head) {
                return null;
            }
            return next;
        }
    }, {
        key: "back",
        value: function back(head) {
            var next = head.prev0;
            if (next === head) {
                return null;
            }
            return next;
        }
    }, {
        key: "pop",
        value: function pop(x) {
            var next = x.next0;
            var prev = x.prev0;
            next.prev0 = prev;
            prev.next0 = next;
            x.next0 = null;
            x.prev0 = null;
            return x;
        }
    }, {
        key: "iterator",
        value: function* iterator(head) {
            for (var x = head.next0; x !== head; x = x.next0) {
                yield x;
            }
        }
    }, {
        key: "reverseIterator",
        value: function* reverseIterator(head) {
            for (var x = head.prev0; x !== head; x = x.prev0) {
                yield x;
            }
        }
    }, {
        key: "initializeHead",
        value: function initializeHead(head) {
            head.next0 = head.prev0 = head;
        }
    }]);

    return default_1;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;

/***/ },
/* 10 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var default_1 = function () {
    function default_1() {
        _classCallCheck(this, default_1);
    }

    _createClass(default_1, null, [{
        key: "insertAfter",
        value: function insertAfter(head, x) {
            var next = head.next1;
            x.next1 = next;
            x.prev1 = head;
            head.next1 = x;
            next.prev1 = x;
        }
    }, {
        key: "insertBefore",
        value: function insertBefore(head, x) {
            var prev = head.prev1;
            x.prev1 = prev;
            x.next1 = head;
            head.prev1 = x;
            prev.next1 = x;
        }
    }, {
        key: "front",
        value: function front(head) {
            var next = head.next1;
            if (next === head) {
                return null;
            }
            return next;
        }
    }, {
        key: "back",
        value: function back(head) {
            var next = head.prev1;
            if (next === head) {
                return null;
            }
            return next;
        }
    }, {
        key: "pop",
        value: function pop(x) {
            var next = x.next1;
            var prev = x.prev1;
            next.prev1 = prev;
            prev.next1 = next;
            x.next1 = null;
            x.prev1 = null;
            return x;
        }
    }, {
        key: "iterator",
        value: function* iterator(head) {
            for (var x = head.next1; x !== head; x = x.next1) {
                yield x;
            }
        }
    }, {
        key: "reverseIterator",
        value: function* reverseIterator(head) {
            for (var x = head.prev1; x !== head; x = x.prev1) {
                yield x;
            }
        }
    }, {
        key: "initializeHead",
        value: function initializeHead(head) {
            head.next1 = head.prev1 = head;
        }
    }]);

    return default_1;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var base_1 = __webpack_require__(12);
var worker_rpc_1 = __webpack_require__(2);
var backend_1 = __webpack_require__(4);
var geom_1 = __webpack_require__(14);
var base_2 = __webpack_require__(5);
var signals_1 = __webpack_require__(6);
var SCALE_PRIORITY_MULTIPLIER = 1e5;
// Temporary values used by SliceView.updateVisibleChunk and VolumeChunkSource.computeChunkPosition.
var tempChunkPosition = geom_1.vec3.create();
var tempChunkDataSize = geom_1.vec3.create();

var SliceView = function (_base_1$SliceViewBase) {
    _inherits(SliceView, _base_1$SliceViewBase);

    function SliceView(rpc, options) {
        _classCallCheck(this, SliceView);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SliceView).call(this));

        _this.initializeSharedObject(rpc, options['id']);
        _this.chunkManager = _this.registerDisposer(rpc.get(options['chunkManager']).addRef());
        _this.registerSignalBinding(_this.chunkManager.recomputeChunkPriorities.add(_this.updateVisibleChunks, _this));
        return _this;
    }

    _createClass(SliceView, [{
        key: 'onViewportChanged',
        value: function onViewportChanged() {
            this.chunkManager.scheduleUpdateChunkPriorities();
        }
    }, {
        key: 'handleLayerChanged',
        value: function handleLayerChanged() {
            if (this.hasValidViewport) {
                this.chunkManager.scheduleUpdateChunkPriorities();
            }
        }
    }, {
        key: 'updateVisibleChunks',
        value: function updateVisibleChunks() {
            var center = this.centerDataPosition;
            var chunkManager = this.chunkManager;
            var getLayoutObject = chunkLayout => {
                return this.visibleChunkLayouts.get(chunkLayout);
            };
            function addChunk(chunkLayout, sources, positionInChunks, visibleSources) {
                geom_1.vec3.multiply(tempChunkPosition, positionInChunks, chunkLayout.size);
                geom_1.vec3.add(tempChunkPosition, tempChunkPosition, chunkLayout.offset);
                var priority = -geom_1.vec3.distance(center, tempChunkPosition);
                for (var source of visibleSources) {
                    var priorityIndex = sources.get(source);
                    var chunk = source.getChunk(positionInChunks);
                    chunkManager.requestChunk(chunk, base_2.ChunkPriorityTier.VISIBLE, priority - SCALE_PRIORITY_MULTIPLIER * priorityIndex);
                }
            }
            this.computeVisibleChunks(getLayoutObject, addChunk);
        }
    }, {
        key: 'removeVisibleLayer',
        value: function removeVisibleLayer(layer) {
            this.visibleLayers.delete(layer);
            layer.layerChanged.remove(this.handleLayerChanged, this);
            this.visibleSourcesStale = true;
            if (this.hasValidViewport) {
                this.chunkManager.scheduleUpdateChunkPriorities();
            }
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            for (var layer of this.visibleLayers.keys()) {
                this.removeVisibleLayer(layer);
            }
        }
    }]);

    return SliceView;
}(base_1.SliceViewBase);

exports.SliceView = SliceView;
;
worker_rpc_1.registerSharedObject('SliceView', SliceView);
worker_rpc_1.registerRPC('SliceView.updateView', function (x) {
    var obj = this.get(x.id);
    if (x.width) {
        obj.setViewportSize(x.width, x.height);
    }
    if (x.viewportToData) {
        obj.setViewportToDataMatrix(x.viewportToData);
    }
});
worker_rpc_1.registerRPC('SliceView.addVisibleLayer', function (x) {
    var obj = this.get(x['id']);
    var layer = this.get(x['layerId']);
    obj.visibleLayers.set(layer, []);
    layer.layerChanged.add(obj.handleLayerChanged, obj);
    obj.visibleSourcesStale = true;
    if (obj.hasValidViewport) {
        obj.chunkManager.scheduleUpdateChunkPriorities();
    }
});
worker_rpc_1.registerRPC('SliceView.removeVisibleLayer', function (x) {
    var obj = this.get(x['id']);
    var layer = this.get(x['layerId']);
    obj.removeVisibleLayer(layer);
});

var VolumeChunk = function (_backend_1$Chunk) {
    _inherits(VolumeChunk, _backend_1$Chunk);

    function VolumeChunk() {
        _classCallCheck(this, VolumeChunk);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunk).call(this));

        _this2.source = null;
        _this2.chunkGridPosition = geom_1.vec3.create();
        return _this2;
    }

    _createClass(VolumeChunk, [{
        key: 'initializeVolumeChunk',
        value: function initializeVolumeChunk(key, chunkGridPosition) {
            _get(Object.getPrototypeOf(VolumeChunk.prototype), 'initialize', this).call(this, key);
            var source = this.source;
            /**
             * Grid position within chunk layout (coordinates are in units of chunks).
             */
            geom_1.vec3.copy(this.chunkGridPosition, chunkGridPosition);
            this.systemMemoryBytes = source.spec.chunkBytes;
            this.gpuMemoryBytes = source.spec.chunkBytes;
            this.chunkDataSize = null;
            this.data = null;
        }
    }, {
        key: 'serialize',
        value: function serialize(msg, transfers) {
            _get(Object.getPrototypeOf(VolumeChunk.prototype), 'serialize', this).call(this, msg, transfers);
            var data = msg['data'] = this.data;
            var chunkDataSize = this.chunkDataSize;
            if (chunkDataSize !== this.source.spec.chunkDataSize) {
                msg['chunkDataSize'] = chunkDataSize;
            }
            msg['chunkGridPosition'] = this.chunkGridPosition;
            transfers.push(data.buffer);
            this.data = null;
            // console.log(`Serializing chunk ${this.source.rpcId}:${this.key} with
            // chunkDataSize = ${this.chunkDataSize}`);
        }
    }, {
        key: 'downloadSucceeded',
        value: function downloadSucceeded() {
            this.systemMemoryBytes = this.gpuMemoryBytes = this.data.byteLength;
            _get(Object.getPrototypeOf(VolumeChunk.prototype), 'downloadSucceeded', this).call(this);
        }
    }, {
        key: 'freeSystemMemory',
        value: function freeSystemMemory() {
            this.data = null;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.source.toString() + ':' + geom_1.vec3Key(this.chunkGridPosition);
        }
    }]);

    return VolumeChunk;
}(backend_1.Chunk);

exports.VolumeChunk = VolumeChunk;
;

var VolumeChunkSource = function (_backend_1$ChunkSourc) {
    _inherits(VolumeChunkSource, _backend_1$ChunkSourc);

    function VolumeChunkSource(rpc, options) {
        _classCallCheck(this, VolumeChunkSource);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunkSource).call(this, rpc, options));

        _this3.baseVoxelOffset = geom_1.vec3.create();
        var spec = _this3.spec = base_1.VolumeChunkSpecification.fromObject(options['spec']);
        var baseVoxelOffset = _this3.baseVoxelOffset;

        var chunkOffset = spec.chunkLayout.offset;
        var voxelSize = spec.voxelSize;

        for (var i = 0; i < 3; ++i) {
            baseVoxelOffset[i] = Math.round(chunkOffset[i] / voxelSize[i]);
        }
        return _this3;
    }

    _createClass(VolumeChunkSource, [{
        key: 'getChunk',
        value: function getChunk(chunkGridPosition) {
            var key = geom_1.vec3Key(chunkGridPosition);
            var chunk = this.chunks.get(key);
            if (chunk === undefined) {
                chunk = this.getNewChunk_(VolumeChunk);
                chunk.initializeVolumeChunk(key, chunkGridPosition);
                this.addChunk(chunk);
            }
            return chunk;
        }
        /**
         * Helper function for computing the voxel bounds of a chunk based on its chunkGridPosition.
         *
         * This assumes that the grid of chunk positions starts at this.baseVoxelOffset.  Chunks are
         * clipped to lie within upperVoxelBound, but are not clipped to lie within lowerVoxelBound.  (The
         * frontend code currently cannot handle chunks clipped at their lower corner, and the chunk
         * layout can generally be chosen so that lowerVoxelBound lies on a chunk boundary.)
         *
         * This sets chunk.chunkDataSize to a copy of the returned chunkDataSize if it differs from
         * this.spec.chunkDataSize; otherwise, it is set to this.spec.chunkDataSize.
         *
         * @returns A globally-allocated Vec3 containing the chunk corner position in voxel coordinates.
         * The returned Vec3 will be invalidated by any subsequent call to this method, even on a
         * different VolumeChunkSource instance.
         */

    }, {
        key: 'computeChunkBounds',
        value: function computeChunkBounds(chunk) {
            var spec = this.spec;
            var upperVoxelBound = spec.upperVoxelBound;

            var origChunkDataSize = spec.chunkDataSize;
            var newChunkDataSize = tempChunkDataSize;
            // Chunk start position in voxel coordinates.
            var chunkPosition = geom_1.vec3.multiply(tempChunkPosition, chunk.chunkGridPosition, origChunkDataSize);
            geom_1.vec3.add(chunkPosition, chunkPosition, this.baseVoxelOffset);
            // Specifies whether the chunk only partially fits within the data bounds.
            var partial = false;
            for (var i = 0; i < 3; ++i) {
                var upper = Math.min(upperVoxelBound[i], chunkPosition[i] + origChunkDataSize[i]);
                var size = newChunkDataSize[i] = upper - chunkPosition[i];
                if (size !== origChunkDataSize[i]) {
                    partial = true;
                }
            }
            if (partial) {
                chunk.chunkDataSize = geom_1.vec3.clone(newChunkDataSize);
            } else {
                chunk.chunkDataSize = origChunkDataSize;
            }
            return chunkPosition;
        }
    }]);

    return VolumeChunkSource;
}(backend_1.ChunkSource);

exports.VolumeChunkSource = VolumeChunkSource;
;

var RenderLayer = function (_worker_rpc_1$SharedO) {
    _inherits(RenderLayer, _worker_rpc_1$SharedO);

    function RenderLayer(rpc, options) {
        _classCallCheck(this, RenderLayer);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(RenderLayer).call(this, rpc, options));

        _this4.layerChanged = new signals_1.Signal();
        _this4.equivalences = options['equivalences'];
        var sources = _this4.sources = new Array();
        for (var alternativeIds of options['sources']) {
            var alternatives = new Array();
            sources.push(alternatives);
            for (var sourceId of alternativeIds) {
                var source = rpc.get(sourceId);
                _this4.registerDisposer(source.addRef());
                alternatives.push(source);
            }
        }
        return _this4;
    }

    return RenderLayer;
}(worker_rpc_1.SharedObjectCounterpart);

exports.RenderLayer = RenderLayer;
;
worker_rpc_1.registerSharedObject('sliceview/RenderLayer', RenderLayer);
worker_rpc_1.registerRPC('sliceview/RenderLayer:updateEquivalences', function (x) {
    var obj = this.get(x['id']);
    var newValue = x['equivalences'];
    if (newValue !== obj.equivalences) {
        obj.equivalences = x['equivalences'];
        obj.layerChanged.dispatch();
    }
});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chunk_layout_1 = __webpack_require__(13);
var geom_1 = __webpack_require__(14);
var compare_1 = __webpack_require__(25);
var array_1 = __webpack_require__(26);
var worker_rpc_1 = __webpack_require__(2);
var geom_2 = __webpack_require__(14);
var DEBUG_CHUNK_INTERSECTIONS = false;
/**
 * Heuristic estimate of the slice area contained within a chunk of the
 * specified size.
 */
function estimateSliceAreaPerChunk(xAxis, yAxis, chunkSize) {
    var w = 0;
    var h = w;
    for (var i = 0; i < 3; ++i) {
        var chunkSizeValue = chunkSize[i];
        w = Math.max(w, chunkSizeValue * Math.abs(xAxis[i]));
        h = Math.max(h, chunkSizeValue * Math.abs(yAxis[i]));
    }
    return w * h;
}
/**
 * All valid chunks are in the range [lowerBound, upperBound).
 *
 * @param lowerBound Output parameter for lowerBound.
 * @param upperBound Output parameter for upperBound.
 * @param sources Sources for which to compute the chunk bounds.
 */
function computeSourcesChunkBounds(lowerBound, upperBound, sources) {
    for (var i = 0; i < 3; ++i) {
        lowerBound[i] = Number.POSITIVE_INFINITY;
        upperBound[i] = Number.NEGATIVE_INFINITY;
    }
    for (var source of sources) {
        var spec = source.spec;
        var lowerChunkBound = spec.lowerChunkBound;
        var upperChunkBound = spec.upperChunkBound;

        for (var _i = 0; _i < 3; ++_i) {
            lowerBound[_i] = Math.min(lowerBound[_i], lowerChunkBound[_i]);
            upperBound[_i] = Math.max(upperBound[_i], upperChunkBound[_i]);
        }
    }
}
var BoundsComparisonResult;
(function (BoundsComparisonResult) {
    // Needle is fully outside haystack.
    BoundsComparisonResult[BoundsComparisonResult["FULLY_OUTSIDE"] = 0] = "FULLY_OUTSIDE";
    // Needle is fully inside haystack.
    BoundsComparisonResult[BoundsComparisonResult["FULLY_INSIDE"] = 1] = "FULLY_INSIDE";
    // Needle is partially inside haystack.
    BoundsComparisonResult[BoundsComparisonResult["PARTIALLY_INSIDE"] = 2] = "PARTIALLY_INSIDE";
})(BoundsComparisonResult || (BoundsComparisonResult = {}));
function compareBoundsSingleDimension(needleLower, needleUpper, haystackLower, haystackUpper) {
    if (needleLower >= haystackUpper || needleUpper <= haystackLower) {
        return BoundsComparisonResult.FULLY_OUTSIDE;
    }
    if (needleLower >= haystackLower && needleUpper <= haystackUpper) {
        return BoundsComparisonResult.FULLY_INSIDE;
    }
    return BoundsComparisonResult.PARTIALLY_INSIDE;
}
function compareBounds(needleLowerBound, needleUpperBound, haystackLowerBound, haystackUpperBound) {
    var curResult = BoundsComparisonResult.FULLY_INSIDE;
    for (var i = 0; i < 3; ++i) {
        var newResult = compareBoundsSingleDimension(needleLowerBound[i], needleUpperBound[i], haystackLowerBound[i], haystackUpperBound[i]);
        switch (newResult) {
            case BoundsComparisonResult.FULLY_OUTSIDE:
                return newResult;
            case BoundsComparisonResult.PARTIALLY_INSIDE:
                curResult = newResult;
                break;
        }
    }
    return curResult;
}
;
function pickBestAlternativeSource(xAxis, yAxis, alternatives) {
    var numAlternatives = alternatives.length;
    var bestAlternativeIndex = 0;
    if (numAlternatives > 1) {
        var bestSliceArea = 0;
        for (var alternativeIndex = 0; alternativeIndex < numAlternatives; ++alternativeIndex) {
            var alternative = alternatives[alternativeIndex];
            var sliceArea = estimateSliceAreaPerChunk(xAxis, yAxis, alternative.spec.chunkLayout.size);
            // console.log(`scaleIndex = ${scaleIndex}, xAxis = ${xAxis}, yAxis
            // = ${yAxis}, chunksize = ${alternative.spec.chunkLayout.size},
            // sliceArea = ${sliceArea}`);
            if (sliceArea > bestSliceArea) {
                bestSliceArea = sliceArea;
                bestAlternativeIndex = alternativeIndex;
            }
        }
    }
    return alternatives[bestAlternativeIndex];
}

var SliceViewBase = function (_worker_rpc_1$SharedO) {
    _inherits(SliceViewBase, _worker_rpc_1$SharedO);

    function SliceViewBase() {
        _classCallCheck(this, SliceViewBase);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SliceViewBase).call(this));

        _this.width = null;
        _this.height = null;
        _this.hasViewportToData = false;
        /**
         * Specifies whether width, height, and viewportToData are valid.
         */
        _this.hasValidViewport = false;
        // Transforms (x,y) viewport coordinates in the range:
        //
        // x=[left: -width/2, right: width/2] and
        //
        // y=[top: -height/2, bottom: height/2],
        //
        // to data coordinates.
        _this.viewportToData = geom_1.mat4.create();
        // Normalized x, y, and z viewport axes in data coordinate space.
        _this.viewportAxes = [geom_1.vec4.create(), geom_1.vec4.create(), geom_1.vec4.create()];
        // Viewport axes used for selecting visible sources.
        _this.previousViewportAxes = [geom_1.vec3.create(), geom_1.vec3.create()];
        _this.centerDataPosition = geom_1.vec3.create();
        _this.viewportPlaneDistanceToOrigin = null;
        /**
         * For each visible ChunkLayout, maps each visible VolumeChunkSource to its priority index.
         */
        _this.visibleChunkLayouts = new Map();
        _this.visibleLayers = new Map();
        _this.visibleSourcesStale = true;
        _this.pixelSize = null;
        geom_1.mat4.identity(_this.viewportToData);
        return _this;
    }
    /**
     * Called when hasValidViewport == true and the viewport width/height or data transform matrix
     * changes.
     */


    _createClass(SliceViewBase, [{
        key: 'onViewportChanged',
        value: function onViewportChanged() {}
    }, {
        key: 'maybeSetHasValidViewport',
        value: function maybeSetHasValidViewport() {
            if (!this.hasValidViewport && this.width !== null && this.height !== null && this.hasViewportToData) {
                this.hasValidViewport = true;
                this.onHasValidViewport();
            }
            if (this.hasValidViewport) {
                this.onViewportChanged();
            }
        }
    }, {
        key: 'onHasValidViewport',
        value: function onHasValidViewport() {}
    }, {
        key: 'setViewportSize',
        value: function setViewportSize(width, height) {
            if (width !== this.width || height !== this.height) {
                this.width = width;
                this.height = height;
                this.maybeSetHasValidViewport();
                return true;
            }
            return false;
        }
    }, {
        key: 'setViewportToDataMatrix',
        value: function setViewportToDataMatrix(mat) {
            if (this.hasViewportToData && geom_1.mat4.equals(this.viewportToData, mat)) {
                return false;
            }
            this.hasViewportToData = true;
            geom_1.mat4.copy(this.viewportToData, mat);
            geom_1.vec3.transformMat4(this.centerDataPosition, geom_2.kZeroVec, mat);
            var newPixelSize = void 0;
            // Swap previousViewportAxes with viewportAxes.
            var viewportAxes = this.viewportAxes;
            var previousViewportAxes = this.previousViewportAxes;
            // Compute axes.
            for (var i = 0; i < 3; ++i) {
                var a = viewportAxes[i];
                geom_1.vec4.transformMat4(a, geom_2.kAxes[i], mat);
                // a[3] is guaranteed to be 0.
                if (i === 0) {
                    newPixelSize = geom_1.vec3.length(a);
                }
                geom_1.vec4.normalize(a, a);
            }
            this.viewportAxes = viewportAxes;
            this.previousViewportAxes = previousViewportAxes;
            if (!compare_1.approxEqual(newPixelSize, this.pixelSize) || geom_1.vec3.dot(viewportAxes[0], previousViewportAxes[0]) < 0.95 || geom_1.vec3.dot(viewportAxes[1], previousViewportAxes[1]) < 0.95) {
                geom_1.vec3.copy(previousViewportAxes[0], viewportAxes[0]);
                geom_1.vec3.copy(previousViewportAxes[1], viewportAxes[1]);
                this.visibleSourcesStale = true;
                this.pixelSize = newPixelSize;
            }
            // Compute viewport plane distance to origin.
            this.viewportPlaneDistanceToOrigin = geom_1.vec3.dot(this.centerDataPosition, this.viewportAxes[2]);
            this.onViewportToDataMatrixChanged();
            this.maybeSetHasValidViewport();
            return true;
        }
    }, {
        key: 'onViewportToDataMatrixChanged',
        value: function onViewportToDataMatrixChanged() {}
        /**
         * Computes the list of sources to use for each visible layer, based on the
         * current pixelSize.
         */

    }, {
        key: 'updateVisibleSources',
        value: function updateVisibleSources() {
            if (!this.visibleSourcesStale) {
                return;
            }
            this.visibleSourcesStale = false;
            // Increase pixel size by a small margin.
            var pixelSize = this.pixelSize * 1.1;
            // console.log("pixelSize", pixelSize);
            var visibleChunkLayouts = this.visibleChunkLayouts;

            var _viewportAxes = _slicedToArray(this.viewportAxes, 2);

            var xAxis = _viewportAxes[0];
            var yAxis = _viewportAxes[1];

            var visibleLayers = this.visibleLayers;
            visibleChunkLayouts.clear();

            var _loop = function (_ref) {
                _ref2 = _slicedToArray(_ref, 2);
                var renderLayer = _ref2[0];
                var visibleSources = _ref2[1];

                visibleSources.length = 0;
                var sources = renderLayer.sources;
                var numSources = sources.length;
                var scaleIndex = void 0;
                // At the smallest scale, all alternative sources must have the same voxel size, which is
                // considered to be the base voxel size.
                var smallestVoxelSize = sources[0][0].spec.voxelSize;
                /**
                 * Determines whether we should continue to look for a finer-resolution source *after* one
                 * with the specified voxelSize.
                 */
                var canImproveOnVoxelSize = voxelSize => {
                    for (var i = 0; i < 3; ++i) {
                        var size = voxelSize[i];
                        // If size <= pixelSize, no need for improvement.
                        // If size === smallestVoxelSize, also no need for improvement.
                        if (size > pixelSize && size > smallestVoxelSize[i]) {
                            return true;
                        }
                    }
                    return false;
                };
                /**
                 * Registers a source as being visible.  This should be called with consecutively decreasing
                 * values of scaleIndex.
                 */
                var addVisibleSource = (source, scaleIndex) => {
                    // Add to end of visibleSources list.  We will reverse the list after all sources are added.
                    visibleSources[visibleSources.length++] = source;
                    var chunkLayout = source.spec.chunkLayout;
                    var existingSources = visibleChunkLayouts.get(chunkLayout);
                    if (existingSources === undefined) {
                        existingSources = new Map();
                        visibleChunkLayouts.set(chunkLayout, existingSources);
                    }
                    existingSources.set(source, numSources - scaleIndex - 1);
                };
                scaleIndex = numSources - 1;
                while (true) {
                    var source = pickBestAlternativeSource(xAxis, yAxis, sources[scaleIndex]);
                    addVisibleSource(source, scaleIndex);
                    if (scaleIndex === 0 || !canImproveOnVoxelSize(source.spec.voxelSize)) {
                        break;
                    }
                    --scaleIndex;
                }
                // Reverse visibleSources list since we added sources from coarsest to finest resolution, but
                // we want them ordered from finest to coarsest.
                visibleSources.reverse();
            };

            for (var _ref of visibleLayers) {
                var _ref2;

                _loop(_ref);
            }
        }
    }, {
        key: 'computeVisibleChunks',
        value: function computeVisibleChunks(getLayoutObject, addChunk) {
            this.updateVisibleSources();
            var center = this.centerDataPosition;
            // Lower and upper bound in global data coordinates.
            var dataLowerBound = geom_1.vec3.clone(center);
            var dataUpperBound = geom_1.vec3.clone(center);
            var corner = geom_1.vec3.create();
            for (var xScalar of [-this.width / 2, this.width / 2]) {
                for (var yScalar of [-this.height / 2, this.height / 2]) {
                    geom_1.vec3.scale(corner, geom_2.kAxes[0], xScalar);
                    geom_1.vec3.scaleAndAdd(corner, corner, geom_2.kAxes[1], yScalar);
                    geom_1.vec3.transformMat4(corner, corner, this.viewportToData);
                    geom_1.vec3.min(dataLowerBound, dataLowerBound, corner);
                    geom_1.vec3.max(dataUpperBound, dataUpperBound, corner);
                }
            }
            // console.log("data bounds", dataLowerBound, dataUpperBound);
            var lowerBound = geom_1.vec3.create();
            var upperBound = geom_1.vec3.create();
            // Vertex with maximal dot product with the positive viewport plane normal.
            // Implicitly, negativeVertex = 1 - positiveVertex.
            var positiveVertex = geom_1.vec3.create();
            var planeNormal = this.viewportAxes[2];
            for (var i = 0; i < 3; ++i) {
                if (planeNormal[i] > 0) {
                    positiveVertex[i] = 1;
                }
            }
            // Sources whose bounds partially contain the current bounding box.
            var partiallyVisibleSources = new Array();
            // Sources whose bounds fully contain the current bounding box.
            var fullyVisibleSources = new Array();
            this.visibleChunkLayouts.forEach((visibleSources, chunkLayout) => {
                var layoutObject = getLayoutObject(chunkLayout);
                var chunkSize = chunkLayout.size;
                var offset = chunkLayout.offset;
                var planeDistanceToOrigin = this.viewportPlaneDistanceToOrigin - geom_1.vec3.dot(offset, this.viewportAxes[2]);
                computeSourcesChunkBounds(lowerBound, upperBound, visibleSources.keys());
                if (DEBUG_CHUNK_INTERSECTIONS) {
                    console.log(`Initial sources chunk bounds: ${ geom_1.vec3.str(lowerBound) }, ${ geom_1.vec3.str(upperBound) }, data bounds: ${ geom_1.vec3.str(dataLowerBound) }, ${ geom_1.vec3.str(dataUpperBound) }, offset = ${ geom_1.vec3.str(offset) }, chunkSize = ${ geom_1.vec3.str(chunkSize) }`);
                }
                for (var _i2 = 0; _i2 < 3; ++_i2) {
                    lowerBound[_i2] = Math.max(lowerBound[_i2], Math.floor((dataLowerBound[_i2] - offset[_i2]) / chunkSize[_i2]));
                    //
                    upperBound[_i2] = Math.min(upperBound[_i2], Math.floor((dataUpperBound[_i2] - offset[_i2]) / chunkSize[_i2] + 1));
                }
                // console.log('chunkBounds', lowerBound, upperBound);
                // Checks whether [lowerBound, upperBound) intersects the viewport plane.
                //
                // positiveVertexDistanceToOrigin = dot(planeNormal, lowerBound +
                // positiveVertex * (upperBound - lowerBound)) - planeDistanceToOrigin;
                // negativeVertexDistanceToOrigin = dot(planeNormal, lowerBound +
                // negativeVertex * (upperBound - lowerBound)) - planeDistanceToOrigin;
                //
                // positive vertex must have positive distance, and negative vertex must
                // have negative distance.
                function intersectsPlane() {
                    var positiveVertexDistanceToOrigin = 0;
                    var negativeVertexDistanceToOrigin = 0;
                    // Check positive vertex.
                    for (var _i3 = 0; _i3 < 3; ++_i3) {
                        var chunkSizeValue = chunkSize[_i3];
                        var normalValue = planeNormal[_i3];
                        var lowerValue = lowerBound[_i3];
                        var upperValue = upperBound[_i3];
                        var diff = upperValue - lowerValue;
                        var positiveOffset = positiveVertex[_i3] * diff;
                        // console.log(
                        //     normalValue, lowerValue, upperValue, diff, positiveOffset,
                        //     positiveVertexDistanceToOrigin, negativeVertexDistanceToOrigin);
                        positiveVertexDistanceToOrigin += normalValue * chunkSizeValue * (lowerValue + positiveOffset);
                        negativeVertexDistanceToOrigin += normalValue * chunkSizeValue * (lowerValue + diff - positiveOffset);
                    }
                    // console.log("{positive,negative}VertexDistanceToOrigin: ",
                    // positiveVertexDistanceToOrigin, negativeVertexDistanceToOrigin,
                    // planeDistanceToOrigin);
                    // console.log("intersectsPlane:", negativeVertexDistanceToOrigin,
                    //             planeDistanceToOrigin, positiveVertexDistanceToOrigin);
                    if (positiveVertexDistanceToOrigin < planeDistanceToOrigin) {
                        return false;
                    }
                    return negativeVertexDistanceToOrigin <= planeDistanceToOrigin;
                }
                fullyVisibleSources.length = 0;
                partiallyVisibleSources.length = 0;
                for (var source of visibleSources.keys()) {
                    var spec = source.spec;
                    var result = compareBounds(lowerBound, upperBound, spec.lowerChunkBound, spec.upperChunkBound);
                    if (DEBUG_CHUNK_INTERSECTIONS) {
                        console.log(`Comparing source bounds lowerBound=${ geom_1.vec3.str(lowerBound) }, upperBound=${ geom_1.vec3.str(upperBound) }, lowerChunkBound=${ geom_1.vec3.str(spec.lowerChunkBound) }, upperChunkBound=${ geom_1.vec3.str(spec.upperChunkBound) }, got ${ BoundsComparisonResult[result] }`, spec, source);
                    }
                    switch (result) {
                        case BoundsComparisonResult.FULLY_INSIDE:
                            fullyVisibleSources.push(source);
                            break;
                        case BoundsComparisonResult.PARTIALLY_INSIDE:
                            partiallyVisibleSources.push(source);
                            break;
                    }
                }
                var partiallyVisibleSourcesLength = partiallyVisibleSources.length;
                // Mutates lowerBound and upperBound while running, but leaves them the
                // same once finished.
                function checkBounds(nextSplitDim) {
                    if (fullyVisibleSources.length === 0 && partiallyVisibleSourcesLength === 0) {
                        if (DEBUG_CHUNK_INTERSECTIONS) {
                            console.log('  no visible sources');
                        }
                        return;
                    }
                    if (DEBUG_CHUNK_INTERSECTIONS) {
                        console.log(`Check bounds: [ ${ geom_1.vec3.str(lowerBound) }, ${ geom_1.vec3.str(upperBound) } ]`);
                    }
                    var volume = 1;
                    for (var _i4 = 0; _i4 < 3; ++_i4) {
                        volume *= Math.max(0, upperBound[_i4] - lowerBound[_i4]);
                    }
                    if (volume === 0) {
                        if (DEBUG_CHUNK_INTERSECTIONS) {
                            console.log('  volume == 0');
                        }
                        return;
                    }
                    if (!intersectsPlane()) {
                        if (DEBUG_CHUNK_INTERSECTIONS) {
                            console.log('  doesn\\'t intersect plane');
                        }
                        return;
                    }
                    if (DEBUG_CHUNK_INTERSECTIONS) {
                        console.log('Within bounds: [' + geom_1.vec3.str(lowerBound) + ", " + geom_1.vec3.str(upperBound) + "]");
                    }
                    if (volume === 1) {
                        addChunk(chunkLayout, layoutObject, lowerBound, fullyVisibleSources);
                        return;
                    }
                    var dimLower, dimUpper, diff;
                    while (true) {
                        dimLower = lowerBound[nextSplitDim];
                        dimUpper = upperBound[nextSplitDim];
                        diff = dimUpper - dimLower;
                        if (diff === 1) {
                            nextSplitDim = (nextSplitDim + 1) % 3;
                        } else {
                            break;
                        }
                    }
                    var splitPoint = dimLower + Math.floor(0.5 * diff);
                    var newNextSplitDim = (nextSplitDim + 1) % 3;
                    var fullyVisibleSourcesLength = fullyVisibleSources.length;
                    upperBound[nextSplitDim] = splitPoint;
                    var oldPartiallyVisibleSourcesLength = partiallyVisibleSourcesLength;
                    function adjustSources() {
                        partiallyVisibleSourcesLength = array_1.partitionArray(partiallyVisibleSources, 0, oldPartiallyVisibleSourcesLength, source => {
                            var spec = source.spec;
                            var result = compareBoundsSingleDimension(lowerBound[nextSplitDim], upperBound[nextSplitDim], spec.lowerChunkBound[nextSplitDim], spec.upperChunkBound[nextSplitDim]);
                            switch (result) {
                                case BoundsComparisonResult.PARTIALLY_INSIDE:
                                    return true;
                                case BoundsComparisonResult.FULLY_INSIDE:
                                    fullyVisibleSources.push(source);
                                default:
                                    return false;
                            }
                        });
                    }
                    adjustSources();
                    checkBounds(newNextSplitDim);
                    upperBound[nextSplitDim] = dimUpper;
                    lowerBound[nextSplitDim] = splitPoint;
                    adjustSources();
                    checkBounds(newNextSplitDim);
                    lowerBound[nextSplitDim] = dimLower;
                    // Truncate list of fully visible sources.
                    fullyVisibleSources.length = fullyVisibleSourcesLength;
                    // Restore partiallyVisibleSources.
                    partiallyVisibleSourcesLength = oldPartiallyVisibleSourcesLength;
                }
                checkBounds(0);
            });
        }
    }]);

    return SliceViewBase;
}(worker_rpc_1.SharedObject);

exports.SliceViewBase = SliceViewBase;
;
/**
 * If this is updated, DATA_TYPE_BYTES must also be updated.
 */
(function (DataType) {
    DataType[DataType["UINT8"] = 0] = "UINT8";
    DataType[DataType["FLOAT32"] = 1] = "FLOAT32";
    DataType[DataType["UINT64"] = 2] = "UINT64";
    DataType[DataType["UINT32"] = 3] = "UINT32";
})(exports.DataType || (exports.DataType = {}));
var DataType = exports.DataType;
exports.DATA_TYPE_BYTES = [];
exports.DATA_TYPE_BYTES[DataType.UINT8] = 1;
exports.DATA_TYPE_BYTES[DataType.UINT32] = 4;
exports.DATA_TYPE_BYTES[DataType.FLOAT32] = 4;
exports.DATA_TYPE_BYTES[DataType.UINT64] = 8;
/**
 * Specifies the interpretation of volumetric data.
 */
(function (VolumeType) {
    VolumeType[VolumeType["UNKNOWN"] = 0] = "UNKNOWN";
    VolumeType[VolumeType["IMAGE"] = 1] = "IMAGE";
    VolumeType[VolumeType["SEGMENTATION"] = 2] = "SEGMENTATION";
})(exports.VolumeType || (exports.VolumeType = {}));
var VolumeType = exports.VolumeType;
exports.DEFAULT_CHUNK_DATA_SIZES = [geom_1.vec3.fromValues(64, 64, 64)];
/**
 * Specifies a chunk layout and voxel size.
 */

var VolumeChunkSpecification = function () {
    function VolumeChunkSpecification(chunkLayout, chunkDataSize, numChannels, dataType, lowerVoxelBound, upperVoxelBound, compressedSegmentationBlockSize) {
        _classCallCheck(this, VolumeChunkSpecification);

        this.chunkLayout = chunkLayout;
        this.chunkDataSize = chunkDataSize;
        this.numChannels = numChannels;
        this.dataType = dataType;
        this.lowerVoxelBound = lowerVoxelBound;
        this.upperVoxelBound = upperVoxelBound;
        this.compressedSegmentationBlockSize = compressedSegmentationBlockSize;
        this.chunkBytes = geom_1.prod3(chunkDataSize) * exports.DATA_TYPE_BYTES[dataType] * numChannels;
        var voxelSize = this.voxelSize = geom_1.vec3.divide(geom_1.vec3.create(), this.chunkLayout.size, this.chunkDataSize);
        var lowerChunkBound = this.lowerChunkBound = geom_1.vec3.create();
        var upperChunkBound = this.upperChunkBound = geom_1.vec3.create();
        var chunkSize = chunkLayout.size;
        var chunkOffset = chunkLayout.offset;
        for (var i = 0; i < 3; ++i) {
            lowerChunkBound[i] = Math.floor((lowerVoxelBound[i] * voxelSize[i] - chunkOffset[i]) / chunkSize[i]);
            upperChunkBound[i] = Math.floor(((upperVoxelBound[i] - 1) * voxelSize[i] - chunkOffset[i]) / chunkSize[i] + 1);
        }
        // console.log(`voxelBound = [${vec3.str(lowerVoxelBound)},${vec3.str(upperVoxelBound)}), chunkBound = [${vec3.str(lowerChunkBound)},${vec3.str(upperChunkBound)}]`);
        this.compressedSegmentationBlockSize = compressedSegmentationBlockSize;
    }

    _createClass(VolumeChunkSpecification, [{
        key: 'toObject',
        value: function toObject(msg) {
            this.chunkLayout.toObject(msg['chunkLayout'] = {});
            msg['chunkDataSize'] = this.chunkDataSize;
            msg['numChannels'] = this.numChannels;
            msg['dataType'] = this.dataType;
            msg['lowerVoxelBound'] = this.lowerVoxelBound;
            msg['upperVoxelBound'] = this.upperVoxelBound;
            msg['compressedSegmentationBlockSize'] = this.compressedSegmentationBlockSize;
        }
    }], [{
        key: 'fromObject',
        value: function fromObject(msg) {
            return new VolumeChunkSpecification(chunk_layout_1.ChunkLayout.fromObject(msg['chunkLayout']), msg['chunkDataSize'], msg['numChannels'], msg['dataType'], msg['lowerVoxelBound'], msg['upperVoxelBound'], msg['compressedSegmentationBlockSize']);
        }
    }, {
        key: 'getDefaults',
        value: function* getDefaults(options) {
            var voxelSize = options.voxelSize;
            var dataType = options.dataType;
            var lowerVoxelBound = options.lowerVoxelBound;
            var _options$chunkDataSiz = options.chunkDataSizes;
            var chunkDataSizes = _options$chunkDataSiz === undefined ? exports.DEFAULT_CHUNK_DATA_SIZES : _options$chunkDataSiz;
            var _options$numChannels = options.numChannels;
            var numChannels = _options$numChannels === undefined ? 1 : _options$numChannels;
            var compressedSegmentationBlockSize = options.compressedSegmentationBlockSize;

            var chunkOffset = geom_1.vec3.multiply(geom_1.vec3.create(), lowerVoxelBound, voxelSize);
            if (compressedSegmentationBlockSize === undefined && options.volumeType === VolumeType.SEGMENTATION && (dataType === DataType.UINT32 || dataType === DataType.UINT64)) {
                compressedSegmentationBlockSize = geom_1.vec3.fromValues(8, 8, 8);
            }
            for (var chunkDataSize of chunkDataSizes) {
                var chunkSize = geom_1.vec3.create();
                geom_1.vec3.multiply(chunkSize, voxelSize, chunkDataSize);
                var chunkLayout = chunk_layout_1.ChunkLayout.get(chunkSize, chunkOffset);
                yield new VolumeChunkSpecification(chunkLayout, chunkDataSize, numChannels, dataType, lowerVoxelBound, options.upperVoxelBound, compressedSegmentationBlockSize);
            }
        }
    }]);

    return VolumeChunkSpecification;
}();

exports.VolumeChunkSpecification = VolumeChunkSpecification;
;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var geom_1 = __webpack_require__(14);
/**
 * @param size Size of each chunk in nanometers.
 * @param offset Offset of chunk boundaries relative to
 *   (0,0,0).  It should be the case that 0 >= offset > size.
 */

var ChunkLayout = function () {
    function ChunkLayout(size, offset) {
        _classCallCheck(this, ChunkLayout);

        this.size = geom_1.vec3.clone(size);
        if (offset === undefined) {
            this.offset = geom_1.vec3.create();
        } else {
            this.offset = geom_1.vec3.clone(offset);
        }
    }

    _createClass(ChunkLayout, [{
        key: 'toObject',
        value: function toObject(msg) {
            msg['size'] = this.size;
            msg['offset'] = this.offset;
        }
    }], [{
        key: 'get',
        value: function get(size) {
            var offset = arguments.length <= 1 || arguments[1] === undefined ? geom_1.kZeroVec : arguments[1];

            var cache = ChunkLayout.cache;
            var key = `${ geom_1.vec3Key(size) }+${ geom_1.vec3Key(offset) }`;
            var obj = cache.get(key);
            if (obj === undefined) {
                obj = new ChunkLayout(size, offset);
                cache.set(key, obj);
            }
            return obj;
        }
    }, {
        key: 'fromObject',
        value: function fromObject(msg) {
            return ChunkLayout.get(msg['size'], msg['offset']);
        }
    }]);

    return ChunkLayout;
}();

ChunkLayout.cache = new Map();
exports.ChunkLayout = ChunkLayout;
;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gl_matrix_1 = __webpack_require__(15);
exports.vec2 = gl_matrix_1.vec2;
exports.vec3 = gl_matrix_1.vec3;
exports.vec4 = gl_matrix_1.vec4;
exports.mat3 = gl_matrix_1.mat3;
exports.mat4 = gl_matrix_1.mat4;
exports.quat = gl_matrix_1.quat;
var gl_matrix_2 = __webpack_require__(15);
exports.identityMat4 = gl_matrix_2.mat4.create();
gl_matrix_2.mat4.identity(exports.identityMat4);
exports.AXES_NAMES = ['x', 'y', 'z'];

var BoundingBox = function BoundingBox(lower, upper) {
    _classCallCheck(this, BoundingBox);

    this.lower = lower;
    this.upper = upper;
};

exports.BoundingBox = BoundingBox;
;
exports.kAxes = [gl_matrix_2.vec4.fromValues(1, 0, 0, 0), gl_matrix_2.vec4.fromValues(0, 1, 0, 0), gl_matrix_2.vec4.fromValues(0, 0, 1, 0)];
exports.kZeroVec = gl_matrix_2.vec3.fromValues(0, 0, 0);
function prod3(x) {
    return x[0] * x[1] * x[2];
}
exports.prod3 = prod3;
function prod4(x) {
    return x[0] * x[1] * x[2] * x[3];
}
exports.prod4 = prod4;
/**
 * Implements a one-to-one conversion from Vec3 to string, suitable for use a Map key.
 *
 * Specifically, returns the string representation of the 3 values separated by commas.
 */
function vec3Key(x) {
    return `${ x[0] },${ x[1] },${ x[2] }`;
}
exports.vec3Key = vec3Key;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.2
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
// END HEADER

exports.glMatrix = __webpack_require__(16);
exports.mat2 = __webpack_require__(17);
exports.mat2d = __webpack_require__(18);
exports.mat3 = __webpack_require__(19);
exports.mat4 = __webpack_require__(20);
exports.quat = __webpack_require__(21);
exports.vec2 = __webpack_require__(24);
exports.vec3 = __webpack_require__(22);
exports.vec4 = __webpack_require__(23);

/***/ },
/* 16 */
/***/ function(module, exports) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

// Configuration Constants
glMatrix.EPSILON = 0.000001;
glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
glMatrix.RANDOM = Math.random;
glMatrix.ENABLE_SIMD = false;

// Capability detection
glMatrix.SIMD_AVAILABLE = (glMatrix.ARRAY_TYPE === Float32Array) && ('SIMD' in this);
glMatrix.USE_SIMD = glMatrix.ENABLE_SIMD && glMatrix.SIMD_AVAILABLE;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    glMatrix.ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less 
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 * 
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
glMatrix.equals = function(a, b) {
	return Math.abs(a - b) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
}

module.exports = glMatrix;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(16);

/**
 * @class 2x2 Matrix
 * @name mat2
 */
var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
mat2.fromValues = function(m00, m01, m10, m11) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
};

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
mat2.set = function(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
};


/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.fromRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
mat2.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link mat2.subtract}
 * @function
 */
mat2.sub = mat2.subtract;

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
};

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
mat2.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
mat2.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

module.exports = mat2;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(16);

/**
 * @class 2x3 Matrix
 * @name mat2d
 * 
 * @description 
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */
var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
mat2d.fromValues = function(a, b, c, d, tx, ty) {
    var out = new glMatrix.ARRAY_TYPE(6);
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
};

/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */
mat2d.set = function(out, a, b, c, d, tx, ty) {
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;

/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */
mat2d.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
}

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */
mat2d.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) { 
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
}; 

/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    return out;
};

/**
 * Alias for {@link mat2d.subtract}
 * @function
 */
mat2d.sub = mat2d.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */
mat2d.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    return out;
};

/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */
mat2d.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2d.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2d.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)));
};

module.exports = mat2d;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(16);

/**
 * @class 3x3 Matrix
 * @name mat3
 */
var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
mat3.fromValues = function(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
mat3.set = function(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
mat3.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
mat3.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
};

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
mat3.sub = mat3.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
mat3.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
};

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
mat3.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    return out;
};

/*
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && 
           a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
           a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = a[6], b7 = b[7], b8 = b[8];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)));
};


module.exports = mat3;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(16);

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {
  scalar: {},
  SIMD: {},
};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
mat4.fromValues = function(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
mat4.set = function(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};


/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Transpose the values of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.transpose = function(out, a) {
    var a0, a1, a2, a3,
        tmp01, tmp23,
        out0, out1, out2, out3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    out0  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out1  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 0,  out0);
    SIMD.Float32x4.store(out, 4,  out1);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    out2  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out3  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 8,  out2);
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Transpse a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = glMatrix.USE_SIMD ? mat4.SIMD.transpose : mat4.scalar.transpose;

/**
 * Inverts a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Inverts a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.invert = function(out, a) {
  var row0, row1, row2, row3,
      tmp1,
      minor0, minor1, minor2, minor3,
      det,
      a0 = SIMD.Float32x4.load(a, 0),
      a1 = SIMD.Float32x4.load(a, 4),
      a2 = SIMD.Float32x4.load(a, 8),
      a3 = SIMD.Float32x4.load(a, 12);

  // Compute matrix adjugate
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

  tmp1   = SIMD.Float32x4.mul(row2, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.mul(row1, tmp1);
  minor1 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row1, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
  minor3 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
  minor2 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row0, row1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

  // Compute matrix determinant
  det   = SIMD.Float32x4.mul(row0, minor0);
  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
  tmp1  = SIMD.Float32x4.reciprocalApproximation(det);
  det   = SIMD.Float32x4.sub(
               SIMD.Float32x4.add(tmp1, tmp1),
               SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
  det   = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
  if (!det) {
      return null;
  }

  // Compute matrix inverse
  SIMD.Float32x4.store(out, 0,  SIMD.Float32x4.mul(det, minor0));
  SIMD.Float32x4.store(out, 4,  SIMD.Float32x4.mul(det, minor1));
  SIMD.Float32x4.store(out, 8,  SIMD.Float32x4.mul(det, minor2));
  SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
  return out;
}

/**
 * Inverts a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = glMatrix.USE_SIMD ? mat4.SIMD.invert : mat4.scalar.invert;

/**
 * Calculates the adjugate of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.adjoint = function(out, a) {
  var a0, a1, a2, a3;
  var row0, row1, row2, row3;
  var tmp1;
  var minor0, minor1, minor2, minor3;

  var a0 = SIMD.Float32x4.load(a, 0);
  var a1 = SIMD.Float32x4.load(a, 4);
  var a2 = SIMD.Float32x4.load(a, 8);
  var a3 = SIMD.Float32x4.load(a, 12);

  // Transpose the source matrix.  Sort of.  Not a true transpose operation
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

  tmp1   = SIMD.Float32x4.mul(row2, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.mul(row1, tmp1);
  minor1 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row1, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
  minor3 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
  minor2 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row0, row1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

  SIMD.Float32x4.store(out, 0,  minor0);
  SIMD.Float32x4.store(out, 4,  minor1);
  SIMD.Float32x4.store(out, 8,  minor2);
  SIMD.Float32x4.store(out, 12, minor3);
  return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
 mat4.adjoint = glMatrix.USE_SIMD ? mat4.SIMD.adjoint : mat4.scalar.adjoint;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's explicitly using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand, must be a Float32Array
 * @param {mat4} b the second operand, must be a Float32Array
 * @returns {mat4} out
 */
mat4.SIMD.multiply = function (out, a, b) {
    var a0 = SIMD.Float32x4.load(a, 0);
    var a1 = SIMD.Float32x4.load(a, 4);
    var a2 = SIMD.Float32x4.load(a, 8);
    var a3 = SIMD.Float32x4.load(a, 12);

    var b0 = SIMD.Float32x4.load(b, 0);
    var out0 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2),
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 0, out0);

    var b1 = SIMD.Float32x4.load(b, 4);
    var out1 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2),
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 4, out1);

    var b2 = SIMD.Float32x4.load(b, 8);
    var out2 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2),
                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 8, out2);

    var b3 = SIMD.Float32x4.load(b, 12);
    var out3 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                        SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1),
                        SIMD.Float32x4.add(
                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2),
                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Multiplies two mat4's explicitly not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.scalar.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Multiplies two mat4's using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = glMatrix.USE_SIMD ? mat4.SIMD.multiply : mat4.scalar.multiply;

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.scalar.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.SIMD.translate = function (out, a, v) {
    var a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12),
        vec = SIMD.Float32x4(v[0], v[1], v[2] , 0);

    if (a !== out) {
        out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
        out[4] = a[4]; out[5] = a[5]; out[6] = a[6]; out[7] = a[7];
        out[8] = a[8]; out[9] = a[9]; out[10] = a[10]; out[11] = a[11];
    }

    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
    SIMD.Float32x4.store(out, 12, t0);

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = glMatrix.USE_SIMD ? mat4.SIMD.translate : mat4.scalar.translate;

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scalar.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.SIMD.scale = function(out, a, v) {
    var a0, a1, a2;
    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    a0 = SIMD.Float32x4.load(a, 0);
    SIMD.Float32x4.store(
        out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

    a1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(
        out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

    a2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(
        out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 */
mat4.scale = glMatrix.USE_SIMD ? mat4.SIMD.scale : mat4.scalar.scale;

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateX = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
      out[0]  = a[0];
      out[1]  = a[1];
      out[2]  = a[2];
      out[3]  = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_1 = SIMD.Float32x4.load(a, 4);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 4,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = glMatrix.USE_SIMD ? mat4.SIMD.rotateX : mat4.scalar.rotateX;

/**
 * Rotates a matrix by the given angle around the Y axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateY = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 0,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
 mat4.rotateY = glMatrix.USE_SIMD ? mat4.SIMD.rotateY : mat4.scalar.rotateY;

/**
 * Rotates a matrix by the given angle around the Z axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateZ = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 0,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
    SIMD.Float32x4.store(out, 4,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
 mat4.rotateZ = glMatrix.USE_SIMD ? mat4.SIMD.rotateZ : mat4.scalar.rotateZ;

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.fromRotation = function(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromXRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = 1;
    out[1]  = 0;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromYRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = 0;
    out[2]  = -s;
    out[3]  = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromZRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = s;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
mat4.getTranslation = function (out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
};

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
mat4.getRotation = function (out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  var trace = mat[0] + mat[5] + mat[10];
  var S = 0;

  if (trace > 0) { 
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S; 
    out[2] = (mat[1] - mat[4]) / S; 
  } else if ((mat[0] > mat[5])&(mat[0] > mat[10])) { 
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S; 
    out[2] = (mat[8] + mat[2]) / S; 
  } else if (mat[5] > mat[10]) { 
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S; 
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S; 
  } else { 
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
  // Quaternion math
  var x = q[0], y = q[1], z = q[2], w = q[3],
      x2 = x + x,
      y2 = y + y,
      z2 = z + z,

      xx = x * x2,
      xy = x * y2,
      xz = x * z2,
      yy = y * y2,
      yz = y * z2,
      zz = z * z2,
      wx = w * x2,
      wy = w * y2,
      wz = w * z2,

      sx = s[0],
      sy = s[1],
      sz = s[2],

      ox = o[0],
      oy = o[1],
      oz = o[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;

  return out;
};

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
        Math.abs(eyey - centery) < glMatrix.EPSILON &&
        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
};

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
mat4.sub = mat4.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
mat4.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
};

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
mat4.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    out[9] = a[9] + (b[9] * scale);
    out[10] = a[10] + (b[10] * scale);
    out[11] = a[11] + (b[11] * scale);
    out[12] = a[12] + (b[12] * scale);
    out[13] = a[13] + (b[13] * scale);
    out[14] = a[14] + (b[14] * scale);
    out[15] = a[15] + (b[15] * scale);
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && 
           a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && 
           a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
           a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.equals = function (a, b) {
    var a0  = a[0],  a1  = a[1],  a2  = a[2],  a3  = a[3],
        a4  = a[4],  a5  = a[5],  a6  = a[6],  a7  = a[7], 
        a8  = a[8],  a9  = a[9],  a10 = a[10], a11 = a[11], 
        a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

    var b0  = b[0],  b1  = b[1],  b2  = b[2],  b3  = b[3],
        b4  = b[4],  b5  = b[5],  b6  = b[6],  b7  = b[7], 
        b8  = b[8],  b9  = b[9],  b10 = b[10], b11 = b[11], 
        b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
            Math.abs(a9 - b9) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
            Math.abs(a10 - b10) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
            Math.abs(a12 - b12) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
            Math.abs(a13 - b13) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
            Math.abs(a14 - b14) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
            Math.abs(a15 - b15) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a15), Math.abs(b15)));
};



module.exports = mat4;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(16);
var mat3 = __webpack_require__(19);
var vec3 = __webpack_require__(22);
var vec4 = __webpack_require__(23);

/**
 * @class Quaternion
 * @name quat
 */
var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */
quat.getAxisAngle = function(out_axis, q) {
    var rad = Math.acos(q[3]) * 2.0;
    var s = Math.sin(rad / 2.0);
    if (s != 0.0) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
    } else {
        // If s is zero, return any axis (no rotation - axis does not matter)
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
    }
    return rad;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5; 

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {        
        // "from" and "to" quaternions are very close 
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    
    return out;
};

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
quat.sqlerp = (function () {
  var temp1 = quat.create();
  var temp2 = quat.create();
  
  return function (out, a, b, c, d, t) {
    quat.slerp(temp1, a, d, t);
    quat.slerp(temp2, b, c, t);
    quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
    
    return out;
  };
}());

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;
    
    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[5]-m[7])*fRoot;
        out[1] = (m[6]-m[2])*fRoot;
        out[2] = (m[1]-m[3])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;
        
        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }
    
    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.exactEquals = vec4.exactEquals;

/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
quat.equals = vec4.equals;

module.exports = quat;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(16);

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
vec3.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
};

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
vec3.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
};

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
vec3.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.hermite = function (out, a, b, c, d, t) {
  var factorTimes2 = t * t,
      factor1 = factorTimes2 * (2 * t - 3) + 1,
      factor2 = factorTimes2 * (t - 2) + t,
      factor3 = factorTimes2 * (t - 1),
      factor4 = factorTimes2 * (3 - 2 * t);
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.bezier = function (out, a, b, c, d, t) {
  var inverseFactor = 1 - t,
      inverseFactorTimesTwo = inverseFactor * inverseFactor,
      factorTimes2 = t * t,
      factor1 = inverseFactorTimesTwo * inverseFactor,
      factor2 = 3 * t * inverseFactorTimesTwo,
      factor3 = 3 * factorTimes2 * inverseFactor,
      factor4 = factorTimes2 * t;
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function(a, b) {
   
    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);
 
    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);
 
    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }     
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
};

module.exports = vec3;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(16);

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */
var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */
vec4.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
};

/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */
vec4.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
};

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */
vec4.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = x * len;
        out[1] = y * len;
        out[2] = z * len;
        out[3] = w * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = glMatrix.RANDOM();
    out[1] = glMatrix.RANDOM();
    out[2] = glMatrix.RANDOM();
    out[3] = glMatrix.RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec4.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
};

module.exports = vec4;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(16);

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
vec2.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
vec2.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
vec2.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.equals = function (a, b) {
    var a0 = a[0], a1 = a[1];
    var b0 = b[0], b1 = b[1];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)));
};

module.exports = vec2;


/***/ },
/* 25 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

function approxEqual(a, b) {
    if (a === b) {
        return true;
    }
    return Math.abs(a - b) / Math.min(Math.abs(a), Math.abs(b)) < 1e-6;
}
exports.approxEqual = approxEqual;

/***/ },
/* 26 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * Partitions array[start:end] such that all elements for which predicate
 * returns true are before the elements for which predicate returns false.
 *
 * predicate will be called exactly once for each element in array[start:end],
 * in order.
 *
 * @returns {number} The index of the first element for which predicate returns
 * false, or end if there is no such element.
 */

function partitionArray(array, start, end, predicate) {
    for (; start < end;) {
        var x = array[start];
        if (predicate(x)) {
            ++start;
            continue;
        }
        --end;
        array[start] = array[end];
        array[end] = x;
    }
    return end;
}
exports.partitionArray = partitionArray;
/**
 * Returns an array of size newSize that starts with the contents of array.
 * Either returns array if it has the correct size, or a new array with zero
 * padding at the end.
 */
function maybePadArray(array, newSize) {
    if (array.length === newSize) {
        return array;
    }
    var newArray = new array.constructor(newSize);
    newArray.set(array);
    return newArray;
}
exports.maybePadArray = maybePadArray;
function getFortranOrderStrides(size) {
    var baseStride = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

    var length = size.length;
    var strides = new Array(length);
    var stride = strides[0] = baseStride;
    for (var i = 1; i < length; ++i) {
        stride *= size[i - 1];
        strides[i] = stride;
    }
    return strides;
}
exports.getFortranOrderStrides = getFortranOrderStrides;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(28);
var backend_1 = __webpack_require__(4);
var base_1 = __webpack_require__(30);
var api_1 = __webpack_require__(31);
var backend_2 = __webpack_require__(11);
var compressed_segmentation_1 = __webpack_require__(35);
var geom_1 = __webpack_require__(14);
var jpeg_1 = __webpack_require__(36);
var raw_1 = __webpack_require__(44);
var worker_rpc_1 = __webpack_require__(2);
var CHUNK_DECODERS = new Map();
CHUNK_DECODERS.set(base_1.VolumeChunkEncoding.RAW, raw_1.decodeRawChunk);
CHUNK_DECODERS.set(base_1.VolumeChunkEncoding.JPEG, jpeg_1.decodeJpegChunk);
CHUNK_DECODERS.set(base_1.VolumeChunkEncoding.COMPRESSED_SEGMENTATION, compressed_segmentation_1.decodeCompressedSegmentationChunk);
var ENCOODING_NAMES = new Map();
ENCOODING_NAMES.set(base_1.VolumeChunkEncoding.RAW, 'subvolumeFormat=raw');
ENCOODING_NAMES.set(base_1.VolumeChunkEncoding.JPEG, 'subvolumeFormat=single_image/imageFormat=jpeg');

var VolumeChunkSource = function (_backend_2$VolumeChun) {
    _inherits(VolumeChunkSource, _backend_2$VolumeChun);

    function VolumeChunkSource(rpc, options) {
        _classCallCheck(this, VolumeChunkSource);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunkSource).call(this, rpc, options));

        _this.instance = options['instance'];
        _this.key = options['key'];
        _this.scaleIndex = options['scaleIndex'];
        _this.encoding = options['encoding'];
        _this.chunkDecoder = CHUNK_DECODERS.get(_this.encoding);
        _this.encodingParams = ENCOODING_NAMES.get(_this.encoding);
        return _this;
    }

    _createClass(VolumeChunkSource, [{
        key: 'download',
        value: function download(chunk) {
            var path = void 0;
            {
                // chunkPosition must not be captured, since it will be invalidated by the next call to
                // computeChunkBounds.
                var chunkPosition = this.computeChunkBounds(chunk);
                var chunkDataSize = chunk.chunkDataSize;

                path = `/v1beta2/volumes/${ this.key }/binary/subvolume/corner=${ geom_1.vec3Key(chunkPosition) }/size=${ geom_1.vec3Key(chunkDataSize) }/scale=${ this.scaleIndex }/changeStackId=/${ this.encodingParams }?alt=media`;
            }
            backend_1.handleChunkDownloadPromise(chunk, api_1.makeRequest(this.instance, 'GET', path, 'arraybuffer'), this.chunkDecoder);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return `brainmaps-${ api_1.INSTANCE_IDENTIFIERS[this.instance] }:volume:${ this.key }`;
        }
    }]);

    return VolumeChunkSource;
}(backend_2.VolumeChunkSource);

;
worker_rpc_1.registerSharedObject('brainmaps/VolumeChunkSource', VolumeChunkSource);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * @file
 * This implements the authentication API by simply forwarding all requests to the frontend.
 */

var worker_rpc_1 = __webpack_require__(2);
var api_implementation_1 = __webpack_require__(29);
var worker_rpc_context_1 = __webpack_require__(1);
var resolvePromise = null;
api_implementation_1.implementation.getNewTokenPromise = function (invalidToken) {
    var msg = {};
    if (invalidToken != null) {
        msg['invalidToken'] = invalidToken;
    }
    var promise = new Promise(function (resolve, reject) {
        resolvePromise = resolve;
    });
    worker_rpc_context_1.rpc.invoke('brainmaps.requestToken', msg);
    return promise;
};
worker_rpc_1.registerRPC('brainmaps.receiveToken', function (x) {
    var token = api_implementation_1.implementation.token = x['authResult'];
    resolvePromise(token);
});

/***/ },
/* 29 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Implementation = function Implementation() {
    _classCallCheck(this, Implementation);

    this.promise = null;
    this.token = null;
};

exports.Implementation = Implementation;
exports.implementation = new Implementation();
function getToken(invalidToken) {
    var _exports$implementati = exports.implementation;
    var promise = _exports$implementati.promise;
    var token = _exports$implementati.token;

    if (promise !== null && (token === null || invalidToken == null || invalidToken['generationId'] !== token['generationId'])) {
        // Either we already have a valid token, or we are already obtaining one.
        return promise;
    }
    exports.implementation.token = null;
    promise = exports.implementation.promise = exports.implementation.getNewTokenPromise(invalidToken);
    return promise;
}
exports.getToken = getToken;

/***/ },
/* 30 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

(function (VolumeChunkEncoding) {
  VolumeChunkEncoding[VolumeChunkEncoding["RAW"] = 0] = "RAW";
  VolumeChunkEncoding[VolumeChunkEncoding["JPEG"] = 1] = "JPEG";
  VolumeChunkEncoding[VolumeChunkEncoding["COMPRESSED_SEGMENTATION"] = 2] = "COMPRESSED_SEGMENTATION";
})(exports.VolumeChunkEncoding || (exports.VolumeChunkEncoding = {}));
var VolumeChunkEncoding = exports.VolumeChunkEncoding;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var api_implementation_1 = __webpack_require__(29);
var http_request_1 = __webpack_require__(32);
var promise_1 = __webpack_require__(34);
exports.numPendingRequests = 0;
exports.PRODUCTION_INSTANCE = 0;
exports.INSTANCE_NAMES = [];
/**
 * Maps a BrainmapsInstance to the list of base URL shards to use for accessing it.
 */
exports.INSTANCE_BASE_URLS = [];
var instanceHostname = [];
exports.INSTANCE_IDENTIFIERS = [];
function setupBrainmapsInstance(instance, hostname, identifier, name) {
    exports.INSTANCE_IDENTIFIERS[instance] = identifier;
    exports.INSTANCE_NAMES[instance] = name;
    instanceHostname[instance] = hostname;
    var baseUrls = [`https://${ hostname }`];
    for (var shard = 0; shard <= 9; ++shard) {
        baseUrls.push(`https://s${ shard }-${ hostname }`);
    }
    exports.INSTANCE_BASE_URLS[instance] = baseUrls;
}
exports.setupBrainmapsInstance = setupBrainmapsInstance;
setupBrainmapsInstance(exports.PRODUCTION_INSTANCE, 'brainmaps.googleapis.com', 'prod', 'Brain Maps');
function makeRequest(instance, method, path, responseType) {
    /**
     * undefined means request not yet attempted.  null means request
     * cancelled.
     */
    var xhr = undefined;
    return promise_1.makeCancellablePromise((resolve, reject, onCancel) => {
        function start(token) {
            if (xhr === null) {
                --exports.numPendingRequests;
                return;
            }
            xhr = http_request_1.openShardedHttpRequest(exports.INSTANCE_BASE_URLS[instance], path, method);
            xhr.responseType = responseType;
            xhr.setRequestHeader('Authorization', `${ token['tokenType'] } ${ token['accessToken'] }`);
            xhr.onloadend = function () {
                if (xhr === null) {
                    --exports.numPendingRequests;
                    return;
                }
                var status = this.status;
                if (status >= 200 && status < 300) {
                    --exports.numPendingRequests;
                    resolve(this.response);
                } else if (status === 403 || status === 401) {
                    // Authorization needed.
                    api_implementation_1.getToken(token).then(start);
                } else {
                    --exports.numPendingRequests;
                    reject(http_request_1.HttpError.fromXhr(this));
                }
            };
            xhr.send();
        }
        onCancel(() => {
            var origXhr = xhr;
            xhr = null;
            if (origXhr != null) {
                origXhr.abort();
            }
        });
        api_implementation_1.getToken().then(start);
    });
}
exports.makeRequest = makeRequest;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hash_1 = __webpack_require__(33);
var promise_1 = __webpack_require__(34);
exports.URL_SYMBOL = Symbol('url');
exports.METHOD_SYMBOL = Symbol('method');

var HttpError = function (_Error) {
    _inherits(HttpError, _Error);

    function HttpError(method, url, code, statusMessage) {
        _classCallCheck(this, HttpError);

        var message = `${ method } ${ JSON.stringify(url) } resulted in HTTP error ${ code }`;
        if (statusMessage) {
            message += `: ${ statusMessage }`;
        }
        message += '.';

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HttpError).call(this, message));

        _this.name = 'HttpError';
        _this.message = message;
        _this.method = method;
        _this.url = url;
        _this.code = code;
        _this.statusMessage = statusMessage;
        return _this;
    }

    _createClass(HttpError, null, [{
        key: 'fromXhr',
        value: function fromXhr(xhr) {
            return new HttpError(xhr[exports.METHOD_SYMBOL], xhr[exports.URL_SYMBOL], xhr.status, xhr.statusText);
        }
    }]);

    return HttpError;
}(Error);

exports.HttpError = HttpError;
;
function openHttpRequest(url) {
    var method = arguments.length <= 1 || arguments[1] === undefined ? 'GET' : arguments[1];

    var xhr = new XMLHttpRequest();
    xhr[exports.METHOD_SYMBOL] = method;
    xhr[exports.URL_SYMBOL] = url;
    xhr.open(method, url);
    return xhr;
}
exports.openHttpRequest = openHttpRequest;
function pickShard(baseUrls, path) {
    if (Array.isArray(baseUrls)) {
        var numShards = baseUrls.length;
        var shard = numShards === 1 ? 0 : Math.abs(hash_1.simpleStringHash(path)) % numShards;
        return baseUrls[shard] + path;
    }
    return baseUrls + path;
}
exports.pickShard = pickShard;
function openShardedHttpRequest(baseUrls, path) {
    var method = arguments.length <= 2 || arguments[2] === undefined ? 'GET' : arguments[2];

    var xhr = new XMLHttpRequest();
    var url = pickShard(baseUrls, path);
    xhr[exports.METHOD_SYMBOL] = method;
    xhr[exports.URL_SYMBOL] = url;
    xhr.open(method, url);
    return xhr;
}
exports.openShardedHttpRequest = openShardedHttpRequest;
function sendHttpRequest(xhr, responseType) {
    xhr.responseType = responseType;
    return promise_1.makeCancellablePromise((resolve, reject, onCancel) => {
        xhr.onloadend = function () {
            var status = this.status;
            if (status >= 200 && status < 300) {
                resolve(this.response);
            } else {
                reject(HttpError.fromXhr(xhr));
            }
        };
        onCancel(() => {
            xhr.abort();
        });
        xhr.send();
    });
}
exports.sendHttpRequest = sendHttpRequest;
/**
 * Parses a URL that may have a special protocol designation into a list of base URLs and a path.
 *
 * If the protocol is 'http' or 'https', the input string is returned as a single base URL, with an
 * empty path.
 *
 * Additionally, 'gs://bucket/path' is supported for accessing Google Storage buckets.
 */
function parseSpecialUrl(url) {
    var urlProtocolPattern = /^([^:\\/]+):\\/\\/([^\\/]+)(\\/.*)?$/;
    var match = url.match(urlProtocolPattern);
    if (match === null) {
        throw new Error(`Invalid URL: ${ JSON.stringify(url) }`);
    }
    var protocol = match[1];
    if (protocol === 'gs') {
        var bucket = match[2];
        var baseUrls = [`https://${ bucket }.storage.googleapis.com`, `https://storage.googleapis.com/${ bucket }`];
        return [baseUrls, match[3]];
    }
    return [[url], ''];
}
exports.parseSpecialUrl = parseSpecialUrl;

/***/ },
/* 33 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * This is a very simple string hash function.  It isn't secure, but
 * is suitable for sharding of requests.
 */

function simpleStringHash(s) {
  var h = 0;
  var length = s.length;
  for (var i = 0; i < length; ++i) {
    h = h * 31 + s.charCodeAt(i) | 0;
  }
  return h;
}
exports.simpleStringHash = simpleStringHash;

/***/ },
/* 34 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CancellationError = function () {
    function CancellationError() {
        _classCallCheck(this, CancellationError);
    }

    _createClass(CancellationError, [{
        key: "toString",
        value: function toString() {
            return 'CancellationError';
        }
    }]);

    return CancellationError;
}();

exports.CancellationError = CancellationError;
;
/**
 * Value thrown to indicate cancellation.
 */
exports.CANCELLED = new CancellationError();
function makeCancellablePromise(executor) {
    var finished = false;
    var cancelHandler = void 0;
    var cancelFunction = void 0;
    var promise = new Promise((resolve, reject) => {
        function resolver(value) {
            if (!finished) {
                finished = true;
                // This can't throw.
                resolve(value);
            }
        }
        function rejecter(value) {
            if (!finished) {
                finished = true;
                // This can't throw.
                reject(value);
            }
        }
        function setCancelHandler(newCancelHandler) {
            if (finished) {
                try {
                    newCancelHandler();
                } catch (ignoredError) {}
            }
        }
        try {
            executor(resolver, rejecter, setCancelHandler);
        } catch (executorError) {
            rejecter(executorError);
        }
        cancelFunction = () => {
            if (!finished) {
                finished = true;
                if (cancelHandler !== undefined) {
                    try {
                        cancelHandler();
                    } catch (ignoredError) {}
                    cancelHandler = undefined;
                }
                reject(exports.CANCELLED);
            }
        };
    });
    promise.cancel = cancelFunction;
    return promise;
}
exports.makeCancellablePromise = makeCancellablePromise;
function cancelPromise(promise) {
    if (promise != null) {
        var cancel = promise.cancel;

        if (cancel !== undefined) {
            cancel.call(promise);
        }
    }
}
exports.cancelPromise = cancelPromise;
/**
 * Schedules a call to handler when promise is either fulfilled or rejected.  If the handler throws
 * an error, the returned promise is rejected with it.  Otherwise, the returned promise has the same
 * state as the original promise.
 *
 * If the returned promise is cancelled before the inputPromise is finished, the inputPromise is
 * cancelled.
 */
function callFinally(inputPromise, handler) {
    return makeCancellablePromise((resolve, reject, onCancel) => {
        onCancel(() => {
            cancelPromise(inputPromise);
        });
        inputPromise.then(value => {
            onCancel(undefined);
            Promise.resolve(handler(onCancel)).then(() => {
                resolve(value);
            });
        }, reason => {
            onCancel(undefined);
            try {
                Promise.resolve(handler(onCancel)).then(() => {
                    reject(reason);
                }, reject);
            } catch (otherError) {
                reject(otherError);
            }
        });
    });
}
exports.callFinally = callFinally;
/**
 * Schedules a call to onFulfilled as soon as the promise is fulfilled.
 *
 * A cancellation handler may be set, which is called if the returned promise is cancelled afer
 * inputPromise is fulfilled.  If the returned promise is cancelled before inputPromise is
 * fulfilled, inputPromise is cancelled if it supports it.
 */
function cancellableThen(inputPromise, onFulfilled) {
    return makeCancellablePromise((resolve, reject, onCancel) => {
        var cancelled = false;
        onCancel(() => {
            cancelled = true;
            cancelPromise(inputPromise);
        });
        inputPromise.then(value => {
            if (cancelled) {
                reject(exports.CANCELLED);
            } else {
                onCancel(undefined);
                resolve(onFulfilled(value, onCancel));
            }
        });
    });
}
exports.cancellableThen = cancellableThen;

/***/ },
/* 35 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

function decodeCompressedSegmentationChunk(chunk, response) {
  // TODO: Handle multiple channels.
  chunk.data = new Uint32Array(response, 4 /* skip offset of first channel */);
}
exports.decodeCompressedSegmentationChunk = decodeCompressedSegmentationChunk;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var decode_jpeg_stack_1 = __webpack_require__(37);
var postprocess_1 = __webpack_require__(39);
function decodeJpegChunk(chunk, response) {
  postprocess_1.postProcessRawData(chunk, decode_jpeg_stack_1.decodeJpegStack(new Uint8Array(response), chunk.chunkDataSize));
}
exports.decodeJpegChunk = decodeJpegChunk;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var jpgjs_1 = __webpack_require__(38);
var geom_1 = __webpack_require__(14);
function decodeJpegStack(data, chunkDataSize) {
    var parser = new jpgjs_1.JpegDecoder();
    parser.parse(data);
    if (parser.numComponents !== 1) {
        throw new Error('JPEG data does not have the expected number of components');
    }
    // Just check that the total number pixels matches the expected value.
    if (parser.width * parser.height !== chunkDataSize[0] * chunkDataSize[1] * chunkDataSize[2]) {
        throw new Error(`JPEG data does not have the expected dimensions: width=${ parser.width }, height=${ parser.height }, chunkDataSize=${ geom_1.vec3.str(chunkDataSize) }`);
    }
    return parser.getData(parser.width, parser.height, /*forceRGBOutput=*/false);
}
exports.decodeJpegStack = decodeJpegStack;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2015 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function loadURLasArrayBuffer(path, callback) {
    if (path.indexOf("data:") === 0) {
        var offset = path.indexOf("base64,") + 7;
        var data = atob(path.substring(offset));
        var arr = new Uint8Array(data.length);
        for (var i = data.length - 1; i >= 0; i--) {
            arr[i] = data.charCodeAt(i);
        }
        callback(arr.buffer);
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        callback(xhr.response);
    };
    xhr.send(null);
}

var JpegImage = function jpegImage() {
    function JpegImage() {
        this._src = null;
        this._parser = new PDFJS.JpegImage();
        this.onload = null;
    }
    JpegImage.prototype = {
        get src() {
            return this._src;
        },
        set src(value) {
            this.load(value);
        },
        get width() {
            return this._parser.width;
        },
        get height() {
            return this._parser.height;
        },
        load: function load(path) {
            this._src = path;
            loadURLasArrayBuffer(path, function(buffer) {
                this.parse(new Uint8Array(buffer));
                if (this.onload) {
                    this.onload();
                }
            }.bind(this));
        },
        parse: function(data) {
            this._parser.parse(data);
        },
        getData: function(width, height) {
            return this._parser.getData(width, height, false);
        },
        copyToImageData: function copyToImageData(imageData) {
            if (this._parser.numComponents === 2 || this._parser.numComponents > 4) {
                throw new Error("Unsupported amount of components");
            }
            var width = imageData.width, height = imageData.height;
            var imageDataBytes = width * height * 4;
            var imageDataArray = imageData.data;
            var i, j;
            if (this._parser.numComponents === 1) {
                var values = this._parser.getData(width, height, false);
                for (i = 0, j = 0; i < imageDataBytes; ) {
                    var value = values[j++];
                    imageDataArray[i++] = value;
                    imageDataArray[i++] = value;
                    imageDataArray[i++] = value;
                    imageDataArray[i++] = 255;
                }
                return;
            }
            var rgb = this._parser.getData(width, height, true);
            for (i = 0, j = 0; i < imageDataBytes; ) {
                imageDataArray[i++] = rgb[j++];
                imageDataArray[i++] = rgb[j++];
                imageDataArray[i++] = rgb[j++];
                imageDataArray[i++] = 255;
            }
        }
    };
    return JpegImage;
}();

var PDFJS;

(function(PDFJS) {
    "use strict";
    var JpegImage = function jpegImage() {
        var dctZigZag = new Uint8Array([ 0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63 ]);
        var dctCos1 = 4017;
        var dctSin1 = 799;
        var dctCos3 = 3406;
        var dctSin3 = 2276;
        var dctCos6 = 1567;
        var dctSin6 = 3784;
        var dctSqrt2 = 5793;
        var dctSqrt1d2 = 2896;
        function constructor() {}
        function buildHuffmanTable(codeLengths, values) {
            var k = 0, code = [], i, j, length = 16;
            while (length > 0 && !codeLengths[length - 1]) {
                length--;
            }
            code.push({
                children: [],
                index: 0
            });
            var p = code[0], q;
            for (i = 0; i < length; i++) {
                for (j = 0; j < codeLengths[i]; j++) {
                    p = code.pop();
                    p.children[p.index] = values[k];
                    while (p.index > 0) {
                        p = code.pop();
                    }
                    p.index++;
                    code.push(p);
                    while (code.length <= i) {
                        code.push(q = {
                            children: [],
                            index: 0
                        });
                        p.children[p.index] = q.children;
                        p = q;
                    }
                    k++;
                }
                if (i + 1 < length) {
                    code.push(q = {
                        children: [],
                        index: 0
                    });
                    p.children[p.index] = q.children;
                    p = q;
                }
            }
            return code[0].children;
        }
        function getBlockBufferOffset(component, row, col) {
            return 64 * ((component.blocksPerLine + 1) * row + col);
        }
        function decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
            var precision = frame.precision;
            var samplesPerLine = frame.samplesPerLine;
            var scanLines = frame.scanLines;
            var mcusPerLine = frame.mcusPerLine;
            var progressive = frame.progressive;
            var maxH = frame.maxH, maxV = frame.maxV;
            var startOffset = offset, bitsData = 0, bitsCount = 0;
            function readBit() {
                if (bitsCount > 0) {
                    bitsCount--;
                    return bitsData >> bitsCount & 1;
                }
                bitsData = data[offset++];
                if (bitsData === 255) {
                    var nextByte = data[offset++];
                    if (nextByte) {
                        throw "unexpected marker: " + (bitsData << 8 | nextByte).toString(16);
                    }
                }
                bitsCount = 7;
                return bitsData >>> 7;
            }
            function decodeHuffman(tree) {
                var node = tree;
                while (true) {
                    node = node[readBit()];
                    if (typeof node === "number") {
                        return node;
                    }
                    if (typeof node !== "object") {
                        throw "invalid huffman sequence";
                    }
                }
            }
            function receive(length) {
                var n = 0;
                while (length > 0) {
                    n = n << 1 | readBit();
                    length--;
                }
                return n;
            }
            function receiveAndExtend(length) {
                if (length === 1) {
                    return readBit() === 1 ? 1 : -1;
                }
                var n = receive(length);
                if (n >= 1 << length - 1) {
                    return n;
                }
                return n + (-1 << length) + 1;
            }
            function decodeBaseline(component, offset) {
                var t = decodeHuffman(component.huffmanTableDC);
                var diff = t === 0 ? 0 : receiveAndExtend(t);
                component.blockData[offset] = component.pred += diff;
                var k = 1;
                while (k < 64) {
                    var rs = decodeHuffman(component.huffmanTableAC);
                    var s = rs & 15, r = rs >> 4;
                    if (s === 0) {
                        if (r < 15) {
                            break;
                        }
                        k += 16;
                        continue;
                    }
                    k += r;
                    var z = dctZigZag[k];
                    component.blockData[offset + z] = receiveAndExtend(s);
                    k++;
                }
            }
            function decodeDCFirst(component, offset) {
                var t = decodeHuffman(component.huffmanTableDC);
                var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
                component.blockData[offset] = component.pred += diff;
            }
            function decodeDCSuccessive(component, offset) {
                component.blockData[offset] |= readBit() << successive;
            }
            var eobrun = 0;
            function decodeACFirst(component, offset) {
                if (eobrun > 0) {
                    eobrun--;
                    return;
                }
                var k = spectralStart, e = spectralEnd;
                while (k <= e) {
                    var rs = decodeHuffman(component.huffmanTableAC);
                    var s = rs & 15, r = rs >> 4;
                    if (s === 0) {
                        if (r < 15) {
                            eobrun = receive(r) + (1 << r) - 1;
                            break;
                        }
                        k += 16;
                        continue;
                    }
                    k += r;
                    var z = dctZigZag[k];
                    component.blockData[offset + z] = receiveAndExtend(s) * (1 << successive);
                    k++;
                }
            }
            var successiveACState = 0, successiveACNextValue;
            function decodeACSuccessive(component, offset) {
                var k = spectralStart;
                var e = spectralEnd;
                var r = 0;
                var s;
                var rs;
                while (k <= e) {
                    var z = dctZigZag[k];
                    switch (successiveACState) {
                      case 0:
                        rs = decodeHuffman(component.huffmanTableAC);
                        s = rs & 15;
                        r = rs >> 4;
                        if (s === 0) {
                            if (r < 15) {
                                eobrun = receive(r) + (1 << r);
                                successiveACState = 4;
                            } else {
                                r = 16;
                                successiveACState = 1;
                            }
                        } else {
                            if (s !== 1) {
                                throw "invalid ACn encoding";
                            }
                            successiveACNextValue = receiveAndExtend(s);
                            successiveACState = r ? 2 : 3;
                        }
                        continue;

                      case 1:
                      case 2:
                        if (component.blockData[offset + z]) {
                            component.blockData[offset + z] += readBit() << successive;
                        } else {
                            r--;
                            if (r === 0) {
                                successiveACState = successiveACState === 2 ? 3 : 0;
                            }
                        }
                        break;

                      case 3:
                        if (component.blockData[offset + z]) {
                            component.blockData[offset + z] += readBit() << successive;
                        } else {
                            component.blockData[offset + z] = successiveACNextValue << successive;
                            successiveACState = 0;
                        }
                        break;

                      case 4:
                        if (component.blockData[offset + z]) {
                            component.blockData[offset + z] += readBit() << successive;
                        }
                        break;
                    }
                    k++;
                }
                if (successiveACState === 4) {
                    eobrun--;
                    if (eobrun === 0) {
                        successiveACState = 0;
                    }
                }
            }
            function decodeMcu(component, decode, mcu, row, col) {
                var mcuRow = mcu / mcusPerLine | 0;
                var mcuCol = mcu % mcusPerLine;
                var blockRow = mcuRow * component.v + row;
                var blockCol = mcuCol * component.h + col;
                var offset = getBlockBufferOffset(component, blockRow, blockCol);
                decode(component, offset);
            }
            function decodeBlock(component, decode, mcu) {
                var blockRow = mcu / component.blocksPerLine | 0;
                var blockCol = mcu % component.blocksPerLine;
                var offset = getBlockBufferOffset(component, blockRow, blockCol);
                decode(component, offset);
            }
            var componentsLength = components.length;
            var component, i, j, k, n;
            var decodeFn;
            if (progressive) {
                if (spectralStart === 0) {
                    decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
                } else {
                    decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
                }
            } else {
                decodeFn = decodeBaseline;
            }
            var mcu = 0, marker;
            var mcuExpected;
            if (componentsLength === 1) {
                mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
            } else {
                mcuExpected = mcusPerLine * frame.mcusPerColumn;
            }
            if (!resetInterval) {
                resetInterval = mcuExpected;
            }
            var h, v;
            while (mcu < mcuExpected) {
                for (i = 0; i < componentsLength; i++) {
                    components[i].pred = 0;
                }
                eobrun = 0;
                if (componentsLength === 1) {
                    component = components[0];
                    for (n = 0; n < resetInterval; n++) {
                        decodeBlock(component, decodeFn, mcu);
                        mcu++;
                    }
                } else {
                    for (n = 0; n < resetInterval; n++) {
                        for (i = 0; i < componentsLength; i++) {
                            component = components[i];
                            h = component.h;
                            v = component.v;
                            for (j = 0; j < v; j++) {
                                for (k = 0; k < h; k++) {
                                    decodeMcu(component, decodeFn, mcu, j, k);
                                }
                            }
                        }
                        mcu++;
                    }
                }
                bitsCount = 0;
                marker = data[offset] << 8 | data[offset + 1];
                if (marker <= 65280) {
                    throw "marker was not found";
                }
                if (marker >= 65488 && marker <= 65495) {
                    offset += 2;
                } else {
                    break;
                }
            }
            return offset - startOffset;
        }
        function quantizeAndInverse(component, blockBufferOffset, p) {
            var qt = component.quantizationTable, blockData = component.blockData;
            var v0, v1, v2, v3, v4, v5, v6, v7;
            var p0, p1, p2, p3, p4, p5, p6, p7;
            var t;
            for (var row = 0; row < 64; row += 8) {
                p0 = blockData[blockBufferOffset + row];
                p1 = blockData[blockBufferOffset + row + 1];
                p2 = blockData[blockBufferOffset + row + 2];
                p3 = blockData[blockBufferOffset + row + 3];
                p4 = blockData[blockBufferOffset + row + 4];
                p5 = blockData[blockBufferOffset + row + 5];
                p6 = blockData[blockBufferOffset + row + 6];
                p7 = blockData[blockBufferOffset + row + 7];
                p0 *= qt[row];
                if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
                    t = dctSqrt2 * p0 + 512 >> 10;
                    p[row] = t;
                    p[row + 1] = t;
                    p[row + 2] = t;
                    p[row + 3] = t;
                    p[row + 4] = t;
                    p[row + 5] = t;
                    p[row + 6] = t;
                    p[row + 7] = t;
                    continue;
                }
                p1 *= qt[row + 1];
                p2 *= qt[row + 2];
                p3 *= qt[row + 3];
                p4 *= qt[row + 4];
                p5 *= qt[row + 5];
                p6 *= qt[row + 6];
                p7 *= qt[row + 7];
                v0 = dctSqrt2 * p0 + 128 >> 8;
                v1 = dctSqrt2 * p4 + 128 >> 8;
                v2 = p2;
                v3 = p6;
                v4 = dctSqrt1d2 * (p1 - p7) + 128 >> 8;
                v7 = dctSqrt1d2 * (p1 + p7) + 128 >> 8;
                v5 = p3 << 4;
                v6 = p5 << 4;
                v0 = v0 + v1 + 1 >> 1;
                v1 = v0 - v1;
                t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
                v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
                v3 = t;
                v4 = v4 + v6 + 1 >> 1;
                v6 = v4 - v6;
                v7 = v7 + v5 + 1 >> 1;
                v5 = v7 - v5;
                v0 = v0 + v3 + 1 >> 1;
                v3 = v0 - v3;
                v1 = v1 + v2 + 1 >> 1;
                v2 = v1 - v2;
                t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
                v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
                v7 = t;
                t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
                v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
                v6 = t;
                p[row] = v0 + v7;
                p[row + 7] = v0 - v7;
                p[row + 1] = v1 + v6;
                p[row + 6] = v1 - v6;
                p[row + 2] = v2 + v5;
                p[row + 5] = v2 - v5;
                p[row + 3] = v3 + v4;
                p[row + 4] = v3 - v4;
            }
            for (var col = 0; col < 8; ++col) {
                p0 = p[col];
                p1 = p[col + 8];
                p2 = p[col + 16];
                p3 = p[col + 24];
                p4 = p[col + 32];
                p5 = p[col + 40];
                p6 = p[col + 48];
                p7 = p[col + 56];
                if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
                    t = dctSqrt2 * p0 + 8192 >> 14;
                    t = t < -2040 ? 0 : t >= 2024 ? 255 : t + 2056 >> 4;
                    blockData[blockBufferOffset + col] = t;
                    blockData[blockBufferOffset + col + 8] = t;
                    blockData[blockBufferOffset + col + 16] = t;
                    blockData[blockBufferOffset + col + 24] = t;
                    blockData[blockBufferOffset + col + 32] = t;
                    blockData[blockBufferOffset + col + 40] = t;
                    blockData[blockBufferOffset + col + 48] = t;
                    blockData[blockBufferOffset + col + 56] = t;
                    continue;
                }
                v0 = dctSqrt2 * p0 + 2048 >> 12;
                v1 = dctSqrt2 * p4 + 2048 >> 12;
                v2 = p2;
                v3 = p6;
                v4 = dctSqrt1d2 * (p1 - p7) + 2048 >> 12;
                v7 = dctSqrt1d2 * (p1 + p7) + 2048 >> 12;
                v5 = p3;
                v6 = p5;
                v0 = (v0 + v1 + 1 >> 1) + 4112;
                v1 = v0 - v1;
                t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
                v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
                v3 = t;
                v4 = v4 + v6 + 1 >> 1;
                v6 = v4 - v6;
                v7 = v7 + v5 + 1 >> 1;
                v5 = v7 - v5;
                v0 = v0 + v3 + 1 >> 1;
                v3 = v0 - v3;
                v1 = v1 + v2 + 1 >> 1;
                v2 = v1 - v2;
                t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
                v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
                v7 = t;
                t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
                v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
                v6 = t;
                p0 = v0 + v7;
                p7 = v0 - v7;
                p1 = v1 + v6;
                p6 = v1 - v6;
                p2 = v2 + v5;
                p5 = v2 - v5;
                p3 = v3 + v4;
                p4 = v3 - v4;
                p0 = p0 < 16 ? 0 : p0 >= 4080 ? 255 : p0 >> 4;
                p1 = p1 < 16 ? 0 : p1 >= 4080 ? 255 : p1 >> 4;
                p2 = p2 < 16 ? 0 : p2 >= 4080 ? 255 : p2 >> 4;
                p3 = p3 < 16 ? 0 : p3 >= 4080 ? 255 : p3 >> 4;
                p4 = p4 < 16 ? 0 : p4 >= 4080 ? 255 : p4 >> 4;
                p5 = p5 < 16 ? 0 : p5 >= 4080 ? 255 : p5 >> 4;
                p6 = p6 < 16 ? 0 : p6 >= 4080 ? 255 : p6 >> 4;
                p7 = p7 < 16 ? 0 : p7 >= 4080 ? 255 : p7 >> 4;
                blockData[blockBufferOffset + col] = p0;
                blockData[blockBufferOffset + col + 8] = p1;
                blockData[blockBufferOffset + col + 16] = p2;
                blockData[blockBufferOffset + col + 24] = p3;
                blockData[blockBufferOffset + col + 32] = p4;
                blockData[blockBufferOffset + col + 40] = p5;
                blockData[blockBufferOffset + col + 48] = p6;
                blockData[blockBufferOffset + col + 56] = p7;
            }
        }
        function buildComponentData(frame, component) {
            var blocksPerLine = component.blocksPerLine;
            var blocksPerColumn = component.blocksPerColumn;
            var computationBuffer = new Int16Array(64);
            for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
                for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
                    var offset = getBlockBufferOffset(component, blockRow, blockCol);
                    quantizeAndInverse(component, offset, computationBuffer);
                }
            }
            return component.blockData;
        }
        function clamp0to255(a) {
            return a <= 0 ? 0 : a >= 255 ? 255 : a;
        }
        constructor.prototype = {
            parse: function parse(data) {
                function readUint16() {
                    var value = data[offset] << 8 | data[offset + 1];
                    offset += 2;
                    return value;
                }
                function readDataBlock() {
                    var length = readUint16();
                    var array = data.subarray(offset, offset + length - 2);
                    offset += array.length;
                    return array;
                }
                function prepareComponents(frame) {
                    var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / frame.maxH);
                    var mcusPerColumn = Math.ceil(frame.scanLines / 8 / frame.maxV);
                    for (var i = 0; i < frame.components.length; i++) {
                        component = frame.components[i];
                        var blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / frame.maxH);
                        var blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines / 8) * component.v / frame.maxV);
                        var blocksPerLineForMcu = mcusPerLine * component.h;
                        var blocksPerColumnForMcu = mcusPerColumn * component.v;
                        var blocksBufferSize = 64 * blocksPerColumnForMcu * (blocksPerLineForMcu + 1);
                        component.blockData = new Int16Array(blocksBufferSize);
                        component.blocksPerLine = blocksPerLine;
                        component.blocksPerColumn = blocksPerColumn;
                    }
                    frame.mcusPerLine = mcusPerLine;
                    frame.mcusPerColumn = mcusPerColumn;
                }
                var offset = 0, length = data.length;
                var jfif = null;
                var adobe = null;
                var pixels = null;
                var frame, resetInterval;
                var quantizationTables = [];
                var huffmanTablesAC = [], huffmanTablesDC = [];
                var fileMarker = readUint16();
                if (fileMarker !== 65496) {
                    throw "SOI not found";
                }
                fileMarker = readUint16();
                while (fileMarker !== 65497) {
                    var i, j, l;
                    switch (fileMarker) {
                      case 65504:
                      case 65505:
                      case 65506:
                      case 65507:
                      case 65508:
                      case 65509:
                      case 65510:
                      case 65511:
                      case 65512:
                      case 65513:
                      case 65514:
                      case 65515:
                      case 65516:
                      case 65517:
                      case 65518:
                      case 65519:
                      case 65534:
                        var appData = readDataBlock();
                        if (fileMarker === 65504) {
                            if (appData[0] === 74 && appData[1] === 70 && appData[2] === 73 && appData[3] === 70 && appData[4] === 0) {
                                jfif = {
                                    version: {
                                        major: appData[5],
                                        minor: appData[6]
                                    },
                                    densityUnits: appData[7],
                                    xDensity: appData[8] << 8 | appData[9],
                                    yDensity: appData[10] << 8 | appData[11],
                                    thumbWidth: appData[12],
                                    thumbHeight: appData[13],
                                    thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
                                };
                            }
                        }
                        if (fileMarker === 65518) {
                            if (appData[0] === 65 && appData[1] === 100 && appData[2] === 111 && appData[3] === 98 && appData[4] === 101 && appData[5] === 0) {
                                adobe = {
                                    version: appData[6],
                                    flags0: appData[7] << 8 | appData[8],
                                    flags1: appData[9] << 8 | appData[10],
                                    transformCode: appData[11]
                                };
                            }
                        }
                        break;

                      case 65499:
                        var quantizationTablesLength = readUint16();
                        var quantizationTablesEnd = quantizationTablesLength + offset - 2;
                        var z;
                        while (offset < quantizationTablesEnd) {
                            var quantizationTableSpec = data[offset++];
                            var tableData = new Uint16Array(64);
                            if (quantizationTableSpec >> 4 === 0) {
                                for (j = 0; j < 64; j++) {
                                    z = dctZigZag[j];
                                    tableData[z] = data[offset++];
                                }
                            } else if (quantizationTableSpec >> 4 === 1) {
                                for (j = 0; j < 64; j++) {
                                    z = dctZigZag[j];
                                    tableData[z] = readUint16();
                                }
                            } else {
                                throw "DQT: invalid table spec";
                            }
                            quantizationTables[quantizationTableSpec & 15] = tableData;
                        }
                        break;

                      case 65472:
                      case 65473:
                      case 65474:
                        if (frame) {
                            throw "Only single frame JPEGs supported";
                        }
                        readUint16();
                        frame = {};
                        frame.extended = fileMarker === 65473;
                        frame.progressive = fileMarker === 65474;
                        frame.precision = data[offset++];
                        frame.scanLines = readUint16();
                        frame.samplesPerLine = readUint16();
                        frame.components = [];
                        frame.componentIds = {};
                        var componentsCount = data[offset++], componentId;
                        var maxH = 0, maxV = 0;
                        for (i = 0; i < componentsCount; i++) {
                            componentId = data[offset];
                            var h = data[offset + 1] >> 4;
                            var v = data[offset + 1] & 15;
                            if (maxH < h) {
                                maxH = h;
                            }
                            if (maxV < v) {
                                maxV = v;
                            }
                            var qId = data[offset + 2];
                            l = frame.components.push({
                                h: h,
                                v: v,
                                quantizationTable: quantizationTables[qId]
                            });
                            frame.componentIds[componentId] = l - 1;
                            offset += 3;
                        }
                        frame.maxH = maxH;
                        frame.maxV = maxV;
                        prepareComponents(frame);
                        break;

                      case 65476:
                        var huffmanLength = readUint16();
                        for (i = 2; i < huffmanLength; ) {
                            var huffmanTableSpec = data[offset++];
                            var codeLengths = new Uint8Array(16);
                            var codeLengthSum = 0;
                            for (j = 0; j < 16; j++, offset++) {
                                codeLengthSum += codeLengths[j] = data[offset];
                            }
                            var huffmanValues = new Uint8Array(codeLengthSum);
                            for (j = 0; j < codeLengthSum; j++, offset++) {
                                huffmanValues[j] = data[offset];
                            }
                            i += 17 + codeLengthSum;
                            (huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
                        }
                        break;

                      case 65501:
                        readUint16();
                        resetInterval = readUint16();
                        break;

                      case 65498:
                        var scanLength = readUint16();
                        var selectorsCount = data[offset++];
                        var components = [], component;
                        for (i = 0; i < selectorsCount; i++) {
                            var componentIndex = frame.componentIds[data[offset++]];
                            component = frame.components[componentIndex];
                            var tableSpec = data[offset++];
                            component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
                            component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
                            components.push(component);
                        }
                        var spectralStart = data[offset++];
                        var spectralEnd = data[offset++];
                        var successiveApproximation = data[offset++];
                        var processed = decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15);
                        offset += processed;
                        break;

                      case 65535:
                        if (data[offset] !== 255) {
                            offset--;
                        }
                        break;

                      default:
                        if (data[offset - 3] === 255 && data[offset - 2] >= 192 && data[offset - 2] <= 254) {
                            offset -= 3;
                            break;
                        }
                        throw "unknown JPEG marker " + fileMarker.toString(16);
                    }
                    fileMarker = readUint16();
                }
                this.width = frame.samplesPerLine;
                this.height = frame.scanLines;
                this.jfif = jfif;
                this.adobe = adobe;
                this.components = [];
                for (i = 0; i < frame.components.length; i++) {
                    component = frame.components[i];
                    this.components.push({
                        output: buildComponentData(frame, component),
                        scaleX: component.h / frame.maxH,
                        scaleY: component.v / frame.maxV,
                        blocksPerLine: component.blocksPerLine,
                        blocksPerColumn: component.blocksPerColumn
                    });
                }
                this.numComponents = this.components.length;
            },
            _getLinearizedBlockData: function getLinearizedBlockData(width, height) {
                var scaleX = this.width / width, scaleY = this.height / height;
                var component, componentScaleX, componentScaleY, blocksPerScanline;
                var x, y, i, j, k;
                var index;
                var offset = 0;
                var output;
                var numComponents = this.components.length;
                var dataLength = width * height * numComponents;
                var data = new Uint8Array(dataLength);
                var xScaleBlockOffset = new Uint32Array(width);
                var mask3LSB = 4294967288;
                for (i = 0; i < numComponents; i++) {
                    component = this.components[i];
                    componentScaleX = component.scaleX * scaleX;
                    componentScaleY = component.scaleY * scaleY;
                    offset = i;
                    output = component.output;
                    blocksPerScanline = component.blocksPerLine + 1 << 3;
                    for (x = 0; x < width; x++) {
                        j = 0 | x * componentScaleX;
                        xScaleBlockOffset[x] = (j & mask3LSB) << 3 | j & 7;
                    }
                    for (y = 0; y < height; y++) {
                        j = 0 | y * componentScaleY;
                        index = blocksPerScanline * (j & mask3LSB) | (j & 7) << 3;
                        for (x = 0; x < width; x++) {
                            data[offset] = output[index + xScaleBlockOffset[x]];
                            offset += numComponents;
                        }
                    }
                }
                var transform = this.decodeTransform;
                if (transform) {
                    for (i = 0; i < dataLength; ) {
                        for (j = 0, k = 0; j < numComponents; j++, i++, k += 2) {
                            data[i] = (data[i] * transform[k] >> 8) + transform[k + 1];
                        }
                    }
                }
                return data;
            },
            _isColorConversionNeeded: function isColorConversionNeeded() {
                if (this.adobe && this.adobe.transformCode) {
                    return true;
                } else if (this.numComponents === 3) {
                    return true;
                } else {
                    return false;
                }
            },
            _convertYccToRgb: function convertYccToRgb(data) {
                var Y, Cb, Cr;
                for (var i = 0, length = data.length; i < length; i += 3) {
                    Y = data[i];
                    Cb = data[i + 1];
                    Cr = data[i + 2];
                    data[i] = clamp0to255(Y - 179.456 + 1.402 * Cr);
                    data[i + 1] = clamp0to255(Y + 135.459 - .344 * Cb - .714 * Cr);
                    data[i + 2] = clamp0to255(Y - 226.816 + 1.772 * Cb);
                }
                return data;
            },
            _convertYcckToRgb: function convertYcckToRgb(data) {
                var Y, Cb, Cr, k;
                var offset = 0;
                for (var i = 0, length = data.length; i < length; i += 4) {
                    Y = data[i];
                    Cb = data[i + 1];
                    Cr = data[i + 2];
                    k = data[i + 3];
                    var r = -122.67195406894 + Cb * (-660635669420364e-19 * Cb + .000437130475926232 * Cr - 54080610064599e-18 * Y + .00048449797120281 * k - .154362151871126) + Cr * (-.000957964378445773 * Cr + .000817076911346625 * Y - .00477271405408747 * k + 1.53380253221734) + Y * (.000961250184130688 * Y - .00266257332283933 * k + .48357088451265) + k * (-.000336197177618394 * k + .484791561490776);
                    var g = 107.268039397724 + Cb * (219927104525741e-19 * Cb - .000640992018297945 * Cr + .000659397001245577 * Y + .000426105652938837 * k - .176491792462875) + Cr * (-.000778269941513683 * Cr + .00130872261408275 * Y + .000770482631801132 * k - .151051492775562) + Y * (.00126935368114843 * Y - .00265090189010898 * k + .25802910206845) + k * (-.000318913117588328 * k - .213742400323665);
                    var b = -20.810012546947 + Cb * (-.000570115196973677 * Cb - 263409051004589e-19 * Cr + .0020741088115012 * Y - .00288260236853442 * k + .814272968359295) + Cr * (-153496057440975e-19 * Cr - .000132689043961446 * Y + .000560833691242812 * k - .195152027534049) + Y * (.00174418132927582 * Y - .00255243321439347 * k + .116935020465145) + k * (-.000343531996510555 * k + .24165260232407);
                    data[offset++] = clamp0to255(r);
                    data[offset++] = clamp0to255(g);
                    data[offset++] = clamp0to255(b);
                }
                return data;
            },
            _convertYcckToCmyk: function convertYcckToCmyk(data) {
                var Y, Cb, Cr;
                for (var i = 0, length = data.length; i < length; i += 4) {
                    Y = data[i];
                    Cb = data[i + 1];
                    Cr = data[i + 2];
                    data[i] = clamp0to255(434.456 - Y - 1.402 * Cr);
                    data[i + 1] = clamp0to255(119.541 - Y + .344 * Cb + .714 * Cr);
                    data[i + 2] = clamp0to255(481.816 - Y - 1.772 * Cb);
                }
                return data;
            },
            _convertCmykToRgb: function convertCmykToRgb(data) {
                var c, m, y, k;
                var offset = 0;
                var min = -255 * 255 * 255;
                var scale = 1 / 255 / 255;
                for (var i = 0, length = data.length; i < length; i += 4) {
                    c = data[i];
                    m = data[i + 1];
                    y = data[i + 2];
                    k = data[i + 3];
                    var r = c * (-4.387332384609988 * c + 54.48615194189176 * m + 18.82290502165302 * y + 212.25662451639585 * k - 72734.4411664936) + m * (1.7149763477362134 * m - 5.6096736904047315 * y - 17.873870861415444 * k - 1401.7366389350734) + y * (-2.5217340131683033 * y - 21.248923337353073 * k + 4465.541406466231) - k * (21.86122147463605 * k + 48317.86113160301);
                    var g = c * (8.841041422036149 * c + 60.118027045597366 * m + 6.871425592049007 * y + 31.159100130055922 * k - 20220.756542821975) + m * (-15.310361306967817 * m + 17.575251261109482 * y + 131.35250912493976 * k - 48691.05921601825) + y * (4.444339102852739 * y + 9.8632861493405 * k - 6341.191035517494) - k * (20.737325471181034 * k + 47890.15695978492);
                    var b = c * (.8842522430003296 * c + 8.078677503112928 * m + 30.89978309703729 * y - .23883238689178934 * k - 3616.812083916688) + m * (10.49593273432072 * m + 63.02378494754052 * y + 50.606957656360734 * k - 28620.90484698408) + y * (.03296041114873217 * y + 115.60384449646641 * k - 49363.43385999684) - k * (22.33816807309886 * k + 45932.16563550634);
                    data[offset++] = r >= 0 ? 255 : r <= min ? 0 : 255 + r * scale | 0;
                    data[offset++] = g >= 0 ? 255 : g <= min ? 0 : 255 + g * scale | 0;
                    data[offset++] = b >= 0 ? 255 : b <= min ? 0 : 255 + b * scale | 0;
                }
                return data;
            },
            getData: function getData(width, height, forceRGBoutput) {
                if (this.numComponents > 4) {
                    throw "Unsupported color mode";
                }
                var data = this._getLinearizedBlockData(width, height);
                if (this.numComponents === 3) {
                    return this._convertYccToRgb(data);
                } else if (this.numComponents === 4) {
                    if (this._isColorConversionNeeded()) {
                        if (forceRGBoutput) {
                            return this._convertYcckToRgb(data);
                        } else {
                            return this._convertYcckToCmyk(data);
                        }
                    } else if (forceRGBoutput) {
                        return this._convertCmykToRgb(data);
                    }
                }
                return data;
            }
        };
        return constructor;
    }();
    "use strict";
    var ArithmeticDecoder = function ArithmeticDecoderClosure() {
        var QeTable = [ {
            qe: 22017,
            nmps: 1,
            nlps: 1,
            switchFlag: 1
        }, {
            qe: 13313,
            nmps: 2,
            nlps: 6,
            switchFlag: 0
        }, {
            qe: 6145,
            nmps: 3,
            nlps: 9,
            switchFlag: 0
        }, {
            qe: 2753,
            nmps: 4,
            nlps: 12,
            switchFlag: 0
        }, {
            qe: 1313,
            nmps: 5,
            nlps: 29,
            switchFlag: 0
        }, {
            qe: 545,
            nmps: 38,
            nlps: 33,
            switchFlag: 0
        }, {
            qe: 22017,
            nmps: 7,
            nlps: 6,
            switchFlag: 1
        }, {
            qe: 21505,
            nmps: 8,
            nlps: 14,
            switchFlag: 0
        }, {
            qe: 18433,
            nmps: 9,
            nlps: 14,
            switchFlag: 0
        }, {
            qe: 14337,
            nmps: 10,
            nlps: 14,
            switchFlag: 0
        }, {
            qe: 12289,
            nmps: 11,
            nlps: 17,
            switchFlag: 0
        }, {
            qe: 9217,
            nmps: 12,
            nlps: 18,
            switchFlag: 0
        }, {
            qe: 7169,
            nmps: 13,
            nlps: 20,
            switchFlag: 0
        }, {
            qe: 5633,
            nmps: 29,
            nlps: 21,
            switchFlag: 0
        }, {
            qe: 22017,
            nmps: 15,
            nlps: 14,
            switchFlag: 1
        }, {
            qe: 21505,
            nmps: 16,
            nlps: 14,
            switchFlag: 0
        }, {
            qe: 20737,
            nmps: 17,
            nlps: 15,
            switchFlag: 0
        }, {
            qe: 18433,
            nmps: 18,
            nlps: 16,
            switchFlag: 0
        }, {
            qe: 14337,
            nmps: 19,
            nlps: 17,
            switchFlag: 0
        }, {
            qe: 13313,
            nmps: 20,
            nlps: 18,
            switchFlag: 0
        }, {
            qe: 12289,
            nmps: 21,
            nlps: 19,
            switchFlag: 0
        }, {
            qe: 10241,
            nmps: 22,
            nlps: 19,
            switchFlag: 0
        }, {
            qe: 9217,
            nmps: 23,
            nlps: 20,
            switchFlag: 0
        }, {
            qe: 8705,
            nmps: 24,
            nlps: 21,
            switchFlag: 0
        }, {
            qe: 7169,
            nmps: 25,
            nlps: 22,
            switchFlag: 0
        }, {
            qe: 6145,
            nmps: 26,
            nlps: 23,
            switchFlag: 0
        }, {
            qe: 5633,
            nmps: 27,
            nlps: 24,
            switchFlag: 0
        }, {
            qe: 5121,
            nmps: 28,
            nlps: 25,
            switchFlag: 0
        }, {
            qe: 4609,
            nmps: 29,
            nlps: 26,
            switchFlag: 0
        }, {
            qe: 4353,
            nmps: 30,
            nlps: 27,
            switchFlag: 0
        }, {
            qe: 2753,
            nmps: 31,
            nlps: 28,
            switchFlag: 0
        }, {
            qe: 2497,
            nmps: 32,
            nlps: 29,
            switchFlag: 0
        }, {
            qe: 2209,
            nmps: 33,
            nlps: 30,
            switchFlag: 0
        }, {
            qe: 1313,
            nmps: 34,
            nlps: 31,
            switchFlag: 0
        }, {
            qe: 1089,
            nmps: 35,
            nlps: 32,
            switchFlag: 0
        }, {
            qe: 673,
            nmps: 36,
            nlps: 33,
            switchFlag: 0
        }, {
            qe: 545,
            nmps: 37,
            nlps: 34,
            switchFlag: 0
        }, {
            qe: 321,
            nmps: 38,
            nlps: 35,
            switchFlag: 0
        }, {
            qe: 273,
            nmps: 39,
            nlps: 36,
            switchFlag: 0
        }, {
            qe: 133,
            nmps: 40,
            nlps: 37,
            switchFlag: 0
        }, {
            qe: 73,
            nmps: 41,
            nlps: 38,
            switchFlag: 0
        }, {
            qe: 37,
            nmps: 42,
            nlps: 39,
            switchFlag: 0
        }, {
            qe: 21,
            nmps: 43,
            nlps: 40,
            switchFlag: 0
        }, {
            qe: 9,
            nmps: 44,
            nlps: 41,
            switchFlag: 0
        }, {
            qe: 5,
            nmps: 45,
            nlps: 42,
            switchFlag: 0
        }, {
            qe: 1,
            nmps: 45,
            nlps: 43,
            switchFlag: 0
        }, {
            qe: 22017,
            nmps: 46,
            nlps: 46,
            switchFlag: 0
        } ];
        function ArithmeticDecoder(data, start, end) {
            this.data = data;
            this.bp = start;
            this.dataEnd = end;
            this.chigh = data[start];
            this.clow = 0;
            this.byteIn();
            this.chigh = this.chigh << 7 & 65535 | this.clow >> 9 & 127;
            this.clow = this.clow << 7 & 65535;
            this.ct -= 7;
            this.a = 32768;
        }
        ArithmeticDecoder.prototype = {
            byteIn: function ArithmeticDecoder_byteIn() {
                var data = this.data;
                var bp = this.bp;
                if (data[bp] === 255) {
                    var b1 = data[bp + 1];
                    if (b1 > 143) {
                        this.clow += 65280;
                        this.ct = 8;
                    } else {
                        bp++;
                        this.clow += data[bp] << 9;
                        this.ct = 7;
                        this.bp = bp;
                    }
                } else {
                    bp++;
                    this.clow += bp < this.dataEnd ? data[bp] << 8 : 65280;
                    this.ct = 8;
                    this.bp = bp;
                }
                if (this.clow > 65535) {
                    this.chigh += this.clow >> 16;
                    this.clow &= 65535;
                }
            },
            readBit: function ArithmeticDecoder_readBit(contexts, pos) {
                var cx_index = contexts[pos] >> 1, cx_mps = contexts[pos] & 1;
                var qeTableIcx = QeTable[cx_index];
                var qeIcx = qeTableIcx.qe;
                var d;
                var a = this.a - qeIcx;
                if (this.chigh < qeIcx) {
                    if (a < qeIcx) {
                        a = qeIcx;
                        d = cx_mps;
                        cx_index = qeTableIcx.nmps;
                    } else {
                        a = qeIcx;
                        d = 1 ^ cx_mps;
                        if (qeTableIcx.switchFlag === 1) {
                            cx_mps = d;
                        }
                        cx_index = qeTableIcx.nlps;
                    }
                } else {
                    this.chigh -= qeIcx;
                    if ((a & 32768) !== 0) {
                        this.a = a;
                        return cx_mps;
                    }
                    if (a < qeIcx) {
                        d = 1 ^ cx_mps;
                        if (qeTableIcx.switchFlag === 1) {
                            cx_mps = d;
                        }
                        cx_index = qeTableIcx.nlps;
                    } else {
                        d = cx_mps;
                        cx_index = qeTableIcx.nmps;
                    }
                }
                do {
                    if (this.ct === 0) {
                        this.byteIn();
                    }
                    a <<= 1;
                    this.chigh = this.chigh << 1 & 65535 | this.clow >> 15 & 1;
                    this.clow = this.clow << 1 & 65535;
                    this.ct--;
                } while ((a & 32768) === 0);
                this.a = a;
                contexts[pos] = cx_index << 1 | cx_mps;
                return d;
            }
        };
        return ArithmeticDecoder;
    }();
    "use strict";
    var JpxImage = function JpxImageClosure() {
        var SubbandsGainLog2 = {
            LL: 0,
            LH: 1,
            HL: 1,
            HH: 2
        };
        function JpxImage() {
            this.failOnCorruptedImage = false;
        }
        JpxImage.prototype = {
            parse: function JpxImage_parse(data) {
                var head = readUint16(data, 0);
                if (head === 65359) {
                    this.parseCodestream(data, 0, data.length);
                    return;
                }
                var position = 0, length = data.length;
                while (position < length) {
                    var headerSize = 8;
                    var lbox = readUint32(data, position);
                    var tbox = readUint32(data, position + 4);
                    position += headerSize;
                    if (lbox === 1) {
                        lbox = readUint32(data, position) * 4294967296 + readUint32(data, position + 4);
                        position += 8;
                        headerSize += 8;
                    }
                    if (lbox === 0) {
                        lbox = length - position + headerSize;
                    }
                    if (lbox < headerSize) {
                        throw new Error("JPX Error: Invalid box field size");
                    }
                    var dataLength = lbox - headerSize;
                    var jumpDataLength = true;
                    switch (tbox) {
                      case 1785737832:
                        jumpDataLength = false;
                        break;

                      case 1668246642:
                        var method = data[position];
                        var precedence = data[position + 1];
                        var approximation = data[position + 2];
                        if (method === 1) {
                            var colorspace = readUint32(data, position + 3);
                            switch (colorspace) {
                              case 16:
                              case 17:
                              case 18:
                                break;

                              default:
                                warn("Unknown colorspace " + colorspace);
                                break;
                            }
                        } else if (method === 2) {
                            info("ICC profile not supported");
                        }
                        break;

                      case 1785737827:
                        this.parseCodestream(data, position, position + dataLength);
                        break;

                      case 1783636e3:
                        if (218793738 !== readUint32(data, position)) {
                            warn("Invalid JP2 signature");
                        }
                        break;

                      case 1783634458:
                      case 1718909296:
                      case 1920099697:
                      case 1919251232:
                      case 1768449138:
                        break;

                      default:
                        var headerType = String.fromCharCode(tbox >> 24 & 255, tbox >> 16 & 255, tbox >> 8 & 255, tbox & 255);
                        warn("Unsupported header type " + tbox + " (" + headerType + ")");
                        break;
                    }
                    if (jumpDataLength) {
                        position += dataLength;
                    }
                }
            },
            parseImageProperties: function JpxImage_parseImageProperties(stream) {
                var newByte = stream.getByte();
                while (newByte >= 0) {
                    var oldByte = newByte;
                    newByte = stream.getByte();
                    var code = oldByte << 8 | newByte;
                    if (code === 65361) {
                        stream.skip(4);
                        var Xsiz = stream.getInt32() >>> 0;
                        var Ysiz = stream.getInt32() >>> 0;
                        var XOsiz = stream.getInt32() >>> 0;
                        var YOsiz = stream.getInt32() >>> 0;
                        stream.skip(16);
                        var Csiz = stream.getUint16();
                        this.width = Xsiz - XOsiz;
                        this.height = Ysiz - YOsiz;
                        this.componentsCount = Csiz;
                        this.bitsPerComponent = 8;
                        return;
                    }
                }
                throw new Error("JPX Error: No size marker found in JPX stream");
            },
            parseCodestream: function JpxImage_parseCodestream(data, start, end) {
                var context = {};
                try {
                    var doNotRecover = false;
                    var position = start;
                    while (position + 1 < end) {
                        var code = readUint16(data, position);
                        position += 2;
                        var length = 0, j, sqcd, spqcds, spqcdSize, scalarExpounded, tile;
                        switch (code) {
                          case 65359:
                            context.mainHeader = true;
                            break;

                          case 65497:
                            break;

                          case 65361:
                            length = readUint16(data, position);
                            var siz = {};
                            siz.Xsiz = readUint32(data, position + 4);
                            siz.Ysiz = readUint32(data, position + 8);
                            siz.XOsiz = readUint32(data, position + 12);
                            siz.YOsiz = readUint32(data, position + 16);
                            siz.XTsiz = readUint32(data, position + 20);
                            siz.YTsiz = readUint32(data, position + 24);
                            siz.XTOsiz = readUint32(data, position + 28);
                            siz.YTOsiz = readUint32(data, position + 32);
                            var componentsCount = readUint16(data, position + 36);
                            siz.Csiz = componentsCount;
                            var components = [];
                            j = position + 38;
                            for (var i = 0; i < componentsCount; i++) {
                                var component = {
                                    precision: (data[j] & 127) + 1,
                                    isSigned: !!(data[j] & 128),
                                    XRsiz: data[j + 1],
                                    YRsiz: data[j + 1]
                                };
                                calculateComponentDimensions(component, siz);
                                components.push(component);
                            }
                            context.SIZ = siz;
                            context.components = components;
                            calculateTileGrids(context, components);
                            context.QCC = [];
                            context.COC = [];
                            break;

                          case 65372:
                            length = readUint16(data, position);
                            var qcd = {};
                            j = position + 2;
                            sqcd = data[j++];
                            switch (sqcd & 31) {
                              case 0:
                                spqcdSize = 8;
                                scalarExpounded = true;
                                break;

                              case 1:
                                spqcdSize = 16;
                                scalarExpounded = false;
                                break;

                              case 2:
                                spqcdSize = 16;
                                scalarExpounded = true;
                                break;

                              default:
                                throw new Error("JPX Error: Invalid SQcd value " + sqcd);
                            }
                            qcd.noQuantization = spqcdSize === 8;
                            qcd.scalarExpounded = scalarExpounded;
                            qcd.guardBits = sqcd >> 5;
                            spqcds = [];
                            while (j < length + position) {
                                var spqcd = {};
                                if (spqcdSize === 8) {
                                    spqcd.epsilon = data[j++] >> 3;
                                    spqcd.mu = 0;
                                } else {
                                    spqcd.epsilon = data[j] >> 3;
                                    spqcd.mu = (data[j] & 7) << 8 | data[j + 1];
                                    j += 2;
                                }
                                spqcds.push(spqcd);
                            }
                            qcd.SPqcds = spqcds;
                            if (context.mainHeader) {
                                context.QCD = qcd;
                            } else {
                                context.currentTile.QCD = qcd;
                                context.currentTile.QCC = [];
                            }
                            break;

                          case 65373:
                            length = readUint16(data, position);
                            var qcc = {};
                            j = position + 2;
                            var cqcc;
                            if (context.SIZ.Csiz < 257) {
                                cqcc = data[j++];
                            } else {
                                cqcc = readUint16(data, j);
                                j += 2;
                            }
                            sqcd = data[j++];
                            switch (sqcd & 31) {
                              case 0:
                                spqcdSize = 8;
                                scalarExpounded = true;
                                break;

                              case 1:
                                spqcdSize = 16;
                                scalarExpounded = false;
                                break;

                              case 2:
                                spqcdSize = 16;
                                scalarExpounded = true;
                                break;

                              default:
                                throw new Error("JPX Error: Invalid SQcd value " + sqcd);
                            }
                            qcc.noQuantization = spqcdSize === 8;
                            qcc.scalarExpounded = scalarExpounded;
                            qcc.guardBits = sqcd >> 5;
                            spqcds = [];
                            while (j < length + position) {
                                spqcd = {};
                                if (spqcdSize === 8) {
                                    spqcd.epsilon = data[j++] >> 3;
                                    spqcd.mu = 0;
                                } else {
                                    spqcd.epsilon = data[j] >> 3;
                                    spqcd.mu = (data[j] & 7) << 8 | data[j + 1];
                                    j += 2;
                                }
                                spqcds.push(spqcd);
                            }
                            qcc.SPqcds = spqcds;
                            if (context.mainHeader) {
                                context.QCC[cqcc] = qcc;
                            } else {
                                context.currentTile.QCC[cqcc] = qcc;
                            }
                            break;

                          case 65362:
                            length = readUint16(data, position);
                            var cod = {};
                            j = position + 2;
                            var scod = data[j++];
                            cod.entropyCoderWithCustomPrecincts = !!(scod & 1);
                            cod.sopMarkerUsed = !!(scod & 2);
                            cod.ephMarkerUsed = !!(scod & 4);
                            cod.progressionOrder = data[j++];
                            cod.layersCount = readUint16(data, j);
                            j += 2;
                            cod.multipleComponentTransform = data[j++];
                            cod.decompositionLevelsCount = data[j++];
                            cod.xcb = (data[j++] & 15) + 2;
                            cod.ycb = (data[j++] & 15) + 2;
                            var blockStyle = data[j++];
                            cod.selectiveArithmeticCodingBypass = !!(blockStyle & 1);
                            cod.resetContextProbabilities = !!(blockStyle & 2);
                            cod.terminationOnEachCodingPass = !!(blockStyle & 4);
                            cod.verticalyStripe = !!(blockStyle & 8);
                            cod.predictableTermination = !!(blockStyle & 16);
                            cod.segmentationSymbolUsed = !!(blockStyle & 32);
                            cod.reversibleTransformation = data[j++];
                            if (cod.entropyCoderWithCustomPrecincts) {
                                var precinctsSizes = [];
                                while (j < length + position) {
                                    var precinctsSize = data[j++];
                                    precinctsSizes.push({
                                        PPx: precinctsSize & 15,
                                        PPy: precinctsSize >> 4
                                    });
                                }
                                cod.precinctsSizes = precinctsSizes;
                            }
                            var unsupported = [];
                            if (cod.selectiveArithmeticCodingBypass) {
                                unsupported.push("selectiveArithmeticCodingBypass");
                            }
                            if (cod.resetContextProbabilities) {
                                unsupported.push("resetContextProbabilities");
                            }
                            if (cod.terminationOnEachCodingPass) {
                                unsupported.push("terminationOnEachCodingPass");
                            }
                            if (cod.verticalyStripe) {
                                unsupported.push("verticalyStripe");
                            }
                            if (cod.predictableTermination) {
                                unsupported.push("predictableTermination");
                            }
                            if (unsupported.length > 0) {
                                doNotRecover = true;
                                throw new Error("JPX Error: Unsupported COD options (" + unsupported.join(", ") + ")");
                            }
                            if (context.mainHeader) {
                                context.COD = cod;
                            } else {
                                context.currentTile.COD = cod;
                                context.currentTile.COC = [];
                            }
                            break;

                          case 65424:
                            length = readUint16(data, position);
                            tile = {};
                            tile.index = readUint16(data, position + 2);
                            tile.length = readUint32(data, position + 4);
                            tile.dataEnd = tile.length + position - 2;
                            tile.partIndex = data[position + 8];
                            tile.partsCount = data[position + 9];
                            context.mainHeader = false;
                            if (tile.partIndex === 0) {
                                tile.COD = context.COD;
                                tile.COC = context.COC.slice(0);
                                tile.QCD = context.QCD;
                                tile.QCC = context.QCC.slice(0);
                            }
                            context.currentTile = tile;
                            break;

                          case 65427:
                            tile = context.currentTile;
                            if (tile.partIndex === 0) {
                                initializeTile(context, tile.index);
                                buildPackets(context);
                            }
                            length = tile.dataEnd - position;
                            parseTilePackets(context, data, position, length);
                            break;

                          case 65365:
                          case 65367:
                          case 65368:
                          case 65380:
                            length = readUint16(data, position);
                            break;

                          case 65363:
                            throw new Error("JPX Error: Codestream code 0xFF53 (COC) is " + "not implemented");

                          default:
                            throw new Error("JPX Error: Unknown codestream code: " + code.toString(16));
                        }
                        position += length;
                    }
                } catch (e) {
                    if (doNotRecover || this.failOnCorruptedImage) {
                        throw e;
                    } else {
                        warn("Trying to recover from " + e.message);
                    }
                }
                this.tiles = transformComponents(context);
                this.width = context.SIZ.Xsiz - context.SIZ.XOsiz;
                this.height = context.SIZ.Ysiz - context.SIZ.YOsiz;
                this.componentsCount = context.SIZ.Csiz;
            }
        };
        function calculateComponentDimensions(component, siz) {
            component.x0 = Math.ceil(siz.XOsiz / component.XRsiz);
            component.x1 = Math.ceil(siz.Xsiz / component.XRsiz);
            component.y0 = Math.ceil(siz.YOsiz / component.YRsiz);
            component.y1 = Math.ceil(siz.Ysiz / component.YRsiz);
            component.width = component.x1 - component.x0;
            component.height = component.y1 - component.y0;
        }
        function calculateTileGrids(context, components) {
            var siz = context.SIZ;
            var tile, tiles = [];
            var numXtiles = Math.ceil((siz.Xsiz - siz.XTOsiz) / siz.XTsiz);
            var numYtiles = Math.ceil((siz.Ysiz - siz.YTOsiz) / siz.YTsiz);
            for (var q = 0; q < numYtiles; q++) {
                for (var p = 0; p < numXtiles; p++) {
                    tile = {};
                    tile.tx0 = Math.max(siz.XTOsiz + p * siz.XTsiz, siz.XOsiz);
                    tile.ty0 = Math.max(siz.YTOsiz + q * siz.YTsiz, siz.YOsiz);
                    tile.tx1 = Math.min(siz.XTOsiz + (p + 1) * siz.XTsiz, siz.Xsiz);
                    tile.ty1 = Math.min(siz.YTOsiz + (q + 1) * siz.YTsiz, siz.Ysiz);
                    tile.width = tile.tx1 - tile.tx0;
                    tile.height = tile.ty1 - tile.ty0;
                    tile.components = [];
                    tiles.push(tile);
                }
            }
            context.tiles = tiles;
            var componentsCount = siz.Csiz;
            for (var i = 0, ii = componentsCount; i < ii; i++) {
                var component = components[i];
                for (var j = 0, jj = tiles.length; j < jj; j++) {
                    var tileComponent = {};
                    tile = tiles[j];
                    tileComponent.tcx0 = Math.ceil(tile.tx0 / component.XRsiz);
                    tileComponent.tcy0 = Math.ceil(tile.ty0 / component.YRsiz);
                    tileComponent.tcx1 = Math.ceil(tile.tx1 / component.XRsiz);
                    tileComponent.tcy1 = Math.ceil(tile.ty1 / component.YRsiz);
                    tileComponent.width = tileComponent.tcx1 - tileComponent.tcx0;
                    tileComponent.height = tileComponent.tcy1 - tileComponent.tcy0;
                    tile.components[i] = tileComponent;
                }
            }
        }
        function getBlocksDimensions(context, component, r) {
            var codOrCoc = component.codingStyleParameters;
            var result = {};
            if (!codOrCoc.entropyCoderWithCustomPrecincts) {
                result.PPx = 15;
                result.PPy = 15;
            } else {
                result.PPx = codOrCoc.precinctsSizes[r].PPx;
                result.PPy = codOrCoc.precinctsSizes[r].PPy;
            }
            result.xcb_ = r > 0 ? Math.min(codOrCoc.xcb, result.PPx - 1) : Math.min(codOrCoc.xcb, result.PPx);
            result.ycb_ = r > 0 ? Math.min(codOrCoc.ycb, result.PPy - 1) : Math.min(codOrCoc.ycb, result.PPy);
            return result;
        }
        function buildPrecincts(context, resolution, dimensions) {
            var precinctWidth = 1 << dimensions.PPx;
            var precinctHeight = 1 << dimensions.PPy;
            var isZeroRes = resolution.resLevel === 0;
            var precinctWidthInSubband = 1 << dimensions.PPx + (isZeroRes ? 0 : -1);
            var precinctHeightInSubband = 1 << dimensions.PPy + (isZeroRes ? 0 : -1);
            var numprecinctswide = resolution.trx1 > resolution.trx0 ? Math.ceil(resolution.trx1 / precinctWidth) - Math.floor(resolution.trx0 / precinctWidth) : 0;
            var numprecinctshigh = resolution.try1 > resolution.try0 ? Math.ceil(resolution.try1 / precinctHeight) - Math.floor(resolution.try0 / precinctHeight) : 0;
            var numprecincts = numprecinctswide * numprecinctshigh;
            resolution.precinctParameters = {
                precinctWidth: precinctWidth,
                precinctHeight: precinctHeight,
                numprecinctswide: numprecinctswide,
                numprecinctshigh: numprecinctshigh,
                numprecincts: numprecincts,
                precinctWidthInSubband: precinctWidthInSubband,
                precinctHeightInSubband: precinctHeightInSubband
            };
        }
        function buildCodeblocks(context, subband, dimensions) {
            var xcb_ = dimensions.xcb_;
            var ycb_ = dimensions.ycb_;
            var codeblockWidth = 1 << xcb_;
            var codeblockHeight = 1 << ycb_;
            var cbx0 = subband.tbx0 >> xcb_;
            var cby0 = subband.tby0 >> ycb_;
            var cbx1 = subband.tbx1 + codeblockWidth - 1 >> xcb_;
            var cby1 = subband.tby1 + codeblockHeight - 1 >> ycb_;
            var precinctParameters = subband.resolution.precinctParameters;
            var codeblocks = [];
            var precincts = [];
            var i, j, codeblock, precinctNumber;
            for (j = cby0; j < cby1; j++) {
                for (i = cbx0; i < cbx1; i++) {
                    codeblock = {
                        cbx: i,
                        cby: j,
                        tbx0: codeblockWidth * i,
                        tby0: codeblockHeight * j,
                        tbx1: codeblockWidth * (i + 1),
                        tby1: codeblockHeight * (j + 1)
                    };
                    codeblock.tbx0_ = Math.max(subband.tbx0, codeblock.tbx0);
                    codeblock.tby0_ = Math.max(subband.tby0, codeblock.tby0);
                    codeblock.tbx1_ = Math.min(subband.tbx1, codeblock.tbx1);
                    codeblock.tby1_ = Math.min(subband.tby1, codeblock.tby1);
                    var pi = Math.floor((codeblock.tbx0_ - subband.tbx0) / precinctParameters.precinctWidthInSubband);
                    var pj = Math.floor((codeblock.tby0_ - subband.tby0) / precinctParameters.precinctHeightInSubband);
                    precinctNumber = pi + pj * precinctParameters.numprecinctswide;
                    codeblock.precinctNumber = precinctNumber;
                    codeblock.subbandType = subband.type;
                    codeblock.Lblock = 3;
                    if (codeblock.tbx1_ <= codeblock.tbx0_ || codeblock.tby1_ <= codeblock.tby0_) {
                        continue;
                    }
                    codeblocks.push(codeblock);
                    var precinct = precincts[precinctNumber];
                    if (precinct !== undefined) {
                        if (i < precinct.cbxMin) {
                            precinct.cbxMin = i;
                        } else if (i > precinct.cbxMax) {
                            precinct.cbxMax = i;
                        }
                        if (j < precinct.cbyMin) {
                            precinct.cbxMin = j;
                        } else if (j > precinct.cbyMax) {
                            precinct.cbyMax = j;
                        }
                    } else {
                        precincts[precinctNumber] = precinct = {
                            cbxMin: i,
                            cbyMin: j,
                            cbxMax: i,
                            cbyMax: j
                        };
                    }
                    codeblock.precinct = precinct;
                }
            }
            subband.codeblockParameters = {
                codeblockWidth: xcb_,
                codeblockHeight: ycb_,
                numcodeblockwide: cbx1 - cbx0 + 1,
                numcodeblockhigh: cby1 - cby0 + 1
            };
            subband.codeblocks = codeblocks;
            subband.precincts = precincts;
        }
        function createPacket(resolution, precinctNumber, layerNumber) {
            var precinctCodeblocks = [];
            var subbands = resolution.subbands;
            for (var i = 0, ii = subbands.length; i < ii; i++) {
                var subband = subbands[i];
                var codeblocks = subband.codeblocks;
                for (var j = 0, jj = codeblocks.length; j < jj; j++) {
                    var codeblock = codeblocks[j];
                    if (codeblock.precinctNumber !== precinctNumber) {
                        continue;
                    }
                    precinctCodeblocks.push(codeblock);
                }
            }
            return {
                layerNumber: layerNumber,
                codeblocks: precinctCodeblocks
            };
        }
        function LayerResolutionComponentPositionIterator(context) {
            var siz = context.SIZ;
            var tileIndex = context.currentTile.index;
            var tile = context.tiles[tileIndex];
            var layersCount = tile.codingStyleDefaultParameters.layersCount;
            var componentsCount = siz.Csiz;
            var maxDecompositionLevelsCount = 0;
            for (var q = 0; q < componentsCount; q++) {
                maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
            }
            var l = 0, r = 0, i = 0, k = 0;
            this.nextPacket = function JpxImage_nextPacket() {
                for (;l < layersCount; l++) {
                    for (;r <= maxDecompositionLevelsCount; r++) {
                        for (;i < componentsCount; i++) {
                            var component = tile.components[i];
                            if (r > component.codingStyleParameters.decompositionLevelsCount) {
                                continue;
                            }
                            var resolution = component.resolutions[r];
                            var numprecincts = resolution.precinctParameters.numprecincts;
                            for (;k < numprecincts; ) {
                                var packet = createPacket(resolution, k, l);
                                k++;
                                return packet;
                            }
                            k = 0;
                        }
                        i = 0;
                    }
                    r = 0;
                }
                throw new Error("JPX Error: Out of packets");
            };
        }
        function ResolutionLayerComponentPositionIterator(context) {
            var siz = context.SIZ;
            var tileIndex = context.currentTile.index;
            var tile = context.tiles[tileIndex];
            var layersCount = tile.codingStyleDefaultParameters.layersCount;
            var componentsCount = siz.Csiz;
            var maxDecompositionLevelsCount = 0;
            for (var q = 0; q < componentsCount; q++) {
                maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
            }
            var r = 0, l = 0, i = 0, k = 0;
            this.nextPacket = function JpxImage_nextPacket() {
                for (;r <= maxDecompositionLevelsCount; r++) {
                    for (;l < layersCount; l++) {
                        for (;i < componentsCount; i++) {
                            var component = tile.components[i];
                            if (r > component.codingStyleParameters.decompositionLevelsCount) {
                                continue;
                            }
                            var resolution = component.resolutions[r];
                            var numprecincts = resolution.precinctParameters.numprecincts;
                            for (;k < numprecincts; ) {
                                var packet = createPacket(resolution, k, l);
                                k++;
                                return packet;
                            }
                            k = 0;
                        }
                        i = 0;
                    }
                    l = 0;
                }
                throw new Error("JPX Error: Out of packets");
            };
        }
        function ResolutionPositionComponentLayerIterator(context) {
            var siz = context.SIZ;
            var tileIndex = context.currentTile.index;
            var tile = context.tiles[tileIndex];
            var layersCount = tile.codingStyleDefaultParameters.layersCount;
            var componentsCount = siz.Csiz;
            var l, r, c, p;
            var maxDecompositionLevelsCount = 0;
            for (c = 0; c < componentsCount; c++) {
                var component = tile.components[c];
                maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, component.codingStyleParameters.decompositionLevelsCount);
            }
            var maxNumPrecinctsInLevel = new Int32Array(maxDecompositionLevelsCount + 1);
            for (r = 0; r <= maxDecompositionLevelsCount; ++r) {
                var maxNumPrecincts = 0;
                for (c = 0; c < componentsCount; ++c) {
                    var resolutions = tile.components[c].resolutions;
                    if (r < resolutions.length) {
                        maxNumPrecincts = Math.max(maxNumPrecincts, resolutions[r].precinctParameters.numprecincts);
                    }
                }
                maxNumPrecinctsInLevel[r] = maxNumPrecincts;
            }
            l = 0;
            r = 0;
            c = 0;
            p = 0;
            this.nextPacket = function JpxImage_nextPacket() {
                for (;r <= maxDecompositionLevelsCount; r++) {
                    for (;p < maxNumPrecinctsInLevel[r]; p++) {
                        for (;c < componentsCount; c++) {
                            var component = tile.components[c];
                            if (r > component.codingStyleParameters.decompositionLevelsCount) {
                                continue;
                            }
                            var resolution = component.resolutions[r];
                            var numprecincts = resolution.precinctParameters.numprecincts;
                            if (p >= numprecincts) {
                                continue;
                            }
                            for (;l < layersCount; ) {
                                var packet = createPacket(resolution, p, l);
                                l++;
                                return packet;
                            }
                            l = 0;
                        }
                        c = 0;
                    }
                    p = 0;
                }
                throw new Error("JPX Error: Out of packets");
            };
        }
        function PositionComponentResolutionLayerIterator(context) {
            var siz = context.SIZ;
            var tileIndex = context.currentTile.index;
            var tile = context.tiles[tileIndex];
            var layersCount = tile.codingStyleDefaultParameters.layersCount;
            var componentsCount = siz.Csiz;
            var precinctsSizes = getPrecinctSizesInImageScale(tile);
            var precinctsIterationSizes = precinctsSizes;
            var l = 0, r = 0, c = 0, px = 0, py = 0;
            this.nextPacket = function JpxImage_nextPacket() {
                for (;py < precinctsIterationSizes.maxNumHigh; py++) {
                    for (;px < precinctsIterationSizes.maxNumWide; px++) {
                        for (;c < componentsCount; c++) {
                            var component = tile.components[c];
                            var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
                            for (;r <= decompositionLevelsCount; r++) {
                                var resolution = component.resolutions[r];
                                var sizeInImageScale = precinctsSizes.components[c].resolutions[r];
                                var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);
                                if (k === null) {
                                    continue;
                                }
                                for (;l < layersCount; ) {
                                    var packet = createPacket(resolution, k, l);
                                    l++;
                                    return packet;
                                }
                                l = 0;
                            }
                            r = 0;
                        }
                        c = 0;
                    }
                    px = 0;
                }
                throw new Error("JPX Error: Out of packets");
            };
        }
        function ComponentPositionResolutionLayerIterator(context) {
            var siz = context.SIZ;
            var tileIndex = context.currentTile.index;
            var tile = context.tiles[tileIndex];
            var layersCount = tile.codingStyleDefaultParameters.layersCount;
            var componentsCount = siz.Csiz;
            var precinctsSizes = getPrecinctSizesInImageScale(tile);
            var l = 0, r = 0, c = 0, px = 0, py = 0;
            this.nextPacket = function JpxImage_nextPacket() {
                for (;c < componentsCount; ++c) {
                    var component = tile.components[c];
                    var precinctsIterationSizes = precinctsSizes.components[c];
                    var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
                    for (;py < precinctsIterationSizes.maxNumHigh; py++) {
                        for (;px < precinctsIterationSizes.maxNumWide; px++) {
                            for (;r <= decompositionLevelsCount; r++) {
                                var resolution = component.resolutions[r];
                                var sizeInImageScale = precinctsIterationSizes.resolutions[r];
                                var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);
                                if (k === null) {
                                    continue;
                                }
                                for (;l < layersCount; ) {
                                    var packet = createPacket(resolution, k, l);
                                    l++;
                                    return packet;
                                }
                                l = 0;
                            }
                            r = 0;
                        }
                        px = 0;
                    }
                    py = 0;
                }
                throw new Error("JPX Error: Out of packets");
            };
        }
        function getPrecinctIndexIfExist(pxIndex, pyIndex, sizeInImageScale, precinctIterationSizes, resolution) {
            var posX = pxIndex * precinctIterationSizes.minWidth;
            var posY = pyIndex * precinctIterationSizes.minHeight;
            if (posX % sizeInImageScale.width !== 0 || posY % sizeInImageScale.height !== 0) {
                return null;
            }
            var startPrecinctRowIndex = posY / sizeInImageScale.width * resolution.precinctParameters.numprecinctswide;
            return posX / sizeInImageScale.height + startPrecinctRowIndex;
        }
        function getPrecinctSizesInImageScale(tile) {
            var componentsCount = tile.components.length;
            var minWidth = Number.MAX_VALUE;
            var minHeight = Number.MAX_VALUE;
            var maxNumWide = 0;
            var maxNumHigh = 0;
            var sizePerComponent = new Array(componentsCount);
            for (var c = 0; c < componentsCount; c++) {
                var component = tile.components[c];
                var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
                var sizePerResolution = new Array(decompositionLevelsCount + 1);
                var minWidthCurrentComponent = Number.MAX_VALUE;
                var minHeightCurrentComponent = Number.MAX_VALUE;
                var maxNumWideCurrentComponent = 0;
                var maxNumHighCurrentComponent = 0;
                var scale = 1;
                for (var r = decompositionLevelsCount; r >= 0; --r) {
                    var resolution = component.resolutions[r];
                    var widthCurrentResolution = scale * resolution.precinctParameters.precinctWidth;
                    var heightCurrentResolution = scale * resolution.precinctParameters.precinctHeight;
                    minWidthCurrentComponent = Math.min(minWidthCurrentComponent, widthCurrentResolution);
                    minHeightCurrentComponent = Math.min(minHeightCurrentComponent, heightCurrentResolution);
                    maxNumWideCurrentComponent = Math.max(maxNumWideCurrentComponent, resolution.precinctParameters.numprecinctswide);
                    maxNumHighCurrentComponent = Math.max(maxNumHighCurrentComponent, resolution.precinctParameters.numprecinctshigh);
                    sizePerResolution[r] = {
                        width: widthCurrentResolution,
                        height: heightCurrentResolution
                    };
                    scale <<= 1;
                }
                minWidth = Math.min(minWidth, minWidthCurrentComponent);
                minHeight = Math.min(minHeight, minHeightCurrentComponent);
                maxNumWide = Math.max(maxNumWide, maxNumWideCurrentComponent);
                maxNumHigh = Math.max(maxNumHigh, maxNumHighCurrentComponent);
                sizePerComponent[c] = {
                    resolutions: sizePerResolution,
                    minWidth: minWidthCurrentComponent,
                    minHeight: minHeightCurrentComponent,
                    maxNumWide: maxNumWideCurrentComponent,
                    maxNumHigh: maxNumHighCurrentComponent
                };
            }
            return {
                components: sizePerComponent,
                minWidth: minWidth,
                minHeight: minHeight,
                maxNumWide: maxNumWide,
                maxNumHigh: maxNumHigh
            };
        }
        function buildPackets(context) {
            var siz = context.SIZ;
            var tileIndex = context.currentTile.index;
            var tile = context.tiles[tileIndex];
            var componentsCount = siz.Csiz;
            for (var c = 0; c < componentsCount; c++) {
                var component = tile.components[c];
                var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
                var resolutions = [];
                var subbands = [];
                for (var r = 0; r <= decompositionLevelsCount; r++) {
                    var blocksDimensions = getBlocksDimensions(context, component, r);
                    var resolution = {};
                    var scale = 1 << decompositionLevelsCount - r;
                    resolution.trx0 = Math.ceil(component.tcx0 / scale);
                    resolution.try0 = Math.ceil(component.tcy0 / scale);
                    resolution.trx1 = Math.ceil(component.tcx1 / scale);
                    resolution.try1 = Math.ceil(component.tcy1 / scale);
                    resolution.resLevel = r;
                    buildPrecincts(context, resolution, blocksDimensions);
                    resolutions.push(resolution);
                    var subband;
                    if (r === 0) {
                        subband = {};
                        subband.type = "LL";
                        subband.tbx0 = Math.ceil(component.tcx0 / scale);
                        subband.tby0 = Math.ceil(component.tcy0 / scale);
                        subband.tbx1 = Math.ceil(component.tcx1 / scale);
                        subband.tby1 = Math.ceil(component.tcy1 / scale);
                        subband.resolution = resolution;
                        buildCodeblocks(context, subband, blocksDimensions);
                        subbands.push(subband);
                        resolution.subbands = [ subband ];
                    } else {
                        var bscale = 1 << decompositionLevelsCount - r + 1;
                        var resolutionSubbands = [];
                        subband = {};
                        subband.type = "HL";
                        subband.tbx0 = Math.ceil(component.tcx0 / bscale - .5);
                        subband.tby0 = Math.ceil(component.tcy0 / bscale);
                        subband.tbx1 = Math.ceil(component.tcx1 / bscale - .5);
                        subband.tby1 = Math.ceil(component.tcy1 / bscale);
                        subband.resolution = resolution;
                        buildCodeblocks(context, subband, blocksDimensions);
                        subbands.push(subband);
                        resolutionSubbands.push(subband);
                        subband = {};
                        subband.type = "LH";
                        subband.tbx0 = Math.ceil(component.tcx0 / bscale);
                        subband.tby0 = Math.ceil(component.tcy0 / bscale - .5);
                        subband.tbx1 = Math.ceil(component.tcx1 / bscale);
                        subband.tby1 = Math.ceil(component.tcy1 / bscale - .5);
                        subband.resolution = resolution;
                        buildCodeblocks(context, subband, blocksDimensions);
                        subbands.push(subband);
                        resolutionSubbands.push(subband);
                        subband = {};
                        subband.type = "HH";
                        subband.tbx0 = Math.ceil(component.tcx0 / bscale - .5);
                        subband.tby0 = Math.ceil(component.tcy0 / bscale - .5);
                        subband.tbx1 = Math.ceil(component.tcx1 / bscale - .5);
                        subband.tby1 = Math.ceil(component.tcy1 / bscale - .5);
                        subband.resolution = resolution;
                        buildCodeblocks(context, subband, blocksDimensions);
                        subbands.push(subband);
                        resolutionSubbands.push(subband);
                        resolution.subbands = resolutionSubbands;
                    }
                }
                component.resolutions = resolutions;
                component.subbands = subbands;
            }
            var progressionOrder = tile.codingStyleDefaultParameters.progressionOrder;
            switch (progressionOrder) {
              case 0:
                tile.packetsIterator = new LayerResolutionComponentPositionIterator(context);
                break;

              case 1:
                tile.packetsIterator = new ResolutionLayerComponentPositionIterator(context);
                break;

              case 2:
                tile.packetsIterator = new ResolutionPositionComponentLayerIterator(context);
                break;

              case 3:
                tile.packetsIterator = new PositionComponentResolutionLayerIterator(context);
                break;

              case 4:
                tile.packetsIterator = new ComponentPositionResolutionLayerIterator(context);
                break;

              default:
                throw new Error("JPX Error: Unsupported progression order " + progressionOrder);
            }
        }
        function parseTilePackets(context, data, offset, dataLength) {
            var position = 0;
            var buffer, bufferSize = 0, skipNextBit = false;
            function readBits(count) {
                while (bufferSize < count) {
                    var b = data[offset + position];
                    position++;
                    if (skipNextBit) {
                        buffer = buffer << 7 | b;
                        bufferSize += 7;
                        skipNextBit = false;
                    } else {
                        buffer = buffer << 8 | b;
                        bufferSize += 8;
                    }
                    if (b === 255) {
                        skipNextBit = true;
                    }
                }
                bufferSize -= count;
                return buffer >>> bufferSize & (1 << count) - 1;
            }
            function skipMarkerIfEqual(value) {
                if (data[offset + position - 1] === 255 && data[offset + position] === value) {
                    skipBytes(1);
                    return true;
                } else if (data[offset + position] === 255 && data[offset + position + 1] === value) {
                    skipBytes(2);
                    return true;
                }
                return false;
            }
            function skipBytes(count) {
                position += count;
            }
            function alignToByte() {
                bufferSize = 0;
                if (skipNextBit) {
                    position++;
                    skipNextBit = false;
                }
            }
            function readCodingpasses() {
                if (readBits(1) === 0) {
                    return 1;
                }
                if (readBits(1) === 0) {
                    return 2;
                }
                var value = readBits(2);
                if (value < 3) {
                    return value + 3;
                }
                value = readBits(5);
                if (value < 31) {
                    return value + 6;
                }
                value = readBits(7);
                return value + 37;
            }
            var tileIndex = context.currentTile.index;
            var tile = context.tiles[tileIndex];
            var sopMarkerUsed = context.COD.sopMarkerUsed;
            var ephMarkerUsed = context.COD.ephMarkerUsed;
            var packetsIterator = tile.packetsIterator;
            while (position < dataLength) {
                alignToByte();
                if (sopMarkerUsed && skipMarkerIfEqual(145)) {
                    skipBytes(4);
                }
                var packet = packetsIterator.nextPacket();
                if (!readBits(1)) {
                    continue;
                }
                var layerNumber = packet.layerNumber;
                var queue = [], codeblock;
                for (var i = 0, ii = packet.codeblocks.length; i < ii; i++) {
                    codeblock = packet.codeblocks[i];
                    var precinct = codeblock.precinct;
                    var codeblockColumn = codeblock.cbx - precinct.cbxMin;
                    var codeblockRow = codeblock.cby - precinct.cbyMin;
                    var codeblockIncluded = false;
                    var firstTimeInclusion = false;
                    var valueReady;
                    if (codeblock["included"] !== undefined) {
                        codeblockIncluded = !!readBits(1);
                    } else {
                        precinct = codeblock.precinct;
                        var inclusionTree, zeroBitPlanesTree;
                        if (precinct["inclusionTree"] !== undefined) {
                            inclusionTree = precinct.inclusionTree;
                        } else {
                            var width = precinct.cbxMax - precinct.cbxMin + 1;
                            var height = precinct.cbyMax - precinct.cbyMin + 1;
                            inclusionTree = new InclusionTree(width, height, layerNumber);
                            zeroBitPlanesTree = new TagTree(width, height);
                            precinct.inclusionTree = inclusionTree;
                            precinct.zeroBitPlanesTree = zeroBitPlanesTree;
                        }
                        if (inclusionTree.reset(codeblockColumn, codeblockRow, layerNumber)) {
                            while (true) {
                                if (readBits(1)) {
                                    valueReady = !inclusionTree.nextLevel();
                                    if (valueReady) {
                                        codeblock.included = true;
                                        codeblockIncluded = firstTimeInclusion = true;
                                        break;
                                    }
                                } else {
                                    inclusionTree.incrementValue(layerNumber);
                                    break;
                                }
                            }
                        }
                    }
                    if (!codeblockIncluded) {
                        continue;
                    }
                    if (firstTimeInclusion) {
                        zeroBitPlanesTree = precinct.zeroBitPlanesTree;
                        zeroBitPlanesTree.reset(codeblockColumn, codeblockRow);
                        while (true) {
                            if (readBits(1)) {
                                valueReady = !zeroBitPlanesTree.nextLevel();
                                if (valueReady) {
                                    break;
                                }
                            } else {
                                zeroBitPlanesTree.incrementValue();
                            }
                        }
                        codeblock.zeroBitPlanes = zeroBitPlanesTree.value;
                    }
                    var codingpasses = readCodingpasses();
                    while (readBits(1)) {
                        codeblock.Lblock++;
                    }
                    var codingpassesLog2 = log2(codingpasses);
                    var bits = (codingpasses < 1 << codingpassesLog2 ? codingpassesLog2 - 1 : codingpassesLog2) + codeblock.Lblock;
                    var codedDataLength = readBits(bits);
                    queue.push({
                        codeblock: codeblock,
                        codingpasses: codingpasses,
                        dataLength: codedDataLength
                    });
                }
                alignToByte();
                if (ephMarkerUsed) {
                    skipMarkerIfEqual(146);
                }
                while (queue.length > 0) {
                    var packetItem = queue.shift();
                    codeblock = packetItem.codeblock;
                    if (codeblock["data"] === undefined) {
                        codeblock.data = [];
                    }
                    codeblock.data.push({
                        data: data,
                        start: offset + position,
                        end: offset + position + packetItem.dataLength,
                        codingpasses: packetItem.codingpasses
                    });
                    position += packetItem.dataLength;
                }
            }
            return position;
        }
        function copyCoefficients(coefficients, levelWidth, levelHeight, subband, delta, mb, reversible, segmentationSymbolUsed) {
            var x0 = subband.tbx0;
            var y0 = subband.tby0;
            var width = subband.tbx1 - subband.tbx0;
            var codeblocks = subband.codeblocks;
            var right = subband.type.charAt(0) === "H" ? 1 : 0;
            var bottom = subband.type.charAt(1) === "H" ? levelWidth : 0;
            for (var i = 0, ii = codeblocks.length; i < ii; ++i) {
                var codeblock = codeblocks[i];
                var blockWidth = codeblock.tbx1_ - codeblock.tbx0_;
                var blockHeight = codeblock.tby1_ - codeblock.tby0_;
                if (blockWidth === 0 || blockHeight === 0) {
                    continue;
                }
                if (codeblock["data"] === undefined) {
                    continue;
                }
                var bitModel, currentCodingpassType;
                bitModel = new BitModel(blockWidth, blockHeight, codeblock.subbandType, codeblock.zeroBitPlanes, mb);
                currentCodingpassType = 2;
                var data = codeblock.data, totalLength = 0, codingpasses = 0;
                var j, jj, dataItem;
                for (j = 0, jj = data.length; j < jj; j++) {
                    dataItem = data[j];
                    totalLength += dataItem.end - dataItem.start;
                    codingpasses += dataItem.codingpasses;
                }
                var encodedData = new Uint8Array(totalLength);
                var position = 0;
                for (j = 0, jj = data.length; j < jj; j++) {
                    dataItem = data[j];
                    var chunk = dataItem.data.subarray(dataItem.start, dataItem.end);
                    encodedData.set(chunk, position);
                    position += chunk.length;
                }
                var decoder = new ArithmeticDecoder(encodedData, 0, totalLength);
                bitModel.setDecoder(decoder);
                for (j = 0; j < codingpasses; j++) {
                    switch (currentCodingpassType) {
                      case 0:
                        bitModel.runSignificancePropogationPass();
                        break;

                      case 1:
                        bitModel.runMagnitudeRefinementPass();
                        break;

                      case 2:
                        bitModel.runCleanupPass();
                        if (segmentationSymbolUsed) {
                            bitModel.checkSegmentationSymbol();
                        }
                        break;
                    }
                    currentCodingpassType = (currentCodingpassType + 1) % 3;
                }
                var offset = codeblock.tbx0_ - x0 + (codeblock.tby0_ - y0) * width;
                var sign = bitModel.coefficentsSign;
                var magnitude = bitModel.coefficentsMagnitude;
                var bitsDecoded = bitModel.bitsDecoded;
                var magnitudeCorrection = reversible ? 0 : .5;
                var k, n, nb;
                position = 0;
                var interleave = subband.type !== "LL";
                for (j = 0; j < blockHeight; j++) {
                    var row = offset / width | 0;
                    var levelOffset = 2 * row * (levelWidth - width) + right + bottom;
                    for (k = 0; k < blockWidth; k++) {
                        n = magnitude[position];
                        if (n !== 0) {
                            n = (n + magnitudeCorrection) * delta;
                            if (sign[position] !== 0) {
                                n = -n;
                            }
                            nb = bitsDecoded[position];
                            var pos = interleave ? levelOffset + (offset << 1) : offset;
                            if (reversible && nb >= mb) {
                                coefficients[pos] = n;
                            } else {
                                coefficients[pos] = n * (1 << mb - nb);
                            }
                        }
                        offset++;
                        position++;
                    }
                    offset += width - blockWidth;
                }
            }
        }
        function transformTile(context, tile, c) {
            var component = tile.components[c];
            var codingStyleParameters = component.codingStyleParameters;
            var quantizationParameters = component.quantizationParameters;
            var decompositionLevelsCount = codingStyleParameters.decompositionLevelsCount;
            var spqcds = quantizationParameters.SPqcds;
            var scalarExpounded = quantizationParameters.scalarExpounded;
            var guardBits = quantizationParameters.guardBits;
            var segmentationSymbolUsed = codingStyleParameters.segmentationSymbolUsed;
            var precision = context.components[c].precision;
            var reversible = codingStyleParameters.reversibleTransformation;
            var transform = reversible ? new ReversibleTransform() : new IrreversibleTransform();
            var subbandCoefficients = [];
            var b = 0;
            for (var i = 0; i <= decompositionLevelsCount; i++) {
                var resolution = component.resolutions[i];
                var width = resolution.trx1 - resolution.trx0;
                var height = resolution.try1 - resolution.try0;
                var coefficients = new Float32Array(width * height);
                for (var j = 0, jj = resolution.subbands.length; j < jj; j++) {
                    var mu, epsilon;
                    if (!scalarExpounded) {
                        mu = spqcds[0].mu;
                        epsilon = spqcds[0].epsilon + (i > 0 ? 1 - i : 0);
                    } else {
                        mu = spqcds[b].mu;
                        epsilon = spqcds[b].epsilon;
                        b++;
                    }
                    var subband = resolution.subbands[j];
                    var gainLog2 = SubbandsGainLog2[subband.type];
                    var delta = reversible ? 1 : Math.pow(2, precision + gainLog2 - epsilon) * (1 + mu / 2048);
                    var mb = guardBits + epsilon - 1;
                    copyCoefficients(coefficients, width, height, subband, delta, mb, reversible, segmentationSymbolUsed);
                }
                subbandCoefficients.push({
                    width: width,
                    height: height,
                    items: coefficients
                });
            }
            var result = transform.calculate(subbandCoefficients, component.tcx0, component.tcy0);
            return {
                left: component.tcx0,
                top: component.tcy0,
                width: result.width,
                height: result.height,
                items: result.items
            };
        }
        function transformComponents(context) {
            var siz = context.SIZ;
            var components = context.components;
            var componentsCount = siz.Csiz;
            var resultImages = [];
            for (var i = 0, ii = context.tiles.length; i < ii; i++) {
                var tile = context.tiles[i];
                var transformedTiles = [];
                var c;
                for (c = 0; c < componentsCount; c++) {
                    transformedTiles[c] = transformTile(context, tile, c);
                }
                var tile0 = transformedTiles[0];
                var out = new Uint8Array(tile0.items.length * componentsCount);
                var result = {
                    left: tile0.left,
                    top: tile0.top,
                    width: tile0.width,
                    height: tile0.height,
                    items: out
                };
                var shift, offset, max, min, maxK;
                var pos = 0, j, jj, y0, y1, y2, r, g, b, k, val;
                if (tile.codingStyleDefaultParameters.multipleComponentTransform) {
                    var fourComponents = componentsCount === 4;
                    var y0items = transformedTiles[0].items;
                    var y1items = transformedTiles[1].items;
                    var y2items = transformedTiles[2].items;
                    var y3items = fourComponents ? transformedTiles[3].items : null;
                    shift = components[0].precision - 8;
                    offset = (128 << shift) + .5;
                    max = 255 * (1 << shift);
                    maxK = max * .5;
                    min = -maxK;
                    var component0 = tile.components[0];
                    var alpha01 = componentsCount - 3;
                    jj = y0items.length;
                    if (!component0.codingStyleParameters.reversibleTransformation) {
                        for (j = 0; j < jj; j++, pos += alpha01) {
                            y0 = y0items[j] + offset;
                            y1 = y1items[j];
                            y2 = y2items[j];
                            r = y0 + 1.402 * y2;
                            g = y0 - .34413 * y1 - .71414 * y2;
                            b = y0 + 1.772 * y1;
                            out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
                            out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
                            out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
                        }
                    } else {
                        for (j = 0; j < jj; j++, pos += alpha01) {
                            y0 = y0items[j] + offset;
                            y1 = y1items[j];
                            y2 = y2items[j];
                            g = y0 - (y2 + y1 >> 2);
                            r = g + y2;
                            b = g + y1;
                            out[pos++] = r <= 0 ? 0 : r >= max ? 255 : r >> shift;
                            out[pos++] = g <= 0 ? 0 : g >= max ? 255 : g >> shift;
                            out[pos++] = b <= 0 ? 0 : b >= max ? 255 : b >> shift;
                        }
                    }
                    if (fourComponents) {
                        for (j = 0, pos = 3; j < jj; j++, pos += 4) {
                            k = y3items[j];
                            out[pos] = k <= min ? 0 : k >= maxK ? 255 : k + offset >> shift;
                        }
                    }
                } else {
                    for (c = 0; c < componentsCount; c++) {
                        var items = transformedTiles[c].items;
                        shift = components[c].precision - 8;
                        offset = (128 << shift) + .5;
                        max = 127.5 * (1 << shift);
                        min = -max;
                        for (pos = c, j = 0, jj = items.length; j < jj; j++) {
                            val = items[j];
                            out[pos] = val <= min ? 0 : val >= max ? 255 : val + offset >> shift;
                            pos += componentsCount;
                        }
                    }
                }
                resultImages.push(result);
            }
            return resultImages;
        }
        function initializeTile(context, tileIndex) {
            var siz = context.SIZ;
            var componentsCount = siz.Csiz;
            var tile = context.tiles[tileIndex];
            for (var c = 0; c < componentsCount; c++) {
                var component = tile.components[c];
                var qcdOrQcc = context.currentTile.QCC[c] !== undefined ? context.currentTile.QCC[c] : context.currentTile.QCD;
                component.quantizationParameters = qcdOrQcc;
                var codOrCoc = context.currentTile.COC[c] !== undefined ? context.currentTile.COC[c] : context.currentTile.COD;
                component.codingStyleParameters = codOrCoc;
            }
            tile.codingStyleDefaultParameters = context.currentTile.COD;
        }
        var TagTree = function TagTreeClosure() {
            function TagTree(width, height) {
                var levelsLength = log2(Math.max(width, height)) + 1;
                this.levels = [];
                for (var i = 0; i < levelsLength; i++) {
                    var level = {
                        width: width,
                        height: height,
                        items: []
                    };
                    this.levels.push(level);
                    width = Math.ceil(width / 2);
                    height = Math.ceil(height / 2);
                }
            }
            TagTree.prototype = {
                reset: function TagTree_reset(i, j) {
                    var currentLevel = 0, value = 0, level;
                    while (currentLevel < this.levels.length) {
                        level = this.levels[currentLevel];
                        var index = i + j * level.width;
                        if (level.items[index] !== undefined) {
                            value = level.items[index];
                            break;
                        }
                        level.index = index;
                        i >>= 1;
                        j >>= 1;
                        currentLevel++;
                    }
                    currentLevel--;
                    level = this.levels[currentLevel];
                    level.items[level.index] = value;
                    this.currentLevel = currentLevel;
                    delete this.value;
                },
                incrementValue: function TagTree_incrementValue() {
                    var level = this.levels[this.currentLevel];
                    level.items[level.index]++;
                },
                nextLevel: function TagTree_nextLevel() {
                    var currentLevel = this.currentLevel;
                    var level = this.levels[currentLevel];
                    var value = level.items[level.index];
                    currentLevel--;
                    if (currentLevel < 0) {
                        this.value = value;
                        return false;
                    }
                    this.currentLevel = currentLevel;
                    level = this.levels[currentLevel];
                    level.items[level.index] = value;
                    return true;
                }
            };
            return TagTree;
        }();
        var InclusionTree = function InclusionTreeClosure() {
            function InclusionTree(width, height, defaultValue) {
                var levelsLength = log2(Math.max(width, height)) + 1;
                this.levels = [];
                for (var i = 0; i < levelsLength; i++) {
                    var items = new Uint8Array(width * height);
                    for (var j = 0, jj = items.length; j < jj; j++) {
                        items[j] = defaultValue;
                    }
                    var level = {
                        width: width,
                        height: height,
                        items: items
                    };
                    this.levels.push(level);
                    width = Math.ceil(width / 2);
                    height = Math.ceil(height / 2);
                }
            }
            InclusionTree.prototype = {
                reset: function InclusionTree_reset(i, j, stopValue) {
                    var currentLevel = 0;
                    while (currentLevel < this.levels.length) {
                        var level = this.levels[currentLevel];
                        var index = i + j * level.width;
                        level.index = index;
                        var value = level.items[index];
                        if (value === 255) {
                            break;
                        }
                        if (value > stopValue) {
                            this.currentLevel = currentLevel;
                            this.propagateValues();
                            return false;
                        }
                        i >>= 1;
                        j >>= 1;
                        currentLevel++;
                    }
                    this.currentLevel = currentLevel - 1;
                    return true;
                },
                incrementValue: function InclusionTree_incrementValue(stopValue) {
                    var level = this.levels[this.currentLevel];
                    level.items[level.index] = stopValue + 1;
                    this.propagateValues();
                },
                propagateValues: function InclusionTree_propagateValues() {
                    var levelIndex = this.currentLevel;
                    var level = this.levels[levelIndex];
                    var currentValue = level.items[level.index];
                    while (--levelIndex >= 0) {
                        level = this.levels[levelIndex];
                        level.items[level.index] = currentValue;
                    }
                },
                nextLevel: function InclusionTree_nextLevel() {
                    var currentLevel = this.currentLevel;
                    var level = this.levels[currentLevel];
                    var value = level.items[level.index];
                    level.items[level.index] = 255;
                    currentLevel--;
                    if (currentLevel < 0) {
                        return false;
                    }
                    this.currentLevel = currentLevel;
                    level = this.levels[currentLevel];
                    level.items[level.index] = value;
                    return true;
                }
            };
            return InclusionTree;
        }();
        var BitModel = function BitModelClosure() {
            var UNIFORM_CONTEXT = 17;
            var RUNLENGTH_CONTEXT = 18;
            var LLAndLHContextsLabel = new Uint8Array([ 0, 5, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 1, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8 ]);
            var HLContextLabel = new Uint8Array([ 0, 3, 4, 0, 5, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 1, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8 ]);
            var HHContextLabel = new Uint8Array([ 0, 1, 2, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 4, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8 ]);
            function BitModel(width, height, subband, zeroBitPlanes, mb) {
                this.width = width;
                this.height = height;
                this.contextLabelTable = subband === "HH" ? HHContextLabel : subband === "HL" ? HLContextLabel : LLAndLHContextsLabel;
                var coefficientCount = width * height;
                this.neighborsSignificance = new Uint8Array(coefficientCount);
                this.coefficentsSign = new Uint8Array(coefficientCount);
                this.coefficentsMagnitude = mb > 14 ? new Uint32Array(coefficientCount) : mb > 6 ? new Uint16Array(coefficientCount) : new Uint8Array(coefficientCount);
                this.processingFlags = new Uint8Array(coefficientCount);
                var bitsDecoded = new Uint8Array(coefficientCount);
                if (zeroBitPlanes !== 0) {
                    for (var i = 0; i < coefficientCount; i++) {
                        bitsDecoded[i] = zeroBitPlanes;
                    }
                }
                this.bitsDecoded = bitsDecoded;
                this.reset();
            }
            BitModel.prototype = {
                setDecoder: function BitModel_setDecoder(decoder) {
                    this.decoder = decoder;
                },
                reset: function BitModel_reset() {
                    this.contexts = new Int8Array(19);
                    this.contexts[0] = 4 << 1 | 0;
                    this.contexts[UNIFORM_CONTEXT] = 46 << 1 | 0;
                    this.contexts[RUNLENGTH_CONTEXT] = 3 << 1 | 0;
                },
                setNeighborsSignificance: function BitModel_setNeighborsSignificance(row, column, index) {
                    var neighborsSignificance = this.neighborsSignificance;
                    var width = this.width, height = this.height;
                    var left = column > 0;
                    var right = column + 1 < width;
                    var i;
                    if (row > 0) {
                        i = index - width;
                        if (left) {
                            neighborsSignificance[i - 1] += 16;
                        }
                        if (right) {
                            neighborsSignificance[i + 1] += 16;
                        }
                        neighborsSignificance[i] += 4;
                    }
                    if (row + 1 < height) {
                        i = index + width;
                        if (left) {
                            neighborsSignificance[i - 1] += 16;
                        }
                        if (right) {
                            neighborsSignificance[i + 1] += 16;
                        }
                        neighborsSignificance[i] += 4;
                    }
                    if (left) {
                        neighborsSignificance[index - 1] += 1;
                    }
                    if (right) {
                        neighborsSignificance[index + 1] += 1;
                    }
                    neighborsSignificance[index] |= 128;
                },
                runSignificancePropogationPass: function BitModel_runSignificancePropogationPass() {
                    var decoder = this.decoder;
                    var width = this.width, height = this.height;
                    var coefficentsMagnitude = this.coefficentsMagnitude;
                    var coefficentsSign = this.coefficentsSign;
                    var neighborsSignificance = this.neighborsSignificance;
                    var processingFlags = this.processingFlags;
                    var contexts = this.contexts;
                    var labels = this.contextLabelTable;
                    var bitsDecoded = this.bitsDecoded;
                    var processedInverseMask = ~1;
                    var processedMask = 1;
                    var firstMagnitudeBitMask = 2;
                    for (var i0 = 0; i0 < height; i0 += 4) {
                        for (var j = 0; j < width; j++) {
                            var index = i0 * width + j;
                            for (var i1 = 0; i1 < 4; i1++, index += width) {
                                var i = i0 + i1;
                                if (i >= height) {
                                    break;
                                }
                                processingFlags[index] &= processedInverseMask;
                                if (coefficentsMagnitude[index] || !neighborsSignificance[index]) {
                                    continue;
                                }
                                var contextLabel = labels[neighborsSignificance[index]];
                                var decision = decoder.readBit(contexts, contextLabel);
                                if (decision) {
                                    var sign = this.decodeSignBit(i, j, index);
                                    coefficentsSign[index] = sign;
                                    coefficentsMagnitude[index] = 1;
                                    this.setNeighborsSignificance(i, j, index);
                                    processingFlags[index] |= firstMagnitudeBitMask;
                                }
                                bitsDecoded[index]++;
                                processingFlags[index] |= processedMask;
                            }
                        }
                    }
                },
                decodeSignBit: function BitModel_decodeSignBit(row, column, index) {
                    var width = this.width, height = this.height;
                    var coefficentsMagnitude = this.coefficentsMagnitude;
                    var coefficentsSign = this.coefficentsSign;
                    var contribution, sign0, sign1, significance1;
                    var contextLabel, decoded;
                    significance1 = column > 0 && coefficentsMagnitude[index - 1] !== 0;
                    if (column + 1 < width && coefficentsMagnitude[index + 1] !== 0) {
                        sign1 = coefficentsSign[index + 1];
                        if (significance1) {
                            sign0 = coefficentsSign[index - 1];
                            contribution = 1 - sign1 - sign0;
                        } else {
                            contribution = 1 - sign1 - sign1;
                        }
                    } else if (significance1) {
                        sign0 = coefficentsSign[index - 1];
                        contribution = 1 - sign0 - sign0;
                    } else {
                        contribution = 0;
                    }
                    var horizontalContribution = 3 * contribution;
                    significance1 = row > 0 && coefficentsMagnitude[index - width] !== 0;
                    if (row + 1 < height && coefficentsMagnitude[index + width] !== 0) {
                        sign1 = coefficentsSign[index + width];
                        if (significance1) {
                            sign0 = coefficentsSign[index - width];
                            contribution = 1 - sign1 - sign0 + horizontalContribution;
                        } else {
                            contribution = 1 - sign1 - sign1 + horizontalContribution;
                        }
                    } else if (significance1) {
                        sign0 = coefficentsSign[index - width];
                        contribution = 1 - sign0 - sign0 + horizontalContribution;
                    } else {
                        contribution = horizontalContribution;
                    }
                    if (contribution >= 0) {
                        contextLabel = 9 + contribution;
                        decoded = this.decoder.readBit(this.contexts, contextLabel);
                    } else {
                        contextLabel = 9 - contribution;
                        decoded = this.decoder.readBit(this.contexts, contextLabel) ^ 1;
                    }
                    return decoded;
                },
                runMagnitudeRefinementPass: function BitModel_runMagnitudeRefinementPass() {
                    var decoder = this.decoder;
                    var width = this.width, height = this.height;
                    var coefficentsMagnitude = this.coefficentsMagnitude;
                    var neighborsSignificance = this.neighborsSignificance;
                    var contexts = this.contexts;
                    var bitsDecoded = this.bitsDecoded;
                    var processingFlags = this.processingFlags;
                    var processedMask = 1;
                    var firstMagnitudeBitMask = 2;
                    var length = width * height;
                    var width4 = width * 4;
                    for (var index0 = 0, indexNext; index0 < length; index0 = indexNext) {
                        indexNext = Math.min(length, index0 + width4);
                        for (var j = 0; j < width; j++) {
                            for (var index = index0 + j; index < indexNext; index += width) {
                                if (!coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                                    continue;
                                }
                                var contextLabel = 16;
                                if ((processingFlags[index] & firstMagnitudeBitMask) !== 0) {
                                    processingFlags[index] ^= firstMagnitudeBitMask;
                                    var significance = neighborsSignificance[index] & 127;
                                    contextLabel = significance === 0 ? 15 : 14;
                                }
                                var bit = decoder.readBit(contexts, contextLabel);
                                coefficentsMagnitude[index] = coefficentsMagnitude[index] << 1 | bit;
                                bitsDecoded[index]++;
                                processingFlags[index] |= processedMask;
                            }
                        }
                    }
                },
                runCleanupPass: function BitModel_runCleanupPass() {
                    var decoder = this.decoder;
                    var width = this.width, height = this.height;
                    var neighborsSignificance = this.neighborsSignificance;
                    var coefficentsMagnitude = this.coefficentsMagnitude;
                    var coefficentsSign = this.coefficentsSign;
                    var contexts = this.contexts;
                    var labels = this.contextLabelTable;
                    var bitsDecoded = this.bitsDecoded;
                    var processingFlags = this.processingFlags;
                    var processedMask = 1;
                    var firstMagnitudeBitMask = 2;
                    var oneRowDown = width;
                    var twoRowsDown = width * 2;
                    var threeRowsDown = width * 3;
                    var iNext;
                    for (var i0 = 0; i0 < height; i0 = iNext) {
                        iNext = Math.min(i0 + 4, height);
                        var indexBase = i0 * width;
                        var checkAllEmpty = i0 + 3 < height;
                        for (var j = 0; j < width; j++) {
                            var index0 = indexBase + j;
                            var allEmpty = checkAllEmpty && processingFlags[index0] === 0 && processingFlags[index0 + oneRowDown] === 0 && processingFlags[index0 + twoRowsDown] === 0 && processingFlags[index0 + threeRowsDown] === 0 && neighborsSignificance[index0] === 0 && neighborsSignificance[index0 + oneRowDown] === 0 && neighborsSignificance[index0 + twoRowsDown] === 0 && neighborsSignificance[index0 + threeRowsDown] === 0;
                            var i1 = 0, index = index0;
                            var i = i0, sign;
                            if (allEmpty) {
                                var hasSignificantCoefficent = decoder.readBit(contexts, RUNLENGTH_CONTEXT);
                                if (!hasSignificantCoefficent) {
                                    bitsDecoded[index0]++;
                                    bitsDecoded[index0 + oneRowDown]++;
                                    bitsDecoded[index0 + twoRowsDown]++;
                                    bitsDecoded[index0 + threeRowsDown]++;
                                    continue;
                                }
                                i1 = decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);
                                if (i1 !== 0) {
                                    i = i0 + i1;
                                    index += i1 * width;
                                }
                                sign = this.decodeSignBit(i, j, index);
                                coefficentsSign[index] = sign;
                                coefficentsMagnitude[index] = 1;
                                this.setNeighborsSignificance(i, j, index);
                                processingFlags[index] |= firstMagnitudeBitMask;
                                index = index0;
                                for (var i2 = i0; i2 <= i; i2++, index += width) {
                                    bitsDecoded[index]++;
                                }
                                i1++;
                            }
                            for (i = i0 + i1; i < iNext; i++, index += width) {
                                if (coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                                    continue;
                                }
                                var contextLabel = labels[neighborsSignificance[index]];
                                var decision = decoder.readBit(contexts, contextLabel);
                                if (decision === 1) {
                                    sign = this.decodeSignBit(i, j, index);
                                    coefficentsSign[index] = sign;
                                    coefficentsMagnitude[index] = 1;
                                    this.setNeighborsSignificance(i, j, index);
                                    processingFlags[index] |= firstMagnitudeBitMask;
                                }
                                bitsDecoded[index]++;
                            }
                        }
                    }
                },
                checkSegmentationSymbol: function BitModel_checkSegmentationSymbol() {
                    var decoder = this.decoder;
                    var contexts = this.contexts;
                    var symbol = decoder.readBit(contexts, UNIFORM_CONTEXT) << 3 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 2 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);
                    if (symbol !== 10) {
                        throw new Error("JPX Error: Invalid segmentation symbol");
                    }
                }
            };
            return BitModel;
        }();
        var Transform = function TransformClosure() {
            function Transform() {}
            Transform.prototype.calculate = function transformCalculate(subbands, u0, v0) {
                var ll = subbands[0];
                for (var i = 1, ii = subbands.length; i < ii; i++) {
                    ll = this.iterate(ll, subbands[i], u0, v0);
                }
                return ll;
            };
            Transform.prototype.extend = function extend(buffer, offset, size) {
                var i1 = offset - 1, j1 = offset + 1;
                var i2 = offset + size - 2, j2 = offset + size;
                buffer[i1--] = buffer[j1++];
                buffer[j2++] = buffer[i2--];
                buffer[i1--] = buffer[j1++];
                buffer[j2++] = buffer[i2--];
                buffer[i1--] = buffer[j1++];
                buffer[j2++] = buffer[i2--];
                buffer[i1] = buffer[j1];
                buffer[j2] = buffer[i2];
            };
            Transform.prototype.iterate = function Transform_iterate(ll, hl_lh_hh, u0, v0) {
                var llWidth = ll.width, llHeight = ll.height, llItems = ll.items;
                var width = hl_lh_hh.width;
                var height = hl_lh_hh.height;
                var items = hl_lh_hh.items;
                var i, j, k, l, u, v;
                for (k = 0, i = 0; i < llHeight; i++) {
                    l = i * 2 * width;
                    for (j = 0; j < llWidth; j++, k++, l += 2) {
                        items[l] = llItems[k];
                    }
                }
                llItems = ll.items = null;
                var bufferPadding = 4;
                var rowBuffer = new Float32Array(width + 2 * bufferPadding);
                if (width === 1) {
                    if ((u0 & 1) !== 0) {
                        for (v = 0, k = 0; v < height; v++, k += width) {
                            items[k] *= .5;
                        }
                    }
                } else {
                    for (v = 0, k = 0; v < height; v++, k += width) {
                        rowBuffer.set(items.subarray(k, k + width), bufferPadding);
                        this.extend(rowBuffer, bufferPadding, width);
                        this.filter(rowBuffer, bufferPadding, width);
                        items.set(rowBuffer.subarray(bufferPadding, bufferPadding + width), k);
                    }
                }
                var numBuffers = 16;
                var colBuffers = [];
                for (i = 0; i < numBuffers; i++) {
                    colBuffers.push(new Float32Array(height + 2 * bufferPadding));
                }
                var b, currentBuffer = 0;
                ll = bufferPadding + height;
                if (height === 1) {
                    if ((v0 & 1) !== 0) {
                        for (u = 0; u < width; u++) {
                            items[u] *= .5;
                        }
                    }
                } else {
                    for (u = 0; u < width; u++) {
                        if (currentBuffer === 0) {
                            numBuffers = Math.min(width - u, numBuffers);
                            for (k = u, l = bufferPadding; l < ll; k += width, l++) {
                                for (b = 0; b < numBuffers; b++) {
                                    colBuffers[b][l] = items[k + b];
                                }
                            }
                            currentBuffer = numBuffers;
                        }
                        currentBuffer--;
                        var buffer = colBuffers[currentBuffer];
                        this.extend(buffer, bufferPadding, height);
                        this.filter(buffer, bufferPadding, height);
                        if (currentBuffer === 0) {
                            k = u - numBuffers + 1;
                            for (l = bufferPadding; l < ll; k += width, l++) {
                                for (b = 0; b < numBuffers; b++) {
                                    items[k + b] = colBuffers[b][l];
                                }
                            }
                        }
                    }
                }
                return {
                    width: width,
                    height: height,
                    items: items
                };
            };
            return Transform;
        }();
        var IrreversibleTransform = function IrreversibleTransformClosure() {
            function IrreversibleTransform() {
                Transform.call(this);
            }
            IrreversibleTransform.prototype = Object.create(Transform.prototype);
            IrreversibleTransform.prototype.filter = function irreversibleTransformFilter(x, offset, length) {
                var len = length >> 1;
                offset = offset | 0;
                var j, n, current, next;
                var alpha = -1.586134342059924;
                var beta = -.052980118572961;
                var gamma = .882911075530934;
                var delta = .443506852043971;
                var K = 1.230174104914001;
                var K_ = 1 / K;
                j = offset - 3;
                for (n = len + 4; n--; j += 2) {
                    x[j] *= K_;
                }
                j = offset - 2;
                current = delta * x[j - 1];
                for (n = len + 3; n--; j += 2) {
                    next = delta * x[j + 1];
                    x[j] = K * x[j] - current - next;
                    if (n--) {
                        j += 2;
                        current = delta * x[j + 1];
                        x[j] = K * x[j] - current - next;
                    } else {
                        break;
                    }
                }
                j = offset - 1;
                current = gamma * x[j - 1];
                for (n = len + 2; n--; j += 2) {
                    next = gamma * x[j + 1];
                    x[j] -= current + next;
                    if (n--) {
                        j += 2;
                        current = gamma * x[j + 1];
                        x[j] -= current + next;
                    } else {
                        break;
                    }
                }
                j = offset;
                current = beta * x[j - 1];
                for (n = len + 1; n--; j += 2) {
                    next = beta * x[j + 1];
                    x[j] -= current + next;
                    if (n--) {
                        j += 2;
                        current = beta * x[j + 1];
                        x[j] -= current + next;
                    } else {
                        break;
                    }
                }
                if (len !== 0) {
                    j = offset + 1;
                    current = alpha * x[j - 1];
                    for (n = len; n--; j += 2) {
                        next = alpha * x[j + 1];
                        x[j] -= current + next;
                        if (n--) {
                            j += 2;
                            current = alpha * x[j + 1];
                            x[j] -= current + next;
                        } else {
                            break;
                        }
                    }
                }
            };
            return IrreversibleTransform;
        }();
        var ReversibleTransform = function ReversibleTransformClosure() {
            function ReversibleTransform() {
                Transform.call(this);
            }
            ReversibleTransform.prototype = Object.create(Transform.prototype);
            ReversibleTransform.prototype.filter = function reversibleTransformFilter(x, offset, length) {
                var len = length >> 1;
                offset = offset | 0;
                var j, n;
                for (j = offset, n = len + 1; n--; j += 2) {
                    x[j] -= x[j - 1] + x[j + 1] + 2 >> 2;
                }
                for (j = offset + 1, n = len; n--; j += 2) {
                    x[j] += x[j - 1] + x[j + 1] >> 1;
                }
            };
            return ReversibleTransform;
        }();
        return JpxImage;
    }();
    "use strict";
    var Jbig2Image = function Jbig2ImageClosure() {
        function ContextCache() {}
        ContextCache.prototype = {
            getContexts: function(id) {
                if (id in this) {
                    return this[id];
                }
                return this[id] = new Int8Array(1 << 16);
            }
        };
        function DecodingContext(data, start, end) {
            this.data = data;
            this.start = start;
            this.end = end;
        }
        DecodingContext.prototype = {
            get decoder() {
                var decoder = new ArithmeticDecoder(this.data, this.start, this.end);
                return shadow(this, "decoder", decoder);
            },
            get contextCache() {
                var cache = new ContextCache();
                return shadow(this, "contextCache", cache);
            }
        };
        function decodeInteger(contextCache, procedure, decoder) {
            var contexts = contextCache.getContexts(procedure);
            var prev = 1;
            function readBits(length) {
                var v = 0;
                for (var i = 0; i < length; i++) {
                    var bit = decoder.readBit(contexts, prev);
                    prev = prev < 256 ? prev << 1 | bit : (prev << 1 | bit) & 511 | 256;
                    v = v << 1 | bit;
                }
                return v >>> 0;
            }
            var sign = readBits(1);
            var value = readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(32) + 4436 : readBits(12) + 340 : readBits(8) + 84 : readBits(6) + 20 : readBits(4) + 4 : readBits(2);
            return sign === 0 ? value : value > 0 ? -value : null;
        }
        function decodeIAID(contextCache, decoder, codeLength) {
            var contexts = contextCache.getContexts("IAID");
            var prev = 1;
            for (var i = 0; i < codeLength; i++) {
                var bit = decoder.readBit(contexts, prev);
                prev = prev << 1 | bit;
            }
            if (codeLength < 31) {
                return prev & (1 << codeLength) - 1;
            }
            return prev & 2147483647;
        }
        var SegmentTypes = [ "SymbolDictionary", null, null, null, "IntermediateTextRegion", null, "ImmediateTextRegion", "ImmediateLosslessTextRegion", null, null, null, null, null, null, null, null, "patternDictionary", null, null, null, "IntermediateHalftoneRegion", null, "ImmediateHalftoneRegion", "ImmediateLosslessHalftoneRegion", null, null, null, null, null, null, null, null, null, null, null, null, "IntermediateGenericRegion", null, "ImmediateGenericRegion", "ImmediateLosslessGenericRegion", "IntermediateGenericRefinementRegion", null, "ImmediateGenericRefinementRegion", "ImmediateLosslessGenericRefinementRegion", null, null, null, null, "PageInformation", "EndOfPage", "EndOfStripe", "EndOfFile", "Profiles", "Tables", null, null, null, null, null, null, null, null, "Extension" ];
        var CodingTemplates = [ [ {
            x: -1,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 1,
            y: -2
        }, {
            x: -2,
            y: -1
        }, {
            x: -1,
            y: -1
        }, {
            x: 0,
            y: -1
        }, {
            x: 1,
            y: -1
        }, {
            x: 2,
            y: -1
        }, {
            x: -4,
            y: 0
        }, {
            x: -3,
            y: 0
        }, {
            x: -2,
            y: 0
        }, {
            x: -1,
            y: 0
        } ], [ {
            x: -1,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 1,
            y: -2
        }, {
            x: 2,
            y: -2
        }, {
            x: -2,
            y: -1
        }, {
            x: -1,
            y: -1
        }, {
            x: 0,
            y: -1
        }, {
            x: 1,
            y: -1
        }, {
            x: 2,
            y: -1
        }, {
            x: -3,
            y: 0
        }, {
            x: -2,
            y: 0
        }, {
            x: -1,
            y: 0
        } ], [ {
            x: -1,
            y: -2
        }, {
            x: 0,
            y: -2
        }, {
            x: 1,
            y: -2
        }, {
            x: -2,
            y: -1
        }, {
            x: -1,
            y: -1
        }, {
            x: 0,
            y: -1
        }, {
            x: 1,
            y: -1
        }, {
            x: -2,
            y: 0
        }, {
            x: -1,
            y: 0
        } ], [ {
            x: -3,
            y: -1
        }, {
            x: -2,
            y: -1
        }, {
            x: -1,
            y: -1
        }, {
            x: 0,
            y: -1
        }, {
            x: 1,
            y: -1
        }, {
            x: -4,
            y: 0
        }, {
            x: -3,
            y: 0
        }, {
            x: -2,
            y: 0
        }, {
            x: -1,
            y: 0
        } ] ];
        var RefinementTemplates = [ {
            coding: [ {
                x: 0,
                y: -1
            }, {
                x: 1,
                y: -1
            }, {
                x: -1,
                y: 0
            } ],
            reference: [ {
                x: 0,
                y: -1
            }, {
                x: 1,
                y: -1
            }, {
                x: -1,
                y: 0
            }, {
                x: 0,
                y: 0
            }, {
                x: 1,
                y: 0
            }, {
                x: -1,
                y: 1
            }, {
                x: 0,
                y: 1
            }, {
                x: 1,
                y: 1
            } ]
        }, {
            coding: [ {
                x: -1,
                y: -1
            }, {
                x: 0,
                y: -1
            }, {
                x: 1,
                y: -1
            }, {
                x: -1,
                y: 0
            } ],
            reference: [ {
                x: 0,
                y: -1
            }, {
                x: -1,
                y: 0
            }, {
                x: 0,
                y: 0
            }, {
                x: 1,
                y: 0
            }, {
                x: 0,
                y: 1
            }, {
                x: 1,
                y: 1
            } ]
        } ];
        var ReusedContexts = [ 39717, 1941, 229, 405 ];
        var RefinementReusedContexts = [ 32, 8 ];
        function decodeBitmapTemplate0(width, height, decodingContext) {
            var decoder = decodingContext.decoder;
            var contexts = decodingContext.contextCache.getContexts("GB");
            var contextLabel, i, j, pixel, row, row1, row2, bitmap = [];
            var OLD_PIXEL_MASK = 31735;
            for (i = 0; i < height; i++) {
                row = bitmap[i] = new Uint8Array(width);
                row1 = i < 1 ? row : bitmap[i - 1];
                row2 = i < 2 ? row : bitmap[i - 2];
                contextLabel = row2[0] << 13 | row2[1] << 12 | row2[2] << 11 | row1[0] << 7 | row1[1] << 6 | row1[2] << 5 | row1[3] << 4;
                for (j = 0; j < width; j++) {
                    row[j] = pixel = decoder.readBit(contexts, contextLabel);
                    contextLabel = (contextLabel & OLD_PIXEL_MASK) << 1 | (j + 3 < width ? row2[j + 3] << 11 : 0) | (j + 4 < width ? row1[j + 4] << 4 : 0) | pixel;
                }
            }
            return bitmap;
        }
        function decodeBitmap(mmr, width, height, templateIndex, prediction, skip, at, decodingContext) {
            if (mmr) {
                error("JBIG2 error: MMR encoding is not supported");
            }
            if (templateIndex === 0 && !skip && !prediction && at.length === 4 && at[0].x === 3 && at[0].y === -1 && at[1].x === -3 && at[1].y === -1 && at[2].x === 2 && at[2].y === -2 && at[3].x === -2 && at[3].y === -2) {
                return decodeBitmapTemplate0(width, height, decodingContext);
            }
            var useskip = !!skip;
            var template = CodingTemplates[templateIndex].concat(at);
            template.sort(function(a, b) {
                return a.y - b.y || a.x - b.x;
            });
            var templateLength = template.length;
            var templateX = new Int8Array(templateLength);
            var templateY = new Int8Array(templateLength);
            var changingTemplateEntries = [];
            var reuseMask = 0, minX = 0, maxX = 0, minY = 0;
            var c, k;
            for (k = 0; k < templateLength; k++) {
                templateX[k] = template[k].x;
                templateY[k] = template[k].y;
                minX = Math.min(minX, template[k].x);
                maxX = Math.max(maxX, template[k].x);
                minY = Math.min(minY, template[k].y);
                if (k < templateLength - 1 && template[k].y === template[k + 1].y && template[k].x === template[k + 1].x - 1) {
                    reuseMask |= 1 << templateLength - 1 - k;
                } else {
                    changingTemplateEntries.push(k);
                }
            }
            var changingEntriesLength = changingTemplateEntries.length;
            var changingTemplateX = new Int8Array(changingEntriesLength);
            var changingTemplateY = new Int8Array(changingEntriesLength);
            var changingTemplateBit = new Uint16Array(changingEntriesLength);
            for (c = 0; c < changingEntriesLength; c++) {
                k = changingTemplateEntries[c];
                changingTemplateX[c] = template[k].x;
                changingTemplateY[c] = template[k].y;
                changingTemplateBit[c] = 1 << templateLength - 1 - k;
            }
            var sbb_left = -minX;
            var sbb_top = -minY;
            var sbb_right = width - maxX;
            var pseudoPixelContext = ReusedContexts[templateIndex];
            var row = new Uint8Array(width);
            var bitmap = [];
            var decoder = decodingContext.decoder;
            var contexts = decodingContext.contextCache.getContexts("GB");
            var ltp = 0, j, i0, j0, contextLabel = 0, bit, shift;
            for (var i = 0; i < height; i++) {
                if (prediction) {
                    var sltp = decoder.readBit(contexts, pseudoPixelContext);
                    ltp ^= sltp;
                    if (ltp) {
                        bitmap.push(row);
                        continue;
                    }
                }
                row = new Uint8Array(row);
                bitmap.push(row);
                for (j = 0; j < width; j++) {
                    if (useskip && skip[i][j]) {
                        row[j] = 0;
                        continue;
                    }
                    if (j >= sbb_left && j < sbb_right && i >= sbb_top) {
                        contextLabel = contextLabel << 1 & reuseMask;
                        for (k = 0; k < changingEntriesLength; k++) {
                            i0 = i + changingTemplateY[k];
                            j0 = j + changingTemplateX[k];
                            bit = bitmap[i0][j0];
                            if (bit) {
                                bit = changingTemplateBit[k];
                                contextLabel |= bit;
                            }
                        }
                    } else {
                        contextLabel = 0;
                        shift = templateLength - 1;
                        for (k = 0; k < templateLength; k++, shift--) {
                            j0 = j + templateX[k];
                            if (j0 >= 0 && j0 < width) {
                                i0 = i + templateY[k];
                                if (i0 >= 0) {
                                    bit = bitmap[i0][j0];
                                    if (bit) {
                                        contextLabel |= bit << shift;
                                    }
                                }
                            }
                        }
                    }
                    var pixel = decoder.readBit(contexts, contextLabel);
                    row[j] = pixel;
                }
            }
            return bitmap;
        }
        function decodeRefinement(width, height, templateIndex, referenceBitmap, offsetX, offsetY, prediction, at, decodingContext) {
            var codingTemplate = RefinementTemplates[templateIndex].coding;
            if (templateIndex === 0) {
                codingTemplate = codingTemplate.concat([ at[0] ]);
            }
            var codingTemplateLength = codingTemplate.length;
            var codingTemplateX = new Int32Array(codingTemplateLength);
            var codingTemplateY = new Int32Array(codingTemplateLength);
            var k;
            for (k = 0; k < codingTemplateLength; k++) {
                codingTemplateX[k] = codingTemplate[k].x;
                codingTemplateY[k] = codingTemplate[k].y;
            }
            var referenceTemplate = RefinementTemplates[templateIndex].reference;
            if (templateIndex === 0) {
                referenceTemplate = referenceTemplate.concat([ at[1] ]);
            }
            var referenceTemplateLength = referenceTemplate.length;
            var referenceTemplateX = new Int32Array(referenceTemplateLength);
            var referenceTemplateY = new Int32Array(referenceTemplateLength);
            for (k = 0; k < referenceTemplateLength; k++) {
                referenceTemplateX[k] = referenceTemplate[k].x;
                referenceTemplateY[k] = referenceTemplate[k].y;
            }
            var referenceWidth = referenceBitmap[0].length;
            var referenceHeight = referenceBitmap.length;
            var pseudoPixelContext = RefinementReusedContexts[templateIndex];
            var bitmap = [];
            var decoder = decodingContext.decoder;
            var contexts = decodingContext.contextCache.getContexts("GR");
            var ltp = 0;
            for (var i = 0; i < height; i++) {
                if (prediction) {
                    var sltp = decoder.readBit(contexts, pseudoPixelContext);
                    ltp ^= sltp;
                    if (ltp) {
                        error("JBIG2 error: prediction is not supported");
                    }
                }
                var row = new Uint8Array(width);
                bitmap.push(row);
                for (var j = 0; j < width; j++) {
                    var i0, j0;
                    var contextLabel = 0;
                    for (k = 0; k < codingTemplateLength; k++) {
                        i0 = i + codingTemplateY[k];
                        j0 = j + codingTemplateX[k];
                        if (i0 < 0 || j0 < 0 || j0 >= width) {
                            contextLabel <<= 1;
                        } else {
                            contextLabel = contextLabel << 1 | bitmap[i0][j0];
                        }
                    }
                    for (k = 0; k < referenceTemplateLength; k++) {
                        i0 = i + referenceTemplateY[k] + offsetY;
                        j0 = j + referenceTemplateX[k] + offsetX;
                        if (i0 < 0 || i0 >= referenceHeight || j0 < 0 || j0 >= referenceWidth) {
                            contextLabel <<= 1;
                        } else {
                            contextLabel = contextLabel << 1 | referenceBitmap[i0][j0];
                        }
                    }
                    var pixel = decoder.readBit(contexts, contextLabel);
                    row[j] = pixel;
                }
            }
            return bitmap;
        }
        function decodeSymbolDictionary(huffman, refinement, symbols, numberOfNewSymbols, numberOfExportedSymbols, huffmanTables, templateIndex, at, refinementTemplateIndex, refinementAt, decodingContext) {
            if (huffman) {
                error("JBIG2 error: huffman is not supported");
            }
            var newSymbols = [];
            var currentHeight = 0;
            var symbolCodeLength = log2(symbols.length + numberOfNewSymbols);
            var decoder = decodingContext.decoder;
            var contextCache = decodingContext.contextCache;
            while (newSymbols.length < numberOfNewSymbols) {
                var deltaHeight = decodeInteger(contextCache, "IADH", decoder);
                currentHeight += deltaHeight;
                var currentWidth = 0;
                var totalWidth = 0;
                while (true) {
                    var deltaWidth = decodeInteger(contextCache, "IADW", decoder);
                    if (deltaWidth === null) {
                        break;
                    }
                    currentWidth += deltaWidth;
                    totalWidth += currentWidth;
                    var bitmap;
                    if (refinement) {
                        var numberOfInstances = decodeInteger(contextCache, "IAAI", decoder);
                        if (numberOfInstances > 1) {
                            bitmap = decodeTextRegion(huffman, refinement, currentWidth, currentHeight, 0, numberOfInstances, 1, symbols.concat(newSymbols), symbolCodeLength, 0, 0, 1, 0, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext);
                        } else {
                            var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
                            var rdx = decodeInteger(contextCache, "IARDX", decoder);
                            var rdy = decodeInteger(contextCache, "IARDY", decoder);
                            var symbol = symbolId < symbols.length ? symbols[symbolId] : newSymbols[symbolId - symbols.length];
                            bitmap = decodeRefinement(currentWidth, currentHeight, refinementTemplateIndex, symbol, rdx, rdy, false, refinementAt, decodingContext);
                        }
                    } else {
                        bitmap = decodeBitmap(false, currentWidth, currentHeight, templateIndex, false, null, at, decodingContext);
                    }
                    newSymbols.push(bitmap);
                }
            }
            var exportedSymbols = [];
            var flags = [], currentFlag = false;
            var totalSymbolsLength = symbols.length + numberOfNewSymbols;
            while (flags.length < totalSymbolsLength) {
                var runLength = decodeInteger(contextCache, "IAEX", decoder);
                while (runLength--) {
                    flags.push(currentFlag);
                }
                currentFlag = !currentFlag;
            }
            for (var i = 0, ii = symbols.length; i < ii; i++) {
                if (flags[i]) {
                    exportedSymbols.push(symbols[i]);
                }
            }
            for (var j = 0; j < numberOfNewSymbols; i++, j++) {
                if (flags[i]) {
                    exportedSymbols.push(newSymbols[j]);
                }
            }
            return exportedSymbols;
        }
        function decodeTextRegion(huffman, refinement, width, height, defaultPixelValue, numberOfSymbolInstances, stripSize, inputSymbols, symbolCodeLength, transposed, dsOffset, referenceCorner, combinationOperator, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext) {
            if (huffman) {
                error("JBIG2 error: huffman is not supported");
            }
            var bitmap = [];
            var i, row;
            for (i = 0; i < height; i++) {
                row = new Uint8Array(width);
                if (defaultPixelValue) {
                    for (var j = 0; j < width; j++) {
                        row[j] = defaultPixelValue;
                    }
                }
                bitmap.push(row);
            }
            var decoder = decodingContext.decoder;
            var contextCache = decodingContext.contextCache;
            var stripT = -decodeInteger(contextCache, "IADT", decoder);
            var firstS = 0;
            i = 0;
            while (i < numberOfSymbolInstances) {
                var deltaT = decodeInteger(contextCache, "IADT", decoder);
                stripT += deltaT;
                var deltaFirstS = decodeInteger(contextCache, "IAFS", decoder);
                firstS += deltaFirstS;
                var currentS = firstS;
                do {
                    var currentT = stripSize === 1 ? 0 : decodeInteger(contextCache, "IAIT", decoder);
                    var t = stripSize * stripT + currentT;
                    var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
                    var applyRefinement = refinement && decodeInteger(contextCache, "IARI", decoder);
                    var symbolBitmap = inputSymbols[symbolId];
                    var symbolWidth = symbolBitmap[0].length;
                    var symbolHeight = symbolBitmap.length;
                    if (applyRefinement) {
                        var rdw = decodeInteger(contextCache, "IARDW", decoder);
                        var rdh = decodeInteger(contextCache, "IARDH", decoder);
                        var rdx = decodeInteger(contextCache, "IARDX", decoder);
                        var rdy = decodeInteger(contextCache, "IARDY", decoder);
                        symbolWidth += rdw;
                        symbolHeight += rdh;
                        symbolBitmap = decodeRefinement(symbolWidth, symbolHeight, refinementTemplateIndex, symbolBitmap, (rdw >> 1) + rdx, (rdh >> 1) + rdy, false, refinementAt, decodingContext);
                    }
                    var offsetT = t - (referenceCorner & 1 ? 0 : symbolHeight);
                    var offsetS = currentS - (referenceCorner & 2 ? symbolWidth : 0);
                    var s2, t2, symbolRow;
                    if (transposed) {
                        for (s2 = 0; s2 < symbolHeight; s2++) {
                            row = bitmap[offsetS + s2];
                            if (!row) {
                                continue;
                            }
                            symbolRow = symbolBitmap[s2];
                            var maxWidth = Math.min(width - offsetT, symbolWidth);
                            switch (combinationOperator) {
                              case 0:
                                for (t2 = 0; t2 < maxWidth; t2++) {
                                    row[offsetT + t2] |= symbolRow[t2];
                                }
                                break;

                              case 2:
                                for (t2 = 0; t2 < maxWidth; t2++) {
                                    row[offsetT + t2] ^= symbolRow[t2];
                                }
                                break;

                              default:
                                error("JBIG2 error: operator " + combinationOperator + " is not supported");
                            }
                        }
                        currentS += symbolHeight - 1;
                    } else {
                        for (t2 = 0; t2 < symbolHeight; t2++) {
                            row = bitmap[offsetT + t2];
                            if (!row) {
                                continue;
                            }
                            symbolRow = symbolBitmap[t2];
                            switch (combinationOperator) {
                              case 0:
                                for (s2 = 0; s2 < symbolWidth; s2++) {
                                    row[offsetS + s2] |= symbolRow[s2];
                                }
                                break;

                              case 2:
                                for (s2 = 0; s2 < symbolWidth; s2++) {
                                    row[offsetS + s2] ^= symbolRow[s2];
                                }
                                break;

                              default:
                                error("JBIG2 error: operator " + combinationOperator + " is not supported");
                            }
                        }
                        currentS += symbolWidth - 1;
                    }
                    i++;
                    var deltaS = decodeInteger(contextCache, "IADS", decoder);
                    if (deltaS === null) {
                        break;
                    }
                    currentS += deltaS + dsOffset;
                } while (true);
            }
            return bitmap;
        }
        function readSegmentHeader(data, start) {
            var segmentHeader = {};
            segmentHeader.number = readUint32(data, start);
            var flags = data[start + 4];
            var segmentType = flags & 63;
            if (!SegmentTypes[segmentType]) {
                error("JBIG2 error: invalid segment type: " + segmentType);
            }
            segmentHeader.type = segmentType;
            segmentHeader.typeName = SegmentTypes[segmentType];
            segmentHeader.deferredNonRetain = !!(flags & 128);
            var pageAssociationFieldSize = !!(flags & 64);
            var referredFlags = data[start + 5];
            var referredToCount = referredFlags >> 5 & 7;
            var retainBits = [ referredFlags & 31 ];
            var position = start + 6;
            if (referredFlags === 7) {
                referredToCount = readUint32(data, position - 1) & 536870911;
                position += 3;
                var bytes = referredToCount + 7 >> 3;
                retainBits[0] = data[position++];
                while (--bytes > 0) {
                    retainBits.push(data[position++]);
                }
            } else if (referredFlags === 5 || referredFlags === 6) {
                error("JBIG2 error: invalid referred-to flags");
            }
            segmentHeader.retainBits = retainBits;
            var referredToSegmentNumberSize = segmentHeader.number <= 256 ? 1 : segmentHeader.number <= 65536 ? 2 : 4;
            var referredTo = [];
            var i, ii;
            for (i = 0; i < referredToCount; i++) {
                var number = referredToSegmentNumberSize === 1 ? data[position] : referredToSegmentNumberSize === 2 ? readUint16(data, position) : readUint32(data, position);
                referredTo.push(number);
                position += referredToSegmentNumberSize;
            }
            segmentHeader.referredTo = referredTo;
            if (!pageAssociationFieldSize) {
                segmentHeader.pageAssociation = data[position++];
            } else {
                segmentHeader.pageAssociation = readUint32(data, position);
                position += 4;
            }
            segmentHeader.length = readUint32(data, position);
            position += 4;
            if (segmentHeader.length === 4294967295) {
                if (segmentType === 38) {
                    var genericRegionInfo = readRegionSegmentInformation(data, position);
                    var genericRegionSegmentFlags = data[position + RegionSegmentInformationFieldLength];
                    var genericRegionMmr = !!(genericRegionSegmentFlags & 1);
                    var searchPatternLength = 6;
                    var searchPattern = new Uint8Array(searchPatternLength);
                    if (!genericRegionMmr) {
                        searchPattern[0] = 255;
                        searchPattern[1] = 172;
                    }
                    searchPattern[2] = genericRegionInfo.height >>> 24 & 255;
                    searchPattern[3] = genericRegionInfo.height >> 16 & 255;
                    searchPattern[4] = genericRegionInfo.height >> 8 & 255;
                    searchPattern[5] = genericRegionInfo.height & 255;
                    for (i = position, ii = data.length; i < ii; i++) {
                        var j = 0;
                        while (j < searchPatternLength && searchPattern[j] === data[i + j]) {
                            j++;
                        }
                        if (j === searchPatternLength) {
                            segmentHeader.length = i + searchPatternLength;
                            break;
                        }
                    }
                    if (segmentHeader.length === 4294967295) {
                        error("JBIG2 error: segment end was not found");
                    }
                } else {
                    error("JBIG2 error: invalid unknown segment length");
                }
            }
            segmentHeader.headerEnd = position;
            return segmentHeader;
        }
        function readSegments(header, data, start, end) {
            var segments = [];
            var position = start;
            while (position < end) {
                var segmentHeader = readSegmentHeader(data, position);
                position = segmentHeader.headerEnd;
                var segment = {
                    header: segmentHeader,
                    data: data
                };
                if (!header.randomAccess) {
                    segment.start = position;
                    position += segmentHeader.length;
                    segment.end = position;
                }
                segments.push(segment);
                if (segmentHeader.type === 51) {
                    break;
                }
            }
            if (header.randomAccess) {
                for (var i = 0, ii = segments.length; i < ii; i++) {
                    segments[i].start = position;
                    position += segments[i].header.length;
                    segments[i].end = position;
                }
            }
            return segments;
        }
        function readRegionSegmentInformation(data, start) {
            return {
                width: readUint32(data, start),
                height: readUint32(data, start + 4),
                x: readUint32(data, start + 8),
                y: readUint32(data, start + 12),
                combinationOperator: data[start + 16] & 7
            };
        }
        var RegionSegmentInformationFieldLength = 17;
        function processSegment(segment, visitor) {
            var header = segment.header;
            var data = segment.data, position = segment.start, end = segment.end;
            var args, at, i, atLength;
            switch (header.type) {
              case 0:
                var dictionary = {};
                var dictionaryFlags = readUint16(data, position);
                dictionary.huffman = !!(dictionaryFlags & 1);
                dictionary.refinement = !!(dictionaryFlags & 2);
                dictionary.huffmanDHSelector = dictionaryFlags >> 2 & 3;
                dictionary.huffmanDWSelector = dictionaryFlags >> 4 & 3;
                dictionary.bitmapSizeSelector = dictionaryFlags >> 6 & 1;
                dictionary.aggregationInstancesSelector = dictionaryFlags >> 7 & 1;
                dictionary.bitmapCodingContextUsed = !!(dictionaryFlags & 256);
                dictionary.bitmapCodingContextRetained = !!(dictionaryFlags & 512);
                dictionary.template = dictionaryFlags >> 10 & 3;
                dictionary.refinementTemplate = dictionaryFlags >> 12 & 1;
                position += 2;
                if (!dictionary.huffman) {
                    atLength = dictionary.template === 0 ? 4 : 1;
                    at = [];
                    for (i = 0; i < atLength; i++) {
                        at.push({
                            x: readInt8(data, position),
                            y: readInt8(data, position + 1)
                        });
                        position += 2;
                    }
                    dictionary.at = at;
                }
                if (dictionary.refinement && !dictionary.refinementTemplate) {
                    at = [];
                    for (i = 0; i < 2; i++) {
                        at.push({
                            x: readInt8(data, position),
                            y: readInt8(data, position + 1)
                        });
                        position += 2;
                    }
                    dictionary.refinementAt = at;
                }
                dictionary.numberOfExportedSymbols = readUint32(data, position);
                position += 4;
                dictionary.numberOfNewSymbols = readUint32(data, position);
                position += 4;
                args = [ dictionary, header.number, header.referredTo, data, position, end ];
                break;

              case 6:
              case 7:
                var textRegion = {};
                textRegion.info = readRegionSegmentInformation(data, position);
                position += RegionSegmentInformationFieldLength;
                var textRegionSegmentFlags = readUint16(data, position);
                position += 2;
                textRegion.huffman = !!(textRegionSegmentFlags & 1);
                textRegion.refinement = !!(textRegionSegmentFlags & 2);
                textRegion.stripSize = 1 << (textRegionSegmentFlags >> 2 & 3);
                textRegion.referenceCorner = textRegionSegmentFlags >> 4 & 3;
                textRegion.transposed = !!(textRegionSegmentFlags & 64);
                textRegion.combinationOperator = textRegionSegmentFlags >> 7 & 3;
                textRegion.defaultPixelValue = textRegionSegmentFlags >> 9 & 1;
                textRegion.dsOffset = textRegionSegmentFlags << 17 >> 27;
                textRegion.refinementTemplate = textRegionSegmentFlags >> 15 & 1;
                if (textRegion.huffman) {
                    var textRegionHuffmanFlags = readUint16(data, position);
                    position += 2;
                    textRegion.huffmanFS = textRegionHuffmanFlags & 3;
                    textRegion.huffmanDS = textRegionHuffmanFlags >> 2 & 3;
                    textRegion.huffmanDT = textRegionHuffmanFlags >> 4 & 3;
                    textRegion.huffmanRefinementDW = textRegionHuffmanFlags >> 6 & 3;
                    textRegion.huffmanRefinementDH = textRegionHuffmanFlags >> 8 & 3;
                    textRegion.huffmanRefinementDX = textRegionHuffmanFlags >> 10 & 3;
                    textRegion.huffmanRefinementDY = textRegionHuffmanFlags >> 12 & 3;
                    textRegion.huffmanRefinementSizeSelector = !!(textRegionHuffmanFlags & 14);
                }
                if (textRegion.refinement && !textRegion.refinementTemplate) {
                    at = [];
                    for (i = 0; i < 2; i++) {
                        at.push({
                            x: readInt8(data, position),
                            y: readInt8(data, position + 1)
                        });
                        position += 2;
                    }
                    textRegion.refinementAt = at;
                }
                textRegion.numberOfSymbolInstances = readUint32(data, position);
                position += 4;
                if (textRegion.huffman) {
                    error("JBIG2 error: huffman is not supported");
                }
                args = [ textRegion, header.referredTo, data, position, end ];
                break;

              case 38:
              case 39:
                var genericRegion = {};
                genericRegion.info = readRegionSegmentInformation(data, position);
                position += RegionSegmentInformationFieldLength;
                var genericRegionSegmentFlags = data[position++];
                genericRegion.mmr = !!(genericRegionSegmentFlags & 1);
                genericRegion.template = genericRegionSegmentFlags >> 1 & 3;
                genericRegion.prediction = !!(genericRegionSegmentFlags & 8);
                if (!genericRegion.mmr) {
                    atLength = genericRegion.template === 0 ? 4 : 1;
                    at = [];
                    for (i = 0; i < atLength; i++) {
                        at.push({
                            x: readInt8(data, position),
                            y: readInt8(data, position + 1)
                        });
                        position += 2;
                    }
                    genericRegion.at = at;
                }
                args = [ genericRegion, data, position, end ];
                break;

              case 48:
                var pageInfo = {
                    width: readUint32(data, position),
                    height: readUint32(data, position + 4),
                    resolutionX: readUint32(data, position + 8),
                    resolutionY: readUint32(data, position + 12)
                };
                if (pageInfo.height === 4294967295) {
                    delete pageInfo.height;
                }
                var pageSegmentFlags = data[position + 16];
                var pageStripingInformatiom = readUint16(data, position + 17);
                pageInfo.lossless = !!(pageSegmentFlags & 1);
                pageInfo.refinement = !!(pageSegmentFlags & 2);
                pageInfo.defaultPixelValue = pageSegmentFlags >> 2 & 1;
                pageInfo.combinationOperator = pageSegmentFlags >> 3 & 3;
                pageInfo.requiresBuffer = !!(pageSegmentFlags & 32);
                pageInfo.combinationOperatorOverride = !!(pageSegmentFlags & 64);
                args = [ pageInfo ];
                break;

              case 49:
                break;

              case 50:
                break;

              case 51:
                break;

              case 62:
                break;

              default:
                error("JBIG2 error: segment type " + header.typeName + "(" + header.type + ") is not implemented");
            }
            var callbackName = "on" + header.typeName;
            if (callbackName in visitor) {
                visitor[callbackName].apply(visitor, args);
            }
        }
        function processSegments(segments, visitor) {
            for (var i = 0, ii = segments.length; i < ii; i++) {
                processSegment(segments[i], visitor);
            }
        }
        function parseJbig2(data, start, end) {
            var position = start;
            if (data[position] !== 151 || data[position + 1] !== 74 || data[position + 2] !== 66 || data[position + 3] !== 50 || data[position + 4] !== 13 || data[position + 5] !== 10 || data[position + 6] !== 26 || data[position + 7] !== 10) {
                error("JBIG2 error: invalid header");
            }
            var header = {};
            position += 8;
            var flags = data[position++];
            header.randomAccess = !(flags & 1);
            if (!(flags & 2)) {
                header.numberOfPages = readUint32(data, position);
                position += 4;
            }
            var segments = readSegments(header, data, position, end);
            error("Not implemented");
        }
        function parseJbig2Chunks(chunks) {
            var visitor = new SimpleSegmentVisitor();
            for (var i = 0, ii = chunks.length; i < ii; i++) {
                var chunk = chunks[i];
                var segments = readSegments({}, chunk.data, chunk.start, chunk.end);
                processSegments(segments, visitor);
            }
            return visitor;
        }
        function SimpleSegmentVisitor() {}
        SimpleSegmentVisitor.prototype = {
            onPageInformation: function SimpleSegmentVisitor_onPageInformation(info) {
                this.currentPageInfo = info;
                var rowSize = info.width + 7 >> 3;
                var buffer = new Uint8Array(rowSize * info.height);
                if (info.defaultPixelValue) {
                    for (var i = 0, ii = buffer.length; i < ii; i++) {
                        buffer[i] = 255;
                    }
                }
                this.buffer = buffer;
            },
            drawBitmap: function SimpleSegmentVisitor_drawBitmap(regionInfo, bitmap) {
                var pageInfo = this.currentPageInfo;
                var width = regionInfo.width, height = regionInfo.height;
                var rowSize = pageInfo.width + 7 >> 3;
                var combinationOperator = pageInfo.combinationOperatorOverride ? regionInfo.combinationOperator : pageInfo.combinationOperator;
                var buffer = this.buffer;
                var mask0 = 128 >> (regionInfo.x & 7);
                var offset0 = regionInfo.y * rowSize + (regionInfo.x >> 3);
                var i, j, mask, offset;
                switch (combinationOperator) {
                  case 0:
                    for (i = 0; i < height; i++) {
                        mask = mask0;
                        offset = offset0;
                        for (j = 0; j < width; j++) {
                            if (bitmap[i][j]) {
                                buffer[offset] |= mask;
                            }
                            mask >>= 1;
                            if (!mask) {
                                mask = 128;
                                offset++;
                            }
                        }
                        offset0 += rowSize;
                    }
                    break;

                  case 2:
                    for (i = 0; i < height; i++) {
                        mask = mask0;
                        offset = offset0;
                        for (j = 0; j < width; j++) {
                            if (bitmap[i][j]) {
                                buffer[offset] ^= mask;
                            }
                            mask >>= 1;
                            if (!mask) {
                                mask = 128;
                                offset++;
                            }
                        }
                        offset0 += rowSize;
                    }
                    break;

                  default:
                    error("JBIG2 error: operator " + combinationOperator + " is not supported");
                }
            },
            onImmediateGenericRegion: function SimpleSegmentVisitor_onImmediateGenericRegion(region, data, start, end) {
                var regionInfo = region.info;
                var decodingContext = new DecodingContext(data, start, end);
                var bitmap = decodeBitmap(region.mmr, regionInfo.width, regionInfo.height, region.template, region.prediction, null, region.at, decodingContext);
                this.drawBitmap(regionInfo, bitmap);
            },
            onImmediateLosslessGenericRegion: function SimpleSegmentVisitor_onImmediateLosslessGenericRegion() {
                this.onImmediateGenericRegion.apply(this, arguments);
            },
            onSymbolDictionary: function SimpleSegmentVisitor_onSymbolDictionary(dictionary, currentSegment, referredSegments, data, start, end) {
                var huffmanTables;
                if (dictionary.huffman) {
                    error("JBIG2 error: huffman is not supported");
                }
                var symbols = this.symbols;
                if (!symbols) {
                    this.symbols = symbols = {};
                }
                var inputSymbols = [];
                for (var i = 0, ii = referredSegments.length; i < ii; i++) {
                    inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
                }
                var decodingContext = new DecodingContext(data, start, end);
                symbols[currentSegment] = decodeSymbolDictionary(dictionary.huffman, dictionary.refinement, inputSymbols, dictionary.numberOfNewSymbols, dictionary.numberOfExportedSymbols, huffmanTables, dictionary.template, dictionary.at, dictionary.refinementTemplate, dictionary.refinementAt, decodingContext);
            },
            onImmediateTextRegion: function SimpleSegmentVisitor_onImmediateTextRegion(region, referredSegments, data, start, end) {
                var regionInfo = region.info;
                var huffmanTables;
                var symbols = this.symbols;
                var inputSymbols = [];
                for (var i = 0, ii = referredSegments.length; i < ii; i++) {
                    inputSymbols = inputSymbols.concat(symbols[referredSegments[i]]);
                }
                var symbolCodeLength = log2(inputSymbols.length);
                var decodingContext = new DecodingContext(data, start, end);
                var bitmap = decodeTextRegion(region.huffman, region.refinement, regionInfo.width, regionInfo.height, region.defaultPixelValue, region.numberOfSymbolInstances, region.stripSize, inputSymbols, symbolCodeLength, region.transposed, region.dsOffset, region.referenceCorner, region.combinationOperator, huffmanTables, region.refinementTemplate, region.refinementAt, decodingContext);
                this.drawBitmap(regionInfo, bitmap);
            },
            onImmediateLosslessTextRegion: function SimpleSegmentVisitor_onImmediateLosslessTextRegion() {
                this.onImmediateTextRegion.apply(this, arguments);
            }
        };
        function Jbig2Image() {}
        Jbig2Image.prototype = {
            parseChunks: function Jbig2Image_parseChunks(chunks) {
                return parseJbig2Chunks(chunks);
            }
        };
        return Jbig2Image;
    }();
    function log2(x) {
        var n = 1, i = 0;
        while (x > n) {
            n <<= 1;
            i++;
        }
        return i;
    }
    function readInt8(data, start) {
        return data[start] << 24 >> 24;
    }
    function readUint16(data, offset) {
        return data[offset] << 8 | data[offset + 1];
    }
    function readUint32(data, offset) {
        return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
    }
    function shadow(obj, prop, value) {
        Object.defineProperty(obj, prop, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: false
        });
        return value;
    }
    var error = function() {
        console.error.apply(console, arguments);
        throw new Error("PDFJS error: " + arguments[0]);
    };
    var warn = function() {
        console.warn.apply(console, arguments);
    };
    var info = function() {
        console.info.apply(console, arguments);
    };
    Jbig2Image.prototype.parse = function parseJbig2(data) {
        var position = 0, end = data.length;
        if (data[position] !== 151 || data[position + 1] !== 74 || data[position + 2] !== 66 || data[position + 3] !== 50 || data[position + 4] !== 13 || data[position + 5] !== 10 || data[position + 6] !== 26 || data[position + 7] !== 10) {
            error("JBIG2 error: invalid header");
        }
        var header = {};
        position += 8;
        var flags = data[position++];
        header.randomAccess = !(flags & 1);
        if (!(flags & 2)) {
            header.numberOfPages = readUint32(data, position);
            position += 4;
        }
        var visitor = this.parseChunks([ {
            data: data,
            start: position,
            end: end
        } ]);
        var width = visitor.currentPageInfo.width;
        var height = visitor.currentPageInfo.height;
        var bitPacked = visitor.buffer;
        var data = new Uint8Array(width * height);
        var q = 0, k = 0;
        for (var i = 0; i < height; i++) {
            var mask = 0, buffer;
            for (var j = 0; j < width; j++) {
                if (!mask) {
                    mask = 128;
                    buffer = bitPacked[k++];
                }
                data[q++] = buffer & mask ? 0 : 255;
                mask >>= 1;
            }
        }
        this.width = width;
        this.height = height;
        this.data = data;
    };
    PDFJS.JpegImage = JpegImage;
    PDFJS.JpxImage = JpxImage;
    PDFJS.Jbig2Image = Jbig2Image;
})(PDFJS || (PDFJS = {}));

var JpegDecoder = PDFJS.JpegImage;

var JpxDecoder = PDFJS.JpxImage;

var Jbig2Decoder = PDFJS.Jbig2Image;

if (true) {
    module.exports = {
        JpegImage: JpegImage,
        JpegDecoder: JpegDecoder,
        JpxDecoder: JpxDecoder,
        Jbig2Decoder: Jbig2Decoder
    };
}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * Converts raw data volumes to the appropriate format required by the frontend.
 */

var base_1 = __webpack_require__(12);
var uint32array_builder_ts_1 = __webpack_require__(40);
var encode_uint32_1 = __webpack_require__(41);
var encode_uint64_1 = __webpack_require__(43);
var tempBuffer = new uint32array_builder_ts_1.Uint32ArrayBuilder(20000);
function postProcessRawData(chunk, data) {
    var spec = chunk.source.spec;

    if (spec.compressedSegmentationBlockSize) {
        var dataType = spec.dataType;

        tempBuffer.clear();
        switch (dataType) {
            case base_1.DataType.UINT32:
                encode_uint32_1.encodeChannel(tempBuffer, spec.compressedSegmentationBlockSize, data, chunk.chunkDataSize);
                break;
            case base_1.DataType.UINT64:
                encode_uint64_1.encodeChannel(tempBuffer, spec.compressedSegmentationBlockSize, data, chunk.chunkDataSize);
                break;
            default:
                throw new Error(`Unsupported data type for compressed segmentation: ${ base_1.DataType[dataType] }`);
        }
        chunk.data = new Uint32Array(tempBuffer.view);
    } else {
        chunk.data = data;
    }
}
exports.postProcessRawData = postProcessRawData;

/***/ },
/* 40 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Uint32ArrayBuilder = function () {
    function Uint32ArrayBuilder() {
        var initialCapacity = arguments.length <= 0 || arguments[0] === undefined ? 16 : arguments[0];

        _classCallCheck(this, Uint32ArrayBuilder);

        this.length = 0;
        this.data = new Uint32Array(initialCapacity);
    }

    _createClass(Uint32ArrayBuilder, [{
        key: "resize",
        value: function resize(newLength) {
            var data = this.data;

            if (newLength > data.length) {
                var newData = new Uint32Array(Math.max(newLength, data.length * 2));
                newData.set(data.subarray(0, this.length));
                this.data = newData;
            }
            this.length = newLength;
        }
    }, {
        key: "shrinkToFit",
        value: function shrinkToFit() {
            this.data = new Uint32Array(this.view);
        }
    }, {
        key: "clear",
        value: function clear() {
            this.length = 0;
        }
    }, {
        key: "appendArray",
        value: function appendArray(other) {
            var length = this.length;

            this.resize(length + other.length);
            this.data.set(other, length);
        }
    }, {
        key: "view",
        get: function () {
            var data = this.data;

            return new Uint32Array(data.buffer, data.byteOffset, this.length);
        }
    }]);

    return Uint32ArrayBuilder;
}();

exports.Uint32ArrayBuilder = Uint32ArrayBuilder;
;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * @file
 * Support for compressing uint32/uint64 segment label chunks.
 */

var encode_common_ts_1 = __webpack_require__(42);
var array_1 = __webpack_require__(26);
var encode_common_ts_2 = __webpack_require__(42);
exports.newCache = encode_common_ts_2.newCache;
var tempEncodingBuffer = void 0;
var tempValuesBuffer1 = void 0;
var tempValuesBuffer2 = void 0;
var tempIndexBuffer1 = void 0;
var tempIndexBuffer2 = void 0;
var uint32sPerElement = 1;
function encodeBlock(rawData, inputOffset, inputStrides, blockSize, actualSize, baseOffset, cache, output) {
    var ax = actualSize[0],
        ay = actualSize[1],
        az = actualSize[2];
    var bx = blockSize[0],
        by = blockSize[1],
        bz = blockSize[2];
    var sx = inputStrides[0],
        sy = inputStrides[1],
        sz = inputStrides[2];
    sz -= sy * ay;
    sy -= sx * ax;
    if (ax * ay * az === 0) {
        return [0, 0];
    }
    var numBlockElements = bx * by * bz + 31; // Add padding elements.
    if (tempEncodingBuffer === undefined || tempEncodingBuffer.length < numBlockElements) {
        tempEncodingBuffer = new Uint32Array(numBlockElements);
        tempValuesBuffer1 = new Uint32Array(numBlockElements * uint32sPerElement);
        tempValuesBuffer2 = new Uint32Array(numBlockElements * uint32sPerElement);
        tempIndexBuffer1 = new Uint32Array(numBlockElements);
        tempIndexBuffer2 = new Uint32Array(numBlockElements);
    }
    var encodingBuffer = tempEncodingBuffer.subarray(0, numBlockElements);
    encodingBuffer.fill(0);
    var valuesBuffer1 = tempValuesBuffer1;
    var valuesBuffer2 = tempValuesBuffer2;
    var indexBuffer1 = tempIndexBuffer1;
    var indexBuffer2 = tempIndexBuffer2;
    var noAdjacentDuplicateIndex = 0;
    {
        var prevLow = rawData[inputOffset] + 1 >>> 0;
        var curInputOff = inputOffset;
        var blockElementIndex = 0;
        var bsy = bx - ax;
        var bsz = bx * by - bx * ay;
        for (var z = 0; z < az; ++z, curInputOff += sz, blockElementIndex += bsz) {
            for (var y = 0; y < ay; ++y, curInputOff += sy, blockElementIndex += bsy) {
                for (var x = 0; x < ax; ++x, curInputOff += sx) {
                    var valueLow = rawData[curInputOff];
                    if (valueLow !== prevLow) {
                        prevLow = valuesBuffer1[noAdjacentDuplicateIndex * 1] = valueLow;
                        indexBuffer1[noAdjacentDuplicateIndex] = noAdjacentDuplicateIndex++;
                    }
                    encodingBuffer[blockElementIndex++] = noAdjacentDuplicateIndex;
                }
            }
        }
    }
    indexBuffer1.subarray(0, noAdjacentDuplicateIndex).sort((a, b) => {
        return valuesBuffer1[a] - valuesBuffer1[b];
    });
    var numUniqueValues = -1;
    {
        var _prevLow = valuesBuffer1[indexBuffer1[0] * uint32sPerElement] + 1 >>> 0;
        for (var i = 0; i < noAdjacentDuplicateIndex; ++i) {
            var index = indexBuffer1[i];
            var valueIndex = index * uint32sPerElement;
            var _valueLow = valuesBuffer1[valueIndex];
            if (_valueLow !== _prevLow) {
                ++numUniqueValues;
                var outputIndex2 = numUniqueValues * uint32sPerElement;
                _prevLow = valuesBuffer2[outputIndex2] = _valueLow;
            }
            indexBuffer2[index + 1] = numUniqueValues;
        }
        ++numUniqueValues;
    }
    return encode_common_ts_1.writeBlock(output, baseOffset, cache, bx * by * bz, numUniqueValues, valuesBuffer2, encodingBuffer, indexBuffer2, uint32sPerElement);
}
exports.encodeBlock = encodeBlock;
function encodeChannel(output, blockSize, rawData, volumeSize) {
    var baseInputOffset = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var inputStrides = arguments.length <= 5 || arguments[5] === undefined ? array_1.getFortranOrderStrides(volumeSize, 1) : arguments[5];

    return encode_common_ts_1.encodeChannel(output, blockSize, rawData, volumeSize, baseInputOffset, inputStrides, encodeBlock);
}
exports.encodeChannel = encodeChannel;
function encodeChannels(output, blockSize, rawData, volumeSize) {
    var baseInputOffset = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var inputStrides = arguments.length <= 5 || arguments[5] === undefined ? array_1.getFortranOrderStrides(volumeSize, 1) : arguments[5];

    return encode_common_ts_1.encodeChannels(output, blockSize, rawData, volumeSize, baseInputOffset, inputStrides, encodeBlock);
}
exports.encodeChannels = encodeChannels;

/***/ },
/* 42 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.BLOCK_HEADER_SIZE = 2;
function newCache() {
    return new Map();
}
exports.newCache = newCache;
function writeEncodedRepresentation(outputData, outputOffset, encodingBuffer, indexBuffer, encodedBits, encodedSize32Bits) {
    // Write encoded representation.
    if (encodedBits > 0) {
        switch (encodedBits) {
            case 1:
                {
                    for (var wordIndex = 0, elementIndex = 0; wordIndex < encodedSize32Bits; ++wordIndex) {
                        var word = 0;
                        word |= indexBuffer[encodingBuffer[elementIndex + 0]] << 0;
                        word |= indexBuffer[encodingBuffer[elementIndex + 1]] << 1;
                        word |= indexBuffer[encodingBuffer[elementIndex + 2]] << 2;
                        word |= indexBuffer[encodingBuffer[elementIndex + 3]] << 3;
                        word |= indexBuffer[encodingBuffer[elementIndex + 4]] << 4;
                        word |= indexBuffer[encodingBuffer[elementIndex + 5]] << 5;
                        word |= indexBuffer[encodingBuffer[elementIndex + 6]] << 6;
                        word |= indexBuffer[encodingBuffer[elementIndex + 7]] << 7;
                        word |= indexBuffer[encodingBuffer[elementIndex + 8]] << 8;
                        word |= indexBuffer[encodingBuffer[elementIndex + 9]] << 9;
                        word |= indexBuffer[encodingBuffer[elementIndex + 10]] << 10;
                        word |= indexBuffer[encodingBuffer[elementIndex + 11]] << 11;
                        word |= indexBuffer[encodingBuffer[elementIndex + 12]] << 12;
                        word |= indexBuffer[encodingBuffer[elementIndex + 13]] << 13;
                        word |= indexBuffer[encodingBuffer[elementIndex + 14]] << 14;
                        word |= indexBuffer[encodingBuffer[elementIndex + 15]] << 15;
                        word |= indexBuffer[encodingBuffer[elementIndex + 16]] << 16;
                        word |= indexBuffer[encodingBuffer[elementIndex + 17]] << 17;
                        word |= indexBuffer[encodingBuffer[elementIndex + 18]] << 18;
                        word |= indexBuffer[encodingBuffer[elementIndex + 19]] << 19;
                        word |= indexBuffer[encodingBuffer[elementIndex + 20]] << 20;
                        word |= indexBuffer[encodingBuffer[elementIndex + 21]] << 21;
                        word |= indexBuffer[encodingBuffer[elementIndex + 22]] << 22;
                        word |= indexBuffer[encodingBuffer[elementIndex + 23]] << 23;
                        word |= indexBuffer[encodingBuffer[elementIndex + 24]] << 24;
                        word |= indexBuffer[encodingBuffer[elementIndex + 25]] << 25;
                        word |= indexBuffer[encodingBuffer[elementIndex + 26]] << 26;
                        word |= indexBuffer[encodingBuffer[elementIndex + 27]] << 27;
                        word |= indexBuffer[encodingBuffer[elementIndex + 28]] << 28;
                        word |= indexBuffer[encodingBuffer[elementIndex + 29]] << 29;
                        word |= indexBuffer[encodingBuffer[elementIndex + 30]] << 30;
                        word |= indexBuffer[encodingBuffer[elementIndex + 31]] << 31;
                        outputData[outputOffset + wordIndex] = word;
                        elementIndex += 32;
                    }
                }
                break;
            case 2:
                {
                    for (var _wordIndex = 0, _elementIndex = 0; _wordIndex < encodedSize32Bits; ++_wordIndex) {
                        var _word = 0;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 0]] << 0;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 1]] << 2;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 2]] << 4;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 3]] << 6;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 4]] << 8;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 5]] << 10;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 6]] << 12;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 7]] << 14;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 8]] << 16;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 9]] << 18;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 10]] << 20;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 11]] << 22;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 12]] << 24;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 13]] << 26;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 14]] << 28;
                        _word |= indexBuffer[encodingBuffer[_elementIndex + 15]] << 30;
                        outputData[outputOffset + _wordIndex] = _word;
                        _elementIndex += 16;
                    }
                }
                break;
            case 4:
                {
                    for (var _wordIndex2 = 0, _elementIndex2 = 0; _wordIndex2 < encodedSize32Bits; ++_wordIndex2) {
                        var _word2 = 0;
                        _word2 |= indexBuffer[encodingBuffer[_elementIndex2 + 0]] << 0;
                        _word2 |= indexBuffer[encodingBuffer[_elementIndex2 + 1]] << 4;
                        _word2 |= indexBuffer[encodingBuffer[_elementIndex2 + 2]] << 8;
                        _word2 |= indexBuffer[encodingBuffer[_elementIndex2 + 3]] << 12;
                        _word2 |= indexBuffer[encodingBuffer[_elementIndex2 + 4]] << 16;
                        _word2 |= indexBuffer[encodingBuffer[_elementIndex2 + 5]] << 20;
                        _word2 |= indexBuffer[encodingBuffer[_elementIndex2 + 6]] << 24;
                        _word2 |= indexBuffer[encodingBuffer[_elementIndex2 + 7]] << 28;
                        outputData[outputOffset + _wordIndex2] = _word2;
                        _elementIndex2 += 8;
                    }
                }
                break;
            case 8:
                {
                    for (var _wordIndex3 = 0, _elementIndex3 = 0; _wordIndex3 < encodedSize32Bits; ++_wordIndex3) {
                        var _word3 = 0;
                        _word3 |= indexBuffer[encodingBuffer[_elementIndex3 + 0]] << 0;
                        _word3 |= indexBuffer[encodingBuffer[_elementIndex3 + 1]] << 8;
                        _word3 |= indexBuffer[encodingBuffer[_elementIndex3 + 2]] << 16;
                        _word3 |= indexBuffer[encodingBuffer[_elementIndex3 + 3]] << 24;
                        outputData[outputOffset + _wordIndex3] = _word3;
                        _elementIndex3 += 4;
                    }
                }
                break;
            case 16:
                {
                    for (var _wordIndex4 = 0, _elementIndex4 = 0; _wordIndex4 < encodedSize32Bits; ++_wordIndex4) {
                        var _word4 = 0;
                        _word4 |= indexBuffer[encodingBuffer[_elementIndex4 + 0]] << 0;
                        _word4 |= indexBuffer[encodingBuffer[_elementIndex4 + 1]] << 16;
                        outputData[outputOffset + _wordIndex4] = _word4;
                        _elementIndex4 += 2;
                    }
                }
                break;
            case 32:
                {
                    for (var _wordIndex5 = 0, _elementIndex5 = 0; _wordIndex5 < encodedSize32Bits; ++_wordIndex5) {
                        var _word5 = 0;
                        _word5 |= indexBuffer[encodingBuffer[_elementIndex5 + 0]] << 0;
                        outputData[outputOffset + _wordIndex5] = _word5;
                        _elementIndex5 += 1;
                    }
                }
                break;
        }
    }
}
function writeBlock(output, baseOffset, cache, numBlockElements, numUniqueValues, valuesBuffer2, encodingBuffer, indexBuffer2, uint32sPerElement) {
    var encodedBits = void 0;
    if (numUniqueValues === 1) {
        encodedBits = 0;
    } else {
        encodedBits = 1;
        while (1 << encodedBits < numUniqueValues) {
            encodedBits *= 2;
        }
    }
    var encodedSize32bits = Math.ceil(encodedBits * numBlockElements / 32);
    var encodedValueBaseOffset = output.length;
    var elementsToWrite = encodedSize32bits;
    var writeTable = false;
    var key = Array.prototype.join.call(valuesBuffer2.subarray(0, numUniqueValues * uint32sPerElement), ',');
    var tableOffset = cache.get(key);
    if (tableOffset === undefined) {
        writeTable = true;
        elementsToWrite += numUniqueValues * uint32sPerElement;
        tableOffset = encodedValueBaseOffset + encodedSize32bits - baseOffset;
        cache.set(key, tableOffset);
    }
    output.resize(encodedValueBaseOffset + elementsToWrite);
    var outputData = output.data;
    writeEncodedRepresentation(outputData, encodedValueBaseOffset, encodingBuffer, indexBuffer2, encodedBits, encodedSize32bits);
    // Write table
    if (writeTable) {
        var curOutputOff = encodedValueBaseOffset + encodedSize32bits;
        for (var i = 0, length = numUniqueValues * uint32sPerElement; i < length; ++i) {
            outputData[curOutputOff++] = valuesBuffer2[i];
        }
    }
    return [encodedBits, tableOffset];
}
exports.writeBlock = writeBlock;
function encodeChannel(output, blockSize, rawData, volumeSize, baseInputOffset, inputStrides, encodeBlock) {
    // Maps a sorted list of table entries in the form <low>,<high>,<low>,<high>,... to the table
    // offset relative to baseOffset.
    var cache = newCache();
    var gridSize = new Array(3);
    var blockIndexSize = exports.BLOCK_HEADER_SIZE;
    for (var i = 0; i < 3; ++i) {
        var curGridSize = gridSize[i] = Math.ceil(volumeSize[i] / blockSize[i]);
        blockIndexSize *= curGridSize;
    }
    var gx = gridSize[0],
        gy = gridSize[1],
        gz = gridSize[2];
    var xSize = volumeSize[0],
        ySize = volumeSize[1],
        zSize = volumeSize[2];
    var xBlockSize = blockSize[0],
        yBlockSize = blockSize[1],
        zBlockSize = blockSize[2];
    var baseOffset = output.length;
    var headerOffset = baseOffset;
    var actualSize = [0, 0, 0];
    output.resize(baseOffset + blockIndexSize);
    var sx = inputStrides[0],
        sy = inputStrides[1],
        sz = inputStrides[2];
    for (var bz = 0; bz < gz; ++bz) {
        actualSize[2] = Math.min(zBlockSize, zSize - bz * zBlockSize);
        for (var by = 0; by < gy; ++by) {
            actualSize[1] = Math.min(yBlockSize, ySize - by * yBlockSize);
            for (var bx = 0; bx < gx; ++bx) {
                actualSize[0] = Math.min(xBlockSize, xSize - bx * xBlockSize);
                var inputOffset = bz * zBlockSize * sz + by * yBlockSize * sy + bx * xBlockSize * sx;
                var encodedValueBaseOffset = output.length - baseOffset;

                var _encodeBlock = encodeBlock(rawData, baseInputOffset + inputOffset, inputStrides, blockSize, actualSize, baseOffset, cache, output);

                var _encodeBlock2 = _slicedToArray(_encodeBlock, 2);

                var encodedBits = _encodeBlock2[0];
                var tableOffset = _encodeBlock2[1];

                var outputData = output.data;
                outputData[headerOffset++] = tableOffset | encodedBits << 24;
                outputData[headerOffset++] = encodedValueBaseOffset;
            }
        }
    }
}
exports.encodeChannel = encodeChannel;
function encodeChannels(output, blockSize, rawData, volumeSize, baseInputOffset, inputStrides, encodeBlock) {
    var channelOffsetOutputBase = output.length;
    var numChannels = volumeSize[3];
    output.resize(channelOffsetOutputBase + numChannels);
    for (var channel = 0; channel < numChannels; ++channel) {
        output.data[channelOffsetOutputBase + channel] = output.length;
        encodeChannel(output, blockSize, rawData, volumeSize, baseInputOffset + inputStrides[3] * channel, inputStrides, encodeBlock);
    }
}
exports.encodeChannels = encodeChannels;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * @file
 * Support for compressing uint32/uint64 segment label chunks.
 */

var encode_common_ts_1 = __webpack_require__(42);
var array_1 = __webpack_require__(26);
var encode_common_ts_2 = __webpack_require__(42);
exports.newCache = encode_common_ts_2.newCache;
var tempEncodingBuffer = void 0;
var tempValuesBuffer1 = void 0;
var tempValuesBuffer2 = void 0;
var tempIndexBuffer1 = void 0;
var tempIndexBuffer2 = void 0;
var uint32sPerElement = 2;
function encodeBlock(rawData, inputOffset, inputStrides, blockSize, actualSize, baseOffset, cache, output) {
    var ax = actualSize[0],
        ay = actualSize[1],
        az = actualSize[2];
    var bx = blockSize[0],
        by = blockSize[1],
        bz = blockSize[2];
    var sx = inputStrides[0],
        sy = inputStrides[1],
        sz = inputStrides[2];
    sz -= sy * ay;
    sy -= sx * ax;
    if (ax * ay * az === 0) {
        return [0, 0];
    }
    var numBlockElements = bx * by * bz + 31; // Add padding elements.
    if (tempEncodingBuffer === undefined || tempEncodingBuffer.length < numBlockElements) {
        tempEncodingBuffer = new Uint32Array(numBlockElements);
        tempValuesBuffer1 = new Uint32Array(numBlockElements * uint32sPerElement);
        tempValuesBuffer2 = new Uint32Array(numBlockElements * uint32sPerElement);
        tempIndexBuffer1 = new Uint32Array(numBlockElements);
        tempIndexBuffer2 = new Uint32Array(numBlockElements);
    }
    var encodingBuffer = tempEncodingBuffer.subarray(0, numBlockElements);
    encodingBuffer.fill(0);
    var valuesBuffer1 = tempValuesBuffer1;
    var valuesBuffer2 = tempValuesBuffer2;
    var indexBuffer1 = tempIndexBuffer1;
    var indexBuffer2 = tempIndexBuffer2;
    var noAdjacentDuplicateIndex = 0;
    {
        var prevLow = rawData[inputOffset] + 1 >>> 0;
        var prevHigh = 0;
        var curInputOff = inputOffset;
        var blockElementIndex = 0;
        var bsy = bx - ax;
        var bsz = bx * by - bx * ay;
        for (var z = 0; z < az; ++z, curInputOff += sz, blockElementIndex += bsz) {
            for (var y = 0; y < ay; ++y, curInputOff += sy, blockElementIndex += bsy) {
                for (var x = 0; x < ax; ++x, curInputOff += sx) {
                    var valueLow = rawData[curInputOff];
                    var valueHigh = rawData[curInputOff + 1];
                    if (valueLow !== prevLow || valueHigh !== prevHigh) {
                        prevLow = valuesBuffer1[noAdjacentDuplicateIndex * 2] = valueLow;
                        prevHigh = valuesBuffer1[noAdjacentDuplicateIndex * 2 + 1] = valueHigh;
                        indexBuffer1[noAdjacentDuplicateIndex] = noAdjacentDuplicateIndex++;
                    }
                    encodingBuffer[blockElementIndex++] = noAdjacentDuplicateIndex;
                }
            }
        }
    }
    indexBuffer1.subarray(0, noAdjacentDuplicateIndex).sort((a, b) => {
        var aHigh = valuesBuffer1[2 * a + 1];
        var bHigh = valuesBuffer1[2 * b + 1];
        var aLow = valuesBuffer1[2 * a];
        var bLow = valuesBuffer1[2 * b];
        return aHigh - bHigh || aLow - bLow;
    });
    var numUniqueValues = -1;
    {
        var _prevLow = valuesBuffer1[indexBuffer1[0] * uint32sPerElement] + 1 >>> 0;
        var _prevHigh = 0;
        for (var i = 0; i < noAdjacentDuplicateIndex; ++i) {
            var index = indexBuffer1[i];
            var valueIndex = index * uint32sPerElement;
            var _valueLow = valuesBuffer1[valueIndex];
            var _valueHigh = valuesBuffer1[valueIndex + 1];
            if (_valueLow !== _prevLow || _valueHigh !== _prevHigh) {
                ++numUniqueValues;
                var outputIndex2 = numUniqueValues * uint32sPerElement;
                _prevLow = valuesBuffer2[outputIndex2] = _valueLow;
                _prevHigh = valuesBuffer2[outputIndex2 + 1] = _valueHigh;
            }
            indexBuffer2[index + 1] = numUniqueValues;
        }
        ++numUniqueValues;
    }
    return encode_common_ts_1.writeBlock(output, baseOffset, cache, bx * by * bz, numUniqueValues, valuesBuffer2, encodingBuffer, indexBuffer2, uint32sPerElement);
}
exports.encodeBlock = encodeBlock;
function encodeChannel(output, blockSize, rawData, volumeSize) {
    var baseInputOffset = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var inputStrides = arguments.length <= 5 || arguments[5] === undefined ? array_1.getFortranOrderStrides(volumeSize, 2) : arguments[5];

    return encode_common_ts_1.encodeChannel(output, blockSize, rawData, volumeSize, baseInputOffset, inputStrides, encodeBlock);
}
exports.encodeChannel = encodeChannel;
function encodeChannels(output, blockSize, rawData, volumeSize) {
    var baseInputOffset = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var inputStrides = arguments.length <= 5 || arguments[5] === undefined ? array_1.getFortranOrderStrides(volumeSize, 2) : arguments[5];

    return encode_common_ts_1.encodeChannels(output, blockSize, rawData, volumeSize, baseInputOffset, inputStrides, encodeBlock);
}
exports.encodeChannels = encodeChannels;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var base_1 = __webpack_require__(12);
var geom_1 = __webpack_require__(14);
var postprocess_1 = __webpack_require__(39);
function decodeRawChunk(chunk, response) {
    var spec = chunk.source.spec;
    var dataType = spec.dataType;

    var numElements = geom_1.prod3(chunk.chunkDataSize);
    var bytesPerElement = base_1.DATA_TYPE_BYTES[dataType];
    var expectedBytes = numElements * bytesPerElement;
    if (expectedBytes !== response.byteLength) {
        throw new Error(`Raw-format chunk is ${ response.byteLength } bytes, but ${ numElements } * ${ bytesPerElement } = ${ expectedBytes } bytes are expected.`);
    }
    var data = void 0;
    switch (dataType) {
        case base_1.DataType.UINT8:
            data = new Uint8Array(response);
            break;
        case base_1.DataType.FLOAT32:
            data = new Float32Array(response);
            break;
        case base_1.DataType.UINT32:
        case base_1.DataType.UINT64:
            data = new Uint32Array(response);
            break;
    }
    postprocess_1.postProcessRawData(chunk, data);
}
exports.decodeRawChunk = decodeRawChunk;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var backend_1 = __webpack_require__(4);
var backend_2 = __webpack_require__(11);
var jpeg_1 = __webpack_require__(36);
var ndstoreNpz_1 = __webpack_require__(46);
var http_request_1 = __webpack_require__(32);
var worker_rpc_1 = __webpack_require__(2);
var chunkDecoders = new Map();
chunkDecoders.set('npz', ndstoreNpz_1.decodeNdstoreNpzChunk);
chunkDecoders.set('jpeg', jpeg_1.decodeJpegChunk);

var VolumeChunkSource = function (_backend_2$VolumeChun) {
    _inherits(VolumeChunkSource, _backend_2$VolumeChun);

    function VolumeChunkSource(rpc, options) {
        _classCallCheck(this, VolumeChunkSource);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunkSource).call(this, rpc, options));

        _this.hostnames = options['hostnames'];
        _this.key = options['key'];
        _this.channel = options['channel'];
        _this.resolution = options['resolution'];
        _this.encoding = options['encoding'];
        _this.chunkDecoder = chunkDecoders.get(_this.encoding);
        return _this;
    }

    _createClass(VolumeChunkSource, [{
        key: 'download',
        value: function download(chunk) {
            var path = `/ocp/ca/${ this.key }/${ this.channel }/${ this.encoding }/${ this.resolution }`;
            {
                // chunkPosition must not be captured, since it will be invalidated by the next call to
                // computeChunkBounds.
                var chunkPosition = this.computeChunkBounds(chunk);
                var chunkDataSize = chunk.chunkDataSize;

                for (var i = 0; i < 3; ++i) {
                    path += `/${ chunkPosition[i] },${ chunkPosition[i] + chunkDataSize[i] }`;
                }
            }
            path += `/neariso/`;
            backend_1.handleChunkDownloadPromise(chunk, http_request_1.sendHttpRequest(http_request_1.openShardedHttpRequest(this.hostnames, path), 'arraybuffer'), this.chunkDecoder);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return `ndstore:volume:${ this.hostnames[0] }/${ this.key }/${ this.channel }/${ this.resolution }/${ this.encoding }`;
        }
    }]);

    return VolumeChunkSource;
}(backend_2.VolumeChunkSource);

;
worker_rpc_1.registerSharedObject('ndstore/VolumeChunkSource', VolumeChunkSource);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * This decodes the NDStore (https://github.com/neurodata/ndstore) NPZ format, which is the Python
 * NPY binary format with zlib encoding.
 *
 * This is NOT the same as the Python NPZ format, which is a ZIP file containing multiple files
 * (each corresponding to a different variable) in NPY binary format.
 */

var base_1 = __webpack_require__(12);
var npy_1 = __webpack_require__(47);
var pako_1 = __webpack_require__(49);
var geom_1 = __webpack_require__(14);
var postprocess_1 = __webpack_require__(39);
function decodeNdstoreNpzChunk(chunk, response) {
    var parseResult = npy_1.parseNpy(pako_1.inflate(new Uint8Array(response)));
    var chunkDataSize = chunk.chunkDataSize;
    var source = chunk.source;
    var shape = parseResult.shape;

    if (shape.length !== 4 || shape[0] !== 1 || shape[1] !== chunkDataSize[2] || shape[2] !== chunkDataSize[1] || shape[3] !== chunkDataSize[0]) {
        throw new Error(`Shape ${ JSON.stringify(shape) } does not match chunkDataSize ${ geom_1.vec3Key(chunkDataSize) }`);
    }
    var parsedDataType = parseResult.dataType.dataType;
    var spec = source.spec;

    if (parsedDataType !== spec.dataType) {
        throw new Error(`Data type ${ base_1.DataType[parsedDataType] } does not match expected data type ${ base_1.DataType[spec.dataType] }`);
    }
    postprocess_1.postProcessRawData(chunk, parseResult.data);
}
exports.decodeNdstoreNpzChunk = decodeNdstoreNpzChunk;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
/**
 * Basic support for parsing the Python Numpy 'npy' serialization format.
 *
 * See http://docs.scipy.org/doc/numpy-dev/neps/npy-format.html
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var json_1 = __webpack_require__(48);
var base_1 = __webpack_require__(12);
var supportedDataTypes = new Map();
supportedDataTypes.set('|u1', {
    arrayConstructor: Uint8Array,
    elementBytes: 1,
    javascriptElementsPerArrayElement: 1,
    dataType: base_1.DataType.UINT8
});
supportedDataTypes.set('<u4', {
    arrayConstructor: Uint32Array,
    elementBytes: 4,
    javascriptElementsPerArrayElement: 1,
    dataType: base_1.DataType.UINT32
});

var NumpyArray = function NumpyArray(data, shape, dataType, fortranOrder) {
    _classCallCheck(this, NumpyArray);

    this.data = data;
    this.shape = shape;
    this.dataType = dataType;
    this.fortranOrder = fortranOrder;
};

exports.NumpyArray = NumpyArray;
;
function parseNpy(x) {
    // Verify 6-byte magic sequence: 147, 78, 85, 77, 80, 89
    if (x[0] !== 147 || x[1] !== 78 || x[2] !== 85 || x[3] !== 77 || x[4] !== 80 || x[5] !== 89) {
        throw new Error('Data does not match npy format.');
    }
    var majorVersion = x[6],
        minorVersion = x[7];
    if (majorVersion !== 1 || minorVersion !== 0) {
        throw new Error(`Unsupported npy version ${ majorVersion }.${ minorVersion }`);
    }
    var dv = new DataView(x.buffer, x.byteOffset, x.byteLength);
    var headerLength = dv.getUint16(8, /*littleEndian=*/true);
    var header = new TextDecoder('utf-8').decode(x.subarray(10, headerLength + 10));
    var headerObject = void 0;
    var dataOffset = headerLength + 10;
    try {
        headerObject = json_1.pythonLiteralParse(header);
    } catch (e) {
        throw new Error(`Failed to parse npy header: ${ e }`);
    }
    var dtype = headerObject['descr'];
    var shape = headerObject['shape'];
    var numElements = 1;
    if (!Array.isArray(shape)) {
        throw new Error('Invalid shape ${JSON.stringify(shape)}');
    }
    for (var dim of shape) {
        if (typeof dim !== 'number') {
            throw new Error('Invalid shape ${JSON.stringify(shape)}');
        }
        numElements *= dim;
    }
    var supportedDataType = supportedDataTypes.get(dtype);
    if (supportedDataType === undefined) {
        throw new Error(`Unsupported numpy data type ${ JSON.stringify(dtype) }`);
    }
    var totalDataBytes = supportedDataType.elementBytes * numElements;
    if (totalDataBytes + dataOffset !== x.byteLength) {
        throw new Error('Expected length does not match length of data');
    }
    var data = new supportedDataType.arrayConstructor(x.buffer, x.byteOffset + dataOffset, numElements * supportedDataType.javascriptElementsPerArrayElement);
    return new NumpyArray(data, shape, supportedDataType, headerObject['fortran_order'] === true);
}
exports.parseNpy = parseNpy;

/***/ },
/* 48 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

function verifyFloat(obj) {
    var t = typeof obj;
    if (t === 'number' || t === 'string') {
        var x = parseFloat('' + obj);
        if (!Number.isNaN(x)) {
            return x;
        }
    }
    throw new Error(`Expected floating-point number, but received: ${ JSON.stringify(obj) }.`);
}
exports.verifyFloat = verifyFloat;
function verifyFinitePositiveFloat(obj) {
    var x = verifyFloat(obj);
    if (Number.isFinite(x) && x > 0) {
        return x;
    }
    throw new Error(`Expected positive finite floating-point number, but received: ${ x }.`);
}
exports.verifyFinitePositiveFloat = verifyFinitePositiveFloat;
function parseXYZ(out, obj) {
    var validator = arguments.length <= 2 || arguments[2] === undefined ? verifyFloat : arguments[2];

    verifyObject(obj);
    var keys = Object.keys(obj);
    keys.sort();
    if (keys.length !== 3 || keys[0] !== 'x' || keys[1] !== 'y' || keys[2] !== 'z') {
        throw new Error(`Expected object to have keys ['x', 'y', 'z'], but received: ${ JSON.stringify(obj) }.`);
    }
    out[0] = validator(obj['x']);
    out[1] = validator(obj['y']);
    out[2] = validator(obj['z']);
    return out;
}
exports.parseXYZ = parseXYZ;
function parseFiniteVec(out, obj) {
    var length = out.length;
    if (!Array.isArray(obj) || obj.length !== length) {
        throw new Error('Incompatible sizes');
    }
    for (var i = 0; i < length; ++i) {
        if (!Number.isFinite(parseFloat(obj[i]))) {
            throw new Error('Non-finite value.');
        }
    }
    for (var _i = 0; _i < length; ++_i) {
        out[_i] = parseFloat(obj[_i]);
    }
    return out;
}
exports.parseFiniteVec = parseFiniteVec;
function parseIntVec(out, obj) {
    var length = out.length;
    if (!Array.isArray(obj) || obj.length !== length) {
        throw new Error('Incompatible sizes.');
    }
    for (var i = 0; i < length; ++i) {
        var val = parseInt(obj[i], undefined);
        if (!Number.isInteger(val)) {
            throw new Error('Non-integer value.');
        }
    }
    for (var _i2 = 0; _i2 < length; ++_i2) {
        out[_i2] = parseInt(obj[_i2], undefined);
    }
    return out;
}
exports.parseIntVec = parseIntVec;
/**
 * Returns a JSON representation of x, with object keys sorted to ensure a
 * consistent result.
 */
function stableStringify(x) {
    if (typeof x === 'object') {
        if (x === null) {
            return 'null';
        }
        if (Array.isArray(x)) {
            var _s = '[';
            var _size = x.length;
            var _i3 = 0;
            if (_i3 < _size) {
                _s += stableStringify(x[_i3]);
                while (++_i3 < _size) {
                    _s += ',';
                    _s += stableStringify(x[_i3]);
                }
            }
            _s += ']';
            return _s;
        }
        var s = '{';
        var keys = Object.keys(x).sort();
        var i = 0;
        var size = keys.length;
        if (i < size) {
            var key = keys[i];
            s += JSON.stringify(key);
            s += ':';
            s += stableStringify(x[key]);
            while (++i < size) {
                s += ',';
                key = keys[i];
                s += JSON.stringify(key);
                s += ':';
                s += stableStringify(x[key]);
            }
        }
        s += '}';
        return s;
    }
    return JSON.stringify(x);
}
exports.stableStringify = stableStringify;
function swapQuotes(x) {
    return x.replace(/['"]/g, s => {
        return s === '"' ? '\\'' : '"';
    });
}
function urlSafeStringifyString(x) {
    return swapQuotes(JSON.stringify(swapQuotes(x)));
}
exports.urlSafeStringifyString = urlSafeStringifyString;
var URL_SAFE_COMMA = '_';
function urlSafeStringify(x) {
    if (typeof x === 'object') {
        if (x === null) {
            return 'null';
        }
        var toJSON = x['toJSON'];
        if (typeof toJSON === 'function') {
            return urlSafeStringify(toJSON.call(x));
        }
        if (Array.isArray(x)) {
            var _s2 = '[';
            var size = x.length;
            var i = 0;
            if (i < size) {
                _s2 += urlSafeStringify(x[i]);
                while (++i < size) {
                    _s2 += URL_SAFE_COMMA;
                    _s2 += urlSafeStringify(x[i]);
                }
            }
            _s2 += ']';
            return _s2;
        }
        var s = '{';
        var keys = Object.keys(x);
        var first = true;
        for (var key of keys) {
            var value = x[key];
            if (value === undefined) {
                continue;
            }
            var valueString = urlSafeStringify(value);
            if (!valueString) {
                continue;
            }
            if (!first) {
                s += URL_SAFE_COMMA;
            } else {
                first = false;
            }
            s += urlSafeStringifyString(key);
            s += ':';
            s += valueString;
        }
        s += '}';
        return s;
    }
    if (typeof x === 'string') {
        return urlSafeStringifyString(x);
    }
    return JSON.stringify(x);
}
exports.urlSafeStringify = urlSafeStringify;
var SINGLE_QUOTE_STRING_PATTERN = /('(?:[^'\\\\]|(?:\\\\.))*')/;
var DOUBLE_QUOTE_STRING_PATTERN = /("(?:[^'\\\\]|(?:\\\\.))*")/;
var SINGLE_OR_DOUBLE_QUOTE_STRING_PATTERN = new RegExp(`${ SINGLE_QUOTE_STRING_PATTERN.source }|${ DOUBLE_QUOTE_STRING_PATTERN.source }`);
var DOUBLE_OR_SINGLE_QUOTE_STRING_PATTERN = new RegExp(`${ DOUBLE_QUOTE_STRING_PATTERN.source }|${ SINGLE_QUOTE_STRING_PATTERN.source }`);
//const stringLiteralPattern = /('(?:[^'\\\\]|(?:\\\\.))*')|("(?:[^"\\\\]|(?:\\\\.))*")/;
var DOUBLE_QUOTE_PATTERN = /^((?:[^"'\\\\]|(?:\\\\.))*)"/;
var SINGLE_QUOTE_PATTERN = /^((?:[^"'\\\\]|(?:\\\\.))*)'/;
function convertStringLiteral(x, quoteInitial, quoteReplace, quoteSearch) {
    if (x.length >= 2 && x.charAt(0) === quoteInitial && x.charAt(x.length - 1) === quoteInitial) {
        var inner = x.substr(1, x.length - 2);
        var s = quoteReplace;
        while (inner.length > 0) {
            var m = inner.match(quoteSearch);
            if (m === null) {
                s += inner;
                break;
            }
            s += m[1];
            s += '\\\\';
            s += quoteReplace;
            inner = inner.substr(m.index + m[0].length);
        }
        s += quoteReplace;
        return s;
    }
    return x;
}
/**
 * Converts a string literal delimited by either single or double quotes into a string literal
 * delimited by double quotes.
 */
function normalizeStringLiteral(x) {
    return convertStringLiteral(x, '\\'', '"', DOUBLE_QUOTE_PATTERN);
}
exports.normalizeStringLiteral = normalizeStringLiteral;
// quoteChar: des
function convertJsonHelper(x, desiredCommaChar, desiredQuoteChar) {
    var commaSearch = /[&_,]/g;
    var quoteInitial = void 0;
    var quoteSearch = void 0;
    var stringLiteralPattern = void 0;
    if (desiredQuoteChar === '"') {
        quoteInitial = '\\'';
        quoteSearch = DOUBLE_QUOTE_PATTERN;
        stringLiteralPattern = SINGLE_OR_DOUBLE_QUOTE_STRING_PATTERN;
    } else {
        quoteInitial = '"';
        quoteSearch = SINGLE_QUOTE_PATTERN;
        stringLiteralPattern = DOUBLE_OR_SINGLE_QUOTE_STRING_PATTERN;
    }
    var s = '';
    while (x.length > 0) {
        var m = x.match(stringLiteralPattern);
        var before = void 0;
        var replacement = void 0;
        if (m === null) {
            before = x;
            x = '';
            replacement = '';
        } else {
            before = x.substr(0, m.index);
            x = x.substr(m.index + m[0].length);
            var originalString = m[1];
            if (originalString !== undefined) {
                replacement = convertStringLiteral(originalString, quoteInitial, desiredQuoteChar, quoteSearch);
            } else {
                replacement = m[2];
            }
        }
        s += before.replace(commaSearch, desiredCommaChar);
        s += replacement;
    }
    return s;
}
function urlSafeToJSON(x) {
    return convertJsonHelper(x, ',', '"');
}
exports.urlSafeToJSON = urlSafeToJSON;
function jsonToUrlSafe(x) {
    return convertJsonHelper(x, '_', '\\'');
}
exports.jsonToUrlSafe = jsonToUrlSafe;
function urlSafeParse(x) {
    return JSON.parse(urlSafeToJSON(x));
}
exports.urlSafeParse = urlSafeParse;
// Converts a string containing a Python literal into a string containing an equivalent JSON
// literal.
function pythonLiteralToJSON(x) {
    var s = '';
    while (x.length > 0) {
        var m = x.match(SINGLE_OR_DOUBLE_QUOTE_STRING_PATTERN);
        var before = void 0;
        var replacement = void 0;
        if (m === null) {
            before = x;
            x = '';
            replacement = '';
        } else {
            before = x.substr(0, m.index);
            x = x.substr(m.index + m[0].length);
            var singleQuoteString = m[1];
            if (singleQuoteString !== undefined) {
                replacement = normalizeStringLiteral(singleQuoteString);
            } else {
                replacement = m[2];
            }
        }
        s += before.replace(/\\(/g, '[').replace(/\\)/g, ']').replace('True', 'true').replace('False', 'false').replace(/,\\s*([\\}\\]])/g, '$1');
        s += replacement;
    }
    return s;
}
exports.pythonLiteralToJSON = pythonLiteralToJSON;
// Converts a string containing a Python literal into an equivalent JavaScript value.
function pythonLiteralParse(x) {
    return JSON.parse(pythonLiteralToJSON(x));
}
exports.pythonLiteralParse = pythonLiteralParse;
// Checks that `x' is an array, maps each element by parseElement.
function parseArray(x, parseElement) {
    if (!Array.isArray(x)) {
        throw new Error(`Expected array, but received: ${ JSON.stringify(x) }.`);
    }
    return x.map(parseElement);
}
exports.parseArray = parseArray;
function parseFixedLengthArray(out, obj, parseElement) {
    var length = out.length;
    if (!Array.isArray(obj) || obj.length !== length) {
        throw new Error(`Expected length ${ length } array, but received: ${ JSON.stringify(obj) }.`);
    }
    for (var i = 0; i < length; ++i) {
        out[i] = parseElement(obj[i], i);
    }
    return out;
}
exports.parseFixedLengthArray = parseFixedLengthArray;
function verifyObject(obj) {
    if (typeof obj !== 'object' || obj == null || Array.isArray(obj)) {
        throw new Error(`Expected JSON object, but received: ${ JSON.stringify(obj) }.`);
    }
    return obj;
}
exports.verifyObject = verifyObject;
function verifyInt(obj) {
    var result = parseInt(obj, 10);
    if (!Number.isInteger(result)) {
        throw new Error(`Expected integer, but received: ${ JSON.stringify(obj) }.`);
    }
    return result;
}
exports.verifyInt = verifyInt;
function verifyPositiveInt(obj) {
    var result = verifyInt(obj);
    if (result <= 0) {
        throw new Error(`Expected positive integer, but received: ${ result }.`);
    }
    return result;
}
exports.verifyPositiveInt = verifyPositiveInt;
function verifyMapKey(obj, map) {
    var result = map.get(obj);
    if (result === undefined) {
        throw new Error(`Expected one of ${ JSON.stringify(Array.from(map.keys())) }, but received: ${ JSON.stringify(obj) }.`);
    }
    return result;
}
exports.verifyMapKey = verifyMapKey;
function verifyString(obj) {
    if (typeof obj !== 'string') {
        throw new Error(`Expected string, but received: ${ JSON.stringify(obj) }.`);
    }
    return obj;
}
exports.verifyString = verifyString;
function verifyOptionalString(obj) {
    if (obj === undefined) {
        return undefined;
    }
    return verifyString(obj);
}
exports.verifyOptionalString = verifyOptionalString;
function verifyObjectProperty(obj, propertyName, validator) {
    var value = obj.hasOwnProperty(propertyName) ? obj[propertyName] : undefined;
    try {
        return validator(value);
    } catch (parseError) {
        throw new Error(`Error parsing ${ JSON.stringify(propertyName) } property: ${ parseError.message }`);
    }
}
exports.verifyObjectProperty = verifyObjectProperty;
function verifyObjectAsMap(obj, validator) {
    verifyObject(obj);
    var map = new Map();
    for (var key of Object.keys(obj)) {
        try {
            map.set(key, validator(obj[key]));
        } catch (parseError) {
            throw new Error(`Error parsing value associated with key ${ JSON.stringify(key) }: ${ parseError.message }`);
        }
    }
    return map;
}
exports.verifyObjectAsMap = verifyObjectAsMap;
function verifyFloat01(obj) {
    if (typeof obj !== 'number' || !Number.isFinite(obj) || obj < 0 || obj > 1) {
        throw new Error(`Expected floating point number in [0,1], but received: ${ JSON.stringify(obj) }.`);
    }
    return obj;
}
exports.verifyFloat01 = verifyFloat01;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

// Top level file is just a mixin of submodules & constants
'use strict';

var assign    = __webpack_require__(50).assign;

var deflate   = __webpack_require__(51);
var inflate   = __webpack_require__(59);
var constants = __webpack_require__(63);

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;


/***/ },
/* 50 */
/***/ function(module, exports) {

'use strict';


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');


exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (source.hasOwnProperty(p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

'use strict';


var zlib_deflate = __webpack_require__(52);
var utils        = __webpack_require__(50);
var strings      = __webpack_require__(57);
var msg          = __webpack_require__(56);
var ZStream      = __webpack_require__(58);

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overriden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

'use strict';

var utils   = __webpack_require__(50);
var trees   = __webpack_require__(53);
var adler32 = __webpack_require__(54);
var crc32   = __webpack_require__(55);
var msg     = __webpack_require__(56);

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  s.d_buf = s.lit_bufsize >> 1;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
                );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

'use strict';


var utils = __webpack_require__(50);

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\\nbit length overflow\\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;


/***/ },
/* 54 */
/***/ function(module, exports) {

'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It doesn't worth to make additional optimizationa as in original.
// Small size is preferable.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;


/***/ },
/* 55 */
/***/ function(module, exports) {

'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.


// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;


/***/ },
/* 56 */
/***/ function(module, exports) {

'use strict';

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

// String encode/decode helpers
'use strict';


var utils = __webpack_require__(50);


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safary
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // use fallback for big arrays to avoid stack overflow
  if (len < 65537) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Fuckup - very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means vuffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};


/***/ },
/* 58 */
/***/ function(module, exports) {

'use strict';


function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

'use strict';


var zlib_inflate = __webpack_require__(60);
var utils        = __webpack_require__(50);
var strings      = __webpack_require__(57);
var c            = __webpack_require__(63);
var msg          = __webpack_require__(56);
var ZStream      = __webpack_require__(58);
var GZheader     = __webpack_require__(64);

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overriden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;
  var dict;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      // Convert data if needed
      if (typeof dictionary === 'string') {
        dict = strings.string2buf(dictionary);
      } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
        dict = new Uint8Array(dictionary);
      } else {
        dict = dictionary;
      }

      status = zlib_inflate.inflateSetDictionary(this.strm, dict);

    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 alligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

'use strict';


var utils         = __webpack_require__(50);
var adler32       = __webpack_require__(54);
var crc32         = __webpack_require__(55);
var inflate_fast  = __webpack_require__(61);
var inflate_table = __webpack_require__(62);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
    case HEAD:
      if (state.wrap === 0) {
        state.mode = TYPEDO;
        break;
      }
      //=== NEEDBITS(16);
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//

        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = FLAGS;
        break;
      }
      state.flags = 0;           /* expect zlib header */
      if (state.head) {
        state.head.done = false;
      }
      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
        strm.msg = 'incorrect header check';
        state.mode = BAD;
        break;
      }
      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
      len = (hold & 0x0f)/*BITS(4)*/ + 8;
      if (state.wbits === 0) {
        state.wbits = len;
      }
      else if (len > state.wbits) {
        strm.msg = 'invalid window size';
        state.mode = BAD;
        break;
      }
      state.dmax = 1 << len;
      //Tracev((stderr, "inflate:   zlib header ok\\n"));
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = hold & 0x200 ? DICTID : TYPE;
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      break;
    case FLAGS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.flags = hold;
      if ((state.flags & 0xff) !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      if (state.flags & 0xe000) {
        strm.msg = 'unknown header flags set';
        state.mode = BAD;
        break;
      }
      if (state.head) {
        state.head.text = ((hold >> 8) & 1);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = TIME;
      /* falls through */
    case TIME:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.time = hold;
      }
      if (state.flags & 0x0200) {
        //=== CRC4(state.check, hold)
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        hbuf[2] = (hold >>> 16) & 0xff;
        hbuf[3] = (hold >>> 24) & 0xff;
        state.check = crc32(state.check, hbuf, 4, 0);
        //===
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = OS;
      /* falls through */
    case OS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.xflags = (hold & 0xff);
        state.head.os = (hold >> 8);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = EXLEN;
      /* falls through */
    case EXLEN:
      if (state.flags & 0x0400) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length = hold;
        if (state.head) {
          state.head.extra_len = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      else if (state.head) {
        state.head.extra = null/*Z_NULL*/;
      }
      state.mode = EXTRA;
      /* falls through */
    case EXTRA:
      if (state.flags & 0x0400) {
        copy = state.length;
        if (copy > have) { copy = have; }
        if (copy) {
          if (state.head) {
            len = state.head.extra_len - state.length;
            if (!state.head.extra) {
              // Use untyped array for more conveniend processing later
              state.head.extra = new Array(state.head.extra_len);
            }
            utils.arraySet(
              state.head.extra,
              input,
              next,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              copy,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              len
            );
            //zmemcpy(state.head.extra + len, next,
            //        len + copy > state.head.extra_max ?
            //        state.head.extra_max - len : copy);
          }
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          state.length -= copy;
        }
        if (state.length) { break inf_leave; }
      }
      state.length = 0;
      state.mode = NAME;
      /* falls through */
    case NAME:
      if (state.flags & 0x0800) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          // TODO: 2 or 1 bytes?
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.name_max*/)) {
            state.head.name += String.fromCharCode(len);
          }
        } while (len && copy < have);

        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.name = null;
      }
      state.length = 0;
      state.mode = COMMENT;
      /* falls through */
    case COMMENT:
      if (state.flags & 0x1000) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.comm_max*/)) {
            state.head.comment += String.fromCharCode(len);
          }
        } while (len && copy < have);
        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.comment = null;
      }
      state.mode = HCRC;
      /* falls through */
    case HCRC:
      if (state.flags & 0x0200) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.check & 0xffff)) {
          strm.msg = 'header crc mismatch';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      if (state.head) {
        state.head.hcrc = ((state.flags >> 9) & 1);
        state.head.done = true;
      }
      strm.adler = state.check = 0;
      state.mode = TYPE;
      break;
    case DICTID:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      strm.adler = state.check = zswap32(hold);
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = DICT;
      /* falls through */
    case DICT:
      if (state.havedict === 0) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        return Z_NEED_DICT;
      }
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      /* falls through */
    case TYPE:
      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case TYPEDO:
      if (state.last) {
        //--- BYTEBITS() ---//
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        state.mode = CHECK;
        break;
      }
      //=== NEEDBITS(3); */
      while (bits < 3) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.last = (hold & 0x01)/*BITS(1)*/;
      //--- DROPBITS(1) ---//
      hold >>>= 1;
      bits -= 1;
      //---//

      switch ((hold & 0x03)/*BITS(2)*/) {
      case 0:                             /* stored block */
        //Tracev((stderr, "inflate:     stored block%s\\n",
        //        state.last ? " (last)" : ""));
        state.mode = STORED;
        break;
      case 1:                             /* fixed block */
        fixedtables(state);
        //Tracev((stderr, "inflate:     fixed codes block%s\\n",
        //        state.last ? " (last)" : ""));
        state.mode = LEN_;             /* decode codes */
        if (flush === Z_TREES) {
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break inf_leave;
        }
        break;
      case 2:                             /* dynamic block */
        //Tracev((stderr, "inflate:     dynamic codes block%s\\n",
        //        state.last ? " (last)" : ""));
        state.mode = TABLE;
        break;
      case 3:
        strm.msg = 'invalid block type';
        state.mode = BAD;
      }
      //--- DROPBITS(2) ---//
      hold >>>= 2;
      bits -= 2;
      //---//
      break;
    case STORED:
      //--- BYTEBITS() ---// /* go to byte boundary */
      hold >>>= bits & 7;
      bits -= bits & 7;
      //---//
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
        strm.msg = 'invalid stored block lengths';
        state.mode = BAD;
        break;
      }
      state.length = hold & 0xffff;
      //Tracev((stderr, "inflate:       stored length %u\\n",
      //        state.length));
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = COPY_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case COPY_:
      state.mode = COPY;
      /* falls through */
    case COPY:
      copy = state.length;
      if (copy) {
        if (copy > have) { copy = have; }
        if (copy > left) { copy = left; }
        if (copy === 0) { break inf_leave; }
        //--- zmemcpy(put, next, copy); ---
        utils.arraySet(output, input, next, copy, put);
        //---//
        have -= copy;
        next += copy;
        left -= copy;
        put += copy;
        state.length -= copy;
        break;
      }
      //Tracev((stderr, "inflate:       stored end\\n"));
      state.mode = TYPE;
      break;
    case TABLE:
      //=== NEEDBITS(14); */
      while (bits < 14) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
//#ifndef PKZIP_BUG_WORKAROUND
      if (state.nlen > 286 || state.ndist > 30) {
        strm.msg = 'too many length or distance symbols';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracev((stderr, "inflate:       table sizes ok\\n"));
      state.have = 0;
      state.mode = LENLENS;
      /* falls through */
    case LENLENS:
      while (state.have < state.ncode) {
        //=== NEEDBITS(3);
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
        //--- DROPBITS(3) ---//
        hold >>>= 3;
        bits -= 3;
        //---//
      }
      while (state.have < 19) {
        state.lens[order[state.have++]] = 0;
      }
      // We have separate tables & no pointers. 2 commented lines below not needed.
      //state.next = state.codes;
      //state.lencode = state.next;
      // Switch to use dynamic table
      state.lencode = state.lendyn;
      state.lenbits = 7;

      opts = { bits: state.lenbits };
      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
      state.lenbits = opts.bits;

      if (ret) {
        strm.msg = 'invalid code lengths set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, "inflate:       code lengths ok\\n"));
      state.have = 0;
      state.mode = CODELENS;
      /* falls through */
    case CODELENS:
      while (state.have < state.nlen + state.ndist) {
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_val < 16) {
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.lens[state.have++] = here_val;
        }
        else {
          if (here_val === 16) {
            //=== NEEDBITS(here.bits + 2);
            n = here_bits + 2;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            if (state.have === 0) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            len = state.lens[state.have - 1];
            copy = 3 + (hold & 0x03);//BITS(2);
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
          }
          else if (here_val === 17) {
            //=== NEEDBITS(here.bits + 3);
            n = here_bits + 3;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 3 + (hold & 0x07);//BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          else {
            //=== NEEDBITS(here.bits + 7);
            n = here_bits + 7;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 11 + (hold & 0x7f);//BITS(7);
            //--- DROPBITS(7) ---//
            hold >>>= 7;
            bits -= 7;
            //---//
          }
          if (state.have + copy > state.nlen + state.ndist) {
            strm.msg = 'invalid bit length repeat';
            state.mode = BAD;
            break;
          }
          while (copy--) {
            state.lens[state.have++] = len;
          }
        }
      }

      /* handle error breaks in while */
      if (state.mode === BAD) { break; }

      /* check for end-of-block code (better have one) */
      if (state.lens[256] === 0) {
        strm.msg = 'invalid code -- missing end-of-block';
        state.mode = BAD;
        break;
      }

      /* build code tables -- note: do not change the lenbits or distbits
         values here (9 and 6) without reading the comments in inftrees.h
         concerning the ENOUGH constants, which depend on those values */
      state.lenbits = 9;

      opts = { bits: state.lenbits };
      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.lenbits = opts.bits;
      // state.lencode = state.next;

      if (ret) {
        strm.msg = 'invalid literal/lengths set';
        state.mode = BAD;
        break;
      }

      state.distbits = 6;
      //state.distcode.copy(state.codes);
      // Switch to use dynamic table
      state.distcode = state.distdyn;
      opts = { bits: state.distbits };
      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.distbits = opts.bits;
      // state.distcode = state.next;

      if (ret) {
        strm.msg = 'invalid distances set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, 'inflate:       codes ok\\n'));
      state.mode = LEN_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case LEN_:
      state.mode = LEN;
      /* falls through */
    case LEN:
      if (have >= 6 && left >= 258) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        inflate_fast(strm, _out);
        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---

        if (state.mode === TYPE) {
          state.back = -1;
        }
        break;
      }
      state.back = 0;
      for (;;) {
        here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if (here_bits <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if (here_op && (here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.lencode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      state.length = here_val;
      if (here_op === 0) {
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\\n" :
        //        "inflate:         literal 0x%02x\\n", here.val));
        state.mode = LIT;
        break;
      }
      if (here_op & 32) {
        //Tracevv((stderr, "inflate:         end of block\\n"));
        state.back = -1;
        state.mode = TYPE;
        break;
      }
      if (here_op & 64) {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break;
      }
      state.extra = here_op & 15;
      state.mode = LENEXT;
      /* falls through */
    case LENEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
      //Tracevv((stderr, "inflate:         length %u\\n", state.length));
      state.was = state.length;
      state.mode = DIST;
      /* falls through */
    case DIST:
      for (;;) {
        here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if ((here_bits) <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if ((here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.distcode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      if (here_op & 64) {
        strm.msg = 'invalid distance code';
        state.mode = BAD;
        break;
      }
      state.offset = here_val;
      state.extra = (here_op) & 15;
      state.mode = DISTEXT;
      /* falls through */
    case DISTEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
//#ifdef INFLATE_STRICT
      if (state.offset > state.dmax) {
        strm.msg = 'invalid distance too far back';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracevv((stderr, "inflate:         distance %u\\n", state.offset));
      state.mode = MATCH;
      /* falls through */
    case MATCH:
      if (left === 0) { break inf_leave; }
      copy = _out - left;
      if (state.offset > copy) {         /* copy from window */
        copy = state.offset - copy;
        if (copy > state.whave) {
          if (state.sane) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
        }
        if (copy > state.wnext) {
          copy -= state.wnext;
          from = state.wsize - copy;
        }
        else {
          from = state.wnext - copy;
        }
        if (copy > state.length) { copy = state.length; }
        from_source = state.window;
      }
      else {                              /* copy from output */
        from_source = output;
        from = put - state.offset;
        copy = state.length;
      }
      if (copy > left) { copy = left; }
      left -= copy;
      state.length -= copy;
      do {
        output[put++] = from_source[from++];
      } while (--copy);
      if (state.length === 0) { state.mode = LEN; }
      break;
    case LIT:
      if (left === 0) { break inf_leave; }
      output[put++] = state.length;
      left--;
      state.mode = LEN;
      break;
    case CHECK:
      if (state.wrap) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          // Use '|' insdead of '+' to make sure that result is signed
          hold |= input[next++] << bits;
          bits += 8;
        }
        //===//
        _out -= left;
        strm.total_out += _out;
        state.total += _out;
        if (_out) {
          strm.adler = state.check =
              /*UPDATE(state.check, put - _out, _out);*/
              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

        }
        _out = left;
        // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
        if ((state.flags ? hold : zswap32(hold)) !== state.check) {
          strm.msg = 'incorrect data check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   check matches trailer\\n"));
      }
      state.mode = LENGTH;
      /* falls through */
    case LENGTH:
      if (state.wrap && state.flags) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.total & 0xffffffff)) {
          strm.msg = 'incorrect length check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   length matches trailer\\n"));
      }
      state.mode = DONE;
      /* falls through */
    case DONE:
      ret = Z_STREAM_END;
      break inf_leave;
    case BAD:
      ret = Z_DATA_ERROR;
      break inf_leave;
    case MEM:
      return Z_MEM_ERROR;
    case SYNC:
      /* falls through */
    default:
      return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/


/***/ },
/* 61 */
/***/ function(module, exports) {

'use strict';

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\\n" :
        //        "inflate:         literal 0x%02x\\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

'use strict';


var utils = __webpack_require__(50);

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  var i = 0;
  /* process all codes and make table entries */
  for (;;) {
    i++;
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};


/***/ },
/* 63 */
/***/ function(module, exports) {

'use strict';


module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};


/***/ },
/* 64 */
/***/ function(module, exports) {

'use strict';


function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var backend_1 = __webpack_require__(4);
var base_1 = __webpack_require__(66);
var backend_2 = __webpack_require__(11);
var jpeg_1 = __webpack_require__(36);
var raw_1 = __webpack_require__(44);
var http_request_1 = __webpack_require__(32);
var worker_rpc_1 = __webpack_require__(2);
var TILE_CHUNK_DECODERS = new Map([[base_1.TileEncoding.JPEG, jpeg_1.decodeJpegChunk]]);

var VolumeChunkSource = function (_backend_2$VolumeChun) {
    _inherits(VolumeChunkSource, _backend_2$VolumeChun);

    function VolumeChunkSource(rpc, options) {
        _classCallCheck(this, VolumeChunkSource);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunkSource).call(this, rpc, options));

        _this.parameters = options['parameters'];
        return _this;
    }

    _createClass(VolumeChunkSource, [{
        key: 'download',
        value: function download(chunk) {
            var params = this.parameters;
            var path = void 0;
            {
                // chunkPosition must not be captured, since it will be invalidated by the next call to
                // computeChunkBounds.
                var chunkPosition = this.computeChunkBounds(chunk);
                var chunkDataSize = chunk.chunkDataSize;

                path = `/api/node/${ params['nodeKey'] }/${ params['dataInstanceKey'] }/raw/0_1_2/${ chunkDataSize[0] }_${ chunkDataSize[1] }_${ chunkDataSize[2] }/${ chunkPosition[0] }_${ chunkPosition[1] }_${ chunkPosition[2] }/nd`;
            }
            backend_1.handleChunkDownloadPromise(chunk, http_request_1.sendHttpRequest(http_request_1.openShardedHttpRequest(params.baseUrls, path), 'arraybuffer'), raw_1.decodeRawChunk);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return base_1.volumeSourceToString(this.parameters);
        }
    }]);

    return VolumeChunkSource;
}(backend_2.VolumeChunkSource);

;
worker_rpc_1.registerSharedObject('dvid/VolumeChunkSource', VolumeChunkSource);

var TileChunkSource = function (_backend_2$VolumeChun2) {
    _inherits(TileChunkSource, _backend_2$VolumeChun2);

    function TileChunkSource(rpc, options) {
        _classCallCheck(this, TileChunkSource);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(TileChunkSource).call(this, rpc, options));

        _this2.parameters = options['parameters'];
        _this2.chunkDecoder = TILE_CHUNK_DECODERS.get(_this2.parameters['encoding']);
        return _this2;
    }

    _createClass(TileChunkSource, [{
        key: 'download',
        value: function download(chunk) {
            var params = this.parameters;
            var chunkGridPosition = chunk.chunkGridPosition;
            // Needed by decoder.

            chunk.chunkDataSize = this.spec.chunkDataSize;
            var path = `/api/node/${ params['nodeKey'] }/${ params['dataInstanceKey'] }/tile/${ params['dims'] }/${ params['level'] }/${ chunkGridPosition[0] }_${ chunkGridPosition[1] }_${ chunkGridPosition[2] }`;
            backend_1.handleChunkDownloadPromise(chunk, http_request_1.sendHttpRequest(http_request_1.openShardedHttpRequest(params.baseUrls, path), 'arraybuffer'), this.chunkDecoder);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return base_1.tileSourceToString(this.parameters);
        }
    }]);

    return TileChunkSource;
}(backend_2.VolumeChunkSource);

;
worker_rpc_1.registerSharedObject('dvid/TileChunkSource', TileChunkSource);

/***/ },
/* 66 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

;
(function (TileEncoding) {
    TileEncoding[TileEncoding["JPEG"] = 0] = "JPEG";
})(exports.TileEncoding || (exports.TileEncoding = {}));
var TileEncoding = exports.TileEncoding;
;
;
function volumeSourceToString(parameters) {
    return `dvid:volume:${ parameters['baseUrls'][0] }/${ parameters['nodeKey'] }/${ parameters['dataInstanceKey'] }`;
}
exports.volumeSourceToString = volumeSourceToString;
function tileSourceToString(parameters) {
    return `dvid:volume:${ parameters['baseUrls'][0] }/${ parameters['nodeKey'] }/${ parameters['dataInstanceKey'] }/${ parameters['dims'] }/${ parameters['level'] }/${ TileEncoding[parameters['encoding']] }`;
}
exports.tileSourceToString = tileSourceToString;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

__webpack_require__(45);

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var backend_1 = __webpack_require__(4);
var base_1 = __webpack_require__(69);
var backend_2 = __webpack_require__(70);
var backend_3 = __webpack_require__(11);
var compressed_segmentation_1 = __webpack_require__(35);
var jpeg_1 = __webpack_require__(36);
var raw_1 = __webpack_require__(44);
var http_request_1 = __webpack_require__(32);
var worker_rpc_1 = __webpack_require__(2);
var chunkDecoders = new Map();
chunkDecoders.set(base_1.VolumeChunkEncoding.RAW, raw_1.decodeRawChunk);
chunkDecoders.set(base_1.VolumeChunkEncoding.JPEG, jpeg_1.decodeJpegChunk);
chunkDecoders.set(base_1.VolumeChunkEncoding.COMPRESSED_SEGMENTATION, compressed_segmentation_1.decodeCompressedSegmentationChunk);

var VolumeChunkSource = function (_backend_3$VolumeChun) {
    _inherits(VolumeChunkSource, _backend_3$VolumeChun);

    function VolumeChunkSource(rpc, options) {
        _classCallCheck(this, VolumeChunkSource);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunkSource).call(this, rpc, options));

        _this.baseUrls = options['baseUrls'];
        _this.path = options['path'];
        _this.encoding = options['encoding'];
        _this.chunkDecoder = chunkDecoders.get(_this.encoding);
        return _this;
    }

    _createClass(VolumeChunkSource, [{
        key: 'download',
        value: function download(chunk) {
            var path = void 0;
            {
                // chunkPosition must not be captured, since it will be invalidated by the next call to
                // computeChunkBounds.
                var chunkPosition = this.computeChunkBounds(chunk);
                var chunkDataSize = chunk.chunkDataSize;

                path = `${ this.path }/${ chunkPosition[0] }-${ chunkPosition[0] + chunkDataSize[0] }_${ chunkPosition[1] }-${ chunkPosition[1] + chunkDataSize[1] }_${ chunkPosition[2] }-${ chunkPosition[2] + chunkDataSize[2] }`;
            }
            backend_1.handleChunkDownloadPromise(chunk, http_request_1.sendHttpRequest(http_request_1.openShardedHttpRequest(this.baseUrls, path), 'arraybuffer'), this.chunkDecoder);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return `precomputed:volume:${ this.baseUrls[0] }/${ this.path }`;
        }
    }]);

    return VolumeChunkSource;
}(backend_3.VolumeChunkSource);

;
worker_rpc_1.registerSharedObject('precomputed/VolumeChunkSource', VolumeChunkSource);

var MeshSource = function (_backend_2$MeshSource) {
    _inherits(MeshSource, _backend_2$MeshSource);

    function MeshSource(rpc, options) {
        _classCallCheck(this, MeshSource);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MeshSource).call(this, rpc, options));

        _this2.baseUrls = options['baseUrls'];
        _this2.path = options['path'];
        _this2.lod = options['lod'];
        return _this2;
    }

    _createClass(MeshSource, [{
        key: 'download',
        value: function download(chunk) {
            var requestPath = `${ this.path }/${ chunk.objectId }:${ this.lod }`;
            backend_1.handleChunkDownloadPromise(chunk, http_request_1.sendHttpRequest(http_request_1.openShardedHttpRequest(this.baseUrls, requestPath), 'json'), backend_2.decodeManifestChunk);
        }
    }, {
        key: 'downloadFragment',
        value: function downloadFragment(chunk) {
            var requestPath = `${ this.path }/${ chunk.fragmentId }`;
            backend_1.handleChunkDownloadPromise(chunk, http_request_1.sendHttpRequest(http_request_1.openShardedHttpRequest(this.baseUrls, requestPath), 'arraybuffer'), backend_2.decodeFragmentChunk);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return `precomputed:mesh:${ this.baseUrls[0] }/${ this.path }`;
        }
    }]);

    return MeshSource;
}(backend_2.MeshSource);

exports.MeshSource = MeshSource;
;
worker_rpc_1.registerSharedObject('precomputed/MeshSource', MeshSource);

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

__webpack_require__(32);
(function (VolumeChunkEncoding) {
  VolumeChunkEncoding[VolumeChunkEncoding["RAW"] = 0] = "RAW";
  VolumeChunkEncoding[VolumeChunkEncoding["JPEG"] = 1] = "JPEG";
  VolumeChunkEncoding[VolumeChunkEncoding["COMPRESSED_SEGMENTATION"] = 2] = "COMPRESSED_SEGMENTATION";
})(exports.VolumeChunkEncoding || (exports.VolumeChunkEncoding = {}));
var VolumeChunkEncoding = exports.VolumeChunkEncoding;
// Prevent this from being considered a typings file.
var x = 0;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var base_1 = __webpack_require__(5);
var backend_1 = __webpack_require__(4);
var uint64_1 = __webpack_require__(71);
var worker_rpc_1 = __webpack_require__(2);
__webpack_require__(72); // Import for side effects.
var MESH_OBJECT_MANIFEST_CHUNK_PRIORITY = 100;
var MESH_OBJECT_FRAGMENT_CHUNK_PRIORITY = 50;
// Chunk that contains the list of fragments that make up a single object.

var ManifestChunk = function (_backend_1$Chunk) {
    _inherits(ManifestChunk, _backend_1$Chunk);

    function ManifestChunk() {
        _classCallCheck(this, ManifestChunk);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ManifestChunk).call(this));

        _this.backendOnly = true;
        _this.objectId = new uint64_1.Uint64();
        return _this;
    }
    // We can't save a reference to objectId, because it may be a temporary
    // object.


    _createClass(ManifestChunk, [{
        key: 'initializeManifestChunk',
        value: function initializeManifestChunk(key, objectId) {
            _get(Object.getPrototypeOf(ManifestChunk.prototype), 'initialize', this).call(this, key);
            this.objectId.assign(objectId);
        }
    }, {
        key: 'freeSystemMemory',
        value: function freeSystemMemory() {
            this.data = null;
        }
    }, {
        key: 'downloadSucceeded',
        value: function downloadSucceeded() {
            // We can't easily determine the memory usage of the JSON manifest.  Just use 100 bytes as a default value.
            this.systemMemoryBytes = 100;
            _get(Object.getPrototypeOf(ManifestChunk.prototype), 'downloadSucceeded', this).call(this);
            if (this.priorityTier === base_1.ChunkPriorityTier.VISIBLE) {
                this.source.chunkManager.scheduleUpdateChunkPriorities();
            }
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.objectId.toString();
        }
    }]);

    return ManifestChunk;
}(backend_1.Chunk);

exports.ManifestChunk = ManifestChunk;
;
/**
 * Chunk that contains the mesh for a single fragment of a single object.
 */

var FragmentChunk = function (_backend_1$Chunk2) {
    _inherits(FragmentChunk, _backend_1$Chunk2);

    function FragmentChunk() {
        _classCallCheck(this, FragmentChunk);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(FragmentChunk).call(this));

        _this2.manifestChunk = null;
        _this2.fragmentId = null;
        _this2.data = null;
        return _this2;
    }

    _createClass(FragmentChunk, [{
        key: 'initializeFragmentChunk',
        value: function initializeFragmentChunk(key, manifestChunk, fragmentId) {
            _get(Object.getPrototypeOf(FragmentChunk.prototype), 'initialize', this).call(this, key);
            this.manifestChunk = manifestChunk;
            this.fragmentId = fragmentId;
        }
    }, {
        key: 'freeSystemMemory',
        value: function freeSystemMemory() {
            this.manifestChunk = null;
            this.data = null;
            this.fragmentId = null;
        }
    }, {
        key: 'serialize',
        value: function serialize(msg, transfers) {
            _get(Object.getPrototypeOf(FragmentChunk.prototype), 'serialize', this).call(this, msg, transfers);
            msg['objectKey'] = this.manifestChunk.key;
            var data = msg['data'] = this.data;
            transfers.push(data.buffer);
            this.data = null;
        }
    }, {
        key: 'downloadSucceeded',
        value: function downloadSucceeded() {
            this.systemMemoryBytes = this.gpuMemoryBytes = this.data.byteLength;
            _get(Object.getPrototypeOf(FragmentChunk.prototype), 'downloadSucceeded', this).call(this);
        }
    }]);

    return FragmentChunk;
}(backend_1.Chunk);

exports.FragmentChunk = FragmentChunk;
;
/**
 * Assigns chunk.data based on the received JSON manifest response.
 *
 * Currently just directly stores the JSON response.
 */
function decodeManifestChunk(chunk, response) {
    chunk.data = response;
}
exports.decodeManifestChunk = decodeManifestChunk;
/**
 * Assigns chunk.data based on the received mesh fragment.
 *
 * Currently just directly stores the fragment data as a Uint8Array.
 */
function decodeFragmentChunk(chunk, response) {
    chunk.data = new Uint8Array(response);
}
exports.decodeFragmentChunk = decodeFragmentChunk;

var MeshSource = function (_backend_1$ChunkSourc) {
    _inherits(MeshSource, _backend_1$ChunkSourc);

    function MeshSource(rpc, options) {
        _classCallCheck(this, MeshSource);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(MeshSource).call(this, rpc, options));

        var fragmentSource = _this3.fragmentSource = _this3.registerDisposer(rpc.getRef(options['fragmentSource']));
        fragmentSource.meshSource = _this3;
        return _this3;
    }

    _createClass(MeshSource, [{
        key: 'getChunk',
        value: function getChunk(objectId) {
            var key = `${ objectId.low }:${ objectId.high }`;
            var chunk = this.chunks.get(key);
            if (chunk === undefined) {
                chunk = this.getNewChunk_(ManifestChunk);
                chunk.initializeManifestChunk(key, objectId);
                this.addChunk(chunk);
            }
            return chunk;
        }
    }, {
        key: 'getFragmentChunk',
        value: function getFragmentChunk(manifestChunk, fragmentId) {
            var key = `${ manifestChunk.key }/${ fragmentId }`;
            var fragmentSource = this.fragmentSource;
            var chunk = fragmentSource.chunks.get(key);
            if (chunk === undefined) {
                chunk = fragmentSource.getNewChunk_(FragmentChunk);
                chunk.initializeFragmentChunk(key, manifestChunk, fragmentId);
                fragmentSource.addChunk(chunk);
            }
            return chunk;
        }
    }]);

    return MeshSource;
}(backend_1.ChunkSource);

exports.MeshSource = MeshSource;
;

var FragmentSource = function (_backend_1$ChunkSourc2) {
    _inherits(FragmentSource, _backend_1$ChunkSourc2);

    function FragmentSource() {
        _classCallCheck(this, FragmentSource);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(FragmentSource).call(this, ...args));

        _this4.meshSource = null;
        return _this4;
    }

    _createClass(FragmentSource, [{
        key: 'download',
        value: function download(chunk) {
            this.meshSource.downloadFragment(chunk);
        }
    }]);

    return FragmentSource;
}(backend_1.ChunkSource);

exports.FragmentSource = FragmentSource;
;
worker_rpc_1.registerSharedObject('mesh/FragmentSource', FragmentSource);

var MeshLayer = function (_worker_rpc_1$SharedO) {
    _inherits(MeshLayer, _worker_rpc_1$SharedO);

    function MeshLayer(rpc, options) {
        _classCallCheck(this, MeshLayer);

        // No need to increase reference count of chunkManager and visibleSegmentSet since our owner
        // counterpart will hold a reference to the owner counterparts of them.

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(MeshLayer).call(this, rpc, options));

        _this5.chunkManager = rpc.get(options['chunkManager']);
        _this5.visibleSegmentSet = rpc.get(options['visibleSegmentSet']);
        _this5.source = _this5.registerDisposer(rpc.getRef(options['source']));
        _this5.registerSignalBinding(_this5.chunkManager.recomputeChunkPriorities.add(_this5.updateChunkPriorities, _this5));
        _this5.registerSignalBinding(_this5.visibleSegmentSet.changed.add(_this5.handleVisibleSegmentSetChanged, _this5));
        return _this5;
    }

    _createClass(MeshLayer, [{
        key: 'handleVisibleSegmentSetChanged',
        value: function handleVisibleSegmentSetChanged() {
            this.chunkManager.scheduleUpdateChunkPriorities();
        }
    }, {
        key: 'updateChunkPriorities',
        value: function updateChunkPriorities() {
            var source = this.source;
            var chunkManager = this.chunkManager;

            for (var segment of this.visibleSegmentSet) {
                var manifestChunk = source.getChunk(segment);
                chunkManager.requestChunk(manifestChunk, base_1.ChunkPriorityTier.VISIBLE, MESH_OBJECT_MANIFEST_CHUNK_PRIORITY);
                if (manifestChunk.state === base_1.ChunkState.SYSTEM_MEMORY_WORKER) {
                    for (var fragmentId of manifestChunk.data['fragments']) {
                        var fragmentChunk = source.getFragmentChunk(manifestChunk, fragmentId);
                        chunkManager.requestChunk(fragmentChunk, base_1.ChunkPriorityTier.VISIBLE, MESH_OBJECT_FRAGMENT_CHUNK_PRIORITY);
                    }
                }
            }
        }
    }]);

    return MeshLayer;
}(worker_rpc_1.SharedObjectCounterpart);

;
worker_rpc_1.registerSharedObject('mesh/MeshLayer', MeshLayer);

/***/ },
/* 71 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var randomTempBuffer = new Uint32Array(2);
var trueBase = 0x100000000;
var stringConversionData = [];
for (var base = 2; base <= 36; ++base) {
    var lowDigits = Math.floor(32 / Math.log2(base));
    var lowBase = Math.pow(base, lowDigits);
    var lowDigits1 = Math.floor(lowDigits / 2);
    var lowBase1 = Math.pow(base, lowDigits1);
    var lowBase2 = Math.pow(base, lowDigits - lowDigits1);
    var patternString = `^[0-${ String.fromCharCode('0'.charCodeAt(0) + Math.min(9, base - 1)) }`;
    if (base > 10) {
        patternString += `a-${ String.fromCharCode('a'.charCodeAt(0) + base - 11) }`;
        patternString += `A-${ String.fromCharCode('A'.charCodeAt(0) + base - 11) }`;
    }
    var maxDigits = Math.ceil(64 / Math.log2(base));
    patternString += `]{1,${ maxDigits }}$`;
    var pattern = new RegExp(patternString);
    stringConversionData[base] = { lowDigits, lowBase, lowBase1, lowBase2, pattern };
}

var Uint64 = function () {
    function Uint64() {
        var low = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var high = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Uint64);

        this.low = low;
        this.high = high;
    }

    _createClass(Uint64, [{
        key: 'clone',
        value: function clone() {
            return new Uint64(this.low, this.high);
        }
    }, {
        key: 'assign',
        value: function assign(x) {
            this.low = x.low;
            this.high = x.high;
        }
    }, {
        key: 'toString',
        value: function toString() {
            var base = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

            var vLow = this.low,
                vHigh = this.high;
            if (vHigh === 0) {
                return vLow.toString(base);
            }
            vHigh *= trueBase;
            var _stringConversionData = stringConversionData[base];
            var lowBase = _stringConversionData.lowBase;
            var lowDigits = _stringConversionData.lowDigits;

            var vHighExtra = vHigh % lowBase;
            vHigh = Math.floor(vHigh / lowBase);
            vLow += vHighExtra;
            vHigh += Math.floor(vLow / lowBase);
            vLow = vLow % lowBase;
            var vLowStr = vLow.toString(base);
            return vHigh.toString(base) + '0'.repeat(lowDigits - vLowStr.length) + vLowStr;
        }
    }, {
        key: 'parseString',
        value: function parseString(s) {
            var base = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];
            var _stringConversionData2 = stringConversionData[base];
            var lowDigits = _stringConversionData2.lowDigits;
            var lowBase = _stringConversionData2.lowBase;
            var lowBase1 = _stringConversionData2.lowBase1;
            var lowBase2 = _stringConversionData2.lowBase2;
            var pattern = _stringConversionData2.pattern;

            if (!pattern.test(s)) {
                return false;
            }
            if (s.length <= lowDigits) {
                this.low = parseInt(s, base);
                this.high = 0;
                return true;
            }
            var splitPoint = s.length - lowDigits;
            var lowPrime = parseInt(s.substr(splitPoint), base);
            var highPrime = parseInt(s.substr(0, splitPoint), base);
            var highConverted = highPrime * lowBase;
            var high = Math.floor(highConverted / trueBase);
            var low = lowPrime + highPrime % trueBase * lowBase1 % trueBase * lowBase2 % trueBase;
            if (low > trueBase) {
                ++high;
                low -= trueBase;
            }
            if (low >>> 0 !== low || high >>> 0 !== high) {
                return false;
            }
            this.low = low;
            this.high = high;
            return true;
        }
    }, {
        key: 'valid',
        value: function valid() {
            var low = this.low;
            var high = this.high;

            return low >>> 0 === low && high >>> 0 === high;
        }
    }], [{
        key: 'less',
        value: function less(a, b) {
            return a.high < b.high || a.high === b.high && a.low < b.low;
        }
    }, {
        key: 'equal',
        value: function equal(a, b) {
            return a.low === b.low && a.high === b.high;
        }
    }, {
        key: 'min',
        value: function min(a, b) {
            return Uint64.less(a, b) ? a : b;
        }
    }, {
        key: 'random',
        value: function random() {
            crypto.getRandomValues(randomTempBuffer);
            return new Uint64(randomTempBuffer[0], randomTempBuffer[1]);
        }
    }, {
        key: 'parseString',
        value: function parseString(s) {
            var base = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

            var x = new Uint64();
            if (!x.parseString(s, base)) {
                throw new Error(`Failed to parse string as uint64 value: ${ JSON.stringify(s) }.`);
            }
            return x;
        }
    }]);

    return Uint64;
}();

Uint64.ZERO = new Uint64(0, 0);
exports.Uint64 = Uint64;
;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var worker_rpc_1 = __webpack_require__(2);
var hash_table_1 = __webpack_require__(73);
var signals_1 = __webpack_require__(6);
var uint64_1 = __webpack_require__(71);

var Uint64Set = function (_worker_rpc_1$SharedO) {
    _inherits(Uint64Set, _worker_rpc_1$SharedO);

    function Uint64Set() {
        _classCallCheck(this, Uint64Set);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Uint64Set).call(this, ...args));

        _this.hashTable = new hash_table_1.HashTable();
        _this.changed = new signals_1.Signal();
        return _this;
    }

    _createClass(Uint64Set, [{
        key: 'initializeCounterpart',
        value: function initializeCounterpart(rpc) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            options['type'] = 'Uint64Set';
            _get(Object.getPrototypeOf(Uint64Set.prototype), 'initializeCounterpart', this).call(this, rpc, options);
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            _get(Object.getPrototypeOf(Uint64Set.prototype), 'disposed', this).call(this);
            this.hashTable = null;
            this.changed = null;
        }
    }, {
        key: 'add_',
        value: function add_(x) {
            return this.hashTable.add(x.low, x.high);
        }
    }, {
        key: 'add',
        value: function add(x) {
            if (this.add_(x)) {
                var rpc = this.rpc;

                if (rpc) {
                    rpc.invoke('Uint64Set.add', { 'id': this.rpcId, 'value': x });
                }
                this.changed.dispatch(x, true);
            }
        }
    }, {
        key: 'has',
        value: function has(x) {
            return this.hashTable.has(x.low, x.high);
        }
    }, {
        key: Symbol.iterator,
        value: function* () {
            var temp = new uint64_1.Uint64();
            for (var x of this.hashTable[Symbol.iterator]()) {
                temp.low = x[0];
                temp.high = x[1];
                yield temp;
            }
        }
    }, {
        key: 'delete_',
        value: function delete_(x) {
            return this.hashTable.delete(x.low, x.high);
        }
    }, {
        key: 'delete',
        value: function _delete(x) {
            if (this.delete_(x)) {
                var rpc = this.rpc;

                if (rpc) {
                    rpc.invoke('Uint64Set.delete', { 'id': this.rpcId, 'value': x });
                }
                this.changed.dispatch(x, false);
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            if (this.hashTable.clear()) {
                var rpc = this.rpc;

                if (rpc) {
                    rpc.invoke('Uint64Set.clear', { 'id': this.rpcId });
                }
                this.changed.dispatch(null, false);
            }
        }
    }, {
        key: 'size',
        get: function () {
            return this.hashTable.size;
        }
    }], [{
        key: 'makeWithCounterpart',
        value: function makeWithCounterpart(rpc) {
            var obj = new Uint64Set();
            obj.initializeCounterpart(rpc);
            return obj;
        }
    }]);

    return Uint64Set;
}(worker_rpc_1.SharedObjectCounterpart);

exports.Uint64Set = Uint64Set;
;
worker_rpc_1.registerRPC('Uint64Set.add', function (x) {
    var obj = this.get(x['id']);
    if (obj.add_(x['value'])) {
        obj.changed.dispatch();
    }
});
worker_rpc_1.registerRPC('Uint64Set.delete', function (x) {
    var obj = this.get(x['id']);
    if (obj.delete_(x['value'])) {
        obj.changed.dispatch();
    }
});
worker_rpc_1.registerRPC('Uint64Set.clear', function (x) {
    var obj = this.get(x['id']);
    if (obj.hashTable.clear()) {
        obj.changed.dispatch();
    }
});
worker_rpc_1.registerSharedObject('Uint64Set', Uint64Set);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hash_function_1 = __webpack_require__(74);
exports.NUM_ALTERNATIVES = 3;
var DEFAULT_LOAD_FACTOR = 0.9;

var HashTable = function () {
    function HashTable() {
        var hashFunctions = arguments.length <= 0 || arguments[0] === undefined ? HashTable.generateHashFunctions(exports.NUM_ALTERNATIVES) : arguments[0];

        _classCallCheck(this, HashTable);

        this.loadFactor = DEFAULT_LOAD_FACTOR;
        this.size = 0;
        this.growFactor = 1.2;
        this.maxWidth = 4096;
        this.width = null;
        this.height = null;
        this.maxHeight = 8192;
        this.emptyLow = 4294967295;
        this.emptyHigh = 4294967295;
        this.maxRehashAttempts = 5;
        this.maxAttempts = 5;
        this.generation = 0;
        this.hashFunctions = hashFunctions;
        this.allocate(4, 1);
    }

    _createClass(HashTable, [{
        key: 'updateHashFunctions',
        value: function updateHashFunctions(numAlternatives) {
            this.hashFunctions = HashTable.generateHashFunctions(numAlternatives);
        }
    }, {
        key: 'getHash',
        value: function getHash(tableIndex, low, high) {
            var hashes = this.hashFunctions[tableIndex];
            var width = this.width,
                height = this.height;
            var x = hashes[0].compute(low, high) % width;
            var y = hashes[1].compute(low, high) % height;
            return 2 * (y * this.width + x);
        }
    }, {
        key: Symbol.iterator,
        value: function* () {
            var tableSize = this.width * this.height;
            var emptyLow = this.emptyLow,
                emptyHigh = this.emptyHigh;
            var temp = [0, 0];
            for (var table of this.tables) {
                for (var i = 0; i < tableSize; ++i) {
                    var low = table[2 * i],
                        high = table[2 * i + 1];
                    if (low !== emptyLow || high !== emptyHigh) {
                        temp[0] = low;
                        temp[1] = high;
                        yield temp;
                    }
                }
            }
        }
        /**
         * Returns the index of the table containing the specified element, or null if the element is not
         * present.
         */

    }, {
        key: 'hasWithTableIndex',
        value: function hasWithTableIndex(low, high) {
            var numTables = this.tables.length;
            for (var i = 0; i < numTables; ++i) {
                var h = this.getHash(i, low, high);
                var table = this.tables[i];
                if (table[h] === low && table[h + 1] === high) {
                    return i;
                }
            }
            return null;
        }
        /**
         * Returns true iff the specified element is present.
         */

    }, {
        key: 'has',
        value: function has(low, high) {
            var numTables = this.tables.length;
            for (var i = 0; i < numTables; ++i) {
                var h = this.getHash(i, low, high);
                var table = this.tables[i];
                if (table[h] === low && table[h + 1] === high) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'delete',
        value: function _delete(low, high) {
            var numTables = this.tables.length;
            for (var i = 0; i < numTables; ++i) {
                var h = this.getHash(i, low, high);
                var table = this.tables[i];
                if (table[h] === low && table[h + 1] === high) {
                    table[h] = this.emptyLow;
                    table[h + 1] = this.emptyHigh;
                    ++this.generation;
                    this.size--;
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'clear',
        value: function clear() {
            if (this.size === 0) {
                return false;
            }
            this.size = 0;
            ++this.generation;
            var tables = this.tables;
            var emptyLow = this.emptyLow;
            var emptyHigh = this.emptyHigh;

            var numTables = tables.length;
            for (var i = 0; i < numTables; ++i) {
                var table = tables[i];
                var tableSize = table.length;
                for (var j = 0; j < tableSize; j += 2) {
                    table[j] = emptyLow;
                    table[j + 1] = emptyHigh;
                }
            }
            return true;
        }
    }, {
        key: 'tryToInsert',
        value: function tryToInsert(low, high) {
            var attempt = 0;
            var emptyLow = this.emptyLow;
            var emptyHigh = this.emptyHigh;
            var maxAttempts = this.maxAttempts;
            var tables = this.tables;

            var numTables = tables.length;
            var tableIndex = Math.floor(Math.random() * numTables);
            while (true) {
                var h = this.getHash(tableIndex, low, high);
                var table = tables[tableIndex];
                var newLow = table[h],
                    newHigh = table[h + 1];
                table[h] = low;
                table[h + 1] = high;
                if (newLow === emptyLow && newHigh === emptyHigh) {
                    return null;
                }
                low = newLow;
                high = newHigh;
                if (++attempt === maxAttempts) {
                    break;
                }
                tableIndex = (tableIndex + Math.floor(Math.random() * (numTables - 1))) % numTables;
            }
            return [low, high];
        }
    }, {
        key: 'allocate',
        value: function allocate(width, height) {
            var tableSize = width * height;
            this.width = width;
            this.height = height;
            var numAlternatives = this.hashFunctions.length;
            var tables = this.tables = new Array(numAlternatives);
            for (var i = 0; i < numAlternatives; ++i) {
                tables[i] = new Uint32Array(tableSize * 2);
            }
            this.maxAttempts = tableSize;
            var emptyLow = this.emptyLow,
                emptyHigh = this.emptyHigh;
            for (var table of tables) {
                for (var _i = 0; _i < tableSize; ++_i) {
                    table[2 * _i] = emptyLow;
                    table[2 * _i + 1] = emptyHigh;
                }
            }
            this.capacity = tableSize * this.tables.length * this.loadFactor;
        }
    }, {
        key: 'rehash',
        value: function rehash(oldTables, width, height) {
            this.allocate(width, height);
            this.updateHashFunctions(oldTables.length);
            for (var table of oldTables) {
                var tableSize = table.length / 2;
                for (var i = 0; i < tableSize; ++i) {
                    var h = 2 * i;
                    var low = table[h],
                        high = table[h + 1];
                    if (low !== 0 || high !== 0) {
                        if (this.tryToInsert(low, high) !== null) {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
    }, {
        key: 'grow',
        value: function grow(desiredTableSize) {
            var oldTables = this.tables;
            var width = this.width;
            var height = this.height;
            var maxWidth = this.maxWidth;
            var maxHeight = this.maxHeight;

            while (true) {
                var origTableSize = width * height;
                width = Math.min(maxWidth, Math.ceil(desiredTableSize / this.height));
                if (width * height < desiredTableSize) {
                    height = Math.min(maxHeight, Math.ceil(desiredTableSize / this.width));
                }
                var tableSize = width * height;
                if (tableSize < desiredTableSize && tableSize === origTableSize) {
                    throw new Error('Maximum table size exceeded');
                }
                for (var rehashAttempt = 0; rehashAttempt < this.maxRehashAttempts; ++rehashAttempt) {
                    if (this.rehash(oldTables, width, height)) {
                        return;
                    }
                }
                desiredTableSize = Math.ceil(this.growFactor * desiredTableSize);
            }
        }
    }, {
        key: 'add',
        value: function add(low, high) {
            if (this.has(low, high)) {
                return false;
            }
            ++this.generation;
            if (++this.size > this.capacity) {
                this.grow(Math.ceil(this.growFactor * this.width * this.height));
            }
            while (true) {
                var result = this.tryToInsert(low, high);
                if (result == null) {
                    return true;
                }
                low = result[0];
                high = result[1];
                this.grow(this.width * this.height);
            }
        }
    }], [{
        key: 'generateHashFunctions',
        value: function generateHashFunctions() {
            var numAlternatives = arguments.length <= 0 || arguments[0] === undefined ? exports.NUM_ALTERNATIVES : arguments[0];

            var hashFunctions = [];
            for (var alt = 0; alt < numAlternatives; ++alt) {
                var curFunctions = [hash_function_1.HashFunction.generate(), hash_function_1.HashFunction.generate()];
                hashFunctions.push(curFunctions);
            }
            return hashFunctions;
        }
    }]);

    return HashTable;
}();

exports.HashTable = HashTable;
;

/***/ },
/* 74 */
/***/ function(module, exports) {

/**
 * @license
 * Copyright 2016 Google Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.PRIME_MODULUS = 4093;

var HashFunction = function () {
    function HashFunction(a0, a1, b, c) {
        _classCallCheck(this, HashFunction);

        this.a0 = a0;
        this.a1 = a1;
        this.b = b;
        this.c = c;
    }

    _createClass(HashFunction, [{
        key: "computeDotProduct",
        value: function computeDotProduct(low, high) {
            var a0 = this.a0;
            var a1 = this.a1;

            var a0DotLow = a0[0] * (low & 0xFF) + a0[1] * (low >> 8 & 0xFF) + a0[2] * (low >> 16 & 0xFF) + a0[3] * (low >> 24 & 0xFF);
            var a1DotHigh = a1[0] * (high & 0xFF) + a1[1] * (high >> 8 & 0xFF) + a1[2] * (high >> 16 & 0xFF) + a1[3] * (high >> 24 & 0xFF);
            return a0DotLow + a1DotHigh;
        }
    }, {
        key: "compute",
        value: function compute(low, high) {
            var b = this.b;
            var c = this.c;

            var x = this.computeDotProduct(low, high);
            var x2 = x * x % exports.PRIME_MODULUS;
            var result = (x + x2 * c + b) % exports.PRIME_MODULUS;
            return result;
        }
    }, {
        key: "toString",
        value: function toString() {
            return `new HashFunction(Float32Array.of(${ this.a0 }), Float32Array.of(${ this.a1 }), ${ this.b }, ${ this.c })`;
        }
    }], [{
        key: "generate",
        value: function generate() {
            function genCoeff() {
                return Math.floor(Math.random() * exports.PRIME_MODULUS);
            }
            function genVector() {
                return Float32Array.of(genCoeff(), genCoeff(), genCoeff(), genCoeff());
            }
            return new HashFunction(genVector(), genVector(), genCoeff(), genCoeff());
        }
    }]);

    return HashFunction;
}();

exports.HashFunction = HashFunction;
;

/***/ }
/******/ ]);
//# sourceMappingURL=chunk_worker.bundle.js.map
'''
