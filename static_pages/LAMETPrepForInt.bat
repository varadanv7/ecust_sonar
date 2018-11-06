@echo off
REM Change lamet/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running lametPrepforTest

call ReplaceURL.bat lamet http[s]*:\/\/www.ezpassmetroexpresslanes.net http:\/\/int.ezpassmetroexpresslanes.net
call ReplaceURL.bat maintenance_lamet http[s]*:\/\/www.ezpassmetroexpresslanes.net http:\/\/int.ezpassmetroexpresslanes.net

pause



