@echo off
REM Change ny/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running nyPrepforLocal

call ReplaceURL.bat ny www.ezpassny.com www.e-zpassny.com

call ReplaceURL.bat ny http[s]*:\/\/www.e-zpassny.com\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat ny http[s]*:\/\/www.e-zpassny.com http:\/\/localhost\/ny

call ReplaceURL.bat maintenance_ny http[s]*:\/\/www.e-zpassny.com\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat maintenance_ny http[s]*:\/\/www.e-zpassny.com http:\/\/localhost\/ny

pause



