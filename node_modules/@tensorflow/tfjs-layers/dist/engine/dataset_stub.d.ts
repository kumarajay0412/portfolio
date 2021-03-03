import * as tfc from '@tensorflow/tfjs-core';
import { TensorContainer } from '@tensorflow/tfjs-core/dist/tensor_types';
export declare abstract class LazyIterator<T> {
    abstract next(): Promise<IteratorResult<T>>;
}
export declare abstract class Dataset<T extends TensorContainer> {
    abstract iterator(): Promise<LazyIterator<T>>;
}
export declare type TensorMap = {
    [name: string]: tfc.Tensor;
};
export declare type TensorOrTensorMap = tfc.Tensor | TensorMap;
