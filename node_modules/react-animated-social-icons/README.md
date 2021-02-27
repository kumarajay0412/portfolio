# React Animated Social Icons

[![Build Status](https://travis-ci.org/meko-deng/react-animated-social-icons.svg?branch=master)](https://travis-ci.org/meko-deng/react-animated-social-icons)
 
A minimalistic animation library of svg icons to redirect users to your social webpages!

![icons snapshot](https://i.imgur.com/OzIfqCQ.png)
Icons made by [Pixel perfect](https://www.flaticon.com/authors/pixel-perfect) from [www.flaticon.com](https://www.flaticon.com/home)

## :page_with_curl: Download/Install

```sh
$ npm install react-animated-social-icons --save
```

This package has @emotion as a peer dependency. Make sure to install them if you don't have them already.

```sh
$ npm install @emotion/core @emotion/styled --save-dev
```

## :+1: Usage
Customize your icon interactions with the `animation` prop.

```tsx
import {AnimatedSocialIcon} from 'react-animated-social-icons'

<AnimatedSocialIcon
    brandName="github"
    url="https://github.com/meko-deng/react-animated-social-icons"
    animation="bounce"
    defaultColor="#D1D1D1"
    hoverColor="black"
    width="2em"
    animationDuration={0.8}
    style={{padding: '5em'}}
    />
```
[Live Demo](https://meko-deng.github.io/react-animated-social-icons/)

## Documentation

For a full list of functionalities, check out the [Documentation](https://meko-deng.github.io/react-animated-social-icons/)


## :writing_hand: Want to Contribute?

If you found a bug, or have any questions.
Do post an [issue](https://github.com/meko-deng/react-animated-social-icons/issues)

Pull requests are welcome!
