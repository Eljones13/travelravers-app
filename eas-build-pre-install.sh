#!/bin/bash
echo "EAS prebuild: creating scheme shim directory"
mkdir -p ios/App.xcodeproj/xcshareddata/xcschemes
cp ios/App/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme ios/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme
sed -i '' 's|container:App.xcodeproj|container:../App/App.xcodeproj|g' ios/App.xcodeproj/xcshareddata/xcschemes/App.xcscheme
echo "EAS prebuild: scheme shim created"
