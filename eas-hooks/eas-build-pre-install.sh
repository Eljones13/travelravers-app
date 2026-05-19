#!/bin/bash
set -e
echo "=== EAS Hook: npm build ==="
npm run build
echo "=== EAS Hook: cap copy ios ==="
npx cap copy ios
echo "=== EAS Hook: scheme shim ==="
mkdir -p ios/App.xcodeproj/xcshareddata/xcschemes
cp ios/App/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme ios/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme
sed -i 's|container:App.xcodeproj|container:../App/App.xcodeproj|g' ios/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme
echo "=== EAS Hook: done ==="
