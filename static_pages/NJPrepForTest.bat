@echo off
REM Change nj/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running njPrepforTest

call ReplaceURL.bat nj http[s]*:\/\/www.ezpassnj.com http:\/\/qa.ezpassnj.com
call ReplaceURL.bat maintenance_nj http[s]*:\/\/www.ezpassnj.com http:\/\/qa.ezpassnj.com

pause



