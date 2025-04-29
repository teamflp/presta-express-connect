
# Build Instructions

Due to configuration constraints, please use the following commands to build the application:

## Development Build
```
node build-dev.js
```

## Production Build
```
npm run build
```

## Running the Application
```
npm run dev
```

Note: If you're able to modify package.json, please add the following script:
```json
"build:dev": "vite build --mode development"
```
