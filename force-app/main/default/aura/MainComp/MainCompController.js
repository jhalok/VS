({
   doInit : function(component, event, helper) {
      $A.createComponent(
         "c:SelectProject",
         {
 
         },
         function(newCmp){
            if (component.isValid()) {
               component.set("v.body", newCmp);
            }
         }
      );
   },
   NavigateComponent : function(component,event,helper) {
      $A.createComponent(
         "c:ProjectTaskDetails",
         {
           "expense" : event.getParam("expense")
         },
         function(newCmp){
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
         }
      );
   }
})