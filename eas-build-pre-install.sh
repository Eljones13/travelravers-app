#!/bin/bash
set -e

echo "=== EAS prebuild: building web app ==="
npm run build

echo "=== EAS prebuild: copying web assets to iOS ==="
npx cap copy ios

echo "=== EAS prebuild: creating scheme shim ==="
mkdir -p ios/App.xcodeproj/xcshareddata/xcschemes
cp ios/App/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme \
   ios/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme
sed -i '' 's|container:App.xcodeproj|container:../App/App.xcodeproj|g' \
   ios/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme
echo "=== EAS prebuild: done ==="
