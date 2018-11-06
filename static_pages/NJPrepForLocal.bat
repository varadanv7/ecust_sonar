@echo off
REM Change nj/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running njPrepforLocal

call ReplaceURL.bat nj http[s]*:\/\/www.ezpassnj.com\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat nj http[s]*:\/\/www.ezpassnj.com http:\/\/localhost\/nj

call ReplaceURL.bat maintenance_nj http[s]*:\/\/www.ezpassnj.com\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat maintenance_nj http[s]*:\/\/www.ezpassnj.com http:\/\/localhost\/nj

pause



