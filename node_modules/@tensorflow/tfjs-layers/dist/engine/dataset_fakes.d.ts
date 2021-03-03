import * as tfc from '@tensorflow/tfjs-core';
import { Shape } from '../types';
import { Dataset, LazyIterator, TensorOrTensorMap } from './dataset_stub';
export interface FakeDatasetConfig {
    xShape: Shape | {
        [name: string]: Shape;
    };
    yShape: Shape | {
        [name: string]: Shape;
    };
    xTensorsFunc?: () => tfc.Tensor[] | {
        [name: string]: tfc.Tensor[];
    };
    yTensorsFunc?: () => tfc.Tensor[] | {
        [name: string]: tfc.Tensor[];
    };
    batchSize: number;
    numBatches: number;
}
export declare class FakeNumericDataset extends Dataset<[TensorOrTensorMap, TensorOrTensorMap]> {
    readonly config: FakeDatasetConfig;
    constructor(config: FakeDatasetConfig);
    iterator(): Promise<LazyIterator<[TensorOrTensorMap, TensorOrTensorMap]>>;
}
