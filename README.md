# Frontend playground

React and Vue Isomorphic apps for iPlayer data model.

!["Clone of a certain video player site](preview.png 'Clone of a certain video player site')

# Packages

## server-hapi

An api server, a simple shell app for mounting the frontend UI apps, a server to trigger SSR renders of the frontend UIs, and an asset server for the isomorphic frontend UI client code.

## react-ui

A Typescript React 18 isomorphic app, built with Vite.

## vue-ui

A Javascript Vue 3 isomorphic app, built with Vite.

## Graphql Playground

http://localhost:3000/graphql

## Development

- `npm run dev` : starts Vite servers for the frontend UIs, starts the Hapi api & shell app server.
  - Typescript --inspect powered by ts-node node module.
  - Vite hot reload/devtools enabled while viewing frontend apps
  - server at http://localhost:3000
  - /frontend/@private/react-ui/{p\*} proxy route localhost:3200
  - /frontend/@private/vue-ui/{p\*} proxy route localhost:3210
- `npm run build` : Build frontend UIs, and typescript Hapi server
- `npm run start`: (after a successful build) , starts production Hapi server + frontend UIs

## Notes

- Is `defaultProps` being deprecated or not? https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#deprecate-defaultprops-on-function-components
