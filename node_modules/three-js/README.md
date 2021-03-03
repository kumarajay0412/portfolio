# npm three.js

NPM version of three-js 79 and its addons.

## install

```
npm i three-js
```

## import with... import
```javascript
import THREELib from "three-js";
var THREE = THREELib(); // return THREE JS
// or
var THREE = THREELib(["EffectComposer", ...]); // return THREE JS extended by its addons
```

## import with require

```javascript
var THREE = require("three-js")(); // return THREE JS
// or
var THREE = require("three-js")(["EffectComposer", ...]); // return THREE JS extended by its addons
```

## available addons
 - AdaptativeToneMapping
 - BasicShader
 - BleachBypassShader
 - BlendShader
 - BloomShader
 - BloomPass
 - BokehPass
 - BokehShader
 - BokehShader2
 - BrightnessContrastShader
 - CanvasRenderer
 - ColorCorrectionShader
 - ColorifyShader
 - ConvolutionShader
 - CopyShader
 - DDSLoader
 - DigitalGlitch
 - DOFMipMapShader
 - DotScreenPass
 - DotScreenShader
 - EdgeShader
 - EdgeShader2
 - EffectComposer
 - FilmPass
 - FilmShader
 - FocusShader
 - FresnelShader
 - FXAAShader
 - GammaCorrectionShader
 - GlitchPass
 - HorizontalBlurShader
 - HorizontalTiltShiftShader
 - HueSaturationShader
 - JSONLoader
 - KaleidoShader
 - LuminosityShader
 - MarchingCubes
 - MaskPass
 - MirrorShader
 - MTLLoader
 - NormalMapShader
 - OBJLoader
 - OceanShader
 - OrbitControls
 - ParallaxShader
 - Projector
 - RenderPass
 - RGBShiftShader
 - SavePass
 - SepiaShader
 - ShaderPass
 - SSAOShader
 - SVGLoader
 - TechnicolorShader
 - TexturePass
 - ToneMapShader
 - TriangleBlurShader
 - UnpackDepthRGBAShader
 - VerticalBlurShader
 - VerticalTiltShiftShader
 - VignetteShader

## request an addon

There is a lot of three-js addons, if one is missing, feel free to make a pull request or send it as an issue with a link to the addon.

## make a pull-request

Three-js addons looks like that in common js:
```javascript
THREE.EffectComposer = function(){
	//...
}
```

You only have to encapsulate the entire addon like that:
```javascript
module.export = function( THREE ){
	
	THREE.EffectComposer = function(){
		//...
	}

};
```

Only official or very honorable and stable addons will be accepted/validated.

All tributes to original authors.