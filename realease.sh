#!/usr/bin/env bash
set -e

echo "Enter release version: "
read VERSION

echo
read -p "Releasing $VERSION — are you sure? (y/n) " -n 1 -r
echo    # 换行

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Releasing $VERSION ..."

    # commit
    git add -A
    git commit -m "[build] $VERSION" || true

    # bump version
    npm version "$VERSION" --message "[release] $VERSION"

    # push code and tag
    git push origin master
    git push origin --tags

    # publish
    npm publish

    echo "✔ Release $VERSION completed."
else
    echo "✘ Release canceled."
fi
