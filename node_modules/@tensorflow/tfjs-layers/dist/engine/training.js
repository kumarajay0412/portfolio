"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var state_1 = require("../backend/state");
var K = require("../backend/tfjs_backend");
var common_1 = require("../common");
var errors_1 = require("../errors");
var losses = require("../losses");
var Metrics = require("../metrics");
var optimizers = require("../optimizers");
var generic_utils_1 = require("../utils/generic_utils");
var layer_utils_1 = require("../utils/layer_utils");
var math_utils_1 = require("../utils/math_utils");
var container_1 = require("./container");
var executor_1 = require("./executor");
var training_dataset_1 = require("./training_dataset");
var training_tensors_1 = require("./training_tensors");
function isDataTensor(x) {
    return x instanceof tfjs_core_1.Tensor;
}
exports.isDataTensor = isDataTensor;
function isDataArray(x) {
    return Array.isArray(x);
}
exports.isDataArray = isDataArray;
function isDataDict(x) {
    return !isDataTensor(x) && !isDataArray(x);
}
exports.isDataDict = isDataDict;
function standardizeInputData(data, names, shapes, checkBatchAxis, exceptionPrefix) {
    if (checkBatchAxis === void 0) { checkBatchAxis = true; }
    if (exceptionPrefix === void 0) { exceptionPrefix = ''; }
    if (names == null || names.length === 0) {
        if (data != null) {
            var gotUnexpectedData = false;
            if (isDataArray(data) && data.length > 0) {
                gotUnexpectedData = true;
            }
            else if (isDataDict(data)) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        gotUnexpectedData = true;
                        break;
                    }
                }
            }
            else {
                gotUnexpectedData = true;
            }
            if (gotUnexpectedData) {
                throw new errors_1.ValueError("Error when checking model " + exceptionPrefix + " expected no data, " +
                    ("but got " + data));
            }
        }
        return [];
    }
    if (data == null) {
        return names.map(function (name) { return null; });
    }
    var arrays;
    if (isDataDict(data)) {
        data = data;
        arrays = [];
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            if (data[name_1] == null) {
                throw new errors_1.ValueError("No data provided for \"" + name_1 + "\". Need data for each key in: " +
                    ("" + names));
            }
            arrays.push(data[name_1]);
        }
    }
    else if (isDataArray(data)) {
        data = data;
        if (data.length !== names.length) {
            throw new errors_1.ValueError("Error when checking model " + exceptionPrefix + ": the Array of " +
                "Tensors that you are passing to your model is not the size the " +
                ("model expected. Expected to see " + names.length + " Tensor(s), but ") +
                ("instead got the following list of Tensor(s): " + data));
        }
        arrays = data;
    }
    else {
        data = data;
        if (names.length > 1) {
            throw new errors_1.ValueError("The model " + exceptionPrefix + " expects " + names.length + " Tensor(s), " +
                ("but only received one Tensor. Found: Tensor with shape " + data.shape));
        }
        arrays = [data];
    }
    arrays = training_tensors_1.ensureTensorsRank2OrHigher(arrays);
    if (shapes != null) {
        for (var i = 0; i < names.length; ++i) {
            if (shapes[i] == null) {
                continue;
            }
            var array = arrays[i];
            if (array.shape.length !== shapes[i].length) {
                throw new errors_1.ValueError("Error when checking " + exceptionPrefix + ": expected " + names[i] + " " +
                    ("to have " + shapes[i].length + " dimension(s). but got array with ") +
                    ("shape " + array.shape));
            }
            for (var j = 0; j < shapes[i].length; ++j) {
                if (j === 0 && !checkBatchAxis) {
                    continue;
                }
                var dim = array.shape[j];
                var refDim = shapes[i][j];
                if (refDim != null && refDim >= 0 && dim !== refDim) {
                    throw new errors_1.ValueError("Error when checking " + exceptionPrefix + ": expected " + names[i] + " " +
                        ("to have shape [" + shapes[i] + "], but got array with shape ") +
                        ("[" + array.shape + "]."));
                }
            }
        }
    }
    return arrays;
}
exports.standardizeInputData = standardizeInputData;
function checkArrayLengths(inputs, targets, weights) {
    var setX = generic_utils_1.unique(inputs.map(function (input) { return input.shape[0]; }));
    setX.sort();
    var setY = generic_utils_1.unique(targets.map(function (target) { return target.shape[0]; }));
    setY.sort();
    if (setX.length > 1) {
        throw new errors_1.ValueError("All input Tensors (x) should have the same number of samples. " +
            "Got array shapes: " +
            ("" + JSON.stringify(inputs.map(function (input) { return input.shape; }))));
    }
    if (setY.length > 1) {
        throw new errors_1.ValueError("All target Tensors (y) should have the same number of samples. " +
            "Got array shapes: " +
            ("" + JSON.stringify(targets.map(function (target) { return target.shape; }))));
    }
    if (setX.length > 0 && setY.length > 0 && !tfjs_core_1.util.arraysEqual(setX, setY)) {
        throw new errors_1.ValueError("Input Tensors should have the same number of samples as target " +
            ("Tensors. Found " + setX[0] + " input sample(s) and " + setY[0] + " target ") +
            "sample(s).");
    }
}
exports.checkArrayLengths = checkArrayLengths;
function checkLossAndTargetCompatibility(targets, lossFns, outputShapes) {
    var keyLosses = [
        losses.meanSquaredError, losses.binaryCrossentropy,
        losses.categoricalCrossentropy
    ];
    for (var i = 0; i < targets.length; ++i) {
        var y = targets[i];
        var loss = lossFns[i];
        var shape = outputShapes[i];
        if (loss == null) {
            continue;
        }
        if (loss === losses.categoricalCrossentropy) {
            if (y.shape[y.shape.length - 1] === 1) {
                throw new errors_1.ValueError("You are passing a target array of shape " + y.shape + " while using " +
                    "a loss 'categorical_crossentropy'. 'categorical_crossentropy'" +
                    "expects targets to be binary matrices (1s and 0s) of shape " +
                    "[samples, classes].");
            }
        }
        if (keyLosses.indexOf(loss) !== -1) {
            var slicedYShape = y.shape.slice(1);
            var slicedShape = shape.slice(1);
            for (var j = 0; j < slicedYShape.length; ++j) {
                var targetDim = slicedYShape[j];
                var outDim = slicedShape[j];
                if (outDim != null && targetDim !== outDim) {
                    throw new errors_1.ValueError("A target Tensor with shape " + y.shape + " was passed for an " +
                        ("output of shape " + shape + ", while using a loss function that ") +
                        "expects targets to have the same shape as the output.");
                }
            }
        }
    }
}
function checkInputData(data, names, shapes, checkBatchAxis, exceptionPrefix) {
    if (checkBatchAxis === void 0) { checkBatchAxis = true; }
    if (exceptionPrefix === void 0) { exceptionPrefix = ''; }
    var arrays;
    if (Array.isArray(data)) {
        if (data.length !== names.length) {
            throw new errors_1.ValueError("Error when checking model " + exceptionPrefix + ": the Array of " +
                "Tensors that you are passing to your model is not the size the " +
                ("the model expected. Expected to see " + names.length + " Tensor(s),") +
                (" but instead got " + data.length + " Tensors(s)."));
        }
        arrays = data;
    }
    else {
        if (names.length > 1) {
            throw new errors_1.ValueError("The model expects " + names.length + " " + exceptionPrefix + " Tensors, " +
                "but only received one Tensor. Found: array with shape " +
                (JSON.stringify(data.shape) + "."));
        }
        arrays = [data];
    }
    if (shapes != null) {
        for (var i = 0; i < names.length; ++i) {
            if (shapes[i] == null) {
                continue;
            }
            var array = arrays[i];
            if (array.shape.length !== shapes[i].length) {
                throw new errors_1.ValueError("Error when checking " + exceptionPrefix + ": expected " + names[i] + " " +
                    ("to have " + shapes[i].length + " dimension(s), but got array with ") +
                    ("shape " + JSON.stringify(array.shape)));
            }
            for (var j = 0; j < shapes[i].length; ++j) {
                if (j === 0 && !checkBatchAxis) {
                    continue;
                }
                var dim = array.shape[j];
                var refDim = shapes[i][j];
                if (refDim != null) {
                    if (refDim !== dim) {
                        throw new errors_1.ValueError("Error when checking " + exceptionPrefix + ": expected " +
                            (names[i] + " to have shape " + JSON.stringify(shapes[i]) + " but ") +
                            ("got array with shape " + JSON.stringify(array.shape) + "."));
                    }
                }
            }
        }
    }
}
function collectMetrics(metrics, outputNames) {
    if (metrics == null || Array.isArray(metrics) && metrics.length === 0) {
        return outputNames.map(function (name) { return []; });
    }
    if (Array.isArray(metrics)) {
        return outputNames.map(function (name) { return metrics; });
    }
    else if (metrics != null) {
        var nestedMetrics = [];
        for (var _i = 0, outputNames_1 = outputNames; _i < outputNames_1.length; _i++) {
            var name_2 = outputNames_1[_i];
            var outputMetrics = metrics.hasOwnProperty(name_2) ? metrics[name_2] : [];
            if (!Array.isArray(outputMetrics)) {
                outputMetrics = [outputMetrics];
            }
            nestedMetrics.push(outputMetrics);
        }
        return nestedMetrics;
    }
    else {
        throw new TypeError('Type of metrics argument not understood. Expected an Array or ' +
            'Object, found: ' + metrics);
    }
}
var Model = (function (_super) {
    __extends(Model, _super);
    function Model(config) {
        var _this = _super.call(this, config) || this;
        _this.isTraining = false;
        return _this;
    }
    Model.prototype.summary = function (lineLength, positions, printFn) {
        if (printFn === void 0) { printFn = console.log; }
        if (!this.built) {
            throw new errors_1.ValueError("This model has never been called, thus its weights have not been " +
                "created yet. So no summary can be displayed. Build the model " +
                "first (e.g., by calling it on some test data).");
        }
        layer_utils_1.printSummary(this, lineLength, positions, printFn);
    };
    Model.prototype.compile = function (config) {
        var _this = this;
        if (config.loss == null) {
            config.loss = [];
        }
        this.loss = config.loss;
        if (typeof config.optimizer === 'string') {
            this.optimizer = optimizers.getOptimizer(config.optimizer);
        }
        else {
            if (!(config.optimizer instanceof tfjs_core_1.Optimizer)) {
                throw new errors_1.ValueError("User-defined optimizer must be an instance of tf.Optimizer.");
            }
            this.optimizer = config.optimizer;
        }
        var lossFunctions = [];
        if (!Array.isArray(config.loss) && typeof config.loss !== 'string' &&
            typeof config.loss !== 'function') {
            config.loss = config.loss;
            for (var name_3 in config.loss) {
                if (this.outputNames.indexOf(name_3) === -1) {
                    throw new errors_1.ValueError("Unknown entry in loss dictionary: \"" + name_3 + "\". Only expect the " +
                        ("following keys: " + this.outputNames));
                }
            }
            for (var name_4 in this.outputNames) {
                if (config.loss[name_4] == null) {
                    console.warn("Output \"" + name_4 + "\" is missing from loss dictionary. We assume " +
                        "this was done on purpose, and we will not be expecting data " +
                        ("to be passed to " + name_4 + " during training"));
                }
                lossFunctions.push(losses.get(config.loss[name_4]));
            }
        }
        else if (Array.isArray(config.loss)) {
            if (config.loss.length !== this.outputs.length) {
                throw new errors_1.ValueError("When passing an Array as loss, it should have one entry per " +
                    ("model output. The model has " + this.outputs.length + " output(s), ") +
                    ("but you passed loss=" + config.loss + "."));
            }
            var theLosses = config.loss;
            lossFunctions = theLosses.map(function (l) { return losses.get(l); });
        }
        else {
            var lossFunction_1 = losses.get(config.loss);
            this.outputs.map(function (layer) {
                lossFunctions.push(lossFunction_1);
            });
        }
        this.lossFunctions = lossFunctions;
        this.feedOutputNames = [];
        this.feedOutputShapes = [];
        this.feedLossFns = [];
        for (var i = 0; i < this.outputs.length; ++i) {
            var shape = this.internalOutputShapes[i];
            var name_5 = this.outputNames[i];
            this.feedOutputNames.push(name_5);
            this.feedOutputShapes.push(shape);
            this.feedLossFns.push(this.lossFunctions[i]);
        }
        var skipTargetIndices = [];
        this.metrics = config.metrics;
        this.metricsNames = ['loss'];
        this.metricsTensors = [];
        common_1.nameScope('loss', function () {
            for (var i = 0; i < _this.outputs.length; ++i) {
                if (skipTargetIndices.indexOf(i) !== -1) {
                    continue;
                }
                var weightedLoss = _this.lossFunctions[i];
                if (_this.outputs.length > 1) {
                    _this.metricsTensors.push([weightedLoss, i]);
                    _this.metricsNames.push(_this.outputNames[i] + '_loss');
                }
            }
        });
        var nestedMetrics = collectMetrics(config.metrics, this.outputNames);
        var appendMetric = function (outputIndex, metricName, metricTensor) {
            if (_this.outputNames.length > 1) {
                metricName = _this.outputNames[outputIndex] + '_' + metricName;
            }
            _this.metricsNames.push(metricName);
            _this.metricsTensors.push([metricTensor, outputIndex]);
        };
        common_1.nameScope('metric', function () {
            var _loop_1 = function (i) {
                if (skipTargetIndices.indexOf(i) !== -1) {
                    return "continue";
                }
                var outputMetrics = nestedMetrics[i];
                var handleMetrics = function (metrics) {
                    var metricNamePrefix = '';
                    var metricName;
                    var accFn;
                    var weightedMetricFn;
                    var _loop_2 = function (metric) {
                        if (['accuracy', 'acc', 'crossentropy', 'ce'].indexOf(metric) !==
                            -1) {
                            var outputShape = _this.internalOutputShapes[i];
                            if (outputShape[outputShape.length - 1] === 1 ||
                                _this.lossFunctions[i] === losses.binaryCrossentropy) {
                                if (['accuracy', 'acc'].indexOf(metric) !== -1) {
                                    accFn = Metrics.binaryAccuracy;
                                }
                                else if (['crossentropy', 'ce'].indexOf(metric) !== -1) {
                                    accFn = Metrics.binaryCrossentropy;
                                }
                            }
                            else if (_this.lossFunctions[i] ===
                                losses.sparseCategoricalCrossentropy) {
                                if (['accuracy', 'acc'].indexOf(metric) !== -1) {
                                    accFn = Metrics.sparseCategoricalAccuracy;
                                }
                                else if (['crossentropy', 'ce'].indexOf(metric) !== -1) {
                                    accFn = Metrics.sparseCategoricalCrossentropy;
                                }
                            }
                            else {
                                if (['accuracy', 'acc'].indexOf(metric) !== -1) {
                                    accFn = Metrics.categoricalAccuracy;
                                }
                                else if (['crossentropy', 'ce'].indexOf(metric) !== -1) {
                                    accFn = Metrics.categoricalCrossentropy;
                                }
                            }
                            var suffix = void 0;
                            if (['accuracy', 'acc'].indexOf(metric) !== -1) {
                                suffix = 'acc';
                            }
                            else if (['crossentropy', 'ce'].indexOf(metric) !== -1) {
                                suffix = 'ce';
                            }
                            weightedMetricFn = accFn;
                            metricName = metricNamePrefix + suffix;
                        }
                        else {
                            var metricFn = Metrics.get(metric);
                            weightedMetricFn = metricFn;
                            metricName = metricNamePrefix + metric;
                        }
                        var metricResult;
                        common_1.nameScope(metricName, function () {
                            metricResult = weightedMetricFn;
                        });
                        appendMetric(i, metricName, metricResult);
                    };
                    for (var _i = 0, metrics_1 = metrics; _i < metrics_1.length; _i++) {
                        var metric = metrics_1[_i];
                        _loop_2(metric);
                    }
                };
                handleMetrics(outputMetrics);
            };
            for (var i = 0; i < _this.outputs.length; ++i) {
                _loop_1(i);
            }
        });
        this.collectedTrainableWeights = this.trainableWeights;
    };
    Model.prototype.checkTrainableWeightsConsistency = function () {
        if (this.collectedTrainableWeights == null) {
            return;
        }
        if (this.trainableWeights.length !==
            this.collectedTrainableWeights.length) {
            console.warn('Discrepancy between trainableweights and collected trainable ' +
                'weights. Did you set `model.trainable` without calling ' +
                '`model.compile()` afterwards?');
        }
    };
    Model.prototype.evaluate = function (x, y, config) {
        if (config === void 0) { config = {}; }
        var batchSize = config.batchSize == null ? 32 : config.batchSize;
        training_tensors_1.checkBatchSize(batchSize);
        var standardizedOuts = this.standardizeUserData(x, y, true, batchSize);
        try {
            var ins = standardizedOuts[0].concat(standardizedOuts[1]);
            this.makeTestFunction();
            var f = this.testFunction;
            var testOuts = this.testLoop(f, ins, batchSize, config.verbose, config.steps);
            return generic_utils_1.singletonOrArray(testOuts);
        }
        finally {
            training_tensors_1.disposeNewTensors(standardizedOuts[0], x);
            training_tensors_1.disposeNewTensors(standardizedOuts[1], y);
        }
    };
    Model.prototype.evaluateDataset = function (dataset, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.makeTestFunction();
                return [2, training_dataset_1.evaluateDataset(this, dataset, config)];
            });
        });
    };
    Model.prototype.checkNumSamples = function (ins, batchSize, steps, stepsName) {
        if (stepsName === void 0) { stepsName = 'steps'; }
        var numSamples;
        if (steps != null) {
            numSamples = null;
            if (batchSize != null) {
                throw new errors_1.ValueError("If " + stepsName + " is set, batchSize must be null or undefined." +
                    ("Got batchSize = " + batchSize));
            }
        }
        else if (ins != null) {
            if (Array.isArray(ins)) {
                numSamples = ins[0].shape[0];
            }
            else {
                numSamples = ins.shape[0];
            }
        }
        else {
            throw new errors_1.ValueError("Either the input data should have a defined shape, or " +
                (stepsName + " shoud be specified."));
        }
        return numSamples;
    };
    Model.prototype.execute = function (inputs, outputs) {
        if (Array.isArray(outputs) && outputs.length === 0) {
            throw new errors_1.ValueError('`outputs` is an empty Array, which is not allowed.');
        }
        var outputsIsArray = Array.isArray(outputs);
        var outputNames = (outputsIsArray ? outputs :
            [outputs]);
        var outputSymbolicTensors = this.retrieveSymbolicTensors(outputNames);
        var feedDict = new executor_1.FeedDict();
        if (inputs instanceof tfjs_core_1.Tensor) {
            inputs = [inputs];
        }
        if (Array.isArray(inputs)) {
            if (inputs.length !== this.inputs.length) {
                throw new errors_1.ValueError("The number of inputs provided (" + inputs.length + ") " +
                    "does not match the number of inputs of this model " +
                    ("(" + this.inputs.length + ")."));
            }
            for (var i = 0; i < this.inputs.length; ++i) {
                feedDict.add(this.inputs[i], inputs[i]);
            }
        }
        else {
            for (var _i = 0, _a = this.inputs; _i < _a.length; _i++) {
                var input = _a[_i];
                var tensorValue = inputs[input.name];
                if (tensorValue == null) {
                    throw new errors_1.ValueError("No value is provided for the model's input " + input.name);
                }
                feedDict.add(input, tensorValue);
            }
        }
        var executeOutputs = executor_1.execute(outputSymbolicTensors, feedDict);
        return outputsIsArray ? executeOutputs : executeOutputs[0];
    };
    Model.prototype.retrieveSymbolicTensors = function (symbolicTensorNames) {
        var outputSymbolicTensors = generic_utils_1.pyListRepeat(null, symbolicTensorNames.length);
        var outputsRemaining = symbolicTensorNames.length;
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            var layerOutputs = Array.isArray(layer.output) ?
                layer.output :
                [layer.output];
            var layerOutputNames = layerOutputs.map(function (output) { return output.name; });
            for (var i = 0; i < symbolicTensorNames.length; ++i) {
                var index = layerOutputNames.indexOf(symbolicTensorNames[i]);
                if (index !== -1) {
                    outputSymbolicTensors[i] = layerOutputs[index];
                    outputsRemaining--;
                }
                if (outputsRemaining === 0) {
                    break;
                }
            }
            if (outputsRemaining === 0) {
                break;
            }
        }
        if (outputsRemaining > 0) {
            var remainingNames_1 = [];
            outputSymbolicTensors.forEach(function (tensor, i) {
                if (tensor == null) {
                    remainingNames_1.push(symbolicTensorNames[i]);
                }
            });
            throw new errors_1.ValueError("Cannot find SymbolicTensors for output name(s): " +
                ("" + JSON.stringify(remainingNames_1)));
        }
        return outputSymbolicTensors;
    };
    Model.prototype.predictLoop = function (ins, batchSize, verbose) {
        var _this = this;
        if (batchSize === void 0) { batchSize = 32; }
        if (verbose === void 0) { verbose = false; }
        return tfc.tidy(function () {
            var numSamples = _this.checkNumSamples(ins);
            if (verbose) {
                throw new errors_1.NotImplementedError('Verbose predictLoop() is not implemented yet.');
            }
            var batches = training_tensors_1.makeBatches(numSamples, batchSize);
            var outs = [];
            var _loop_3 = function (batchIndex) {
                var batchOuts = tfc.tidy(function () {
                    var batchStart = batches[batchIndex][0];
                    var batchEnd = batches[batchIndex][1];
                    var insBatch = training_tensors_1.sliceArrays(ins, batchStart, batchEnd);
                    var feeds = [];
                    if (Array.isArray(insBatch)) {
                        for (var i = 0; i < insBatch.length; ++i) {
                            feeds.push({ key: _this.inputs[i], value: insBatch[i] });
                        }
                    }
                    else {
                        feeds.push({ key: _this.inputs[0], value: insBatch });
                    }
                    var feedDict = new executor_1.FeedDict(feeds);
                    return executor_1.execute(_this.outputs, feedDict);
                });
                if (batchIndex === 0) {
                    for (var _i = 0, batchOuts_1 = batchOuts; _i < batchOuts_1.length; _i++) {
                        var batchOut = batchOuts_1[_i];
                        outs.push(batchOut);
                    }
                }
                else {
                    for (var i = 0; i < batchOuts.length; ++i) {
                        outs[i] = K.concatAlongFirstAxis(outs[i], batchOuts[i]);
                    }
                }
            };
            for (var batchIndex = 0; batchIndex < batches.length; ++batchIndex) {
                _loop_3(batchIndex);
            }
            return generic_utils_1.singletonOrArray(outs);
        });
    };
    Model.prototype.predict = function (x, config) {
        if (config === void 0) { config = {}; }
        var xsRank2OrHigher = training_tensors_1.ensureTensorsRank2OrHigher(x);
        checkInputData(xsRank2OrHigher, this.inputNames, this.feedInputShapes, false);
        try {
            var batchSize = config.batchSize == null ? 32 : config.batchSize;
            training_tensors_1.checkBatchSize(batchSize);
            return this.predictLoop(xsRank2OrHigher, batchSize);
        }
        finally {
            training_tensors_1.disposeNewTensors(xsRank2OrHigher, x);
        }
    };
    Model.prototype.predictOnBatch = function (x) {
        checkInputData(x, this.inputNames, this.feedInputShapes, true);
        return this.predictLoop(x, x.shape[0]);
    };
    Model.prototype.standardizeUserData = function (x, y, checkBatchAxis, batchSize) {
        if (checkBatchAxis === void 0) { checkBatchAxis = true; }
        if (this.optimizer == null) {
            throw new errors_1.RuntimeError('You must compile a model before training/testing. Use ' +
                'Model.compile(modelCompileConfig).');
        }
        var outputShapes = [];
        for (var i = 0; i < this.feedOutputShapes.length; ++i) {
            var outputShape = this.feedOutputShapes[i];
            var lossFn = this.feedLossFns[i];
            if (lossFn === losses.sparseCategoricalCrossentropy) {
                outputShapes.push(outputShape.slice(0, outputShape.length - 1).concat([1]));
            }
            else {
                outputShapes.push(outputShape);
            }
        }
        x = standardizeInputData(x, this.feedInputNames, this.feedInputShapes, false, 'input');
        y = standardizeInputData(y, this.feedOutputNames, outputShapes, false, 'target');
        checkArrayLengths(x, y, null);
        checkLossAndTargetCompatibility(y, this.feedLossFns, this.feedOutputShapes);
        if (this.stateful && batchSize != null && batchSize > 0) {
            if (x[0].shape[0] % batchSize !== 0) {
                throw new errors_1.ValueError("In a stateful network, you should only pass inputs with a " +
                    "number of samples that is divisible by the batch size " +
                    (batchSize + ". Found: " + x[0].shape[0] + " sample(s)."));
            }
        }
        return [x, y, null];
    };
    Model.prototype.testLoop = function (f, ins, batchSize, verbose, steps) {
        var _this = this;
        if (verbose === void 0) { verbose = 0; }
        return tfc.tidy(function () {
            var numSamples = _this.checkNumSamples(ins, batchSize, steps, 'steps');
            var outs = [];
            if (verbose > 0) {
                throw new errors_1.NotImplementedError('Verbose mode is not implemented yet.');
            }
            if (steps != null) {
                throw new errors_1.NotImplementedError('steps mode in testLoop() is not implemented yet');
            }
            else {
                var batches = training_tensors_1.makeBatches(numSamples, batchSize);
                var indexArray = tfjs_core_1.tensor1d(math_utils_1.range(0, numSamples));
                for (var batchIndex = 0; batchIndex < batches.length; ++batchIndex) {
                    var batchStart = batches[batchIndex][0];
                    var batchEnd = batches[batchIndex][1];
                    var batchIds = K.sliceAlongFirstAxis(indexArray, batchStart, batchEnd - batchStart);
                    var insBatch = training_tensors_1.sliceArraysByIndices(ins, batchIds);
                    var batchOuts = f(insBatch);
                    if (batchIndex === 0) {
                        for (var i = 0; i < batchOuts.length; ++i) {
                            outs.push(state_1.getScalar(0));
                        }
                    }
                    for (var i = 0; i < batchOuts.length; ++i) {
                        var batchOut = batchOuts[i];
                        outs[i] =
                            tfc.add(outs[i], tfc.mul(state_1.getScalar(batchEnd - batchStart), batchOut));
                    }
                }
                for (var i = 0; i < outs.length; ++i) {
                    outs[i] = tfc.div(outs[i], state_1.getScalar(numSamples));
                }
            }
            return outs;
        });
    };
    Model.prototype.getDedupedMetricsNames = function () {
        var outLabels = this.metricsNames;
        var dedupedOutLabels = [];
        for (var i = 0; i < outLabels.length; ++i) {
            var label = outLabels[i];
            var newLabel = label;
            if (generic_utils_1.count(outLabels, label) > 1) {
                var dupIndex = generic_utils_1.count(outLabels.slice(0, i), label);
                newLabel += "_" + dupIndex;
            }
            dedupedOutLabels.push(newLabel);
        }
        return dedupedOutLabels;
    };
    Model.prototype.makeTrainFunction = function () {
        var _this = this;
        return function (data) {
            var losses = [];
            var lossValues = [];
            var inputs = data.slice(0, _this.inputs.length);
            var targets = data.slice(_this.inputs.length, _this.inputs.length + _this.outputs.length);
            var metricsValues = [];
            var totalLossFunction = function () {
                var feeds = [];
                for (var i = 0; i < _this.inputs.length; ++i) {
                    feeds.push({ key: _this.inputs[i], value: inputs[i] });
                }
                var feedDict = new executor_1.FeedDict(feeds);
                var outputs = executor_1.execute(_this.outputs, feedDict, { 'training': true });
                var totalLoss;
                for (var i = 0; i < _this.lossFunctions.length; ++i) {
                    var lossFunction = _this.lossFunctions[i];
                    var loss = lossFunction(targets[i], outputs[i]);
                    losses.push(loss);
                    var meanLoss = tfc.mean(loss);
                    lossValues.push(meanLoss);
                    if (i === 0) {
                        totalLoss = loss;
                    }
                    else {
                        totalLoss = tfc.add(totalLoss, loss);
                    }
                }
                for (var i = 0; i < _this.metricsTensors.length; ++i) {
                    var metric = _this.metricsTensors[i][0];
                    var outputIndex = _this.metricsTensors[i][1];
                    var meanMetric = tfc.mean(metric(targets[outputIndex], outputs[outputIndex]));
                    tfc.keep(meanMetric);
                    metricsValues.push(meanMetric);
                }
                totalLoss = tfc.mean(totalLoss);
                _this.calculateLosses().forEach(function (regularizerLoss) {
                    totalLoss = tfc.add(totalLoss, regularizerLoss);
                });
                return totalLoss;
            };
            var variables = _this.collectedTrainableWeights.map(function (param) { return param.read(); });
            var returnCost = true;
            var totalLossValue = _this.optimizer.minimize(totalLossFunction, returnCost, variables);
            return [totalLossValue].concat(metricsValues);
        };
    };
    Model.prototype.makeTestFunction = function () {
        var _this = this;
        this.testFunction = function (data) {
            return tfc.tidy(function () {
                var valOutputs = [];
                var totalLoss;
                var inputs = data.slice(0, _this.inputs.length);
                var targets = data.slice(_this.inputs.length, _this.inputs.length + _this.outputs.length);
                var feeds = [];
                for (var i = 0; i < _this.inputs.length; ++i) {
                    feeds.push({ key: _this.inputs[i], value: inputs[i] });
                }
                var feedDict = new executor_1.FeedDict(feeds);
                var outputs = executor_1.execute(_this.outputs, feedDict);
                for (var i = 0; i < _this.lossFunctions.length; ++i) {
                    var lossFunction = _this.lossFunctions[i];
                    var loss = tfc.mean(lossFunction(targets[i], outputs[i]));
                    if (i === 0) {
                        totalLoss = loss;
                    }
                    else {
                        totalLoss = tfc.add(totalLoss, loss);
                    }
                    valOutputs.push(totalLoss);
                }
                for (var i = 0; i < _this.metricsTensors.length; ++i) {
                    var metric = _this.metricsTensors[i][0];
                    var outputIndex = _this.metricsTensors[i][1];
                    var meanMetric = tfc.mean(metric(targets[outputIndex], outputs[outputIndex]));
                    valOutputs.push(meanMetric);
                }
                return valOutputs;
            });
        };
    };
    Model.prototype.fit = function (x, y, config) {
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, training_tensors_1.fitTensors(this, x, y, config)];
            });
        });
    };
    Model.prototype.fitDataset = function (dataset, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, training_dataset_1.fitDataset(this, dataset, config)];
            });
        });
    };
    Model.prototype.getNamedWeights = function (config) {
        var namedWeights = {};
        var trainableOnly = config != null && config.trainableOnly;
        var weights = trainableOnly ? this.trainableWeights : this.weights;
        var weightValues = this.getWeights(trainableOnly);
        for (var i = 0; i < weights.length; ++i) {
            if (trainableOnly && !weights[i].trainable) {
                continue;
            }
            namedWeights[weights[i].originalName] = weightValues[i];
        }
        return namedWeights;
    };
    Object.defineProperty(Model.prototype, "stopTraining", {
        set: function (stop) {
            this.stopTraining_ = stop;
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.save = function (handlerOrURL, config) {
        return __awaiter(this, void 0, void 0, function () {
            var handlers, weightDataAndSpecs, returnString, unusedArg, modelConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof handlerOrURL === 'string') {
                            handlers = tfjs_core_1.io.getSaveHandlers(handlerOrURL);
                            if (handlers.length === 0) {
                                throw new errors_1.ValueError("Cannot find any save handlers for URL '" + handlerOrURL + "'");
                            }
                            else if (handlers.length > 1) {
                                throw new errors_1.ValueError("Found more than one (" + handlers.length + ") save handlers for " +
                                    ("URL '" + handlerOrURL + "'"));
                            }
                            handlerOrURL = handlers[0];
                        }
                        if (handlerOrURL.save == null) {
                            throw new errors_1.ValueError('Model.save() cannot proceed because the IOHandler provided does ' +
                                'not have the `save` attribute defined.');
                        }
                        return [4, tfjs_core_1.io.encodeWeights(this.getNamedWeights(config))];
                    case 1:
                        weightDataAndSpecs = _a.sent();
                        returnString = false;
                        unusedArg = null;
                        modelConfig = this.toJSON(unusedArg, returnString);
                        return [2, handlerOrURL.save({
                                modelTopology: modelConfig,
                                weightData: weightDataAndSpecs.data,
                                weightSpecs: weightDataAndSpecs.specs
                            })];
                }
            });
        });
    };
    Model.className = 'Model';
    return Model;
}(container_1.Container));
exports.Model = Model;
tfjs_core_1.serialization.registerClass(Model);
//# sourceMappingURL=training.js.map