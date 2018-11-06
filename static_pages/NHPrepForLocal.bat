@echo off
REM Change nh/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running NHPrepforLocal

call ReplaceURL.bat nh http[s]*:\/\/www.ezpassnh.com\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat nh http[s]*:\/\/www.ezpassnh.com http:\/\/localhost\/nh

call ReplaceURL.bat maintenance_nh http[s]*:\/\/www.ezpassnh.com\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat maintenance_nh http[s]*:\/\/www.ezpassnh.com http:\/\/localhost\/nh

pause



