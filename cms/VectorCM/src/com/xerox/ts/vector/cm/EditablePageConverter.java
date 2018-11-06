package com.xerox.ts.vector.cm;

import java.util.List;

import javax.el.ELContext;
import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
import javax.faces.model.SelectItem;

import com.xerox.ts.vector.cm.managedbeans.CMPageBean;

@FacesConverter(value="editablePageConverter")
public class EditablePageConverter implements Converter{

	@Override
	public Object getAsObject(FacesContext arg0, UIComponent arg1, String value) {
		// TODO Auto-generated method stub
		final String beanName = AppConstants.CM_PAGE_BEAN;  
        FacesContext fc = FacesContext.getCurrentInstance();  
        Object bean;  
  
        try {  
            ELContext elContext = fc.getELContext();  
            bean = elContext.getELResolver().getValue(elContext, null, beanName);  
        } catch (RuntimeException e) {  
            throw new FacesException(e.getMessage(), e);  
        }  
        if (bean != null) {  
        	List<SelectItem> pages = ((CMPageBean)bean).getRefPagesForMap();  
            for (SelectItem str:pages) {  
                if (str.getLabel().equals(value)) {  
                    return str.getValue();
                }  
            }  
        }  
       
        return null; 
	}

	@Override
	public String getAsString(FacesContext arg0, UIComponent arg1, Object arg2) {
		// TODO Auto-generated method stub
		EditablePage page = (EditablePage) arg2;
		return page.getFileName() ;
	}

}
