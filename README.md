# BitTechie

[bit](https://vincedaniel.netlify.app) uses [React.js](https://reactjs.org) and
[Mui](https://mui.com). To get started, follow the guidelines provided below.

## Run Locally

1. Clone or download this repository

   ```sh
   git clone https://github.com/vincedaniel08/Boiler-Plate-Dashboard-Firebase-9-MUI-Router-v5.git
   ```

2. Go to the project directory

   ```sh
   cd Boiler-Plate-Dashboard-Firebase-9-MUI-Router-v5
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. Start the local server

   ```sh
   npm start
   ```

## File Structure

```
- src
  - actions
  - api
  - components
    - About
    - AccountHeader
    - AccountPerformanceVideo
    - ...
  - containers
    - Account
      - components
      - index.js
      - index.scss
      - styles.module.scss
    - Band
      - components
      - index.js
      - index.scss
      - styles.module.scss
    - ...
  - layouts
  - ...
```

## Naming Conventions

- Use **lowercase** in naming routes within the 'pages' folder
- Use **PascalCase** naming convention when creating folders inside the 'src' folder
- Folder and File Naming - PascalCase
- Folders and files with names should be lowercase

## Referencing Styles

Example:

styles.module.scss

```scss
.hello-world {
  // ...
}

.hello {
  // ...
}
```

HelloWorld.jsx

```jsx
import React from "react";
import styles from "./styles.module.scss";

const HelloWorld = () => {
  return (
    <main>
      <div className={styles["hello-world"]}></div>

      {/* or */}

      <div className={styles.hello}></div>
    </main>
  );
};

export default HelloWorld;
```

## CSS Hacks

Using `styles.hello` as a class name has limitations when selecting Ant Design's class names. The
solution you may do to resolve this is to import your stylesheet in the **theme.scss** file inside
**src/styles** directory.

Make sure your class name is unique so it will not overlap or collide with other class names.

Follow the `[page-name]-[property/attribute/element]-[additional]` pattern for naming class as
follows:

```scss
.login-modal {
  // ...
}

.login-modal-container {
  // ...
}

.login-modal-body {
  // ...
}

.login-modal-title {
  // ...
}
```

You may also import other stylesheets on your imported file.

theme.scss

```scss
@import "/login/style.scss";
```

login/style.scss

```scss
@import "../button/style.scss";

.login-modal {
  // ...
}
```

## Development Workflow and Notes

Naming a branch should be in all small letters

Examples:

- feature/landing-page
- bugfix/landing-page
- hotfix/landing-page

Other Notes:

- Only branch out to dev
- Always commit the changes you have made in small letters
- Limit the line of code width to 100 by executing `npm run format`
- Use [Ant Design's Components](https://ant.design/components/overview) as much as possible

## Folders

| Directory      | Description                                         |
| -------------- | --------------------------------------------------- |
| pages          | Page routes                                         |
| public         | Assets such as pictures, fonts, icons, videos, etc. |
| src/api        | Axios and other services                            |
| src/components | Reusable components                                 |
| src/containers | Page components                                     |
| src/styles     | Global styles                                       |
