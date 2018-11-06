Prepare URLS
rwm 7/8/11 
revised 8/2/12

1. The main per-client .bat file for manipulating URLS is named: [client]PrepFor[target].bat

[client] = NCTA | NY | ...
[target] = Local | Prod | Test

For example, NCTAPrepForLocal.bat

2. The main .bat file calls the .bat file that does the work: ReplaceURL.bat

3. To make a new one take working existing .bat files and rename according to the convention,
then edit them to do the right thing.

4. The final step for local development is to hijack and edit the serverpath in 2 files:

\struts\common\tlds\VectorECustomerTag.java

Example:
	serverPath = DBConfigCache.getParamValueForName(Long.parseLong(DBConfigCache.getPropertyValue("AgencyId")), 
			"WEBSERVER", "WEB_URL", "WEB_URL");
	serverPath = "http://localhost/ncta/";

\struts\common\util\VectorUtil.java

Example:
	serverPath = DBConfigCache.getParamValueForName(Long.parseLong(DBConfigCache.getPropertyValue("AgencyId")), 
			"WEBSERVER", "WEB_URL", "WEB_URL");
	serverPath = "http://localhost/ncta/";
