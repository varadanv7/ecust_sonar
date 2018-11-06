package ejbs.com.acs.ts.vector.ws.tollrate;

import java.util.List;

import com.acs.ts.vector.ws.tollrate.common.vo.RequestVO;
import com.acs.ts.vector.ws.tollrate.common.vo.ResponseVO;

/**
 * Local interface for Enterprise Bean: TollRateCalc
 */
public interface TollRateCalcLocal extends javax.ejb.EJBLocalObject {

	public List getFacilities(RequestVO requestVO) throws Exception;
	
	public List getVehicleClassInfo(RequestVO requestVO) throws Exception;
	
	public List getEntryPoints(RequestVO requestVO) throws Exception;
	
	public List getExitPoints(RequestVO requestVO) throws Exception;
	
	public ResponseVO getTollRateCalc(RequestVO requestVO) throws Exception;
	
}
