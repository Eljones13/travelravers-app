#!/bin/bash
set -e
echo "=== EAS Prebuild: running npm build and cap copy ==="
npm run build
npx cap copy ios
echo "=== EAS Prebuild: creating scheme shim ==="
mkdir -p ios/App.xcodeproj/xcshareddata/xcschemes
cp ios/App/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme ios/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme
sed -i '' 's|container:App.xcodeproj|container:../App/App.xcodeproj|g' ios/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme
echo "=== EAS Prebuild: done ==="
