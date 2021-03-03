import * as tfc from '@tensorflow/tfjs-core';
import { TensorContainer } from '@tensorflow/tfjs-core/dist/tensor_types';
import { BaseCallback, CustomCallbackConfig, History, ModelLoggingVerbosity, YieldEveryOptions } from '../base_callbacks';
import { Dataset, LazyIterator, TensorMap } from './dataset_stub';
export interface ModelFitDatasetConfig<T extends TensorContainer> {
    batchesPerEpoch?: number;
    epochs: number;
    verbose?: ModelLoggingVerbosity;
    callbacks?: BaseCallback[] | CustomCallbackConfig | CustomCallbackConfig[];
    validationData?: [tfc.Tensor | tfc.Tensor[] | TensorMap, tfc.Tensor | tfc.Tensor[] | TensorMap] | [tfc.Tensor | tfc.Tensor[] | TensorMap, tfc.Tensor | tfc.Tensor[] | TensorMap, tfc.Tensor | tfc.Tensor[] | TensorMap] | Dataset<T>;
    validationBatchSize?: number;
    validationBatches?: number;
    yieldEvery?: YieldEveryOptions;
    initialEpoch?: number;
}
export interface ModelEvaluateDatasetConfig {
    batches?: number;
    verbose?: ModelLoggingVerbosity;
}
export declare function fitDataset<T extends TensorContainer>(model: any, dataset: Dataset<T>, config: ModelFitDatasetConfig<T>): Promise<History>;
export declare function evaluateDataset<T extends TensorContainer>(model: any, dataset: Dataset<T> | LazyIterator<T>, config: ModelEvaluateDatasetConfig): Promise<tfc.Scalar | tfc.Scalar[]>;
