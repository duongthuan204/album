# Album App Demo

![Preview](https://i.imgur.com/HN6np6E.png)

## Overview

An application for album management. You can create a new album with name and cover, and photos into it, and view photos in lightbox with navigation. Album and image are 2 main components of this project. They were designed with their own model, view and controller.

I built this project with Angular 10 framework, enhanced with Bulma CSS. FakerJS is used to generate fake data. It gets images from [Lorem Picsum](https://picsum.photos/), which could be slow sometimes. Please note that data will be different everytime browser refreshes.

## Prerequisites

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1. 

You need to have [NodeJS](https://nodejs.org/en/download) installed on your device. 

Then run `npm install -g @angular/cli` from cmd to install Angular CLI.

## Build

After clone code, please navigate to the root folder of project, open cmd and run `npm install` to build project.

## Deploy

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

Or you can run `ng serve -o` for new tab open automatically. 

If port 4200 is conflicted, run `ng serve --port 4300` for another port.

## Config data generated

You can modify config file for quantity of albums and images generated. Find the file at `src\assets\config.ts`

## Firebase hosting

https://thuan-album.web.app/

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
