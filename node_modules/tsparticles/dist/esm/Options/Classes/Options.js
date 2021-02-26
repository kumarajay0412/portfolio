import { Interactivity } from "./Interactivity/Interactivity";
import { Particles } from "./Particles/Particles";
import { BackgroundMask } from "./BackgroundMask/BackgroundMask";
import { Background } from "./Background/Background";
import { Infection } from "./Infection/Infection";
import { Plugins } from "../../Utils";
import { Theme } from "./Theme/Theme";
import { ThemeMode } from "../../Enums/Modes";
import { BackgroundMode } from "./BackgroundMode/BackgroundMode";
import { Motion } from "./Motion/Motion";
import { ManualParticle } from "./ManualParticle";
export class Options {
    constructor() {
        this.autoPlay = true;
        this.background = new Background();
        this.backgroundMask = new BackgroundMask();
        this.backgroundMode = new BackgroundMode();
        this.detectRetina = true;
        this.fpsLimit = 30;
        this.infection = new Infection();
        this.interactivity = new Interactivity();
        this.manualParticles = [];
        this.motion = new Motion();
        this.particles = new Particles();
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = false;
        this.themes = [];
    }
    get fps_limit() {
        return this.fpsLimit;
    }
    set fps_limit(value) {
        this.fpsLimit = value;
    }
    get retina_detect() {
        return this.detectRetina;
    }
    set retina_detect(value) {
        this.detectRetina = value;
    }
    load(data) {
        var _a, _b;
        if (data === undefined) {
            return;
        }
        if (data.preset !== undefined) {
            if (data.preset instanceof Array) {
                for (const preset of data.preset) {
                    this.importPreset(preset);
                }
            }
            else {
                this.importPreset(data.preset);
            }
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;
        if (detectRetina !== undefined) {
            this.detectRetina = detectRetina;
        }
        const fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;
        if (fpsLimit !== undefined) {
            this.fpsLimit = fpsLimit;
        }
        if (data.pauseOnBlur !== undefined) {
            this.pauseOnBlur = data.pauseOnBlur;
        }
        if (data.pauseOnOutsideViewport !== undefined) {
            this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
        }
        this.background.load(data.background);
        this.backgroundMode.load(data.backgroundMode);
        this.backgroundMask.load(data.backgroundMask);
        this.infection.load(data.infection);
        this.interactivity.load(data.interactivity);
        if (data.manualParticles !== undefined) {
            this.manualParticles = data.manualParticles.map((t) => {
                const tmp = new ManualParticle();
                tmp.load(t);
                return tmp;
            });
        }
        this.motion.load(data.motion);
        this.particles.load(data.particles);
        Plugins.loadOptions(this, data);
        if (data.themes !== undefined) {
            for (const theme of data.themes) {
                const optTheme = new Theme();
                optTheme.load(theme);
                this.themes.push(optTheme);
            }
        }
    }
    setTheme(name) {
        if (name) {
            const chosenTheme = this.themes.find((theme) => theme.name === name);
            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        }
        else {
            const clientDarkMode = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;
            let defaultTheme = this.themes.find((theme) => theme.default.value &&
                ((theme.default.mode === ThemeMode.dark && clientDarkMode) ||
                    (theme.default.mode === ThemeMode.light && !clientDarkMode)));
            if (!defaultTheme) {
                defaultTheme = this.themes.find((theme) => theme.default.value && theme.default.mode === ThemeMode.any);
            }
            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }
    importPreset(preset) {
        this.load(Plugins.getPreset(preset));
    }
}
