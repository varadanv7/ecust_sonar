@echo off
REM Change ny/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running NY_VIDEOPrepforInt

call ReplaceURL.bat ny_video http[s]*:\/\/www.mtabt-tollsbymail.com\/vector\/ http:\/\/int.mtabt-tollsbymail.com\/vector\/
call ReplaceURL.bat ny_video http[s]*:\/\/www.mtabt-tollsbymail.com http:\/\/int.mtabt-tollsbymail.com

call ReplaceURL.bat maintenance_ny_video http[s]*:\/\/www.mtabt-tollsbymail.com\/vector\/ http:\/\/int.mtabt-tollsbymail.com\/vector\/
call ReplaceURL.bat maintenance_ny_video http[s]*:\/\/www.mtabt-tollsbymail.com http:\/\/int.mtabt-tollsbymail.com

call ReplaceURL.bat ny_video www.ezpassny.com www.e-zpassny.com
call ReplaceURL.bat ny_video http[s]*:\/\/www.e-zpassny.com\/vector\/ http:\/\/int.e-zpassny.com\/vector\/
call ReplaceURL.bat ny_video http[s]*:\/\/www.e-zpassny.com http:\/\/int.e-zpassny.com

pause



