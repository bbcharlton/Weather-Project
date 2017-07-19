# Getting Started
___

> ### 1. Install dev dependencies.

```shell
npm install --only=dev
```

This loads in all the development dependencies used in my gulpfile.

> ### 2. Add your OpenWeatherMap API key.

If you don't have an OpenWeatherMap API key already, you can signup and get one from the [OpenWeatherMap API Page](http://openweathermap.org/appid). On line 10 in `app.js` add your API key for the `KEY` constant.

> ### 3. Run Gulp task.

```shell
gulp
```

Just a simple Gulp command to run that will transpile the ES6 code.

> ### 4. Open index.html

The page should load an input field and button. Input a city name for the data to load in.