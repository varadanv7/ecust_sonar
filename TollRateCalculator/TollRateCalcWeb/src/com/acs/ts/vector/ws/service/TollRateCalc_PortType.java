/**
 * TollRateCalc_PortType.java
 *
 * This file was auto-generated from WSDL
 * by the IBM Web services WSDL2Java emitter.
 * cf90721.10 v53107135043
 */

package com.acs.ts.vector.ws.service;

public interface TollRateCalc_PortType extends java.rmi.Remote {
    public com.acs.ts.vector.ws.service.FacilityResponse getFacilities(com.acs.ts.vector.ws.service.FacilityRequest req) throws java.rmi.RemoteException;
    public com.acs.ts.vector.ws.service.VehicleClassResponse getVehicleClass(com.acs.ts.vector.ws.service.VehicleClassRequest req) throws java.rmi.RemoteException;
    public com.acs.ts.vector.ws.service.EntryPointsResponse getEntryPoints(com.acs.ts.vector.ws.service.EntryPointsRequest req) throws java.rmi.RemoteException;
    public com.acs.ts.vector.ws.service.ExitPointsResponse getExitPoints(com.acs.ts.vector.ws.service.ExitPointsRequest req) throws java.rmi.RemoteException;
    public com.acs.ts.vector.ws.service.CalcTollRateResponse calcTollRate(com.acs.ts.vector.ws.service.CalcTollRateRequest req) throws java.rmi.RemoteException;
}
