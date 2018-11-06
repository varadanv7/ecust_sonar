@echo off
REM Change lamet/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running lametPrepforLocal

call ReplaceURL.bat lamet http[s]*:\/\/www.ezpassmetroexpresslanes.net\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat lamet http[s]*:\/\/www.ezpassmetroexpresslanes.net http:\/\/localhost\/lamet

call ReplaceURL.bat maintenance_lamet http[s]*:\/\/www.ezpassmetroexpresslanes.net\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat maintenance_lamet http[s]*:\/\/www.ezpassmetroexpresslanes.net http:\/\/localhost\/lamet

pause



