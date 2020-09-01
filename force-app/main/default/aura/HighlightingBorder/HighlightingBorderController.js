({
    doInit : function(component, event, helper) {
        var action = component.get("c.ldRating");
        action.setParams({ leadId : component.get("v.recordId") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue() === "Hot"){
                    component.set("v.IsBorder",true)
                } else {
                    component.set("v.IsBorder",false)
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    handleSubmit : function(component, event, helper) {
        window.setTimeout(
            $A.getCallback(function() {
                $A.enqueueAction(component.get("c.doInit"));
            }), 1000
        );
    }
})