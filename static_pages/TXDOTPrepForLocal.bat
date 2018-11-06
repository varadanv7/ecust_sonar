@echo off
REM Change txdot/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running txdotPrepforLocal

call ReplaceURL.bat txdot http[s]*:\/\/www.txtag.org\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat txdot http[s]*:\/\/www.txtag.org http:\/\/localhost\/txdot

call ReplaceURL.bat maintenance_txdot http[s]*:\/\/www.txtag.org\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat maintenance_txdot http[s]*:\/\/www.txtag.org http:\/\/localhost\/txdot

pause



