package ejbs.com.acs.ts.vector.ws.tollrate;

import java.util.List;

import com.acs.ts.vector.ws.tollrate.common.vo.RequestVO;
import com.acs.ts.vector.ws.tollrate.common.vo.ResponseVO;
import com.acs.ts.vector.ws.tollrate.persistence.dao.TollRateCalcDAO;

/**
 * Bean implementation class for Enterprise Bean: TollRateCalc
 */
public class TollRateCalcBean implements javax.ejb.SessionBean {

	static final long serialVersionUID = 3206093459760846163L;
	private javax.ejb.SessionContext mySessionCtx;
	/**
	 * getSessionContext
	 */
	public javax.ejb.SessionContext getSessionContext() {
		return mySessionCtx;
	}
	/**
	 * setSessionContext
	 */
	public void setSessionContext(javax.ejb.SessionContext ctx) {
		mySessionCtx = ctx;
	}
	/**
	 * ejbCreate
	 */
	public void ejbCreate() throws javax.ejb.CreateException {
	}
	/**
	 * ejbActivate
	 */
	public void ejbActivate() {
	}
	/**
	 * ejbPassivate
	 */
	public void ejbPassivate() {
	}
	/**
	 * ejbRemove
	 */
	public void ejbRemove() {
	}
	
	public List getFacilities(RequestVO requestVO) throws Exception{
		return new TollRateCalcDAO().getFacilitiesDB(requestVO);
	}
	
	public List getVehicleClassInfo(RequestVO requestVO) throws Exception {
		return new TollRateCalcDAO().getVehicleClassDB(requestVO);
	}
	
	public List getEntryPoints(RequestVO requestVO) throws Exception {
		return new TollRateCalcDAO().getEntryPointDB(requestVO);
	}
	
	public List getExitPoints(RequestVO requestVO) throws Exception {
		return new TollRateCalcDAO().getExitPointsDB(requestVO);
	}
	
	public ResponseVO getTollRateCalc(RequestVO requestVO) throws Exception {
		return new TollRateCalcDAO().getCalcTollRateDB(requestVO);
	}
}
