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
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var state_1 = require("../backend/state");
var K = require("../backend/tfjs_backend");
var topology_1 = require("../engine/topology");
var errors_1 = require("../errors");
var losses_1 = require("../losses");
var generic_utils = require("../utils/generic_utils");
var mathUtils = require("../utils/math_utils");
var types_utils_1 = require("../utils/types_utils");
var Merge = (function (_super) {
    __extends(Merge, _super);
    function Merge(config) {
        var _this = _super.call(this, config || {}) || this;
        _this.supportsMasking = true;
        return _this;
    }
    Merge.prototype.mergeFunction = function (inputs) {
        throw new errors_1.NotImplementedError();
    };
    Merge.prototype.computeElementwiseOpOutputShape = function (shape1, shape2) {
        if (shape1 == null || shape2 == null) {
            return null;
        }
        else if (shape1.length < shape2.length) {
            return this.computeElementwiseOpOutputShape(shape2, shape1);
        }
        else if (shape2.length === 0) {
            return shape1;
        }
        var outputShape = shape1.slice(0, shape1.length - shape2.length);
        for (var k = 0; k < shape2.length; ++k) {
            var i = shape1[shape1.length - shape2.length + k];
            var j = shape2[k];
            if (i == null || j == null || i < 0 || j < 0) {
                outputShape.push(null);
            }
            else if (i === 1) {
                outputShape.push(j);
            }
            else if (j === 1) {
                outputShape.push(i);
            }
            else {
                if (i !== j) {
                    throw new errors_1.ValueError('Operands could not be broadcast together with shapes ' +
                        JSON.stringify(shape1) + ' ' + JSON.stringify(shape2));
                }
                outputShape.push(i);
            }
        }
        return outputShape;
    };
    Merge.prototype.build = function (inputShape) {
        if (Array.isArray(inputShape) && !Array.isArray(inputShape[0])) {
            inputShape = [types_utils_1.getExactlyOneShape(inputShape)];
        }
        inputShape = inputShape;
        if (inputShape.length < 2) {
            throw new errors_1.ValueError('A merge layer should be called on an Array of at least 2 inputs.' +
                (" Got " + inputShape.length + " input(s)."));
        }
        var batchSizes = [];
        for (var _i = 0, inputShape_1 = inputShape; _i < inputShape_1.length; _i++) {
            var shape = inputShape_1[_i];
            if (shape != null && shape[0] !== null) {
                batchSizes.push(shape[0]);
            }
        }
        batchSizes = generic_utils.unique(batchSizes);
        if (batchSizes.length > 1) {
            throw new errors_1.ValueError("Can not merge tensors with different batch sizes. " +
                ("Got tensors with shapes: " + JSON.stringify(inputShape) + "."));
        }
        var outputShape = inputShape[0] == null ? null : inputShape[0].slice(1);
        for (var i = 1; i < inputShape.length; ++i) {
            var shape = inputShape[i] == null ? null : inputShape[i].slice(1);
            outputShape = this.computeElementwiseOpOutputShape(outputShape, shape);
        }
        var allRanks = inputShape.map(function (shape) { return shape.length; });
        if (inputShape.indexOf(null) === -1 &&
            generic_utils.unique(allRanks).length === 1) {
            this.reshapeRequired = false;
        }
        else {
            this.reshapeRequired = true;
        }
    };
    Merge.prototype.call = function (inputs, kwargs) {
        var _this = this;
        return tfjs_core_1.tidy(function () {
            inputs = inputs;
            if (_this.reshapeRequired) {
                var reshapedInputs = [];
                var inputDims = inputs.map(function (input) { return input.rank; });
                if (inputDims.indexOf(null) === -1) {
                    var maxNDim = mathUtils.max(inputDims);
                    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
                        var x = inputs_1[_i];
                        var xNDim = x.rank;
                        for (var k = 0; k < maxNDim - xNDim; ++k) {
                            x = K.expandDims(x, 1);
                        }
                        reshapedInputs.push(x);
                    }
                    return _this.mergeFunction(reshapedInputs);
                }
                else {
                    var transposed = false;
                    for (var _a = 0, inputs_2 = inputs; _a < inputs_2.length; _a++) {
                        var x = inputs_2[_a];
                        var xNDim = x.rank;
                        if (xNDim == null) {
                            var xShape = x.shape;
                            var batchSize = xShape[0];
                            var newShape = xShape.slice(1).concat([batchSize]);
                            var xTransposed = x.reshape([batchSize].concat(mathUtils.arrayProd(xShape.slice(1))));
                            xTransposed = tfc.transpose(xTransposed, [1, 0]);
                            xTransposed = xTransposed.reshape(newShape);
                            reshapedInputs.push(xTransposed);
                            transposed = true;
                        }
                        else if (xNDim > 1) {
                            var dims = mathUtils.range(1, xNDim).concat([0]);
                            reshapedInputs.push(tfc.transpose(x, dims));
                            transposed = true;
                        }
                        else {
                            reshapedInputs.push(x);
                        }
                    }
                    var y = _this.mergeFunction(reshapedInputs);
                    var yNDim = y.rank;
                    if (transposed) {
                        if (yNDim == null) {
                            var yShape = y.shape;
                            var yNDim_1 = yShape.length;
                            var batchSize = yShape[yNDim_1 - 1];
                            var newShape = [batchSize].concat(yShape.slice(0, yShape.length - 1));
                            y = tfc.transpose(y.reshape([-1, batchSize]), [1, 0])
                                .reshape(newShape);
                        }
                        else if (yNDim > 1) {
                            var dims = [yNDim - 1].concat(mathUtils.range(0, yNDim - 1));
                            y = tfc.transpose(y, dims);
                        }
                    }
                    return y;
                }
            }
            else {
                return _this.mergeFunction(inputs);
            }
        });
    };
    Merge.prototype.computeOutputShape = function (inputShape) {
        inputShape = inputShape;
        var outputShape;
        if (inputShape[0] == null) {
            outputShape = null;
        }
        else {
            outputShape = inputShape[0].slice(1);
        }
        for (var i = 1; i < inputShape.length; ++i) {
            var shape = inputShape[i] == null ? null : inputShape[i].slice(1);
            outputShape = this.computeElementwiseOpOutputShape(outputShape, shape);
        }
        var batchSizes = [];
        for (var _i = 0, inputShape_2 = inputShape; _i < inputShape_2.length; _i++) {
            var shape = inputShape_2[_i];
            if (shape != null && shape[0] !== null) {
                batchSizes.push(shape[0]);
            }
        }
        batchSizes = generic_utils.unique(batchSizes);
        if (batchSizes.length === 1) {
            outputShape = batchSizes.concat(outputShape);
        }
        else {
            outputShape = [null].concat(outputShape);
        }
        return outputShape;
    };
    Merge.prototype.computeMask = function (inputs, mask) {
        throw new errors_1.NotImplementedError('computeMask has not been implemented for Merge yet');
    };
    return Merge;
}(topology_1.Layer));
exports.Merge = Merge;
var Add = (function (_super) {
    __extends(Add, _super);
    function Add(config) {
        return _super.call(this, config) || this;
    }
    Add.prototype.mergeFunction = function (inputs) {
        return tfjs_core_1.tidy(function () {
            var output = inputs[0].clone();
            for (var i = 1; i < inputs.length; ++i) {
                output = tfc.add(output, inputs[i]);
            }
            return output;
        });
    };
    Add.className = 'Add';
    return Add;
}(Merge));
exports.Add = Add;
tfjs_core_1.serialization.registerClass(Add);
function add(config) {
    if (Array.isArray(config)) {
        var layer = new Add({});
        return layer.apply(config);
    }
    else {
        return new Add(config);
    }
}
exports.add = add;
var Multiply = (function (_super) {
    __extends(Multiply, _super);
    function Multiply(config) {
        return _super.call(this, config) || this;
    }
    Multiply.prototype.mergeFunction = function (inputs) {
        return tfjs_core_1.tidy(function () {
            var output = inputs[0].clone();
            for (var i = 1; i < inputs.length; ++i) {
                output = tfc.mul(output, inputs[i]);
            }
            return output;
        });
    };
    Multiply.className = 'Multiply';
    return Multiply;
}(Merge));
exports.Multiply = Multiply;
tfjs_core_1.serialization.registerClass(Multiply);
function multiply(config) {
    if (Array.isArray(config)) {
        var layer = new Multiply({});
        return layer.apply(config);
    }
    else {
        return new Multiply(config);
    }
}
exports.multiply = multiply;
var Average = (function (_super) {
    __extends(Average, _super);
    function Average(config) {
        return _super.call(this, config) || this;
    }
    Average.prototype.mergeFunction = function (inputs) {
        return tfjs_core_1.tidy(function () {
            var output = inputs[0].clone();
            for (var i = 1; i < inputs.length; ++i) {
                output = tfc.add(output, inputs[i]);
            }
            return tfc.mul(state_1.getScalar(1 / inputs.length), output);
        });
    };
    Average.className = 'Average';
    return Average;
}(Merge));
exports.Average = Average;
tfjs_core_1.serialization.registerClass(Average);
function average(config) {
    if (Array.isArray(config)) {
        var layer = new Average({});
        return layer.apply(config);
    }
    else {
        return new Average(config);
    }
}
exports.average = average;
var Maximum = (function (_super) {
    __extends(Maximum, _super);
    function Maximum(config) {
        return _super.call(this, config) || this;
    }
    Maximum.prototype.mergeFunction = function (inputs) {
        return tfjs_core_1.tidy(function () {
            var output = inputs[0];
            for (var i = 1; i < inputs.length; ++i) {
                output = tfc.maximum(output, inputs[i]);
            }
            return output;
        });
    };
    Maximum.className = 'Maximum';
    return Maximum;
}(Merge));
exports.Maximum = Maximum;
tfjs_core_1.serialization.registerClass(Maximum);
function maximum(config) {
    if (Array.isArray(config)) {
        var layer = new Maximum({});
        return layer.apply(config);
    }
    else {
        return new Maximum(config);
    }
}
exports.maximum = maximum;
var Minimum = (function (_super) {
    __extends(Minimum, _super);
    function Minimum(config) {
        return _super.call(this, config) || this;
    }
    Minimum.prototype.mergeFunction = function (inputs) {
        return tfjs_core_1.tidy(function () {
            var output = inputs[0];
            for (var i = 1; i < inputs.length; ++i) {
                output = tfc.minimum(output, inputs[i]);
            }
            return output;
        });
    };
    Minimum.className = 'Minimum';
    return Minimum;
}(Merge));
exports.Minimum = Minimum;
tfjs_core_1.serialization.registerClass(Minimum);
function minimum(config) {
    if (Array.isArray(config)) {
        var layer = new Minimum({});
        return layer.apply(config);
    }
    else {
        return new Minimum(config);
    }
}
exports.minimum = minimum;
var Concatenate = (function (_super) {
    __extends(Concatenate, _super);
    function Concatenate(config) {
        var _this = _super.call(this, config) || this;
        _this.DEFAULT_AXIS = -1;
        if (config == null) {
            config = {};
        }
        _this.axis = config.axis == null ? _this.DEFAULT_AXIS : config.axis;
        _this.supportsMasking = true;
        _this.reshapeRequired = false;
        return _this;
    }
    Concatenate.prototype.build = function (inputShape) {
        if (!(Array.isArray(inputShape) && Array.isArray(inputShape[0])) ||
            inputShape.length === 1) {
            throw new errors_1.ValueError('A `Concatenate` layer should be called on a list of at least 2 ' +
                'inputs');
        }
        inputShape = inputShape;
        var allNoneShape = true;
        for (var _i = 0, inputShape_3 = inputShape; _i < inputShape_3.length; _i++) {
            var shape = inputShape_3[_i];
            if (shape != null) {
                allNoneShape = false;
                break;
            }
        }
        if (allNoneShape) {
            return;
        }
        var shapeSet = [];
        for (var i = 0; i < inputShape.length; ++i) {
            var shapeWithoutConcatAxis = inputShape[i].slice();
            shapeWithoutConcatAxis.splice(this.axis, 1);
            var exists = false;
            for (var _a = 0, shapeSet_1 = shapeSet; _a < shapeSet_1.length; _a++) {
                var shape = shapeSet_1[_a];
                if (tfjs_core_1.util.arraysEqual(shape, shapeWithoutConcatAxis)) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                shapeSet.push(shapeWithoutConcatAxis);
            }
        }
        if (shapeSet.length > 1) {
            throw new errors_1.ValueError('A `Concatenate` layer requires inputs with matching shapes ' +
                'except for the concat axis. Got input shapes: ' +
                JSON.stringify(inputShape));
        }
    };
    Concatenate.prototype.mergeFunction = function (inputs) {
        var _this = this;
        return tfjs_core_1.tidy(function () {
            return K.concatenate(inputs, _this.axis);
        });
    };
    Concatenate.prototype.computeOutputShape = function (inputShape) {
        if (!(Array.isArray(inputShape) && Array.isArray(inputShape[0]))) {
            throw new errors_1.ValueError('A `Concatenate` layer should be called on a list of inputs.');
        }
        var inputShapes = inputShape;
        var outputShape = inputShapes[0].slice();
        var axis = this.axis < 0 ? outputShape.length + this.axis : this.axis;
        for (var _i = 0, _a = inputShapes.slice(1); _i < _a.length; _i++) {
            var shape = _a[_i];
            if (outputShape[axis] == null || shape[axis] == null) {
                outputShape[axis] = null;
                break;
            }
            outputShape[axis] += shape[axis];
        }
        return outputShape;
    };
    Concatenate.prototype.computeMask = function (inputs, mask) {
        throw new errors_1.NotImplementedError('computeMask has not been implemented for Concatenate yet');
    };
    Concatenate.prototype.getConfig = function () {
        var config = {
            'axis': this.axis,
        };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    Concatenate.className = 'Concatenate';
    return Concatenate;
}(Merge));
exports.Concatenate = Concatenate;
tfjs_core_1.serialization.registerClass(Concatenate);
function concatenate(config) {
    if (Array.isArray(config)) {
        var layer = new Concatenate({});
        return layer.apply(config);
    }
    else {
        return new Concatenate(config);
    }
}
exports.concatenate = concatenate;
function interpretAxis(axis, dim) {
    while (axis < 0) {
        axis += dim;
    }
    return axis;
}
function batchDot(x, y, axes) {
    if (x.shape.length > 3 || y.shape.length > 3) {
        throw new errors_1.NotImplementedError('batchDot is not implemented for tensors of 4D or higher rank yet');
    }
    tfc.util.assert(x.shape.length >= 2, "batchDot requires the rank of x to be >= 2, " +
        ("but got " + x.shape.length));
    tfc.util.assert(x.shape.length >= 2, "batchDot requires the rank of y to be >= 2, " +
        ("but got " + y.shape.length));
    if (typeof axes === 'number') {
        axes = [axes, axes];
    }
    if (x.dtype === 'complex64' || y.dtype === 'complex64') {
        throw new errors_1.NotImplementedError('batchDot is not implemented for complex64-type Tensors yet.');
    }
    var xNDim = x.shape.length;
    var yNDim = y.shape.length;
    if (axes == null) {
        axes = [xNDim - 1, yNDim - 2];
    }
    var axesArray = axes;
    return tfc.tidy(function () {
        var diff;
        if (xNDim > yNDim) {
            diff = xNDim - yNDim;
            var diffShape = [];
            for (var i = 0; i < diff; ++i) {
                diffShape.push(1);
            }
            y = y.reshape(y.shape.concat(diffShape));
        }
        else if (yNDim > xNDim) {
            diff = yNDim - xNDim;
            var diffShape = [];
            for (var i = 0; i < diff; ++i) {
                diffShape.push(1);
            }
            x = x.reshape(x.shape.concat(diffShape));
        }
        else {
            diff = 0;
        }
        var out;
        if (x.shape.length === 2 && y.shape.length === 2) {
            if (axesArray[0] === axesArray[1]) {
                out = x.mulStrict(y).sum(axesArray[0]);
            }
            else {
                out = x.transpose([1, 0]).mulStrict(y).sum(axesArray[1]);
            }
        }
        else {
            var adjX = axesArray[0] === x.shape.length - 1 ? null : true;
            var adjY = axesArray[1] === y.shape.length - 1 ? true : null;
            out = x.matMul(y, adjX, adjY);
        }
        if (diff > 0) {
            var idx = void 0;
            if (xNDim > yNDim) {
                idx = xNDim + yNDim - 3;
            }
            else {
                idx = xNDim - 1;
            }
            var squeezeAxes = [];
            for (var i = idx; i < idx + diff; ++i) {
                squeezeAxes.push(i);
            }
            out = out.squeeze(squeezeAxes);
        }
        if (out.shape.length === 1) {
            out = out.expandDims(1);
        }
        return out;
    });
}
var Dot = (function (_super) {
    __extends(Dot, _super);
    function Dot(config) {
        var _this = _super.call(this, config) || this;
        _this.axes = config.axes;
        _this.normalize = config.normalize == null ? false : config.normalize;
        _this.supportsMasking = true;
        _this.reshapeRequired = false;
        return _this;
    }
    Dot.prototype.build = function (inputShape) {
        tfc.util.assert(Array.isArray(inputShape) && inputShape.length === 2 &&
            Array.isArray(inputShape[0]) && Array.isArray(inputShape[1]), 'A `Dot` layer should be called on a list of exactly 2 inputs.');
        var shape1 = inputShape[0];
        var shape2 = inputShape[1];
        if (shape1.length > 3 || shape2.length > 3) {
            throw new errors_1.NotImplementedError('Dot layer does not support tensors of 4D or higher rank yet.');
        }
        var axes = this.interpretAxes(shape1, shape2);
        if (shape1[axes[0]] !== shape2[axes[1]]) {
            throw new errors_1.ValueError("Dimension incompatibility: " +
                (shape1[axes[0]] + " !== " + shape2[axes[1]]));
        }
    };
    Dot.prototype.mergeFunction = function (inputs) {
        if (inputs.length !== 2) {
            throw new errors_1.ValueError('A `Dot` layer must be called on exactly 2 inputs, ' +
                ("but received " + inputs.length + " input(s)."));
        }
        var x1 = inputs[0];
        var x2 = inputs[1];
        var axes;
        if (!Array.isArray(this.axes)) {
            axes = [
                interpretAxis(this.axes, x1.shape.length),
                interpretAxis(this.axes, x2.shape.length)
            ];
        }
        else {
            axes = this.axes.map(function (axis, i) { return interpretAxis(axis, inputs[i].shape.length); });
        }
        if (this.normalize) {
            x1 = losses_1.l2Normalize(x1, axes[0]);
            x2 = losses_1.l2Normalize(x2, axes[1]);
        }
        return batchDot(x1, x2, axes);
    };
    Dot.prototype.interpretAxes = function (shape1, shape2) {
        var axes;
        if (!Array.isArray(this.axes)) {
            axes = [
                interpretAxis(this.axes, shape1.length),
                interpretAxis(this.axes, shape2.length)
            ];
        }
        else {
            axes = this.axes;
        }
        return axes;
    };
    Dot.prototype.computeOutputShape = function (inputShape) {
        tfc.util.assert(Array.isArray(inputShape) && inputShape.length === 2 &&
            Array.isArray(inputShape[0]) && Array.isArray(inputShape[1]), 'A `Dot` layer should be called on a list of exactly 2 inputs.');
        var shape1 = inputShape[0].slice();
        var shape2 = inputShape[1].slice();
        if (shape1.length > 3 || shape2.length > 3) {
            throw new errors_1.NotImplementedError('Dot layer does not support tensors of 4D or higher rank yet.');
        }
        var axes = this.interpretAxes(shape1, shape2);
        shape1.splice(axes[0], 1);
        shape2.splice(axes[1], 1);
        shape2.splice(0, 1);
        var outputShape = shape1.concat(shape2);
        if (outputShape.length === 1) {
            outputShape.push(1);
        }
        return outputShape;
    };
    Dot.prototype.computeMask = function (inputs, mask) {
        throw new errors_1.NotImplementedError('computeMask has not been implemented for Dot yet');
    };
    Dot.prototype.getConfig = function () {
        var config = {
            'axes': this.axes,
            'normalize': this.normalize
        };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    Dot.className = 'Dot';
    return Dot;
}(Merge));
exports.Dot = Dot;
tfjs_core_1.serialization.registerClass(Dot);
//# sourceMappingURL=merge.js.map