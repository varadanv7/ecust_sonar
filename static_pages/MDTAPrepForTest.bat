@echo off
REM Change mdta/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running mdtaPrepforTest

call ReplaceURL.bat mdta http[s]*:\/\/www.ezpassmd.com http:\/\/qa.ezpassmd.com
call ReplaceURL.bat maintenance_mdta http[s]*:\/\/www.ezpassmd.com http:\/\/qa.ezpassmd.com

pause



