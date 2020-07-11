# Template for msx.benzac.de tv framework

  - es5-compatible
  - auto-build
  - typescript

### Development

Install the dependencies and devDependencies :
```sh
$ cd msx-interaction-template-plugin-typescript
$ npm install -d
```

start build and serve:
```sh
$ gulp
```

(or):
```sh
$ npm start
```

go to demo-page http://msx.benzac.de/info/?tab=Demo

insert test content
```json
{
   "type": "list",
   "headline": "Interaction Plugin Test",
   "template": {
      "type": "separate",
      "layout": "0,0,2,4",
      "icon": "msx-white-soft:gamepad",
      "color": "msx-glass"
   },
   "items": [
      {
         "title": "Template",
         "action": "interaction:load:http://localhost:9000/index.html"
      },
      {
         "enumerate": false,
         "type": "button",
         "offset": "0,0,0,-1",
         "icon": "refresh",
         "label": "Reload",
         "action": "interaction:reload"
      },
      {
         "enumerate": false,
         "type": "button",
         "offset": "0,0,0,-1",
         "icon": "highlight-off",
         "label": "Unload",
         "action": "interaction:unload"
      }
   ]
}
```

and launch.


License
----

MIT
