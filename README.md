# Description

Remote control for Autodesk Forge Viewer. Allows to interact with viewer using Natural Language or Speech interface to perform conversation in chat-like mode.

Demo video:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=MbdTYs8egb4" target="_blank"><img src="http://img.youtube.com/vi/MbdTYs8egb4/0.jpg" alt="viewer-remote for Autodesk Forge Viewer" width="512" height="384" border="10" /></a>

## Use cases

- Virtual reality devices
- POS terminals
- Mobile devices with limited UI area
- Presentations
- Hands-free
- Non-strict interactions
- Command line interface

## Supported platforms

### Current

#### Messengers

- Viewer interface
- Web interface
- Telegram messenger

#### CAD/PDM/PLM

- Autodesk Fusion: [fusion-remote](https://github.com/naturalDesign/fusion-remote)

### Planned

#### Messengers

- Slack
- Facebook Messenger
- Skype
- Cortana (Microsoft)
- Siri (Apple)
- Amazon Alexa
- Android
- iPhone/iPad
- Windows Phone

#### CAD/PDM/PLM

- A360
- Autodesk Revit
- Solidworks
- OnShape

# Supported commands

## Camera control

### Syntax

Controls view cube. Just give the required point of view from one to three in any order:

`[front/back] [top/bottom] [left/right]`

### Samples

`set top, set bottom, top left, top left front`

## Setting environment

### Parameters

You can use any of these words to set up an environment.

| id   | name             | synonym           |
| ---- | ---------------- | ----------------- |
| 0    | Simple Grey      | grey              |
| 1    | Sharp Highlights | sharp, highlights |
| 2    | Dark Sky         | sky, dayk         |
| 3    | Grey Room        | room              |
| 4    | Photo Booth      | booth, photo      |
| 5    | Tranquility      |                   |
| 6    | Infinity Pool    | pool              |
| 7    | Simple White     | white             |
| 8    | Riverbank        | river             |
| 9    | Contrast         |                   |
| 10   | Rim Highlights   | rim               |
| 11   | Cool Light       | cool              |
| 12   | Warm Light       | warm              |
| 13   | Soft Light       | soft              |
| 14   | Grid Light       | grid              |
| 15   | Plaza            |                   |
| 16   | Snow Field       | snow, field       |

Keywords could be attached to query too:

`set, environment`

## Exploding model

Explode assembly.

### Syntax

`explode [scale_in_percents]`

`explode`, `boom`, `detonate`, `break` with no parameter is equal to `explode 100`.

`assemble` with no parameters is equal to `explode 0`.

### Samples

explode 0, explode 100, explode 33, explode, boom, fire in the hole, detonate, break

## Message box

Just alert message box.

### Samples

say hi

## Selecting navigation tool

Selects required navigation tool.

### Parameters

- orbit
- pan
- dolly
- worldup
- fov

### Samples

pan, set orbit

## Focal length

Sets focal length of camera.

### Samples

`focal length 12`, `set focal 300`

## Zoom all

Fits all model to view

### Samples

zoom all, fit

# Demo

You can play with it here: http://viewer.autodesk.io/node/gallery/#/viewer

Load Viewer Remote extension.

![alt tag](https://github.com/naturalDesign/viewer-remote/blob/master/img/how-to1.png)

Try following commands:
- say hi
- set top
- top left front
- riverbank
- sky
- Plaza
- pan
- zoom
- orbit
- fit
- zoom all
- explode 100
- explode 50
- explode 0
- focal length 12
- focal length 200
