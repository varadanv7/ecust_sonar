@echo off
REM Change txdot/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running txdotPrepforTest

call ReplaceURL.bat txdot http[s]*:\/\/www.txtag.org http:\/\/qa.txtag.org
call ReplaceURL.bat maintenance_txdot http[s]*:\/\/www.txtag.org http:\/\/qa.txtag.org

pause



