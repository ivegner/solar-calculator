# Solar Power Calculator

## About
Using this tool, you can calculate the output of a solar installation. Coded as a job application homework.

## Tools/Libraries used
* Ember.js
* Bootstrap 4
* Google Maps JS Api v3
* [Ember-Place-Autocomplete](https://github.com/dmuneras/ember-place-autocomplete)
* [Ember-Google-Maps](https://github.com/sandydoo/ember-google-maps)
* Guidance from [Google-Maps-Markup](https://github.com/knownasilya/google-maps-markup) (no code used)

Justifications for use:
* **Ember**: due to its relevance to the target stack
* **Bootstrap**: clean, modern solution to responsive layouts. Tried using CSS-Grid, found that Bootstrap was easier to apply (has good styling as well)
* **Google Maps API**: Well, maps.
* **Ember-Place-Autocomplete**: It is a wrapper around Google Maps' geocoder requests, lightweight and easy to work with.
* **Ember-Google-Maps**: Light wrapper around Google Maps API objects (does not wrap the entire API, builds the objects dynamically). Basically just an Ember-isation of the Google Maps API, simplified working with it.
* **Google-Maps-Markup** (why I *didn't* use it): Although it does pretty much exactly the specified task, I did not use it because 1, it is bloated with unnecessary features, 2, it is poorly written and the code is very opaque, 3, it is not customizable in terms of UI and 4, I thought it would be cheating to pull in a pre-made component to solve the task for me.

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd solar-calc`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit the app at [http://localhost:4200](http://localhost:4200).
