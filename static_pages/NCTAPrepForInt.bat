@echo off
REM Change ncta/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running nctaPrepforTest

call ReplaceURL.bat ncta http[s]*:\/\/www.myncquickpass.com http:\/\/int.myncquickpass.com
call ReplaceURL.bat maintenance_ncta http[s]*:\/\/www.myncquickpass.com http:\/\/int.myncquickpass.com

pause



