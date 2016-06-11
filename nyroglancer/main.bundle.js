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
__webpack_require__(56);
__webpack_require__(57);
__webpack_require__(59);
__webpack_require__(60);
module.exports = __webpack_require__(73);


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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(2);
var api_1 = __webpack_require__(13);
var base_1 = __webpack_require__(16);
var factory_1 = __webpack_require__(17);
var base_2 = __webpack_require__(19);
var frontend_1 = __webpack_require__(34);
var completion_1 = __webpack_require__(18);
var status_1 = __webpack_require__(4);
var geom_1 = __webpack_require__(21);
var json_1 = __webpack_require__(11);
var SERVER_DATA_TYPES = new Map();
SERVER_DATA_TYPES.set('UINT8', base_2.DataType.UINT8);
SERVER_DATA_TYPES.set('FLOAT', base_2.DataType.FLOAT32);
SERVER_DATA_TYPES.set('UINT64', base_2.DataType.UINT64);

var VolumeInfo = function VolumeInfo(obj) {
    _classCallCheck(this, VolumeInfo);

    try {
        json_1.verifyObject(obj);
        this.numChannels = json_1.verifyPositiveInt(obj['channelCount']);
        this.dataType = json_1.verifyMapKey(obj['channelType'], SERVER_DATA_TYPES);
        this.voxelSize = json_1.parseXYZ(geom_1.vec3.create(), obj['pixelSize'], json_1.verifyFinitePositiveFloat);
        this.upperVoxelBound = json_1.parseXYZ(geom_1.vec3.create(), obj['volumeSize'], json_1.verifyPositiveInt);
    } catch (parseError) {
        throw new Error(`Failed to parse BrainMaps volume geometry: ${ parseError.message }`);
    }
};

exports.VolumeInfo = VolumeInfo;
;

var VolumeChunkSource = function (_frontend_1$VolumeChu) {
    _inherits(VolumeChunkSource, _frontend_1$VolumeChu);

    function VolumeChunkSource(chunkManager, spec, instance, key, scaleIndex, encoding) {
        _classCallCheck(this, VolumeChunkSource);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunkSource).call(this, chunkManager, spec));

        _this.instance = instance;
        _this.key = key;
        _this.encoding = encoding;
        _this.initializeCounterpart(chunkManager.rpc, {
            'type': 'brainmaps/VolumeChunkSource',
            'instance': instance,
            'key': key,
            'scaleIndex': scaleIndex,
            'encoding': encoding
        });
        return _this;
    }

    _createClass(VolumeChunkSource, [{
        key: 'toString',
        value: function toString() {
            return `brainmaps-${ api_1.INSTANCE_IDENTIFIERS[this.instance] }:volume:${ this.key }`;
        }
    }]);

    return VolumeChunkSource;
}(frontend_1.VolumeChunkSource);

exports.VolumeChunkSource = VolumeChunkSource;
;

var MultiscaleVolumeChunkSource = function () {
    function MultiscaleVolumeChunkSource(instance, key, obj) {
        _classCallCheck(this, MultiscaleVolumeChunkSource);

        this.instance = instance;
        this.key = key;
        try {
            json_1.verifyObject(obj);
            var scales = this.scales = json_1.parseArray(obj['geometry'], x => new VolumeInfo(x));
            if (scales.length === 0) {
                throw new Error('Expected at least one scale.');
            }
            var baseScale = scales[0];
            var numChannels = this.numChannels = baseScale.numChannels;
            var dataType = this.dataType = baseScale.dataType;
            for (var scaleIndex = 1, numScales = scales.length; scaleIndex < numScales; ++scaleIndex) {
                var scale = scales[scaleIndex];
                if (scale.dataType !== dataType) {
                    throw new Error(`Scale ${ scaleIndex } has data type ${ base_2.DataType[scale.dataType] } but scale 0 has data type ${ base_2.DataType[dataType] }.`);
                }
                if (scale.numChannels !== numChannels) {
                    throw new Error(`Scale ${ scaleIndex } has ${ scale.numChannels } channel(s) but scale 0 has ${ numChannels } channels.`);
                }
            }
            // Infer the VolumeType from the data type and number of channels.
            var volumeType = base_2.VolumeType.UNKNOWN;
            if (numChannels === 1) {
                switch (dataType) {
                    case base_2.DataType.UINT64:
                        volumeType = base_2.VolumeType.SEGMENTATION;
                        break;
                    case base_2.DataType.UINT8:
                    case base_2.DataType.FLOAT32:
                        volumeType = base_2.VolumeType.IMAGE;
                        break;
                }
            }
            this.volumeType = volumeType;
        } catch (parseError) {
            throw new Error(`Failed to parse BrainMaps multiscale volume specification: ${ parseError.message }`);
        }
    }

    _createClass(MultiscaleVolumeChunkSource, [{
        key: 'getSources',
        value: function getSources(chunkManager) {
            var encoding = base_1.VolumeChunkEncoding.RAW;
            // if (this.volumeType === VolumeType.SEGMENTATION) {
            //   encoding = VolumeChunkEncoding.COMPRESSED_SEGMENTATION;
            // } else
            if (this.volumeType === base_2.VolumeType.IMAGE && this.dataType === base_2.DataType.UINT8) {
                encoding = base_1.VolumeChunkEncoding.JPEG;
            }
            return this.scales.map((volumeInfo, scaleIndex) => Array.from(base_2.VolumeChunkSpecification.getDefaults({
                voxelSize: volumeInfo.voxelSize,
                dataType: volumeInfo.dataType,
                numChannels: volumeInfo.numChannels,
                lowerVoxelBound: geom_1.vec3.fromValues(0, 0, 0),
                upperVoxelBound: volumeInfo.upperVoxelBound,
                volumeType: this.volumeType
            })).map(spec => {
                var cacheKey = json_1.stableStringify({
                    'instance': this.instance,
                    'key': this.key,
                    'scale': scaleIndex,
                    'encoding': encoding
                });
                return chunkManager.getChunkSource(VolumeChunkSource, cacheKey, () => new VolumeChunkSource(chunkManager, spec, this.instance, this.key, scaleIndex, encoding));
            }));
        }
        /**
         * Meshes are not supported.
         */

    }, {
        key: 'getMeshSource',
        value: function getMeshSource(chunkManager) {
            return null;
        }
    }]);

    return MultiscaleVolumeChunkSource;
}();

exports.MultiscaleVolumeChunkSource = MultiscaleVolumeChunkSource;
;
var existingVolumes = new Map();
function getVolume(instance, key) {
    var cacheKey = json_1.stableStringify({ 'instance': instance, 'key': key });
    var existingResult = existingVolumes.get(cacheKey);
    if (existingResult !== undefined) {
        return existingResult;
    }
    var promise = api_1.makeRequest(instance, 'GET', `/v1beta2/volumes/${ key }`, 'json').then(response => new MultiscaleVolumeChunkSource(instance, key, response));
    existingVolumes.set(cacheKey, promise);
    return promise;
}
exports.getVolume = getVolume;

var VolumeList = function VolumeList(response) {
    _classCallCheck(this, VolumeList);

    this.hierarchicalVolumeIds = new Map();
    try {
        json_1.verifyObject(response);
        var volumeIds = this.volumeIds = json_1.parseArray(response['volumeId'], json_1.verifyString);
        volumeIds.sort();
        var hierarchicalSets = new Map();
        for (var volumeId of volumeIds) {
            var componentStart = 0;
            while (true) {
                var nextColon = volumeId.indexOf(':', componentStart);
                if (nextColon === -1) {
                    nextColon = undefined;
                } else {
                    ++nextColon;
                }
                var groupString = volumeId.substring(0, componentStart);
                var group = hierarchicalSets.get(groupString);
                if (group === undefined) {
                    group = new Set();
                    hierarchicalSets.set(groupString, group);
                }
                group.add(volumeId.substring(componentStart, nextColon));
                if (nextColon === undefined) {
                    break;
                }
                componentStart = nextColon;
            }
        }
        var hierarchicalVolumeIds = this.hierarchicalVolumeIds;

        for (var _ref3 of hierarchicalSets) {
            var _ref2 = _slicedToArray(_ref3, 2);

            var _group = _ref2[0];
            var valueSet = _ref2[1];

            hierarchicalVolumeIds.set(_group, Array.from(valueSet));
        }
    } catch (parseError) {
        throw new Error(`Failed to parse Brain Maps volume list reply: ${ parseError.message }`);
    }
};

exports.VolumeList = VolumeList;
;
var volumeListCache = new Map();
function getVolumeList(instance) {
    var promise = volumeListCache.get(instance);
    if (promise === undefined) {
        promise = api_1.makeRequest(instance, 'GET', '/v1beta2/volumes/', 'json').then(response => new VolumeList(response));
        var description = `Google ${ api_1.INSTANCE_NAMES[instance] } volume list`;
        status_1.StatusMessage.forPromise(promise, {
            delay: true,
            initialMessage: `Retrieving ${ description }.`,
            errorPrefix: `Error retrieving ${ description }: `
        });
        volumeListCache.set(instance, promise);
    }
    return promise;
}
exports.getVolumeList = getVolumeList;
function volumeCompleter(instance, url) {
    return getVolumeList(instance).then(volumeList => {
        var lastColon = url.lastIndexOf(':');
        var splitPoint = lastColon + 1;
        var prefix = url.substring(0, splitPoint);
        var matchString = url.substring(splitPoint);
        var possibleMatches = volumeList.hierarchicalVolumeIds.get(prefix);
        if (possibleMatches === undefined) {
            return null;
        }
        return { offset: prefix.length, completions: completion_1.getPrefixMatches(matchString, possibleMatches) };
    });
}
exports.volumeCompleter = volumeCompleter;
function registerBrainmapsDataSource(instance) {
    var protocol = 'brainmaps';
    if (instance !== api_1.PRODUCTION_INSTANCE) {
        protocol += `-${ api_1.INSTANCE_IDENTIFIERS[instance].toLowerCase() }`;
    }
    factory_1.registerDataSourceFactory(protocol, {
        description: `Google ${ api_1.INSTANCE_NAMES[instance] } API`,
        getVolume: getVolume.bind(undefined, instance),
        volumeCompleter: volumeCompleter.bind(undefined, instance)
    });
}
exports.registerBrainmapsDataSource = registerBrainmapsDataSource;
registerBrainmapsDataSource(api_1.PRODUCTION_INSTANCE);

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
/**
 * @file
 * This implements the authentication API based on neuroglancer/util/google_auth2.
 */

var api_implementation_1 = __webpack_require__(3);
var status_1 = __webpack_require__(4);
var promise_1 = __webpack_require__(6);
var worker_rpc_1 = __webpack_require__(7);
var google_oauth2_1 = __webpack_require__(9);
var BRAINMAPS_SCOPE = 'https://www.googleapis.com/auth/brainmaps';
var nextGenerationId = 0;
api_implementation_1.implementation.getNewTokenPromise = function () {
    var status = new status_1.StatusMessage( /*delay=*/true);
    var authPromise = void 0;
    var tokenPromise = new Promise(function (resolve) {
        function writeLoginStatus() {
            var msg = arguments.length <= 0 || arguments[0] === undefined ? 'Brain Maps authorization required.' : arguments[0];
            var linkMessage = arguments.length <= 1 || arguments[1] === undefined ? 'Request authorization.' : arguments[1];

            status.setText(msg + '  ');
            var button = document.createElement('button');
            button.textContent = linkMessage;
            status.element.appendChild(button);
            button.addEventListener('click', () => {
                login( /*immediate=*/false);
            });
            status.setVisible(true);
        }
        function login(immediate) {
            if (authPromise !== undefined) {
                promise_1.cancelPromise(authPromise);
            }
            writeLoginStatus('Waiting for Brain Maps authorization...', 'Retry');
            authPromise = google_oauth2_1.authenticateGoogleOAuth2({ clientId: ("639403125587-4k5hgdfumtrvur8v48e3pr7oo91d765k.apps.googleusercontent.com"), scopes: [BRAINMAPS_SCOPE], immediate: immediate });
            authPromise.then(token => {
                token['generationId'] = nextGenerationId++;
                resolve(token);
            }, reason => {
                if (immediate) {
                    writeLoginStatus();
                } else {
                    writeLoginStatus(`Brain Maps authorization failed: ${ reason }.`, 'Retry');
                }
            });
            promise_1.callFinally(authPromise, () => {
                authPromise = undefined;
            });
        }
        login( /*immediate=*/true);
    });
    promise_1.callFinally(tokenPromise, () => {
        status.dispose();
    });
    return tokenPromise;
};
worker_rpc_1.registerRPC('brainmaps.requestToken', function (x) {
    var rpc = this;
    api_implementation_1.getToken(x['invalidToken']).then(function (authResult) {
        rpc.invoke('brainmaps.receiveToken', { 'authResult': authResult });
    });
});
api_implementation_1.implementation.token = null;
api_implementation_1.implementation.promise = null;

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(5);
var statusContainer = null;
exports.DEFAULT_STATUS_DELAY = 200;

var StatusMessage = function () {
    function StatusMessage() {
        var delay = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

        _classCallCheck(this, StatusMessage);

        if (statusContainer === null) {
            statusContainer = document.createElement('ul');
            statusContainer.id = 'statusContainer';
            document.body.appendChild(statusContainer);
        }
        var element = document.createElement('li');
        this.element = element;
        if (delay === true) {
            delay = exports.DEFAULT_STATUS_DELAY;
        }
        if (delay !== false) {
            this.setVisible(false);
            this.timer = setTimeout(this.setVisible.bind(this, true), delay);
        } else {
            this.timer = null;
        }
        statusContainer.appendChild(element);
    }

    _createClass(StatusMessage, [{
        key: 'dispose',
        value: function dispose() {
            statusContainer.removeChild(this.element);
            this.element = null;
            if (this.timer !== null) {
                clearTimeout(this.timer);
            }
        }
    }, {
        key: 'setText',
        value: function setText(text, makeVisible) {
            this.element.textContent = text;
            if (makeVisible) {
                this.setVisible(true);
            }
        }
    }, {
        key: 'setHTML',
        value: function setHTML(text, makeVisible) {
            this.element.innerHTML = text;
            if (makeVisible) {
                this.setVisible(true);
            }
        }
    }, {
        key: 'setVisible',
        value: function setVisible(value) {
            this.timer = null;
            this.element.style.display = value ? 'block' : 'none';
        }
    }], [{
        key: 'forPromise',
        value: function forPromise(promise, options) {
            var status = new StatusMessage(options.delay);
            status.setText(options.initialMessage);
            var dispose = status.dispose.bind(status);
            promise.then(dispose, reason => {
                var msg = void 0;
                if (reason instanceof Error) {
                    msg = reason.message;
                } else {
                    msg = '' + reason;
                }
                var _options$errorPrefix = options.errorPrefix;
                var errorPrefix = _options$errorPrefix === undefined ? '' : _options$errorPrefix;

                status.element.textContent = errorPrefix + msg + '  ';
                var button = document.createElement('button');
                button.textContent = 'Dismiss';
                button.addEventListener('click', () => {
                    status.dispose();
                });
                status.element.appendChild(button);
                status.setVisible(true);
            });
            return promise;
        }
    }]);

    return StatusMessage;
}();

exports.StatusMessage = StatusMessage;
;

/***/ },
/* 5 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 6 */
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
/* 7 */
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

var disposable_1 = __webpack_require__(8);
var IS_WORKER = (false);
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
/* 9 */
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

var dom_1 = __webpack_require__(10);
var json_1 = __webpack_require__(11);
var promise_1 = __webpack_require__(6);
var random_1 = __webpack_require__(12);
exports.AUTH_SERVER = 'https://accounts.google.com/o/oauth2/auth';
var AUTH_ORIGIN = 'https://accounts.google.com';
function embedRelayFrame(proxyName, rpcToken) {
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.id = proxyName;
    iframe.name = proxyName;
    var origin = location.origin;
    iframe.src = `https://accounts.google.com/o/oauth2/postmessageRelay?parent=${ encodeURIComponent(origin) }#rpctoken=${ rpcToken }`;
    document.body.appendChild(iframe);
}
exports.embedRelayFrame = embedRelayFrame;
;
;

var AuthHandler = function () {
    function AuthHandler() {
        _classCallCheck(this, AuthHandler);

        this.proxyName = `postmessageRelay${ random_1.getRandomHexString() }`;
        this.rpcToken = `${ random_1.getRandomHexString() }`;
        this.relayReadyService = `oauth2relayReady:${ this.rpcToken }`;
        this.oauth2CallbackService = `oauth2callback:${ this.rpcToken }`;
        this.pendingRequests = new Map();
        embedRelayFrame(this.proxyName, this.rpcToken);
        this.relayReadyPromise = new Promise(relayReadyPromiseResolve => {
            addEventListener('message', event => {
                if (event.origin !== AUTH_ORIGIN) {
                    return;
                }
                try {
                    var data = json_1.verifyObject(JSON.parse(event.data));
                    var service = json_1.verifyString(data['s']);
                    if (service === this.relayReadyService) {
                        relayReadyPromiseResolve();
                    }
                    if (service === this.oauth2CallbackService) {
                        var args = json_1.parseArray(data['a'], x => x);
                        var arg = json_1.verifyString(args[0]);
                        var origin = location.origin;
                        if (!arg.startsWith(origin + '#') && !arg.startsWith(origin + '?')) {
                            throw new Error(`oauth2callback: URL ${ JSON.stringify(arg) } does not match current origin ${ origin }.`);
                        }
                        var hashPart = arg.substring(origin.length + 1);
                        var parts = hashPart.split('&');
                        var params = new Map();
                        for (var part of parts) {
                            var match = part.match('^([a-z_]+)=(.*)$');
                            if (match === null) {
                                throw new Error(`oauth2callback: URL part ${ JSON.stringify(match) } does not match expected pattern.`);
                            }
                            params.set(match[1], match[2]);
                        }
                        var state = params.get('state');
                        if (state === undefined) {
                            throw new Error(`oauth2callback: State argument is missing.`);
                        }
                        var callbacks = this.pendingRequests.get(state);
                        if (callbacks === undefined) {
                            // Request may have been cancelled.
                            return;
                        }
                        var error = params.get('error');
                        if (error !== undefined) {
                            this.pendingRequests.delete(state);
                            var errorSubtype = params.get('error_subtype');
                            var fullMessage = error;
                            if (errorSubtype !== undefined) {
                                fullMessage += ': ' + errorSubtype;
                            }
                            callbacks.reject(fullMessage);
                            return;
                        }
                        var accessToken = params.get('access_token');
                        var tokenType = params.get('token_type');
                        var expiresIn = params.get('expires_in');
                        var scope = params.get('scope');
                        if (accessToken === undefined || tokenType === undefined || expiresIn === undefined || scope === undefined) {
                            throw new Error(`oauth2callback: URL lacks expected parameters.`);
                        }
                        this.pendingRequests.delete(state);
                        callbacks.resolve({
                            accessToken: accessToken,
                            tokenType: tokenType,
                            expiresIn: expiresIn,
                            scope: scope
                        });
                        return;
                    }
                } catch (parseError) {
                    throw new Error(`Invalid message received from ${ AUTH_ORIGIN }: ${ JSON.stringify(event.data) }: ${ parseError.message }.`);
                }
            });
        });
    }

    _createClass(AuthHandler, [{
        key: 'getAuthPromise',
        value: function getAuthPromise(state) {
            var promise = promise_1.makeCancellablePromise((resolve, reject) => {
                this.pendingRequests.set(state, { resolve, reject });
            });
            promise_1.callFinally(promise, () => {
                this.pendingRequests.delete(state);
            });
            return promise;
        }
    }, {
        key: 'makeAuthRequestUrl',
        value: function makeAuthRequestUrl(options) {
            var url = `${ exports.AUTH_SERVER }?client_id=${ encodeURIComponent(options.clientId) }`;
            url += `&redirect_uri=postmessage`;
            url += `&response_type=token`;
            var _options$origin = options.origin;
            var origin = _options$origin === undefined ? location.origin : _options$origin;

            url += `&origin=${ encodeURIComponent(origin) }`;
            url += `&proxy=${ this.proxyName }`;
            url += `&include_granted_scopes=true`;
            url += `&scope=${ encodeURIComponent(options.scopes.join(' ')) }`;
            if (options.state) {
                url += `&state=${ options.state }`;
            }
            if (options.approvalPrompt) {
                url += `&approval_prompt=${ encodeURIComponent(options.approvalPrompt) }`;
            }
            if (options.loginHint) {
                url += `&login_hint=${ encodeURIComponent(options.loginHint) }`;
            }
            if (options.immediate) {
                url += `&immediate=true`;
            }
            return url;
        }
    }]);

    return AuthHandler;
}();

;
var authHandlerInstance = void 0;
function authHandler() {
    if (authHandlerInstance === undefined) {
        authHandlerInstance = new AuthHandler();
    }
    return authHandlerInstance;
}
function authenticateGoogleOAuth2(options) {
    var state = random_1.getRandomHexString();
    var handler = authHandler();
    var url = handler.makeAuthRequestUrl({
        state,
        clientId: options.clientId,
        scopes: options.scopes,
        approvalPrompt: options.approvalPrompt,
        loginHint: options.loginHint,
        immediate: options.immediate
    });
    var promise = handler.getAuthPromise(state);
    if (options.immediate) {
        // For immediate mode auth, we can wait until the relay is ready, since we aren't opening a new
        // window.
        handler.relayReadyPromise.then(() => {
            var iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            promise_1.callFinally(promise, () => {
                dom_1.removeFromParent(iframe);
            });
        });
    } else {
        (function () {
            var newWindow = open(url);
            promise_1.callFinally(promise, () => {
                newWindow.close();
            });
        })();
    }
    return promise;
}
exports.authenticateGoogleOAuth2 = authenticateGoogleOAuth2;

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

function removeChildren(element) {
    while (true) {
        var child = element.firstElementChild;
        if (!child) {
            break;
        }
        element.removeChild(child);
    }
}
exports.removeChildren = removeChildren;
function removeFromParent(element) {
    var parentElement = element.parentElement;

    if (parentElement) {
        parentElement.removeChild(element);
        return true;
    }
    return false;
}
exports.removeFromParent = removeFromParent;

/***/ },
/* 11 */
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
        return s === '"' ? '\'' : '"';
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
var SINGLE_QUOTE_STRING_PATTERN = /('(?:[^'\\]|(?:\\.))*')/;
var DOUBLE_QUOTE_STRING_PATTERN = /("(?:[^'\\]|(?:\\.))*")/;
var SINGLE_OR_DOUBLE_QUOTE_STRING_PATTERN = new RegExp(`${ SINGLE_QUOTE_STRING_PATTERN.source }|${ DOUBLE_QUOTE_STRING_PATTERN.source }`);
var DOUBLE_OR_SINGLE_QUOTE_STRING_PATTERN = new RegExp(`${ DOUBLE_QUOTE_STRING_PATTERN.source }|${ SINGLE_QUOTE_STRING_PATTERN.source }`);
//const stringLiteralPattern = /('(?:[^'\\]|(?:\\.))*')|("(?:[^"\\]|(?:\\.))*")/;
var DOUBLE_QUOTE_PATTERN = /^((?:[^"'\\]|(?:\\.))*)"/;
var SINGLE_QUOTE_PATTERN = /^((?:[^"'\\]|(?:\\.))*)'/;
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
            s += '\\';
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
    return convertStringLiteral(x, '\'', '"', DOUBLE_QUOTE_PATTERN);
}
exports.normalizeStringLiteral = normalizeStringLiteral;
// quoteChar: des
function convertJsonHelper(x, desiredCommaChar, desiredQuoteChar) {
    var commaSearch = /[&_,]/g;
    var quoteInitial = void 0;
    var quoteSearch = void 0;
    var stringLiteralPattern = void 0;
    if (desiredQuoteChar === '"') {
        quoteInitial = '\'';
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
    return convertJsonHelper(x, '_', '\'');
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
        s += before.replace(/\(/g, '[').replace(/\)/g, ']').replace('True', 'true').replace('False', 'false').replace(/,\s*([\}\]])/g, '$1');
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
/* 12 */
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

function getRandomHexString() {
    var numBits = arguments.length <= 0 || arguments[0] === undefined ? 128 : arguments[0];

    var numValues = Math.ceil(numBits / 32);
    var data = new Uint32Array(numValues);
    crypto.getRandomValues(data);
    var s = '';
    for (var i = 0; i < numValues; ++i) {
        s += ('00000000' + data[i].toString(16)).slice(-8);
    }
    return s;
}
exports.getRandomHexString = getRandomHexString;

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

var api_implementation_1 = __webpack_require__(3);
var http_request_1 = __webpack_require__(14);
var promise_1 = __webpack_require__(6);
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hash_1 = __webpack_require__(15);
var promise_1 = __webpack_require__(6);
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
    var urlProtocolPattern = /^([^:\/]+):\/\/([^\/]+)(\/.*)?$/;
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
/* 15 */
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
/* 16 */
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
/* 17 */
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

var promise_1 = __webpack_require__(6);
var completion_1 = __webpack_require__(18);
/**
 * Returns the length of the prefix of path that corresponds to the "group", according to the
 * specified separator.
 *
 * If the separator is not specified, gueses whether it is '/' or ':'.
 */
function findSourceGroupBasedOnSeparator(path, separator) {
    if (separator === undefined) {
        // Try to guess whether '/' or ':' is the separator.
        if (path.indexOf('/') === -1) {
            separator = ':';
        } else {
            separator = '/';
        }
    }
    var index = path.lastIndexOf(separator);
    if (index === -1) {
        return 0;
    }
    return index + 1;
}
exports.findSourceGroupBasedOnSeparator = findSourceGroupBasedOnSeparator;
/**
 * Returns the last "component" of path, according to the specified separator.
 * If the separator is not specified, gueses whether it is '/' or ':'.
 */
function suggestLayerNameBasedOnSeparator(path, separator) {
    var groupIndex = findSourceGroupBasedOnSeparator(path, separator);
    return path.substring(groupIndex);
}
exports.suggestLayerNameBasedOnSeparator = suggestLayerNameBasedOnSeparator;
var dataSourceFactories = new Map();
function registerDataSourceFactory(name, factory) {
    dataSourceFactories.set(name, factory);
}
exports.registerDataSourceFactory = registerDataSourceFactory;
var protocolPattern = /^(?:([a-zA-Z-+_]+):\/\/)?(.*)$/;
function getDataSource(url) {
    var m = url.match(protocolPattern);
    if (m === null || m[1] === undefined) {
        throw new Error(`Data source URL must have the form "<protocol>://<path>".`);
    }
    var dataSource = m[1];
    var factory = dataSourceFactories.get(dataSource);
    if (factory === undefined) {
        throw new Error(`Unsupported data source: ${ JSON.stringify(dataSource) }.`);
    }
    return [factory, m[2], dataSource];
}
function getVolume(url) {
    var _getDataSource = getDataSource(url);

    var _getDataSource2 = _slicedToArray(_getDataSource, 2);

    var factories = _getDataSource2[0];
    var path = _getDataSource2[1];

    return factories.getVolume(path);
}
exports.getVolume = getVolume;
function getMeshSource(chunkManager, url) {
    var lod = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

    var _getDataSource3 = getDataSource(url);

    var _getDataSource4 = _slicedToArray(_getDataSource3, 2);

    var factories = _getDataSource4[0];
    var path = _getDataSource4[1];

    return factories.getMeshSource(chunkManager, path, lod);
}
exports.getMeshSource = getMeshSource;
function getSkeletonSource(chunkManager, url) {
    var _getDataSource5 = getDataSource(url);

    var _getDataSource6 = _slicedToArray(_getDataSource5, 2);

    var factories = _getDataSource6[0];
    var path = _getDataSource6[1];

    return factories.getSkeletonSource(chunkManager, path);
}
exports.getSkeletonSource = getSkeletonSource;
function volumeCompleter(url) {
    // Check if url matches a protocol.
    var protocolMatch = url.match(protocolPattern);
    var protocol = protocolMatch[1];
    if (protocol === undefined) {
        // Return protocol completions.
        var completions = [];
        for (var _ref3 of dataSourceFactories) {
            var _ref2 = _slicedToArray(_ref3, 2);

            var name = _ref2[0];
            var _factory = _ref2[1];

            name = name + '://';
            if (name.startsWith(url)) {
                completions.push({ value: name, description: _factory.description });
            }
        }
        return Promise.resolve({ offset: 0, completions });
    }
    var factory = dataSourceFactories.get(protocol);
    if (factory !== undefined) {
        var subCompleter = factory.volumeCompleter;
        if (subCompleter !== undefined) {
            return promise_1.cancellableThen(subCompleter(protocolMatch[2]), completions => completion_1.applyCompletionOffset(protocol.length + 3, completions));
        }
    }
    return Promise.reject(null);
}
exports.volumeCompleter = volumeCompleter;
function suggestLayerName(url) {
    var _getDataSource7 = getDataSource(url);

    var _getDataSource8 = _slicedToArray(_getDataSource7, 2);

    var factories = _getDataSource8[0];
    var path = _getDataSource8[1];

    var suggestor = factories.suggestLayerName;
    if (suggestor !== undefined) {
        return suggestor(path);
    }
    return suggestLayerNameBasedOnSeparator(path);
}
exports.suggestLayerName = suggestLayerName;
function findSourceGroup(url) {
    var _getDataSource9 = getDataSource(url);

    var _getDataSource10 = _slicedToArray(_getDataSource9, 3);

    var factories = _getDataSource10[0];
    var path = _getDataSource10[1];
    var dataSourceName = _getDataSource10[2];

    var helper = factories.findSourceGroup || findSourceGroupBasedOnSeparator;
    return helper(path) + dataSourceName.length + 3;
}
exports.findSourceGroup = findSourceGroup;

/***/ },
/* 18 */
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

function applyCompletionOffset(offset, completionResult) {
    completionResult.offset += offset;
    return completionResult;
}
exports.applyCompletionOffset = applyCompletionOffset;
function getPrefixMatches(prefix, options) {
    var result = [];
    for (var option of options) {
        if (option.startsWith(prefix)) {
            result.push({ value: option });
        }
    }
    return result;
}
exports.getPrefixMatches = getPrefixMatches;
function getPrefixMatchesWithDescriptions(prefix, options, getValue, getDescription) {
    var result = [];
    for (var option of options) {
        var key = getValue(option);
        if (key.startsWith(prefix)) {
            result.push({ value: key, description: getDescription(option) });
        }
    }
    return result;
}
exports.getPrefixMatchesWithDescriptions = getPrefixMatchesWithDescriptions;

/***/ },
/* 19 */
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

var chunk_layout_1 = __webpack_require__(20);
var geom_1 = __webpack_require__(21);
var compare_1 = __webpack_require__(32);
var array_1 = __webpack_require__(33);
var worker_rpc_1 = __webpack_require__(7);
var geom_2 = __webpack_require__(21);
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
                            console.log('  doesn\'t intersect plane');
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
/* 20 */
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

var geom_1 = __webpack_require__(21);
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
/* 21 */
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

var gl_matrix_1 = __webpack_require__(22);
exports.vec2 = gl_matrix_1.vec2;
exports.vec3 = gl_matrix_1.vec3;
exports.vec4 = gl_matrix_1.vec4;
exports.mat3 = gl_matrix_1.mat3;
exports.mat4 = gl_matrix_1.mat4;
exports.quat = gl_matrix_1.quat;
var gl_matrix_2 = __webpack_require__(22);
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
/* 22 */
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

exports.glMatrix = __webpack_require__(23);
exports.mat2 = __webpack_require__(24);
exports.mat2d = __webpack_require__(25);
exports.mat3 = __webpack_require__(26);
exports.mat4 = __webpack_require__(27);
exports.quat = __webpack_require__(28);
exports.vec2 = __webpack_require__(31);
exports.vec3 = __webpack_require__(29);
exports.vec4 = __webpack_require__(30);

/***/ },
/* 23 */
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

var glMatrix = __webpack_require__(23);

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
/* 25 */
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

var glMatrix = __webpack_require__(23);

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
/* 26 */
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

var glMatrix = __webpack_require__(23);

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
/* 27 */
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

var glMatrix = __webpack_require__(23);

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
/* 28 */
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

var glMatrix = __webpack_require__(23);
var mat3 = __webpack_require__(26);
var vec3 = __webpack_require__(29);
var vec4 = __webpack_require__(30);

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
/* 29 */
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

var glMatrix = __webpack_require__(23);

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
/* 30 */
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

var glMatrix = __webpack_require__(23);

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
/* 31 */
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

var glMatrix = __webpack_require__(23);

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
/* 32 */
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
/* 34 */
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

var base_1 = __webpack_require__(19);
var geom_1 = __webpack_require__(21);
var disposable_1 = __webpack_require__(8);
var buffer_1 = __webpack_require__(35);
var shader_1 = __webpack_require__(36);
var base_2 = __webpack_require__(37);
var signals_1 = __webpack_require__(38);
var renderlayer_1 = __webpack_require__(39);
var frontend_1 = __webpack_require__(51);
var offscreen_1 = __webpack_require__(53);

var SliceView = function (_base_1$SliceViewBase) {
    _inherits(SliceView, _base_1$SliceViewBase);

    function SliceView(gl, chunkManager, layerManager) {
        _classCallCheck(this, SliceView);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SliceView).call(this));

        _this.gl = gl;
        _this.chunkManager = chunkManager;
        _this.layerManager = layerManager;
        _this.dataToViewport = geom_1.mat4.create();
        // Transforms viewport coordinates to OpenGL normalized device coordinates
        // [left: -1, right: 1], [top: 1, bottom: -1].
        _this.viewportToDevice = geom_1.mat4.create();
        // Equals viewportToDevice * dataToViewport.
        _this.dataToDevice = geom_1.mat4.create();
        _this.visibleChunks = new Map();
        _this.viewChanged = new signals_1.Signal();
        _this.renderingStale = true;
        _this.visibleChunksStale = true;
        _this.visibleLayersStale = false;
        _this.visibleLayerList = new Array();
        _this.newVisibleLayers = new Set();
        _this.offscreenFramebuffer = new offscreen_1.OffscreenFramebuffer(_this.gl, { numDataBuffers: 1, depthBuffer: false, stencilBuffer: true });
        geom_1.mat4.identity(_this.dataToViewport);
        _this.initializeCounterpart(_this.chunkManager.rpc, { 'type': 'SliceView', 'chunkManager': chunkManager.rpcId });
        _this.updateVisibleLayers();
        _this.registerSignalBinding(layerManager.layersChanged.add(() => {
            if (!_this.visibleLayersStale) {
                if (_this.hasValidViewport) {
                    _this.visibleLayersStale = true;
                    setTimeout(_this.updateVisibleLayers.bind(_this), 0);
                }
            }
        }));
        _this.viewChanged.add(() => {
            _this.renderingStale = true;
        });
        _this.registerSignalBinding(chunkManager.chunkQueueManager.visibleChunksChanged.add(_this.viewChanged.dispatch, _this.viewChanged));
        return _this;
    }

    _createClass(SliceView, [{
        key: 'updateVisibleLayers',
        value: function updateVisibleLayers() {
            if (!this.hasValidViewport) {
                return false;
            }
            this.visibleLayersStale = false;
            var visibleLayers = this.visibleLayers;
            var rpc = this.rpc;
            var rpcMessage = { 'id': this.rpcId };
            // FIXME: avoid allocation?
            var newVisibleLayers = this.newVisibleLayers;
            var changed = false;
            var visibleLayerList = this.visibleLayerList;
            visibleLayerList.length = 0;
            for (var renderLayer of this.layerManager.readyRenderLayers()) {
                if (renderLayer instanceof renderlayer_1.RenderLayer) {
                    newVisibleLayers.add(renderLayer);
                    visibleLayerList.push(renderLayer);
                    if (!visibleLayers.has(renderLayer)) {
                        visibleLayers.set(renderLayer, []);
                        renderLayer.redrawNeeded.add(this.viewChanged.dispatch, this.viewChanged);
                        rpcMessage['layerId'] = renderLayer.rpcId;
                        rpc.invoke('SliceView.addVisibleLayer', rpcMessage);
                        changed = true;
                    }
                }
            }
            for (var _renderLayer of visibleLayers.keys()) {
                if (!newVisibleLayers.has(_renderLayer)) {
                    visibleLayers.delete(_renderLayer);
                    _renderLayer.redrawNeeded.remove(this.viewChanged.dispatch, this.viewChanged);
                    rpcMessage['layerId'] = _renderLayer.rpcId;
                    rpc.invoke('SliceView.removeVisibleLayer', rpcMessage);
                    changed = true;
                }
            }
            newVisibleLayers.clear();
            if (changed) {
                this.visibleSourcesStale = true;
            }
            // Unconditionally call viewChanged, because layers may have been reordered even if the set of
            // sources is the same.
            this.viewChanged.dispatch();
            return changed;
        }
    }, {
        key: 'fixRelativeTo',
        value: function fixRelativeTo(navigationState, relativeMat) {
            if (relativeMat === undefined) {
                relativeMat = geom_1.mat4.create();
                geom_1.mat4.identity(relativeMat);
            }
            var tempMat = geom_1.mat4.create();
            var updateViewport = () => {
                if (!navigationState.valid) {
                    return;
                }
                navigationState.toMat4(tempMat);
                geom_1.mat4.multiply(tempMat, tempMat, relativeMat);
                this.setViewportToDataMatrix(tempMat);
            };
            this.registerSignalBinding(navigationState.changed.add(updateViewport));
            updateViewport();
        }
    }, {
        key: 'onViewportChanged',
        value: function onViewportChanged() {
            var width = this.width;
            var height = this.height;
            var viewportToDevice = this.viewportToDevice;
            var dataToViewport = this.dataToViewport;
            var dataToDevice = this.dataToDevice;

            geom_1.mat4.ortho(viewportToDevice, -width / 2, width / 2, height / 2, -height / 2, -1, 1);
            geom_1.mat4.multiply(dataToDevice, viewportToDevice, dataToViewport);
            this.visibleChunksStale = true;
            this.viewChanged.dispatch();
        }
    }, {
        key: 'setViewportSize',
        value: function setViewportSize(width, height) {
            if (_get(Object.getPrototypeOf(SliceView.prototype), 'setViewportSize', this).call(this, width, height)) {
                this.rpc.invoke('SliceView.updateView', { id: this.rpcId, width: width, height: height });
                // this.chunkManager.scheduleUpdateChunkPriorities();
                return true;
            }
            return false;
        }
    }, {
        key: 'onViewportToDataMatrixChanged',
        value: function onViewportToDataMatrixChanged() {
            var viewportToData = this.viewportToData;

            geom_1.mat4.invert(this.dataToViewport, viewportToData);
            this.rpc.invoke('SliceView.updateView', { id: this.rpcId, viewportToData: viewportToData });
        }
    }, {
        key: 'onHasValidViewport',
        value: function onHasValidViewport() {
            this.updateVisibleLayers();
        }
    }, {
        key: 'updateRendering',
        value: function updateRendering() {
            if (!this.renderingStale || !this.hasValidViewport || this.width === 0 || this.height === 0) {
                return;
            }
            this.renderingStale = false;
            this.maybeUpdateVisibleChunks();
            var gl = this.gl;
            var offscreenFramebuffer = this.offscreenFramebuffer;
            var width = this.width;
            var height = this.height;

            offscreenFramebuffer.bind(width, height);
            gl.disable(gl.SCISSOR_TEST);
            // we have viewportToData
            // we need: matrix that maps input x to the output x axis, scaled by
            gl.clearStencil(0);
            gl.clearColor(0, 0, 0, 0);
            gl.colorMask(true, true, true, true);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.enable(gl.STENCIL_TEST);
            gl.disable(gl.DEPTH_TEST);
            gl.stencilOpSeparate(
            /*face=*/gl.FRONT_AND_BACK, /*sfail=*/gl.KEEP, /*dpfail=*/gl.KEEP,
            /*dppass=*/gl.REPLACE);
            // console.log("Drawing sliceview");
            var renderLayerNum = 0;
            for (var renderLayer of this.visibleLayerList) {
                gl.clear(gl.STENCIL_BUFFER_BIT);
                gl.stencilFuncSeparate(
                /*face=*/gl.FRONT_AND_BACK,
                /*func=*/gl.GREATER,
                /*ref=*/1,
                /*mask=*/1);
                if (renderLayerNum === 1) {
                    // Turn on blending after the first layer.
                    gl.enable(gl.BLEND);
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                }
                renderLayer.draw(this);
                ++renderLayerNum;
            }
            gl.disable(gl.BLEND);
            gl.disable(gl.STENCIL_TEST);
            offscreenFramebuffer.unbind();
        }
    }, {
        key: 'maybeUpdateVisibleChunks',
        value: function maybeUpdateVisibleChunks() {
            if (!this.visibleChunksStale && !this.visibleSourcesStale) {
                // console.log("Not updating visible chunks");
                return false;
            }
            // console.log("Updating visible");
            this.visibleChunksStale = false;
            this.updateVisibleChunks();
            return true;
        }
    }, {
        key: 'updateVisibleChunks',
        value: function updateVisibleChunks() {
            var allVisibleChunks = this.visibleChunks;
            function getLayoutObject(chunkLayout) {
                var visibleChunks = allVisibleChunks.get(chunkLayout);
                if (visibleChunks === undefined) {
                    visibleChunks = [];
                    allVisibleChunks.set(chunkLayout, visibleChunks);
                } else {
                    visibleChunks.length = 0;
                }
                return visibleChunks;
            }
            function addChunk(chunkLayout, visibleChunks, positionInChunks) {
                var key = geom_1.vec3Key(positionInChunks);
                visibleChunks[visibleChunks.length] = key;
            }
            this.computeVisibleChunks(getLayoutObject, addChunk);
        }
    }]);

    return SliceView;
}(base_1.SliceViewBase);

exports.SliceView = SliceView;
;
var chunkFormatHandlers = new Array();
function registerChunkFormatHandler(factory) {
    chunkFormatHandlers.push(factory);
}
exports.registerChunkFormatHandler = registerChunkFormatHandler;
function getChunkFormatHandler(gl, spec) {
    for (var handler of chunkFormatHandlers) {
        var result = handler(gl, spec);
        if (result != null) {
            return result;
        }
    }
    throw new Error('No chunk format handler found.');
}

var VolumeChunkSource = function (_frontend_1$ChunkSour) {
    _inherits(VolumeChunkSource, _frontend_1$ChunkSour);

    function VolumeChunkSource(chunkManager, spec) {
        _classCallCheck(this, VolumeChunkSource);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunkSource).call(this, chunkManager));

        _this2.spec = spec;
        _this2.chunkFormatHandler = _this2.registerDisposer(getChunkFormatHandler(chunkManager.chunkQueueManager.gl, spec));
        return _this2;
    }

    _createClass(VolumeChunkSource, [{
        key: 'initializeCounterpart',
        value: function initializeCounterpart(rpc, options) {
            this.spec.toObject(options['spec'] = {});
            _get(Object.getPrototypeOf(VolumeChunkSource.prototype), 'initializeCounterpart', this).call(this, rpc, options);
        }
    }, {
        key: 'getValueAt',
        value: function getValueAt(position) {
            var chunkGridPosition = geom_1.vec3.create();
            var spec = this.spec;
            var chunkLayout = spec.chunkLayout;
            var offset = chunkLayout.offset;
            var chunkSize = chunkLayout.size;
            for (var i = 0; i < 3; ++i) {
                chunkGridPosition[i] = Math.floor((position[i] - offset[i]) / chunkSize[i]);
            }
            var key = geom_1.vec3Key(chunkGridPosition);
            var chunk = this.chunks.get(key);
            if (!chunk) {
                return null;
            }
            // Reuse temporary variable.
            var dataPosition = chunkGridPosition;
            var voxelSize = spec.voxelSize;
            for (var _i = 0; _i < 3; ++_i) {
                dataPosition[_i] = Math.floor((position[_i] - offset[_i] - chunkGridPosition[_i] * chunkSize[_i]) / voxelSize[_i]);
            }
            var chunkDataSize = chunk.chunkDataSize;
            for (var _i2 = 0; _i2 < 3; ++_i2) {
                if (dataPosition[_i2] >= chunkDataSize[_i2]) {
                    return undefined;
                }
            }
            return chunk.getValueAt(dataPosition);
        }
    }, {
        key: 'getChunk',
        value: function getChunk(x) {
            return this.chunkFormatHandler.getChunk(this, x);
        }
    }, {
        key: 'chunkFormat',
        get: function () {
            return this.chunkFormatHandler.chunkFormat;
        }
    }]);

    return VolumeChunkSource;
}(frontend_1.ChunkSource);

exports.VolumeChunkSource = VolumeChunkSource;
;

var VolumeChunk = function (_frontend_1$Chunk) {
    _inherits(VolumeChunk, _frontend_1$Chunk);

    function VolumeChunk(source, x) {
        _classCallCheck(this, VolumeChunk);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunk).call(this, source));

        _this3.chunkGridPosition = x['chunkGridPosition'];
        _this3.chunkDataSize = x['chunkDataSize'] || source.spec.chunkDataSize;
        _this3.state = base_2.ChunkState.SYSTEM_MEMORY;
        return _this3;
    }

    _createClass(VolumeChunk, [{
        key: 'chunkFormat',
        get: function () {
            return this.source.chunkFormat;
        }
    }]);

    return VolumeChunk;
}(frontend_1.Chunk);

exports.VolumeChunk = VolumeChunk;
;
/**
 * Helper for rendering a SliceView that has been pre-rendered to a texture.
 */

var SliceViewRenderHelper = function (_disposable_1$RefCoun) {
    _inherits(SliceViewRenderHelper, _disposable_1$RefCoun);

    function SliceViewRenderHelper(gl, emitter) {
        _classCallCheck(this, SliceViewRenderHelper);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(SliceViewRenderHelper).call(this));

        _this4.gl = gl;
        _this4.copyVertexPositionsBuffer = _this4.registerDisposer(buffer_1.Buffer.fromData(_this4.gl, new Float32Array([-1, -1, 0, 1, -1, +1, 0, 1, +1, +1, 0, 1, +1, -1, 0, 1]), _this4.gl.ARRAY_BUFFER, _this4.gl.STATIC_DRAW));
        _this4.copyTexCoordsBuffer = _this4.registerDisposer(buffer_1.Buffer.fromData(_this4.gl, new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]), _this4.gl.ARRAY_BUFFER, _this4.gl.STATIC_DRAW));
        _this4.textureCoordinateAdjustment = new Float32Array(4);
        var builder = new shader_1.ShaderBuilder(gl);
        builder.addVarying('vec2', 'vTexCoord');
        builder.addUniform('sampler2D', 'uSampler');
        builder.addInitializer(shader => {
            gl.uniform1i(shader.uniform('uSampler'), 0);
        });
        builder.addUniform('vec4', 'uColorFactor');
        builder.addUniform('vec4', 'uBackgroundColor');
        builder.addUniform('mat4', 'uProjectionMatrix');
        builder.addUniform('vec4', 'uTextureCoordinateAdjustment');
        builder.require(emitter);
        builder.setFragmentMain(`
vec4 sampledColor = texture2D(uSampler, vTexCoord);
if (sampledColor.a == 0.0) {
  sampledColor = uBackgroundColor;
}
emit(sampledColor * uColorFactor, vec4(0,0,0,0));
`);
        builder.addAttribute('vec4', 'aVertexPosition');
        builder.addAttribute('vec2', 'aTexCoord');
        builder.setVertexMain(`
vTexCoord = uTextureCoordinateAdjustment.xy + aTexCoord * uTextureCoordinateAdjustment.zw;
gl_Position = uProjectionMatrix * aVertexPosition;
`);
        _this4.shader = _this4.registerDisposer(builder.build());
        return _this4;
    }

    _createClass(SliceViewRenderHelper, [{
        key: 'draw',
        value: function draw(texture, projectionMatrix, colorFactor, backgroundColor, xStart, yStart, xEnd, yEnd) {
            var gl = this.gl;
            var shader = this.shader;
            var textureCoordinateAdjustment = this.textureCoordinateAdjustment;

            textureCoordinateAdjustment[0] = xStart;
            textureCoordinateAdjustment[1] = yStart;
            textureCoordinateAdjustment[2] = xEnd - xStart;
            textureCoordinateAdjustment[3] = yEnd - yStart;
            shader.bind();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniformMatrix4fv(shader.uniform('uProjectionMatrix'), false, projectionMatrix);
            gl.uniform4fv(shader.uniform('uColorFactor'), colorFactor);
            gl.uniform4fv(shader.uniform('uBackgroundColor'), backgroundColor);
            gl.uniform4fv(shader.uniform('uTextureCoordinateAdjustment'), textureCoordinateAdjustment);
            var aVertexPosition = shader.attribute('aVertexPosition');
            this.copyVertexPositionsBuffer.bindToVertexAttrib(aVertexPosition, 4);
            var aTexCoord = shader.attribute('aTexCoord');
            this.copyTexCoordsBuffer.bindToVertexAttrib(aTexCoord, 2);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
            gl.disableVertexAttribArray(aVertexPosition);
            gl.disableVertexAttribArray(aTexCoord);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }], [{
        key: 'get',
        value: function get(gl, key, emitter) {
            return gl.memoize.get(key, () => {
                return new SliceViewRenderHelper(gl, emitter);
            });
        }
    }]);

    return SliceViewRenderHelper;
}(disposable_1.RefCounted);

exports.SliceViewRenderHelper = SliceViewRenderHelper;
;

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = function () {
    function Buffer(gl, bufferType) {
        _classCallCheck(this, Buffer);

        this.gl = gl;
        this.bufferType = bufferType;
        this.gl = gl;
        this.buffer = gl.createBuffer();
        if (this.bufferType === undefined) {
            this.bufferType = gl.ARRAY_BUFFER;
        }
    }

    _createClass(Buffer, [{
        key: "bind",
        value: function bind() {
            this.gl.bindBuffer(this.bufferType, this.buffer);
        }
    }, {
        key: "bindToVertexAttrib",
        value: function bindToVertexAttrib(location, componentsPerVertexAttribute) {
            var attributeType = arguments.length <= 2 || arguments[2] === undefined ? this.gl.FLOAT : arguments[2];
            var normalized = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
            var stride = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
            var offset = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

            this.bind();
            this.gl.enableVertexAttribArray(location);
            this.gl.vertexAttribPointer(location, componentsPerVertexAttribute, attributeType, normalized, stride, offset);
        }
    }, {
        key: "setData",
        value: function setData(data, usage) {
            var gl = this.gl;
            if (usage === undefined) {
                usage = gl.STATIC_DRAW;
            }
            this.bind();
            gl.bufferData(this.bufferType, data, usage);
        }
    }, {
        key: "dispose",
        value: function dispose() {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = null;
            this.gl = null;
        }
    }], [{
        key: "fromData",
        value: function fromData(gl, data, bufferType, usage) {
            var buffer = new Buffer(gl, bufferType);
            buffer.setData(data, usage);
            return buffer;
        }
    }]);

    return Buffer;
}();

exports.Buffer = Buffer;
;

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var disposable_1 = __webpack_require__(8);
function getShader(gl, source, shaderType) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var msg = gl.getShaderInfoLog(shader);
        throw new Error('Error creating shader: ' + msg);
    }
    return shader;
}
exports.getShader = getShader;

var ShaderProgram = function (_disposable_1$RefCoun) {
    _inherits(ShaderProgram, _disposable_1$RefCoun);

    function ShaderProgram(gl, vertexSource, fragmentSource, uniformNames, attributeNames) {
        _classCallCheck(this, ShaderProgram);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShaderProgram).call(this));

        _this.gl = gl;
        _this.vertexSource = vertexSource;
        _this.fragmentSource = fragmentSource;
        _this.attributes = new Map();
        _this.uniforms = new Map();
        _this.textureUnits = null;
        var vertexShader = _this.vertexShader = getShader(gl, vertexSource, gl.VERTEX_SHADER);
        var fragmentShader = _this.fragmentShader = getShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
        // DEBUG
        // {
        //   let combinedSource = 'VERTEX SHADER\n\n' + vertexSource + '\n\n\nFRAGMENT SHADER\n\n' +
        //   fragmentSource + '\n';
        //   let w = window.open("about:blank", "_blank");
        //   w.document.write('<pre>' + combinedSource.replace('<', '&lt;').replace('>', '&gt;') +
        //   '</pre>');
        // }
        var shaderProgram = _this.program = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            var msg = gl.getProgramInfoLog(shaderProgram);
            // console.log(msg);
            // alert("Could not initialize shaders: " + msg);
            throw new Error('Could not initialize shaders: ' + msg);
        }
        var uniforms = _this.uniforms;
        var attributes = _this.attributes;

        if (uniformNames) {
            for (var name of uniformNames) {
                uniforms.set(name, gl.getUniformLocation(shaderProgram, name));
            }
        }
        if (attributeNames) {
            for (var _name of attributeNames) {
                attributes.set(_name, gl.getAttribLocation(shaderProgram, _name));
            }
        }
        return _this;
    }

    _createClass(ShaderProgram, [{
        key: 'uniform',
        value: function uniform(name) {
            return this.uniforms.get(name);
        }
    }, {
        key: 'attribute',
        value: function attribute(name) {
            return this.attributes.get(name);
        }
    }, {
        key: 'textureUnit',
        value: function textureUnit(symbol) {
            return this.textureUnits.get(symbol);
        }
    }, {
        key: 'bind',
        value: function bind() {
            this.gl.useProgram(this.program);
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            var gl = this.gl;

            gl.deleteShader(this.vertexShader);
            this.vertexShader = null;
            gl.deleteShader(this.fragmentShader);
            this.fragmentShader = null;
            gl.deleteProgram(this.program);
            this.program = null;
            this.gl = null;
            this.attributes = null;
            this.uniforms = null;
        }
    }]);

    return ShaderProgram;
}(disposable_1.RefCounted);

exports.ShaderProgram = ShaderProgram;
;

var ShaderCode = function () {
    function ShaderCode() {
        _classCallCheck(this, ShaderCode);

        this.code = '';
        this.parts = new Set();
    }

    _createClass(ShaderCode, [{
        key: 'add',
        value: function add(x) {
            if (this.parts.has(x)) {
                return;
            }
            this.parts.add(x);
            switch (typeof x) {
                case 'string':
                    this.code += x;
                    break;
                case 'function':
                    this.add(x());
                    break;
                default:
                    if (Array.isArray(x)) {
                        for (var y of x) {
                            this.add(y);
                        }
                    } else {
                        throw new Error('Invalid code type');
                    }
            }
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.code;
        }
    }]);

    return ShaderCode;
}();

exports.ShaderCode = ShaderCode;
;

var ShaderBuilder = function () {
    function ShaderBuilder(gl) {
        _classCallCheck(this, ShaderBuilder);

        this.gl = gl;
        this.nextSymbolID = 0;
        this.nextTextureUnit = 0;
        this.uniformsCode = '';
        this.attributesCode = '';
        this.varyingsCode = '';
        this.fragmentExtensionsSet = new Set();
        this.fragmentExtensions = '';
        this.vertexCode = new ShaderCode();
        this.vertexMain = '';
        this.fragmentCode = new ShaderCode();
        this.fragmentMain = '';
        this.required = new Set();
        this.uniforms = new Array();
        this.attributes = new Array();
        this.initializers = [];
        this.textureUnits = new Map();
    }

    _createClass(ShaderBuilder, [{
        key: 'allocateTextureUnit',
        value: function allocateTextureUnit(symbol) {
            var count = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

            if (this.textureUnits.has(symbol)) {
                throw new Error('Duplicate texture unit symbol: ' + symbol);
            }
            var old = this.nextTextureUnit;
            this.nextTextureUnit += count;
            this.textureUnits.set(symbol, old);
            return old;
        }
    }, {
        key: 'addTextureSampler2D',
        value: function addTextureSampler2D(name, symbol, extent) {
            var textureUnit = this.allocateTextureUnit(symbol, extent);
            this.addUniform('highp sampler2D', name, extent);
            this.addInitializer(shader => {
                if (extent) {
                    var textureUnits = new Int32Array(extent);
                    for (var i = 0; i < extent; ++i) {
                        textureUnits[i] = i + textureUnit;
                    }
                    shader.gl.uniform1iv(shader.uniform(name), textureUnits);
                } else {
                    shader.gl.uniform1i(shader.uniform(name), textureUnit);
                }
            });
            return textureUnit;
        }
    }, {
        key: 'symbol',
        value: function symbol(name) {
            return name + this.nextSymbolID++;
        }
    }, {
        key: 'addAttribute',
        value: function addAttribute(typeName, name) {
            this.attributes.push(name);
            this.attributesCode += `attribute ${ typeName } ${ name };\n`;
            return name;
        }
    }, {
        key: 'addVarying',
        value: function addVarying(typeName, name) {
            this.varyingsCode += `varying ${ typeName } ${ name };\n`;
        }
    }, {
        key: 'addUniform',
        value: function addUniform(typeName, name, extent) {
            this.uniforms.push(name);
            if (extent != null) {
                this.uniformsCode += `uniform ${ typeName } ${ name }[${ extent }];\n`;
            } else {
                this.uniformsCode += `uniform ${ typeName } ${ name };\n`;
            }
            return name;
        }
    }, {
        key: 'addFragmentExtension',
        value: function addFragmentExtension(name) {
            if (this.fragmentExtensionsSet.has(name)) {
                return;
            }
            this.fragmentExtensionsSet.add(name);
            this.fragmentExtensions += `#extension ${ name } : require\n`;
        }
    }, {
        key: 'addVertexCode',
        value: function addVertexCode(code) {
            this.vertexCode.add(code);
        }
    }, {
        key: 'addFragmentCode',
        value: function addFragmentCode(code) {
            this.fragmentCode.add(code);
        }
    }, {
        key: 'setVertexMain',
        value: function setVertexMain(code) {
            this.vertexMain = code;
        }
    }, {
        key: 'setFragmentMain',
        value: function setFragmentMain(code) {
            this.fragmentMain = code;
        }
    }, {
        key: 'addInitializer',
        value: function addInitializer(f) {
            this.initializers.push(f);
        }
    }, {
        key: 'require',
        value: function require(f) {
            if (this.required.has(f)) {
                return;
            }
            this.required.add(f);
            f(this);
        }
    }, {
        key: 'build',
        value: function build() {
            var vertexSource = `
precision highp float;
${ this.uniformsCode }
${ this.attributesCode }
${ this.varyingsCode }
${ this.vertexCode }
void main() {
${ this.vertexMain }
}
`;
            var fragmentSource = `
${ this.fragmentExtensions }
precision highp float;
${ this.uniformsCode }
${ this.varyingsCode }
${ this.fragmentCode }
void main() {
${ this.fragmentMain }
}
`;
            var shader = new ShaderProgram(this.gl, vertexSource, fragmentSource, this.uniforms, this.attributes);
            shader.textureUnits = this.textureUnits;
            var initializers = this.initializers;

            if (initializers.length > 0) {
                shader.bind();
                for (var initializer of initializers) {
                    initializer(shader);
                }
            }
            return shader;
        }
    }]);

    return ShaderBuilder;
}();

exports.ShaderBuilder = ShaderBuilder;
;

/***/ },
/* 37 */
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
/* 38 */
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
// We use the approach described in the following paper to determine the intersection between the
// viewport plane and a given 3-D chunk inside of a WebGL vertex shader:
//
// A Vertex Program for Efficient Box-Plane Intersection
// Christof Rezk Salama and Adreas Kolb
// VMV 2005.
// http://www.cg.informatik.uni-siegen.de/data/Publications/2005/rezksalamaVMV2005.pdf

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var buffer_1 = __webpack_require__(35);
var shader_1 = __webpack_require__(36);
var disposable_1 = __webpack_require__(8);
var geom_1 = __webpack_require__(21);
var layer_1 = __webpack_require__(40);
var base_1 = __webpack_require__(37);
var signals_1 = __webpack_require__(38);
var worker_rpc_1 = __webpack_require__(7);
var DEBUG_VERTICES = false;

var SliceViewShaderBuffers = function (_disposable_1$RefCoun) {
    _inherits(SliceViewShaderBuffers, _disposable_1$RefCoun);

    function SliceViewShaderBuffers(gl) {
        _classCallCheck(this, SliceViewShaderBuffers);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SliceViewShaderBuffers).call(this));

        _this.outputVertexIndices = _this.registerDisposer(buffer_1.Buffer.fromData(gl, new Float32Array([0, 1, 2, 3, 4, 5]), gl.ARRAY_BUFFER, gl.STATIC_DRAW));
        // This specifies the original, "uncorrected" vertex positions.
        // var vertexBasePositions = [
        //   0, 0, 0,
        //   1, 0, 0,
        //   0, 1, 0,
        //   0, 0, 1,
        //   1, 0, 1,
        //   1, 1, 0,
        //   0, 1, 1,
        //   1, 1, 1,
        // ];
        // This specifies the "corrected" vertex positions.
        _this.vertexBasePositions = [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1];
        // correct_index, vertex_position, uncorrected_index
        // 0:  0, 0, 0   0
        // 1:  1, 0, 0   1
        // 2:  0, 1, 0   2
        // 4:  0, 0, 1   3
        // 5:  1, 0, 1   4
        // 3:  1, 1, 0   5
        // 6:  0, 1, 1   6
        // 7:  1, 1, 1   7
        // This maps uncorrected vertex indices to corrected vertex indices.
        var vertexUncorrectedToCorrected = [0, 1, 2, 4, 5, 3, 6, 7];
        // This maps corrected vertex indices to uncorrected vertex indices.
        var vertexCorrectedToUncorrected = [0, 1, 2, 5, 3, 4, 6, 7];
        // Page 666
        var vertexBaseIndices = [0, 1, 1, 4, 4, 7, 4, 7, 1, 5, 0, 1, 1, 4, 4, 7, 0, 2, 2, 5, 5, 7, 5, 7, 2, 6, 0, 2, 2, 5, 5, 7, 0, 3, 3, 6, 6, 7, 6, 7, 3, 4, 0, 3, 3, 6, 6, 7];
        // Determined by looking at the figure and determining the corresponding
        // vertex order for each possible front vertex.
        var vertexPermutation = [0, 1, 2, 3, 4, 5, 6, 7, 1, 4, 5, 0, 3, 7, 2, 6, 2, 6, 0, 5, 7, 3, 1, 4, 3, 0, 6, 4, 1, 2, 7, 5, 4, 3, 7, 1, 0, 6, 5, 2, 5, 2, 1, 7, 6, 0, 4, 3, 6, 7, 3, 2, 5, 4, 0, 1, 7, 5, 4, 6, 2, 1, 3, 0];
        var vertexIndices = [];
        for (var p = 0; p < 8; ++p) {
            for (var i = 0; i < vertexBaseIndices.length; ++i) {
                vertexIndices.push(vertexUncorrectedToCorrected[vertexPermutation[vertexCorrectedToUncorrected[p] * 8 + vertexBaseIndices[i]]]);
            }
        }
        _this.vertexIndices = new Int32Array(vertexIndices);
        return _this;
    }

    _createClass(SliceViewShaderBuffers, null, [{
        key: 'get',
        value: function get(gl) {
            return gl.memoize.get('SliceViewShaderBuffers', () => new SliceViewShaderBuffers(gl));
        }
    }]);

    return SliceViewShaderBuffers;
}(disposable_1.RefCounted);

;
function findFrontVertexIndex(planeNormal) {
    // Determine which vertex is front.
    var frontVertexIndex = 0;
    for (var axis_i = 0; axis_i < 3; ++axis_i) {
        // If plane normal is negative in axis direction, then choose the vertex
        // with the maximum axis_i-coordinate.
        if (planeNormal[axis_i] < 0) {
            frontVertexIndex += 1 << axis_i;
        }
    }
    return frontVertexIndex;
}

var VolumeSliceVertexComputationManager = function (_disposable_1$RefCoun2) {
    _inherits(VolumeSliceVertexComputationManager, _disposable_1$RefCoun2);

    function VolumeSliceVertexComputationManager(gl) {
        _classCallCheck(this, VolumeSliceVertexComputationManager);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeSliceVertexComputationManager).call(this));

        _this2.data = _this2.registerDisposer(SliceViewShaderBuffers.get(gl));
        return _this2;
    }

    _createClass(VolumeSliceVertexComputationManager, [{
        key: 'defineShader',
        value: function defineShader(builder) {
            var data = this.data;
            // A number in [0, 6) specifying which vertex to compute.
            builder.addAttribute('highp float', 'aVertexIndexFloat');
            // Specifies translation of the current chunk.
            builder.addUniform('highp vec3', 'uTranslation');
            // Matrix by which computed vertices will be transformed.
            builder.addUniform('highp mat4', 'uProjectionMatrix');
            // Slice plane normal.
            builder.addUniform('highp vec3', 'uPlaneNormal');
            // Distance from the origin to the slice plane.
            builder.addUniform('highp float', 'uPlaneDistance');
            // Two-dimensional array of dimensions [6x4], specifying the first and
            // second vertex index for each of the 4 candidate edges to test for each
            // computed vertex.
            builder.addUniform('highp ivec2', 'uVertexIndex', 24);
            // Base vertex positions.
            builder.addUniform('highp vec3', 'uVertexBasePosition', 8);
            builder.addInitializer(shader => {
                shader.gl.uniform3fv(shader.uniform('uVertexBasePosition'), new Float32Array(data.vertexBasePositions));
            });
            // Chunk size.
            builder.addUniform('highp vec3', 'uChunkSize');
            // Position within chunk of vertex.
            builder.addVarying('highp vec3', 'vChunkPosition');
            // varying highp vec2 vTexCoord;
            builder.setVertexMain(`
int vertexIndex = int(aVertexIndexFloat);
for (int e = 0; e < 4; ++e) {
  highp ivec2 vidx = uVertexIndex[vertexIndex*4 + e];
  highp vec3 v1 = uChunkSize * uVertexBasePosition[vidx.x];
  highp vec3 v2 = uChunkSize * uVertexBasePosition[vidx.y];
  highp vec3 vStart = v1 + uTranslation;
  highp vec3 vDir = v2 - v1;
  highp float denom = dot(vDir, uPlaneNormal);
  if (abs(denom) > 1e-6) {
    highp float lambda = (uPlaneDistance - dot(vStart, uPlaneNormal)) / denom;
    if ((lambda >= 0.0) && (lambda <= 1.0)) {
      highp vec3 position = vStart + lambda * vDir;
      gl_Position = uProjectionMatrix * vec4(position, 1.0);
      vChunkPosition = mix(uVertexBasePosition[vidx.x], uVertexBasePosition[vidx.y], lambda);
      break;
    }
  }
}
`);
        }
    }, {
        key: 'computeVerticesDebug',
        value: function computeVerticesDebug(uChunkSize, uPlaneDistance, uPlaneNormal, uTranslation, uProjectionMatrix) {
            var frontVertexIndex = findFrontVertexIndex(uPlaneNormal);
            var uVertexIndex = this.data.vertexIndices.subarray(frontVertexIndex * 48, (frontVertexIndex + 1) * 48);
            var vidx = [0, 0];
            var v = [geom_1.vec3.create(), geom_1.vec3.create()];
            var vStart = geom_1.vec3.create(),
                vDir = geom_1.vec3.create(),
                position = geom_1.vec3.create(),
                gl_Position = geom_1.vec3.create(),
                vChunkPosition = geom_1.vec3.create();
            var vertexBasePositions = new Float32Array(this.data.vertexBasePositions);
            var uVertexBasePosition = i => vertexBasePositions.subarray(i * 3, i * 3 + 3);
            for (var vertexIndex = 0; vertexIndex < 6; ++vertexIndex) {
                for (var e = 0; e < 4; ++e) {
                    for (var j = 0; j < 2; ++j) {
                        vidx[j] = uVertexIndex[2 * (vertexIndex * 4 + e) + j];
                        geom_1.vec3.multiply(v[j], uChunkSize, uVertexBasePosition(vidx[j]));
                    }
                    geom_1.vec3.add(vStart, v[0], uTranslation);
                    geom_1.vec3.subtract(vDir, v[1], v[0]);
                    var denom = geom_1.vec3.dot(vDir, uPlaneNormal);
                    if (Math.abs(denom) > 1e-6) {
                        var lambda = (uPlaneDistance - geom_1.vec3.dot(vStart, uPlaneNormal)) / denom;
                        if (lambda >= 0.0 && lambda <= 1.0) {
                            geom_1.vec3.scaleAndAdd(position, vStart, vDir, lambda);
                            geom_1.vec3.transformMat4(gl_Position, geom_1.vec4.fromValues(position[0], position[1], position[2], 1.0), uProjectionMatrix);
                            geom_1.vec3.scale(vChunkPosition, uVertexBasePosition(vidx[0]), 1.0 - lambda);
                            geom_1.vec3.scaleAndAdd(vChunkPosition, vChunkPosition, uVertexBasePosition(vidx[1]), lambda);
                            console.log(`vertex ${ vertexIndex } at ${ gl_Position }, vChunkPosition = ${ vChunkPosition }, edge dir = ${ vDir }, denom = ${ denom }`);
                            break;
                        }
                    }
                }
            }
        }
    }, {
        key: 'beginSlice',
        value: function beginSlice(gl, shader, dataToDeviceMatrix, sliceView) {
            var planeNormal = sliceView.viewportAxes[2];
            var frontVertexIndex = findFrontVertexIndex(planeNormal);
            gl.uniformMatrix4fv(shader.uniform('uProjectionMatrix'), false, dataToDeviceMatrix);
            gl.uniform3fv(shader.uniform('uPlaneNormal'), planeNormal.subarray(0, 3));
            gl.uniform1f(shader.uniform('uPlaneDistance'), sliceView.viewportPlaneDistanceToOrigin);
            var aVertexIndexFloat = shader.attribute('aVertexIndexFloat');
            this.data.outputVertexIndices.bindToVertexAttrib(aVertexIndexFloat, 1);
            gl.uniform2iv(shader.uniform('uVertexIndex'), this.data.vertexIndices.subarray(frontVertexIndex * 48, (frontVertexIndex + 1) * 48));
            if (DEBUG_VERTICES) {
                window['debug_sliceView'] = sliceView;
                window['debug_sliceView_dataToDevice'] = dataToDeviceMatrix;
            }
        }
    }, {
        key: 'endSlice',
        value: function endSlice(gl, shader) {
            var aVertexIndexFloat = shader.attribute('aVertexIndexFloat');
            gl.disableVertexAttribArray(aVertexIndexFloat);
        }
    }, {
        key: 'setupChunkSize',
        value: function setupChunkSize(gl, shader, chunkSize) {
            gl.uniform3fv(shader.uniform('uChunkSize'), chunkSize);
            if (DEBUG_VERTICES) {
                window['debug_sliceView_chunkSize'] = chunkSize;
            }
        }
    }, {
        key: 'drawChunk',
        value: function drawChunk(gl, shader, chunkPosition) {
            gl.uniform3fv(shader.uniform('uTranslation'), chunkPosition);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
            if (DEBUG_VERTICES) {
                var sliceView = window['debug_sliceView'];
                var chunkSize = window['debug_sliceView_chunkSize'];
                var dataToDeviceMatrix = window['debug_sliceView_dataToDevice'];
                this.computeVerticesDebug(chunkSize, sliceView.viewportPlaneDistanceToOrigin, sliceView.viewportAxes[2], chunkPosition, dataToDeviceMatrix);
            }
        }
    }], [{
        key: 'get',
        value: function get(gl) {
            return gl.memoize.get('sliceview.VolumeSliceVertexComputationManager', () => new VolumeSliceVertexComputationManager(gl));
        }
    }]);

    return VolumeSliceVertexComputationManager;
}(disposable_1.RefCounted);

;

var RenderLayer = function (_layer_1$RenderLayer) {
    _inherits(RenderLayer, _layer_1$RenderLayer);

    function RenderLayer(chunkManager, multiscaleSourcePromise) {
        _classCallCheck(this, RenderLayer);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(RenderLayer).call(this));

        _this3.chunkManager = chunkManager;
        _this3.sources = null;
        _this3.shader = null;
        _this3.shaderUpdated = true;
        _this3.redrawNeeded = new signals_1.Signal();
        _this3.voxelSize = null;
        _this3.boundingBox = null;
        _this3.rpcId = null;
        var gl = _this3.gl;
        _this3.vertexComputationManager = VolumeSliceVertexComputationManager.get(gl);
        Promise.resolve(multiscaleSourcePromise).then(multiscaleSource => {
            var sources = _this3.sources = multiscaleSource.getSources(chunkManager);
            var sourceIds = [];
            for (var alternatives of sources) {
                var alternativeIds = [];
                sourceIds.push(alternativeIds);
                for (var source of alternatives) {
                    alternativeIds.push(source.rpcId);
                }
            }
            var sharedObject = _this3.registerDisposer(new worker_rpc_1.SharedObject());
            sharedObject.initializeCounterpart(chunkManager.rpc, { 'type': 'sliceview/RenderLayer', 'sources': sourceIds });
            _this3.rpcId = sharedObject.rpcId;
            var spec = _this3.sources[0][0].spec;
            _this3.voxelSize = spec.voxelSize;
            _this3.boundingBox = new geom_1.BoundingBox(spec.lowerVoxelBound, spec.upperVoxelBound);
            _this3.setReady(true);
        });
        return _this3;
    }

    _createClass(RenderLayer, [{
        key: 'initializeShader',
        value: function initializeShader() {
            if (!this.shaderUpdated) {
                return;
            }
            this.shaderUpdated = false;
            var newShader = this.getShader();
            this.disposeShader();
            this.shader = newShader;
        }
    }, {
        key: 'disposeShader',
        value: function disposeShader() {
            if (this.shader) {
                this.shader.dispose();
                this.shader = null;
            }
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.disposeShader();
        }
    }, {
        key: 'getValueAt',
        value: function getValueAt(position) {
            for (var alternatives of this.sources) {
                for (var source of alternatives) {
                    var result = source.getValueAt(position);
                    if (result != null) {
                        return result;
                    }
                }
            }
            return null;
        }
    }, {
        key: 'getShaderKey',
        value: function getShaderKey() {
            return '';
        }
    }, {
        key: 'getShader',
        value: function getShader() {
            var key = this.getShaderKey() + '/' + this.chunkFormat.shaderKey;
            return this.gl.memoize.get(key, () => this.buildShader());
        }
    }, {
        key: 'buildShader',
        value: function buildShader() {
            var builder = new shader_1.ShaderBuilder(this.gl);
            this.defineShader(builder);
            return builder.build();
        }
    }, {
        key: 'defineShader',
        value: function defineShader(builder) {
            this.vertexComputationManager.defineShader(builder);
            builder.addFragmentCode(`
void emit(vec4 color) {
  gl_FragData[0] = color;
}
`);
            this.chunkFormat.defineShader(builder);
        }
    }, {
        key: 'beginSlice',
        value: function beginSlice(sliceView) {
            var dataToDevice = sliceView.dataToDevice;

            var gl = this.gl;
            var shader = this.shader;
            shader.bind();
            this.vertexComputationManager.beginSlice(gl, shader, dataToDevice, sliceView);
            return shader;
        }
    }, {
        key: 'endSlice',
        value: function endSlice(shader) {
            var gl = this.gl;
            this.vertexComputationManager.endSlice(gl, shader);
        }
    }, {
        key: 'draw',
        value: function draw(sliceView) {
            var visibleSources = sliceView.visibleLayers.get(this);
            if (visibleSources.length === 0) {
                return;
            }
            this.initializeShader();
            var gl = this.gl;
            var chunkPosition = geom_1.vec3.create();
            var chunkSize = geom_1.vec3.create();
            var shader = this.beginSlice(sliceView);
            var vertexComputationManager = this.vertexComputationManager;
            // All sources are required to have the same texture format.
            var chunkFormat = this.chunkFormat;
            chunkFormat.beginDrawing(gl, shader);

            var _loop = function (source) {
                var chunkLayout = source.spec.chunkLayout;
                var offset = chunkLayout.offset;

                var chunks = source.chunks;
                var originalChunkSize = chunkLayout.size;
                var chunkDataSize = null;
                var visibleChunks = sliceView.visibleChunks.get(chunkLayout);
                if (!visibleChunks) {
                    return 'continue';
                }
                var setChunkDataSize = newChunkDataSize => {
                    geom_1.vec3.multiply(chunkSize, newChunkDataSize, source.spec.voxelSize);
                    chunkDataSize = newChunkDataSize;
                    vertexComputationManager.setupChunkSize(gl, shader, chunkSize);
                };
                for (var key of visibleChunks) {
                    var chunk = chunks.get(key);
                    if (chunk && chunk.state === base_1.ChunkState.GPU_MEMORY) {
                        var newChunkDataSize = chunk.chunkDataSize;
                        if (newChunkDataSize !== chunkDataSize) {
                            setChunkDataSize(newChunkDataSize);
                        }
                        geom_1.vec3.multiply(chunkPosition, originalChunkSize, chunk.chunkGridPosition);
                        geom_1.vec3.add(chunkPosition, chunkPosition, offset);
                        chunkFormat.bindChunk(gl, shader, chunk);
                        vertexComputationManager.drawChunk(gl, shader, chunkPosition);
                    }
                }
            };

            for (var source of visibleSources) {
                var _ret = _loop(source);

                if (_ret === 'continue') continue;
            }
            chunkFormat.endDrawing(gl, shader);
            this.endSlice(shader);
        }
    }, {
        key: 'gl',
        get: function () {
            return this.chunkManager.chunkQueueManager.gl;
        }
    }, {
        key: 'chunkFormat',
        get: function () {
            return this.sources[0][0].chunkFormat;
        }
    }]);

    return RenderLayer;
}(layer_1.RenderLayer);

exports.RenderLayer = RenderLayer;
;

/***/ },
/* 40 */
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

var signals_1 = __webpack_require__(38);
var disposable_1 = __webpack_require__(8);
var uint64_1 = __webpack_require__(41);
var geom_1 = __webpack_require__(21);
var signal_binding_updater_1 = __webpack_require__(42);
var throttle = __webpack_require__(43);

var RenderLayer = function (_disposable_1$RefCoun) {
    _inherits(RenderLayer, _disposable_1$RefCoun);

    function RenderLayer() {
        _classCallCheck(this, RenderLayer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RenderLayer).call(this, ...args));

        _this.ready = false;
        _this.layerChanged = new signals_1.Signal();
        _this.readyStateChanged = new signals_1.Signal();
        _this.voxelSize = null;
        _this.boundingBox = null;
        return _this;
    }

    _createClass(RenderLayer, [{
        key: 'setReady',
        value: function setReady(value) {
            this.ready = value;
            this.readyStateChanged.dispatch();
            this.layerChanged.dispatch();
        }
    }, {
        key: 'handleAction',
        value: function handleAction(action) {
            // Do nothing by default.
        }
    }, {
        key: 'getValueAt',
        value: function getValueAt(x) {
            return undefined;
        }
    }]);

    return RenderLayer;
}(disposable_1.RefCounted);

exports.RenderLayer = RenderLayer;
;

var UserLayer = function (_disposable_1$RefCoun2) {
    _inherits(UserLayer, _disposable_1$RefCoun2);

    function UserLayer() {
        var renderLayers = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, UserLayer);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(UserLayer).call(this));

        _this2.layersChanged = new signals_1.Signal();
        _this2.readyStateChanged = new signals_1.Signal();
        _this2.specificationChanged = new signals_1.Signal();
        _this2.renderLayers = new Array();
        renderLayers.forEach(_this2.addRenderLayer.bind(_this2));
        return _this2;
    }

    _createClass(UserLayer, [{
        key: 'addRenderLayer',
        value: function addRenderLayer(layer) {
            this.renderLayers.push(layer);
            var layersChanged = this.layersChanged;
            var readyStateChanged = this.readyStateChanged;

            this.registerDisposer(layer);
            this.registerSignalBinding(layer.layerChanged.add(layersChanged.dispatch, layersChanged));
            this.registerSignalBinding(layer.readyStateChanged.add(readyStateChanged.dispatch, readyStateChanged));
            layersChanged.dispatch();
        }
    }, {
        key: 'getValueAt',
        value: function getValueAt(position, pickedRenderLayer, pickedObject) {
            var result = void 0;
            var renderLayers = this.renderLayers;

            if (renderLayers.indexOf(pickedRenderLayer) !== -1) {
                return pickedObject;
            }
            for (var layer of renderLayers) {
                if (!layer.ready) {
                    continue;
                }
                result = layer.getValueAt(position);
                if (result !== undefined) {
                    break;
                }
            }
            return result;
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            return null;
        }
    }, {
        key: 'makeDropdown',
        value: function makeDropdown(element) {
            return null;
        }
    }, {
        key: 'handleAction',
        value: function handleAction(action) {}
    }]);

    return UserLayer;
}(disposable_1.RefCounted);

exports.UserLayer = UserLayer;
;

var ManagedUserLayer = function (_disposable_1$RefCoun3) {
    _inherits(ManagedUserLayer, _disposable_1$RefCoun3);

    function ManagedUserLayer(name) {
        var layer = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var visible = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

        _classCallCheck(this, ManagedUserLayer);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ManagedUserLayer).call(this));

        _this3.name = name;
        _this3.visible = visible;
        _this3.readyStateChanged = new signals_1.Signal();
        _this3.layerChanged = new signals_1.Signal();
        _this3.specificationChanged = new signals_1.Signal();
        _this3.wasDisposed = false;
        _this3.layer_ = null;
        _this3.layer = layer;
        return _this3;
    }

    _createClass(ManagedUserLayer, [{
        key: 'updateSignalBindings',
        value: function updateSignalBindings(layer, callback) {
            callback(layer.layersChanged, this.handleLayerChanged, this);
            callback(layer.readyStateChanged, this.readyStateChanged.dispatch, this.readyStateChanged);
            callback(layer.specificationChanged, this.specificationChanged.dispatch, this.specificationChanged);
        }
    }, {
        key: 'handleLayerChanged',
        value: function handleLayerChanged() {
            if (this.visible) {
                this.layerChanged.dispatch();
            }
        }
    }, {
        key: 'setVisible',
        value: function setVisible(value) {
            if (value !== this.visible) {
                this.visible = value;
                this.layerChanged.dispatch();
            }
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            this.wasDisposed = true;
        }
    }, {
        key: 'layer',
        get: function () {
            return this.layer_;
        },
        set: function (layer) {
            var oldLayer = this.layer_;
            if (oldLayer != null) {
                this.updateSignalBindings(oldLayer, signal_binding_updater_1.removeSignalBinding);
            }
            this.layer_ = layer;
            if (layer != null) {
                this.updateSignalBindings(layer, signal_binding_updater_1.addSignalBinding);
                this.readyStateChanged.dispatch();
                this.handleLayerChanged();
            }
        }
    }]);

    return ManagedUserLayer;
}(disposable_1.RefCounted);

exports.ManagedUserLayer = ManagedUserLayer;
;

var LayerManager = function (_disposable_1$RefCoun4) {
    _inherits(LayerManager, _disposable_1$RefCoun4);

    function LayerManager() {
        _classCallCheck(this, LayerManager);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerManager).call(this, ...args));

        _this4.managedLayers = new Array();
        _this4.layersChanged = new signals_1.Signal();
        _this4.readyStateChanged = new signals_1.Signal();
        _this4.specificationChanged = new signals_1.Signal();
        _this4.boundPositions = new WeakSet();
        return _this4;
    }

    _createClass(LayerManager, [{
        key: 'updateSignalBindings',
        value: function updateSignalBindings(layer, callback) {
            callback(layer.layerChanged, this.layersChanged.dispatch, this.layersChanged);
            callback(layer.readyStateChanged, this.readyStateChanged.dispatch, this.readyStateChanged);
            callback(layer.specificationChanged, this.specificationChanged.dispatch, this.specificationChanged);
        }
        /**
         * Assumes ownership of an existing reference to managedLayer.
         */

    }, {
        key: 'addManagedLayer',
        value: function addManagedLayer(managedLayer) {
            this.updateSignalBindings(managedLayer, signal_binding_updater_1.addSignalBinding);
            this.managedLayers.push(managedLayer);
            this.layersChanged.dispatch();
            return managedLayer;
        }
        /**
         * Assumes ownership of an existing reference to userLayer.
         */

    }, {
        key: 'addUserLayer',
        value: function addUserLayer(name, userLayer, visible) {
            var managedLayer = new ManagedUserLayer(name, userLayer, visible);
            return this.addManagedLayer(managedLayer);
        }
    }, {
        key: 'readyRenderLayers',
        value: function* readyRenderLayers() {
            for (var managedUserLayer of this.managedLayers) {
                if (!managedUserLayer.visible || !managedUserLayer.layer) {
                    continue;
                }
                for (var renderLayer of managedUserLayer.layer.renderLayers) {
                    if (!renderLayer.ready) {
                        continue;
                    }
                    yield renderLayer;
                }
            }
        }
    }, {
        key: 'unbindManagedLayer',
        value: function unbindManagedLayer(managedLayer) {
            this.updateSignalBindings(managedLayer, signal_binding_updater_1.removeSignalBinding);
            managedLayer.dispose();
        }
    }, {
        key: 'clear',
        value: function clear() {
            for (var managedLayer of this.managedLayers) {
                this.unbindManagedLayer(managedLayer);
            }
            this.managedLayers.length = 0;
            this.layersChanged.dispatch();
        }
    }, {
        key: 'removeManagedLayer',
        value: function removeManagedLayer(managedLayer) {
            var index = this.managedLayers.indexOf(managedLayer);
            if (index === -1) {
                throw new Error(`Internal error: invalid managed layer.`);
            }
            this.unbindManagedLayer(managedLayer);
            this.managedLayers.splice(index, 1);
            this.layersChanged.dispatch();
        }
    }, {
        key: 'reorderManagedLayer',
        value: function reorderManagedLayer(oldIndex, newIndex) {
            var numLayers = this.managedLayers.length;
            if (oldIndex === newIndex || oldIndex < 0 || oldIndex >= numLayers || newIndex < 0 || newIndex >= numLayers) {
                // Don't do anything.
                return;
            }

            var _managedLayers$splice = this.managedLayers.splice(oldIndex, 1);

            var _managedLayers$splice2 = _slicedToArray(_managedLayers$splice, 1);

            var oldLayer = _managedLayers$splice2[0];

            this.managedLayers.splice(newIndex, 0, oldLayer);
            this.layersChanged.dispatch();
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            this.clear();
        }
    }, {
        key: 'getLayerByName',
        value: function getLayerByName(name) {
            return this.managedLayers.find(x => x.name === name);
        }
        /**
         * Asynchronously initialize the voxelSize and position based on the managed
         * layers.
         *
         * The first ready layer with an associated bounding box will set the position
         * to the center of the bounding box.
         */

    }, {
        key: 'initializePosition',
        value: function initializePosition(position) {
            if (position.valid) {
                // Nothing to do.
                return;
            }
            if (this.updatePositionFromLayers(position)) {
                return;
            }
            var boundPositions = this.boundPositions;

            if (boundPositions.has(position)) {
                return;
            }
            boundPositions.add(position);
            var handler = () => {
                this.updatePositionFromLayers(position);
                if (position.valid) {
                    this.readyStateChanged.remove(handler);
                    this.boundPositions.delete(position);
                }
            };
            this.readyStateChanged.add(handler);
        }
    }, {
        key: 'updatePositionFromLayers',
        value: function updatePositionFromLayers(position) {
            if (position.valid) {
                return;
            }
            for (var managedLayer of this.managedLayers) {
                var userLayer = managedLayer.layer;
                if (userLayer == null) {
                    continue;
                }
                for (var renderLayer of userLayer.renderLayers) {
                    if (!renderLayer.ready) {
                        continue;
                    }
                    if (!position.voxelSize.valid && renderLayer.voxelSize != null) {
                        geom_1.vec3.copy(position.voxelSize.size, renderLayer.voxelSize);
                        position.voxelSize.setValid();
                    }
                    if (!position.spatialCoordinatesValid && !position.voxelCoordinatesValid && renderLayer.boundingBox != null) {
                        var boundingBox = renderLayer.boundingBox;
                        var centerPosition = geom_1.vec3.create();
                        geom_1.vec3.add(centerPosition, boundingBox.lower, boundingBox.upper);
                        geom_1.vec3.scale(centerPosition, centerPosition, 0.5);
                        position.setVoxelCoordinates(centerPosition);
                    }
                }
            }
        }
    }, {
        key: 'invokeAction',
        value: function invokeAction(action) {
            for (var managedLayer of this.managedLayers) {
                if (!managedLayer.visible) {
                    continue;
                }
                var userLayer = managedLayer.layer;
                userLayer.handleAction(action);
                for (var renderLayer of userLayer.renderLayers) {
                    if (!renderLayer.ready) {
                        continue;
                    }
                    renderLayer.handleAction(action);
                }
            }
        }
    }, {
        key: 'renderLayers',
        get: function () {
            var layerManager = this;
            return {
                *[Symbol.iterator]() {
                    for (var managedLayer of layerManager.managedLayers) {
                        for (var renderLayer of managedLayer.layer.renderLayers) {
                            yield renderLayer;
                        }
                    }
                }
            };
        }
    }, {
        key: 'visibleRenderLayers',
        get: function () {
            var layerManager = this;
            return {
                *[Symbol.iterator]() {
                    for (var managedLayer of layerManager.managedLayers) {
                        if (!managedLayer.visible) {
                            continue;
                        }
                        for (var renderLayer of managedLayer.layer.renderLayers) {
                            yield renderLayer;
                        }
                    }
                }
            };
        }
    }]);

    return LayerManager;
}(disposable_1.RefCounted);

exports.LayerManager = LayerManager;
;
var MOUSE_STATE_UPDATE_INTERVAL = 50;

var MouseSelectionState = function () {
    function MouseSelectionState() {
        _classCallCheck(this, MouseSelectionState);

        this.changed = new signals_1.Signal();
        this.position = geom_1.vec3.create();
        this.active = false;
        this.pickedRenderLayer = null;
        this.pickedValue = new uint64_1.Uint64(0, 0);
        this.stale = false;
        this.triggerUpdate = throttle(() => {
            this.update();
        }, MOUSE_STATE_UPDATE_INTERVAL, { leading: true, trailing: true });
    }

    _createClass(MouseSelectionState, [{
        key: 'updateUnconditionally',
        value: function updateUnconditionally() {
            this.triggerUpdate.cancel();
            this.update();
            return this.active;
        }
    }, {
        key: 'updateIfStale',
        value: function updateIfStale() {
            if (this.stale) {
                this.update();
            }
        }
    }, {
        key: 'update',
        value: function update() {
            var updater = this.updater;

            this.stale = false;
            if (!updater) {
                this.setActive(false);
            } else {
                this.setActive(updater(this));
            }
        }
    }, {
        key: 'setActive',
        value: function setActive(value) {
            this.stale = false;
            if (this.active !== value || value === true) {
                this.active = value;
                this.changed.dispatch();
            }
        }
    }]);

    return MouseSelectionState;
}();

exports.MouseSelectionState = MouseSelectionState;
;

var LayerSelectedValues = function (_disposable_1$RefCoun5) {
    _inherits(LayerSelectedValues, _disposable_1$RefCoun5);

    function LayerSelectedValues(layerManager, mouseState) {
        _classCallCheck(this, LayerSelectedValues);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerSelectedValues).call(this));

        _this5.layerManager = layerManager;
        _this5.mouseState = mouseState;
        _this5.values = new Map();
        _this5.changed = new signals_1.Signal();
        _this5.needsUpdate = true;
        _this5.registerSignalBinding(mouseState.changed.add(_this5.handleChange, _this5));
        _this5.registerSignalBinding(layerManager.layersChanged.add(() => {
            _this5.handleLayerChange();
        }));
        return _this5;
    }
    /**
     * This should be called when the layer data may have changed, due to the set of managed layers
     * changing or new data having been received.
     */


    _createClass(LayerSelectedValues, [{
        key: 'handleLayerChange',
        value: function handleLayerChange() {
            if (this.mouseState.active) {
                this.handleChange();
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange() {
            this.needsUpdate = true;
            this.changed.dispatch();
        }
    }, {
        key: 'update',
        value: function update() {
            if (!this.needsUpdate) {
                return;
            }
            this.needsUpdate = false;
            var values = this.values;
            var mouseState = this.mouseState;
            values.clear();
            if (mouseState.active) {
                var position = mouseState.position;
                for (var layer of this.layerManager.managedLayers) {
                    var userLayer = layer.layer;
                    if (layer.visible && userLayer) {
                        values.set(userLayer, userLayer.getValueAt(position, mouseState.pickedRenderLayer, mouseState.pickedValue));
                    }
                }
            }
        }
    }, {
        key: 'get',
        value: function get(userLayer) {
            this.update();
            return this.values.get(userLayer);
        }
    }]);

    return LayerSelectedValues;
}(disposable_1.RefCounted);

exports.LayerSelectedValues = LayerSelectedValues;
;

var VisibleRenderLayerTracker = function (_disposable_1$RefCoun6) {
    _inherits(VisibleRenderLayerTracker, _disposable_1$RefCoun6);

    function VisibleRenderLayerTracker(layerManager, renderLayerType, layerAdded, layerRemoved) {
        _classCallCheck(this, VisibleRenderLayerTracker);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(VisibleRenderLayerTracker).call(this));

        _this6.layerManager = layerManager;
        _this6.renderLayerType = renderLayerType;
        _this6.layerAdded = layerAdded;
        _this6.layerRemoved = layerRemoved;
        _this6.visibleLayers = new Set();
        _this6.newVisibleLayers = new Set();
        _this6.updatePending = null;
        _this6.registerSignalBinding(layerManager.layersChanged.add(_this6.handleLayersChanged, _this6));
        _this6.updateVisibleLayers();
        return _this6;
    }

    _createClass(VisibleRenderLayerTracker, [{
        key: 'handleLayersChanged',
        value: function handleLayersChanged() {
            if (this.updatePending === null) {
                this.updatePending = setTimeout(() => {
                    this.updatePending = null;
                    this.updateVisibleLayers();
                }, 0);
            }
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            this.cancelUpdate();
            this.visibleLayers.forEach(this.layerRemoved);
            this.visibleLayers.clear();
        }
    }, {
        key: 'cancelUpdate',
        value: function cancelUpdate() {
            var updatePending = this.updatePending;

            if (updatePending !== null) {
                clearTimeout(updatePending);
                updatePending = null;
            }
        }
    }, {
        key: 'updateVisibleLayers',
        value: function updateVisibleLayers() {
            var visibleLayers = this.visibleLayers;
            var newVisibleLayers = this.newVisibleLayers;
            var renderLayerType = this.renderLayerType;
            var layerAdded = this.layerAdded;
            var layerRemoved = this.layerRemoved;

            for (var renderLayer of this.layerManager.readyRenderLayers()) {
                if (renderLayer instanceof renderLayerType) {
                    var typedLayer = renderLayer;
                    newVisibleLayers.add(typedLayer);
                    if (!visibleLayers.has(typedLayer)) {
                        visibleLayers.add(typedLayer);
                        layerAdded(typedLayer);
                    }
                }
            }
            for (var _renderLayer of visibleLayers) {
                if (!newVisibleLayers.has(_renderLayer)) {
                    visibleLayers.delete(_renderLayer);
                    layerRemoved(_renderLayer);
                }
            }
            newVisibleLayers.clear();
        }
    }, {
        key: 'getVisibleLayers',
        value: function getVisibleLayers() {
            if (this.updatePending !== null) {
                this.cancelUpdate();
                this.updateVisibleLayers();
            }
            return this.visibleLayers;
        }
    }]);

    return VisibleRenderLayerTracker;
}(disposable_1.RefCounted);

exports.VisibleRenderLayerTracker = VisibleRenderLayerTracker;
;

/***/ },
/* 41 */
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

function removeSignalBinding(signal, handler, context) {
    signal.remove(handler, context);
}
exports.removeSignalBinding = removeSignalBinding;
function addSignalBinding(signal, handler, context) {
    signal.add(handler, context);
}
exports.addSignalBinding = addSignalBinding;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

var debounce = __webpack_require__(44),
    isObject = __webpack_require__(45);

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide an options object to indicate whether
 * `func` should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(45),
    now = __webpack_require__(46),
    toNumber = __webpack_require__(47);

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide an options object to indicate whether `func` should be invoked on
 * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent calls
 * to the debounced function return the result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
 * on the trailing edge of the timeout only if the debounced function is
 * invoked more than once during the `wait` timeout.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ },
/* 45 */
/***/ function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ },
/* 46 */
/***/ function(module, exports) {

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
function now() {
  return Date.now();
}

module.exports = now;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(48),
    isObject = __webpack_require__(45),
    isSymbol = __webpack_require__(49);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = isFunction(value.valueOf) ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(45);

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

module.exports = isFunction;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

var isObjectLike = __webpack_require__(50);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;


/***/ },
/* 50 */
/***/ function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ },
/* 51 */
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

var base_1 = __webpack_require__(37);
var worker_rpc_1 = __webpack_require__(7);
var signals_1 = __webpack_require__(38);
var memoize_1 = __webpack_require__(52);
var DEBUG_CHUNK_UPDATES = false;

var Chunk = function () {
    function Chunk(source) {
        _classCallCheck(this, Chunk);

        this.source = source;
        this.state = base_1.ChunkState.SYSTEM_MEMORY;
    }

    _createClass(Chunk, [{
        key: 'copyToGPU',
        value: function copyToGPU(gl) {
            this.state = base_1.ChunkState.GPU_MEMORY;
        }
    }, {
        key: 'freeGPUMemory',
        value: function freeGPUMemory(gl) {
            this.state = base_1.ChunkState.SYSTEM_MEMORY;
        }
    }, {
        key: 'gl',
        get: function () {
            return this.source.gl;
        }
    }]);

    return Chunk;
}();

exports.Chunk = Chunk;
;

var ChunkQueueManager = function (_worker_rpc_1$SharedO) {
    _inherits(ChunkQueueManager, _worker_rpc_1$SharedO);

    function ChunkQueueManager(rpc, gl, capacities) {
        _classCallCheck(this, ChunkQueueManager);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChunkQueueManager).call(this));

        _this.gl = gl;
        _this.visibleChunksChanged = new signals_1.Signal();
        _this.pendingChunkUpdates = null;
        _this.pendingChunkUpdatesTail = null;
        /**
         * If non-null, deadline in milliseconds since epoch after which
         * chunk copies to the GPU may not start (until the next frame).
         */
        _this.chunkUpdateDeadline = null;
        _this.chunkUpdateDelay = 30;
        _this.initializeCounterpart(rpc, {
            'type': 'ChunkQueueManager',
            'gpuMemoryCapacity': capacities.gpuMemory.toObject(),
            'systemMemoryCapacity': capacities.systemMemory.toObject(),
            'downloadCapacity': capacities.download.toObject()
        });
        return _this;
    }

    _createClass(ChunkQueueManager, [{
        key: 'scheduleChunkUpdate',
        value: function scheduleChunkUpdate() {
            var deadline = this.chunkUpdateDeadline;
            var delay = void 0;
            if (deadline === null || Date.now() < deadline) {
                delay = 0;
            } else {
                delay = this.chunkUpdateDelay;
            }
            setTimeout(this.processPendingChunkUpdates.bind(this), delay);
        }
    }, {
        key: 'processPendingChunkUpdates',
        value: function processPendingChunkUpdates() {
            var deadline = this.chunkUpdateDeadline;
            if (deadline !== null && Date.now() > deadline) {
                // No time to perform chunk update now, we will wait some more.
                setTimeout(this.processPendingChunkUpdates.bind(this), this.chunkUpdateDelay);
                return;
            }
            var update = this.pendingChunkUpdates;
            var rpc = this.rpc;

            var source = rpc.get(update['source']);
            if (DEBUG_CHUNK_UPDATES) {
                console.log(`${ Date.now() } Chunk.update processed: ${ source.rpcId } ${ update['id'] } ${ update['state'] }`);
            }
            var newState = update['state'];
            if (newState === base_1.ChunkState.EXPIRED) {
                // FIXME: maybe use freeList for chunks here
                source.deleteChunk(update['id']);
            } else {
                var chunk = void 0;
                var key = update['id'];
                if (update['new']) {
                    chunk = source.getChunk(update);
                    source.addChunk(key, chunk);
                } else {
                    chunk = source.chunks.get(key);
                }
                var oldState = chunk.state;
                if (newState !== oldState) {
                    switch (newState) {
                        case base_1.ChunkState.GPU_MEMORY:
                            // console.log("Copying to GPU", chunk);
                            chunk.copyToGPU(this.gl);
                            this.visibleChunksChanged.dispatch();
                            break;
                        case base_1.ChunkState.SYSTEM_MEMORY:
                            chunk.freeGPUMemory(this.gl);
                            break;
                        default:
                            throw new Error(`INTERNAL ERROR: Invalid chunk state: ${ base_1.ChunkState[newState] }`);
                    }
                }
            }
            var nextUpdate = this.pendingChunkUpdates = update.nextUpdate;
            if (nextUpdate != null) {
                this.scheduleChunkUpdate();
            } else {
                this.pendingChunkUpdatesTail = null;
            }
        }
    }]);

    return ChunkQueueManager;
}(worker_rpc_1.SharedObject);

exports.ChunkQueueManager = ChunkQueueManager;
;
worker_rpc_1.registerRPC('Chunk.update', function (x) {
    var source = this.get(x['source']);
    if (DEBUG_CHUNK_UPDATES) {
        console.log(`${ Date.now() } Chunk.update received: ${ source.rpcId } ${ x['id'] } ${ x['state'] } with chunkDataSize ${ x['chunkDataSize'] }`);
    }
    var queueManager = source.chunkManager.chunkQueueManager;
    var pendingTail = queueManager.pendingChunkUpdatesTail;
    if (pendingTail == null) {
        queueManager.pendingChunkUpdates = x;
        queueManager.pendingChunkUpdatesTail = x;
        queueManager.scheduleChunkUpdate();
    } else {
        pendingTail.nextUpdate = x;
        queueManager.pendingChunkUpdatesTail = x;
    }
});

var ChunkManager = function (_worker_rpc_1$SharedO2) {
    _inherits(ChunkManager, _worker_rpc_1$SharedO2);

    function ChunkManager(chunkQueueManager) {
        _classCallCheck(this, ChunkManager);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChunkManager).call(this));

        _this2.chunkQueueManager = chunkQueueManager;
        _this2.chunkSourceCache = new Map();
        _this2.registerDisposer(chunkQueueManager.addRef());
        _this2.initializeCounterpart(chunkQueueManager.rpc, { 'type': 'ChunkManager', 'chunkQueueManager': chunkQueueManager.rpcId });
        return _this2;
    }

    _createClass(ChunkManager, [{
        key: 'getChunkSource',
        value: function getChunkSource(constructor, key, getter) {
            var chunkSourceCache = this.chunkSourceCache;

            var sources = chunkSourceCache.get(constructor);
            if (sources === undefined) {
                sources = new memoize_1.Memoize();
                chunkSourceCache.set(constructor, sources);
            }
            return sources.get(key, getter);
        }
    }]);

    return ChunkManager;
}(worker_rpc_1.SharedObject);

exports.ChunkManager = ChunkManager;
;

var ChunkSource = function (_worker_rpc_1$SharedO3) {
    _inherits(ChunkSource, _worker_rpc_1$SharedO3);

    function ChunkSource(chunkManager) {
        _classCallCheck(this, ChunkSource);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChunkSource).call(this));

        _this3.chunkManager = chunkManager;
        _this3.chunks = new Map();
        _this3.registerDisposer(chunkManager.addRef());
        return _this3;
    }

    _createClass(ChunkSource, [{
        key: 'initializeCounterpart',
        value: function initializeCounterpart(rpc, options) {
            options['chunkManager'] = this.chunkManager.rpcId;
            _get(Object.getPrototypeOf(ChunkSource.prototype), 'initializeCounterpart', this).call(this, rpc, options);
        }
    }, {
        key: 'deleteChunk',
        value: function deleteChunk(key) {
            this.chunks.delete(key);
        }
    }, {
        key: 'addChunk',
        value: function addChunk(key, chunk) {
            this.chunks.set(key, chunk);
        }
        /**
         * Default implementation for use with backendOnly chunk sources.
         */

    }, {
        key: 'getChunk',
        value: function getChunk(x) {
            return null;
        }
    }, {
        key: 'gl',
        get: function () {
            return this.chunkManager.chunkQueueManager.gl;
        }
    }]);

    return ChunkSource;
}(worker_rpc_1.SharedObject);

exports.ChunkSource = ChunkSource;
;

/***/ },
/* 52 */
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

var Memoize = function () {
    function Memoize() {
        _classCallCheck(this, Memoize);

        this.map = new Map();
    }

    _createClass(Memoize, [{
        key: "get",
        value: function get(key, getter) {
            var map = this.map;

            var obj = map.get(key);
            if (obj === undefined) {
                obj = getter();
                obj.registerDisposer(() => {
                    map.delete(key);
                });
                map.set(key, obj);
            } else {
                obj.addRef();
            }
            return obj;
        }
    }]);

    return Memoize;
}();

exports.Memoize = Memoize;
;

/***/ },
/* 53 */
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

var disposable_1 = __webpack_require__(8);
var texture_1 = __webpack_require__(54);
var trivial_shaders_1 = __webpack_require__(55);
var buffer_1 = __webpack_require__(35);
var geom_1 = __webpack_require__(21);

var OffscreenFramebuffer = function (_disposable_1$RefCoun) {
    _inherits(OffscreenFramebuffer, _disposable_1$RefCoun);

    function OffscreenFramebuffer(gl) {
        var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var _ref$numDataBuffers = _ref.numDataBuffers;
        var numDataBuffers = _ref$numDataBuffers === undefined ? 1 : _ref$numDataBuffers;
        var _ref$depthBuffer = _ref.depthBuffer;
        var depthBuffer = _ref$depthBuffer === undefined ? false : _ref$depthBuffer;
        var _ref$stencilBuffer = _ref.stencilBuffer;
        var stencilBuffer = _ref$stencilBuffer === undefined ? false : _ref$stencilBuffer;

        _classCallCheck(this, OffscreenFramebuffer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(OffscreenFramebuffer).call(this));

        _this.gl = gl;
        _this.width = null;
        _this.height = null;
        _this.framebuffer = _this.gl.createFramebuffer();
        _this.depthBuffer = null;
        _this.dataTextures = new Array();
        _this.attachmentVerified = false;
        _this.tempPixel = new Uint8Array(4);
        _this.fullAttachmentList = new Array();
        _this.singleAttachmentList = [_this.gl.WEBGL_draw_buffers.COLOR_ATTACHMENT0_WEBGL];
        var dataTextures = _this.dataTextures;
        var fullAttachmentList = _this.fullAttachmentList;

        for (var i = 0; i < numDataBuffers; ++i) {
            dataTextures[i] = gl.createTexture();
            fullAttachmentList[i] = gl.WEBGL_draw_buffers.COLOR_ATTACHMENT0_WEBGL + i;
        }
        if (depthBuffer || stencilBuffer) {
            _this.depthBuffer = gl.createRenderbuffer();
        }
        _this.useStencilBuffer = stencilBuffer;
        return _this;
    }

    _createClass(OffscreenFramebuffer, [{
        key: 'disposed',
        value: function disposed() {
            var gl = this.gl;
            var depthBuffer = this.depthBuffer;

            gl.deleteFramebuffer(this.framebuffer);
            if (depthBuffer != null) {
                gl.deleteRenderbuffer(depthBuffer);
            }
            for (var dataTexture of this.dataTextures) {
                gl.deleteTexture(dataTexture);
            }
        }
    }, {
        key: 'resize',
        value: function resize(width, height) {
            if (this.hasSize(width, height)) {
                return;
            }
            this.width = width;
            this.height = height;
            var gl = this.gl;
            var useStencilBuffer = this.useStencilBuffer;
            var depthBuffer = this.depthBuffer;

            for (var dataTexture of this.dataTextures) {
                texture_1.resizeTexture(gl, dataTexture, width, height);
            }
            if (depthBuffer) {
                gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
                gl.renderbufferStorage(gl.RENDERBUFFER, useStencilBuffer ? gl.DEPTH_STENCIL : gl.DEPTH_COMPONENT16, width, height);
                gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            }
        }
    }, {
        key: 'hasSize',
        value: function hasSize(width, height) {
            return this.width === width && this.height === height;
        }
    }, {
        key: 'bind',
        value: function bind(width, height) {
            this.resize(width, height);
            var gl = this.gl;
            var useStencilBuffer = this.useStencilBuffer;
            var depthBuffer = this.depthBuffer;

            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            if (depthBuffer) {
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, useStencilBuffer ? gl.DEPTH_STENCIL_ATTACHMENT : gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
            }
            this.dataTextures.forEach((dataTexture, i) => {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.WEBGL_draw_buffers.COLOR_ATTACHMENT0_WEBGL + i, gl.TEXTURE_2D, dataTexture,
                /*level=*/0);
            });
            gl.WEBGL_draw_buffers.drawBuffersWEBGL(this.fullAttachmentList);
            this.verifyAttachment();
            gl.viewport(0, 0, width, height);
        }
    }, {
        key: 'unbind',
        value: function unbind() {
            var gl = this.gl;

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
    }, {
        key: 'bindSingle',
        value: function bindSingle(textureIndex) {
            var gl = this.gl;

            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.dataTextures[textureIndex],
            /*level=*/0);
            gl.WEBGL_draw_buffers.drawBuffersWEBGL(this.singleAttachmentList);
        }
    }, {
        key: 'readPixel',
        value: function readPixel(textureIndex, glWindowX, glWindowY) {
            var gl = this.gl;
            var tempPixel = this.tempPixel;

            try {
                this.bindSingle(textureIndex);
                gl.readPixels(glWindowX, glWindowY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, tempPixel);
            } finally {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }
            return tempPixel;
        }
        /**
         * Calls readPixel, but interprets the RGBA result as a little-endian uint32 value.
         */

    }, {
        key: 'readPixelAsUint32',
        value: function readPixelAsUint32(textureIndex, glWindowX, glWindowY) {
            var result = this.readPixel(textureIndex, glWindowX, glWindowY);
            return result[0] + (result[1] << 8) + (result[2] << 16) + (result[3] << 24);
        }
    }, {
        key: 'verifyAttachment',
        value: function verifyAttachment() {
            if (this.attachmentVerified) {
                return;
            }
            var gl = this.gl;

            var framebufferStatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            if (framebufferStatus !== gl.FRAMEBUFFER_COMPLETE) {
                throw new Error('Framebuffer configuration not supported');
            }
            this.attachmentVerified = true;
        }
    }]);

    return OffscreenFramebuffer;
}(disposable_1.RefCounted);

exports.OffscreenFramebuffer = OffscreenFramebuffer;
;

var OffscreenCopyHelper = function (_disposable_1$RefCoun2) {
    _inherits(OffscreenCopyHelper, _disposable_1$RefCoun2);

    function OffscreenCopyHelper(gl) {
        _classCallCheck(this, OffscreenCopyHelper);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(OffscreenCopyHelper).call(this));

        _this2.gl = gl;
        _this2.copyVertexPositionsBuffer = _this2.registerDisposer(buffer_1.Buffer.fromData(_this2.gl, new Float32Array([-1, -1, 0, 1, -1, +1, 0, 1, +1, +1, 0, 1, +1, -1, 0, 1]), _this2.gl.ARRAY_BUFFER, _this2.gl.STATIC_DRAW));
        _this2.copyTexCoordsBuffer = _this2.registerDisposer(buffer_1.Buffer.fromData(_this2.gl, new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]), _this2.gl.ARRAY_BUFFER, _this2.gl.STATIC_DRAW));
        _this2.trivialTextureShader = _this2.registerDisposer(trivial_shaders_1.trivialTextureShader(_this2.gl));
        return _this2;
    }

    _createClass(OffscreenCopyHelper, [{
        key: 'draw',
        value: function draw(texture) {
            var gl = this.gl;

            var shader = this.trivialTextureShader;
            shader.bind();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(shader.uniform('uSampler'), 0);
            gl.uniformMatrix4fv(shader.uniform('uProjectionMatrix'), false, geom_1.identityMat4);
            var aVertexPosition = shader.attribute('aVertexPosition');
            this.copyVertexPositionsBuffer.bindToVertexAttrib(aVertexPosition, 4);
            var aTexCoord = shader.attribute('aTexCoord');
            this.copyTexCoordsBuffer.bindToVertexAttrib(aTexCoord, 2);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
            gl.disableVertexAttribArray(aVertexPosition);
            gl.disableVertexAttribArray(aTexCoord);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }], [{
        key: 'get',
        value: function get(gl) {
            return gl.memoize.get('OffscreenCopyHelper', () => {
                return new OffscreenCopyHelper(gl);
            });
        }
    }]);

    return OffscreenCopyHelper;
}(disposable_1.RefCounted);

exports.OffscreenCopyHelper = OffscreenCopyHelper;
;

/***/ },
/* 54 */
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
 * Sets parameters to make a texture suitable for use as a raw array: NEAREST
 * filtering, clamping.
 */

function setRawTextureParameters(gl) {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // Prevents s-coordinate wrapping (repeating).  Repeating not
    // permitted for non-power-of-2 textures.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // Prevents t-coordinate wrapping (repeating).  Repeating not
    // permitted for non-power-of-2 textures.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}
exports.setRawTextureParameters = setRawTextureParameters;
function resizeTexture(gl, texture, width, height) {
    var format = arguments.length <= 4 || arguments[4] === undefined ? gl.RGBA : arguments[4];
    var dataType = arguments.length <= 5 || arguments[5] === undefined ? gl.UNSIGNED_BYTE : arguments[5];

    gl.activeTexture(gl.TEXTURE0 + gl.tempTextureUnit);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    setRawTextureParameters(gl);
    gl.texImage2D(gl.TEXTURE_2D, 0,
    /*internalformat=*/format,
    /*width=*/width,
    /*height=*/height,
    /*border=*/0,
    /*format=*/format, dataType, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
}
exports.resizeTexture = resizeTexture;

/***/ },
/* 55 */
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

var shader_1 = __webpack_require__(36);
function trivialTextureShader(gl) {
    return gl.memoize.get('trivialTextureShader', () => {
        var builder = new shader_1.ShaderBuilder(gl);
        builder.addVarying('vec2', 'vTexCoord');
        builder.addUniform('sampler2D', 'uSampler');
        builder.addUniform('mat4', 'uProjectionMatrix');
        builder.setFragmentMain('gl_FragColor = texture2D(uSampler, vTexCoord);');
        builder.addAttribute('vec4', 'aVertexPosition');
        builder.addAttribute('vec2', 'aTexCoord');
        builder.setVertexMain('vTexCoord = aTexCoord; gl_Position = uProjectionMatrix * aVertexPosition;');
        return builder.build();
    });
}
exports.trivialTextureShader = trivialTextureShader;
function trivialColorShader(gl) {
    return gl.memoize.get('trivialColorShader', () => {
        var builder = new shader_1.ShaderBuilder(gl);
        builder.addVarying('vec4', 'vColor');
        builder.setFragmentMain('gl_FragColor = vColor;');
        builder.addAttribute('vec4', 'aVertexPosition');
        builder.addAttribute('vec4', 'aColor');
        builder.addUniform('mat4', 'uProjectionMatrix');
        builder.setVertexMain('vColor = aColor; gl_Position = uProjectionMatrix * aVertexPosition;');
        return builder.build();
    });
}
exports.trivialColorShader = trivialColorShader;
function trivialUniformColorShader(gl) {
    return gl.memoize.get('trivialUniformColorShader', () => {
        var builder = new shader_1.ShaderBuilder(gl);
        builder.addUniform('mat4', 'uProjectionMatrix');
        builder.addAttribute('vec4', 'aVertexPosition');
        builder.addUniform('vec4', 'uColor');
        builder.setFragmentMain('gl_FragColor = uColor;');
        builder.setVertexMain('gl_Position = uProjectionMatrix * aVertexPosition;');
        return builder.build();
    });
}
exports.trivialUniformColorShader = trivialUniformColorShader;

/***/ },
/* 56 */
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

var factory_1 = __webpack_require__(17);
var base_1 = __webpack_require__(19);
var frontend_1 = __webpack_require__(34);
var completion_1 = __webpack_require__(18);
var geom_1 = __webpack_require__(21);
var http_request_1 = __webpack_require__(14);
var json_1 = __webpack_require__(11);
var promise_1 = __webpack_require__(6);
var serverDataTypes = new Map();
serverDataTypes.set('uint8', base_1.DataType.UINT8);
serverDataTypes.set('uint32', base_1.DataType.UINT32);
serverDataTypes.set('uint64', base_1.DataType.UINT64);
var serverVolumeTypes = new Map();
serverVolumeTypes.set('image', base_1.VolumeType.IMAGE);
serverVolumeTypes.set('annotation', base_1.VolumeType.SEGMENTATION);

var VolumeChunkSource = function (_frontend_1$VolumeChu) {
    _inherits(VolumeChunkSource, _frontend_1$VolumeChu);

    function VolumeChunkSource(chunkManager, spec, hostnames, key, channel, resolution, encoding) {
        _classCallCheck(this, VolumeChunkSource);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunkSource).call(this, chunkManager, spec));

        _this.hostnames = hostnames;
        _this.key = key;
        _this.channel = channel;
        _this.resolution = resolution;
        _this.encoding = encoding;
        _this.initializeCounterpart(chunkManager.rpc, {
            'type': 'ndstore/VolumeChunkSource',
            'hostnames': hostnames,
            'key': key,
            'channel': channel,
            'resolution': resolution,
            'encoding': encoding
        });
        return _this;
    }

    _createClass(VolumeChunkSource, [{
        key: 'toString',
        value: function toString() {
            return `ndstore:volume:${ this.hostnames[0] }/${ this.key }/${ this.channel }/${ this.resolution }/${ this.encoding }`;
        }
    }]);

    return VolumeChunkSource;
}(frontend_1.VolumeChunkSource);

exports.VolumeChunkSource = VolumeChunkSource;
;

var MultiscaleVolumeChunkSource = function () {
    function MultiscaleVolumeChunkSource(hostnames, key, response, channel) {
        _classCallCheck(this, MultiscaleVolumeChunkSource);

        this.hostnames = hostnames;
        this.key = key;
        this.response = response;
        var channelsObject = response['channels'];
        var channelNames = Object.keys(channelsObject);
        if (channel === undefined) {
            if (channelNames.length !== 1) {
                throw new Error(`Dataset contains multiple channels: ${ JSON.stringify(channelNames) }`);
            }
            channel = channelNames[0];
        } else if (channelNames.indexOf(channel) === -1) {
            throw new Error(`Specified channel ${ JSON.stringify(channel) } is not one of the supported channels ${ JSON.stringify(channelNames) }`);
        }
        this.channel = channel;
        var channelObject = channelsObject[channel];
        var volumeType = serverVolumeTypes.get(channelObject['channel_type']);
        if (volumeType === undefined) {
            volumeType = base_1.VolumeType.UNKNOWN;
        }
        this.volumeType = volumeType;
        var dataTypeStr = channelObject['datatype'];
        var dataType = this.dataType = serverDataTypes.get(dataTypeStr);
        if (dataType === undefined) {
            throw new Error(`Unsupported data type ${ JSON.stringify(dataTypeStr) }`);
        }
        this.numChannels = 1;
    }

    _createClass(MultiscaleVolumeChunkSource, [{
        key: 'getSources',
        value: function getSources(chunkManager) {
            var _this2 = this;

            var sources = [];
            var response = this.response;
            var volumeType = this.volumeType;

            var datasetObject = response['dataset'];
            var encoding = volumeType === base_1.VolumeType.IMAGE ? 'jpeg' : 'npz';

            var _loop = function (resolution) {
                var imageSize = json_1.parseIntVec(geom_1.vec3.create(), datasetObject['neariso_imagesize'][resolution]);
                var voxelSize = json_1.parseFiniteVec(geom_1.vec3.create(), datasetObject['neariso_voxelres'][resolution]);
                var alternatives = [];
                sources.push(alternatives);
                // The returned offset for downsampled resolutions can have non-integer components.  It
                // appears that the true offset is obtained by rounding up.
                var origLowerVoxelBound = json_1.parseFiniteVec(geom_1.vec3.create(), datasetObject['neariso_offset'][resolution]);
                var lowerVoxelBound = geom_1.vec3.create();
                var upperVoxelBound = geom_1.vec3.create();
                for (var i = 0; i < 3; ++i) {
                    var origLower = origLowerVoxelBound[i];
                    lowerVoxelBound[i] = Math.ceil(origLower);
                    upperVoxelBound[i] = Math.floor(origLower + imageSize[i]);
                }

                var _loop2 = function (spec) {
                    var cacheKey = json_1.stableStringify({ 'spec': spec, key: _this2.key, channel: _this2.channel, resolution: resolution });
                    alternatives.push(chunkManager.getChunkSource(VolumeChunkSource, cacheKey, () => new VolumeChunkSource(chunkManager, spec, _this2.hostnames, _this2.key, _this2.channel, resolution, encoding)));
                };

                for (var spec of base_1.VolumeChunkSpecification.getDefaults({
                    volumeType,
                    voxelSize,
                    dataType: _this2.dataType, lowerVoxelBound, upperVoxelBound
                })) {
                    _loop2(spec);
                }
            };

            for (var resolution of Object.keys(datasetObject['neariso_imagesize'])) {
                _loop(resolution);
            }
            return sources;
        }
        /**
         * Meshes are not supported.
         */

    }, {
        key: 'getMeshSource',
        value: function getMeshSource(chunkManager) {
            return null;
        }
    }]);

    return MultiscaleVolumeChunkSource;
}();

exports.MultiscaleVolumeChunkSource = MultiscaleVolumeChunkSource;
;
var pathPattern = /^([^\/]+)(?:\/([^\/]+))?$/;
var existingVolumeResponses = new Map();
function getVolumeInfo(hostnames, token) {
    var fullKey = JSON.stringify({ 'hostnames': hostnames, 'token': token });
    var result = existingVolumeResponses.get(fullKey);
    if (result !== undefined) {
        return result;
    }
    var promise = http_request_1.sendHttpRequest(http_request_1.openShardedHttpRequest(hostnames, `/ocp/ca/${ token }/info/`), 'json');
    existingVolumeResponses.set(fullKey, promise);
    return promise;
}
exports.getVolumeInfo = getVolumeInfo;
var existingVolumes = new Map();
function getShardedVolume(hostnames, path) {
    var match = path.match(pathPattern);
    if (match === null) {
        throw new Error(`Invalid volume path ${ JSON.stringify(path) }`);
    }
    // Warning: If additional arguments are added, fullKey should be updated as well.
    var fullKey = json_1.stableStringify({ 'hostnames': hostnames, 'path': path });
    var existingResult = existingVolumes.get(fullKey);
    if (existingResult !== undefined) {
        return existingResult;
    }
    var key = match[1];
    var channel = match[2];
    var promise = getVolumeInfo(hostnames, key).then(response => new MultiscaleVolumeChunkSource(hostnames, key, response, channel));
    existingVolumes.set(fullKey, promise);
    return promise;
}
exports.getShardedVolume = getShardedVolume;
var urlPattern = /^((?:http|https):\/\/[^\/]+)\/(.*)$/;
function getVolume(path) {
    var match = path.match(urlPattern);
    if (match === null) {
        throw new Error(`Invalid ndstore volume path: ${ JSON.stringify(path) }`);
    }
    return getShardedVolume([match[1]], match[2]);
}
exports.getVolume = getVolume;
var publicTokenPromises = new Map();
function getPublicTokens(hostnames) {
    var key = JSON.stringify(hostnames);
    var result = publicTokenPromises.get(key);
    if (result !== undefined) {
        return result;
    }
    var newResult = http_request_1.sendHttpRequest(http_request_1.openShardedHttpRequest(hostnames, '/ocp/ca/public_tokens/'), 'json').then(value => json_1.parseArray(value, json_1.verifyString));
    publicTokenPromises.set(key, newResult);
    return newResult;
}
exports.getPublicTokens = getPublicTokens;
function tokenAndChannelCompleter(hostnames, path) {
    var channelMatch = path.match(/^(?:([^\/]+)(?:\/([^\/]*))?)?$/);
    if (channelMatch === null) {
        // URL has incorrect format, don't return any results.
        return Promise.reject(null);
    }
    if (channelMatch[2] === undefined) {
        var _ret3 = function () {
            var keyPrefix = channelMatch[1] || '';
            // Try to complete the token.
            return {
                v: getPublicTokens(hostnames).then(tokens => {
                    return {
                        offset: 0,
                        completions: completion_1.getPrefixMatchesWithDescriptions(keyPrefix, tokens, x => x + '/', x => undefined)
                    };
                })
            };
        }();

        if (typeof _ret3 === "object") return _ret3.v;
    }
    return promise_1.cancellableThen(getVolumeInfo(hostnames, channelMatch[1]), response => {
        var completions = [];
        if (typeof response === 'object' && response !== null && !Array.isArray(response)) {
            (function () {
                var channelsObject = response['channels'];
                if (typeof channelsObject === 'object' && channelsObject !== null && !Array.isArray(channelsObject)) {
                    var channelNames = Object.keys(channelsObject);
                    completions = completion_1.getPrefixMatchesWithDescriptions(channelMatch[2], channelNames, x => x, x => {
                        var channelObject = channelsObject[x];
                        return `${ channelObject['channel_type'] } (${ channelObject['datatype'] })`;
                    });
                }
            })();
        }
        return { offset: channelMatch[1].length + 1, completions };
    });
}
exports.tokenAndChannelCompleter = tokenAndChannelCompleter;
function volumeCompleter(url) {
    var match = url.match(urlPattern);
    if (match === null) {
        // We don't yet have a full hostname.
        return Promise.reject(null);
    }
    var hostnames = [match[1]];
    var path = match[2];
    return promise_1.cancellableThen(tokenAndChannelCompleter(hostnames, path), completions => completion_1.applyCompletionOffset(match[1].length + 1, completions));
}
exports.volumeCompleter = volumeCompleter;
factory_1.registerDataSourceFactory('ndstore', {
    description: 'NDstore',
    volumeCompleter: volumeCompleter,
    getVolume: getVolume
});

/***/ },
/* 57 */
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

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var base_1 = __webpack_require__(58);
var factory_1 = __webpack_require__(17);
var base_2 = __webpack_require__(19);
var chunk_layout_1 = __webpack_require__(20);
var frontend_1 = __webpack_require__(34);
var status_1 = __webpack_require__(4);
var completion_1 = __webpack_require__(18);
var geom_1 = __webpack_require__(21);
var http_request_1 = __webpack_require__(14);
var json_1 = __webpack_require__(11);
var serverDataTypes = new Map();
serverDataTypes.set('uint8', base_2.DataType.UINT8);
serverDataTypes.set('uint32', base_2.DataType.UINT32);
serverDataTypes.set('uint64', base_2.DataType.UINT64);

var DataInstanceBaseInfo = function () {
    function DataInstanceBaseInfo(obj) {
        _classCallCheck(this, DataInstanceBaseInfo);

        this.obj = obj;
        json_1.verifyObject(obj);
        json_1.verifyObjectProperty(obj, 'TypeName', json_1.verifyString);
    }

    _createClass(DataInstanceBaseInfo, [{
        key: 'typeName',
        get: function () {
            return this.obj['TypeName'];
        }
    }]);

    return DataInstanceBaseInfo;
}();

exports.DataInstanceBaseInfo = DataInstanceBaseInfo;
;

var DataInstanceInfo = function DataInstanceInfo(obj, name, base) {
    _classCallCheck(this, DataInstanceInfo);

    this.obj = obj;
    this.name = name;
    this.base = base;
};

exports.DataInstanceInfo = DataInstanceInfo;
;

var VolumeChunkSource = function (_frontend_1$VolumeChu) {
    _inherits(VolumeChunkSource, _frontend_1$VolumeChu);

    function VolumeChunkSource(chunkManager, spec, parameters) {
        _classCallCheck(this, VolumeChunkSource);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunkSource).call(this, chunkManager, spec));

        _this.parameters = parameters;
        _this.initializeCounterpart(chunkManager.rpc, {
            'type': 'dvid/VolumeChunkSource',
            'parameters': parameters
        });
        return _this;
    }

    _createClass(VolumeChunkSource, [{
        key: 'toString',
        value: function toString() {
            return base_1.volumeSourceToString(this.parameters);
        }
    }]);

    return VolumeChunkSource;
}(frontend_1.VolumeChunkSource);

exports.VolumeChunkSource = VolumeChunkSource;
;

var VolumeDataInstanceInfo = function (_DataInstanceInfo) {
    _inherits(VolumeDataInstanceInfo, _DataInstanceInfo);

    function VolumeDataInstanceInfo(obj, name, base, volumeType) {
        _classCallCheck(this, VolumeDataInstanceInfo);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeDataInstanceInfo).call(this, obj, name, base));

        _this2.volumeType = volumeType;
        var extended = json_1.verifyObjectProperty(obj, 'Extended', json_1.verifyObject);
        var extendedValues = json_1.verifyObjectProperty(extended, 'Values', x => json_1.parseArray(x, json_1.verifyObject));
        if (extendedValues.length < 1) {
            throw new Error('Expected Extended.Values property to have length >= 1, but received: ${JSON.stringify(extendedValues)}.');
        }
        _this2.dataType = json_1.verifyObjectProperty(extendedValues[0], 'DataType', x => json_1.verifyMapKey(x, serverDataTypes));
        _this2.lowerVoxelBound = json_1.verifyObjectProperty(extended, 'MinPoint', x => json_1.parseIntVec(geom_1.vec3.create(), x));
        _this2.upperVoxelBound = json_1.verifyObjectProperty(extended, 'MaxPoint', x => json_1.parseIntVec(geom_1.vec3.create(), x));
        _this2.voxelSize = json_1.verifyObjectProperty(extended, 'VoxelSize', x => json_1.parseFixedLengthArray(geom_1.vec3.create(), x, json_1.verifyFinitePositiveFloat));
        _this2.numChannels = 1;
        return _this2;
    }

    _createClass(VolumeDataInstanceInfo, [{
        key: 'getSources',
        value: function getSources(chunkManager, parameters) {
            return [Array.from(base_2.VolumeChunkSpecification.getDefaults({
                voxelSize: this.voxelSize,
                dataType: this.dataType,
                numChannels: this.numChannels,
                lowerVoxelBound: this.lowerVoxelBound,
                upperVoxelBound: this.upperVoxelBound,
                volumeType: this.volumeType
            })).map(spec => {
                return chunkManager.getChunkSource(VolumeChunkSource, json_1.stableStringify(parameters), () => new VolumeChunkSource(chunkManager, spec, parameters));
            })];
        }
    }]);

    return VolumeDataInstanceInfo;
}(DataInstanceInfo);

exports.VolumeDataInstanceInfo = VolumeDataInstanceInfo;
;

var TileLevelInfo = function TileLevelInfo(obj) {
    _classCallCheck(this, TileLevelInfo);

    json_1.verifyObject(obj);
    this.resolution = json_1.verifyObjectProperty(obj, 'Resolution', x => json_1.parseFixedLengthArray(geom_1.vec3.create(), x, json_1.verifyFinitePositiveFloat));
    this.tileSize = json_1.verifyObjectProperty(obj, 'TileSize', x => json_1.parseFixedLengthArray(geom_1.vec3.create(), x, json_1.verifyPositiveInt));
};

exports.TileLevelInfo = TileLevelInfo;
;
/**
 * Dimensions for which tiles are computed.
 *
 * FIXME: DVID does not seem to properly indicate which dimensions are available.
 */
var TILE_DIMS = [[0, 1]];

var TileChunkSource = function (_frontend_1$VolumeChu2) {
    _inherits(TileChunkSource, _frontend_1$VolumeChu2);

    function TileChunkSource(chunkManager, spec, parameters) {
        _classCallCheck(this, TileChunkSource);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(TileChunkSource).call(this, chunkManager, spec));

        _this3.parameters = parameters;
        _this3.initializeCounterpart(chunkManager.rpc, {
            'type': 'dvid/TileChunkSource',
            'parameters': parameters
        });
        return _this3;
    }

    _createClass(TileChunkSource, [{
        key: 'toString',
        value: function toString() {
            return base_1.tileSourceToString(this.parameters);
        }
    }]);

    return TileChunkSource;
}(frontend_1.VolumeChunkSource);

exports.TileChunkSource = TileChunkSource;
;

var TileDataInstanceInfo = function (_DataInstanceInfo2) {
    _inherits(TileDataInstanceInfo, _DataInstanceInfo2);

    function TileDataInstanceInfo(obj, name, base) {
        _classCallCheck(this, TileDataInstanceInfo);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(TileDataInstanceInfo).call(this, obj, name, base));

        var extended = json_1.verifyObjectProperty(obj, 'Extended', json_1.verifyObject);
        _this4.levels = json_1.verifyObjectProperty(extended, 'Levels', x => json_1.verifyObjectAsMap(x, y => new TileLevelInfo(y)));
        var baseLevel = _this4.levels.get('0');
        if (baseLevel === undefined) {
            throw new Error(`Level 0 is not defined.`);
        }
        _this4.voxelSize = baseLevel.resolution;
        var minTileCoord = json_1.verifyObjectProperty(extended, 'MinTileCoord', x => json_1.parseFixedLengthArray(geom_1.vec3.create(), x, json_1.verifyInt));
        var maxTileCoord = json_1.verifyObjectProperty(extended, 'MaxTileCoord', x => json_1.parseFixedLengthArray(geom_1.vec3.create(), x, json_1.verifyInt));
        _this4.lowerVoxelBound = geom_1.vec3.multiply(geom_1.vec3.create(), baseLevel.tileSize, minTileCoord);
        _this4.upperVoxelBound = geom_1.vec3.multiply(geom_1.vec3.create(), baseLevel.tileSize, maxTileCoord);
        var encodingNumber = json_1.verifyObjectProperty(extended, 'Encoding', x => x);
        switch (encodingNumber) {
            case 2:
                _this4.encoding = base_1.TileEncoding.JPEG;
                break;
            default:
                throw new Error(`Unsupported tile encoding: ${ JSON.stringify(encodingNumber) }.`);
        }
        return _this4;
    }

    _createClass(TileDataInstanceInfo, [{
        key: 'getSources',
        value: function getSources(chunkManager, parameters) {
            var _this5 = this;

            var sources = [];

            var _loop = function (_ref) {
                _ref2 = _slicedToArray(_ref, 2);
                var level = _ref2[0];
                var levelInfo = _ref2[1];

                var alternatives = TILE_DIMS.map(dims => {
                    var voxelSize = geom_1.vec3.clone(_this5.voxelSize);
                    var chunkDataSize = geom_1.vec3.fromValues(1, 1, 1);
                    for (var dim of dims) {
                        voxelSize[dim] = levelInfo.resolution[dim];
                        chunkDataSize[dim] = levelInfo.tileSize[dim];
                    }
                    var chunkLayout = chunk_layout_1.ChunkLayout.get(geom_1.vec3.multiply(geom_1.vec3.create(), voxelSize, chunkDataSize));
                    var lowerVoxelBound = geom_1.vec3.create(),
                        upperVoxelBound = geom_1.vec3.create();
                    for (var i = 0; i < 3; ++i) {
                        lowerVoxelBound[i] = Math.floor(_this5.lowerVoxelBound[i] * (_this5.voxelSize[i] / voxelSize[i]));
                        upperVoxelBound[i] = Math.ceil(_this5.upperVoxelBound[i] * (_this5.voxelSize[i] / voxelSize[i]));
                    }
                    var spec = new base_2.VolumeChunkSpecification(chunkLayout, chunkDataSize, _this5.numChannels, _this5.dataType, lowerVoxelBound, upperVoxelBound);
                    var tileParameters = {
                        'baseUrls': parameters.baseUrls,
                        'nodeKey': parameters.nodeKey,
                        'dataInstanceKey': parameters.dataInstanceKey,
                        'encoding': _this5.encoding,
                        'level': level,
                        'dims': `${ dims[0] }_${ dims[1] }`
                    };
                    return chunkManager.getChunkSource(VolumeChunkSource, json_1.stableStringify(tileParameters), () => new TileChunkSource(chunkManager, spec, tileParameters));
                });
                sources.push(alternatives);
            };

            for (var _ref of this.levels) {
                var _ref2;

                _loop(_ref);
            }
            return sources;
        }
    }, {
        key: 'dataType',
        get: function () {
            return base_2.DataType.UINT8;
        }
    }, {
        key: 'volumeType',
        get: function () {
            return base_2.VolumeType.IMAGE;
        }
    }, {
        key: 'numChannels',
        get: function () {
            return 1;
        }
    }]);

    return TileDataInstanceInfo;
}(DataInstanceInfo);

exports.TileDataInstanceInfo = TileDataInstanceInfo;
;
function parseDataInstance(obj, name) {
    json_1.verifyObject(obj);
    var baseInfo = json_1.verifyObjectProperty(obj, 'Base', x => new DataInstanceBaseInfo(x));
    switch (baseInfo.typeName) {
        case 'uint8blk':
        case 'grayscale8':
            return new VolumeDataInstanceInfo(obj, name, baseInfo, base_2.VolumeType.IMAGE);
        case 'imagetile':
            return new TileDataInstanceInfo(obj, name, baseInfo);
        case 'labels64':
        case 'labelblk':
            return new VolumeDataInstanceInfo(obj, name, baseInfo, base_2.VolumeType.SEGMENTATION);
        default:
            throw new Error(`DVID data type ${ JSON.stringify(baseInfo.typeName) } is not supported.`);
    }
}
exports.parseDataInstance = parseDataInstance;

var RepositoryInfo = function RepositoryInfo(obj) {
    _classCallCheck(this, RepositoryInfo);

    this.errors = [];
    this.dataInstances = new Map();
    json_1.verifyObject(obj);
    this.alias = json_1.verifyObjectProperty(obj, 'Alias', json_1.verifyString);
    this.description = json_1.verifyObjectProperty(obj, 'Description', json_1.verifyString);
    var dataInstanceObjs = json_1.verifyObjectProperty(obj, 'DataInstances', json_1.verifyObject);
    for (var key of Object.keys(dataInstanceObjs)) {
        try {
            this.dataInstances.set(key, parseDataInstance(dataInstanceObjs[key], key));
        } catch (parseError) {
            var message = `Failed to parse data instance ${ JSON.stringify(key) }: ${ parseError.message }`;
            console.log(message);
            this.errors.push(message);
        }
    }
};

exports.RepositoryInfo = RepositoryInfo;
;
function parseRepositoriesInfo(obj) {
    try {
        var result = json_1.verifyObjectAsMap(obj, x => new RepositoryInfo(x));
        for (var _ref5 of result) {
            var _ref4 = _slicedToArray(_ref5, 2);

            var key = _ref4[0];
            var info = _ref4[1];

            info.uuid = key;
        }
        return result;
    } catch (parseError) {
        throw new Error(`Failed to parse DVID repositories info: ${ parseError.message }`);
    }
}
exports.parseRepositoriesInfo = parseRepositoriesInfo;

var ServerInfo = function () {
    function ServerInfo(obj) {
        _classCallCheck(this, ServerInfo);

        this.repositories = parseRepositoriesInfo(obj);
    }

    _createClass(ServerInfo, [{
        key: 'getNode',
        value: function getNode(nodeKey) {
            // FIXME: Support non-root nodes.
            var matches = [];
            for (var key of this.repositories.keys()) {
                if (key.startsWith(nodeKey)) {
                    matches.push(key);
                }
            }
            if (matches.length !== 1) {
                throw new Error(`Node key ${ JSON.stringify(nodeKey) } matches ${ JSON.stringify(matches) } nodes.`);
            }
            return this.repositories.get(nodeKey);
        }
    }]);

    return ServerInfo;
}();

exports.ServerInfo = ServerInfo;
;
var cachedServerInfo = new Map();
function getServerInfo(baseUrls) {
    var cacheKey = json_1.stableStringify(baseUrls);
    var result = cachedServerInfo.get(cacheKey);
    if (result === undefined) {
        result = http_request_1.sendHttpRequest(http_request_1.openShardedHttpRequest(baseUrls, '/api/repos/info', 'GET'), 'json').then(response => new ServerInfo(response));
        var description = `repository info for DVID server ${ baseUrls[0] }`;
        status_1.StatusMessage.forPromise(result, {
            initialMessage: `Retrieving ${ description }.`,
            delay: true,
            errorPrefix: `Error retrieving ${ description }: `
        });
        cachedServerInfo.set(cacheKey, result);
    }
    return result;
}
exports.getServerInfo = getServerInfo;

var MultiscaleVolumeChunkSource = function () {
    function MultiscaleVolumeChunkSource(baseUrls, nodeKey, dataInstanceKey, info) {
        _classCallCheck(this, MultiscaleVolumeChunkSource);

        this.baseUrls = baseUrls;
        this.nodeKey = nodeKey;
        this.dataInstanceKey = dataInstanceKey;
        this.info = info;
    }

    _createClass(MultiscaleVolumeChunkSource, [{
        key: 'getSources',
        value: function getSources(chunkManager) {
            return this.info.getSources(chunkManager, {
                'baseUrls': this.baseUrls,
                'nodeKey': this.nodeKey,
                'dataInstanceKey': this.dataInstanceKey
            });
        }
        /**
         * Meshes are not supported.
         */

    }, {
        key: 'getMeshSource',
        value: function getMeshSource(chunkManager) {
            return null;
        }
    }, {
        key: 'dataType',
        get: function () {
            return this.info.dataType;
        }
    }, {
        key: 'numChannels',
        get: function () {
            return this.info.numChannels;
        }
    }, {
        key: 'volumeType',
        get: function () {
            return this.info.volumeType;
        }
    }]);

    return MultiscaleVolumeChunkSource;
}();

exports.MultiscaleVolumeChunkSource = MultiscaleVolumeChunkSource;
;
var existingVolumes = new Map();
function getShardedVolume(baseUrls, nodeKey, dataInstanceKey) {
    return getServerInfo(baseUrls).then(serverInfo => {
        var repositoryInfo = serverInfo.getNode(nodeKey);
        var dataInstanceInfo = repositoryInfo.dataInstances.get(dataInstanceKey);
        if (!(dataInstanceInfo instanceof VolumeDataInstanceInfo) && !(dataInstanceInfo instanceof TileDataInstanceInfo)) {
            throw new Error(`Invalid data instance ${ dataInstanceKey }.`);
        }
        var cacheKey = json_1.stableStringify({
            'baseUrls': baseUrls,
            'nodeKey': repositoryInfo.uuid,
            'dataInstanceKey': dataInstanceKey
        });
        var result = existingVolumes.get(cacheKey);
        if (result === undefined) {
            result = new MultiscaleVolumeChunkSource(baseUrls, repositoryInfo.uuid, dataInstanceKey, dataInstanceInfo);
            existingVolumes.set(cacheKey, result);
        }
        return result;
    });
}
exports.getShardedVolume = getShardedVolume;
var urlPattern = /^((?:http|https):\/\/[^\/]+)\/([^\/]+)\/([^\/]+)$/;
function getVolume(url) {
    var match = url.match(urlPattern);
    if (match === null) {
        throw new Error(`Invalid DVID URL: ${ JSON.stringify(url) }.`);
    }
    return getShardedVolume([match[1]], match[2], match[3]);
}
exports.getVolume = getVolume;
function completeInstanceName(repositoryInfo, prefix) {
    return {
        offset: 0,
        completions: completion_1.getPrefixMatchesWithDescriptions(prefix, repositoryInfo.dataInstances.values(), instance => instance.name, instance => {
            return `${ instance.base.typeName }`;
        })
    };
}
exports.completeInstanceName = completeInstanceName;
function completeNodeAndInstance(serverInfo, prefix) {
    var match = prefix.match(/^(?:([^\/]+)(?:\/([^\/]*))?)?$/);
    if (match === null) {
        throw new Error(`Invalid DVID URL syntax.`);
    }
    if (match[2] === undefined) {
        // Try to complete the node name.
        return {
            offset: 0,
            completions: completion_1.getPrefixMatchesWithDescriptions(prefix, serverInfo.repositories.values(), repository => repository.uuid + '/', repository => `${ repository.alias }: ${ repository.description }`)
        };
    }
    var nodeKey = match[1];
    var repository = serverInfo.getNode(nodeKey);
    return completion_1.applyCompletionOffset(nodeKey.length + 1, completeInstanceName(repository, match[2]));
}
exports.completeNodeAndInstance = completeNodeAndInstance;
function volumeCompleter(url) {
    var curUrlPattern = /^((?:http|https):\/\/[^\/]+)\/(.*)$/;
    var match = url.match(curUrlPattern);
    if (match === null) {
        // We don't yet have a full hostname.
        return Promise.reject(null);
    }
    var baseUrl = match[1];
    var baseUrls = [baseUrl];
    var path = match[2];
    return getServerInfo(baseUrls).then(serverInfo => completion_1.applyCompletionOffset(baseUrl.length + 1, completeNodeAndInstance(serverInfo, path)));
}
exports.volumeCompleter = volumeCompleter;
factory_1.registerDataSourceFactory('dvid', {
    description: 'DVID',
    volumeCompleter: volumeCompleter,
    getVolume: getVolume
});

/***/ },
/* 58 */
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
/* 59 */
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
 * Convenience interface for accessing openconnecto.me server.
 */

var factory_1 = __webpack_require__(17);
var frontend_1 = __webpack_require__(56);
var HOSTNAMES = ['http://openconnecto.me', 'http://www.openconnecto.me'];
function getVolume(path) {
    return frontend_1.getShardedVolume(HOSTNAMES, path);
}
exports.getVolume = getVolume;
function volumeCompleter(url) {
    return frontend_1.tokenAndChannelCompleter(HOSTNAMES, url);
}
exports.volumeCompleter = volumeCompleter;
factory_1.registerDataSourceFactory('openconnectome', {
    description: 'NDstore server hosted at openconnecto.me',
    getVolume,
    volumeCompleter
});

/***/ },
/* 60 */
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

var base_1 = __webpack_require__(61);
var base_2 = __webpack_require__(19);
var frontend_1 = __webpack_require__(34);
var frontend_2 = __webpack_require__(62);
var factory_1 = __webpack_require__(17);
var geom_1 = __webpack_require__(21);
var json_1 = __webpack_require__(11);
var http_request_1 = __webpack_require__(14);
var serverDataTypes = new Map();
serverDataTypes.set('uint8', base_2.DataType.UINT8);
serverDataTypes.set('uint32', base_2.DataType.UINT32);
serverDataTypes.set('uint64', base_2.DataType.UINT64);
var serverVolumeTypes = new Map();
serverVolumeTypes.set('image', base_2.VolumeType.IMAGE);
serverVolumeTypes.set('segmentation', base_2.VolumeType.SEGMENTATION);
var serverChunkEncodings = new Map();
serverChunkEncodings.set('raw', base_1.VolumeChunkEncoding.RAW);
serverChunkEncodings.set('jpeg', base_1.VolumeChunkEncoding.JPEG);
serverChunkEncodings.set('compressed_segmentation', base_1.VolumeChunkEncoding.COMPRESSED_SEGMENTATION);

var VolumeChunkSource = function (_frontend_1$VolumeChu) {
    _inherits(VolumeChunkSource, _frontend_1$VolumeChu);

    function VolumeChunkSource(chunkManager, spec, baseUrls, path, encoding) {
        _classCallCheck(this, VolumeChunkSource);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VolumeChunkSource).call(this, chunkManager, spec));

        _this.baseUrls = baseUrls;
        _this.path = path;
        _this.encoding = encoding;
        _this.initializeCounterpart(chunkManager.rpc, {
            'type': 'precomputed/VolumeChunkSource',
            'baseUrls': baseUrls,
            'path': path,
            'encoding': encoding
        });
        return _this;
    }

    _createClass(VolumeChunkSource, [{
        key: 'toString',
        value: function toString() {
            return `precomputed:volume:${ this.baseUrls[0] }/${ this.path }`;
        }
    }]);

    return VolumeChunkSource;
}(frontend_1.VolumeChunkSource);

exports.VolumeChunkSource = VolumeChunkSource;
;

var ScaleInfo = function ScaleInfo(response) {
    _classCallCheck(this, ScaleInfo);

    if (typeof response !== 'object' || Array.isArray(response)) {
        throw new Error('Failed to parse volume metadata.');
    }
    this.resolution = json_1.parseFiniteVec(geom_1.vec3.create(), response['resolution']);
    this.voxelOffset = json_1.parseIntVec(geom_1.vec3.create(), response['voxel_offset']);
    this.size = json_1.parseIntVec(geom_1.vec3.create(), response['size']);
    this.chunkSizes = json_1.parseArray(response['chunk_sizes'], x => json_1.parseFiniteVec(geom_1.vec3.create(), x));
    if (this.chunkSizes.length === 0) {
        throw new Error('No chunk sizes specified.');
    }
    var encodingStr = response['encoding'];
    var encoding = serverChunkEncodings.get(encodingStr);
    if (encoding === undefined) {
        throw new Error(`Invalid chunk encoding: ${ JSON.stringify(encodingStr) }`);
    }
    this.encoding = encoding;
    if (encoding === base_1.VolumeChunkEncoding.COMPRESSED_SEGMENTATION) {
        this.compressedSegmentationBlockSize = json_1.parseIntVec(geom_1.vec3.create(), response['compressed_segmentation_block_size']);
    }
    this.key = response['key'];
    if (typeof this.key !== 'string') {
        throw new Error('No key specified.');
    }
};

;

var MultiscaleVolumeChunkSource = function () {
    function MultiscaleVolumeChunkSource(baseUrls, path, response) {
        _classCallCheck(this, MultiscaleVolumeChunkSource);

        this.baseUrls = baseUrls;
        this.path = path;
        this.response = response;
        if (typeof response !== 'object' || Array.isArray(response)) {
            throw new Error('Failed to parse volume metadata.');
        }
        var dataTypeStr = response['data_type'];
        var dataType = serverDataTypes.get(dataTypeStr);
        if (dataType === undefined) {
            throw new Error(`Invalid data type: ${ JSON.stringify(dataTypeStr) }`);
        }
        var numChannels = response['num_channels'];
        if (typeof numChannels !== 'number') {
            throw new Error('Invalid number of channels.');
        }
        this.numChannels = numChannels;
        this.dataType = dataType;
        var volumeTypeStr = response['type'];
        var volumeType = serverVolumeTypes.get(volumeTypeStr);
        if (volumeType === undefined) {
            throw new Error(`Invalid volume type: ${ JSON.stringify(volumeTypeStr) }`);
        }
        this.volumeType = volumeType;
        var meshStr = response['mesh'];
        if (meshStr !== undefined && typeof meshStr !== 'string') {
            throw new Error('Invalid "mesh" field.');
        }
        this.mesh = meshStr;
        this.scales = json_1.parseArray(response['scales'], x => new ScaleInfo(x));
    }

    _createClass(MultiscaleVolumeChunkSource, [{
        key: 'getMeshSource',
        value: function getMeshSource(chunkManager) {
            var mesh = this.mesh;

            if (mesh === undefined) {
                return null;
            }
            return getShardedMeshSource(chunkManager, this.baseUrls, `${ this.path }/${ mesh }`, /*lod=*/0);
        }
    }, {
        key: 'getSources',
        value: function getSources(chunkManager) {
            return this.scales.map(scaleInfo => {
                return Array.from(base_2.VolumeChunkSpecification.getDefaults({
                    voxelSize: scaleInfo.resolution,
                    dataType: this.dataType,
                    numChannels: this.numChannels,
                    lowerVoxelBound: scaleInfo.voxelOffset,
                    upperVoxelBound: geom_1.vec3.add(geom_1.vec3.create(), scaleInfo.voxelOffset, scaleInfo.size),
                    volumeType: this.volumeType,
                    chunkDataSizes: scaleInfo.chunkSizes,
                    compressedSegmentationBlockSize: scaleInfo.compressedSegmentationBlockSize
                })).map(spec => {
                    var path = `${ this.path }/${ scaleInfo.key }`;
                    var cacheKey = json_1.stableStringify({
                        'spec': spec,
                        'baseUrls': this.baseUrls,
                        'path': path,
                        'encoding': scaleInfo.encoding
                    });
                    return chunkManager.getChunkSource(VolumeChunkSource, cacheKey, () => new VolumeChunkSource(chunkManager, spec, this.baseUrls, path, scaleInfo.encoding));
                });
            });
        }
    }]);

    return MultiscaleVolumeChunkSource;
}();

exports.MultiscaleVolumeChunkSource = MultiscaleVolumeChunkSource;
;

var MeshSource = function (_frontend_2$MeshSourc) {
    _inherits(MeshSource, _frontend_2$MeshSourc);

    function MeshSource(chunkManager, baseUrls, path, lod) {
        _classCallCheck(this, MeshSource);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MeshSource).call(this, chunkManager));

        _this2.baseUrls = baseUrls;
        _this2.path = path;
        _this2.lod = lod;
        _this2.initializeCounterpart(_this2.chunkManager.rpc, { 'type': 'precomputed/MeshSource', 'baseUrls': baseUrls, 'path': path, 'lod': lod });
        return _this2;
    }

    _createClass(MeshSource, [{
        key: 'toString',
        value: function toString() {
            return `precomputed:mesh:${ this.baseUrls[0] }/${ this.path }`;
        }
    }]);

    return MeshSource;
}(frontend_2.MeshSource);

exports.MeshSource = MeshSource;
;
function getShardedMeshSource(chunkManager, baseUrls, path, lod) {
    return chunkManager.getChunkSource(MeshSource, JSON.stringify({ 'baseUrls': baseUrls, 'path': path, 'lod': lod }), () => new MeshSource(chunkManager, baseUrls, path, lod));
}
exports.getShardedMeshSource = getShardedMeshSource;
function getMeshSource(chunkManager, url, lod) {
    var _http_request_1$parse = http_request_1.parseSpecialUrl(url);

    var _http_request_1$parse2 = _slicedToArray(_http_request_1$parse, 2);

    var baseUrls = _http_request_1$parse2[0];
    var path = _http_request_1$parse2[1];

    return getShardedMeshSource(chunkManager, baseUrls, path, lod);
}
exports.getMeshSource = getMeshSource;
var existingVolumes = new Map();
function getShardedVolume(baseUrls, path) {
    var fullKey = json_1.stableStringify({ 'baseUrls': baseUrls, 'path': path });
    var existingResult = existingVolumes.get(fullKey);
    if (existingResult !== undefined) {
        return existingResult;
    }
    var promise = http_request_1.sendHttpRequest(http_request_1.openShardedHttpRequest(baseUrls, path + '/info'), 'json').then(response => new MultiscaleVolumeChunkSource(baseUrls, path, response));
    existingVolumes.set(fullKey, promise);
    return promise;
}
exports.getShardedVolume = getShardedVolume;
function getVolume(url) {
    var _http_request_1$parse3 = http_request_1.parseSpecialUrl(url);

    var _http_request_1$parse4 = _slicedToArray(_http_request_1$parse3, 2);

    var baseUrls = _http_request_1$parse4[0];
    var path = _http_request_1$parse4[1];

    return getShardedVolume(baseUrls, path);
}
exports.getVolume = getVolume;
factory_1.registerDataSourceFactory('precomputed', {
    description: 'Precomputed file-backed data source',
    getVolume: getVolume,
    getMeshSource: getMeshSource
});

/***/ },
/* 61 */
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

__webpack_require__(14);
(function (VolumeChunkEncoding) {
  VolumeChunkEncoding[VolumeChunkEncoding["RAW"] = 0] = "RAW";
  VolumeChunkEncoding[VolumeChunkEncoding["JPEG"] = 1] = "JPEG";
  VolumeChunkEncoding[VolumeChunkEncoding["COMPRESSED_SEGMENTATION"] = 2] = "COMPRESSED_SEGMENTATION";
})(exports.VolumeChunkEncoding || (exports.VolumeChunkEncoding = {}));
var VolumeChunkEncoding = exports.VolumeChunkEncoding;
// Prevent this from being considered a typings file.
var x = 0;

/***/ },
/* 62 */
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

var shader_1 = __webpack_require__(36);
var geom_1 = __webpack_require__(21);
var perspective_panel_1 = __webpack_require__(63);
var shader_lib_1 = __webpack_require__(68);
var frontend_1 = __webpack_require__(51);
var base_1 = __webpack_require__(37);
var buffer_1 = __webpack_require__(35);
var worker_rpc_1 = __webpack_require__(7);

var MeshShaderManager = function () {
    function MeshShaderManager() {
        _classCallCheck(this, MeshShaderManager);

        this.tempLightVec = geom_1.vec4.create();
        this.tempPickID = new Float32Array(4);
    }

    _createClass(MeshShaderManager, [{
        key: 'defineShader',
        value: function defineShader(builder) {
            builder.addAttribute('highp vec3', 'aVertexPosition');
            builder.addAttribute('highp vec3', 'aVertexNormal');
            builder.addVarying('highp vec3', 'vColor');
            builder.addUniform('highp vec4', 'uLightDirection');
            builder.addUniform('highp vec3', 'uColor');
            builder.addUniform('highp mat4', 'uModelMatrix');
            builder.addUniform('highp mat4', 'uProjection');
            builder.addUniform('highp vec4', 'uPickID');
            builder.require(perspective_panel_1.perspectivePanelEmit);
            builder.setVertexMain(`
gl_Position = uProjection * (uModelMatrix * vec4(aVertexPosition, 1.0));
vec3 normal = (uModelMatrix * vec4(aVertexNormal, 0.0)).xyz;
float lightingFactor = abs(dot(normal, uLightDirection.xyz)) + uLightDirection.w;
vColor = lightingFactor * uColor;
`);
            builder.setFragmentMain(`emit(vec4(vColor, 1.0), uPickID);`);
        }
    }, {
        key: 'beginLayer',
        value: function beginLayer(gl, shader, renderContext) {
            var dataToDevice = renderContext.dataToDevice;
            var lightDirection = renderContext.lightDirection;
            var ambientLighting = renderContext.ambientLighting;
            var directionalLighting = renderContext.directionalLighting;

            gl.uniformMatrix4fv(shader.uniform('uProjection'), false, dataToDevice);
            var lightVec = this.tempLightVec;
            geom_1.vec3.scale(lightVec, lightDirection, directionalLighting);
            lightVec[3] = ambientLighting;
            gl.uniform4fv(shader.uniform('uLightDirection'), lightVec);
        }
    }, {
        key: 'beginObject',
        value: function beginObject(gl, shader, objectToDataMatrix, color, pickID) {
            gl.uniformMatrix4fv(shader.uniform('uModelMatrix'), false, objectToDataMatrix);
            gl.uniform4fv(shader.uniform('uPickID'), shader_lib_1.setVec4FromUint32(this.tempPickID, pickID));
            gl.uniform3fv(shader.uniform('uColor'), color);
        }
    }, {
        key: 'getShader',
        value: function getShader(gl) {
            return gl.memoize.get('mesh/MeshShaderManager', () => {
                var builder = new shader_1.ShaderBuilder(gl);
                this.defineShader(builder);
                return builder.build();
            });
        }
    }, {
        key: 'drawFragment',
        value: function drawFragment(gl, shader, fragmentChunk) {
            fragmentChunk.vertexBuffer.bindToVertexAttrib(shader.attribute('aVertexPosition'),
            /*components=*/3);
            fragmentChunk.normalBuffer.bindToVertexAttrib(shader.attribute('aVertexNormal'),
            /*components=*/3);
            fragmentChunk.indexBuffer.bind();
            gl.drawElements(gl.TRIANGLES, fragmentChunk.numIndices, gl.UNSIGNED_INT, 0);
        }
    }, {
        key: 'endLayer',
        value: function endLayer(gl, shader) {
            gl.disableVertexAttribArray(shader.attribute('aVertexPosition'));
            gl.disableVertexAttribArray(shader.attribute('aVertexNormal'));
        }
    }]);

    return MeshShaderManager;
}();

exports.MeshShaderManager = MeshShaderManager;
;

var MeshLayer = function (_perspective_panel_1$) {
    _inherits(MeshLayer, _perspective_panel_1$);

    function MeshLayer(chunkManager, source, displayState) {
        _classCallCheck(this, MeshLayer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MeshLayer).call(this));

        _this.chunkManager = chunkManager;
        _this.source = source;
        _this.displayState = displayState;
        _this.meshShaderManager = new MeshShaderManager();
        _this.shader = _this.registerDisposer(_this.meshShaderManager.getShader(_this.gl));
        var dispatchRedrawNeeded = () => {
            _this.redrawNeeded.dispatch();
        };
        _this.registerSignalBinding(displayState.segmentColorHash.changed.add(dispatchRedrawNeeded));
        _this.registerSignalBinding(displayState.visibleSegments.changed.add(dispatchRedrawNeeded));
        _this.registerSignalBinding(displayState.segmentSelectionState.changed.add(dispatchRedrawNeeded));
        var sharedObject = _this.registerDisposer(new worker_rpc_1.SharedObject());
        sharedObject.initializeCounterpart(chunkManager.rpc, {
            'type': 'mesh/MeshLayer',
            'chunkManager': chunkManager.rpcId,
            'source': source.addCounterpartRef(),
            'visibleSegmentSet': displayState.visibleSegments.rpcId
        });
        _this.setReady(true);
        return _this;
    }

    _createClass(MeshLayer, [{
        key: 'draw',
        value: function draw(renderContext) {
            var gl = this.gl;
            var shader = this.shader;
            shader.bind();
            var meshShaderManager = this.meshShaderManager;

            meshShaderManager.beginLayer(gl, shader, renderContext);
            var objectChunks = this.source.fragmentSource.objectChunks;
            var pickIDs = renderContext.pickIDs;
            // FIXME: this maybe should change

            var objectToDataMatrix = geom_1.mat4.create();
            geom_1.mat4.identity(objectToDataMatrix);
            var color = geom_1.vec3.create();
            var displayState = this.displayState;
            var segmentColorHash = displayState.segmentColorHash;
            var segmentSelectionState = displayState.segmentSelectionState;

            for (var objectId of displayState.visibleSegments) {
                var objectKey = `${ objectId.low }:${ objectId.high }`;
                var fragments = objectChunks.get(objectKey);
                if (fragments === undefined) {
                    continue;
                }
                segmentColorHash.compute(color, objectId);
                if (segmentSelectionState.isSelected(objectId)) {
                    for (var i = 0; i < 3; ++i) {
                        color[i] = color[i] * 0.5 + 0.5;
                    }
                }
                meshShaderManager.beginObject(gl, shader, objectToDataMatrix, color, pickIDs.register(this, objectId));
                for (var fragment of fragments) {
                    if (fragment.state === base_1.ChunkState.GPU_MEMORY) {
                        meshShaderManager.drawFragment(gl, shader, fragment);
                    }
                }
            }
            meshShaderManager.endLayer(gl, shader);
        }
    }, {
        key: 'gl',
        get: function () {
            return this.chunkManager.chunkQueueManager.gl;
        }
    }]);

    return MeshLayer;
}(perspective_panel_1.PerspectiveViewRenderLayer);

exports.MeshLayer = MeshLayer;
;
function makeNormals(positions, indices) {
    var faceNormal = geom_1.vec3.create();
    var v1v0 = geom_1.vec3.create();
    var v2v1 = geom_1.vec3.create();
    var vertexNormals = new Float32Array(positions.length);
    var vertexFaceCount = new Float32Array(positions.length / 3);
    var numIndices = indices.length;
    for (var i = 0; i < numIndices; i += 3) {
        for (var j = 0; j < 3; ++j) {
            vertexFaceCount[indices[i + j]] += 1;
        }
    }
    for (var _i = 0; _i < numIndices; _i += 3) {
        var i0 = indices[_i] * 3,
            i1 = indices[_i + 1] * 3,
            i2 = indices[_i + 2] * 3;
        for (var _j = 0; _j < 3; ++_j) {
            v1v0[_j] = positions[i1 + _j] - positions[i0 + _j];
            v2v1[_j] = positions[i2 + _j] - positions[i1 + _j];
        }
        geom_1.vec3.cross(faceNormal, v1v0, v2v1);
        geom_1.vec3.normalize(faceNormal, faceNormal);
        for (var k = 0; k < 3; ++k) {
            var index = indices[_i + k];
            var scalar = 1.0 / vertexFaceCount[index];
            var offset = index * 3;
            for (var _j2 = 0; _j2 < 3; ++_j2) {
                vertexNormals[offset + _j2] += scalar * faceNormal[_j2];
            }
        }
    }
    // Normalize all vertex normals.
    var numVertices = vertexNormals.length;
    for (var _i2 = 0; _i2 < numVertices; _i2 += 3) {
        var vec = vertexNormals.subarray(_i2, 3);
        geom_1.vec3.normalize(vec, vec);
    }
    return vertexNormals;
}

var FragmentChunk = function (_frontend_1$Chunk) {
    _inherits(FragmentChunk, _frontend_1$Chunk);

    function FragmentChunk(source, x) {
        _classCallCheck(this, FragmentChunk);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(FragmentChunk).call(this, source));

        _this2.objectKey = x['objectKey'];
        _this2.data = x['data'];
        return _this2;
    }

    _createClass(FragmentChunk, [{
        key: 'copyToGPU',
        value: function copyToGPU(gl) {
            _get(Object.getPrototypeOf(FragmentChunk.prototype), 'copyToGPU', this).call(this, gl);
            var data = this.data;

            var dv = new DataView(data.buffer);
            var numVertices = dv.getInt32(0, true);
            var positions = new Float32Array(data.buffer, 4, numVertices * 3);
            // 4 * 3 bytes per vertex position + 4 byte offset due to numVertices.
            var indices = new Uint32Array(data.buffer, 4 + 12 * numVertices);
            this.vertexBuffer = buffer_1.Buffer.fromData(gl, positions, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
            this.indexBuffer = buffer_1.Buffer.fromData(gl, indices, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW);
            this.numIndices = indices.length;
            // console.log('positions', positions);
            // console.log('indices', indices);
            var normals = makeNormals(positions, indices);
            this.normalBuffer = buffer_1.Buffer.fromData(gl, normals, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
        }
    }, {
        key: 'freeGPUMemory',
        value: function freeGPUMemory(gl) {
            _get(Object.getPrototypeOf(FragmentChunk.prototype), 'freeGPUMemory', this).call(this, gl);
            this.vertexBuffer.dispose();
            this.indexBuffer.dispose();
            this.normalBuffer.dispose();
        }
    }]);

    return FragmentChunk;
}(frontend_1.Chunk);

exports.FragmentChunk = FragmentChunk;
;

var FragmentSource = function (_frontend_1$ChunkSour) {
    _inherits(FragmentSource, _frontend_1$ChunkSour);

    function FragmentSource(chunkManager, meshSource) {
        _classCallCheck(this, FragmentSource);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(FragmentSource).call(this, chunkManager));

        _this3.meshSource = meshSource;
        _this3.objectChunks = new Map();
        _this3.initializeCounterpart(chunkManager.rpc, { 'type': 'mesh/FragmentSource' });
        return _this3;
    }

    _createClass(FragmentSource, [{
        key: 'addChunk',
        value: function addChunk(key, chunk) {
            _get(Object.getPrototypeOf(FragmentSource.prototype), 'addChunk', this).call(this, key, chunk);
            var objectChunks = this.objectChunks;
            var objectKey = chunk.objectKey;

            var fragments = objectChunks.get(objectKey);
            if (fragments === undefined) {
                fragments = new Set();
                objectChunks.set(objectKey, fragments);
            }
            fragments.add(chunk);
        }
    }, {
        key: 'deleteChunk',
        value: function deleteChunk(key) {
            var chunk = this.chunks.get(key);
            _get(Object.getPrototypeOf(FragmentSource.prototype), 'deleteChunk', this).call(this, key);
            var objectChunks = this.objectChunks;
            var objectKey = chunk.objectKey;

            var fragments = objectChunks.get(objectKey);
            fragments.delete(chunk);
            if (fragments.size === 0) {
                objectChunks.delete(objectKey);
            }
        }
    }, {
        key: 'getChunk',
        value: function getChunk(x) {
            return new FragmentChunk(this, x);
        }
    }]);

    return FragmentSource;
}(frontend_1.ChunkSource);

exports.FragmentSource = FragmentSource;
;

var MeshSource = function (_frontend_1$ChunkSour2) {
    _inherits(MeshSource, _frontend_1$ChunkSour2);

    function MeshSource() {
        _classCallCheck(this, MeshSource);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(MeshSource).call(this, ...args));

        _this4.fragmentSource = new FragmentSource(_this4.chunkManager, _this4);
        return _this4;
    }

    _createClass(MeshSource, [{
        key: 'initializeCounterpart',
        value: function initializeCounterpart(rpc, options) {
            options['fragmentSource'] = this.fragmentSource.addCounterpartRef();
            _get(Object.getPrototypeOf(MeshSource.prototype), 'initializeCounterpart', this).call(this, rpc, options);
        }
    }]);

    return MeshSource;
}(frontend_1.ChunkSource);

exports.MeshSource = MeshSource;
;

/***/ },
/* 63 */
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

var layer_1 = __webpack_require__(40);
var signals_1 = __webpack_require__(38);
var rendered_data_panel_1 = __webpack_require__(64);
var frontend_1 = __webpack_require__(34);
var geom_1 = __webpack_require__(21);
var shader_lib_1 = __webpack_require__(68);
var axes_lines_1 = __webpack_require__(69);
var object_picking_1 = __webpack_require__(70);
var layer_2 = __webpack_require__(40);
var offscreen_1 = __webpack_require__(53);
var trackable_boolean_1 = __webpack_require__(71);
var mouse_drag_1 = __webpack_require__(72);

var PerspectiveViewRenderLayer = function (_layer_1$RenderLayer) {
    _inherits(PerspectiveViewRenderLayer, _layer_1$RenderLayer);

    function PerspectiveViewRenderLayer() {
        _classCallCheck(this, PerspectiveViewRenderLayer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PerspectiveViewRenderLayer).call(this, ...args));

        _this.redrawNeeded = new signals_1.Signal();
        return _this;
    }

    _createClass(PerspectiveViewRenderLayer, [{
        key: 'draw',
        value: function draw(renderContext) {
            // Must be overridden by subclasses.
        }
    }, {
        key: 'drawPicking',
        value: function drawPicking(renderContext) {
            // Do nothing by default.
        }
    }]);

    return PerspectiveViewRenderLayer;
}(layer_1.RenderLayer);

exports.PerspectiveViewRenderLayer = PerspectiveViewRenderLayer;
;
var keyCommands = new Map();

var _loop = function (axis) {
    var axisName = geom_1.AXES_NAMES[axis];

    var _loop2 = function (sign) {
        var signStr = sign < 0 ? '-' : '+';
        keyCommands.set(`rotate-relative-${ axisName }${ signStr }`, function () {
            var panel = this;
            var navigationState = panel.viewer.navigationState;

            navigationState.pose.rotateRelative(geom_1.kAxes[axis], sign * 0.1);
        });
        var tempOffset = geom_1.vec3.create();
        keyCommands.set(`${ axisName }${ signStr }`, function () {
            var panel = this;
            var navigationState = panel.viewer.navigationState;

            var offset = tempOffset;
            offset[0] = 0;
            offset[1] = 0;
            offset[2] = 0;
            offset[axis] = this.navigationState.position.voxelSize.size[axis] * sign;
            navigationState.pose.translateRelative(offset);
        });
    };

    for (var sign of [-1, +1]) {
        _loop2(sign);
    }
};

for (var axis = 0; axis < 3; ++axis) {
    _loop(axis);
}
keyCommands.set('snap', function () {
    this.navigationState.pose.snap();
});
keyCommands.set('zoom-in', function () {
    var panel = this;
    var navigationState = panel.viewer.navigationState;

    navigationState.zoomBy(0.5);
});
keyCommands.set('zoom-out', function () {
    var panel = this;
    var navigationState = panel.viewer.navigationState;

    navigationState.zoomBy(2.0);
});
(function (OffscreenTextures) {
    OffscreenTextures[OffscreenTextures["COLOR"] = 0] = "COLOR";
    OffscreenTextures[OffscreenTextures["Z"] = 1] = "Z";
    OffscreenTextures[OffscreenTextures["PICK"] = 2] = "PICK";
    OffscreenTextures[OffscreenTextures["NUM_TEXTURES"] = 3] = "NUM_TEXTURES";
})(exports.OffscreenTextures || (exports.OffscreenTextures = {}));
var OffscreenTextures = exports.OffscreenTextures;
exports.glsl_perspectivePanelEmit = [shader_lib_1.glsl_packFloat01ToFixedPoint, `
void emit(vec4 color, vec4 pickId) {
  gl_FragData[${ OffscreenTextures.COLOR }] = color;
  gl_FragData[${ OffscreenTextures.Z }] = packFloat01ToFixedPoint(1.0 - gl_FragCoord.z);
  gl_FragData[${ OffscreenTextures.PICK }] = pickId;
}
`];
function perspectivePanelEmit(builder) {
    builder.addFragmentExtension('GL_EXT_draw_buffers');
    builder.addFragmentCode(exports.glsl_perspectivePanelEmit);
}
exports.perspectivePanelEmit = perspectivePanelEmit;

var PerspectivePanel = function (_rendered_data_panel_) {
    _inherits(PerspectivePanel, _rendered_data_panel_);

    function PerspectivePanel(context, element, viewer) {
        _classCallCheck(this, PerspectivePanel);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PerspectivePanel).call(this, context, element, viewer));

        _this2.visibleLayerTracker = _this2.registerDisposer(new layer_2.VisibleRenderLayerTracker(_this2.viewer.layerManager, PerspectiveViewRenderLayer, layer => {
            layer.redrawNeeded.add(_this2.scheduleRedraw, _this2);
            _this2.scheduleRedraw();
        }, layer => {
            layer.redrawNeeded.remove(_this2.scheduleRedraw, _this2);
            _this2.scheduleRedraw();
        }));
        _this2.sliceViews = new Set();
        _this2.projectionMat = geom_1.mat4.create();
        _this2.inverseProjectionMat = geom_1.mat4.create();
        _this2.modelViewMat = geom_1.mat4.create();
        _this2.width = null;
        _this2.height = null;
        _this2.pickIDs = new object_picking_1.PickIDManager();
        _this2.axesLineHelper = _this2.registerDisposer(axes_lines_1.AxesLineHelper.get(_this2.gl));
        _this2.sliceViewRenderHelper = _this2.registerDisposer(frontend_1.SliceViewRenderHelper.get(_this2.gl, 'SliceViewRenderHelper:PerspectivePanel', perspectivePanelEmit));
        _this2.offscreenFramebuffer = new offscreen_1.OffscreenFramebuffer(_this2.gl, { numDataBuffers: OffscreenTextures.NUM_TEXTURES, depthBuffer: true, stencilBuffer: true });
        _this2.offscreenCopyHelper = offscreen_1.OffscreenCopyHelper.get(_this2.gl);
        _this2.registerSignalBinding(_this2.navigationState.changed.add(_this2.context.scheduleRedraw, _this2.context));
        var showSliceViewsCheckbox = _this2.registerDisposer(new trackable_boolean_1.TrackableBooleanCheckbox(viewer.showSliceViews));
        showSliceViewsCheckbox.element.className = 'perspective-panel-show-slice-views noselect';
        var showSliceViewsLabel = document.createElement('label');
        showSliceViewsLabel.className = 'noselect';
        showSliceViewsLabel.appendChild(document.createTextNode('Slices'));
        showSliceViewsLabel.appendChild(showSliceViewsCheckbox.element);
        _this2.element.appendChild(showSliceViewsLabel);
        _this2.registerSignalBinding(viewer.showSliceViews.changed.add(_this2.scheduleRedraw, _this2));
        _this2.registerSignalBinding(viewer.showAxisLines.changed.add(_this2.scheduleRedraw, _this2));
        return _this2;
    }

    _createClass(PerspectivePanel, [{
        key: 'onKeyCommand',
        value: function onKeyCommand(action) {
            var command = keyCommands.get(action);
            if (command) {
                command.call(this);
                return true;
            }
            return false;
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            this.width = this.element.clientWidth;
            this.height = this.element.clientHeight;
            this.context.scheduleRedraw();
        }
    }, {
        key: 'updateMouseState',
        value: function updateMouseState(mouseState) {
            mouseState.pickedRenderLayer = null;
            if (!this.navigationState.valid) {
                return false;
            }
            var out = mouseState.position;
            var offscreenFramebuffer = this.offscreenFramebuffer;
            var width = this.width;
            var height = this.height;

            if (!offscreenFramebuffer.hasSize(width, height)) {
                return false;
            }
            var glWindowX = this.mouseX;
            var glWindowY = height - this.mouseY;
            var zData = offscreenFramebuffer.readPixel(OffscreenTextures.Z, glWindowX, glWindowY);
            var glWindowZ = 1.0 - shader_lib_1.unpackFloat01FromFixedPoint(zData);
            if (glWindowZ === 1.0) {
                return false;
            }
            out[0] = 2.0 * glWindowX / width - 1.0;
            out[1] = 2.0 * glWindowY / height - 1.0;
            out[2] = 2.0 * glWindowZ - 1.0;
            geom_1.vec3.transformMat4(out, out, this.inverseProjectionMat);
            this.pickIDs.setMouseState(mouseState, offscreenFramebuffer.readPixelAsUint32(OffscreenTextures.PICK, glWindowX, glWindowY));
            return true;
        }
    }, {
        key: 'onMousedown',
        value: function onMousedown(e) {
            _get(Object.getPrototypeOf(PerspectivePanel.prototype), 'onMousedown', this).call(this, e);
            if (!this.navigationState.valid) {
                return;
            }
            if (e.button === 0) {
                mouse_drag_1.startRelativeMouseDrag(e, (event, deltaX, deltaY) => {
                    this.navigationState.pose.rotateRelative(geom_1.kAxes[1], deltaX / 4.0 * Math.PI / 180.0);
                    this.navigationState.pose.rotateRelative(geom_1.kAxes[0], deltaY / 4.0 * Math.PI / 180.0);
                    this.viewer.navigationState.changed.dispatch();
                });
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            if (!this.navigationState.valid) {
                return;
            }
            for (var sliceView of this.sliceViews) {
                sliceView.updateRendering();
            }
            var gl = this.gl;
            this.offscreenFramebuffer.bind(this.width, this.height);
            gl.disable(gl.SCISSOR_TEST);
            this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
            var projectionMat = this.projectionMat;
            geom_1.mat4.perspective(projectionMat, Math.PI / 4.0, this.width / this.height, 10, 5000);
            var modelViewMat = this.modelViewMat;
            this.navigationState.toMat4(modelViewMat);
            // FIXME: don"t use temporaries.
            var viewOffset = geom_1.vec3.fromValues(0, 0, 100);
            geom_1.mat4.translate(modelViewMat, modelViewMat, viewOffset);
            var modelViewMatInv = geom_1.mat4.create();
            geom_1.mat4.invert(modelViewMatInv, modelViewMat);
            geom_1.mat4.multiply(projectionMat, projectionMat, modelViewMatInv);
            geom_1.mat4.invert(this.inverseProjectionMat, projectionMat);
            // FIXME; avoid temporaries
            var lightingDirection = geom_1.vec4.create();
            geom_1.vec4.transformMat4(lightingDirection, geom_1.kAxes[2], modelViewMat);
            geom_1.vec4.normalize(lightingDirection, lightingDirection);
            var ambient = 0.2;
            var directional = 1 - ambient;
            var pickIDs = this.pickIDs;
            pickIDs.clear();
            var renderContext = {
                dataToDevice: projectionMat,
                lightDirection: lightingDirection.subarray(0, 3),
                ambientLighting: ambient,
                directionalLighting: directional,
                pickIDs: pickIDs
            };
            var visibleLayers = this.visibleLayerTracker.getVisibleLayers();
            for (var renderLayer of visibleLayers) {
                renderLayer.draw(renderContext);
            }
            var mat = geom_1.mat4.create();
            if (this.viewer.showSliceViews.value) {
                var sliceViewRenderHelper = this.sliceViewRenderHelper;

                for (var _sliceView of this.sliceViews) {
                    var scalar = Math.abs(geom_1.vec3.dot(lightingDirection, _sliceView.viewportAxes[2]));
                    var factor = ambient + scalar * directional;
                    // Need a matrix that maps (+1, +1, 0) to projectionMat * (width, height, 0)
                    geom_1.mat4.identity(mat);
                    mat[0] = _sliceView.width / 2.0;
                    mat[5] = -_sliceView.height / 2.0;
                    geom_1.mat4.multiply(mat, _sliceView.viewportToData, mat);
                    geom_1.mat4.multiply(mat, projectionMat, mat);
                    sliceViewRenderHelper.draw(_sliceView.offscreenFramebuffer.dataTextures[0], mat, geom_1.vec4.fromValues(factor, factor, factor, 1), geom_1.vec4.fromValues(0.5, 0.5, 0.5, 1), 0, 0, 1, 1);
                }
            }
            if (this.viewer.showAxisLines.value) {
                geom_1.mat4.identity(mat);
                // Draw axes lines.
                var axisLength = 200 * 8;
                // Construct matrix that maps [-1, +1] x/y range to the full viewport data
                // coordinates.
                mat[0] = axisLength;
                mat[5] = axisLength;
                mat[10] = axisLength;
                var center = this.navigationState.position.spatialCoordinates;
                mat[12] = center[0];
                mat[13] = center[1];
                mat[14] = center[2];
                mat[15] = 1;
                geom_1.mat4.multiply(mat, projectionMat, mat);
                gl.WEBGL_draw_buffers.drawBuffersWEBGL([gl.WEBGL_draw_buffers.COLOR_ATTACHMENT0_WEBGL]);
                this.axesLineHelper.draw(mat, false);
            }
            // Do picking only rendering pass.
            gl.WEBGL_draw_buffers.drawBuffersWEBGL([gl.NONE, gl.WEBGL_draw_buffers.COLOR_ATTACHMENT1_WEBGL, gl.WEBGL_draw_buffers.COLOR_ATTACHMENT2_WEBGL]);
            for (var _renderLayer of visibleLayers) {
                _renderLayer.drawPicking(renderContext);
            }
            gl.disable(gl.DEPTH_TEST);
            this.offscreenFramebuffer.unbind();
            // Draw the texture over the whole viewport.
            this.setGLViewport();
            this.offscreenCopyHelper.draw(this.offscreenFramebuffer.dataTextures[OffscreenTextures.COLOR]);
        }
    }, {
        key: 'navigationState',
        get: function () {
            return this.viewer.navigationState;
        }
    }]);

    return PerspectivePanel;
}(rendered_data_panel_1.RenderedDataPanel);

exports.PerspectivePanel = PerspectivePanel;
;

/***/ },
/* 64 */
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

var display_context_1 = __webpack_require__(65);
var wheel_zoom_1 = __webpack_require__(67);
var geom_1 = __webpack_require__(21);

var RenderedDataPanel = function (_display_context_1$Re) {
    _inherits(RenderedDataPanel, _display_context_1$Re);

    function RenderedDataPanel(context, element, viewer) {
        _classCallCheck(this, RenderedDataPanel);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RenderedDataPanel).call(this, context, element));

        _this.viewer = viewer;
        // Last mouse position within the panel.
        _this.mouseX = 0;
        _this.mouseY = 0;
        _this.mouseStateUpdater = _this.updateMouseState.bind(_this);
        _this.registerEventListener(element, 'mousemove', _this.onMousemove.bind(_this));
        _this.registerEventListener(element, 'mouseout', _this.onMouseout.bind(_this));
        _this.registerEventListener(element, 'mousedown', _this.onMousedown.bind(_this), false);
        _this.registerEventListener(element, 'wheel', _this.onMousewheel.bind(_this), false);
        _this.registerEventListener(element, 'dblclick', () => {
            _this.viewer.layerManager.invokeAction('select');
        });
        return _this;
    }

    _createClass(RenderedDataPanel, [{
        key: 'onMouseout',
        value: function onMouseout(event) {
            var mouseState = this.viewer.mouseState;

            mouseState.updater = undefined;
            mouseState.setActive(false);
        }
    }, {
        key: 'onMousemove',
        value: function onMousemove(event) {
            var element = this.element;

            this.mouseX = event.offsetX - element.clientLeft;
            this.mouseY = event.offsetY - element.clientTop;
            var mouseState = this.viewer.mouseState;

            mouseState.updater = this.mouseStateUpdater;
            mouseState.triggerUpdate();
        }
    }, {
        key: 'onMousewheel',
        value: function onMousewheel(e) {
            this.viewer.navigationState.zoomBy(wheel_zoom_1.getWheelZoomAmount(e));
            e.preventDefault();
        }
    }, {
        key: 'onMousedown',
        value: function onMousedown(e) {
            this.onMousemove(e);
            if (e.button === 2) {
                var mouseState = this.viewer.mouseState;

                if (mouseState.updateUnconditionally()) {
                    var position = this.viewer.navigationState.pose.position;
                    geom_1.vec3.copy(position.spatialCoordinates, mouseState.position);
                    position.changed.dispatch();
                }
            }
        }
    }]);

    return RenderedDataPanel;
}(display_context_1.RenderedPanel);

exports.RenderedDataPanel = RenderedDataPanel;
;

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

var context_1 = __webpack_require__(66);
var signals_1 = __webpack_require__(38);
var disposable_1 = __webpack_require__(8);

var RenderedPanel = function (_disposable_1$RefCoun) {
    _inherits(RenderedPanel, _disposable_1$RefCoun);

    function RenderedPanel(context, element) {
        _classCallCheck(this, RenderedPanel);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RenderedPanel).call(this));

        _this.context = context;
        _this.element = element;
        _this.gl = context.gl;
        _this.registerEventListener(element, 'mouseover', event => {
            _this.context.setActivePanel(_this);
        });
        context.addPanel(_this);
        return _this;
    }

    _createClass(RenderedPanel, [{
        key: 'scheduleRedraw',
        value: function scheduleRedraw() {
            this.context.scheduleRedraw();
        }
    }, {
        key: 'setGLViewport',
        value: function setGLViewport() {
            var element = this.element;
            var left = element.offsetLeft + element.clientLeft;
            var width = element.clientWidth;
            var top = element.offsetTop + element.clientTop;
            var height = element.clientHeight;
            var bottom = top + height;
            var gl = this.gl;
            gl.enable(gl.SCISSOR_TEST);
            var glBottom = this.context.canvas.height - bottom;
            gl.viewport(left, glBottom, width, height);
            gl.scissor(left, glBottom, width, height);
        }
    }, {
        key: 'onKeyCommand',
        value: function onKeyCommand(action) {
            return false;
        }
    }]);

    return RenderedPanel;
}(disposable_1.RefCounted);

exports.RenderedPanel = RenderedPanel;
;

var DisplayContext = function (_disposable_1$RefCoun2) {
    _inherits(DisplayContext, _disposable_1$RefCoun2);

    function DisplayContext(container) {
        _classCallCheck(this, DisplayContext);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(DisplayContext).call(this));

        _this2.container = container;
        _this2.canvas = document.createElement('canvas');
        _this2.updateStarted = new signals_1.Signal();
        _this2.updateFinished = new signals_1.Signal();
        _this2.panels = new Set();
        _this2.activePanel = null;
        _this2.updatePending = null;
        _this2.needsRedraw = false;
        var canvas = _this2.canvas;

        canvas.className = 'gl-canvas';
        container.appendChild(canvas);
        _this2.gl = context_1.initializeWebGL(canvas);
        _this2.registerEventListener(window, 'resize', _this2.onResize.bind(_this2));
        return _this2;
    }

    _createClass(DisplayContext, [{
        key: 'disposed',
        value: function disposed() {
            if (this.updatePending != null) {
                cancelAnimationFrame(this.updatePending);
                this.updatePending = null;
            }
        }
    }, {
        key: 'addPanel',
        value: function addPanel(panel) {
            this.panels.add(panel);
            if (this.activePanel == null) {
                this.setActivePanel(panel);
            }
        }
    }, {
        key: 'setActivePanel',
        value: function setActivePanel(panel) {
            var existingPanel = this.activePanel;
            if (existingPanel != null) {
                existingPanel.element.attributes.removeNamedItem('isActivePanel');
            }
            if (panel != null) {
                panel.element.setAttribute('isActivePanel', 'true');
            }
            this.activePanel = panel;
        }
    }, {
        key: 'removePanel',
        value: function removePanel(panel) {
            this.panels.delete(panel);
            if (panel === this.activePanel) {
                this.setActivePanel(null);
            }
            panel.dispose();
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            this.scheduleRedraw();
            for (var panel of this.panels) {
                panel.onResize();
            }
        }
    }, {
        key: 'scheduleUpdate',
        value: function scheduleUpdate() {
            if (this.updatePending === null) {
                this.updatePending = requestAnimationFrame(this.update.bind(this));
            }
        }
    }, {
        key: 'scheduleRedraw',
        value: function scheduleRedraw() {
            if (!this.needsRedraw) {
                this.needsRedraw = true;
                this.scheduleUpdate();
            }
        }
    }, {
        key: 'update',
        value: function update() {
            this.updatePending = null;
            this.updateStarted.dispatch();
            if (this.needsRedraw) {
                // console.log("Redraw");
                this.needsRedraw = false;
                var gl = this.gl;
                var canvas = this.canvas;
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                for (var panel of this.panels) {
                    var element = panel.element;

                    if (element.clientWidth === 0 || element.clientHeight === 0) {
                        // Skip drawing if the panel has zero client area.
                        continue;
                    }
                    panel.setGLViewport();
                    panel.draw();
                }
            }
            this.updateFinished.dispatch();
        }
    }]);

    return DisplayContext;
}(disposable_1.RefCounted);

exports.DisplayContext = DisplayContext;
;

/***/ },
/* 66 */
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

var memoize_1 = __webpack_require__(52);
exports.DEBUG_SHADERS = false;
function initializeWebGL(canvas) {
    var gl = null;
    var options = {
        'antialias': false,
        'stencil': true
    };
    if (exports.DEBUG_SHADERS) {
        console.log('DEBUGGING via preserveDrawingBuffer');
        options['preserveDrawingBuffer'] = true;
    }
    gl = canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options);
    gl.memoize = new memoize_1.Memoize();
    gl.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    gl.maxTextureImageUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    gl.tempTextureUnit = gl.maxTextureImageUnits - 1;
    // FIXME: verify that we received a stencil buffer
    // var contextAttributes = gl.getContextAttributes();
    // var haveStencilBuffer = contextAttributes.stencil;
    gl.WEBGL_draw_buffers = gl.getExtension('WEBGL_draw_buffers');
    if (!gl.WEBGL_draw_buffers) {
        throw new Error('WEBGL_draw_buffers extension not available');
    }
    for (var extension of ['OES_texture_float', 'OES_element_index_uint']) {
        if (!gl.getExtension(extension)) {
            throw new Error(`${ extension } extension not available`);
        }
    }
    return gl;
}
exports.initializeWebGL = initializeWebGL;

/***/ },
/* 67 */
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

var DOM_DELTA_PIXEL = 0;
var DOM_DELTA_LINE = 1;
var DOM_DELTA_PAGE = 2;
function getWheelZoomAmount(event) {
    var multiplier = 1 / 200.0; // For DOM_DELTA_PIXEL.
    var deltaMode = event.deltaMode;

    if (deltaMode === DOM_DELTA_LINE) {
        multiplier = 1 / 10.0;
    } else if (deltaMode === DOM_DELTA_PAGE) {
        multiplier = 2;
    }
    return Math.exp(event.deltaY * multiplier);
}
exports.getWheelZoomAmount = getWheelZoomAmount;

/***/ },
/* 68 */
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
 * GLSL function for converting a float in [0,1) to 32-bit little endian fixed point representation
 * (encoded as a vector of four floats in [0,1]).  This is fast but may not be completely accurate.
 * For a slower function that handles the full floating point finite range, use glsl_packFloat.
 */

exports.glsl_packFloat01ToFixedPoint = `
vec4 packFloat01ToFixedPoint(const float value) {
  const vec4 shift = vec4(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0);
  const vec4 mask = vec4(0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0);
  vec4 result = fract(value * shift);
  result -= result.xxyz * mask;
  return result * 256.0 / 255.0;
}
`;
function unpackFloat01FromFixedPoint(data) {
  return (data[3] + data[2] * (1.0 / 256.0) + data[1] * (1.0 / 65536.0) + data[0] * (1.0 / 16777216.0)) / 256.0;
}
exports.unpackFloat01FromFixedPoint = unpackFloat01FromFixedPoint;
// Hue, saturation, and value are in [0, 1] range.
exports.glsl_hsvToRgb = `
vec3 hueToRgb(float hue) {
  float hue6 = hue * 6.0;
  float r = abs(hue6 - 3.0) - 1.0;
  float g = 2.0 - abs(hue6 - 2.0);
  float b = 2.0 - abs(hue6 - 4.0);
  return clamp(vec3(r, g, b), 0.0, 1.0);
}
vec3 hsvToRgb(vec3 c) {
  vec3 hueRgb = hueToRgb(c.x);
  return c.z * ((hueRgb - 1.0) * c.y + 1.0);
}
`;
exports.glsl_uint64 = `
struct uint64_t {
  vec4 low, high;
};
`;
exports.glsl_getSubscriptsFromNormalized = `
vec3 getSubscriptsFromNormalized(vec3 normalizedPosition, vec3 size) {
  return floor(min(normalizedPosition * size, size - 1.0));
}
`;
exports.glsl_getFortranOrderIndex = `
float getFortranOrderIndex(vec3 subscripts, vec3 size) {
  return subscripts.x + size.x * (subscripts.y + size.y * subscripts.z);
}
`;
exports.glsl_getFortranOrderIndexFromNormalized = [exports.glsl_getSubscriptsFromNormalized, exports.glsl_getFortranOrderIndex, `
float getFortranOrderIndexFromNormalized(vec3 normalizedPosition, vec3 size) {
  return getFortranOrderIndex(getSubscriptsFromNormalized(normalizedPosition, size), size);
}
`];
exports.glsl_imod = `
float imod(float x, float y) {
  return x - y * floor(x / y);
}
`;
// Chrome 49 on NVIDIA Quadro K600 gives inexact results when using the built-in dot function.
exports.glsl_exactDot = `
float exactDot(vec4 a, vec4 b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
float exactDot(vec3 a, vec3 b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
`;
function fract(x) {
  return x - Math.floor(x);
}
exports.fract = fract;
function step(edge, x) {
  return x < edge ? 0 : 1;
}
exports.step = step;
function mod(x, y) {
  return x % y;
}
exports.mod = mod;
function exp2(x) {
  return Math.pow(2, x);
}
exports.exp2 = exp2;
/* WebGL 1.0 does not provide a convenient way to directly output float values from fragment
 * shaders; only 4-channel uint8 values (represented as floats in the range [0,1]) are supported.
 * Obtaining float values is particularly useful for debugging and unit testing.  This GLSL function
 * encodes a floating point value into a vector of 4 floats in the range [0,1] such that the
 * corresponding uint8 representation is the little endian IEEE 754 32-bit floating point format.
 *
 * Infinity and NaN values are not supported.  This function is not particularly efficient; it is
 * intended to be used only for debugging and testing.
 *
 * The GLSL function packFloatIntoVec4 is based on code posted to StackOverflow by user hrehfeld at
 * http://stackoverflow.com/a/14729074 and user Arjan at http://stackoverflow.com/a/11158534
 * licensed under CC BY-SA 3.0 ( http://creativecommons.org/licenses/by-sa/3.0/ ).
 */
exports.glsl_packFloat = `
vec4 packFloatIntoVec4(float f) {
  float magnitude = abs(f); 
  if (magnitude == 0.0) {
     return vec4(0,0,0,0);
  }
  float sign =  step(0.0, -f);
  float exponent = floor(log2(magnitude)); 
  float mantissa = magnitude / exp2(exponent); 
  // Denormalized values if all exponent bits are zero
  if (mantissa < 1.0) {
     exponent -= 1.0;
  }

  exponent +=  127.0;

  vec4 result;
  result[3] = 128.0 * sign + floor(exponent / 2.0);
  result[2] = 128.0 * mod(exponent, 2.0) +  mod(floor(mantissa * float(128.0)),128.0);
  result[1] = floor( mod(floor(mantissa* exp2(float(23.0 - 8.0))), exp2(8.0)));
  result[0] = floor( exp2(23.0)* mod(mantissa, exp2(-15.0)));
  return result / 255.0;
}
`;
exports.glsl_debugFunctions = [exports.glsl_packFloat];
function encodeBytesToFloat32(x) {
  var xBytes = new Uint8Array(x.buffer, x.byteOffset, x.byteLength);
  var length = xBytes.length;
  var result = new Float32Array(length);
  for (var i = 0; i < length; ++i) {
    result[i] = xBytes[i] / 255;
  }
  return result;
}
exports.encodeBytesToFloat32 = encodeBytesToFloat32;
function setVec4FromUint32(out, x) {
  for (var j = 0; j < 4; ++j) {
    out[j] = (x >> j * 8 & 0xFF) / 255.0;
  }
  return out;
}
exports.setVec4FromUint32 = setVec4FromUint32;
function getUint32FromVec4(v) {
  return v[0] * 255 + v[1] * 255 * 256 + v[2] * 255 * 256 * 256 + v[3] * 255 * 256 * 256 * 256;
}
exports.getUint32FromVec4 = getUint32FromVec4;

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var disposable_1 = __webpack_require__(8);
var buffer_1 = __webpack_require__(35);
var trivial_shaders_1 = __webpack_require__(55);

var AxesLineHelper = function (_disposable_1$RefCoun) {
    _inherits(AxesLineHelper, _disposable_1$RefCoun);

    function AxesLineHelper(gl) {
        _classCallCheck(this, AxesLineHelper);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AxesLineHelper).call(this));

        _this.gl = gl;
        _this.vertexBuffer = _this.registerDisposer(buffer_1.Buffer.fromData(gl, new Float32Array([0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]), gl.ARRAY_BUFFER, gl.STATIC_DRAW));
        var alpha = 0.5;
        _this.colorBuffer = _this.registerDisposer(buffer_1.Buffer.fromData(gl, new Float32Array([1, 0, 0, alpha, 1, 0, 0, alpha, 0, 1, 0, alpha, 0, 1, 0, alpha, 0, 0, 1, alpha, 0, 0, 1, alpha]), gl.ARRAY_BUFFER, gl.STATIC_DRAW));
        _this.trivialColorShader = _this.registerDisposer(trivial_shaders_1.trivialColorShader(gl));
        return _this;
    }

    _createClass(AxesLineHelper, [{
        key: 'draw',
        value: function draw(mat) {
            var blend = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            var shader = this.trivialColorShader;
            var gl = this.gl;
            shader.bind();
            gl.uniformMatrix4fv(shader.uniform('uProjectionMatrix'), false, mat);
            var aVertexPosition = shader.attribute('aVertexPosition');
            this.vertexBuffer.bindToVertexAttrib(aVertexPosition, 4);
            var aColor = shader.attribute('aColor');
            this.colorBuffer.bindToVertexAttrib(aColor, 4);
            if (blend) {
                gl.colorMask(false, false, false, true);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.colorMask(true, true, true, true);
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE_MINUS_DST_ALPHA, gl.DST_ALPHA);
            }
            gl.lineWidth(1);
            gl.drawArrays(gl.LINES, 0, 6);
            if (blend) {
                gl.disable(gl.BLEND);
            }
            gl.disableVertexAttribArray(aVertexPosition);
            gl.disableVertexAttribArray(aColor);
        }
    }], [{
        key: 'get',
        value: function get(gl) {
            return gl.memoize.get('SliceViewPanel:AxesLineHelper', () => new AxesLineHelper(gl));
        }
    }]);

    return AxesLineHelper;
}(disposable_1.RefCounted);

exports.AxesLineHelper = AxesLineHelper;
;

/***/ },
/* 70 */
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

var PickIDManager = function () {
    function PickIDManager() {
        _classCallCheck(this, PickIDManager);

        this.renderLayers = [null];
        this.lowValues = [0];
        this.highValues = [0];
    }

    _createClass(PickIDManager, [{
        key: "clear",
        value: function clear() {
            this.renderLayers.length = 1;
            this.lowValues.length = 1;
            this.highValues.length = 1;
        }
    }, {
        key: "register",
        value: function register(renderLayer, x) {
            var renderLayers = this.renderLayers;
            var lowValues = this.lowValues;
            var highValues = this.highValues;

            var id = renderLayers.length;
            renderLayers[id] = renderLayer;
            lowValues[id] = x.low;
            highValues[id] = x.high;
            return id;
        }
        /**
         * Set the object state according to the specified pick ID.
         */

    }, {
        key: "setMouseState",
        value: function setMouseState(mouseState, pickID) {
            mouseState.pickedRenderLayer = this.renderLayers[pickID];
            var pickedValue = mouseState.pickedValue;

            pickedValue.low = this.lowValues[pickID];
            pickedValue.high = this.highValues[pickID];
        }
    }]);

    return PickIDManager;
}();

exports.PickIDManager = PickIDManager;
;

/***/ },
/* 71 */
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

var signals_1 = __webpack_require__(38);
var disposable_1 = __webpack_require__(8);

var TrackableBoolean = function () {
    function TrackableBoolean(value_, defaultValue) {
        _classCallCheck(this, TrackableBoolean);

        this.value_ = value_;
        this.defaultValue = defaultValue;
        this.changed = new signals_1.Signal();
    }

    _createClass(TrackableBoolean, [{
        key: 'toggle',
        value: function toggle() {
            this.value = !this.value;
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            var value_ = this.value_;

            if (value_ === this.defaultValue) {
                return undefined;
            }
            return this.value_;
        }
    }, {
        key: 'restoreState',
        value: function restoreState(x) {
            if (x === undefined) {
                x = this.defaultValue;
            }
            if (x === true || x === false) {
                this.value = x;
            }
        }
    }, {
        key: 'value',
        get: function () {
            return this.value_;
        },
        set: function (newValue) {
            if (newValue !== this.value_) {
                this.value_ = newValue;
                this.changed.dispatch();
            }
        }
    }]);

    return TrackableBoolean;
}();

exports.TrackableBoolean = TrackableBoolean;
;

var TrackableBooleanCheckbox = function (_disposable_1$RefCoun) {
    _inherits(TrackableBooleanCheckbox, _disposable_1$RefCoun);

    function TrackableBooleanCheckbox(model) {
        _classCallCheck(this, TrackableBooleanCheckbox);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TrackableBooleanCheckbox).call(this));

        _this.model = model;
        _this.element = document.createElement('input');
        var element = _this.element;

        element.type = 'checkbox';
        _this.registerSignalBinding(model.changed.add(_this.updateCheckbox, _this));
        _this.updateCheckbox();
        _this.registerEventListener(element, 'change', function (e) {
            model.value = this.checked;
        });
        return _this;
    }

    _createClass(TrackableBooleanCheckbox, [{
        key: 'updateCheckbox',
        value: function updateCheckbox() {
            this.element.checked = this.model.value;
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            var element = this.element;
            var parentElement = element.parentElement;

            if (parentElement) {
                parentElement.removeChild(element);
            }
        }
    }]);

    return TrackableBooleanCheckbox;
}(disposable_1.RefCounted);

exports.TrackableBooleanCheckbox = TrackableBooleanCheckbox;
;

/***/ },
/* 72 */
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

function startRelativeMouseDrag(initialEvent, handler) {
    var document = initialEvent.view.document;

    var prevScreenX = initialEvent.screenX,
        prevScreenY = initialEvent.screenY;
    var mouseMoveHandler = e => {
        var deltaX = prevScreenX - e.screenX;
        var deltaY = prevScreenY - e.screenY;
        prevScreenX = e.screenX;
        prevScreenY = e.screenY;
        handler(e, deltaX, deltaY);
    };
    var button = initialEvent.button;
    var mouseUpHandler = e => {
        if (e.button === button) {
            document.removeEventListener('mousemove', mouseMoveHandler, true);
            document.removeEventListener('mouseup', mouseUpHandler, false);
        }
    };
    document.addEventListener('mousemove', mouseMoveHandler, true);
    document.addEventListener('mouseup', mouseUpHandler, false);
}
exports.startRelativeMouseDrag = startRelativeMouseDrag;

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

__webpack_require__(74);
var viewer_1 = __webpack_require__(81);
var display_context_1 = __webpack_require__(65);
__webpack_require__(126);
window.addEventListener('DOMContentLoaded', () => {
    var display = new display_context_1.DisplayContext(document.getElementById('container'));
    var viewer = window['viewer'] = new viewer_1.Viewer(display);
    var keyMap = viewer.keyMap;
    keyMap.bind('arrowleft', 'x-');
    keyMap.bind('arrowright', 'x+');
    keyMap.bind('arrowup', 'y-');
    keyMap.bind('arrowdown', 'y+');
    keyMap.bind('comma', 'z-');
    keyMap.bind('period', 'z+');
    keyMap.bind('keyz', 'snap');
    keyMap.bind('control+equal', 'zoom-in');
    keyMap.bind('control+shift+equal', 'zoom-in');
    keyMap.bind('control+minus', 'zoom-out');
    keyMap.bind('keyr', 'rotate-relative-z-');
    keyMap.bind('keye', 'rotate-relative-z+');
    keyMap.bind('shift+arrowdown', 'rotate-relative-x-');
    keyMap.bind('shift+arrowup', 'rotate-relative-x+');
    keyMap.bind('shift+arrowleft', 'rotate-relative-y-');
    keyMap.bind('shift+arrowright', 'rotate-relative-y+');
    keyMap.bind('keyl', 'recolor');
    keyMap.bind('keyx', 'clear-segments');
    keyMap.bind('keys', 'toggle-show-slices');
    keyMap.bind('keya', 'toggle-axis-lines');
    for (var i = 1; i <= 9; ++i) {
        keyMap.bind('digit' + i, 'toggle-layer-' + i);
    }
    keyMap.bind('keyn', 'add-layer');
});

/***/ },
/* 74 */
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

__webpack_require__(75);
__webpack_require__(77);

/***/ },
/* 75 */
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

var base_1 = __webpack_require__(19);
var geom_1 = __webpack_require__(21);
var disposable_1 = __webpack_require__(8);
var shader_lib_1 = __webpack_require__(68);
var uint64_1 = __webpack_require__(41);
var frontend_1 = __webpack_require__(34);
var array_1 = __webpack_require__(33);
var single_texture_chunk_format_1 = __webpack_require__(76);

var TextureLayout = function (_disposable_1$RefCoun) {
    _inherits(TextureLayout, _disposable_1$RefCoun);

    function TextureLayout(gl, chunkDataSize, texelsPerElement) {
        _classCallCheck(this, TextureLayout);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextureLayout).call(this));

        _this.chunkDataSize = chunkDataSize;
        var maxTextureSize = gl.maxTextureSize;

        var numDataPoints = chunkDataSize[0] * chunkDataSize[1] * chunkDataSize[2];
        var dataWidth = void 0;
        _this.chunkDataSize = chunkDataSize;
        if (texelsPerElement * chunkDataSize[0] <= maxTextureSize && chunkDataSize[1] * chunkDataSize[2] <= maxTextureSize) {
            // [X, YZ]
            dataWidth = chunkDataSize[0];
        } else if (texelsPerElement * chunkDataSize[0] * chunkDataSize[1] <= maxTextureSize) {
            // [XY, Z]
            dataWidth = chunkDataSize[0] * chunkDataSize[1];
        } else {
            // Use arbitrary layout.
            dataWidth = Math.ceil(numDataPoints / maxTextureSize);
            if (dataWidth * texelsPerElement > maxTextureSize) {
                throw new Error('Chunk data size exceeds maximum texture size: ' + texelsPerElement + ' * ' + numDataPoints);
            }
        }
        var dataHeight = Math.ceil(numDataPoints / dataWidth);
        _this.textureWidth = dataWidth * texelsPerElement;
        _this.textureHeight = dataHeight;
        _this.textureAccessCoefficients = Float32Array.of(1.0 / dataWidth, 1.0 / (dataWidth * dataHeight));
        return _this;
    }

    _createClass(TextureLayout, null, [{
        key: 'get',
        value: function get(gl, chunkDataSize, texelsPerElement) {
            return gl.memoize.get(`sliceview.UncompressedTextureLayout:${ geom_1.vec3Key(chunkDataSize) },${ texelsPerElement }`, () => new TextureLayout(gl, chunkDataSize, texelsPerElement));
        }
    }]);

    return TextureLayout;
}(disposable_1.RefCounted);

;

var ChunkFormat = function (_single_texture_chunk) {
    _inherits(ChunkFormat, _single_texture_chunk);

    function ChunkFormat(gl, dataType, key) {
        _classCallCheck(this, ChunkFormat);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChunkFormat).call(this, key));

        _this2.dataType = dataType;
        switch (dataType) {
            case base_1.DataType.UINT8:
                _this2.texelsPerElement = 1;
                _this2.textureFormat = gl.LUMINANCE;
                _this2.texelType = gl.UNSIGNED_BYTE;
                _this2.arrayElementsPerTexel = 1;
                _this2.arrayConstructor = Uint8Array;
                break;
            case base_1.DataType.UINT64:
                _this2.texelsPerElement = 2;
                _this2.textureFormat = gl.RGBA;
                _this2.texelType = gl.UNSIGNED_BYTE;
                _this2.arrayElementsPerTexel = 4;
                _this2.arrayConstructor = Uint8Array;
                break;
            case base_1.DataType.UINT32:
                _this2.texelsPerElement = 1;
                _this2.textureFormat = gl.RGBA;
                _this2.texelType = gl.UNSIGNED_BYTE;
                _this2.arrayElementsPerTexel = 4;
                _this2.arrayConstructor = Uint8Array;
                break;
            default:
                throw new Error('Unsupported dataType: ' + dataType);
        }
        return _this2;
    }

    _createClass(ChunkFormat, [{
        key: 'defineShader',
        value: function defineShader(builder) {
            _get(Object.getPrototypeOf(ChunkFormat.prototype), 'defineShader', this).call(this, builder);
            builder.addUniform('highp vec3', 'uChunkDataSize');
            // [ 1.0/dataPointsPerTextureWidth, 1.0/numDataPoints ]
            builder.addUniform('highp vec2', 'uUncompressedTextureAccessCoefficients');
            builder.addFragmentCode(`
vec3 getPositionWithinChunk () {
  return floor(min(vChunkPosition * uChunkDataSize, uChunkDataSize - 1.0));
}
vec2 getDataTextureCoords () {
  vec3 chunkDataPosition = getPositionWithinChunk();
  float offset = chunkDataPosition.x + uChunkDataSize.x * (chunkDataPosition.y + uChunkDataSize.y * chunkDataPosition.z);
  return vec2(fract(offset * uUncompressedTextureAccessCoefficients.x),
              offset * uUncompressedTextureAccessCoefficients.y);
}
`);
            switch (this.dataType) {
                case base_1.DataType.UINT8:
                case base_1.DataType.FLOAT32:
                    builder.addFragmentCode(`
float getDataValue () {
  return texture2D(uVolumeChunkSampler, getDataTextureCoords()).x;
}
`);
                    break;
                case base_1.DataType.UINT32:
                    builder.addFragmentCode(shader_lib_1.glsl_uint64);
                    builder.addFragmentCode(`
uint64_t getDataValue () {
  uint64_t value;
  vec2 texCoords = getDataTextureCoords();
  value.low = texture2D(uVolumeChunkSampler, texCoords);
  value.high = vec4(0, 0, 0, 0);
  return value;
}
`);
                    break;
                case base_1.DataType.UINT64:
                    builder.addFragmentCode(shader_lib_1.glsl_uint64);
                    builder.addFragmentCode(`
uint64_t getDataValue () {
  uint64_t value;
  vec2 texCoords = getDataTextureCoords();
  value.low = texture2D(uVolumeChunkSampler, texCoords);
  value.high = texture2D(uVolumeChunkSampler, vec2(texCoords.x + 0.5 * uUncompressedTextureAccessCoefficients.x, texCoords.y));
  return value;
}
`);
                    break;
            }
        }
        /**
         * Called each time textureLayout changes while drawing chunks.
         */

    }, {
        key: 'setupTextureLayout',
        value: function setupTextureLayout(gl, shader, textureLayout) {
            gl.uniform3fv(shader.uniform('uChunkDataSize'), textureLayout.chunkDataSize);
            gl.uniform2fv(shader.uniform('uUncompressedTextureAccessCoefficients'), textureLayout.textureAccessCoefficients);
        }
    }, {
        key: 'getTextureLayout',
        value: function getTextureLayout(gl, chunkDataSize) {
            return TextureLayout.get(gl, chunkDataSize, this.texelsPerElement);
        }
    }], [{
        key: 'get',
        value: function get(gl, dataType) {
            var key = `sliceview.UncompressedChunkFormat:${ dataType }`;
            return gl.memoize.get(key, () => new ChunkFormat(gl, dataType, key));
        }
    }]);

    return ChunkFormat;
}(single_texture_chunk_format_1.SingleTextureChunkFormat);

;

var UncompressedVolumeChunk = function (_single_texture_chunk2) {
    _inherits(UncompressedVolumeChunk, _single_texture_chunk2);

    function UncompressedVolumeChunk() {
        _classCallCheck(this, UncompressedVolumeChunk);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(UncompressedVolumeChunk).apply(this, arguments));
    }

    _createClass(UncompressedVolumeChunk, [{
        key: 'setTextureData',
        value: function setTextureData(gl) {
            var source = this.source;
            var chunkFormatHandler = source.chunkFormatHandler;
            var chunkFormat = chunkFormatHandler.chunkFormat;

            var textureLayout = void 0;
            if (this.chunkDataSize === source.spec.chunkDataSize) {
                this.textureLayout = textureLayout = chunkFormatHandler.textureLayout.addRef();
            } else {
                this.textureLayout = textureLayout = chunkFormat.getTextureLayout(gl, this.chunkDataSize);
            }
            var requiredSize = textureLayout.textureWidth * textureLayout.textureHeight * chunkFormat.arrayElementsPerTexel;
            var arrayConstructor = chunkFormat.arrayConstructor;

            var data = this.data;
            if (data.constructor !== arrayConstructor) {
                data = new arrayConstructor(data.buffer, data.byteOffset, data.byteLength / arrayConstructor.BYTES_PER_ELEMENT);
            }
            var padded = array_1.maybePadArray(data, requiredSize);
            gl.texImage2D(gl.TEXTURE_2D,
            /*level=*/0, chunkFormat.textureFormat,
            /*width=*/textureLayout.textureWidth,
            /*height=*/textureLayout.textureHeight,
            /*border=*/0, chunkFormat.textureFormat, chunkFormat.texelType, padded);
        }
    }, {
        key: 'getValueAt',
        value: function getValueAt(dataPosition) {
            var chunkFormat = this.chunkFormat;

            var chunkDataSize = this.chunkDataSize;
            var index = dataPosition[0] + chunkDataSize[0] * (dataPosition[1] + chunkDataSize[1] * dataPosition[2]);
            var dataType = chunkFormat.dataType;
            var data = this.data;
            switch (dataType) {
                case base_1.DataType.UINT8:
                case base_1.DataType.UINT32:
                    return data[index];
                case base_1.DataType.UINT64:
                    {
                        var index2 = index * 2;
                        return new uint64_1.Uint64(data[index2], data[index2 + 1]);
                    }
            }
            throw new Error('Invalid data type: ' + dataType);
        }
    }]);

    return UncompressedVolumeChunk;
}(single_texture_chunk_format_1.SingleTextureVolumeChunk);

exports.UncompressedVolumeChunk = UncompressedVolumeChunk;
;

var UncompressedChunkFormatHandler = function (_disposable_1$RefCoun2) {
    _inherits(UncompressedChunkFormatHandler, _disposable_1$RefCoun2);

    function UncompressedChunkFormatHandler(gl, spec) {
        _classCallCheck(this, UncompressedChunkFormatHandler);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(UncompressedChunkFormatHandler).call(this));

        _this4.chunkFormat = _this4.registerDisposer(ChunkFormat.get(gl, spec.dataType));
        _this4.textureLayout = _this4.registerDisposer(_this4.chunkFormat.getTextureLayout(gl, spec.chunkDataSize));
        return _this4;
    }

    _createClass(UncompressedChunkFormatHandler, [{
        key: 'getChunk',
        value: function getChunk(source, x) {
            return new UncompressedVolumeChunk(source, x);
        }
    }]);

    return UncompressedChunkFormatHandler;
}(disposable_1.RefCounted);

exports.UncompressedChunkFormatHandler = UncompressedChunkFormatHandler;
;
frontend_1.registerChunkFormatHandler((gl, spec) => {
    if (spec.compressedSegmentationBlockSize == null) {
        return new UncompressedChunkFormatHandler(gl, spec);
    }
    return null;
});

/***/ },
/* 76 */
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

var disposable_1 = __webpack_require__(8);
var texture_1 = __webpack_require__(54);
var frontend_1 = __webpack_require__(34);
var textureUnitSymbol = Symbol('SingleTextureVolumeChunk.textureUnit');
var textureLayoutSymbol = Symbol('SingleTextureVolumeChunk.textureLayout');

var SingleTextureChunkFormat = function (_disposable_1$RefCoun) {
    _inherits(SingleTextureChunkFormat, _disposable_1$RefCoun);

    function SingleTextureChunkFormat(shaderKey) {
        _classCallCheck(this, SingleTextureChunkFormat);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SingleTextureChunkFormat).call(this));

        _this.shaderKey = shaderKey;
        return _this;
    }

    _createClass(SingleTextureChunkFormat, [{
        key: 'defineShader',
        value: function defineShader(builder) {
            builder.addTextureSampler2D('uVolumeChunkSampler', textureUnitSymbol);
        }
        /**
         * Called when starting to draw chunks.
         */

    }, {
        key: 'beginDrawing',
        value: function beginDrawing(gl, shader) {
            var textureUnit = shader.textureUnit(textureUnitSymbol);
            gl.activeTexture(gl.TEXTURE0 + textureUnit);
            shader[textureLayoutSymbol] = null;
        }
        /**
         * Called once after all chunks have been drawn.
         */

    }, {
        key: 'endDrawing',
        value: function endDrawing(gl, shader) {
            gl.bindTexture(gl.TEXTURE_2D, null);
            shader[textureLayoutSymbol] = null;
        }
        /**
         * Called just before drawing each chunk.
         */

    }, {
        key: 'bindChunk',
        value: function bindChunk(gl, shader, chunk) {
            var textureLayout = chunk.textureLayout;

            var existingTextureLayout = shader[textureLayoutSymbol];
            if (existingTextureLayout !== textureLayout) {
                shader[textureLayoutSymbol] = textureLayout;
                this.setupTextureLayout(gl, shader, textureLayout);
            }
            gl.bindTexture(gl.TEXTURE_2D, chunk.texture);
        }
    }]);

    return SingleTextureChunkFormat;
}(disposable_1.RefCounted);

exports.SingleTextureChunkFormat = SingleTextureChunkFormat;
;

var SingleTextureVolumeChunk = function (_frontend_1$VolumeChu) {
    _inherits(SingleTextureVolumeChunk, _frontend_1$VolumeChu);

    function SingleTextureVolumeChunk(source, x) {
        _classCallCheck(this, SingleTextureVolumeChunk);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SingleTextureVolumeChunk).call(this, source, x));

        _this2.texture = null;
        _this2.data = x['data'];
        return _this2;
    }

    _createClass(SingleTextureVolumeChunk, [{
        key: 'copyToGPU',
        value: function copyToGPU(gl) {
            _get(Object.getPrototypeOf(SingleTextureVolumeChunk.prototype), 'copyToGPU', this).call(this, gl);
            var texture = this.texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            texture_1.setRawTextureParameters(gl);
            this.setTextureData(gl);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }, {
        key: 'freeGPUMemory',
        value: function freeGPUMemory(gl) {
            _get(Object.getPrototypeOf(SingleTextureVolumeChunk.prototype), 'freeGPUMemory', this).call(this, gl);
            gl.deleteTexture(this.texture);
            this.texture = null;
            this.textureLayout.dispose();
            this.textureLayout = null;
        }
    }]);

    return SingleTextureVolumeChunk;
}(frontend_1.VolumeChunk);

exports.SingleTextureVolumeChunk = SingleTextureVolumeChunk;
;

/***/ },
/* 77 */
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

var base_1 = __webpack_require__(19);
var geom_1 = __webpack_require__(21);
var disposable_1 = __webpack_require__(8);
var uint64_1 = __webpack_require__(41);
var shader_lib_1 = __webpack_require__(68);
var frontend_1 = __webpack_require__(34);
var array_1 = __webpack_require__(33);
var single_texture_chunk_format_1 = __webpack_require__(76);
var decode_uint64_1 = __webpack_require__(78);
var decode_uint32_1 = __webpack_require__(80);

var TextureLayout = function (_disposable_1$RefCoun) {
    _inherits(TextureLayout, _disposable_1$RefCoun);

    function TextureLayout(gl, chunkDataSize, subchunkSize, dataLength) {
        _classCallCheck(this, TextureLayout);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextureLayout).call(this));

        _this.chunkDataSize = chunkDataSize;
        _this.subchunkSize = subchunkSize;
        var maxTextureSize = gl.maxTextureSize;
        // Use arbitrary layout.

        var dataWidth = Math.ceil(dataLength / maxTextureSize);
        if (dataWidth > maxTextureSize) {
            throw new Error('Chunk data size exceeds maximum texture size: ' + dataLength);
        }
        var dataHeight = Math.ceil(dataLength / dataWidth);
        _this.textureWidth = dataWidth;
        _this.textureHeight = dataHeight;
        _this.textureAccessCoefficients = Float32Array.of(1.0 / dataWidth, 1.0 / (dataWidth * dataHeight));
        var subchunkGridSize = _this.subchunkGridSize = geom_1.vec3.create();
        for (var i = 0; i < 3; ++i) {
            subchunkGridSize[i] = Math.ceil(chunkDataSize[i] / subchunkSize[i]);
        }
        return _this;
    }

    _createClass(TextureLayout, null, [{
        key: 'get',
        value: function get(gl, chunkDataSize, subchunkSize, dataLength) {
            return gl.memoize.get(`sliceview.CompressedSegmentationTextureLayout:${ geom_1.vec3Key(chunkDataSize) },${ geom_1.vec3Key(subchunkSize) },${ dataLength }`, () => new TextureLayout(gl, chunkDataSize, subchunkSize, dataLength));
        }
    }]);

    return TextureLayout;
}(disposable_1.RefCounted);

;

var ChunkFormat = function (_single_texture_chunk) {
    _inherits(ChunkFormat, _single_texture_chunk);

    function ChunkFormat(dataType, subchunkSize, key) {
        _classCallCheck(this, ChunkFormat);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChunkFormat).call(this, key));

        _this2.dataType = dataType;
        _this2.subchunkSize = subchunkSize;
        return _this2;
    }

    _createClass(ChunkFormat, [{
        key: 'defineShader',
        value: function defineShader(builder) {
            _get(Object.getPrototypeOf(ChunkFormat.prototype), 'defineShader', this).call(this, builder);
            var local = x => 'compressedSegmentationChunkFormat_' + x;
            builder.addUniform('highp vec2', 'uCompressedSegmentationTextureAccessCoefficients');
            builder.addUniform('highp vec3', 'uSubchunkGridSize');
            builder.addUniform('highp vec3', 'uChunkDataSize');
            builder.addFragmentCode(shader_lib_1.glsl_getFortranOrderIndexFromNormalized);
            builder.addFragmentCode(shader_lib_1.glsl_uint64);
            // We add 0.5 to avoid being right at a texel boundary.
            var fragmentCode = `
vec4 ${ local('readTextureValue') }(float offset) {
  offset += 0.5;
  return texture2D(uVolumeChunkSampler,
                   vec2(fract(offset * uCompressedSegmentationTextureAccessCoefficients.x),
                        offset * uCompressedSegmentationTextureAccessCoefficients.y));
}
uint64_t getDataValue () {
  const vec3 uSubchunkSize = ${ geom_1.vec3.str(this.subchunkSize) };

  vec3 chunkPosition = getSubscriptsFromNormalized(vChunkPosition, uChunkDataSize);

  // TODO: maybe premultiply this and store as uniform.
  vec3 subchunkGridPosition = floor(chunkPosition / uSubchunkSize);
  float subchunkGridOffset = getFortranOrderIndex(subchunkGridPosition, uSubchunkGridSize);

  // TODO: Maybe just combine this offset into subchunkGridStrides.
  float subchunkHeaderOffset = subchunkGridOffset * 2.0;

  vec4 subchunkHeader0 = ${ local('readTextureValue') }(subchunkHeaderOffset);
  vec4 subchunkHeader1 = ${ local('readTextureValue') }(subchunkHeaderOffset + 1.0);

  float outputValueOffset = dot(subchunkHeader0.xyz, vec3(255, 256 * 255, 256 * 256 * 255));
  float encodingBits = subchunkHeader0[3] * 255.0;
  if (encodingBits > 0.0) {
    vec3 subchunkPosition = floor(min(chunkPosition - subchunkGridPosition * uSubchunkSize, uSubchunkSize - 1.0));
    float subchunkOffset = getFortranOrderIndex(subchunkPosition, uSubchunkSize);
    highp float encodedValueBaseOffset = dot(subchunkHeader1.xyz, vec3(255.0, 256.0 * 255.0, 256.0 * 256.0 * 255.0));
    highp float encodedValueOffset = floor(encodedValueBaseOffset + subchunkOffset * encodingBits / 32.0);
    vec4 encodedValue = ${ local('readTextureValue') }(encodedValueOffset);
    float wordOffset = mod(subchunkOffset * encodingBits, 32.0);
    // If the value is in the first byte, then 0 <= wordOffset < 8.
    // We need to mod by 2**encodedBits
    float wordShifter = pow(2.0, -wordOffset);
    float encodedValueMod = pow(2.0, encodingBits);
    float encodedValueShifted;
    if (wordOffset < 16.0) {
      encodedValueShifted = dot(encodedValue.xy, vec2(255.0, 255.0 * 256.0));
    } else {
      encodedValueShifted = dot(encodedValue.zw, vec2(255.0 * 256.0 * 256.0, 255.0 * 256.0 * 256.0 * 256.0));
    }
    encodedValueShifted = floor(encodedValueShifted * wordShifter);
    float decodedValue = mod(encodedValueShifted, encodedValueMod);
    outputValueOffset += decodedValue * ${ this.dataType === base_1.DataType.UINT64 ? '2.0' : '1.0' };
  }
  uint64_t value;
  value.low = ${ local('readTextureValue') }(outputValueOffset);
`;
            if (this.dataType === base_1.DataType.UINT64) {
                fragmentCode += `
  value.high = ${ local('readTextureValue') }(outputValueOffset+1.0);
`;
            } else {
                fragmentCode += `
  value.high = vec4(0.0, 0.0, 0.0, 0.0);
`;
            }
            fragmentCode += `
  return value;
}
`;
            builder.addFragmentCode(fragmentCode);
        }
        /**
         * Called each time textureLayout changes while drawing chunks.
         */

    }, {
        key: 'setupTextureLayout',
        value: function setupTextureLayout(gl, shader, textureLayout) {
            gl.uniform3fv(shader.uniform('uChunkDataSize'), textureLayout.chunkDataSize);
            gl.uniform3fv(shader.uniform('uSubchunkGridSize'), textureLayout.subchunkGridSize);
            gl.uniform2fv(shader.uniform('uCompressedSegmentationTextureAccessCoefficients'), textureLayout.textureAccessCoefficients);
        }
    }, {
        key: 'getTextureLayout',
        value: function getTextureLayout(gl, chunkDataSize, dataLength) {
            return TextureLayout.get(gl, chunkDataSize, this.subchunkSize, dataLength);
        }
    }], [{
        key: 'get',
        value: function get(gl, dataType, subchunkSize) {
            var key = `sliceview.CompressedSegmentationChunkFormat:${ dataType },${ geom_1.vec3Key(subchunkSize) }`;
            return gl.memoize.get(key, () => new ChunkFormat(dataType, subchunkSize, key));
        }
    }]);

    return ChunkFormat;
}(single_texture_chunk_format_1.SingleTextureChunkFormat);

;

var CompressedSegmentationVolumeChunk = function (_single_texture_chunk2) {
    _inherits(CompressedSegmentationVolumeChunk, _single_texture_chunk2);

    function CompressedSegmentationVolumeChunk() {
        _classCallCheck(this, CompressedSegmentationVolumeChunk);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CompressedSegmentationVolumeChunk).apply(this, arguments));
    }

    _createClass(CompressedSegmentationVolumeChunk, [{
        key: 'setTextureData',
        value: function setTextureData(gl) {
            var data = this.data;
            var chunkFormat = this.chunkFormat;

            var textureLayout = this.textureLayout = chunkFormat.getTextureLayout(gl, this.chunkDataSize, data.length);
            var requiredSize = textureLayout.textureWidth * textureLayout.textureHeight;
            var padded = array_1.maybePadArray(data, requiredSize);
            gl.texImage2D(gl.TEXTURE_2D,
            /*level=*/0, gl.RGBA,
            /*width=*/textureLayout.textureWidth,
            /*height=*/textureLayout.textureHeight,
            /*border=*/0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(padded.buffer, padded.byteOffset, padded.byteLength));
        }
    }, {
        key: 'getValueAt',
        value: function getValueAt(dataPosition) {
            var chunkDataSize = this.chunkDataSize;
            var chunkFormat = this.chunkFormat;

            if (chunkFormat.dataType === base_1.DataType.UINT64) {
                var result = new uint64_1.Uint64();
                return decode_uint64_1.readSingleChannelValue(result, this.data, /*baseOffset=*/0, chunkDataSize, chunkFormat.subchunkSize, dataPosition);
            } else {
                return decode_uint32_1.readSingleChannelValue(this.data, /*baseOffset=*/0, chunkDataSize, chunkFormat.subchunkSize, dataPosition);
            }
        }
    }]);

    return CompressedSegmentationVolumeChunk;
}(single_texture_chunk_format_1.SingleTextureVolumeChunk);

exports.CompressedSegmentationVolumeChunk = CompressedSegmentationVolumeChunk;
;

var CompressedSegmentationChunkFormatHandler = function (_disposable_1$RefCoun2) {
    _inherits(CompressedSegmentationChunkFormatHandler, _disposable_1$RefCoun2);

    function CompressedSegmentationChunkFormatHandler(gl, spec) {
        _classCallCheck(this, CompressedSegmentationChunkFormatHandler);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(CompressedSegmentationChunkFormatHandler).call(this));

        var dataType = spec.dataType;

        if (dataType !== base_1.DataType.UINT64 && dataType !== base_1.DataType.UINT32) {
            throw new Error(`Unsupported compressed segmentation data type: ${ base_1.DataType[dataType] }`);
        }
        _this4.chunkFormat = _this4.registerDisposer(ChunkFormat.get(gl, spec.dataType, spec.compressedSegmentationBlockSize));
        return _this4;
    }

    _createClass(CompressedSegmentationChunkFormatHandler, [{
        key: 'getChunk',
        value: function getChunk(source, x) {
            return new CompressedSegmentationVolumeChunk(source, x);
        }
    }]);

    return CompressedSegmentationChunkFormatHandler;
}(disposable_1.RefCounted);

exports.CompressedSegmentationChunkFormatHandler = CompressedSegmentationChunkFormatHandler;
;
frontend_1.registerChunkFormatHandler((gl, spec) => {
    if (spec.compressedSegmentationBlockSize != null) {
        return new CompressedSegmentationChunkFormatHandler(gl, spec);
    }
    return null;
});

/***/ },
/* 78 */
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
 * Support for decompressing uint64 segment label chunks.
 */

var decode_common_1 = __webpack_require__(79);
/**
 * Reads the single value at the specified dataPosition in a single-channel compressed segmentation.
 *
 * @param baseOffset The base offset into `data' at which the compressed data for this channel starts.
 * @param chunkDataSize A 3-element array specifying the size of the volume,
 * @param blockSize A 3-element array specifying the block size ued for compression.
 * @param dataPosition A 3-element array specifying the position within the volume from which to read.
 *
 * Stores the result in `out'.
 */
function readSingleChannelValue(out, data, baseOffset, chunkDataSize, blockSize, dataPosition) {
    var outputValueOffset = decode_common_1.decodeValueOffset(data, baseOffset, chunkDataSize, blockSize, dataPosition, 2);
    out.low = data[outputValueOffset];
    out.high = data[outputValueOffset + 1];
    return out;
}
exports.readSingleChannelValue = readSingleChannelValue;
/**
 * Reads the single value (of a single channel) at the specified dataPosition in a multi-channel
 * compressed segmentation.
 *
 * @param dataPosition A 4-element [x, y, z, channel] array specifying the position to read.
 */
function readValue(out, data, baseOffset, chunkDataSize, blockSize, dataPosition) {
    return readSingleChannelValue(out, data, baseOffset + data[dataPosition[3]], chunkDataSize, blockSize, dataPosition);
}
exports.readValue = readValue;
/**
 * Decodes a single channel of a compressed segmentation.
 *
 * This is not particularly efficient, because it is intended for testing purposes only.
 */
function decodeChannel(out, data, baseOffset, chunkDataSize, blockSize) {
    var expectedLength = chunkDataSize[0] * chunkDataSize[1] * chunkDataSize[2] * 2;
    if (expectedLength !== out.length) {
        throw new Error(`Output length ${ out.length } is not equal to expected length ${ expectedLength }.`);
    }
    var vx = chunkDataSize[0];
    var vy = chunkDataSize[1];
    var vz = chunkDataSize[2];
    var dataPosition = [0, 0, 0];
    var outputOffset = 0;
    for (var z = 0; z < vz; ++z) {
        dataPosition[2] = z;
        for (var y = 0; y < vy; ++y) {
            dataPosition[1] = y;
            for (var x = 0; x < vx; ++x) {
                dataPosition[0] = x;
                var outputValueOffset = decode_common_1.decodeValueOffset(data, baseOffset, chunkDataSize, blockSize, dataPosition, 2);
                out[outputOffset++] = data[baseOffset + outputValueOffset];
                out[outputOffset++] = data[baseOffset + outputValueOffset + 1];
            }
        }
    }
    return out;
}
exports.decodeChannel = decodeChannel;
/**
 * Decodes a multi-channel compressed segmentation.
 *
 * This is not particularly efficient, because it is intended for testing purposes only.
 */
function decodeChannels(out, data, baseOffset, chunkDataSize, blockSize) {
    var channelOutputLength = chunkDataSize[0] * chunkDataSize[1] * chunkDataSize[2] * 2;
    var expectedLength = channelOutputLength * chunkDataSize[3];
    if (expectedLength !== out.length) {
        throw new Error(`Output length ${ out.length } is not equal to expected length ${ expectedLength }.`);
    }
    var numChannels = chunkDataSize[3];
    for (var channel = 0; channel < numChannels; ++channel) {
        decodeChannel(out.subarray(channelOutputLength * channel, channelOutputLength * (channel + 1)), data, baseOffset + data[channel], chunkDataSize, blockSize);
    }
    return out;
}
exports.decodeChannels = decodeChannels;

/***/ },
/* 79 */
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
 * @file
 * Support for decompressing uint32 and uint64 segment label chunks.
 */
/**
 * Determines the offset of the value at the specified dataPosition in a single-channel compressed
 * segmentation.
 *
 * @param baseOffset The base offset into `data' at which the compressed data for this channel starts.
 * @param chunkDataSize A 3-element array specifying the size of the volume,
 * @param blockSize A 3-element array specifying the block size ued for compression.
 * @param dataPosition A 3-element array specifying the position within the volume from which to read.
 * @returns The offset into `data', relative to baseOffset, at which the value is located.
 */

function decodeValueOffset(data, baseOffset, chunkDataSize, blockSize, dataPosition, uint32sPerElement) {
  var gridOffset = 0,
      subchunkOffset = 0,
      gridStride = 1,
      subchunkStride = 1;
  for (var i = 0; i < 3; ++i) {
    var posValue = dataPosition[i];
    var subchunkSizeValue = blockSize[i];
    var gridSubscript = Math.floor(posValue / subchunkSizeValue);
    var subchunkSubscript = posValue % subchunkSizeValue;
    gridOffset += gridSubscript * gridStride;
    gridStride *= Math.ceil(chunkDataSize[i] / subchunkSizeValue);
    subchunkOffset += subchunkSubscript * subchunkStride;
    subchunkStride *= subchunkSizeValue;
  }
  var subchunkHeaderOffset = baseOffset + gridOffset * 2;
  var subchunkHeader0 = data[subchunkHeaderOffset];
  var subchunkHeader1 = data[subchunkHeaderOffset + 1];
  var outputValueOffset = subchunkHeader0 & 0xFFFFFF;
  var encodingBits = subchunkHeader0 >> 24 & 0xFF;
  if (encodingBits > 0) {
    var encodedValueBaseOffset = baseOffset + subchunkHeader1 & 0xFFFFFF;
    var encodedValueOffset = encodedValueBaseOffset + Math.floor(subchunkOffset * encodingBits / 32.0);
    var encodedValue = data[encodedValueOffset];
    var wordOffset = subchunkOffset * encodingBits % 32;
    var decodedValue = encodedValue >> wordOffset & (1 << encodingBits) - 1;
    outputValueOffset += uint32sPerElement * decodedValue;
  }
  return outputValueOffset;
}
exports.decodeValueOffset = decodeValueOffset;

/***/ },
/* 80 */
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
 * Support for decompressing uint64 segment label chunks.
 */

var decode_common_1 = __webpack_require__(79);
/**
 * Reads the single value at the specified dataPosition in a single-channel compressed segmentation.
 *
 * @param baseOffset The base offset into `data' at which the compressed data for this channel starts.
 * @param chunkDataSize A 3-element array specifying the size of the volume,
 * @param blockSize A 3-element array specifying the block size ued for compression.
 * @param dataPosition A 3-element array specifying the position within the volume from which to read.
 *
 * Stores the result in `out'.
 */
function readSingleChannelValue(data, baseOffset, chunkDataSize, blockSize, dataPosition) {
    var outputValueOffset = decode_common_1.decodeValueOffset(data, baseOffset, chunkDataSize, blockSize, dataPosition, 1);
    return data[outputValueOffset];
}
exports.readSingleChannelValue = readSingleChannelValue;
/**
 * Reads the single value (of a single channel) at the specified dataPosition in a multi-channel
 * compressed segmentation.
 *
 * @param dataPosition A 4-element [x, y, z, channel] array specifying the position to read.
 */
function readValue(data, baseOffset, chunkDataSize, blockSize, dataPosition) {
    return readSingleChannelValue(data, baseOffset + data[dataPosition[3]], chunkDataSize, blockSize, dataPosition);
}
exports.readValue = readValue;
/**
 * Decodes a single channel of a compressed segmentation.
 *
 * This is not particularly efficient, because it is intended for testing purposes only.
 */
function decodeChannel(out, data, baseOffset, chunkDataSize, blockSize) {
    var expectedLength = chunkDataSize[0] * chunkDataSize[1] * chunkDataSize[2] * 1;
    if (expectedLength !== out.length) {
        throw new Error(`Output length ${ out.length } is not equal to expected length ${ expectedLength }.`);
    }
    var vx = chunkDataSize[0];
    var vy = chunkDataSize[1];
    var vz = chunkDataSize[2];
    var dataPosition = [0, 0, 0];
    var outputOffset = 0;
    for (var z = 0; z < vz; ++z) {
        dataPosition[2] = z;
        for (var y = 0; y < vy; ++y) {
            dataPosition[1] = y;
            for (var x = 0; x < vx; ++x) {
                dataPosition[0] = x;
                var outputValueOffset = decode_common_1.decodeValueOffset(data, baseOffset, chunkDataSize, blockSize, dataPosition, 1);
                out[outputOffset++] = data[baseOffset + outputValueOffset];
            }
        }
    }
    return out;
}
exports.decodeChannel = decodeChannel;
/**
 * Decodes a multi-channel compressed segmentation.
 *
 * This is not particularly efficient, because it is intended for testing purposes only.
 */
function decodeChannels(out, data, baseOffset, chunkDataSize, blockSize) {
    var channelOutputLength = chunkDataSize[0] * chunkDataSize[1] * chunkDataSize[2] * 1;
    var expectedLength = channelOutputLength * chunkDataSize[3];
    if (expectedLength !== out.length) {
        throw new Error(`Output length ${ out.length } is not equal to expected length ${ expectedLength }.`);
    }
    var numChannels = chunkDataSize[3];
    for (var channel = 0; channel < numChannels; ++channel) {
        decodeChannel(out.subarray(channelOutputLength * channel, channelOutputLength * (channel + 1)), data, baseOffset + data[channel], chunkDataSize, blockSize);
    }
    return out;
}
exports.decodeChannels = decodeChannels;

/***/ },
/* 81 */
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

var base_1 = __webpack_require__(37);
var frontend_1 = __webpack_require__(51);
var layer_1 = __webpack_require__(40);
var layer_dialog_1 = __webpack_require__(82);
var layer_panel_1 = __webpack_require__(116);
var layer_specification_1 = __webpack_require__(86);
var L = __webpack_require__(120);
var navigation_state_1 = __webpack_require__(121);
var overlay_1 = __webpack_require__(83);
var perspective_panel_1 = __webpack_require__(63);
var position_status_panel_1 = __webpack_require__(122);
var frontend_2 = __webpack_require__(34);
var panel_1 = __webpack_require__(100);
var trackable_boolean_1 = __webpack_require__(71);
var url_hash_state_1 = __webpack_require__(124);
var disposable_1 = __webpack_require__(8);
var geom_1 = __webpack_require__(21);
var keyboard_shortcut_handler_1 = __webpack_require__(84);
var worker_rpc_1 = __webpack_require__(7);
var signals_1 = __webpack_require__(38);
__webpack_require__(125);

var Viewer = function (_disposable_1$RefCoun) {
    _inherits(Viewer, _disposable_1$RefCoun);

    function Viewer(display) {
        _classCallCheck(this, Viewer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Viewer).call(this));

        _this.display = display;
        _this.navigationState = _this.registerDisposer(new navigation_state_1.NavigationState());
        _this.mouseState = new layer_1.MouseSelectionState();
        _this.layerManager = _this.registerDisposer(new layer_1.LayerManager());
        _this.showAxisLines = new trackable_boolean_1.TrackableBoolean(true, true);
        _this.layerSelectedValues = _this.registerDisposer(new layer_1.LayerSelectedValues(_this.layerManager, _this.mouseState));
        _this.worker = new worker_rpc_1.RPC(new Worker('../static/js/neuroglancer/chunk_worker.bundle.js'));
        _this.resetInitiated = new signals_1.Signal();
        _this.chunkQueueManager = new frontend_1.ChunkQueueManager(_this.worker, _this.display.gl, {
            gpuMemory: new base_1.AvailableCapacity(1e6, 1e9),
            systemMemory: new base_1.AvailableCapacity(1e7, 2e9),
            download: new base_1.AvailableCapacity(32, Number.POSITIVE_INFINITY)
        });
        _this.chunkManager = new frontend_1.ChunkManager(_this.chunkQueueManager);
        _this.keyMap = new keyboard_shortcut_handler_1.KeySequenceMap();
        _this.keyCommands = new Map();
        _this.layerSpecification = new layer_specification_1.LayerListSpecification(_this.layerManager, _this.chunkManager, _this.worker, _this.layerSelectedValues, _this.navigationState.voxelSize);
        // Delay hash update after each redraw to try to prevent noticeable lag in Chrome.
        _this.registerSignalBinding(display.updateStarted.add(_this.onUpdateDisplay, _this));
        _this.registerSignalBinding(display.updateFinished.add(_this.onUpdateDisplayFinished, _this));
        // Prevent contextmenu on rightclick, as this inteferes with our use
        // of the right mouse button.
        _this.registerEventListener(document, 'contextmenu', e => {
            e.preventDefault();
            return false;
        });
        url_hash_state_1.registerTrackable('layers', _this.layerSpecification);
        url_hash_state_1.registerTrackable('navigation', _this.navigationState);
        url_hash_state_1.registerTrackable('showAxisLines', _this.showAxisLines);
        _this.registerSignalBinding(_this.navigationState.changed.add(_this.handleNavigationStateChanged, _this));
        _this.layerManager.initializePosition(_this.navigationState.position);
        _this.layerManager.layersChanged.add(() => {
            if (_this.layerManager.managedLayers.length === 0) {
                // No layers, reset state.
                _this.navigationState.voxelSize.reset();
                _this.navigationState.reset();
                _this.resetInitiated.dispatch();
                _this.layerManager.initializePosition(_this.navigationState.position);
                if (!overlay_1.overlaysOpen) {
                    new layer_dialog_1.LayerDialog(_this.layerSpecification);
                }
            }
        });
        _this.registerSignalBinding(_this.chunkQueueManager.visibleChunksChanged.add(() => {
            _this.layerSelectedValues.handleLayerChange();
        }));
        _this.chunkQueueManager.visibleChunksChanged.add(display.scheduleRedraw, display);
        _this.addFourPanelLayout();
        _this.registerDisposer(new keyboard_shortcut_handler_1.GlobalKeyboardShortcutHandler(_this.keyMap, _this.onKeyCommand.bind(_this)));
        var keyCommands = _this.keyCommands;

        keyCommands.set('snap', function () {
            this.navigationState.pose.snap();
        });
        keyCommands.set('add-layer', function () {
            this.layerPanel.addLayerMenu();return true;
        });

        var _loop = function (i) {
            keyCommands.set('toggle-layer-' + i, function () {
                var layerIndex = i - 1;
                var layers = this.layerManager.managedLayers;
                if (layerIndex < layers.length) {
                    var layer = layers[layerIndex];
                    layer.setVisible(!layer.visible);
                }
            });
        };

        for (var i = 1; i <= 9; ++i) {
            _loop(i);
        }

        var _loop2 = function (command) {
            keyCommands.set(command, function () {
                this.layerManager.invokeAction(command);
            });
        };

        for (var command of ['recolor', 'clear-segments']) {
            _loop2(command);
        }
        keyCommands.set('toggle-axis-lines', function () {
            this.showAxisLines.toggle();
        });
        // This needs to happen after the global keyboard shortcut handler for the viewer has been
        // registered, so that it has priority.
        if (_this.layerManager.managedLayers.length === 0) {
            new layer_dialog_1.LayerDialog(_this.layerSpecification);
        }
        return _this;
    }

    _createClass(Viewer, [{
        key: 'onUpdateDisplay',
        value: function onUpdateDisplay() {
            url_hash_state_1.delayHashUpdate();
            this.chunkQueueManager.chunkUpdateDeadline = null;
        }
    }, {
        key: 'onUpdateDisplayFinished',
        value: function onUpdateDisplayFinished() {
            this.mouseState.updateIfStale();
        }
    }, {
        key: 'onKeyCommand',
        value: function onKeyCommand(action) {
            var command = this.keyCommands.get(action);
            if (command && command.call(this)) {
                return true;
            }
            var activePanel = this.display.activePanel;

            if (activePanel) {
                return activePanel.onKeyCommand(action);
            }
            return false;
        }
    }, {
        key: 'makeOrthogonalSliceViews',
        value: function makeOrthogonalSliceViews() {
            var gl = this.gl;
            var layerManager = this.layerManager;

            var sliceViews = new Array();
            var addSliceView = mat => {
                var sliceView = new frontend_2.SliceView(gl, this.chunkManager, layerManager);
                sliceViews.push(sliceView);
                sliceView.fixRelativeTo(this.navigationState, mat);
            };
            addSliceView();
            {
                var mat = geom_1.mat4.create();
                geom_1.mat4.identity(mat);
                geom_1.mat4.rotateX(mat, mat, Math.PI / 2);
                addSliceView(mat);
            }
            {
                var _mat = geom_1.mat4.create();
                geom_1.mat4.identity(_mat);
                geom_1.mat4.rotateY(_mat, _mat, Math.PI / 2);
                addSliceView(_mat);
            }
            return sliceViews;
        }
    }, {
        key: 'addFourPanelLayout',
        value: function addFourPanelLayout() {
            var sliceViews = this.makeOrthogonalSliceViews();
            var display = this.display;

            var perspectiveViewerState = {
                mouseState: this.mouseState,
                layerManager: this.layerManager,
                navigationState: new navigation_state_1.NavigationState(new navigation_state_1.Pose(this.navigationState.position), 1),
                showSliceViews: new trackable_boolean_1.TrackableBoolean(true, true),
                showAxisLines: this.showAxisLines
            };
            this.resetInitiated.add(() => {
                perspectiveViewerState.navigationState.pose.orientation.reset();
                perspectiveViewerState.navigationState.resetZoom();
            });
            url_hash_state_1.registerTrackable('perspectiveOrientation', perspectiveViewerState.navigationState.pose.orientation);
            url_hash_state_1.registerTrackable('perspectiveZoom', new navigation_state_1.TrackableZoomState(perspectiveViewerState.navigationState));
            url_hash_state_1.registerTrackable('showSlices', perspectiveViewerState.showSliceViews);
            this.keyCommands.set('toggle-show-slices', function () {
                perspectiveViewerState.showSliceViews.toggle();
            });
            var gridContainer = document.createElement('div');
            gridContainer.setAttribute('class', 'gllayoutcontainer noselect');
            var container = display.container;

            container.appendChild(gridContainer);
            var mainDisplayContents = [L.withFlex(1, L.box('column', [L.withFlex(1, L.box('row', [L.withFlex(1, element => {
                element.className = 'gllayoutcell noselect';
                display.panels.add(new panel_1.SliceViewPanel(display, element, sliceViews[0], this));
            }), L.withFlex(1, element => {
                element.className = 'gllayoutcell noselect';
                display.panels.add(new panel_1.SliceViewPanel(display, element, sliceViews[1], this));
            })])), L.withFlex(1, L.box('row', [L.withFlex(1, element => {
                element.className = 'gllayoutcell noselect';
                var perspectivePanel = new perspective_panel_1.PerspectivePanel(display, element, perspectiveViewerState);
                for (var sliceView of sliceViews) {
                    perspectivePanel.sliceViews.add(sliceView);
                }
                display.panels.add(perspectivePanel);
            }), L.withFlex(1, element => {
                element.className = 'gllayoutcell noselect';
                display.panels.add(new panel_1.SliceViewPanel(display, element, sliceViews[2], this));
            })]))]))];
            L.box('column', [element => new position_status_panel_1.PositionStatusPanel(element, this), element => {
                this.layerPanel = new layer_panel_1.LayerPanel(element, this.layerSpecification);
            }, L.withFlex(1, L.box('row', mainDisplayContents))])(gridContainer);
            this.display.onResize();
        }
    }, {
        key: 'handleNavigationStateChanged',
        value: function handleNavigationStateChanged() {
            var chunkQueueManager = this.chunkQueueManager;

            if (chunkQueueManager.chunkUpdateDeadline === null) {
                chunkQueueManager.chunkUpdateDeadline = Date.now() + 10;
            }
            this.mouseState.stale = true;
        }
    }, {
        key: 'gl',
        get: function () {
            return this.display.gl;
        }
    }]);

    return Viewer;
}(disposable_1.RefCounted);

exports.Viewer = Viewer;
;

/***/ },
/* 82 */
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

var overlay_1 = __webpack_require__(83);
var factory_1 = __webpack_require__(17);
var layer_specification_1 = __webpack_require__(86);
var base_1 = __webpack_require__(19);
var keyboard_shortcut_handler_1 = __webpack_require__(84);
var promise_1 = __webpack_require__(6);
var autocomplete_1 = __webpack_require__(108);
var associate_label_1 = __webpack_require__(112);
var hidden_submit_button_1 = __webpack_require__(114);
__webpack_require__(115);
var KEY_MAP = new keyboard_shortcut_handler_1.KeySequenceMap();
KEY_MAP.bind('escape', 'close');

var LayerDialog = function (_overlay_1$Overlay) {
    _inherits(LayerDialog, _overlay_1$Overlay);

    function LayerDialog(manager, existingLayer) {
        _classCallCheck(this, LayerDialog);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerDialog).call(this, KEY_MAP));

        _this.manager = manager;
        _this.existingLayer = existingLayer;
        /**
         * Used for displaying status information.
         */
        _this.statusElement = document.createElement('div');
        _this.submitElement = document.createElement('button');
        _this.namePromptElement = document.createElement('label');
        _this.nameInputElement = document.createElement('input');
        _this.sourceValid = false;
        _this.nameValid = true;
        var dialogElement = _this.content;
        dialogElement.classList.add('add-layer-overlay');
        var sourceCompleter = value => promise_1.cancellableThen(factory_1.volumeCompleter(value), originalResult => ({
            completions: originalResult.completions,
            makeElement: autocomplete_1.makeCompletionElementWithDescription,
            offset: originalResult.offset,
            showSingleResult: true
        }));
        var sourceForm = document.createElement('form');
        sourceForm.className = 'source-form';
        _this.registerEventListener(sourceForm, 'submit', event => {
            event.preventDefault();
            _this.validateSource( /*focusName=*/true);
        });
        var sourcePrompt = document.createElement('label');
        sourcePrompt.textContent = 'Source:';
        var sourceInput = _this.sourceInput = _this.registerDisposer(new autocomplete_1.AutocompleteTextInput({ completer: sourceCompleter, delay: 0 }));
        sourceInput.element.classList.add('add-layer-source');
        sourceInput.inputElement.addEventListener('blur', event => {
            _this.validateSource( /*focusName=*/false);
        });
        _this.submitElement.disabled = true;
        sourceInput.inputChanged.add(() => {
            promise_1.cancelPromise(_this.volumePromise);
            _this.volumePromise = undefined;
            _this.sourceValid = false;
            _this.submitElement.disabled = true;
            _this.statusElement.textContent = '';
        });
        sourceForm.appendChild(sourcePrompt);
        sourceForm.appendChild(sourceInput.element);
        associate_label_1.associateLabelWithElement(sourcePrompt, sourceInput.inputElement);
        var hiddenSourceSubmit = hidden_submit_button_1.makeHiddenSubmitButton();
        sourceForm.appendChild(hiddenSourceSubmit);
        dialogElement.appendChild(sourceForm);
        var statusElement = _this.statusElement;
        var namePromptElement = _this.namePromptElement;
        var nameInputElement = _this.nameInputElement;
        var submitElement = _this.submitElement;

        statusElement.className = 'dialog-status';
        var nameForm = document.createElement('form');
        nameForm.className = 'name-form';
        namePromptElement.textContent = 'Name:';
        nameInputElement.className = 'add-layer-name';
        nameInputElement.autocomplete = 'off';
        nameInputElement.spellcheck = false;
        nameInputElement.type = 'text';
        _this.registerEventListener(nameInputElement, 'input', () => {
            _this.validateName();
        });
        submitElement.type = 'submit';
        associate_label_1.associateLabelWithElement(namePromptElement, nameInputElement);
        nameForm.appendChild(namePromptElement);
        nameForm.appendChild(nameInputElement);
        nameForm.appendChild(submitElement);
        dialogElement.appendChild(nameForm);
        dialogElement.appendChild(statusElement);
        if (existingLayer !== undefined) {
            if (existingLayer.sourceUrl !== undefined) {
                sourceInput.value = existingLayer.sourceUrl;
                _this.validateSource();
            } else {
                _this.sourceValid = true;
            }
            sourceInput.disabled = true;
            nameInputElement.value = existingLayer.name;
            _this.validateName();
            submitElement.textContent = 'Save';
            nameInputElement.focus();
        } else {
            var managedLayers = _this.manager.layerManager.managedLayers;

            if (managedLayers.length > 0) {
                var lastLayer = managedLayers[managedLayers.length - 1];
                if (lastLayer instanceof layer_specification_1.ManagedUserLayerWithSpecification) {
                    var sourceUrl = lastLayer.sourceUrl;

                    if (sourceUrl !== undefined) {
                        var groupIndex = factory_1.findSourceGroup(sourceUrl);
                        sourceInput.value = sourceUrl.substring(0, groupIndex);
                        sourceInput.inputElement.setSelectionRange(0, groupIndex);
                    }
                }
            }
            sourceInput.inputElement.focus();
            submitElement.textContent = 'Add Layer';
        }
        _this.registerEventListener(nameForm, 'submit', event => {
            event.preventDefault();
            _this.submit();
        });
        return _this;
    }

    _createClass(LayerDialog, [{
        key: 'isNameValid',
        value: function isNameValid() {
            var name = this.nameInputElement.value;
            if (name === '') {
                return false;
            }
            var otherLayer = this.manager.layerManager.getLayerByName(name);
            return otherLayer === undefined || otherLayer === this.existingLayer;
        }
    }, {
        key: 'submit',
        value: function submit() {
            if (this.sourceValid && this.isNameValid()) {
                if (this.existingLayer) {
                    this.existingLayer.name = this.nameInputElement.value;
                    this.manager.layerManager.layersChanged.dispatch();
                } else {
                    this.manager.layerManager.addManagedLayer(this.manager.getLayer(this.nameInputElement.value, this.sourceInput.value));
                }
                this.dispose();
            }
        }
    }, {
        key: 'validateName',
        value: function validateName() {
            var nameInputElement = this.nameInputElement;

            var nameValid = this.nameValid = this.isNameValid();
            if (nameValid) {
                nameInputElement.classList.add('valid-input');
                nameInputElement.classList.remove('invalid-input');
            } else {
                nameInputElement.classList.remove('valid-input');
                nameInputElement.classList.add('invalid-input');
            }
            this.validityChanged();
        }
    }, {
        key: 'validityChanged',
        value: function validityChanged() {
            this.submitElement.disabled = !(this.nameValid && this.sourceValid);
        }
    }, {
        key: 'validateSource',
        value: function validateSource() {
            var focusName = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            var url = this.sourceInput.value;
            if (url === '') {
                return;
            }
            try {
                var baseSuggestedName = factory_1.suggestLayerName(url);
                var nameInputElement = this.nameInputElement;

                if (this.nameInputElement.value === '') {
                    var suggestedName = baseSuggestedName;
                    var suffix = 0;
                    while (this.manager.layerManager.getLayerByName(suggestedName) !== undefined) {
                        suggestedName = baseSuggestedName + ++suffix;
                    }
                    nameInputElement.value = suggestedName;
                    nameInputElement.setSelectionRange(0, suggestedName.length);
                    this.validateName();
                }
                if (focusName) {
                    nameInputElement.focus();
                }
            } catch (error) {
                this.setError(error.message);
                return;
            }
            this.setInfo('Validating volume source...');
            var volumePromise = new Promise(resolve => {
                resolve(factory_1.getVolume(url));
            });
            this.volumePromise = promise_1.cancellableThen(volumePromise, source => {
                this.sourceValid = true;
                this.setInfo(`${ base_1.VolumeType[source.volumeType].toLowerCase() }: ${ source.numChannels }-channel ${ base_1.DataType[source.dataType].toLowerCase() }`);
                this.validityChanged();
            });
            volumePromise.catch(reason => {
                if (reason === promise_1.CANCELLED) {
                    return;
                }
                this.setError(reason.message);
            });
        }
    }, {
        key: 'setInfo',
        value: function setInfo(message) {
            this.statusElement.className = 'dialog-status dialog-status-info';
            this.statusElement.textContent = message;
        }
    }, {
        key: 'setError',
        value: function setError(message) {
            this.statusElement.className = 'dialog-status dialog-status-error';
            this.statusElement.textContent = message;
        }
    }]);

    return LayerDialog;
}(overlay_1.Overlay);

exports.LayerDialog = LayerDialog;
;

/***/ },
/* 83 */
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

var disposable_1 = __webpack_require__(8);
var keyboard_shortcut_handler_1 = __webpack_require__(84);
__webpack_require__(85);
exports.overlaysOpen = 0;

var Overlay = function (_disposable_1$RefCoun) {
    _inherits(Overlay, _disposable_1$RefCoun);

    function Overlay(keySequenceMap) {
        _classCallCheck(this, Overlay);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Overlay).call(this));

        _this.keySequenceMap = keySequenceMap;
        ++exports.overlaysOpen;
        var container = _this.container = document.createElement('div');
        container.className = 'overlay';
        var content = _this.content = document.createElement('div');
        content.className = 'overlay-content';
        container.appendChild(content);
        document.body.appendChild(container);
        _this.keyboardShortcutHandler = _this.registerDisposer(new keyboard_shortcut_handler_1.GlobalKeyboardShortcutHandler(keySequenceMap, _this.commandReceived.bind(_this)));
        return _this;
    }

    _createClass(Overlay, [{
        key: 'commandReceived',
        value: function commandReceived(action) {
            if (action === 'close') {
                this.dispose();
            }
            return false;
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            --exports.overlaysOpen;
            document.body.removeChild(this.container);
        }
    }]);

    return Overlay;
}(disposable_1.RefCounted);

exports.Overlay = Overlay;
;

/***/ },
/* 84 */
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
// This is based on goog/ui/keyboardshortcuthandler.js in the Google Closure library.

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var disposable_1 = __webpack_require__(8);
var MAX_KEY_SEQUENCE_DELAY = 1500; // 1.5 sec
var globalKeys = new Set(['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'escape', 'pause']);
var DEFAULT_TEXT_INPUTS = new Set(['color', 'date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week']);

var KeyboardShortcutHandler = function (_disposable_1$RefCoun) {
    _inherits(KeyboardShortcutHandler, _disposable_1$RefCoun);

    function KeyboardShortcutHandler(target, keySequenceMap, handler) {
        _classCallCheck(this, KeyboardShortcutHandler);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(KeyboardShortcutHandler).call(this));

        _this.target = target;
        _this.keySequenceMap = keySequenceMap;
        _this.handler = handler;
        _this.modifierShortcutsAreGlobal = true;
        _this.allShortcutsAreGlobal = false;
        _this.allowSpaceKeyOnButtons = false;
        _this.reset();
        _this.registerEventListener(target, 'keydown', _this.handleKeyDown.bind(_this), /*useCapture=*/true);
        return _this;
    }

    _createClass(KeyboardShortcutHandler, [{
        key: 'reset',
        value: function reset() {
            this.currentNode = this.keySequenceMap.root;
            this.lastStrokeTime = Number.NEGATIVE_INFINITY;
        }
    }, {
        key: 'setKeySequenceMap',
        value: function setKeySequenceMap(keySequenceMap) {
            this.keySequenceMap = keySequenceMap;
            this.reset();
        }
    }, {
        key: 'shouldIgnoreEvent',
        value: function shouldIgnoreEvent(key, event) {
            var el = event.target;
            var tagName = el.tagName;

            if (el === this.target) {
                // If the event is directly on the target element, we never ignore it.
                return false;
            }
            var isFormElement = tagName === 'TEXTAREA' || tagName === 'INPUT' || tagName === 'BUTTON' || tagName === 'SELECT';
            var isContentEditable = !isFormElement && (el.isContentEditable || el.ownerDocument && el.ownerDocument.designMode === 'on');
            if (!isFormElement && !isContentEditable) {
                return false;
            }
            // Always allow keys registered as global to be used (typically Esc, the
            // F-keys and other keys that are not typically used to manipulate text).
            if (this.allShortcutsAreGlobal || globalKeys.has(key)) {
                return false;
            }
            if (isContentEditable) {
                // For events originating from an element in editing mode we only let
                // global key codes through.
                return true;
            }
            // Event target is one of (TEXTAREA, INPUT, BUTTON, SELECT).
            // Allow modifier shortcuts, unless we shouldn't.
            if (this.modifierShortcutsAreGlobal && (event.altKey || event.ctrlKey || event.metaKey)) {
                return true;
            }
            // Allow ENTER to be used as shortcut for text inputs.
            if (tagName === 'INPUT' && DEFAULT_TEXT_INPUTS.has(el.type)) {
                return key !== 'enter';
            }
            // Checkboxes, radiobuttons and buttons. Allow all but SPACE as shortcut.
            if (tagName === 'INPUT' || tagName === 'BUTTON') {
                // TODO(gboyer): If more flexibility is needed, create protected helper
                // methods for each case (e.g. button, input, etc).
                if (this.allowSpaceKeyOnButtons) {
                    return false;
                } else {
                    return key === 'space';
                }
            }
            // Don't allow any additional shortcut keys for textareas or selects.
            return true;
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(event) {
            var key = getEventKeyName(event);
            if (this.shouldIgnoreEvent(key, event)) {
                return;
            }
            var stroke = getStrokeIdentifier(key, getEventModifierMask(event));
            var root = this.keySequenceMap.root;
            var currentNode = this.currentNode;

            var value = currentNode.get(stroke);
            var now = Date.now();
            if (currentNode !== root && (value === undefined || now > this.lastStrokeTime + MAX_KEY_SEQUENCE_DELAY)) {
                this.currentNode = root;
                value = currentNode.get(stroke);
            }
            if (value === undefined) {
                return;
            }
            if (typeof value === 'string') {
                // Terminal node.
                this.reset();
                if (this.handler(value)) {
                    event.preventDefault();
                }
            } else {
                this.currentNode = value;
                this.lastStrokeTime = now;
                event.preventDefault();
            }
        }
    }]);

    return KeyboardShortcutHandler;
}(disposable_1.RefCounted);

exports.KeyboardShortcutHandler = KeyboardShortcutHandler;
;
function getEventStrokeIdentifier(event) {
    return getStrokeIdentifier(getEventKeyName(event), getEventModifierMask(event));
}
exports.getEventStrokeIdentifier = getEventStrokeIdentifier;
var Modifiers;
(function (Modifiers) {
    Modifiers[Modifiers["CONTROL"] = 1] = "CONTROL";
    Modifiers[Modifiers["ALT"] = 2] = "ALT";
    Modifiers[Modifiers["META"] = 4] = "META";
    Modifiers[Modifiers["SHIFT"] = 8] = "SHIFT";
})(Modifiers || (Modifiers = {}));
;
function getEventModifierMask(event) {
    return (event.ctrlKey ? 1 /* CONTROL */ : 0) | (event.altKey ? 2 /* ALT */ : 0) | (event.metaKey ? 4 /* META */ : 0) | (event.shiftKey ? 8 /* SHIFT */ : 0);
}
exports.getEventModifierMask = getEventModifierMask;
function getStrokeIdentifier(keyName, modifiers) {
    var identifier = '';
    if (modifiers & 1 /* CONTROL */) {
            identifier += 'control+';
        }
    if (modifiers & 2 /* ALT */) {
            identifier += 'alt+';
        }
    if (modifiers & 4 /* META */) {
            identifier += 'meta+';
        }
    if (modifiers & 8 /* SHIFT */) {
            identifier += 'shift+';
        }
    identifier += keyName;
    return identifier;
}
exports.getStrokeIdentifier = getStrokeIdentifier;
function getEventKeyName(event) {
    return event.code.toLowerCase();
}
exports.getEventKeyName = getEventKeyName;
function parseKeyStroke(strokeIdentifier) {
    strokeIdentifier = strokeIdentifier.toLowerCase().replace(' ', '');
    var parts = strokeIdentifier.split('+');
    var keyName = undefined;
    var modifiers = 0;
    for (var part of parts) {
        switch (part) {
            case 'control':
                modifiers |= 1 /* CONTROL */;
                break;
            case 'alt':
                modifiers |= 2 /* ALT */;
                break;
            case 'meta':
                modifiers |= 4 /* META */;
                break;
            case 'shift':
                modifiers |= 8 /* SHIFT */;
                break;
            default:
                if (keyName === undefined) {
                    keyName = part;
                } else {
                    keyName = null;
                }
        }
    }
    if (keyName == null) {
        throw new Error(`Invalid stroke ${ JSON.stringify(strokeIdentifier) }`);
    }
    return getStrokeIdentifier(keyName, modifiers);
}
exports.parseKeyStroke = parseKeyStroke;
function parseKeySequence(sequence) {
    if (typeof sequence === 'string') {
        var s = sequence;
        s = s.replace(/[ +]*\+[ +]*/g, '+').replace(/[ ]+/g, ' ').toLowerCase();
        sequence = s.split(' ');
    }
    var parts = sequence.map(parseKeyStroke);
    if (parts.length === 0) {
        throw new Error('Key sequence must not be empty');
    }
    return parts;
}
exports.parseKeySequence = parseKeySequence;
function formatKeySequence(sequence) {
    return JSON.stringify(sequence.join(' '));
}
exports.formatKeySequence = formatKeySequence;

var KeySequenceMap = function () {
    function KeySequenceMap() {
        var bindings = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        _classCallCheck(this, KeySequenceMap);

        this.root = new Map();
        if (bindings != null) {
            this.bindMultiple(bindings);
        }
    }

    _createClass(KeySequenceMap, [{
        key: 'bind',
        value: function bind(keySequenceSpec, action) {
            var keySequence = parseKeySequence(keySequenceSpec);
            var currentNode = this.root;
            var prefixEnd = keySequence.length - 1;
            for (var i = 0; i < prefixEnd; ++i) {
                var _stroke = keySequence[i];
                var value = currentNode.get(_stroke);
                if (value === undefined) {
                    value = new Map();
                    currentNode.set(_stroke, value);
                }
                if (typeof value === 'string') {
                    throw new Error(`Error binding key sequence ${ formatKeySequence(keySequence) }: prefix ${ formatKeySequence(keySequence.slice(0, i + 1)) } is already bound to action ${ JSON.stringify(value) }`);
                }
                currentNode = value;
            }
            var stroke = keySequence[prefixEnd];
            var existingValue = currentNode.get(stroke);
            if (existingValue !== undefined) {
                throw new Error(`Key sequence ${ formatKeySequence(keySequence) } is already bound to action ${ JSON.stringify(existingValue) }`);
            }
            currentNode.set(stroke, action);
        }
    }, {
        key: 'bindMultiple',
        value: function bindMultiple(bindings) {
            for (var key of Object.keys(bindings)) {
                this.bind(key, bindings[key]);
            }
        }
    }]);

    return KeySequenceMap;
}();

exports.KeySequenceMap = KeySequenceMap;
;
var globalKeyboardHandler = void 0;
var globalKeyboardHandlerStack = new Array();
var globalKeyboardState = void 0;
function pushGlobalKeyboardHandler(keySequenceMap, handler, identifier) {
    if (globalKeyboardHandler === undefined) {
        globalKeyboardHandler = new KeyboardShortcutHandler(window, new KeySequenceMap(), () => {
            return false;
        });
    }
    globalKeyboardHandlerStack.push([globalKeyboardHandler.keySequenceMap, globalKeyboardHandler.handler, globalKeyboardState]);
    globalKeyboardHandler.setKeySequenceMap(keySequenceMap);
    globalKeyboardHandler.handler = handler;
    globalKeyboardState = identifier;
}
exports.pushGlobalKeyboardHandler = pushGlobalKeyboardHandler;
function popGlobalKeyboardHandler() {
    var _globalKeyboardHandle = globalKeyboardHandlerStack.pop();

    var _globalKeyboardHandle2 = _slicedToArray(_globalKeyboardHandle, 3);

    var keySequenceMap = _globalKeyboardHandle2[0];
    var handler = _globalKeyboardHandle2[1];
    var identifier = _globalKeyboardHandle2[2];

    globalKeyboardHandler.setKeySequenceMap(keySequenceMap);
    globalKeyboardHandler.handler = handler;
    globalKeyboardState = identifier;
}
exports.popGlobalKeyboardHandler = popGlobalKeyboardHandler;

var GlobalKeyboardShortcutHandler = function (_disposable_1$RefCoun2) {
    _inherits(GlobalKeyboardShortcutHandler, _disposable_1$RefCoun2);

    function GlobalKeyboardShortcutHandler(keySequenceMap, handler) {
        _classCallCheck(this, GlobalKeyboardShortcutHandler);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(GlobalKeyboardShortcutHandler).call(this));

        _this2.keySequenceMap = keySequenceMap;
        _this2.handler = handler;
        pushGlobalKeyboardHandler(keySequenceMap, handler, _this2);
        return _this2;
    }

    _createClass(GlobalKeyboardShortcutHandler, [{
        key: 'disposed',
        value: function disposed() {
            if (globalKeyboardState === this) {
                popGlobalKeyboardHandler();
            } else {
                var index = globalKeyboardHandlerStack.findIndex(stackEntry => stackEntry[2] === this);
                globalKeyboardHandlerStack.splice(index, 1);
            }
        }
    }]);

    return GlobalKeyboardShortcutHandler;
}(disposable_1.RefCounted);

exports.GlobalKeyboardShortcutHandler = GlobalKeyboardShortcutHandler;

/***/ },
/* 85 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 86 */
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

var base_1 = __webpack_require__(19);
var signals_1 = __webpack_require__(38);
var layer_1 = __webpack_require__(40);
var factory_1 = __webpack_require__(17);
var disposable_1 = __webpack_require__(8);
var segmentation_user_layer_1 = __webpack_require__(87);
var image_user_layer_1 = __webpack_require__(106);
var status_1 = __webpack_require__(4);
var json_1 = __webpack_require__(11);
function getVolumeWithStatusMessage(x) {
    return status_1.StatusMessage.forPromise(new Promise(function (resolve) {
        resolve(factory_1.getVolume(x));
    }), {
        initialMessage: `Retrieving metadata for volume ${ x }.`,
        delay: true,
        errorPrefix: `Error retrieving metadata for volume ${ x }: `
    });
}
exports.getVolumeWithStatusMessage = getVolumeWithStatusMessage;

var ManagedUserLayerWithSpecification = function (_layer_1$ManagedUserL) {
    _inherits(ManagedUserLayerWithSpecification, _layer_1$ManagedUserL);

    function ManagedUserLayerWithSpecification(name, initialSpecification, manager) {
        _classCallCheck(this, ManagedUserLayerWithSpecification);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ManagedUserLayerWithSpecification).call(this, name));

        _this.initialSpecification = initialSpecification;
        _this.manager = manager;
        return _this;
    }

    _createClass(ManagedUserLayerWithSpecification, [{
        key: 'toJSON',
        value: function toJSON() {
            var userLayer = this.layer;
            if (!userLayer) {
                return this.initialSpecification;
            }
            var layerSpec = userLayer.toJSON();
            if (!this.visible) {
                layerSpec['visible'] = false;
            }
            return layerSpec;
        }
    }]);

    return ManagedUserLayerWithSpecification;
}(layer_1.ManagedUserLayer);

exports.ManagedUserLayerWithSpecification = ManagedUserLayerWithSpecification;
;

var LayerListSpecification = function (_disposable_1$RefCoun) {
    _inherits(LayerListSpecification, _disposable_1$RefCoun);

    function LayerListSpecification(layerManager, chunkManager, worker, layerSelectedValues, voxelSize) {
        _classCallCheck(this, LayerListSpecification);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerListSpecification).call(this));

        _this2.layerManager = layerManager;
        _this2.chunkManager = chunkManager;
        _this2.worker = worker;
        _this2.layerSelectedValues = layerSelectedValues;
        _this2.voxelSize = voxelSize;
        _this2.changed = new signals_1.Signal();
        _this2.registerSignalBinding(layerManager.layersChanged.add(_this2.changed.dispatch, _this2.changed));
        _this2.registerSignalBinding(layerManager.specificationChanged.add(_this2.changed.dispatch, _this2.changed));
        return _this2;
    }

    _createClass(LayerListSpecification, [{
        key: 'restoreState',
        value: function restoreState(x) {
            json_1.verifyObject(x);
            this.layerManager.clear();
            for (var key of Object.keys(x)) {
                this.layerManager.addManagedLayer(this.getLayer(key, x[key]));
            }
        }
    }, {
        key: 'getLayer',
        value: function getLayer(name, spec) {
            var managedLayer = new ManagedUserLayerWithSpecification(name, spec, this);
            if (typeof spec === 'string') {
                spec = { 'source': spec };
            }
            json_1.verifyObject(spec);
            var layerType = json_1.verifyObjectProperty(spec, 'type', json_1.verifyOptionalString);
            managedLayer.visible = json_1.verifyObjectProperty(spec, 'visible', x => {
                if (x === undefined || x === true) {
                    return true;
                }
                if (x === false) {
                    return false;
                }
                throw new Error(`Expected boolean, but received: ${ JSON.stringify(x) }.`);
            });
            var sourceUrl = managedLayer.sourceUrl = json_1.verifyObjectProperty(spec, 'source', json_1.verifyOptionalString);
            if (layerType === undefined) {
                if (sourceUrl === undefined) {
                    throw new Error(`Either layer 'type' or 'source' URL must be specified.`);
                }
                var volumeSourcePromise = getVolumeWithStatusMessage(sourceUrl);
                volumeSourcePromise.then(source => {
                    if (this.layerManager.managedLayers.indexOf(managedLayer) === -1) {
                        // Layer was removed before promise became ready.
                        return;
                    }
                    switch (source.volumeType) {
                        case base_1.VolumeType.IMAGE:
                            {
                                var userLayer = new image_user_layer_1.ImageUserLayer(this, spec);
                                managedLayer.layer = userLayer;
                            }
                            break;
                        case base_1.VolumeType.SEGMENTATION:
                            {
                                var _userLayer = new segmentation_user_layer_1.SegmentationUserLayer(this, spec);
                                managedLayer.layer = _userLayer;
                            }
                            break;
                        default:
                            throw new Error('Unsupported source type.');
                    }
                });
            } else {
                if (layerType === 'image') {
                    managedLayer.layer = new image_user_layer_1.ImageUserLayer(this, spec);
                } else if (layerType === 'segmentation') {
                    managedLayer.layer = new segmentation_user_layer_1.SegmentationUserLayer(this, spec);
                } else {
                    throw new Error('Layer type not specified.');
                }
            }
            return managedLayer;
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            var result = {};
            var numResults = 0;
            for (var managedLayer of this.layerManager.managedLayers) {
                result[managedLayer.name] = managedLayer.toJSON();
                ++numResults;
            }
            if (numResults === 0) {
                return undefined;
            }
            return result;
        }
    }]);

    return LayerListSpecification;
}(disposable_1.RefCounted);

exports.LayerListSpecification = LayerListSpecification;
;

/***/ },
/* 87 */
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

var layer_1 = __webpack_require__(40);
var segment_color_1 = __webpack_require__(88);
var segment_set_widget_1 = __webpack_require__(93);
var segmentation_display_state_1 = __webpack_require__(95);
var uint64_set_1 = __webpack_require__(96);
var uint64_1 = __webpack_require__(41);
var segmentation_renderlayer_1 = __webpack_require__(97);
var factory_1 = __webpack_require__(17);
var frontend_1 = __webpack_require__(62);
var frontend_2 = __webpack_require__(99);
var disposable_1 = __webpack_require__(8);
var uint64_entry_widget_1 = __webpack_require__(101);
var layer_specification_1 = __webpack_require__(86);
var range_1 = __webpack_require__(103);
var json_1 = __webpack_require__(11);
__webpack_require__(105);

var SegmentationUserLayer = function (_layer_1$UserLayer) {
    _inherits(SegmentationUserLayer, _layer_1$UserLayer);

    function SegmentationUserLayer(manager, x) {
        _classCallCheck(this, SegmentationUserLayer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SegmentationUserLayer).call(this, []));

        _this.manager = manager;
        _this.segmentColorHash = segment_color_1.SegmentColorHash.getDefault();
        _this.segmentSelectionState = new segmentation_display_state_1.SegmentSelectionState();
        _this.selectedAlpha = segmentation_renderlayer_1.trackableAlphaValue(0.5);
        _this.notSelectedAlpha = segmentation_renderlayer_1.trackableAlphaValue(0);
        _this.wasDisposed = false;
        _this.visibleSegments = uint64_set_1.Uint64Set.makeWithCounterpart(manager.worker);
        _this.visibleSegments.changed.add(() => {
            _this.specificationChanged.dispatch();
        });
        _this.segmentSelectionState.bindTo(manager.layerSelectedValues, _this);
        _this.selectedAlpha.changed.add(() => {
            _this.specificationChanged.dispatch();
        });
        _this.notSelectedAlpha.changed.add(() => {
            _this.specificationChanged.dispatch();
        });
        _this.selectedAlpha.restoreState(x['selectedAlpha']);
        _this.notSelectedAlpha.restoreState(x['notSelectedAlpha']);
        var volumePath = _this.volumePath = json_1.verifyOptionalString(x['source']);
        var meshPath = _this.meshPath = json_1.verifyOptionalString(x['mesh']);
        var skeletonsPath = _this.skeletonsPath = json_1.verifyOptionalString(x['skeletons']);
        if (volumePath !== undefined) {
            var volumePromise = layer_specification_1.getVolumeWithStatusMessage(volumePath);
            volumePromise.then(volume => {
                if (!_this.wasDisposed) {
                    if (!_this.meshLayer) {
                        var meshSource = volume.getMeshSource(_this.manager.chunkManager);
                        if (meshSource != null) {
                            _this.addMesh(meshSource);
                        }
                    }
                }
            });
            _this.addRenderLayer(new segmentation_renderlayer_1.SegmentationRenderLayer(manager.chunkManager, volumePromise, _this, _this.selectedAlpha, _this.notSelectedAlpha));
        }
        if (meshPath !== undefined) {
            var meshLod = x['meshLod'];
            if (typeof meshLod !== 'number') {
                meshLod = undefined;
            }
            _this.meshLod = meshLod;
            _this.addMesh(factory_1.getMeshSource(manager.chunkManager, meshPath, meshLod));
        }
        if (skeletonsPath !== undefined) {
            var base = new frontend_2.SkeletonLayer(manager.chunkManager, factory_1.getSkeletonSource(manager.chunkManager, skeletonsPath), manager.voxelSize, _this);
            _this.addRenderLayer(new frontend_2.PerspectiveViewSkeletonLayer(base));
            _this.addRenderLayer(new frontend_2.SliceViewPanelSkeletonLayer(base));
        }
        json_1.verifyObjectProperty(x, 'segments', y => {
            if (y !== undefined) {
                (function () {
                    var visibleSegments = _this.visibleSegments;

                    json_1.parseArray(y, value => {
                        var id = uint64_1.Uint64.parseString(String(value), 10);
                        visibleSegments.add(id);
                    });
                })();
            }
        });
        return _this;
    }

    _createClass(SegmentationUserLayer, [{
        key: 'disposed',
        value: function disposed() {
            _get(Object.getPrototypeOf(SegmentationUserLayer.prototype), 'disposed', this).call(this);
            this.wasDisposed = true;
        }
    }, {
        key: 'addMesh',
        value: function addMesh(meshSource) {
            this.meshLayer = new frontend_1.MeshLayer(this.manager.chunkManager, meshSource, this);
            this.addRenderLayer(this.meshLayer);
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            var x = { 'type': 'segmentation' };
            x['source'] = this.volumePath;
            x['mesh'] = this.meshPath;
            x['meshLod'] = this.meshLod;
            x['skeletons'] = this.skeletonsPath;
            x['selectedAlpha'] = this.selectedAlpha.toJSON();
            x['notSelectedAlpha'] = this.notSelectedAlpha.toJSON();
            var visibleSegments = this.visibleSegments;

            if (visibleSegments.size > 0) {
                var segments = x['segments'] = new Array();
                for (var id of visibleSegments) {
                    segments.push(id.toString());
                }
            }
            return x;
        }
    }, {
        key: 'makeDropdown',
        value: function makeDropdown(element) {
            return new SegmentationDropdown(element, this);
        }
    }, {
        key: 'handleAction',
        value: function handleAction(action) {
            switch (action) {
                case 'recolor':
                    {
                        this.segmentColorHash.randomize();
                        break;
                    }
                case 'clear-segments':
                    {
                        this.visibleSegments.clear();
                        break;
                    }
                case 'select':
                    {
                        var segmentSelectionState = this.segmentSelectionState;

                        if (segmentSelectionState.hasSelectedSegment) {
                            var segment = segmentSelectionState.selectedSegment;
                            var visibleSegments = this.visibleSegments;

                            if (visibleSegments.has(segment)) {
                                visibleSegments.delete(segment);
                            } else {
                                visibleSegments.add(segment);
                            }
                        }
                        break;
                    }
            }
        }
    }]);

    return SegmentationUserLayer;
}(layer_1.UserLayer);

exports.SegmentationUserLayer = SegmentationUserLayer;
;

var SegmentationDropdown = function (_disposable_1$RefCoun) {
    _inherits(SegmentationDropdown, _disposable_1$RefCoun);

    function SegmentationDropdown(element, layer) {
        _classCallCheck(this, SegmentationDropdown);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SegmentationDropdown).call(this));

        _this2.element = element;
        _this2.layer = layer;
        _this2.visibleSegmentWidget = _this2.registerDisposer(new segment_set_widget_1.SegmentSetWidget(_this2.layer));
        _this2.addSegmentWidget = _this2.registerDisposer(new uint64_entry_widget_1.Uint64EntryWidget());
        _this2.selectedAlphaWidget = _this2.registerDisposer(new range_1.RangeWidget(_this2.layer.selectedAlpha));
        _this2.notSelectedAlphaWidget = _this2.registerDisposer(new range_1.RangeWidget(_this2.layer.notSelectedAlpha));
        element.classList.add('segmentation-dropdown');
        var selectedAlphaWidget = _this2.selectedAlphaWidget;
        var notSelectedAlphaWidget = _this2.notSelectedAlphaWidget;

        selectedAlphaWidget.promptElement.textContent = 'Opacity (on)';
        selectedAlphaWidget.inputElement.min = '0';
        selectedAlphaWidget.inputElement.max = '1';
        notSelectedAlphaWidget.promptElement.textContent = 'Opacity (off)';
        element.appendChild(_this2.selectedAlphaWidget.element);
        element.appendChild(_this2.notSelectedAlphaWidget.element);
        _this2.addSegmentWidget.element.classList.add('add-segment');
        _this2.addSegmentWidget.element.title = 'Add segment ID';
        element.appendChild(_this2.registerDisposer(_this2.addSegmentWidget).element);
        _this2.registerSignalBinding(_this2.addSegmentWidget.valueEntered.add(value => {
            _this2.layer.visibleSegments.add(value);
        }));
        element.appendChild(_this2.registerDisposer(_this2.visibleSegmentWidget).element);
        return _this2;
    }

    return SegmentationDropdown;
}(disposable_1.RefCounted);

;

/***/ },
/* 88 */
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

var hash_function_1 = __webpack_require__(89);
var shader_lib_1 = __webpack_require__(68);
var shader_1 = __webpack_require__(90);
var signals_1 = __webpack_require__(38);
var colorspace_1 = __webpack_require__(92);
var NUM_COMPONENTS = 2;

var SegmentColorShaderManager = function () {
    function SegmentColorShaderManager(prefix) {
        _classCallCheck(this, SegmentColorShaderManager);

        this.prefix = prefix;
        this.aName = this.prefix + '_a';
        this.bName = this.prefix + '_b';
    }

    _createClass(SegmentColorShaderManager, [{
        key: 'defineShader',
        value: function defineShader(builder) {
            var aName = this.aName;
            var bName = this.bName;

            builder.addUniform('highp vec4', aName, 2 * NUM_COMPONENTS);
            builder.addUniform('highp float', bName, 2 * NUM_COMPONENTS);
            builder.addFragmentCode(shader_lib_1.glsl_uint64);
            builder.addFragmentCode(shader_1.glsl_hashFunction);
            builder.addFragmentCode(shader_lib_1.glsl_hsvToRgb);
            var s = `
vec3 ${ this.prefix }(uint64_t x) {
  vec${ NUM_COMPONENTS } v;
  float primeModulus = float(${ hash_function_1.PRIME_MODULUS });
`;
            for (var i = 0; i < NUM_COMPONENTS; ++i) {
                var bIndex = 2 * i;
                var aIndex = 2 * i;
                s += `
  v[${ i }] = computeHash(x, ${ aName }[${ aIndex }], ${ aName }[${ aIndex + 1 }], ${ bName }[${ bIndex }], ${ bName }[${ bIndex + 1 }], primeModulus, 1.0 / 256.0);
`;
            }
            s += `
  vec3 hsv = vec3(v.x, 0.5 + v.y * 0.5, 1.0);
  return hsvToRgb(hsv);
}
`;
            builder.addFragmentCode(s);
        }
    }, {
        key: 'enable',
        value: function enable(gl, shader, segmentColorHash) {
            gl.uniform4fv(shader.uniform(this.aName), segmentColorHash.a_);
            gl.uniform1fv(shader.uniform(this.bName), segmentColorHash.b_);
        }
    }]);

    return SegmentColorShaderManager;
}();

exports.SegmentColorShaderManager = SegmentColorShaderManager;
;
function fract(x) {
    return x - Math.floor(x);
}
var tempOutput = new Float32Array(NUM_COMPONENTS);
var tempColor = new Float32Array(3);

var SegmentColorHash = function () {
    function SegmentColorHash(hashFunctions) {
        _classCallCheck(this, SegmentColorHash);

        this.a_ = new Float32Array(4 * 2 * NUM_COMPONENTS);
        this.b_ = new Float32Array(2 * NUM_COMPONENTS);
        this.changed = new signals_1.Signal();
        if (hashFunctions == null) {
            this.hashFunctions = new Array(NUM_COMPONENTS);
            this.randomize_();
        } else {
            this.hashFunctions = hashFunctions;
        }
        this.computeGPUCoefficients_();
    }

    _createClass(SegmentColorHash, [{
        key: 'compute',
        value: function compute(out, x) {
            var low = x.low;
            var high = x.high;
            var hashFunctions = this.hashFunctions;

            for (var i = 0; i < 2; ++i) {
                tempOutput[i] = fract(hashFunctions[i].compute(low, high) / 256.0);
            }
            colorspace_1.hsvToRgb(out, tempOutput[0], 0.5 + 0.5 * tempOutput[1], 1.0);
            return out;
        }
    }, {
        key: 'computeCssColor',
        value: function computeCssColor(x) {
            this.compute(tempColor, x);
            return `rgb(${ tempColor[0] * 100 }%,${ tempColor[1] * 100 }%,${ tempColor[2] * 100 }%)`;
        }
    }, {
        key: 'debugCompute',
        value: function debugCompute(out, x) {
            function mod(a, b) {
                return a % b;
            }
            var low = x.low;
            var high = x.high;

            var b = this.b_;
            var modulus = hash_function_1.PRIME_MODULUS;
            for (var i = 0; i < 2; ++i) {
                var bIndex = 2 * i;
                var aIndex = 2 * i;
                var sums = new Float32Array(2);
                for (var j = 0; j < 4; ++j) {
                    sums[0] += this.a_[aIndex * 4 + j] * (low >> j * 8 & 0xFF);
                    sums[1] += this.a_[(aIndex + 1) * 4 + j] * (high >> j * 8 & 0xFF);
                }
                var dotResult = mod(sums[0] + sums[1], modulus);
                var dotResult2 = mod(dotResult * dotResult, modulus);
                var y = mod(dotResult2 * b[bIndex + 1], modulus);
                var modResult = mod(b[bIndex] + dotResult + y, modulus);
                console.log(`b = ${ b[bIndex] }, sums=${ sums[0] } ${ sums[1] }, dotResult=${ dotResult }, prod = ${ dotResult * dotResult } dotResult2=${ dotResult2 }, y=${ y }, modResult=${ modResult }`);
                out[i] = fract(modResult * (1.0 / 256.0));
            }
            return out;
        }
    }, {
        key: 'randomize_',
        value: function randomize_() {
            for (var i = 0; i < 2; ++i) {
                this.hashFunctions[i] = hash_function_1.HashFunction.generate();
            }
        }
    }, {
        key: 'randomize',
        value: function randomize() {
            this.randomize_();
            this.computeGPUCoefficients_();
            this.changed.dispatch();
        }
    }, {
        key: 'toString',
        value: function toString() {
            return `new SegmentColorHash([${ this.hashFunctions }])`;
        }
    }, {
        key: 'computeGPUCoefficients_',
        value: function computeGPUCoefficients_() {
            var hashFunctions = this.hashFunctions;
            var a = this.a_;
            var b = this.b_;
            var aScalar = 1.0;
            var bScalar = 1.0;
            for (var i = 0; i < NUM_COMPONENTS; ++i) {
                var h = hashFunctions[i];
                var bIndex = 2 * i;
                var aIndex = 4 * (2 * i);
                b[bIndex] = h.b * bScalar;
                b[bIndex + 1] = h.c * bScalar;
                for (var j = 0; j < 4; ++j) {
                    a[aIndex + j] = h.a0[j] * aScalar;
                    a[aIndex + 4 + j] = h.a1[j] * aScalar;
                }
            }
        }
    }], [{
        key: 'getDefault',
        value: function getDefault() {
            return new SegmentColorHash([new hash_function_1.HashFunction(Float32Array.of(609, 2364, 3749, 2289), Float32Array.of(2840, 1186, 3660, 1833), 1718, 1109), new hash_function_1.HashFunction(Float32Array.of(3466, 3835, 3345, 2040), Float32Array.of(3382, 901, 18, 3444), 1534, 1432)]);
        }
    }]);

    return SegmentColorHash;
}();

exports.SegmentColorHash = SegmentColorHash;
;

/***/ },
/* 89 */
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

/***/ },
/* 90 */
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

var hash_function_1 = __webpack_require__(89);
var hash_table_1 = __webpack_require__(91);
var shader_lib_1 = __webpack_require__(68);
var disposable_1 = __webpack_require__(8);
var texture_1 = __webpack_require__(54);
exports.glsl_hashFunction = [shader_lib_1.glsl_uint64, shader_lib_1.glsl_exactDot, shader_lib_1.glsl_imod, `
float computeHash(uint64_t x, vec4 a0, vec4 a1, float b, float c, float modulus, float scalar) {
  x.low *= 255.0;
  x.high *= 255.0;
  float dotResult = imod(exactDot(a0, x.low) + exactDot(a1, x.high), modulus);
  float dotResult2 = imod(dotResult * dotResult, modulus);
  float y = imod(dotResult2 * c, modulus);
  float modResult = imod(dotResult + y + b, modulus);
  return fract(modResult * scalar);
}
`];

var GPUHashTable = function (_disposable_1$RefCoun) {
    _inherits(GPUHashTable, _disposable_1$RefCoun);

    function GPUHashTable(gl, hashTable) {
        _classCallCheck(this, GPUHashTable);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GPUHashTable).call(this));

        _this.gl = gl;
        _this.hashTable = hashTable;
        _this.hashFunctions = null;
        _this.generation = null;
        _this.textures = new Array();
        var numAlternatives = hashTable.hashFunctions.length;
        _this.a = new Float32Array(4 * (numAlternatives * 4));
        _this.b = new Float32Array(numAlternatives * 4 + 5);
        var textures = _this.textures;

        for (var i = 0; i < numAlternatives; ++i) {
            textures[i] = gl.createTexture();
        }
        return _this;
    }

    _createClass(GPUHashTable, [{
        key: 'computeCoefficients',
        value: function computeCoefficients() {
            var hashTable = this.hashTable;

            var hashFunctions = hashTable.hashFunctions;
            if (this.hashFunctions === hashFunctions) {
                return;
            }
            this.hashFunctions = hashFunctions;
            var a = this.a;
            var b = this.b;

            var numAlternatives = hashFunctions.length;
            var width = hashTable.width;
            var height = hashTable.height;

            var scalar = [1.0 / width, 1.0 / height];
            for (var i = 0; i < 2; ++i) {
                b[numAlternatives * 4 + i] = hash_function_1.PRIME_MODULUS;
                b[numAlternatives * 4 + 3 + i] = scalar[i];
            }
            b[numAlternatives * 4 + 2] = 1 / (2 * width);
            for (var alt = 0; alt < numAlternatives; ++alt) {
                var curFunctions = hashFunctions[alt];
                for (var _i = 0; _i < 2; ++_i) {
                    var h = curFunctions[_i];
                    var bIndex = alt * 4 + 2 * _i;
                    var aIndex = 4 * (alt * 4 + 2 * _i);
                    // Add 0.5 to b to give maximum margin of error.
                    //
                    // For the x coordinate (i == 0), since each position is used to address two texels (for the
                    // low and high uint32 values), we only add 0.25.
                    b[bIndex] = h.b + (_i === 0 ? 0.25 : 0.5);
                    b[bIndex + 1] = h.c;
                    for (var j = 0; j < 4; ++j) {
                        a[aIndex + j] = h.a0[j];
                        a[aIndex + 4 + j] = h.a1[j];
                    }
                }
            }
        }
    }, {
        key: 'copyToGPU',
        value: function copyToGPU() {
            this.computeCoefficients();
            var hashTable = this.hashTable;
            var generation = hashTable.generation;

            if (this.generation === generation) {
                return;
            }
            this.generation = generation;
            var width = hashTable.width;
            var height = hashTable.height;
            var tables = hashTable.tables;
            var gl = this.gl;
            var textures = this.textures;

            var numAlternatives = textures.length;
            gl.activeTexture(gl.TEXTURE0 + gl.tempTextureUnit);
            for (var alt = 0; alt < numAlternatives; ++alt) {
                gl.bindTexture(gl.TEXTURE_2D, textures[alt]);
                gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
                texture_1.setRawTextureParameters(gl);
                var format = gl.RGBA;
                gl.texImage2D(gl.TEXTURE_2D,
                /*level=*/0, format,
                /*width=*/width * 2,
                /*height=*/height,
                /*border=*/0, format, gl.UNSIGNED_BYTE, new Uint8Array(tables[alt].buffer));
            }
            gl.bindTexture(gl.TEXTURE_2D, null);
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            var gl = this.gl;

            this.textures.forEach(texture => {
                gl.deleteTexture(texture);
            });
            this.textures = null;
            this.gl = null;
            this.hashTable = null;
            this.hashFunctions = null;
        }
    }], [{
        key: 'get',
        value: function get(gl, hashTable) {
            return gl.memoize.get(hashTable, () => new GPUHashTable(gl, hashTable));
        }
    }]);

    return GPUHashTable;
}(disposable_1.RefCounted);

exports.GPUHashTable = GPUHashTable;
;

var HashTableShaderManager = function () {
    function HashTableShaderManager(prefix) {
        var numAlternatives = arguments.length <= 1 || arguments[1] === undefined ? hash_table_1.NUM_ALTERNATIVES : arguments[1];

        _classCallCheck(this, HashTableShaderManager);

        this.prefix = prefix;
        this.numAlternatives = numAlternatives;
        this.textureUnitSymbol = Symbol('gpuhashtable:' + this.prefix);
        this.aName = this.prefix + '_a';
        this.bName = this.prefix + '_b';
        this.samplerName = this.prefix + '_sampler';
    }

    _createClass(HashTableShaderManager, [{
        key: 'defineShader',
        value: function defineShader(builder) {
            var aName = this.aName;
            var bName = this.bName;
            var samplerName = this.samplerName;
            var numAlternatives = this.numAlternatives;

            builder.addUniform('highp vec4', aName, numAlternatives * 4);
            builder.addUniform('highp float', bName, numAlternatives * 4 + 5);
            builder.addTextureSampler2D(samplerName, this.textureUnitSymbol, numAlternatives);
            builder.addFragmentCode(exports.glsl_hashFunction);
            var s = '';
            for (var alt = 0; alt < numAlternatives; ++alt) {
                for (var i = 0; i < 2; ++i) {
                    var bIndex = alt * 4 + 2 * i;
                    var aIndex = alt * 4 + 2 * i;
                    s += `
float ${ this.prefix }_computeHash_${ alt }_${ i }(uint64_t x) {
  float primeModulus = ${ bName }[${ numAlternatives * 4 + i }];
  float scalar = ${ bName }[${ numAlternatives * 4 + 3 + i }];
  return computeHash(x, ${ aName }[${ aIndex }], ${ aName }[${ aIndex + 1 }], ${ bName }[${ bIndex }], ${ bName }[${ bIndex + 1 }], primeModulus, scalar);
}
`;
                }
                s += `
vec2 ${ this.prefix }_computeHash_${ alt }(uint64_t x) {
  vec2 v;
  v[0] = ${ this.prefix }_computeHash_${ alt }_0(x);
  v[1] = ${ this.prefix }_computeHash_${ alt }_1(x);
  return v;
}
`;
            }
            s += `
bool ${ this.hasFunctionName }(uint64_t x) {
  float highOffset = ${ bName }[${ numAlternatives * 4 + 2 }];
`;
            for (var _alt = 0; _alt < numAlternatives; ++_alt) {
                s += `
  {
    vec2 v = ${ this.prefix }_computeHash_${ _alt }(x);
    vec4 lowResult = texture2D(${ samplerName }[${ _alt }], v);
    vec4 highResult = texture2D(${ samplerName }[${ _alt }], vec2(v.x + highOffset, v.y));
    if (lowResult == x.low && highResult == x.high) {
      return true;
    }
  }
`;
            }
            s += `
  return false;
}
`;
            builder.addFragmentCode(s);
        }
    }, {
        key: 'enable',
        value: function enable(gl, shader, hashTable) {
            var numAlternatives = this.numAlternatives;
            var textures = hashTable.textures;

            hashTable.copyToGPU();
            var textureUnit = shader.textureUnit(this.textureUnitSymbol);
            for (var alt = 0; alt < numAlternatives; ++alt) {
                var unit = alt + textureUnit;
                gl.activeTexture(gl.TEXTURE0 + unit);
                gl.bindTexture(gl.TEXTURE_2D, textures[alt]);
            }
            gl.uniform4fv(shader.uniform(this.aName), hashTable.a);
            gl.uniform1fv(shader.uniform(this.bName), hashTable.b);
        }
    }, {
        key: 'disable',
        value: function disable(gl, shader) {
            var numAlternatives = this.numAlternatives;

            var textureUnit = shader.textureUnit(this.textureUnitSymbol);
            for (var alt = 0; alt < numAlternatives; ++alt) {
                var unit = alt + textureUnit;
                gl.activeTexture(gl.TEXTURE0 + unit);
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
        }
    }, {
        key: 'hasFunctionName',
        get: function () {
            return `${ this.prefix }_has`;
        }
    }]);

    return HashTableShaderManager;
}();

exports.HashTableShaderManager = HashTableShaderManager;
;

/***/ },
/* 91 */
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

var hash_function_1 = __webpack_require__(89);
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
/* 92 */
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
 * Converts an HSV color (with h, s, v in [0,1]) to RGB (in range [0,1]).
 *
 * Based on goog/color/color.js in the Google Closure library.
 */

function hsvToRgb(out, h, s, v) {
    h *= 6;
    var hueIndex = Math.floor(h);
    var remainder = h - hueIndex;
    var val1 = v * (1 - s);
    var val2 = v * (1 - s * remainder);
    var val3 = v * (1 - s * (1 - remainder));
    switch (hueIndex % 6) {
        case 0:
            out[0] = v;
            out[1] = val3;
            out[2] = val1;
            break;
        case 1:
            out[0] = val2;
            out[1] = v;
            out[2] = val1;
            break;
        case 2:
            out[0] = val1;
            out[1] = v;
            out[2] = val3;
            break;
        case 3:
            out[0] = val1;
            out[1] = val2;
            out[2] = v;
            break;
        case 4:
            out[0] = val3;
            out[1] = val1;
            out[2] = v;
            break;
        case 5:
            out[0] = v;
            out[1] = val1;
            out[2] = val2;
            break;
    }
    return out;
}
exports.hsvToRgb = hsvToRgb;

/***/ },
/* 93 */
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

var disposable_1 = __webpack_require__(8);
var uint64_1 = __webpack_require__(41);
__webpack_require__(94);
var temp = new uint64_1.Uint64();

var SegmentSetWidget = function (_disposable_1$RefCoun) {
    _inherits(SegmentSetWidget, _disposable_1$RefCoun);

    function SegmentSetWidget(displayState) {
        _classCallCheck(this, SegmentSetWidget);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SegmentSetWidget).call(this));

        _this.displayState = displayState;
        _this.element = document.createElement('div');
        _this.clearButton = document.createElement('button');
        _this.itemContainer = document.createElement('span');
        _this.items = new Map();
        var element = _this.element;
        var clearButton = _this.clearButton;
        var itemContainer = _this.itemContainer;

        element.className = 'segment-set-widget noselect';
        clearButton.className = 'clear-button';
        clearButton.title = 'Remove all segment IDs';
        _this.registerEventListener(clearButton, 'click', () => {
            _this.visibleSegments.clear();
        });
        itemContainer.className = 'item-container';
        element.appendChild(itemContainer);
        itemContainer.appendChild(clearButton);
        _this.registerSignalBinding(displayState.visibleSegments.changed.add(_this.handleSetChanged, _this));
        _this.registerSignalBinding(displayState.segmentColorHash.changed.add(_this.handleColorChanged, _this));
        for (var x of displayState.visibleSegments) {
            _this.addElement(x.toString());
        }
        _this.updateClearButtonVisibility();
        return _this;
    }

    _createClass(SegmentSetWidget, [{
        key: 'updateClearButtonVisibility',
        value: function updateClearButtonVisibility() {
            var clearButton = this.clearButton;

            clearButton.style.display = this.displayState.visibleSegments.size > 0 ? '' : 'none';
        }
    }, {
        key: 'handleSetChanged',
        value: function handleSetChanged(x, added) {
            this.updateClearButtonVisibility();
            var items = this.items;

            if (x === null) {
                // Cleared.
                var itemContainer = this.itemContainer;
                var clearButton = this.clearButton;

                while (true) {
                    var lastElement = itemContainer.lastElementChild;
                    if (lastElement === clearButton) {
                        break;
                    }
                    itemContainer.removeChild(lastElement);
                }
                items.clear();
            } else if (added) {
                this.addElement(x.toString());
            } else {
                var s = x.toString();
                var itemElement = items.get(s);
                itemElement.parentElement.removeChild(itemElement);
                items.delete(s);
            }
        }
    }, {
        key: 'addElement',
        value: function addElement(s) {
            var itemElement = document.createElement('button');
            itemElement.className = 'segment-button';
            itemElement.textContent = s;
            itemElement.title = `Remove segment ID ${ s }`;
            var widget = this;
            itemElement.addEventListener('click', function () {
                temp.parseString(this.textContent);
                widget.visibleSegments.delete(temp);
            });
            itemElement.addEventListener('mouseover', function () {
                temp.parseString(this.textContent);
                widget.segmentSelectionState.set(temp);
            });
            itemElement.addEventListener('mouseout', function () {
                temp.parseString(this.textContent);
                widget.segmentSelectionState.set(null);
            });
            this.setItemColor(itemElement);
            this.itemContainer.appendChild(itemElement);
            this.items.set(s, itemElement);
        }
    }, {
        key: 'setItemColor',
        value: function setItemColor(itemElement) {
            temp.parseString(itemElement.textContent);
            itemElement.style.backgroundColor = this.segmentColorHash.computeCssColor(temp);
        }
    }, {
        key: 'handleColorChanged',
        value: function handleColorChanged() {
            this.items.forEach(itemElement => {
                this.setItemColor(itemElement);
            });
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            var element = this.element;
            var parentElement = element.parentElement;

            if (parentElement) {
                parentElement.removeChild(element);
            }
        }
    }, {
        key: 'visibleSegments',
        get: function () {
            return this.displayState.visibleSegments;
        }
    }, {
        key: 'segmentColorHash',
        get: function () {
            return this.displayState.segmentColorHash;
        }
    }, {
        key: 'segmentSelectionState',
        get: function () {
            return this.displayState.segmentSelectionState;
        }
    }]);

    return SegmentSetWidget;
}(disposable_1.RefCounted);

exports.SegmentSetWidget = SegmentSetWidget;
;

/***/ },
/* 94 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 95 */
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

var disposable_1 = __webpack_require__(8);
var uint64_1 = __webpack_require__(41);
var signals_1 = __webpack_require__(38);

var SegmentSelectionState = function (_disposable_1$RefCoun) {
    _inherits(SegmentSelectionState, _disposable_1$RefCoun);

    function SegmentSelectionState() {
        _classCallCheck(this, SegmentSelectionState);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SegmentSelectionState).call(this, ...args));

        _this.selectedSegment = new uint64_1.Uint64();
        _this.hasSelectedSegment = false;
        _this.changed = new signals_1.Signal();
        return _this;
    }

    _createClass(SegmentSelectionState, [{
        key: 'set',
        value: function set(value) {
            var hasSelectedSegment = value != null;
            if (!hasSelectedSegment) {
                if (this.hasSelectedSegment) {
                    this.hasSelectedSegment = false;
                    this.changed.dispatch();
                }
            } else {
                var existingValue = this.selectedSegment;
                if (!this.hasSelectedSegment || value.low !== existingValue.low || value.high !== existingValue.high) {
                    existingValue.low = value.low;
                    existingValue.high = value.high;
                    this.hasSelectedSegment = true;
                    this.changed.dispatch();
                }
            }
        }
    }, {
        key: 'isSelected',
        value: function isSelected(value) {
            return this.hasSelectedSegment && uint64_1.Uint64.equal(value, this.selectedSegment);
        }
    }, {
        key: 'bindTo',
        value: function bindTo(layerSelectedValues, userLayer) {
            var temp = new uint64_1.Uint64();
            this.registerSignalBinding(layerSelectedValues.changed.add(() => {
                var value = layerSelectedValues.get(userLayer);
                if (typeof value === 'number') {
                    temp.low = value;
                    temp.high = 0;
                    value = temp;
                }
                this.set(value);
            }));
        }
    }]);

    return SegmentSelectionState;
}(disposable_1.RefCounted);

exports.SegmentSelectionState = SegmentSelectionState;
;

/***/ },
/* 96 */
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

var worker_rpc_1 = __webpack_require__(7);
var hash_table_1 = __webpack_require__(91);
var signals_1 = __webpack_require__(38);
var uint64_1 = __webpack_require__(41);

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
/* 97 */
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

var renderlayer_1 = __webpack_require__(39);
var segment_color_1 = __webpack_require__(88);
var shader_1 = __webpack_require__(90);
var trackable_value_1 = __webpack_require__(98);
var json_1 = __webpack_require__(11);
function trackableAlphaValue() {
    var initialValue = arguments.length <= 0 || arguments[0] === undefined ? 0.5 : arguments[0];

    return new trackable_value_1.TrackableValue(initialValue, json_1.verifyFloat01, initialValue);
}
exports.trackableAlphaValue = trackableAlphaValue;

var SegmentationRenderLayer = function (_renderlayer_1$Render) {
    _inherits(SegmentationRenderLayer, _renderlayer_1$Render);

    function SegmentationRenderLayer(chunkManager, multiscaleSourcePromise, displayState) {
        var selectedAlpha = arguments.length <= 3 || arguments[3] === undefined ? trackableAlphaValue(0.5) : arguments[3];
        var notSelectedAlpha = arguments.length <= 4 || arguments[4] === undefined ? trackableAlphaValue(0) : arguments[4];

        _classCallCheck(this, SegmentationRenderLayer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SegmentationRenderLayer).call(this, chunkManager, multiscaleSourcePromise));

        _this.displayState = displayState;
        _this.selectedAlpha = selectedAlpha;
        _this.notSelectedAlpha = notSelectedAlpha;
        _this.selectedSegmentForShader = new Float32Array(8);
        _this.segmentColorShaderManager = new segment_color_1.SegmentColorShaderManager('segmentColorHash');
        _this.hashTableManager = new shader_1.HashTableShaderManager('visibleSegments');
        _this.gpuHashTable = shader_1.GPUHashTable.get(_this.gl, _this.displayState.visibleSegments.hashTable);
        _this.registerSignalBinding(displayState.segmentSelectionState.changed.add(_this.redrawNeeded.dispatch, _this));
        _this.registerSignalBinding(displayState.segmentColorHash.changed.add(_this.redrawNeeded.dispatch, _this));
        _this.registerSignalBinding(displayState.visibleSegments.changed.add(_this.redrawNeeded.dispatch, _this));
        _this.registerSignalBinding(selectedAlpha.changed.add(() => {
            _this.redrawNeeded.dispatch();
        }));
        _this.registerSignalBinding(notSelectedAlpha.changed.add(() => {
            _this.redrawNeeded.dispatch();
        }));
        return _this;
    }

    _createClass(SegmentationRenderLayer, [{
        key: 'getShaderKey',
        value: function getShaderKey() {
            return 'sliceview.SegmentationRenderLayer';
        }
    }, {
        key: 'defineShader',
        value: function defineShader(builder) {
            _get(Object.getPrototypeOf(SegmentationRenderLayer.prototype), 'defineShader', this).call(this, builder);
            this.hashTableManager.defineShader(builder);
            this.segmentColorShaderManager.defineShader(builder);
            builder.addUniform('highp vec4', 'uSelectedSegment', 2);
            builder.addUniform('highp float', 'uShowAllSegments');
            builder.addUniform('highp float', 'uSelectedAlpha');
            builder.addUniform('highp float', 'uNotSelectedAlpha');
            builder.setFragmentMain(`
uint64_t value = getDataValue();
  float alpha = uSelectedAlpha;
  float saturation = 1.0;
  if (value.low == vec4(0,0,0,0) && value.high == vec4(0,0,0,0)) {
    emit(vec4(vec4(0, 0, 0, 0)));
    return;
  }
  bool has = uShowAllSegments > 0.0 ? true : ${ this.hashTableManager.hasFunctionName }(value);
  if (uSelectedSegment[0] == value.low && uSelectedSegment[1] == value.high) {
    saturation = has ? 0.5 : 0.75;
  } else if (!has) {
    alpha = uNotSelectedAlpha;
  }
  vec3 rgb = segmentColorHash(value);
  emit(vec4(mix(vec3(1.0,1.0,1.0), rgb, saturation), alpha));
`);
        }
    }, {
        key: 'beginSlice',
        value: function beginSlice(sliceView) {
            var shader = _get(Object.getPrototypeOf(SegmentationRenderLayer.prototype), 'beginSlice', this).call(this, sliceView);
            var gl = this.gl;
            var selectedSegmentForShader = this.selectedSegmentForShader;
            var displayState = this.displayState;
            var _displayState = this.displayState;
            var segmentSelectionState = _displayState.segmentSelectionState;
            var visibleSegments = _displayState.visibleSegments;

            if (!segmentSelectionState.hasSelectedSegment) {
                selectedSegmentForShader.fill(0);
            } else {
                var seg = segmentSelectionState.selectedSegment;
                var low = seg.low,
                    high = seg.high;
                for (var i = 0; i < 4; ++i) {
                    selectedSegmentForShader[i] = (low >> 8 * i & 0xFF) / 255.0;
                    selectedSegmentForShader[4 + i] = (high >> 8 * i & 0xFF) / 255.0;
                }
            }
            gl.uniform1f(shader.uniform('uSelectedAlpha'), this.selectedAlpha.value);
            gl.uniform1f(shader.uniform('uNotSelectedAlpha'), this.notSelectedAlpha.value);
            gl.uniform4fv(shader.uniform('uSelectedSegment'), selectedSegmentForShader);
            gl.uniform1f(shader.uniform('uShowAllSegments'), visibleSegments.hashTable.size ? 0.0 : 1.0);
            this.hashTableManager.enable(gl, shader, this.gpuHashTable);
            this.segmentColorShaderManager.enable(gl, shader, displayState.segmentColorHash);
            return shader;
        }
    }, {
        key: 'endSlice',
        value: function endSlice(shader) {
            var gl = this.gl;

            this.hashTableManager.disable(gl, shader);
            _get(Object.getPrototypeOf(SegmentationRenderLayer.prototype), 'endSlice', this).call(this, shader);
        }
    }]);

    return SegmentationRenderLayer;
}(renderlayer_1.RenderLayer);

exports.SegmentationRenderLayer = SegmentationRenderLayer;
;

/***/ },
/* 98 */
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

var signals_1 = __webpack_require__(38);

var TrackableValue = function () {
    function TrackableValue(value_, validator, defaultValue) {
        _classCallCheck(this, TrackableValue);

        this.value_ = value_;
        this.validator = validator;
        this.defaultValue = defaultValue;
        this.changed = new signals_1.Signal();
    }

    _createClass(TrackableValue, [{
        key: "toJSON",
        value: function toJSON() {
            var value_ = this.value_;

            if (value_ === this.defaultValue) {
                return undefined;
            }
            return this.value_;
        }
    }, {
        key: "restoreState",
        value: function restoreState(x) {
            if (x !== undefined) {
                var validator = this.validator;

                try {
                    this.value = validator(x);
                    return;
                } catch (ignoredError) {}
            }
            var defaultValue = this.defaultValue;

            if (defaultValue !== undefined) {
                this.value = defaultValue;
            }
        }
    }, {
        key: "value",
        get: function () {
            return this.value_;
        },
        set: function (newValue) {
            if (newValue !== this.value_) {
                this.value_ = newValue;
                this.changed.dispatch();
            }
        }
    }]);

    return TrackableValue;
}();

exports.TrackableValue = TrackableValue;
;

/***/ },
/* 99 */
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

var shader_1 = __webpack_require__(36);
var base_1 = __webpack_require__(37);
var signals_1 = __webpack_require__(38);
var frontend_1 = __webpack_require__(51);
var disposable_1 = __webpack_require__(8);
var geom_1 = __webpack_require__(21);
var perspective_panel_1 = __webpack_require__(63);
var panel_1 = __webpack_require__(100);
var shader_lib_1 = __webpack_require__(68);
var buffer_1 = __webpack_require__(35);
var worker_rpc_1 = __webpack_require__(7);

var SkeletonShaderManager = function () {
    function SkeletonShaderManager() {
        _classCallCheck(this, SkeletonShaderManager);

        this.tempMat = geom_1.mat4.create();
        this.tempPickID = new Float32Array(4);
    }

    _createClass(SkeletonShaderManager, [{
        key: 'defineShader',
        value: function defineShader(builder) {
            builder.addAttribute('highp vec3', 'aVertexPosition');
            builder.addUniform('highp vec3', 'uColor');
            builder.addUniform('highp mat4', 'uProjection');
            builder.addUniform('highp vec4', 'uPickID');
            builder.setVertexMain(`gl_Position = uProjection * vec4(aVertexPosition, 1.0);`);
            builder.setFragmentMain(`emit(vec4(uColor, 1.0), uPickID);`);
        }
    }, {
        key: 'beginLayer',
        value: function beginLayer(gl, shader, renderContext, objectToDataMatrix) {
            var dataToDevice = renderContext.dataToDevice;

            var mat = geom_1.mat4.multiply(this.tempMat, dataToDevice, objectToDataMatrix);
            gl.uniformMatrix4fv(shader.uniform('uProjection'), false, mat);
        }
    }, {
        key: 'getShader',
        value: function getShader(gl, key, emitter) {
            return gl.memoize.get(key, () => {
                var builder = new shader_1.ShaderBuilder(gl);
                builder.require(emitter);
                this.defineShader(builder);
                return builder.build();
            });
        }
    }, {
        key: 'drawSkeleton',
        value: function drawSkeleton(gl, shader, skeletonChunk, color, pickID, pickingOnly) {
            if (!pickingOnly) {
                gl.uniform3fv(shader.uniform('uColor'), color);
            }
            gl.uniform4fv(shader.uniform('uPickID'), shader_lib_1.setVec4FromUint32(this.tempPickID, pickID));
            skeletonChunk.vertexBuffer.bindToVertexAttrib(shader.attribute('aVertexPosition'),
            /*components=*/3);
            skeletonChunk.indexBuffer.bind();
            gl.drawElements(gl.LINES, skeletonChunk.numIndices, gl.UNSIGNED_INT, 0);
        }
    }, {
        key: 'endLayer',
        value: function endLayer(gl, shader) {
            gl.disableVertexAttribArray(shader.attribute('aVertexPosition'));
        }
    }]);

    return SkeletonShaderManager;
}();

;

var PerspectiveViewSkeletonLayer = function (_perspective_panel_1$) {
    _inherits(PerspectiveViewSkeletonLayer, _perspective_panel_1$);

    function PerspectiveViewSkeletonLayer(base) {
        _classCallCheck(this, PerspectiveViewSkeletonLayer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PerspectiveViewSkeletonLayer).call(this));

        _this.base = base;
        _this.shader = _this.base.skeletonShaderManager.getShader(_this.gl, 'skeleton/SkeletonShaderManager:PerspectivePanel', perspective_panel_1.perspectivePanelEmit);
        _this.registerDisposer(base);
        _this.registerSignalBinding(base.redrawNeeded.add(() => {
            _this.redrawNeeded.dispatch();
        }));
        _this.setReady(true);
        return _this;
    }

    _createClass(PerspectiveViewSkeletonLayer, [{
        key: 'draw',
        value: function draw(renderContext) {
            var pickingOnly = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            this.base.draw(renderContext, this, this.shader, pickingOnly);
        }
    }, {
        key: 'drawPicking',
        value: function drawPicking(renderContext) {
            this.base.draw(renderContext, this, this.shader, true);
        }
    }, {
        key: 'gl',
        get: function () {
            return this.base.gl;
        }
    }]);

    return PerspectiveViewSkeletonLayer;
}(perspective_panel_1.PerspectiveViewRenderLayer);

exports.PerspectiveViewSkeletonLayer = PerspectiveViewSkeletonLayer;
;

var SliceViewPanelSkeletonLayer = function (_panel_1$SliceViewPan) {
    _inherits(SliceViewPanelSkeletonLayer, _panel_1$SliceViewPan);

    function SliceViewPanelSkeletonLayer(base) {
        _classCallCheck(this, SliceViewPanelSkeletonLayer);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SliceViewPanelSkeletonLayer).call(this));

        _this2.base = base;
        _this2.shader = _this2.base.skeletonShaderManager.getShader(_this2.gl, 'skeleton/SkeletonShaderManager:SliceViewPanel', panel_1.sliceViewPanelEmit);
        _this2.registerDisposer(base);
        _this2.registerSignalBinding(base.redrawNeeded.add(() => {
            _this2.redrawNeeded.dispatch();
        }));
        _this2.setReady(true);
        return _this2;
    }

    _createClass(SliceViewPanelSkeletonLayer, [{
        key: 'draw',
        value: function draw(renderContext) {
            console.log('drawing on sliceview');
            this.base.draw(renderContext, this, this.shader, false, 10);
        }
    }, {
        key: 'gl',
        get: function () {
            return this.base.gl;
        }
    }]);

    return SliceViewPanelSkeletonLayer;
}(panel_1.SliceViewPanelRenderLayer);

exports.SliceViewPanelSkeletonLayer = SliceViewPanelSkeletonLayer;
;

var SkeletonLayer = function (_disposable_1$RefCoun) {
    _inherits(SkeletonLayer, _disposable_1$RefCoun);

    function SkeletonLayer(chunkManager, source, voxelSizeObject, displayState) {
        _classCallCheck(this, SkeletonLayer);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(SkeletonLayer).call(this));

        _this3.chunkManager = chunkManager;
        _this3.source = source;
        _this3.voxelSizeObject = voxelSizeObject;
        _this3.displayState = displayState;
        _this3.tempMat = geom_1.mat4.create();
        _this3.skeletonShaderManager = new SkeletonShaderManager();
        _this3.redrawNeeded = new signals_1.Signal();
        var dispatchRedrawNeeded = () => {
            _this3.redrawNeeded.dispatch();
        };
        _this3.registerSignalBinding(displayState.segmentColorHash.changed.add(dispatchRedrawNeeded));
        _this3.registerSignalBinding(displayState.visibleSegments.changed.add(dispatchRedrawNeeded));
        _this3.registerSignalBinding(displayState.segmentSelectionState.changed.add(dispatchRedrawNeeded));
        var sharedObject = _this3.registerDisposer(new worker_rpc_1.SharedObject());
        sharedObject.initializeCounterpart(chunkManager.rpc, {
            'type': 'skeleton/SkeletonLayer',
            'chunkManager': chunkManager.rpcId,
            'source': source.addCounterpartRef(),
            'visibleSegmentSet': displayState.visibleSegments.rpcId
        });
        return _this3;
    }

    _createClass(SkeletonLayer, [{
        key: 'draw',
        value: function draw(renderContext, layer, shader) {
            var pickingOnly = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
            var lineWidth = arguments.length <= 4 || arguments[4] === undefined ? pickingOnly ? 5 : 1 : arguments[4];
            var gl = this.gl;
            var skeletonShaderManager = this.skeletonShaderManager;

            shader.bind();
            var objectToDataMatrix = this.tempMat;
            geom_1.mat4.identity(objectToDataMatrix);
            geom_1.mat4.scale(objectToDataMatrix, objectToDataMatrix, this.voxelSizeObject.size);
            skeletonShaderManager.beginLayer(gl, shader, renderContext, objectToDataMatrix);
            var skeletons = this.source.chunks;
            var pickIDs = renderContext.pickIDs;

            var color = geom_1.vec3.create();
            var displayState = this.displayState;
            var segmentColorHash = displayState.segmentColorHash;
            var segmentSelectionState = displayState.segmentSelectionState;

            gl.lineWidth(lineWidth);
            for (var objectId of displayState.visibleSegments) {
                var objectKey = `${ objectId.low }:${ objectId.high }`;
                var skeleton = skeletons.get(objectKey);
                if (skeleton === undefined || skeleton.state !== base_1.ChunkState.GPU_MEMORY) {
                    continue;
                }
                if (!pickingOnly) {
                    segmentColorHash.compute(color, objectId);
                    if (segmentSelectionState.isSelected(objectId)) {
                        for (var i = 0; i < 3; ++i) {
                            color[i] = color[i] * 0.5 + 0.5;
                        }
                    }
                }
                skeletonShaderManager.drawSkeleton(gl, shader, skeleton, color, pickIDs.register(layer, objectId), pickingOnly);
            }
            skeletonShaderManager.endLayer(gl, shader);
        }
    }, {
        key: 'gl',
        get: function () {
            return this.chunkManager.chunkQueueManager.gl;
        }
    }]);

    return SkeletonLayer;
}(disposable_1.RefCounted);

exports.SkeletonLayer = SkeletonLayer;
;

var SkeletonChunk = function (_frontend_1$Chunk) {
    _inherits(SkeletonChunk, _frontend_1$Chunk);

    function SkeletonChunk(source, x) {
        _classCallCheck(this, SkeletonChunk);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(SkeletonChunk).call(this, source));

        _this4.data = x['data'];
        return _this4;
    }

    _createClass(SkeletonChunk, [{
        key: 'copyToGPU',
        value: function copyToGPU(gl) {
            _get(Object.getPrototypeOf(SkeletonChunk.prototype), 'copyToGPU', this).call(this, gl);
            var data = this.data;

            var dv = new DataView(data.buffer);
            var numVertices = dv.getInt32(0, true);
            var positions = new Float32Array(data.buffer, 4, numVertices * 3);
            var indices = new Uint32Array(data.buffer, 4 * (numVertices * 3) + 4);
            this.vertexBuffer = buffer_1.Buffer.fromData(gl, positions, gl.ARRAY_BUFFER, gl.STATIC_DRAW);
            this.indexBuffer = buffer_1.Buffer.fromData(gl, indices, gl.ELEMENT_ARRAY_BUFFER, gl.STATIC_DRAW);
            this.numIndices = indices.length;
        }
    }, {
        key: 'freeGPUMemory',
        value: function freeGPUMemory(gl) {
            _get(Object.getPrototypeOf(SkeletonChunk.prototype), 'freeGPUMemory', this).call(this, gl);
            this.vertexBuffer.dispose();
            this.indexBuffer.dispose();
        }
    }]);

    return SkeletonChunk;
}(frontend_1.Chunk);

exports.SkeletonChunk = SkeletonChunk;
;

var SkeletonSource = function (_frontend_1$ChunkSour) {
    _inherits(SkeletonSource, _frontend_1$ChunkSour);

    function SkeletonSource() {
        _classCallCheck(this, SkeletonSource);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SkeletonSource).apply(this, arguments));
    }

    _createClass(SkeletonSource, [{
        key: 'getChunk',
        value: function getChunk(x) {
            return new SkeletonChunk(this, x);
        }
    }]);

    return SkeletonSource;
}(frontend_1.ChunkSource);

exports.SkeletonSource = SkeletonSource;
;

/***/ },
/* 100 */
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

var axes_lines_1 = __webpack_require__(69);
var layer_1 = __webpack_require__(40);
var rendered_data_panel_1 = __webpack_require__(64);
var object_picking_1 = __webpack_require__(70);
var frontend_1 = __webpack_require__(34);
var geom_1 = __webpack_require__(21);
var mouse_drag_1 = __webpack_require__(72);
var offscreen_1 = __webpack_require__(53);
var signals_1 = __webpack_require__(38);
var keyCommands = new Map();

var _loop = function (axis) {
    var axisName = geom_1.AXES_NAMES[axis];

    var _loop2 = function (sign) {
        var signStr = sign < 0 ? '-' : '+';
        keyCommands.set(`rotate-relative-${ axisName }${ signStr }`, function () {
            var panel = this;
            var sliceView = panel.sliceView;

            if (!sliceView.hasViewportToData) {
                return;
            }
            var navigationState = panel.viewer.navigationState;

            navigationState.pose.rotateAbsolute(sliceView.viewportAxes[axis], sign * 0.1);
        });
        var tempOffset = geom_1.vec3.create();
        keyCommands.set(`${ axisName }${ signStr }`, function () {
            var panel = this;
            var sliceView = panel.sliceView;

            if (!sliceView.hasViewportToData) {
                return;
            }
            var navigationState = panel.viewer.navigationState;

            var offset = tempOffset;
            geom_1.vec3.multiply(offset, navigationState.voxelSize.size, sliceView.viewportAxes[axis]);
            geom_1.vec3.scale(offset, offset, sign);
            navigationState.pose.translateAbsolute(offset);
        });
    };

    for (var sign of [-1, +1]) {
        _loop2(sign);
    }
};

for (var axis = 0; axis < 3; ++axis) {
    _loop(axis);
}
keyCommands.set('zoom-in', function () {
    var panel = this;
    var navigationState = panel.viewer.navigationState;

    navigationState.zoomBy(0.5);
});
keyCommands.set('zoom-out', function () {
    var panel = this;
    var navigationState = panel.viewer.navigationState;

    navigationState.zoomBy(2.0);
});
(function (OffscreenTextures) {
    OffscreenTextures[OffscreenTextures["COLOR"] = 0] = "COLOR";
    OffscreenTextures[OffscreenTextures["PICK"] = 1] = "PICK";
    OffscreenTextures[OffscreenTextures["NUM_TEXTURES"] = 2] = "NUM_TEXTURES";
})(exports.OffscreenTextures || (exports.OffscreenTextures = {}));
var OffscreenTextures = exports.OffscreenTextures;
function sliceViewPanelEmit(builder) {
    builder.addFragmentExtension('GL_EXT_draw_buffers');
    builder.addFragmentCode(`
void emit(vec4 color, vec4 pickId) {
  gl_FragData[${ OffscreenTextures.COLOR }] = color;
  gl_FragData[${ OffscreenTextures.PICK }] = pickId;
}
`);
}
exports.sliceViewPanelEmit = sliceViewPanelEmit;

var SliceViewPanelRenderLayer = function (_layer_1$RenderLayer) {
    _inherits(SliceViewPanelRenderLayer, _layer_1$RenderLayer);

    function SliceViewPanelRenderLayer() {
        _classCallCheck(this, SliceViewPanelRenderLayer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SliceViewPanelRenderLayer).call(this, ...args));

        _this.redrawNeeded = new signals_1.Signal();
        return _this;
    }

    _createClass(SliceViewPanelRenderLayer, [{
        key: 'draw',
        value: function draw(renderContext) {
            // Must be overriden by subclass.
        }
    }]);

    return SliceViewPanelRenderLayer;
}(layer_1.RenderLayer);

exports.SliceViewPanelRenderLayer = SliceViewPanelRenderLayer;
;

var SliceViewPanel = function (_rendered_data_panel_) {
    _inherits(SliceViewPanel, _rendered_data_panel_);

    function SliceViewPanel(context, element, sliceView, viewer) {
        _classCallCheck(this, SliceViewPanel);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SliceViewPanel).call(this, context, element, viewer));

        _this2.sliceView = sliceView;
        _this2.axesLineHelper = axes_lines_1.AxesLineHelper.get(_this2.gl);
        _this2.sliceViewRenderHelper = frontend_1.SliceViewRenderHelper.get(_this2.gl, 'SliceViewRenderHelper', sliceViewPanelEmit);
        _this2.colorFactor = geom_1.vec4.fromValues(1, 1, 1, 1);
        _this2.backgroundColor = geom_1.vec4.fromValues(0.5, 0.5, 0.5, 1.0);
        _this2.pickIDs = new object_picking_1.PickIDManager();
        _this2.visibleLayerTracker = _this2.registerDisposer(new layer_1.VisibleRenderLayerTracker(_this2.viewer.layerManager, SliceViewPanelRenderLayer, layer => {
            layer.redrawNeeded.add(_this2.scheduleRedraw, _this2);
            _this2.scheduleRedraw();
        }, layer => {
            layer.redrawNeeded.remove(_this2.scheduleRedraw, _this2);
            _this2.scheduleRedraw();
        }));
        _this2.offscreenFramebuffer = new offscreen_1.OffscreenFramebuffer(_this2.gl, { numDataBuffers: OffscreenTextures.NUM_TEXTURES });
        _this2.offscreenCopyHelper = offscreen_1.OffscreenCopyHelper.get(_this2.gl);
        _this2.registerSignalBinding(sliceView.viewChanged.add(context.scheduleRedraw, context));
        _this2.registerSignalBinding(viewer.showAxisLines.changed.add(() => {
            _this2.scheduleRedraw();
        }));
        return _this2;
    }

    _createClass(SliceViewPanel, [{
        key: 'onKeyCommand',
        value: function onKeyCommand(action) {
            var command = keyCommands.get(action);
            if (command) {
                command.call(this);
                return true;
            }
            return false;
        }
    }, {
        key: 'draw',
        value: function draw() {
            var sliceView = this.sliceView;

            if (!sliceView.hasValidViewport) {
                return;
            }
            sliceView.updateRendering();
            var gl = this.gl;
            var width = sliceView.width;
            var height = sliceView.height;
            var dataToDevice = sliceView.dataToDevice;

            this.offscreenFramebuffer.bind(width, height);
            gl.disable(gl.SCISSOR_TEST);
            this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            // Draw axes lines.
            // FIXME: avoid use of temporary matrix
            var mat = geom_1.mat4.create();
            this.sliceViewRenderHelper.draw(sliceView.offscreenFramebuffer.dataTextures[0], geom_1.identityMat4, this.colorFactor, this.backgroundColor, 0, 0, 1, 1);
            var visibleLayers = this.visibleLayerTracker.getVisibleLayers();
            var pickIDs = this.pickIDs;

            pickIDs.clear();
            var renderContext = { dataToDevice: sliceView.dataToDevice, pickIDs: pickIDs };
            for (var renderLayer of visibleLayers) {
                renderLayer.draw(renderContext);
            }
            if (this.viewer.showAxisLines.value) {
                // Construct matrix that maps [-1, +1] x/y range to the full viewport data
                // coordinates.
                geom_1.mat4.copy(mat, dataToDevice);
                for (var i = 0; i < 3; ++i) {
                    mat[12 + i] = 0;
                }
                for (var _i = 0; _i < 4; ++_i) {
                    mat[2 + 4 * _i] = 0;
                }
                var axisLength = Math.min(width, height) / 4 * 1.5;
                var pixelSize = sliceView.pixelSize;
                for (var _i2 = 0; _i2 < 12; ++_i2) {
                    // pixelSize is nm / pixel
                    //
                    mat[_i2] *= axisLength * pixelSize;
                }
                gl.WEBGL_draw_buffers.drawBuffersWEBGL([gl.WEBGL_draw_buffers.COLOR_ATTACHMENT0_WEBGL]);
                this.axesLineHelper.draw(mat);
            }
            this.offscreenFramebuffer.unbind();
            // Draw the texture over the whole viewport.
            this.setGLViewport();
            this.offscreenCopyHelper.draw(this.offscreenFramebuffer.dataTextures[OffscreenTextures.COLOR]);
        }
    }, {
        key: 'onResize',
        value: function onResize() {
            this.sliceView.setViewportSize(this.element.clientWidth, this.element.clientHeight);
        }
    }, {
        key: 'updateMouseState',
        value: function updateMouseState(mouseState) {
            mouseState.pickedRenderLayer = null;
            var sliceView = this.sliceView;
            if (!sliceView.hasValidViewport) {
                return false;
            }
            var width = sliceView.width;
            var height = sliceView.height;
            var offscreenFramebuffer = this.offscreenFramebuffer;

            if (!offscreenFramebuffer.hasSize(width, height)) {
                return false;
            }
            var out = mouseState.position;
            var glWindowX = this.mouseX;
            var y = this.mouseY;
            geom_1.vec3.set(out, glWindowX - width / 2, y - height / 2, 0);
            geom_1.vec3.transformMat4(out, out, sliceView.viewportToData);
            var glWindowY = height - y;
            this.pickIDs.setMouseState(mouseState, offscreenFramebuffer.readPixelAsUint32(OffscreenTextures.PICK, glWindowX, glWindowY));
            return true;
        }
    }, {
        key: 'onMousedown',
        value: function onMousedown(e) {
            _get(Object.getPrototypeOf(SliceViewPanel.prototype), 'onMousedown', this).call(this, e);
            if (!this.sliceView.hasValidViewport) {
                return;
            }
            if (e.button === 0) {
                mouse_drag_1.startRelativeMouseDrag(e, (event, deltaX, deltaY) => {
                    var position = this.viewer.navigationState.position;

                    if (event.shiftKey) {
                        var viewportAxes = this.sliceView.viewportAxes;

                        this.viewer.navigationState.pose.rotateAbsolute(viewportAxes[1], deltaX / 4.0 * Math.PI / 180.0);
                        this.viewer.navigationState.pose.rotateAbsolute(viewportAxes[0], deltaY / 4.0 * Math.PI / 180.0);
                    } else {
                        var pos = position.spatialCoordinates;
                        geom_1.vec3.set(pos, deltaX, deltaY, 0);
                        geom_1.vec3.transformMat4(pos, pos, this.sliceView.viewportToData);
                        position.changed.dispatch();
                    }
                });
            }
        }
    }]);

    return SliceViewPanel;
}(rendered_data_panel_1.RenderedDataPanel);

exports.SliceViewPanel = SliceViewPanel;
;

/***/ },
/* 101 */
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

var dom_1 = __webpack_require__(10);
var disposable_1 = __webpack_require__(8);
var uint64_1 = __webpack_require__(41);
var signals_1 = __webpack_require__(38);
__webpack_require__(102);

var Uint64EntryWidget = function (_disposable_1$RefCoun) {
    _inherits(Uint64EntryWidget, _disposable_1$RefCoun);

    function Uint64EntryWidget() {
        _classCallCheck(this, Uint64EntryWidget);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Uint64EntryWidget).call(this));

        _this.element = document.createElement('form');
        _this.label = document.createElement('label');
        _this.input = document.createElement('input');
        _this.value = new uint64_1.Uint64();
        _this.valueEntered = new signals_1.Signal();
        var element = _this.element;
        var label = _this.label;
        var input = _this.input;

        element.className = 'uint64-entry noselect';
        element.appendChild(label);
        label.appendChild(input);
        _this.registerEventListener(element, 'submit', event => {
            event.preventDefault();
            if (_this.validateInput()) {
                _this.input.value = '';
                _this.input.classList.remove('valid-input', 'invalid-input');
                _this.valueEntered.dispatch(_this.value);
            }
        });
        _this.registerEventListener(element, 'input', () => {
            if (_this.input.value === '') {
                _this.input.classList.remove('valid-input', 'invalid-input');
                return;
            }
            if (_this.validateInput()) {
                _this.input.classList.remove('invalid-input');
            } else {
                _this.input.classList.add('invalid-input');
            }
        });
        return _this;
    }

    _createClass(Uint64EntryWidget, [{
        key: 'validateInput',
        value: function validateInput() {
            return this.value.parseString(this.input.value);
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            dom_1.removeFromParent(this.element);
        }
    }]);

    return Uint64EntryWidget;
}(disposable_1.RefCounted);

exports.Uint64EntryWidget = Uint64EntryWidget;
;

/***/ },
/* 102 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 103 */
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

var disposable_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(10);
__webpack_require__(104);

var RangeWidget = function (_disposable_1$RefCoun) {
    _inherits(RangeWidget, _disposable_1$RefCoun);

    function RangeWidget(value) {
        var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var _ref$min = _ref.min;
        var min = _ref$min === undefined ? 0 : _ref$min;
        var _ref$max = _ref.max;
        var max = _ref$max === undefined ? 1 : _ref$max;
        var _ref$step = _ref.step;
        var step = _ref$step === undefined ? 0.01 : _ref$step;

        _classCallCheck(this, RangeWidget);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RangeWidget).call(this));

        _this.value = value;
        _this.element = document.createElement('label');
        _this.promptElement = document.createElement('span');
        _this.inputElement = document.createElement('input');
        var element = _this.element;
        var promptElement = _this.promptElement;
        var inputElement = _this.inputElement;

        element.className = 'range-slider';
        promptElement.className = 'range-prompt';
        inputElement.type = 'range';
        inputElement.min = '' + min;
        inputElement.max = '' + max;
        inputElement.step = '' + step;
        inputElement.valueAsNumber = _this.value.value;
        element.appendChild(promptElement);
        element.appendChild(inputElement);
        var inputValueChanged = () => {
            _this.value.value = _this.inputElement.valueAsNumber;
        };
        _this.registerEventListener(inputElement, 'change', inputValueChanged);
        _this.registerEventListener(inputElement, 'input', inputValueChanged);
        _this.registerEventListener(inputElement, 'wheel', event => {
            var deltaY = event.deltaY;

            if (deltaY > 0) {
                _this.inputElement.stepUp();
                inputValueChanged();
            } else if (deltaY < 0) {
                _this.inputElement.stepDown();
                inputValueChanged();
            }
        });
        value.changed.add(() => {
            _this.inputElement.valueAsNumber = _this.value.value;
        });
        return _this;
    }

    _createClass(RangeWidget, [{
        key: 'disposed',
        value: function disposed() {
            dom_1.removeFromParent(this.element);
        }
    }]);

    return RangeWidget;
}(disposable_1.RefCounted);

exports.RangeWidget = RangeWidget;
;

/***/ },
/* 104 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 105 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 106 */
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

var layer_1 = __webpack_require__(40);
var image_renderlayer_1 = __webpack_require__(107);
var layer_specification_1 = __webpack_require__(86);

var ImageUserLayer = function (_layer_1$UserLayer) {
    _inherits(ImageUserLayer, _layer_1$UserLayer);

    function ImageUserLayer(manager, x) {
        _classCallCheck(this, ImageUserLayer);

        var volumePath = x['source'];
        if (typeof volumePath !== 'string') {
            throw new Error('Invalid image layer specification');
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageUserLayer).call(this, []));

        _this.volumePath = volumePath;
        _this.addRenderLayer(new image_renderlayer_1.ImageRenderLayer(manager.chunkManager, layer_specification_1.getVolumeWithStatusMessage(volumePath)));
        return _this;
    }

    _createClass(ImageUserLayer, [{
        key: 'toJSON',
        value: function toJSON() {
            var x = { 'type': 'image' };
            x['source'] = this.volumePath;
            return x;
        }
    }, {
        key: 'makeDropdown',
        value: function makeDropdown(element) {
            return null;
        }
    }]);

    return ImageUserLayer;
}(layer_1.UserLayer);

exports.ImageUserLayer = ImageUserLayer;
;

/***/ },
/* 107 */
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

var renderlayer_1 = __webpack_require__(39);

var ImageRenderLayer = function (_renderlayer_1$Render) {
    _inherits(ImageRenderLayer, _renderlayer_1$Render);

    function ImageRenderLayer() {
        _classCallCheck(this, ImageRenderLayer);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ImageRenderLayer).apply(this, arguments));
    }

    _createClass(ImageRenderLayer, [{
        key: 'getShaderKey',
        value: function getShaderKey() {
            return 'sliceview.ImageRenderLayer';
        }
    }, {
        key: 'defineShader',
        value: function defineShader(builder) {
            _get(Object.getPrototypeOf(ImageRenderLayer.prototype), 'defineShader', this).call(this, builder);
            builder.setFragmentMain(`
float value = getDataValue();
emit(vec4(value, value, value, 0.7));
`);
        }
    }]);

    return ImageRenderLayer;
}(renderlayer_1.RenderLayer);

exports.ImageRenderLayer = ImageRenderLayer;
;

/***/ },
/* 108 */
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

var debounce = __webpack_require__(44);
var disposable_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(10);
var dropdown_1 = __webpack_require__(109);
var keyboard_shortcut_handler_1 = __webpack_require__(84);
var longest_common_prefix_1 = __webpack_require__(110);
var promise_1 = __webpack_require__(6);
var scroll_into_view_1 = __webpack_require__(111);
var associate_label_1 = __webpack_require__(112);
var signals_1 = __webpack_require__(38);
__webpack_require__(113);
var ACTIVE_COMPLETION_CLASS_NAME = 'autocomplete-completion-active';
var AUTOCOMPLETE_INDEX_SYMBOL = Symbol('autocompleteIndex');
function makeDefaultCompletionElement(completion) {
    var element = document.createElement('div');
    element.textContent = completion.value;
    return element;
}
exports.makeDefaultCompletionElement = makeDefaultCompletionElement;
function makeCompletionElementWithDescription(completion) {
    var element = document.createElement('div');
    element.className = 'autocomplete-completion-with-description';
    element.textContent = completion.value;
    var descriptionElement = document.createElement('div');
    descriptionElement.className = 'autocomplete-completion-description';
    descriptionElement.textContent = completion.description || '';
    element.appendChild(descriptionElement);
    return element;
}
exports.makeCompletionElementWithDescription = makeCompletionElementWithDescription;
var KEY_MAP = new keyboard_shortcut_handler_1.KeySequenceMap({
    'arrowdown': 'cycle-next-active-completion',
    'arrowup': 'cycle-prev-active-completion',
    'tab': 'choose-active-completion-or-prefix',
    'enter': 'choose-active-completion'
});
var KEY_COMMANDS = new Map([['cycle-next-active-completion', function () {
    this.cycleActiveCompletion(+1);
    return true;
}], ['cycle-prev-active-completion', function () {
    this.cycleActiveCompletion(-1);
    return true;
}], ['choose-active-completion-or-prefix', function () {
    return this.selectActiveCompletion( /*allowPrefix=*/true);
}], ['choose-active-completion', function () {
    return this.selectActiveCompletion( /*allowPrefix=*/false);
}]]);
var DEFAULT_COMPLETION_DELAY = 200; // milliseconds

var AutocompleteTextInput = function (_disposable_1$RefCoun) {
    _inherits(AutocompleteTextInput, _disposable_1$RefCoun);

    function AutocompleteTextInput(options) {
        _classCallCheck(this, AutocompleteTextInput);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AutocompleteTextInput).call(this));

        _this.inputChanged = new signals_1.Signal();
        _this.prevInputValue = '';
        _this.completionsVisible = false;
        _this.activeCompletionPromise = null;
        _this.hasFocus = false;
        _this.completionResult = null;
        _this.dropdownContentsStale = true;
        _this.updateHintScrollPositionTimer = null;
        _this.completionElements = null;
        _this.hasResultForDropdown = false;
        _this.commonPrefix = '';
        /**
         * Index of the active completion.  The active completion is displayed as the hint text and is
         * highlighted in the dropdown.
         */
        _this.activeIndex = -1;
        _this.dropdownStyleStale = true;
        _this.completer = options.completer;
        var _options$delay = options.delay;
        var delay = _options$delay === undefined ? DEFAULT_COMPLETION_DELAY : _options$delay;

        var debouncedCompleter = _this.scheduleUpdateCompletions = debounce(() => {
            var activeCompletionPromise = _this.activeCompletionPromise = _this.completer(_this.value);
            if (activeCompletionPromise !== null) {
                activeCompletionPromise.then(completionResult => {
                    if (_this.activeCompletionPromise === activeCompletionPromise) {
                        _this.setCompletions(completionResult);
                        _this.activeCompletionPromise = null;
                    }
                });
            }
        }, delay);
        _this.registerDisposer(() => {
            debouncedCompleter.cancel();
        });
        var element = _this.element = document.createElement('div');
        element.className = 'autocomplete';
        var dropdownAndInputWrapper = document.createElement('div');
        dropdownAndInputWrapper.className = 'autocomplete-dropdown-wrapper';
        var dropdownElement = _this.dropdownElement = document.createElement('div');
        dropdownElement.className = 'autocomplete-dropdown';
        var promptElement = _this.promptElement = document.createElement('label');
        promptElement.className = 'autocomplete-prompt';
        var inputWrapperElement = _this.inputWrapperElement = document.createElement('div');
        inputWrapperElement.className = 'autocomplete-input-wrapper';
        element.appendChild(promptElement);
        var inputElement = _this.inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.autocomplete = 'off';
        inputElement.spellcheck = false;
        inputElement.className = 'autocomplete-input';
        associate_label_1.associateLabelWithElement(promptElement, inputElement);
        var hintElement = _this.hintElement = document.createElement('input');
        hintElement.type = 'text';
        hintElement.spellcheck = false;
        hintElement.className = 'autocomplete-hint';
        hintElement.disabled = true;
        inputWrapperElement.appendChild(hintElement);
        inputWrapperElement.appendChild(inputElement);
        dropdownAndInputWrapper.appendChild(inputWrapperElement);
        dropdownAndInputWrapper.appendChild(dropdownElement);
        element.appendChild(dropdownAndInputWrapper);
        _this.registerInputHandler();
        _this.handleInputChanged('');
        _this.registerEventListener(_this.inputElement, 'focus', () => {
            if (!_this.hasFocus) {
                _this.hasFocus = true;
                _this.dropdownStyleStale = true;
                _this.updateDropdown();
            }
        });
        _this.registerEventListener(_this.inputElement, 'blur', () => {
            if (_this.hasFocus) {
                _this.hasFocus = false;
                _this.updateDropdown();
            }
        });
        _this.registerEventListener(element.ownerDocument.defaultView, 'resize', () => {
            _this.dropdownStyleStale = true;
        });
        _this.registerEventListener(element.ownerDocument.defaultView, 'scroll', () => {
            _this.dropdownStyleStale = true;
        });
        _this.registerEventListener(_this.dropdownElement, 'mousedown', _this.handleDropdownMousedown.bind(_this));
        _this.registerEventListener(_this.inputElement, 'keydown', () => {
            // User may have used a keyboard shortcut to scroll the input.
            _this.hintScrollPositionMayBeStale();
        });
        _this.registerEventListener(_this.inputElement, 'mousemove', event => {
            if (event.buttons !== 0) {
                // May be dragging the text, which could cause scrolling.  This is not perfect, because we
                // don't detect mouse movements outside of the input box.
                _this.hintScrollPositionMayBeStale();
            }
        });
        var keyboardHandler = _this.keyboardHandler = _this.registerDisposer(new keyboard_shortcut_handler_1.KeyboardShortcutHandler(inputElement, KEY_MAP, _this.handleKeyCommand.bind(_this)));
        keyboardHandler.allShortcutsAreGlobal = true;
        return _this;
    }

    _createClass(AutocompleteTextInput, [{
        key: 'hintScrollPositionMayBeStale',
        value: function hintScrollPositionMayBeStale() {
            if (this.hintElement.value !== '') {
                this.scheduleUpdateHintScrollPosition();
            }
        }
    }, {
        key: 'handleDropdownMousedown',
        value: function handleDropdownMousedown(event) {
            this.inputElement.focus();
            var dropdownElement = this.dropdownElement;

            for (var target = event.target; target instanceof HTMLElement; target = target.parentElement) {
                var index = target[AUTOCOMPLETE_INDEX_SYMBOL];
                if (index !== undefined) {
                    this.selectCompletion(index);
                    break;
                }
                if (target === dropdownElement) {
                    break;
                }
            }
            event.preventDefault();
        }
    }, {
        key: 'cycleActiveCompletion',
        value: function cycleActiveCompletion(delta) {
            if (this.completionResult === null) {
                return;
            }
            var activeIndex = this.activeIndex;

            var numCompletions = this.completionResult.completions.length;
            if (activeIndex === -1) {
                if (delta > 0) {
                    activeIndex = 0;
                } else {
                    activeIndex = numCompletions - 1;
                }
            } else {
                activeIndex = (activeIndex + delta + numCompletions) % numCompletions;
            }
            this.setActiveIndex(activeIndex);
        }
    }, {
        key: 'handleKeyCommand',
        value: function handleKeyCommand(action) {
            return KEY_COMMANDS.get(action).call(this);
        }
    }, {
        key: 'registerInputHandler',
        value: function registerInputHandler() {
            var handler = event => {
                var value = this.inputElement.value;
                if (value !== this.prevInputValue) {
                    this.prevInputValue = value;
                    this.handleInputChanged(value);
                }
            };
            for (var eventType of ['input']) {
                this.registerEventListener(this.inputElement, eventType, handler, /*useCapture=*/false);
            }
        }
    }, {
        key: 'shouldShowDropdown',
        value: function shouldShowDropdown() {
            var completionResult = this.completionResult;

            if (completionResult === null || !this.hasFocus) {
                return false;
            }
            return this.hasResultForDropdown;
        }
    }, {
        key: 'updateDropdownStyle',
        value: function updateDropdownStyle() {
            var element = this.element;
            var dropdownElement = this.dropdownElement;
            var inputElement = this.inputElement;

            dropdown_1.positionDropdown(dropdownElement, inputElement, { horizontal: false });
            this.dropdownStyleStale = false;
        }
    }, {
        key: 'updateDropdown',
        value: function updateDropdown() {
            var _this2 = this;

            if (this.shouldShowDropdown()) {
                (function () {
                    var dropdownElement = _this2.dropdownElement;
                    var activeIndex = _this2.activeIndex;

                    if (_this2.dropdownContentsStale) {
                        (function () {
                            var completionResult = _this2.completionResult;
                            var _completionResult$mak = completionResult.makeElement;
                            var makeElement = _completionResult$mak === undefined ? makeDefaultCompletionElement : _completionResult$mak;

                            _this2.completionElements = completionResult.completions.map((completion, index) => {
                                var completionElement = makeElement.call(completionResult, completion);
                                completionElement[AUTOCOMPLETE_INDEX_SYMBOL] = index;
                                completionElement.classList.add('autocomplete-completion');
                                if (activeIndex === index) {
                                    completionElement.classList.add(ACTIVE_COMPLETION_CLASS_NAME);
                                }
                                dropdownElement.appendChild(completionElement);
                                return completionElement;
                            });
                            _this2.dropdownContentsStale = false;
                        })();
                    }
                    if (_this2.dropdownStyleStale) {
                        _this2.updateDropdownStyle();
                    }
                    if (!_this2.completionsVisible) {
                        dropdownElement.style.display = 'block';
                        _this2.completionsVisible = true;
                    }
                    if (activeIndex !== -1) {
                        var completionElement = _this2.completionElements[activeIndex];
                        scroll_into_view_1.scrollIntoViewIfNeeded(completionElement);
                    }
                })();
            } else if (this.completionsVisible) {
                this.dropdownElement.style.display = 'none';
                this.completionsVisible = false;
            }
        }
    }, {
        key: 'setCompletions',
        value: function setCompletions(completionResult) {
            this.clearCompletions();
            var completions = completionResult.completions;

            if (completions.length === 0) {
                return;
            }
            this.completionResult = completionResult;
            if (completions.length === 1) {
                var completion = completions[0];
                if (completionResult.showSingleResult) {
                    this.hasResultForDropdown = true;
                } else {
                    var value = this.prevInputValue;
                    if (!completion.value.startsWith(value)) {
                        this.hasResultForDropdown = true;
                    } else {
                        this.hasResultForDropdown = false;
                    }
                }
                this.setActiveIndex(0);
            } else {
                this.hasResultForDropdown = true;
                // Check for a common prefix.
                var commonResultPrefix = longest_common_prefix_1.longestCommonPrefix(function* () {
                    for (var _completion of completionResult.completions) {
                        yield _completion.value;
                    }
                }());
                var commonPrefix = this.getCompletedValue(commonResultPrefix);
                var _value = this.prevInputValue;
                if (commonPrefix.startsWith(_value)) {
                    this.commonPrefix = commonPrefix;
                    this.setHintValue(commonPrefix);
                }
            }
            this.updateDropdown();
        }
    }, {
        key: 'scheduleUpdateHintScrollPosition',
        value: function scheduleUpdateHintScrollPosition() {
            if (this.updateHintScrollPositionTimer === null) {
                this.updateHintScrollPositionTimer = setTimeout(() => {
                    this.updateHintScrollPosition();
                }, 0);
            }
        }
    }, {
        key: 'setHintValue',
        value: function setHintValue(hintValue) {
            var value = this.prevInputValue;
            if (hintValue === value || !hintValue.startsWith(value)) {
                // If the hint value is identical to the current value, there is no need to show it.  Also,
                // if it is not a prefix of the current value, then we cannot show it either.
                hintValue = '';
            }
            this.hintElement.value = hintValue;
            this.scheduleUpdateHintScrollPosition();
        }
        /**
         * This sets the active completion, which causes it to be highlighted and displayed as the hint.
         * Additionally, if the user hits tab then it is chosen.
         */

    }, {
        key: 'setActiveIndex',
        value: function setActiveIndex(index) {
            if (!this.dropdownContentsStale) {
                var activeIndex = this.activeIndex;

                if (activeIndex !== -1) {
                    this.completionElements[activeIndex].classList.remove(ACTIVE_COMPLETION_CLASS_NAME);
                }
                if (index !== -1) {
                    var completionElement = this.completionElements[index];
                    completionElement.classList.add(ACTIVE_COMPLETION_CLASS_NAME);
                    scroll_into_view_1.scrollIntoViewIfNeeded(completionElement);
                }
            }
            if (index !== -1) {
                this.setHintValue(this.getCompletedValueByIndex(index));
            }
            this.activeIndex = index;
        }
    }, {
        key: 'getCompletedValueByIndex',
        value: function getCompletedValueByIndex(index) {
            return this.getCompletedValue(this.completionResult.completions[index].value);
        }
    }, {
        key: 'getCompletedValue',
        value: function getCompletedValue(completionValue) {
            var completionResult = this.completionResult;

            var value = this.prevInputValue;
            return value.substring(0, completionResult.offset) + completionValue;
        }
    }, {
        key: 'selectActiveCompletion',
        value: function selectActiveCompletion(allowPrefix) {
            var activeIndex = this.activeIndex;

            if (activeIndex === -1) {
                if (!allowPrefix) {
                    return false;
                }
                var commonPrefix = this.commonPrefix;

                if (commonPrefix.length > this.value.length) {
                    this.value = commonPrefix;
                    return true;
                }
                return false;
            }
            var newValue = this.getCompletedValueByIndex(activeIndex);
            if (this.value === newValue) {
                return false;
            }
            this.value = newValue;
            return true;
        }
    }, {
        key: 'selectCompletion',
        value: function selectCompletion(index) {
            this.value = this.getCompletedValueByIndex(index);
        }
        /**
         * Updates the hintElement scroll position to match the scroll position of inputElement.
         *
         * This is called asynchronously after the input changes because automatic scrolling appears to
         * take place after the 'input' event fires.
         */

    }, {
        key: 'updateHintScrollPosition',
        value: function updateHintScrollPosition() {
            this.updateHintScrollPositionTimer = null;
            this.hintElement.scrollLeft = this.inputElement.scrollLeft;
        }
    }, {
        key: 'cancelActiveCompletion',
        value: function cancelActiveCompletion() {
            promise_1.cancelPromise(this.activeCompletionPromise);
            this.activeCompletionPromise = null;
        }
    }, {
        key: 'handleInputChanged',
        value: function handleInputChanged(value) {
            this.cancelActiveCompletion();
            this.hintElement.value = '';
            this.clearCompletions();
            this.inputChanged.dispatch(value);
            this.scheduleUpdateCompletions();
        }
    }, {
        key: 'clearCompletions',
        value: function clearCompletions() {
            if (this.completionResult !== null) {
                this.activeIndex = -1;
                this.completionResult = null;
                this.completionElements = null;
                this.dropdownContentsStale = true;
                this.dropdownStyleStale = true;
                this.commonPrefix = '';
                dom_1.removeChildren(this.dropdownElement);
                this.updateDropdown();
            }
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            dom_1.removeFromParent(this.element);
            this.cancelActiveCompletion();
            if (this.updateHintScrollPositionTimer !== null) {
                clearTimeout(this.updateHintScrollPositionTimer);
                this.updateHintScrollPositionTimer = null;
            }
        }
    }, {
        key: 'disabled',
        get: function () {
            return this.inputElement.disabled;
        },
        set: function (value) {
            this.inputElement.disabled = value;
        }
    }, {
        key: 'value',
        get: function () {
            return this.prevInputValue;
        },
        set: function (value) {
            if (value !== this.prevInputValue) {
                this.inputElement.value = value;
                this.prevInputValue = value;
                this.handleInputChanged(value);
            }
        }
    }]);

    return AutocompleteTextInput;
}(disposable_1.RefCounted);

exports.AutocompleteTextInput = AutocompleteTextInput;
;

/***/ },
/* 109 */
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
 * Utilities for positioning dropdown menus.
 */

function positionDropdown(dropdownElement, associatedElement) {
    var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var _ref$horizontal = _ref.horizontal;
    var horizontal = _ref$horizontal === undefined ? false : _ref$horizontal;
    var _ref$vertical = _ref.vertical;
    var vertical = _ref$vertical === undefined ? true : _ref$vertical;
    var _ref$topMargin = _ref.topMargin;
    var topMargin = _ref$topMargin === undefined ? 6 : _ref$topMargin;
    var _ref$bottomMargin = _ref.bottomMargin;
    var bottomMargin = _ref$bottomMargin === undefined ? 6 : _ref$bottomMargin;
    var _ref$leftMargin = _ref.leftMargin;
    var leftMargin = _ref$leftMargin === undefined ? 6 : _ref$leftMargin;
    var _ref$rightMargin = _ref.rightMargin;
    var rightMargin = _ref$rightMargin === undefined ? 6 : _ref$rightMargin;
    var _ref$maxHeight = _ref.maxHeight;
    var maxHeight = _ref$maxHeight === undefined ? true : _ref$maxHeight;
    var _ref$maxWidth = _ref.maxWidth;
    var maxWidth = _ref$maxWidth === undefined ? true : _ref$maxWidth;

    var rect = associatedElement.getBoundingClientRect();
    if (horizontal) {
        var viewportWidth = dropdownElement.ownerDocument.documentElement.clientHeight;
        var distanceLeft = rect.right;
        var distanceRight = viewportWidth - rect.left;
        if (distanceLeft > distanceRight) {
            dropdownElement.style.left = '';
            dropdownElement.style.right = '0';
            if (maxWidth) {
                dropdownElement.style.maxWidth = distanceLeft - leftMargin + 'px';
            }
        } else {
            dropdownElement.style.right = '';
            dropdownElement.style.left = '0';
            if (maxWidth) {
                dropdownElement.style.maxWidth = distanceRight - rightMargin + 'px';
            }
        }
    }
    if (vertical) {
        var viewportHeight = dropdownElement.ownerDocument.documentElement.clientHeight;
        var distanceToTop = rect.top - topMargin;
        var distanceToBottom = viewportHeight - rect.bottom - bottomMargin;
        if (distanceToTop > distanceToBottom * 3) {
            dropdownElement.style.top = '';
            dropdownElement.style.bottom = '100%';
            if (maxHeight) {
                dropdownElement.style.maxHeight = distanceToTop + 'px';
            }
        } else {
            dropdownElement.style.top = '100%';
            dropdownElement.style.bottom = '';
            if (maxHeight) {
                dropdownElement.style.maxHeight = distanceToBottom + 'px';
            }
        }
    }
}
exports.positionDropdown = positionDropdown;

/***/ },
/* 110 */
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
 * Returns the longest common prefix of a sequence of strings.
 *
 * Returns '' if the sequence of strings is empty.
 */

function longestCommonPrefix(strings) {
    var it = strings[Symbol.iterator]();

    var _it$next = it.next();

    var firstValue = _it$next.value;
    var noValues = _it$next.done;

    if (noValues) {
        // The sequence of strings is empty.
        return '';
    }
    var commonPrefixLength = firstValue.length;
    while (commonPrefixLength > 0) {
        var _it$next2 = it.next();

        var value = _it$next2.value;
        var done = _it$next2.done;

        if (done) {
            break;
        }
        var i = 0;
        for (; i < commonPrefixLength; ++i) {
            if (firstValue.charCodeAt(i) !== value.charCodeAt(i)) {
                break;
            }
        }
        commonPrefixLength = i;
    }
    return firstValue.substring(0, commonPrefixLength);
}
exports.longestCommonPrefix = longestCommonPrefix;

/***/ },
/* 111 */
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

function scrollIntoViewIfNeeded(element) {
    var parent = element.parentElement;
    var elementLeft = element.offsetLeft - parent.clientLeft;
    var elementTop = element.offsetTop - parent.clientTop;
    var elementRight = elementLeft + element.offsetWidth;
    var elementBottom = elementTop + element.offsetHeight;
    var parentWidth = parent.clientWidth;
    var parentHeight = parent.clientHeight;
    var viewportLeft = parent.scrollLeft;
    var viewportRight = viewportLeft + parentWidth;
    var viewportTop = parent.scrollTop;
    var viewportBottom = viewportTop + parentHeight;
    var scrollLeftDelta = Math.max(0.0, elementRight - viewportRight) || Math.min(0.0, elementLeft - viewportLeft);
    var scrollTopDelta = Math.max(0.0, elementBottom - viewportBottom) || Math.min(0.0, elementTop - viewportTop);
    parent.scrollLeft += scrollLeftDelta;
    parent.scrollTop += scrollTopDelta;
}
exports.scrollIntoViewIfNeeded = scrollIntoViewIfNeeded;

/***/ },
/* 112 */
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

var nextElementId = 0;
function associateLabelWithElement(label, element) {
    if (element.id === '') {
        element.id = `unique-id-for-association-${ nextElementId++ }`;
    }
    label.setAttribute('for', element.id);
}
exports.associateLabelWithElement = associateLabelWithElement;

/***/ },
/* 113 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 114 */
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
 * This creates a form submit button that is not displayed, in order that the form may be submitted
 * using the enter key.
 */

function makeHiddenSubmitButton() {
  var element = document.createElement('button');
  element.type = 'submit';
  element.className = 'hidden-submit-button';
  // We apply these styles directly to the element rather than by styling the class in order to
  // avoid them being overridden accidentally.
  element.style.margin = '0';
  element.style.border = '0';
  element.style.padding = '0';
  element.style.width = '0';
  element.style.height = '0';
  element.style.overflow = 'hidden';
  element.tabIndex = -1;
  return element;
}
exports.makeHiddenSubmitButton = makeHiddenSubmitButton;

/***/ },
/* 115 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 116 */
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

var layer_specification_1 = __webpack_require__(86);
var disposable_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(10);
var dropdown_1 = __webpack_require__(109);
var sortablejs_es6_1 = __webpack_require__(117);
var layer_dialog_1 = __webpack_require__(82);
__webpack_require__(119);

var LayerWidget = function (_disposable_1$RefCoun) {
    _inherits(LayerWidget, _disposable_1$RefCoun);

    function LayerWidget(layer, panel) {
        _classCallCheck(this, LayerWidget);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerWidget).call(this));

        _this.layer = layer;
        _this.panel = panel;
        var element = _this.element = document.createElement('span');
        element.className = 'layer-item-parent noselect';
        var widgetElement = _this.widgetElement = document.createElement('span');
        widgetElement.className = 'layer-item noselect';
        element.appendChild(widgetElement);
        var labelElement = _this.labelElement = document.createElement('span');
        labelElement.className = 'layer-item-label';
        var layerNumberElement = _this.layerNumberElement = document.createElement('span');
        layerNumberElement.className = 'layer-item-number';
        var valueElement = _this.valueElement = document.createElement('span');
        valueElement.className = 'layer-item-value';
        var closeElement = document.createElement('span');
        closeElement.title = 'Delete layer';
        closeElement.className = 'layer-item-close';
        _this.registerEventListener(closeElement, 'click', event => {
            _this.panel.layerManager.removeManagedLayer(_this.layer);
        });
        widgetElement.appendChild(layerNumberElement);
        widgetElement.appendChild(labelElement);
        widgetElement.appendChild(valueElement);
        widgetElement.appendChild(closeElement);
        _this.registerEventListener(widgetElement, 'click', event => {
            layer.setVisible(!layer.visible);
        });
        _this.registerEventListener(widgetElement, 'dblclick', event => {
            if (layer instanceof layer_specification_1.ManagedUserLayerWithSpecification) {
                new layer_dialog_1.LayerDialog(_this.panel.manager, layer);
            }
        });
        var dropdownElement = _this.dropdownElement = document.createElement('div');
        _this.registerEventListener(dropdownElement, 'mousedown', event => {
            // Prevent clicks on the dropdown from triggering dragging.
            event.stopPropagation();
        });
        _this.setupDropdownElement();
        _this.handleLayerChanged();
        _this.registerSignalBinding(layer.layerChanged.add(_this.handleLayerChanged, _this));
        element.appendChild(dropdownElement);
        _this.registerEventListener(element, 'mouseover', () => {
            _this.hovering = true;
            _this.updateDropdownState();
        });
        _this.registerEventListener(element, 'mouseout', () => {
            _this.hovering = false;
            _this.updateDropdownState();
        });
        return _this;
    }

    _createClass(LayerWidget, [{
        key: 'updateDropdownState',
        value: function updateDropdownState() {
            if (this.hovering && !this.panel.dragging && this.dropdownElement.childElementCount > 0) {
                this.dropdownElement.style.display = 'flex';
                dropdown_1.positionDropdown(this.dropdownElement, this.widgetElement);
            } else {
                this.dropdownElement.style.display = 'none';
            }
        }
    }, {
        key: 'setupDropdownElement',
        value: function setupDropdownElement() {
            this.dropdownElement.className = 'layer-dropdown';
        }
    }, {
        key: 'update',
        value: function update() {
            var layer = this.layer;

            this.labelElement.textContent = layer.name;
            this.widgetElement.setAttribute('layer-visible', layer.visible.toString());
        }
    }, {
        key: 'handleLayerChanged',
        value: function handleLayerChanged() {
            var layer = this.layer;

            var userLayer = layer.layer;
            if (userLayer !== this.userLayer) {
                if (this.dropdown) {
                    this.dropdown.dispose();
                    dom_1.removeChildren(this.dropdownElement);
                    this.setupDropdownElement();
                }
                this.userLayer = userLayer;
                if (userLayer) {
                    this.dropdown = userLayer.makeDropdown(this.dropdownElement);
                } else {
                    this.dropdown = null;
                }
            }
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            if (this.dropdown) {
                this.dropdown.dispose();
            }
            this.element.parentElement.removeChild(this.element);
        }
    }]);

    return LayerWidget;
}(disposable_1.RefCounted);

var LayerPanel = function (_disposable_1$RefCoun2) {
    _inherits(LayerPanel, _disposable_1$RefCoun2);

    function LayerPanel(element, manager) {
        _classCallCheck(this, LayerPanel);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(LayerPanel).call(this));

        _this2.element = element;
        _this2.manager = manager;
        _this2.layerWidgets = new Map();
        _this2.layerUpdateNeeded = true;
        _this2.valueUpdateNeeded = false;
        _this2.dragging = false;
        element.className = 'layer-panel';
        _this2.registerSignalBinding(manager.layerSelectedValues.changed.add(_this2.handleLayerValuesChanged, _this2));
        _this2.registerSignalBinding(manager.layerManager.layersChanged.add(_this2.handleLayersChanged, _this2));
        var addButton = _this2.addButton = document.createElement('button');
        addButton.className = 'layer-add-button';
        addButton.title = 'Add layer';
        _this2.registerEventListener(addButton, 'click', () => {
            _this2.addLayerMenu();
        });
        element.appendChild(addButton);
        _this2.update();
        var sortable = new sortablejs_es6_1.Sortable(_this2.element, {
            draggable: '.layer-item-parent',
            onStart: evt => {
                _this2.dragging = true;
                _this2.element.classList.add('sorting-in-progress');
            },
            onEnd: evt => {
                _this2.dragging = false;
                _this2.element.classList.remove('sorting-in-progress');
                _this2.layerManager.reorderManagedLayer(evt.oldIndex, evt.newIndex);
            },
            onMove: evt => {
                return evt.related !== _this2.addButton;
            }
        });
        _this2.registerDisposer(() => {
            sortable.destroy();
        });
        return _this2;
    }

    _createClass(LayerPanel, [{
        key: 'setDragging',
        value: function setDragging(value) {
            this.dragging = value;
            for (var widget of this.layerWidgets.values()) {
                widget.updateDropdownState();
            }
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.layerWidgets.forEach(x => x.dispose());
            this.layerWidgets = null;
        }
    }, {
        key: 'handleLayersChanged',
        value: function handleLayersChanged() {
            this.layerUpdateNeeded = true;
            this.handleLayerValuesChanged();
        }
    }, {
        key: 'handleLayerValuesChanged',
        value: function handleLayerValuesChanged() {
            if (!this.valueUpdateNeeded) {
                this.valueUpdateNeeded = true;
                requestAnimationFrame(this.update.bind(this));
            }
        }
    }, {
        key: 'update',
        value: function update() {
            this.valueUpdateNeeded = false;
            this.updateLayers();
            var values = this.manager.layerSelectedValues;
            for (var _ref3 of this.layerWidgets) {
                var _ref2 = _slicedToArray(_ref3, 2);

                var layer = _ref2[0];
                var widget = _ref2[1];

                var value = values.get(layer.layer);
                var text = '';
                if (value !== undefined) {
                    text = '' + value;
                }
                widget.valueElement.textContent = text;
            }
        }
    }, {
        key: 'updateLayers',
        value: function updateLayers() {
            if (!this.layerUpdateNeeded) {
                return;
            }
            this.layerUpdateNeeded = false;
            var container = this.element;
            var layers = new Set();
            var nextChild = container.firstElementChild;
            this.manager.layerManager.managedLayers.forEach((layer, layerIndex) => {
                layers.add(layer);
                var widget = this.layerWidgets.get(layer);
                if (widget === undefined) {
                    widget = new LayerWidget(layer, this);
                    this.layerWidgets.set(layer, widget);
                }
                widget.layerNumberElement.textContent = '' + (1 + layerIndex);
                widget.update();
                var _widget = widget;
                var element = _widget.element;

                if (element !== nextChild) {
                    container.insertBefore(widget.element, this.addButton);
                }
            });
            for (var _ref6 of this.layerWidgets) {
                var _ref5 = _slicedToArray(_ref6, 2);

                var layer = _ref5[0];
                var widget = _ref5[1];

                if (!layers.has(layer)) {
                    this.layerWidgets.delete(layer);
                    widget.dispose();
                }
            }
        }
    }, {
        key: 'addLayerMenu',
        value: function addLayerMenu() {
            // Automatically destroys itself when it exits.
            new layer_dialog_1.LayerDialog(this.manager);
        }
    }, {
        key: 'layerManager',
        get: function () {
            return this.manager.layerManager;
        }
    }]);

    return LayerPanel;
}(disposable_1.RefCounted);

exports.LayerPanel = LayerPanel;
;

/***/ },
/* 117 */
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

/**
 * This is a simple wrapper of sortablejs that is compatible with ES6 modules.
 */
exports.Sortable = __webpack_require__(118);


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */


(function (factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else if (typeof Package !== "undefined") {
		Sortable = factory();  // export for Meteor.js
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function () {
	"use strict";

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,

		scrollEl,
		scrollParentEl,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		RSPACE = /\s+/g,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,

		supportDraggable = !!('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		slice = [].slice,

		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							if (el === win) {
								win.scrollTo(win.pageXOffset + vx * speed, win.pageYOffset + vy * speed);
							} else {
								vy && (el.scrollTop += vy * speed);
								vx && (el.scrollLeft += vx * speed);
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			var group = options.group;

			if (!group || typeof group != 'object') {
				group = options.group = {name: group};
			}

			['pull', 'put'].forEach(function (key) {
				if (!(key in group)) {
					group[key] = true;
				}
			});

			options.groups = ' ' + group.name + (group.put.join ? ' ' + group.put.join(' ') : '') + ' ';
		}
	;



	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;


		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			ignore: 'a, img',
			filter: null,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = target,
				filter = options.filter;


			if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			// get the index of the dragged element within its parent
			oldIndex = _index(target);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, oldIndex);
					evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, oldIndex);
						return true;
					}
				});

				if (filter) {
					evt.preventDefault();
					return; // cancel dnd
				}
			}


			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}


			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				activeGroup = options.group;

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = true;

					// Chosen item
					_toggleClass(dragEl, _this.options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(touch);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}
			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Touch */touch) {
			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					document.selection.empty();
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				// Apply effect
				_toggleClass(dragEl, this.options.ghostClass, true);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
					parent = target,
					groupName = ' ' + this.options.group.name + '',
					i = touchDragOverListeners.length;

				if (parent) {
					do {
						if (parent[expando] && parent[expando].options.groups.indexOf(groupName) > -1) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				var touch = evt.touches ? evt.touches[0] : evt,
					dx = touch.clientX - tapEvt.clientX,
					dy = touch.clientY - tapEvt.clientY,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var dataTransfer = evt.dataTransfer,
				options = this.options;

			this._offUpEvents();

			if (activeGroup.pull == 'clone') {
				cloneEl = dragEl.cloneNode(true);
				_css(cloneEl, 'display', 'none');
				rootEl.insertBefore(cloneEl, dragEl);
			}

			if (useFallback) {

				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', this._onTouchMove);
					_on(document, 'touchend', this._onDrop);
					_on(document, 'touchcancel', this._onDrop);
				} else {
					// Old brwoser
					_on(document, 'mousemove', this._onTouchMove);
					_on(document, 'mouseup', this._onDrop);
				}

				this._loopId = setInterval(this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(this, dataTransfer, dragEl);
				}

				_on(document, 'drop', this);
				setTimeout(this._dragStarted, 0);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				revert,
				options = this.options,
				group = options.group,
				groupPut = group.put,
				isOwner = (activeGroup === group),
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			moved = true;

			if (activeGroup && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: activeGroup.pull && groupPut && (
						(activeGroup.name === group.name) || // by Name
						(groupPut.indexOf && ~groupPut.indexOf(activeGroup.name)) // by Array
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (revert) {
					_cloneHide(true);

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (target = _ghostIsLast(el, evt))
				) {

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}


					var targetRect = target.getBoundingClientRect(),
						width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = /left|right|inline/.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect),
						after
					;

					if (moveVector !== false) {
						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(isOwner);

						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}
						else if (floating) {
							var elTop = dragEl.offsetTop,
								tgTop = target.offsetTop;

							if (elTop === tgTop) {
								after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
							} else {
								after = tgTop > elTop;
							}
						} else {
							after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
						}

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode.removeChild(ghostEl);

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl);

						if (newIndex >= 0) {
							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);

							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						// Remove clone
						cloneEl && cloneEl.parentNode.removeChild(cloneEl);

						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						if (newIndex === null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

				// Nulling
				rootEl =
				dragEl =
				parentEl =
				ghostEl =
				nextEl =
				cloneEl =

				scrollEl =
				scrollParentEl =

				tapEvt =
				touchEvt =

				moved =
				newIndex =

				lastEl =
				lastCSS =

				activeGroup =
				Sortable.active = null;
			}
		},


		handleEvent: function (/**Event*/evt) {
			var type = evt.type;

			if (type === 'dragover' || type === 'dragenter') {
				if (dragEl) {
					this._onDragOver(evt);
					_globalDragOver(evt);
				}
			}
			else if (type === 'drop' || type === 'dragend') {
				this._onDrop(evt);
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(state) {
		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');
			!state && cloneEl.state && rootEl.insertBefore(cloneEl, dragEl);
			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			do {
				if (
					(tag === '>*' && el.parentNode === ctx) || (
						(tag === '' || el.nodeName.toUpperCase() == tag) &&
						(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
					)
				) {
					return el;
				}
			}
			while (el !== ctx && (el = el.parentNode));
		}

		return null;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, false);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, false);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(RSPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(RSPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
		var evt = document.createEvent('Event'),
			options = (sortable || rootEl[expando]).options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
				rect = lastEl.getBoundingClientRect();

		return ((evt.clientY - (rect.top + rect.height) > 5) || (evt.clientX - (rect.right + rect.width) > 5)) && lastEl; // min delta
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent
	 * @param  {HTMLElement} el
	 * @return {number}
	 */
	function _index(el) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if (el.nodeName.toUpperCase() !== 'TEMPLATE') {
				index++;
			}
		}

		return index;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}


	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		index: _index
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.4.2';
	return Sortable;
});


/***/ },
/* 119 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 120 */
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

function withFlex(value, handler) {
    return element => {
        element.style.flex = value;
        handler(element);
    };
}
exports.withFlex = withFlex;
function withStyle(style, handler) {
    return element => {
        Object.assign(element.style, style);
        handler(element);
    };
}
exports.withStyle = withStyle;
function withAttributes(attributes, handler) {
    return element => {
        Object.assign(element, attributes);
        handler(element);
    };
}
exports.withAttributes = withAttributes;
;
function box(flexDirection, spec) {
    return container => {
        container.style.display = 'flex';
        container.style.flexDirection = flexDirection;
        for (var handler of spec) {
            var element = container.ownerDocument.createElement('div');
            container.appendChild(element);
            handler(element);
        }
    };
}
exports.box = box;

/***/ },
/* 121 */
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

var signals_1 = __webpack_require__(38);
var disposable_1 = __webpack_require__(8);
var geom_1 = __webpack_require__(21);
var json_1 = __webpack_require__(11);

var VoxelSize = function (_disposable_1$RefCoun) {
    _inherits(VoxelSize, _disposable_1$RefCoun);

    function VoxelSize(voxelSize) {
        _classCallCheck(this, VoxelSize);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VoxelSize).call(this));

        _this.changed = new signals_1.Signal();
        var valid = true;
        if (voxelSize == null) {
            voxelSize = geom_1.vec3.create();
            valid = false;
        }
        _this.size = voxelSize;
        _this.valid = valid;
        return _this;
    }

    _createClass(VoxelSize, [{
        key: 'reset',
        value: function reset() {
            this.valid = false;
            this.changed.dispatch();
        }
        /**
         * This should be called after setting the voxel size initially.  The voxel
         * size should not be changed once it is valid.
         */

    }, {
        key: 'setValid',
        value: function setValid() {
            if (!this.valid) {
                this.valid = true;
                this.changed.dispatch();
            }
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            if (!this.valid) {
                return undefined;
            }
            return Array.prototype.slice.call(this.size);
        }
    }, {
        key: 'restoreState',
        value: function restoreState(obj) {
            try {
                json_1.parseFiniteVec(this.size, obj);
                this.setValid();
            } catch (e) {
                this.valid = false;
            }
        }
    }, {
        key: 'toString',
        value: function toString() {
            if (!this.valid) {
                return null;
            }
            return this.size.toString();
        }
    }, {
        key: 'voxelFromSpatial',
        value: function voxelFromSpatial(voxel, spatial) {
            geom_1.vec3.divide(voxel, spatial, this.size);
        }
    }, {
        key: 'spatialFromVoxel',
        value: function spatialFromVoxel(spatial, voxel) {
            geom_1.vec3.multiply(spatial, voxel, this.size);
        }
    }]);

    return VoxelSize;
}(disposable_1.RefCounted);

exports.VoxelSize = VoxelSize;
;
var tempVec3 = geom_1.vec3.create();

var SpatialPosition = function (_disposable_1$RefCoun2) {
    _inherits(SpatialPosition, _disposable_1$RefCoun2);

    function SpatialPosition(voxelSize, spatialCoordinates) {
        _classCallCheck(this, SpatialPosition);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SpatialPosition).call(this));

        _this2.voxelCoordinates = null;
        _this2.changed = new signals_1.Signal();
        if (voxelSize == null) {
            voxelSize = new VoxelSize();
        }
        _this2.voxelSize = voxelSize;
        var spatialCoordinatesValid = true;
        if (spatialCoordinates == null) {
            spatialCoordinates = geom_1.vec3.create();
            spatialCoordinatesValid = false;
        }
        _this2.spatialCoordinates = spatialCoordinates;
        _this2.spatialCoordinatesValid = spatialCoordinatesValid;
        _this2.registerDisposer(voxelSize);
        _this2.registerSignalBinding(voxelSize.changed.add(_this2.handleVoxelSizeChanged, _this2));
        return _this2;
    }

    _createClass(SpatialPosition, [{
        key: 'reset',
        value: function reset() {
            this.spatialCoordinatesValid = false;
            this.voxelCoordinates = null;
            this.changed.dispatch();
        }
    }, {
        key: 'getVoxelCoordinates',
        value: function getVoxelCoordinates(out) {
            var voxelCoordinates = this.voxelCoordinates;

            if (voxelCoordinates) {
                geom_1.vec3.copy(out, voxelCoordinates);
            } else if (this.valid) {
                this.voxelSize.voxelFromSpatial(out, this.spatialCoordinates);
            } else {
                return false;
            }
            return true;
        }
        /**
         * Sets this position to the spatial coordinats corresponding to the specified
         * voxelPosition.  If this.voxelSize.valid == false, then this position won't
         * be set until it is.
         */

    }, {
        key: 'setVoxelCoordinates',
        value: function setVoxelCoordinates(voxelCoordinates) {
            var voxelSize = this.voxelSize;
            if (voxelSize.valid) {
                voxelSize.spatialFromVoxel(this.spatialCoordinates, voxelCoordinates);
                this.markSpatialCoordinatesChanged();
            } else {
                var voxelCoordinates_ = this.voxelCoordinates;
                if (!voxelCoordinates_) {
                    this.voxelCoordinates = voxelCoordinates_ = geom_1.vec3.clone(voxelCoordinates);
                } else {
                    geom_1.vec3.copy(voxelCoordinates_, voxelCoordinates);
                }
            }
            this.changed.dispatch();
        }
    }, {
        key: 'markSpatialCoordinatesChanged',
        value: function markSpatialCoordinatesChanged() {
            this.spatialCoordinatesValid = true;
            this.voxelCoordinates = null;
            this.changed.dispatch();
        }
    }, {
        key: 'handleVoxelSizeChanged',
        value: function handleVoxelSizeChanged() {
            if (this.voxelCoordinates != null && !this.spatialCoordinatesValid) {
                this.voxelSize.spatialFromVoxel(this.spatialCoordinates, this.voxelCoordinates);
                this.spatialCoordinatesValid = true;
            }
            this.voxelCoordinates = null;
            this.changed.dispatch();
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            var empty = true;
            var voxelSizeJson = this.voxelSize.toJSON();
            var obj = {};
            if (voxelSizeJson !== undefined) {
                empty = false;
                obj['voxelSize'] = voxelSizeJson;
            }
            if (this.voxelCoordinatesValid) {
                var voxelCoordinates = tempVec3;
                this.getVoxelCoordinates(voxelCoordinates);
                obj['voxelCoordinates'] = Array.prototype.slice.call(voxelCoordinates);
                empty = false;
            } else if (this.spatialCoordinatesValid) {
                obj['spatialCoordinates'] = Array.prototype.slice.call(this.spatialCoordinates);
                empty = false;
            }
            if (empty) {
                return undefined;
            }
            return obj;
        }
    }, {
        key: 'restoreState',
        value: function restoreState(obj) {
            this.voxelSize.restoreState(obj['voxelSize']);
            this.spatialCoordinatesValid = false;
            if (obj.hasOwnProperty('voxelCoordinates')) {
                try {
                    var voxelCoordinates = geom_1.vec3.create();
                    json_1.parseFiniteVec(voxelCoordinates, obj['voxelCoordinates']);
                    this.setVoxelCoordinates(voxelCoordinates);
                } catch (e) {}
            }
            try {
                json_1.parseFiniteVec(this.spatialCoordinates, obj['spatialCoordinates']);
                this.markSpatialCoordinatesChanged();
            } catch (e) {}
        }
    }, {
        key: 'snapToVoxel',
        value: function snapToVoxel() {
            if (!this.valid) {
                var voxelCoordinates = this.voxelCoordinates;

                if (voxelCoordinates != null) {
                    for (var i = 0; i < 3; ++i) {
                        voxelCoordinates[i] = Math.round(voxelCoordinates[i]);
                    }
                    this.changed.dispatch();
                }
            } else {
                var spatialCoordinates = this.spatialCoordinates;
                var voxelSize = this.voxelSize.size;
                for (var _i = 0; _i < 3; ++_i) {
                    var voxelSizeValue = voxelSize[_i];
                    spatialCoordinates[_i] = Math.round(spatialCoordinates[_i] / voxelSizeValue) * voxelSizeValue;
                }
                this.changed.dispatch();
            }
        }
    }, {
        key: 'valid',
        get: function () {
            return this.spatialCoordinatesValid && this.voxelSize.valid;
        }
    }, {
        key: 'voxelCoordinatesValid',
        get: function () {
            return this.valid || this.voxelCoordinates != null;
        }
    }]);

    return SpatialPosition;
}(disposable_1.RefCounted);

exports.SpatialPosition = SpatialPosition;
;
function quaternionIsIdentity(quat) {
    return quat[0] === 0 && quat[1] === 0 && quat[2] === 0 && quat[3] === 1;
}

var OrientationState = function (_disposable_1$RefCoun3) {
    _inherits(OrientationState, _disposable_1$RefCoun3);

    function OrientationState(orientation) {
        _classCallCheck(this, OrientationState);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(OrientationState).call(this));

        _this3.changed = new signals_1.Signal();
        if (orientation == null) {
            orientation = geom_1.quat.create();
        }
        _this3.orientation = orientation;
        return _this3;
    }

    _createClass(OrientationState, [{
        key: 'toJSON',
        value: function toJSON() {
            var orientation = this.orientation;

            if (quaternionIsIdentity(orientation)) {
                return undefined;
            }
            return Array.prototype.slice.call(this.orientation);
        }
    }, {
        key: 'restoreState',
        value: function restoreState(obj) {
            try {
                json_1.parseFiniteVec(this.orientation, obj);
                geom_1.quat.normalize(this.orientation, this.orientation);
            } catch (ignoredError) {
                geom_1.quat.identity(this.orientation);
            }
            this.changed.dispatch();
        }
    }, {
        key: 'reset',
        value: function reset() {
            geom_1.quat.identity(this.orientation);
            this.changed.dispatch();
        }
    }, {
        key: 'snap',
        value: function snap() {
            var mat = geom_1.mat3.create();
            geom_1.mat3.fromQuat(mat, this.orientation);
            // console.log(mat);
            var usedAxes = [false, false, false];
            for (var i = 0; i < 3; ++i) {
                var maxComponent = 0;
                var argmaxComponent = 0;
                for (var j = 0; j < 3; ++j) {
                    var value = mat[i * 3 + j];
                    mat[i * 3 + j] = 0;
                    if (usedAxes[j]) {
                        continue;
                    }
                    if (Math.abs(value) > Math.abs(maxComponent)) {
                        maxComponent = value;
                        argmaxComponent = j;
                    }
                }
                mat[i * 3 + argmaxComponent] = Math.sign(maxComponent);
                usedAxes[argmaxComponent] = true;
            }
            // console.log(mat);
            geom_1.quat.fromMat3(this.orientation, mat);
            this.changed.dispatch();
        }
    }]);

    return OrientationState;
}(disposable_1.RefCounted);

;

var Pose = function (_disposable_1$RefCoun4) {
    _inherits(Pose, _disposable_1$RefCoun4);

    function Pose(position, orientation) {
        _classCallCheck(this, Pose);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Pose).call(this));

        _this4.changed = new signals_1.Signal();
        if (position == null) {
            position = new SpatialPosition();
        }
        _this4.position = position;
        if (orientation == null) {
            orientation = new OrientationState();
        }
        _this4.orientation = orientation;
        _this4.registerDisposer(_this4.position);
        _this4.registerDisposer(_this4.orientation);
        _this4.registerSignalBinding(_this4.position.changed.add(_this4.changed.dispatch, _this4.changed));
        _this4.registerSignalBinding(_this4.orientation.changed.add(_this4.changed.dispatch, _this4.changed));
        return _this4;
    }

    _createClass(Pose, [{
        key: 'reset',

        /**
         * Resets everything except voxelSize.
         */
        value: function reset() {
            this.position.reset();
            this.orientation.reset();
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this.position.changed.remove(this.changed.dispatch, this.changed);
        }
    }, {
        key: 'toMat4',
        value: function toMat4(mat) {
            geom_1.mat4.fromRotationTranslation(mat, this.orientation.orientation, this.position.spatialCoordinates);
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            var positionJson = this.position.toJSON();
            var orientationJson = this.orientation.toJSON();
            if (positionJson === undefined && orientationJson === undefined) {
                return undefined;
            }
            return { 'position': positionJson, 'orientation': orientationJson };
        }
    }, {
        key: 'restoreState',
        value: function restoreState(obj) {
            this.position.restoreState(obj['position']);
            this.orientation.restoreState(obj['orientation']);
        }
        /**
         * Snaps the orientation to the nearest axis-aligned orientation, and
         * snaps the position to the nearest voxel.
         */

    }, {
        key: 'snap',
        value: function snap() {
            this.orientation.snap();
            this.position.snapToVoxel();
            this.changed.dispatch();
        }
    }, {
        key: 'translateAbsolute',
        value: function translateAbsolute(translation) {
            geom_1.vec3.add(this.position.spatialCoordinates, this.position.spatialCoordinates, translation);
            this.position.changed.dispatch();
        }
    }, {
        key: 'translateRelative',
        value: function translateRelative(translation) {
            if (!this.valid) {
                return;
            }
            var temp = geom_1.vec3.create();
            geom_1.vec3.transformQuat(temp, translation, this.orientation.orientation);
            geom_1.vec3.add(this.position.spatialCoordinates, this.position.spatialCoordinates, temp);
            this.position.changed.dispatch();
        }
    }, {
        key: 'rotateRelative',
        value: function rotateRelative(axis, angle) {
            var temp = geom_1.quat.create();
            geom_1.quat.setAxisAngle(temp, axis, angle);
            var orientation = this.orientation.orientation;
            geom_1.quat.multiply(orientation, orientation, temp);
            this.orientation.changed.dispatch();
        }
    }, {
        key: 'rotateAbsolute',
        value: function rotateAbsolute(axis, angle) {
            var temp = geom_1.quat.create();
            geom_1.quat.setAxisAngle(temp, axis, angle);
            var orientation = this.orientation.orientation;
            geom_1.quat.multiply(orientation, temp, orientation);
            this.orientation.changed.dispatch();
        }
    }, {
        key: 'valid',
        get: function () {
            return this.position.valid;
        }
    }]);

    return Pose;
}(disposable_1.RefCounted);

exports.Pose = Pose;
;

var NavigationState = function (_disposable_1$RefCoun5) {
    _inherits(NavigationState, _disposable_1$RefCoun5);

    function NavigationState(pose, zoomFactor) {
        _classCallCheck(this, NavigationState);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(NavigationState).call(this));

        _this5.changed = new signals_1.Signal();
        if (pose === undefined) {
            pose = new Pose();
        }
        _this5.pose = pose;
        if (zoomFactor === undefined) {
            zoomFactor = Number.NaN;
        }
        _this5.zoomFactor = zoomFactor;
        _this5.registerDisposer(pose);
        _this5.registerSignalBinding(_this5.pose.changed.add(_this5.changed.dispatch, _this5.changed));
        _this5.registerSignalBinding(_this5.voxelSize.changed.add(_this5.handleVoxelSizeChanged, _this5));
        _this5.setZoomFactorFromVoxelSize();
        return _this5;
    }

    _createClass(NavigationState, [{
        key: 'reset',

        /**
         * Resets everything except voxelSize.
         */
        value: function reset() {
            this.pose.reset();
            this.resetZoom();
        }
    }, {
        key: 'resetZoom',
        value: function resetZoom() {
            this.zoomFactor = Number.NaN;
            this.changed.dispatch();
        }
    }, {
        key: 'setZoomFactorFromVoxelSize',
        value: function setZoomFactorFromVoxelSize() {
            var voxelSize = this.voxelSize;

            if (voxelSize.valid) {
                this.zoomFactor = Math.min.apply(null, this.voxelSize.size);
                this.changed.dispatch();
            }
        }
    }, {
        key: 'handleVoxelSizeChanged',
        value: function handleVoxelSizeChanged() {
            if (Number.isNaN(this.zoomFactor)) {
                this.setZoomFactorFromVoxelSize();
            }
        }
    }, {
        key: 'toMat4',
        value: function toMat4(mat) {
            this.pose.toMat4(mat);
            geom_1.mat4.scale(mat, mat, geom_1.vec3.fromValues(this.zoomFactor, this.zoomFactor, this.zoomFactor));
        }
    }, {
        key: 'zoomBy',
        value: function zoomBy(factor) {
            if (Number.isNaN(this.zoomFactor)) {
                return;
            }
            this.zoomFactor *= factor;
            this.changed.dispatch();
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            var zoomFactor = this.zoomFactor;

            var poseJson = this.pose.toJSON();
            var zoomFactorJson = zoomFactor == null || Number.isNaN(zoomFactor) ? undefined : zoomFactor;
            if (poseJson === undefined && zoomFactorJson === undefined) {
                return undefined;
            }
            return { 'pose': poseJson, 'zoomFactor': zoomFactorJson };
        }
    }, {
        key: 'restoreState',
        value: function restoreState(obj) {
            if (!obj || typeof obj !== 'object') {
                return;
            }
            this.pose.restoreState(obj['pose']);
            var zoomFactor = parseFloat(obj['zoomFactor']);
            if (Number.isFinite(zoomFactor)) {
                this.zoomFactor = zoomFactor;
            } else {
                this.zoomFactor = Number.NaN;
            }
            this.handleVoxelSizeChanged();
            this.changed.dispatch();
        }
    }, {
        key: 'voxelSize',
        get: function () {
            return this.pose.position.voxelSize;
        }
    }, {
        key: 'position',
        get: function () {
            return this.pose.position;
        }
    }, {
        key: 'valid',
        get: function () {
            return this.pose.valid;
        }
    }]);

    return NavigationState;
}(disposable_1.RefCounted);

exports.NavigationState = NavigationState;
;

var TrackableZoomState = function () {
    function TrackableZoomState(navigationState) {
        _classCallCheck(this, TrackableZoomState);

        this.navigationState = navigationState;
    }

    _createClass(TrackableZoomState, [{
        key: 'restoreState',
        value: function restoreState(obj) {
            if (typeof obj !== 'number') {
                return;
            }
            var zoomFactor = parseFloat('' + obj);
            if (Number.isFinite(zoomFactor)) {
                var navigationState = this.navigationState;

                navigationState.zoomFactor = zoomFactor;
                navigationState.changed.dispatch();
            }
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            if (!this.navigationState.valid) {
                return undefined;
            }
            return this.navigationState.zoomFactor;
        }
    }, {
        key: 'changed',
        get: function () {
            return this.navigationState.changed;
        }
    }]);

    return TrackableZoomState;
}();

exports.TrackableZoomState = TrackableZoomState;
;

/***/ },
/* 122 */
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

var disposable_1 = __webpack_require__(8);
var geom_1 = __webpack_require__(21);
__webpack_require__(123);

var PositionStatusPanel = function (_disposable_1$RefCoun) {
    _inherits(PositionStatusPanel, _disposable_1$RefCoun);

    function PositionStatusPanel(element, viewer) {
        _classCallCheck(this, PositionStatusPanel);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PositionStatusPanel).call(this));

        _this.element = element;
        _this.viewer = viewer;
        _this.positionElements = new Array();
        _this.needsUpdate = null;
        _this.tempPosition = geom_1.vec3.create();
        element.setAttribute('class', 'position-status-panel');
        var positionElements = _this.positionElements;

        var _loop = function (i) {
            var label = element.ownerDocument.createElement('label');
            label.className = 'position-status-coord';
            var input = element.ownerDocument.createElement('input');
            input.type = 'number';
            input.className = 'position-status-coord';
            label.textContent = geom_1.AXES_NAMES[i];
            label.appendChild(input);
            element.appendChild(label);
            positionElements.push(input);
            var nextInputIsChange = false;
            _this.registerEventListener(input, 'change', event => {
                _this.handleCoordinateChange();
            });
            _this.registerEventListener(input, 'input', event => {
                if (nextInputIsChange) {
                    _this.handleCoordinateChange();
                    nextInputIsChange = false;
                }
                return true;
            });
            _this.registerEventListener(input, 'wheel', event => {
                nextInputIsChange = true;
                input.focus();
                return true;
            });
            _this.registerEventListener(input, 'keydown', event => {
                nextInputIsChange = false;
                return true;
            });
            _this.registerEventListener(input, 'mousedown', event => {
                nextInputIsChange = true;
                return true;
            });
            _this.registerEventListener(input, 'click', event => {
                return true;
            });
            _this.registerEventListener(input, 'blur', event => {
                nextInputIsChange = false;
                return true;
            });
        };

        for (var i = 0; i < 3; ++i) {
            _loop(i);
        }
        var mouseElement = _this.mouseElement = document.createElement('span');
        mouseElement.className = 'position-status-mouse';
        element.appendChild(mouseElement);
        var navigationState = viewer.navigationState;
        var mouseState = viewer.mouseState;

        _this.registerSignalBinding(navigationState.pose.changed.add(_this.handleChange, _this));
        _this.registerSignalBinding(mouseState.changed.add(_this.handleChange, _this));
        _this.handleChange();
        return _this;
    }

    _createClass(PositionStatusPanel, [{
        key: 'handleChange',
        value: function handleChange() {
            if (this.needsUpdate == null) {
                this.needsUpdate = requestAnimationFrame(this.update.bind(this));
            }
        }
    }, {
        key: 'handleCoordinateChange',
        value: function handleCoordinateChange() {
            var positionElements = this.positionElements;
            var position = this.viewer.navigationState.pose.position;
            var voxelPosition = this.tempPosition;
            if (!position.voxelCoordinatesValid) {
                return;
            }
            position.getVoxelCoordinates(voxelPosition);
            for (var i = 0; i < 3; ++i) {
                var value = parseFloat(positionElements[i].value);
                if (!Number.isNaN(value)) {
                    voxelPosition[i] = value;
                }
            }
            position.setVoxelCoordinates(voxelPosition);
        }
    }, {
        key: 'update',
        value: function update() {
            this.needsUpdate = null;
            var _viewer = this.viewer;
            var navigationState = _viewer.navigationState;
            var mouseState = _viewer.mouseState;

            var voxelPosition = this.tempPosition;
            var position = navigationState.pose.position;
            // console.log("updating position view", this.navigationState.position.voxelCoordinatesValid);
            if (position.getVoxelCoordinates(voxelPosition)) {
                // console.log("got new position: " + voxelPosition);
                var positionElements = this.positionElements;
                for (var i = 0; i < 3; ++i) {
                    var value = voxelPosition[i];
                    positionElements[i].value = '' + Math.floor(value);
                }
            }
            var voxelSize = position.voxelSize;
            {
                var text = '';
                if (mouseState.active) {
                    voxelSize.voxelFromSpatial(voxelPosition, mouseState.position);
                    var p = voxelPosition;
                    text = `x ${ Math.round(p[0]) }  y ${ Math.round(p[1]) }  z ${ Math.round(p[2]) }`;
                }
                this.mouseElement.textContent = text;
            }
        }
    }, {
        key: 'disposed',
        value: function disposed() {
            for (var x of this.positionElements) {
                this.element.removeChild(x);
            }
            this.positionElements = null;
            this.element = null;
        }
    }]);

    return PositionStatusPanel;
}(disposable_1.RefCounted);

exports.PositionStatusPanel = PositionStatusPanel;
;

/***/ },
/* 123 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 124 */
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

var json_1 = __webpack_require__(11);
// Maps keys to objects.
var trackedKeys = new Map();
// Maps objects to keys.
var trackedObjects = new Map();
var currentHashState = {};
var updatingObject = null;
var updatedObjects = new Set();
var lastHash = null;
var pendingUpdate = null;
var UPDATE_DELAY = 500;
function updateTrackedObjectsFromHash() {
    // console.log("updateTrackedObjectsFromHash called");
    try {
        var s = location.href.replace(/^[^#]+/, '');
        // console.log(`hash str: ${s}`);
        if (s === '' || s === '#' || s === '#!') {
            s = '#!{}';
        }
        if (s.startsWith('#!')) {
            s = s.slice(2);
            // Firefox always %-encodes the URL even if it is not typed that way.
            s = decodeURI(s);
            if (s === lastHash) {
                // We caused this update.
                return;
            }
            lastHash = s;
            var state = json_1.urlSafeParse(s);
            if (typeof state === 'object') {
                updateTrackedObjects(state);
            }
        } else {
            lastHash = null;
        }
    } catch (e) {
        // Failed to parse hash, ignore.
        console.log(e);
    }
}
function restoreObjectState(key, obj) {
    try {
        updatingObject = obj;
        obj.restoreState(currentHashState[key]);
    } catch (e) {
        console.log(`Failed to restore ${ key } state: ${ e }`);
    } finally {
        updatingObject = null;
    }
}
function updateTrackedObjects(newState) {
    currentHashState = newState;
    for (var key of Object.keys(currentHashState)) {
        var obj = trackedKeys.get(key);
        if (obj !== undefined) {
            restoreObjectState(key, obj);
        }
    }
}
function scheduleUpdate() {
    // Wait another UPDATE_DELAY ms before updating hash.
    if (pendingUpdate != null) {
        clearTimeout(pendingUpdate);
    }
    pendingUpdate = setTimeout(updateHash, UPDATE_DELAY);
}
function delayHashUpdate() {
    if (pendingUpdate != null) {
        scheduleUpdate();
    }
}
exports.delayHashUpdate = delayHashUpdate;
function updateHash() {
    pendingUpdate = null;
    // console.log(`updateHash at ${Date.now()}`);
    var updated = false;
    for (var obj of updatedObjects) {
        var key = trackedObjects.get(obj);
        if (key === undefined) {
            if (currentHashState.hasOwnProperty(key)) {
                updated = true;
            }
            // Object may have been unregistered after update event.
            continue;
        }
        updated = true;
        currentHashState[key] = obj.toJSON();
    }
    updatedObjects.clear();
    if (updated) {
        var newHash = json_1.urlSafeStringify(currentHashState);
        if (newHash !== lastHash) {
            lastHash = newHash;
            // console.log(`replaceState at ${Date.now()}`);
            if (lastHash === '{}') {
                history.replaceState(null, null, '#');
            } else {
                history.replaceState(null, null, '#!' + lastHash);
            }
        }
    }
}
addEventListener('hashchange', updateTrackedObjectsFromHash);
// Called with this == the object.
function handleObjectUpdate() {
    var obj = this;
    if (updatingObject === obj) {
        // We caused this event, so ignore it.
        return;
    }
    updatedObjects.add(obj);
    scheduleUpdate();
}
function registerTrackable(key, obj) {
    if (trackedKeys.has(key)) {
        throw new Error(`Key ${ JSON.stringify(key) } already registered.`);
    }
    if (trackedObjects.has(obj)) {
        throw new Error(`Object already registered.`);
    }
    trackedKeys.set(key, obj);
    trackedObjects.set(obj, key);
    if (currentHashState.hasOwnProperty(key)) {
        // console.log(`registering ${key} which has existing state`);
        obj.restoreState(currentHashState[key]);
    }
    obj.changed.add(handleObjectUpdate, obj);
    handleObjectUpdate.call(obj);
}
exports.registerTrackable = registerTrackable;
;
function unregisterTrackable(keyOrObject) {
    var obj = trackedKeys.get(keyOrObject);
    var key = void 0;
    if (obj !== undefined) {
        key = keyOrObject;
    } else {
        key = trackedObjects.get(keyOrObject);
        if (key === undefined) {
            throw new Error('Key or object not registered.');
        }
        obj = keyOrObject;
    }
    trackedKeys.delete(key);
    trackedObjects.delete(obj);
    obj.changed.remove(handleObjectUpdate, obj);
    handleObjectUpdate.call(obj);
}
exports.unregisterTrackable = unregisterTrackable;
;
// Initialize currentHashState.
updateTrackedObjectsFromHash();

/***/ },
/* 125 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 126 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);
//# sourceMappingURL=main.bundle.js.map
