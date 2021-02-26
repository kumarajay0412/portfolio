import type { IBackgroundMode } from "../../Interfaces/BackgroundMode/IBackgroundMode";
import { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { RecursivePartial } from "../../../Types";
export declare class BackgroundMode implements IBackgroundMode, IOptionLoader<IBackgroundMode> {
    enable: boolean;
    zIndex: number;
    constructor();
    load(data?: RecursivePartial<IBackgroundMode>): void;
}
