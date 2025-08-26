#!/bin/bash

# Make sure the HTML file has the correct viewport meta tag
if [ -f "dist/index.html" ]; then
    # Ensure viewport meta tag is correct
    sed -i 's/<meta name="viewport".*content=".*".*\/>/<meta name="viewport" content="width=device-width, initial-scale=1.0" \/>/' dist/index.html
fi

# Copy web.config to the dist folder if it doesn't exist
if [ ! -f "dist/web.config" ] && [ -f "public/web.config" ]; then
    cp public/web.config dist/
fi
