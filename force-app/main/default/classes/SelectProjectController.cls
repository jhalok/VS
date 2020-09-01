public without sharing class SelectProjectController {
    
    @AuraEnabled
    public static List<Project__c> getProjectList() {
        id userId = UserInfo.getUserId();
        User u = [select id, contactId from User where id = : userId];
        id getContactId = u.contactId;
        List<Project__c> projectList = [SELECT Id, Name, (SELECT Id, Name FROM Tasks__r) FROM Project__c WHERE Contact__r.Id =: getContactId  LIMIT 50000];
        return projectList;
    }
    
    
    @AuraEnabled
	public static List<Task__c> getTask(String projectId){

    	List<Task__c> taskList = [SELECT Id, Name, Status__c, Description__c, Task_Type__c, Project__c, Contact__c FROM Task__c WHERE Project__c =: projectId LIMIT 50000];
        System.debug('===taskList=='+taskList);
        return taskList;
     }

}