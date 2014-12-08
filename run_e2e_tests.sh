cd puppet/modules/site_content/files
cp dev-config.js app/js/config.js
npm install
echo 'Requires local running instance of site'
npm run protractor
