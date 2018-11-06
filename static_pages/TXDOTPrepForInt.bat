@echo off
REM Change txdot/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running txdotPrepforInt

call ReplaceURL.bat txdot http[s]*:\/\/www.txtag.org http:\/\/int.txtag.org
call ReplaceURL.bat maintenance_txdot http[s]*:\/\/www.txtag.org http:\/\/int.txtag.org

pause



