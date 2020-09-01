public with sharing class SendAndStoreResponse {
	
    public static void storeResponseWithRequest(String accName, String accPhone, String accWebsite, String recId) {
        WrapperResponse resp = SendAndStoreResponse.getAccessToken();
        if(resp != null) {
            String body = '{"name" : "' + accName + '", "phone" : "' + accPhone + '", "website" : "' + accWebsite + '"}';
            String endpointURL = resp.instance_url + '/services/apexrest/accountinfo/';
            HttpRequest request = new HttpRequest();
            request.setMethod('POST');
            request.setBody(body);
            request.setEndPoint(endpointURL);
            request.setHeader('Authorization', 'Bearer ' + resp.access_token);
            request.setHeader('Content-Type', 'application/json');
            
            Http http = new Http();
        	HttpResponse response = http.send(request);
            if(response.getBody() != null) {
        		String respStr = response.getBody();
                System.debug('Record Id : ' + respStr.remove('"'));
                String fileContent = '----Request Sent----\n' +
					 				'\t' + body + '\n\n\n' +
					 				'----Response Received-----\n' +
					 				'\t' + respStr + '\n';
                ContentVersion conVer = new ContentVersion();
                conVer.ContentLocation = 'S'; 
                conVer.PathOnClient = 'resp.txt';
                conVer.Title = 'Request and Response';
                conVer.VersionData = Blob.valueOf(fileContent);
                insert conVer; 
                
                Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:conVer.Id].ContentDocumentId;
                ContentDocumentLink conDocLink = New ContentDocumentLink();
                conDocLink.LinkedEntityId = recId;
                conDocLink.ContentDocumentId = conDoc; 
                conDocLink.shareType = 'V';
				insert conDocLink;
            }
        }
    }
    
    public static WrapperResponse getAccessToken() {
        String clientId = '3MVG9n_HvETGhr3BmWxOyms9rBUapo88MraguFukUfmfhr_UgZTJO3FsOIFM1mI6MfVEAo4WvuEWte4WPppNy';
        String clientSecret = '2F01B028D90C268B91E1BD4EAB5B63795E4EBE2FC23A9614F5B14BC0127F10B1';
        String username = 'abhilav.srivastav@salesforce.com';
        String password = 'welcome123';
        String grantType = 'password';
        
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        request.setEndpoint('https://login.salesforce.com/services/oauth2/token?grant_type=' + grantType + '&client_id=' + clientId + '&client_secret=' + clientSecret + '&username=' + userName + '&password=' + password);
        
        Http http = new Http();
        HttpResponse response = http.send(request);
        String resp = response.getBody();
        System.debug('Response : ' + resp);
        WrapperResponse wrapperObj = (WrapperResponse)JSON.deserialize(resp, WrapperResponse.class);
        return wrapperObj;
    }
    
    public class WrapperResponse {
        public String access_token;
        public String instance_url;
    }
}