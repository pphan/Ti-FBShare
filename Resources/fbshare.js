/**
*    This is without using the Titanium.facebook.login button
*    I set a custom listener then trigger it.
*    the listener handler then
*    check if the user is logged in FB
*    If not, we do the login stuff
*    then on success, trigger the posting dialog
*    If the user was on facebook, we trigger the dialog right away
**/
 


 

if(Titanium.Facebook.loggedIn)
{
     send_facebook_stream();
}
else
{
            
    Titanium.Facebook.authorize();
 	Titanium.Facebook.addEventListener('login',function(e)
{
    
    Titanium.API.info('FACEBOOK LOGIN DATA'+e.data);
    send_facebook_stream();
    })
 
}
 

// get the app ID in facebook developpers
Titanium.Facebook.appid = "100719269947";
 
// set the request permissions
Titanium.Facebook.permissions = ['publish_stream'];
 
/**
 * GENERATE THE FACEBOOK SHARE DIALOG
 * SEND THE FACEBOOK STREAM TO FACEBOOK
 */
function send_facebook_stream()
{
 
    // CREATE THE FACEBOOK MESSAGE
    var data = {
    name:'Your App Name', 
    // set the link if necessary
    link:"http://a2.mzstatic.com/us/r1000/111/Purple/51/1e/3f/mzl.ewwvdahb.175x175-75.jpg",
    caption:"ၾကီးပြားခ်မ္းသာေရးကို အလိုရွိၾကေသာ နတ္ လူတို႕သည္ ၁၂ ႏွစ္ၾကာေအာင္ မဂၤလာတရား အစစ္အမွန္ကို ရွာေဖြခဲ့ၾကေသာ္လည္း ၃၈ျဖာမဂၤလာတရားေတာ္အစစ္အမွန္ကို မရရွိခဲ့ၾကပါ။",
 	// now you add your text
    description: "Description of your App." 
 
 };
    
    
facebook_dialog = Titanium.Facebook.dialog("feed", data, fb_showRequestResult); 
 
 
/**
 * HANDLE THE REQUEST RESULT FROM FACEBOOK
 */
function fb_showRequestResult(r)
{
    //alert(r)
Titanium.API.info('FACEBOOK Request Result  '+r.result);
if (r.result)
{
    facebook_response = Ti.UI.createAlertDialog({
    title:'Facebook Message Share Successfully.',
    message:'Your message has been posted on your facebook wall.'
    });
               
}
else
{
    facebook_response = Ti.UI.createAlertDialog({
    title:'Facebook Stream was cancelled',  
    message:'You has been closed facebook connect.'
    });
 
}
        
facebook_response.show();
var fb_resp_timeout = setTimeout(function(){
    facebook_response.hide();
    }, 2000);
}
 
}



