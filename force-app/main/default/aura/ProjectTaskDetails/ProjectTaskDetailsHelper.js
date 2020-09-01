({
	doInitHelper : function(component, event) {
        var action = component.get("c.getTask");
        action.setParams({ projectId : "v.projectId" });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                for(let i of response.getReturnValue()) {
                    console.log('---i-->', i);
                }
                component.set("v.expense", response.getReturnValue());
               
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    } ,
})