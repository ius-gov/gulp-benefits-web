
#!/bin/sh

echo 'Running Gulp Clean'
gulp clean

echo 'Creating javascript folder'
mkdir -p wwwroot/lib/jquery/dist/

echo "Writing javascript file"
echo "function hellowWorld() { alert('Hello World'); }" > wwwroot/lib/jquery/dist/jquery.js
echo "function hellowWorld() { alert('Hello World'); }" > wwwroot/lib/jquery/dist/jquery.min.js

echo 'Creating css folder'
mkdir -p wwwroot/lib/pure/

echo "Writing css file"
echo "body { color : 'red'; } " > wwwroot/lib/pure/pure.css
echo "body { color : 'red'; } " > wwwroot/lib/pure/pure.min.css

echo "Running Gulp Build"
gulp build

echo "asserting javascript files were created"
if [ ! -f 'wwwroot/js/site.js' ]; then 
	echo "Site.js not created" 
	exit 1 
fi

echo "asserting css files were created"
if [ ! -f 'wwwroot/css/site.css' ]; then 
	echo "Site.css not created" 
	exit 1 
fi