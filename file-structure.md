# File Structure Guide for AIBS Application Team Coding Challenge

## Root

The top level of this project contains:
- various configuration files
- documents and project README.md
- node_modules
- build artifacts in `/dist`
- html templates for Parcel
- `/src` source code directory

## Source Code

The `/src` directory contains all source code for building via Parcel. This includes `.ts`, `.tsx`, and any static image assets. In addition, testing files for TypeScript files live here as well.

Do not use `default exports` within modules.

- `/src` - all source code
    - `/assets` - icons, images, etc.
        - `/images` - small images to include in bundle
    - `/components` - stateless user interface React components (a.k.a. dumb, presentational)
        - `/complex` - composed components focused on layout, content, interactivity, and a props interface for callbacks and input data
            - `/component-name`
                - `index.tsx` - exports components
                - `component-name.tsx` - complex component composed of other components
                - `supporting-component.tsx` - (optional) any abstractions for composition
                - `use-styles.ts` - styles hook for this directory's components
                - `/test` - (optional) directory containing unit tests if deemed necessary
                    - `component-name.test.ts`
        - `/ui` - small ui components focused on styling an element, e.g., buttons, pills, checkboxes, etc.
            - `/ui-component-name`
                - `index.tsx` - exports component
                - `ui-component.tsx` - small "atomic" component
                - `use-styles.ts` - styles hook for this directory's components
    - `/constants` - shared constants
        - `index.ts` - exports all constants
        - `constants-group.ts` - helpful constants grouped by type or theme
    - `/containers` - components concerned with application state manipulation, data fetching, and callbacks (a.k.a smart)
        - `/component-name`
            - `index.tsx` - exports components
            - `component-name.tsx` - container component collects data and renders other components
            - `use-styles.ts` - styles hook for this directory's components
            - `/test` - (optional) directory containing unit tests if deemed necessary
                - `component-name.test.ts`
    - `/hooks` - directory for custom hooks
        - `/hook-name`
            - `index.ts` - exports
            - `hook-name.ts`
    - `/pages` - components corresponding to site map and url
        - `/page-name`
            - `index.tsx` - exports components
            - `page-name.tsx` - module that acts as the application for a route
            - `use-styles.ts` - styles hook for this directory's components
            - `supporting-component.tsx` - abstraction
    - `/services` - independent modules for managing state and fetching, redux, apollo, or other
        - `/service-name` - required information to be stored and served
            - `actions.ts` - redux actions related to service
            - `reducer.ts` - redux reducer to update state
            - `selectors.ts` - selectors for state data
            - `query.ts` - graphql query
            - `index.ts` - exports
            -  `/test` - unit tests
                - `reducer.test.ts`
                - `selectors.test.ts`
        - `/redux` - redux store
            - `index.ts` - exports
            - `redux-provider.tsx` - redux jsx provider
            - `redux-store.ts` - redux store
            - `root-reducer.ts` - create root reducer
        - `/apollo` - apollo client
            - `graphql-client.ts` - apollo client
            - `index.ts` - exports
    - `/styles` - global styles
        - `/constants` - constants related to styles for ui components
            - `index.ts` - exports
            - `colors.ts` - color constants
            - `typography.ts` - typography constants
        - `/theme` - theme related files
            - `index.ts` - exports
            - `bkp-theme.ts` - bkp theme given to theme provider
            - `other-theme-related.ts`
    - `/types` - shared types
        - `index.ts` - exports
        - `functions.ts`
        - `data.ts`
    - `/utils` - utility and helper functions and classes
        - `/util-name`
            - `index.ts` - exports functions
            - `util-name.ts`
            - `supporting-util.ts` - abstraction
            - `/test` - (required) directory containing unit tests
                - `util-name.test.ts`
    - `index.tsx` - main entry file for application
