import { Tensor, Tensor1D } from '@tensorflow/tfjs-core';
import { BaseCallback, CustomCallbackConfig, History, ModelLoggingVerbosity, YieldEveryOptions } from '../base_callbacks';
export interface ModelFitConfig {
    batchSize?: number;
    epochs?: number;
    verbose?: ModelLoggingVerbosity;
    callbacks?: BaseCallback[] | CustomCallbackConfig | CustomCallbackConfig[];
    validationSplit?: number;
    validationData?: [Tensor | Tensor[], Tensor | Tensor[]] | [Tensor | Tensor[], Tensor | Tensor[], Tensor | Tensor[]];
    shuffle?: boolean;
    classWeight?: {
        [classIndex: string]: number;
    };
    sampleWeight?: Tensor;
    initialEpoch?: number;
    stepsPerEpoch?: number;
    validationSteps?: number;
    yieldEvery?: YieldEveryOptions;
}
export declare function checkBatchSize(batchSize: number): void;
export declare function sliceArrays(arrays: Tensor | Tensor[], start: number, stop: number): Tensor | Tensor[];
export declare function sliceArraysByIndices(arrays: Tensor | Tensor[], indices: Tensor1D): Tensor | Tensor[];
export declare function makeBatches(size: number, batchSize: number): Array<[number, number]>;
export declare function fitTensors(model: any, x: Tensor | Tensor[] | {
    [inputName: string]: Tensor;
}, y: Tensor | Tensor[] | {
    [inputName: string]: Tensor;
}, config?: ModelFitConfig): Promise<History>;
export declare function ensureTensorsRank2OrHigher(tensors: Tensor | Tensor[]): Tensor[];
export declare function disposeNewTensors(tensors: Tensor | Tensor[] | {
    [inputName: string]: Tensor;
}, refTensors: Tensor | Tensor[] | {
    [inputName: string]: Tensor;
}): void;
