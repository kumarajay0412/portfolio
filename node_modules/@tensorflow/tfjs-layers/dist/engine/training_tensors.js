"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var tfjs_backend_1 = require("../backend/tfjs_backend");
var base_callbacks_1 = require("../base_callbacks");
var errors_1 = require("../errors");
var logs_1 = require("../logs");
var math_utils_1 = require("../utils/math_utils");
function checkBatchSize(batchSize) {
    tfc.util.assert(batchSize > 0 && Number.isInteger(batchSize), "batchSize is required to be a positive integer, but got " + batchSize);
}
exports.checkBatchSize = checkBatchSize;
function sliceArrays(arrays, start, stop) {
    if (arrays == null) {
        return [null];
    }
    else if (Array.isArray(arrays)) {
        return arrays.map(function (array) { return tfjs_backend_1.sliceAlongFirstAxis(array, start, stop - start); });
    }
    else {
        return tfjs_backend_1.sliceAlongFirstAxis(arrays, start, stop - start);
    }
}
exports.sliceArrays = sliceArrays;
function sliceArraysByIndices(arrays, indices) {
    return tfc.tidy(function () {
        if (arrays == null) {
            return null;
        }
        else if (Array.isArray(arrays)) {
            return arrays.map(function (array) { return sliceArraysByIndices(array, indices); });
        }
        else {
            return tfjs_backend_1.gather(arrays, indices.dtype === 'int32' ? indices : indices.toInt());
        }
    });
}
exports.sliceArraysByIndices = sliceArraysByIndices;
function makeBatches(size, batchSize) {
    var output = [];
    var batchStart = 0;
    var batchEnd = null;
    while (batchStart < size) {
        batchEnd = batchStart + batchSize;
        if (batchEnd >= size) {
            batchEnd = size;
        }
        output.push([batchStart, batchEnd]);
        batchStart = batchEnd;
    }
    return output;
}
exports.makeBatches = makeBatches;
function fitLoop(model, f, ins, outLabels, batchSize, epochs, verbose, callbacks, valF, valIns, shuffle, callbackMetrics, initialEpoch, stepsPerEpoch, validationSteps, yieldEvery) {
    return __awaiter(this, void 0, void 0, function () {
        var doValidation, numTrainSamples, indexArray, _a, callbackList, history, _loop_1, epoch, state_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (batchSize == null) {
                        batchSize = 32;
                    }
                    if (epochs == null) {
                        epochs = 1;
                    }
                    if (shuffle == null) {
                        shuffle = true;
                    }
                    if (initialEpoch == null) {
                        initialEpoch = 0;
                    }
                    doValidation = false;
                    if (valF != null && valIns != null) {
                        doValidation = true;
                    }
                    if (validationSteps != null) {
                        doValidation = true;
                        if (stepsPerEpoch == null) {
                            throw new errors_1.ValueError('Can only use `validationSteps` when doing step-wise training, ' +
                                'i.e., `stepsPerEpoch` must be set.');
                        }
                    }
                    numTrainSamples = model.checkNumSamples(ins, batchSize, stepsPerEpoch, 'steps_per_epoch');
                    if (numTrainSamples != null) {
                        indexArray = math_utils_1.range(0, numTrainSamples);
                    }
                    if (verbose == null) {
                        verbose = 1;
                    }
                    _a = base_callbacks_1.configureCallbacks(callbacks, yieldEvery, verbose, epochs, initialEpoch, numTrainSamples, stepsPerEpoch, batchSize, doValidation, callbackMetrics), callbackList = _a.callbackList, history = _a.history;
                    callbackList.setModel(model);
                    model.history = history;
                    return [4, callbackList.onTrainBegin()];
                case 1:
                    _b.sent();
                    model.stopTraining_ = false;
                    _loop_1 = function (epoch) {
                        var epochLogs, epochIndexArray1D_1, batches_1, _loop_2, batchIndex, state_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, callbackList.onEpochBegin(epoch)];
                                case 1:
                                    _a.sent();
                                    epochLogs = {};
                                    if (!(stepsPerEpoch != null)) return [3, 2];
                                    throw new errors_1.NotImplementedError('stepsPerEpoch mode is not implemented yet.');
                                case 2:
                                    if (shuffle === 'batch') {
                                        throw new errors_1.NotImplementedError('batch shuffling is not implemneted yet');
                                    }
                                    else if (shuffle) {
                                        tfjs_core_1.util.shuffle(indexArray);
                                    }
                                    epochIndexArray1D_1 = tfjs_core_1.tensor1d(indexArray);
                                    batches_1 = makeBatches(numTrainSamples, batchSize);
                                    _loop_2 = function (batchIndex) {
                                        var batchLogs;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    batchLogs = {};
                                                    return [4, callbackList.onBatchBegin(batchIndex, batchLogs)];
                                                case 1:
                                                    _a.sent();
                                                    tfc.tidy(function () {
                                                        var batchStart = batches_1[batchIndex][0];
                                                        var batchEnd = batches_1[batchIndex][1];
                                                        var batchIds = tfjs_backend_1.sliceAlongFirstAxis(epochIndexArray1D_1, batchStart, batchEnd - batchStart);
                                                        batchLogs['batch'] = batchIndex;
                                                        batchLogs['size'] = batchEnd - batchStart;
                                                        var insBatch = sliceArraysByIndices(ins, batchIds);
                                                        var outs = f(insBatch);
                                                        for (var i = 0; i < outLabels.length; ++i) {
                                                            var label = outLabels[i];
                                                            var out = outs[i];
                                                            batchLogs[label] = out;
                                                            tfc.keep(out);
                                                        }
                                                        if (batchIndex === batches_1.length - 1) {
                                                            if (doValidation) {
                                                                var valOuts = model.testLoop(valF, valIns, batchSize);
                                                                for (var i = 0; i < outLabels.length; ++i) {
                                                                    var label = outLabels[i];
                                                                    var out = valOuts[i];
                                                                    tfc.keep(out);
                                                                    epochLogs['val_' + label] = out;
                                                                }
                                                            }
                                                        }
                                                    });
                                                    return [4, callbackList.onBatchEnd(batchIndex, batchLogs)];
                                                case 2:
                                                    _a.sent();
                                                    logs_1.disposeTensorsInLogs(batchLogs);
                                                    if (model.stopTraining_) {
                                                        return [2, "break"];
                                                    }
                                                    return [2];
                                            }
                                        });
                                    };
                                    batchIndex = 0;
                                    _a.label = 3;
                                case 3:
                                    if (!(batchIndex < batches_1.length)) return [3, 6];
                                    return [5, _loop_2(batchIndex)];
                                case 4:
                                    state_2 = _a.sent();
                                    if (state_2 === "break")
                                        return [3, 6];
                                    _a.label = 5;
                                case 5:
                                    ++batchIndex;
                                    return [3, 3];
                                case 6:
                                    epochIndexArray1D_1.dispose();
                                    _a.label = 7;
                                case 7: return [4, callbackList.onEpochEnd(epoch, epochLogs)];
                                case 8:
                                    _a.sent();
                                    if (model.stopTraining_) {
                                        return [2, "break"];
                                    }
                                    return [2];
                            }
                        });
                    };
                    epoch = initialEpoch;
                    _b.label = 2;
                case 2:
                    if (!(epoch < epochs)) return [3, 5];
                    return [5, _loop_1(epoch)];
                case 3:
                    state_1 = _b.sent();
                    if (state_1 === "break")
                        return [3, 5];
                    _b.label = 4;
                case 4:
                    ++epoch;
                    return [3, 2];
                case 5: return [4, callbackList.onTrainEnd()];
                case 6:
                    _b.sent();
                    return [4, model.history.syncData()];
                case 7:
                    _b.sent();
                    return [2, model.history];
            }
        });
    });
}
function fitTensors(model, x, y, config) {
    if (config === void 0) { config = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var inputs, targets, inputValX, inputValY, valX, valY, batchSize, standardizedOuts, doValidation, valIns, valStandardized, splitAt, originalBatchSize, ins, trainFunction, outLabels, valFunction, callbackMetrics, callbacks, out;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (model.isTraining) {
                        throw new Error('Cannot start training because another fit() call is ongoing.');
                    }
                    model.isTraining = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    batchSize = config.batchSize == null ? 32 : config.batchSize;
                    checkBatchSize(batchSize);
                    standardizedOuts = model.standardizeUserData(x, y, false, batchSize);
                    inputs = standardizedOuts[0];
                    targets = standardizedOuts[1];
                    doValidation = false;
                    valIns = void 0;
                    if (config.validationData != null && config.validationData.length > 0) {
                        doValidation = true;
                        if (config.validationData.length === 2) {
                            inputValX = config.validationData[0];
                            inputValY = config.validationData[1];
                        }
                        else if (config.validationData.length === 3) {
                            throw new errors_1.NotImplementedError('validationData including sample weights is not supported yet.');
                        }
                        else {
                            throw new errors_1.ValueError("When passing validation data, it must contain 2 (valX, valY) " +
                                "or 3 (valX, valY, valSampleWeight) items; " +
                                (config.validationData + " is invalid."));
                        }
                        valStandardized = model.standardizeUserData(inputValX, inputValY, true, batchSize);
                        valX = valStandardized[0];
                        valY = valStandardized[1];
                        valIns = valX.concat(valY);
                    }
                    else if (config.validationSplit != null && config.validationSplit > 0 &&
                        config.validationSplit < 1) {
                        doValidation = true;
                        splitAt = Math.floor(inputs[0].shape[0] * (1 - config.validationSplit));
                        originalBatchSize = inputs[0].shape[0];
                        valX = sliceArrays(inputs, splitAt, originalBatchSize);
                        inputs = sliceArrays(inputs, 0, splitAt);
                        valY = sliceArrays(targets, splitAt, originalBatchSize);
                        targets = sliceArrays(targets, 0, splitAt);
                        valIns = valX.concat(valY);
                    }
                    else if (config.validationSteps != null) {
                        doValidation = true;
                    }
                    ins = inputs.concat(targets);
                    model.checkTrainableWeightsConsistency();
                    trainFunction = model.makeTrainFunction();
                    outLabels = model.getDedupedMetricsNames();
                    valFunction = void 0;
                    callbackMetrics = void 0;
                    if (doValidation) {
                        model.makeTestFunction();
                        valFunction = model.testFunction;
                        callbackMetrics =
                            outLabels.slice().concat(outLabels.map(function (n) { return 'val_' + n; }));
                    }
                    else {
                        valFunction = null;
                        valIns = [];
                        callbackMetrics = outLabels.slice();
                    }
                    callbacks = base_callbacks_1.standardizeCallbacks(config.callbacks);
                    return [4, fitLoop(model, trainFunction, ins, outLabels, batchSize, config.epochs, config.verbose, callbacks, valFunction, valIns, config.shuffle, callbackMetrics, config.initialEpoch, null, null, config.yieldEvery)];
                case 2:
                    out = _a.sent();
                    model.isTraining = false;
                    return [2, out];
                case 3:
                    model.isTraining = false;
                    disposeNewTensors(inputs, x);
                    disposeNewTensors(targets, y);
                    disposeNewTensors(valX, inputValX);
                    disposeNewTensors(valY, inputValY);
                    return [7];
                case 4: return [2];
            }
        });
    });
}
exports.fitTensors = fitTensors;
function ensureTensorsRank2OrHigher(tensors) {
    var outs = [];
    if (tensors instanceof tfjs_core_1.Tensor) {
        tensors = [tensors];
    }
    for (var i = 0; i < tensors.length; ++i) {
        var tensor = tensors[i];
        if (tensor.rank === 1) {
            outs.push(tfjs_backend_1.expandDims(tensor, 1));
        }
        else if (tensor.rank === 0) {
            throw new Error('Expected tensor to be at least 1D, but received a 0D tensor ' +
                '(scalar).');
        }
        else {
            outs.push(tensor);
        }
    }
    return outs;
}
exports.ensureTensorsRank2OrHigher = ensureTensorsRank2OrHigher;
function disposeNewTensors(tensors, refTensors) {
    if (tensors == null) {
        return;
    }
    var oldTensorIds = [];
    if (refTensors instanceof tfjs_core_1.Tensor) {
        oldTensorIds.push(refTensors.id);
    }
    else if (Array.isArray(refTensors)) {
        refTensors.forEach(function (t) { return oldTensorIds.push(t.id); });
    }
    else if (refTensors != null) {
        for (var name_1 in refTensors) {
            var oldTensor = refTensors[name_1];
            oldTensorIds.push(oldTensor.id);
        }
    }
    var tensorsToDispose = [];
    if (tensors instanceof tfjs_core_1.Tensor) {
        if (oldTensorIds.indexOf(tensors.id) === -1) {
            tensorsToDispose.push(tensors);
        }
    }
    else if (Array.isArray(tensors)) {
        tensors.forEach(function (t) {
            if (oldTensorIds.indexOf(t.id) === -1) {
                tensorsToDispose.push(t);
            }
        });
    }
    else if (tensors != null) {
        for (var name_2 in tensors) {
            var tensor = tensors[name_2];
            if (oldTensorIds.indexOf(tensor.id) === -1) {
                tensorsToDispose.push(tensor);
            }
        }
    }
    tensorsToDispose.forEach(function (t) {
        if (!t.isDisposed) {
            t.dispose();
        }
    });
}
exports.disposeNewTensors = disposeNewTensors;
//# sourceMappingURL=training_tensors.js.map