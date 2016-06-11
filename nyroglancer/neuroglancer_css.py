# replaced every \ with \\
content='''
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

#statusContainer {
  position: fixed;
  bottom: 0px;
  z-index: 100;
  background-color: grey;
  color: white;
  margin: 0px;
  padding: 0px;
}

#statusContainer li {
  width: 100vw;
  max-height: 25vh;
  overflow-y: auto;
}
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

.overlay {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  overflow-x: hidden;
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 100;
  color: black;
  padding: 2em;
}
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

.segment-set-widget button {
  margin: 3px;
}

.segment-set-widget {
  flex: 1;
  overflow-y: auto;
}

.segment-set-widget .item-container {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
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

.uint64-entry input {
  width: 19ch;
}

.uint64-entry input.invalid-input {
  color: red;
}
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

.range-slider {
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  justify-content: space-between;
}

.range-slider input[type='range'] {
}

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

.segmentation-dropdown .add-segment label::before {
  content: "+ ";
  font-weight: bold;
}

.segmentation-dropdown .add-segment {
  margin-bottom: 5px;
}
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

.autocomplete-hint, .autocomplete-input {
  outline: 0;
  width: 100%;
  border: 0;
  margin: 0;
  padding: 0;
}

.autocomplete-prompt, .autocomplete-hint, .autocomplete-input, .autocomplete-completion {
  font-family: monospace;
  font-size: medium;
}

.autocomplete {
  display: flex;
  flex-direction: row;
}

.autocomplete-prompt {
  display: inline-block;
}

.autocomplete-prompt:not(:empty) {
  margin-right: 1em;
}

.autocomplete-hint {
  position: absolute;
  top: 0;
  left: 0;
  border-color: transparent;
  background-color: transparent;
  box-shadow: none;
  color: #aaa;
}

.autocomplete-dropdown-wrapper {
  display: inline-block;
  position: relative;
  border: 0;
  margin: 0;
  padding: 0;
  flex: 1;
}

.autocomplete-input {
  position: relative;
  top: 0;
  left: 0;
  /* vertical-align: top; */
  color: #333;
  background-color: transparent;
}

.autocomplete-input-wrapper {
  display: flex;
  position: relative;
  outline: 0px;
  border: 0;
  margin: 0px;
  padding: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

.autocomplete-dropdown {
  position: absolute;
  display: none;
  outline: 0;
  margin: 0;
  padding: 0;
  text-align: left;
  cursor: default;
  border-style: solid;
  border-width: 1px;
  border-color: #aaa;
  overflow-y: scroll;
  overflow-x: hidden;
  white-space: pre;
  background-color: white;
}


.autocomplete-completion {
  
}

.autocomplete-completion:hover {
  outline: 1px solid #ddd;
}

.autocomplete-completion-active {
  background-color: #ccc;
}

.autocomplete-completion-with-description {
  display: flex;
  flex-direction: row;
}

.autocomplete-completion-description {
  text-align: right;
  display: inline;
  flex: 1;
  font-style: italic;
  padding-left: 2em;
}
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

.add-layer-overlay {
  width: 80vw;
}

.add-layer-name {
  display: flex;
  flex-direction: row;
  font-family: monospace;
}

.add-layer-overlay .dialog-status {
  width: 100%;
  height: 4em;
  overflow: auto;
}

.add-layer-overlay form {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.add-layer-overlay form {
  margin-bottom: 5px;
}

.add-layer-overlay form button {
  margin-left: 1em;
}

.add-layer-overlay form > label {
  margin-right: 1em;
  min-width: 4em;
}

.add-layer-name, .add-layer-source {
  border: 1px solid black;
  padding: 2px;
  flex: 1;
}

.add-layer-name.invalid-input {
  border: 1px solid red;
}

.add-layer-overlay .add-layer-name {
  font-family: monospace;
  flex: 1;
  outline: 0;
  margin: 0;
}

.add-layer-overlay .dialog-status.dialog-status-error {
  color: red;
}
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

.layer-panel {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.layer-item + .layer-item {
  margin-left: 5px;
}

.layer-item + .layer-add-button {
  margin-left: 5px;
}

.layer-item {
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
}

.layer-item, .layer-add-button {
  margin: 2px;
}

.layer-item-parent:hover .layer-item {
  border-color: #daa520;
}

.clear-button::after {
  content: "x";
}

.layer-dropdown {
  display: none;
  position: absolute;
  flex-direction: column;
  min-width: 100%;
  background-color: black;
  padding: 5px;
  border: 1px solid white;
  box-sizing: border-box;
}

.layer-item-parent {
  display: inline-block;
  background-color: black;
}

.layer-item-parent:not(.sortable-chosen) {
  /* Setting position: relative; prevents the item being dragged from being displayed properly. */
  position: relative;
}

.layer-item-label {
  display: inline-block;
  background-color: #222;
  padding-right: 3px;
}

.layer-item-number {
  display: inline-block;
  background-color: /*#daa520*/ #9a7518;
  font-weight: bold;
  padding: 1px;
  margin: 3px;
}

.layer-item-value {
  display: inline-block;
  min-width: 10ch;
  margin-left: 1ch;
  text-align: center;
}

.layer-item-close::before {
  content: "\\274C"; /* CROSS MARK */
}

.layer-item-close {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 50%;
  width: 1.7ex;
  height: 1.7ex;
  font-family: sans-serif;
  padding: 1px;
  color: white;
  position: relative;
}

.layer-item-close:hover {
  background-color: #db4437;
}

.layer-item[layer-visible=false] .layer-item-label {
  text-decoration: line-through;
}

.layer-add-button {
  
}

.layer-add-button::before {
  font-weight: bold;
  content: "+";
}

.layer-item[layer-visible=false] {
  color: #bbb;
}
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


.position-status-panel {
  background-color: black;
  color: white;
  overflow: hidden;
  white-space: nowrap;
}

label.position-status-coord {
  font-family: monospace;
  color: white;
}

input.position-status-coord {
  font-family: monospace;
  color: white;
  background-color: black;
  border: 0px;
  width: 9ch;
  margin-left: 5px;
  margin-right: 5px;
}

.position-status-mouse {
  font-family: monospace;
  color: orange;
  white-space: pre;
}

label.position-status-coord:hover {
  color: orange;
}
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

#container .gl-canvas {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  /* Canvas is in back. */
  z-index: 0;
}

#container {
  /*width: 100vw;*/
  flex: 1;
  position: relative;
}

.gllayoutcontainer {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0px;
  left: 0pt;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.gllayoutrow {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.gllayoutcell {
  border-style: solid;
  border-color: black;
  border-width: 2px;
  flex: 1;
  cursor: crosshair;
}

.gllayoutcell[isActivePanel=true] {
  border-color: white;
}
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

.noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/*html, body {*/
  /*margin: 0px;*/
  /*padding: 0px;*/
  /*overflow: hidden;*/
  /*width: 100vw;*/
  /*height: 100vh;*/
  /*background-color: black;*/
  /*color: white;*/
/*}*/

/*body {*/
  /*position: relative;*/
  /*display: flex;*/
  /*flex-direction: column;*/
/*}*/

.side-panel {
  width: 20vw;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.side-panel-list {
  overflow-y: scroll;
  flex: 1;
  height: 0px;
}

.side-panel h1 {
  display: block;
  background-color: #ccc;
  font-size: medium;
  color: black;
}

.side-panel-list .object-selector {
  display: block;
}

.side-panel-list .error-selector {
  display: block;
  border: 1px solid red;
  margin: 1px;
}

/*# sourceMappingURL=styles.css.map*/
'''
