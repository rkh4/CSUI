$(document).ready(function(){

    /*-------------------------------------------------------------*/
    /*----------------------INITIALISATION-------------------------*/
    /*-------------------------------------------------------------*/
    //Gets current page url for use later
    var url = window.location.href;
    //Check to see if email address in database (not currently in use)
	var custEmailAddress = false;
    //Password reset sequence
	var pwSequence = 0;
    //Account deletion sequence
	var delSequence = 0;
    //Password reset score
	var totalScore = 0;
    //Has the email verification been sent out
    var verification = 0;
    //Whether a button should read 'Show Script' or 'Hide Script'
    var showScript = 0;
	
	//Hide all objects initially
	$('.mainText').hide();
	$('.header').hide();
	$('.buttons').hide();
    $('#helpBox').hide();
    $('#showScript').hide();	
    
    //Chooses which sequence to run (password reset/ acc deletion/ etc)
    function runSequence(){
        if (url.search("index.html") != -1){
            //Start Password reset process
            console.log("Start password reset process");
            passwordReset();
        } else if(url.search("accountDeletion.html")) {
            //Start account deletion process
            console.log("Start account deletion process");
            accountDeletion();
        } else {
            console.log("Page not recognised - " + url);
        }
    }
    
   runSequence();
	
    /*-------------------------------------------------------------*/
    /*----------------------INTERACTIVITY--------------------------*/
    /*-------------------------------------------------------------*/
	//"Home" button clicked to 'go back to main page' atm just restarts page
	$('#home').click(function(){
		console.log("Home -- side button clicked");
	});
    
    //"Reset password" at end, take user to form
	$('#passwordReset').click(function(){
		console.log("Resetting users password, navigating to google form");
	});
    
    //"Restart" button clicked to restart page (top left panel)
	$('#restartButton').click(function(){
		console.log("Reloading page");
		location.reload();
	});
    
    //Progress Bar function
	function progress(percent, $element){
		var progressBarWidth = percent * $('#progressBar').width()/100;
		$element.find('#pb').animate({width: progressBarWidth},500);
	}
    
    //Timer Bar function
	function progress(percent, $element){
		var progressBarWidth = percent * $('#progressBar').width()/100;
		$element.find('#pb').animate({width: progressBarWidth},500);
	}
	
	//Side bar sliding (in mobile view)
	$('#sideButton').click(function(){
		$('#sideBar').slideToggle();
	});
    
    //Script section sliding down
    $('#showScript').click(function(){
        console.log("showScript button clicked");
        $('#helpBox').slideToggle();
        if (showScript == 0){
            $('#showScript').html("(Hide Script)");
            showScript = 1;
        } else {
            showScript = 0;
            $('#showScript').html("(Show Script)");
        }
    });

    /*-------------------------------------------------------------*/
    /*-------------------PASSWORD-RESET-PROCESS--------------------*/
    /*-------------------------------------------------------------*/
	function passwordReset(){
        console.log("Password reset process, Sequence - " + pwSequence);
        console.log("Total score: " + totalScore);
        if (totalScore > 99){
			progress(100,$('#progressBar'));
			reset();
		} else {        
            progress(totalScore,$('#progressBar'));
            $('.mainText').fadeOut(500);
            $('.header').fadeOut(500);
            $('.buttons').fadeOut(500);
            $('.buttonText').fadeOut(500);
            $('#showScript').fadeOut(500).fadeIn(500);
            helpSection(pwSequence);
            switch(pwSequence){
                //Taking customers email address    
                case 0:
                    console.log("Prompting for customer's email address");
                    $('#header1').html("Take Customer Details").fadeIn(200);
                    $('#main1').html('Take customers Email address & name').fadeIn(200);
                    $('#continue').fadeIn(200);
                    pwSequence++;
                    break;
                case 1:
                    custEmailAddress = true;
                    //If statement in place for future email checking
                    if(custEmailAddress==true){
                        console.log("Email address confirmed");
                        //Ask first security question
                        $('#header2').html("First Security Question <qno>1 of 8</qno>").delay(500).fadeIn(500);
                        $('#main2').html("Ask user first security question").delay(500).fadeIn(500);
                        $('.yesNo').delay(500).fadeIn(500);
                    }
                    pwSequence++;
                    break;
                //Ask second security question
                case 2:
                    $('#header1').html("Second Security Question <qno>2 of 8</qno>").delay(500).fadeIn(500);
                    $('#main1').html("Check answer for second Security question").delay(500).fadeIn(500);
                    $('.yesNo').fadeIn(500);
                    pwSequence++;
                    break;
               //Take telephone number 
                case 3:
                    $('#header2').html("Telephone Details <qno>3 of 8</qno>").delay(500).fadeIn(500);
                    $('#main2').html("Request customers telephone number").delay(500).fadeIn(500);
			        $('.yesNo').fadeIn(500);
                    pwSequence++;
                    break;
                //Account created
                case 4:
                    $('#header1').html("Account Creation <qno>4 of 8</qno>").delay(500).fadeIn(500);
                    $('#main1').html('Ask for the approximate date the account was created').delay(500).fadeIn(500);
                    $('.date').delay(500).fadeIn(500);
                    pwSequence++;
                    break;
                //Secure messages sent
                case 5:
                    $('#header2').html("Secure Messages Sent <qno>5 of 8</qno>").delay(500).fadeIn(500);
                    $('#main2').html("Query approximate number of sent secure messages").delay(500).fadeIn(500);
			        $('.yesNo').delay(500).fadeIn(500);
                    pwSequence++;
                    break;
                //Software used
                case 6:
                    $('#header1').html("Check Used Software <qno>6 of 8</qno>").delay(500).fadeIn(500);
                    $('#main1').html("<p>Look at ‘Software used’. If they have used something other than ‘Administration Panel’ or ‘Web Access’, ask the question below:</p>").delay(500).fadeIn(500);
                    $('#notApplicable').delay(500).fadeIn(500);
                    $('.yesNo').fadeIn(500);
                    pwSequence++;
                    break;
                //Last logged into account
                case 7:
                    $('#header2').html("Last Logged In <qno>7 of 8</qno>").delay(500).fadeIn(500);
                    $('#main2').html("Ask for the approximate date they last logged in").delay(500).fadeIn(500);
			        $('.date').delay(500).fadeIn(500);
                    pwSequence++;
                    break;
                //Email verification
                case 8:
                    $('#header1').html("Email verification <qno>8 of 8</qno>").delay(500).fadeIn(500);
                    $('#main1').html('Send out email verification email').delay(500).fadeIn(500);
			        $('#yes').html('Received').delay(500).fadeIn(500);
			        $('#no').html('Not received').delay(500).fadeIn(500);
                    pwSequence++;
                    break;
                //If score still too low, discuss with supervisor
                case 9:
                    $('#header2').html("Check with Supervisor").delay(500).fadeIn(500);
                    $('#main2').html("Overall score too low, check with supervisor").delay(500).fadeIn(500);
                    if (totalScore > 49 && verification != 1){$('#resetReceived').delay(500).fadeIn(500);}
                    break;
                default:
                    console.log("Sequence Unknown: " + pwSequence);
                    break;
            }
        }
    };
    
    //Score high enough, now can reset email
	function reset(){
		console.log("Total score: " + totalScore + " - Proceeding to password reset."); 
        console.log("");
        progress('100',$('#progressBar'));        
        pwSequence = 10;
        helpSection(pwSequence);
        $('.buttons').fadeOut(500);
		$('.mainText').fadeOut(500);
		$('.header').fadeOut(500);
		$('#header3').delay(500).html("Reset Complete").fadeIn(500);
        $('#main3').html('You may now reset users password').delay(500).fadeIn(500);
        $('#passwordReset').delay(500).fadeIn(500);
	};
	
    /*-------------------------------------------------------------*/
    /*------------------ACCOUNT-DELETION-PROCESS-------------------*/
    /*-------------------------------------------------------------*/
    function accountDeletion(){
        console.log("Account deletion process, Sequence - " + delSequence);
        console.log("Total score: " + totalScore);
        if (totalScore > 99){
			progress(100,$('#progressBar'));
            console.log("**Go to account deletion confirmation**");
			accDelConfirmed();
		} else {  
            progress(totalScore,$('#progressBar'));
            $('.mainText').fadeOut(500);
            $('.header').fadeOut(500);
            $('.buttons').fadeOut(500);
            $('.buttonText').fadeOut(500);
            //Removed Script temporarily, until script exists
            //$('#showScript').fadeOut(500).fadeIn(500);
            switch(delSequence){
                case 0:
                    $('#header1').html("Account deletion <qno>1 of 9</qno").fadeIn(200);
                    $('#main1').html("Send user initial deletion email - Have you received confirmation back?").fadeIn(200);
                    $('#continue').fadeIn(200);               
                    delSequence++;
                    break;
                case 1:
                    $('#header2').html("First Security Question <qno>2 of 9</qno>").delay(500).fadeIn(500);
                    $('#main2').html("To confirm users identity - Ask first security question").delay(500).fadeIn(500);
                    $('.yesNo').delay(500).fadeIn(500);
                    delSequence++;
                    break;
                case 2:
                    $('#header1').html("Second Security Question <qno>3 of 9</qno>").delay(500).fadeIn(500);
                    $('#main1').html("Check second security question").delay(500).fadeIn(500);
                    $('.yesNo').fadeIn(500);
                    delSequence++;
                    break;
                case 3:
                    $('#header2').html("Telephone Details <qno>4 of 9</qno>").delay(500).fadeIn(500);
                    $('#main2').html("Request customers telephone number").delay(500).fadeIn(500);
			        $('.yesNo').fadeIn(500);
                    delSequence++;
                    break;
                case 4:
                    $('#header1').html("Account Creation <qno>5 of 9</qno>").delay(500).fadeIn(500);
                    $('#main1').html('Ask for the approximate date the account was created').delay(500).fadeIn(500);
                    $('.date').delay(500).fadeIn(500);
                    delSequence++;
                    break;
                //Secure messages sent
                case 5:
                    $('#header2').html("Secure Messages Sent <qno>6 of 9</qno>").delay(500).fadeIn(500);
                    $('#main2').html("Query approximate number of sent secure messages").delay(500).fadeIn(500);
			        $('.yesNo').delay(500).fadeIn(500);
                    delSequence++;
                    break;
                //Software used
                case 6:
                    $('#header1').html("Check Used Software <qno>7 of 9</qno>").delay(500).fadeIn(500);
                    $('#main1').html("<p>Look at ‘Software used’. If they have used something other than ‘Administration Panel’ or ‘Web Access’, ask the question below:</p>").delay(500).fadeIn(500);
                    $('#notApplicable').delay(500).fadeIn(500);
                    $('.yesNo').fadeIn(500);
                    delSequence++;
                    break;
                //Last logged into account
                case 7:
                    $('#header2').html("Last Logged In <qno>8 of 9</qno>").delay(500).fadeIn(500);
                    $('#main2').html("Ask for the approximate date they last logged in").delay(500).fadeIn(500);
			        $('.date').delay(500).fadeIn(500);
                    delSequence++;
                    break;
                //Email verification
                case 8:
                    $('#header1').html("Email verification <qno>9 of 9</qno>").delay(500).fadeIn(500);
                    $('#main1').html('Send out email verification email').delay(500).fadeIn(500);
			        $('#yes').html('Received').delay(500).fadeIn(500);
			        $('#no').html('Not received').delay(500).fadeIn(500);
                    delSequence++;
                    break;
                //If score still too low, discuss with supervisor
                case 9:
                    $('#header2').html("Check with Supervisor").delay(500).fadeIn(500);
                    $('#main2').html("Overall score too low, check with supervisor").delay(500).fadeIn(500);
                    if (totalScore > 49 && verification != 1){$('#resetReceived').delay(500).fadeIn(500);}
                    break;
                default:
                    console.log("Sequence unknown - " + delSequence);
                    $('#header3').html("Sequence unknown (" + delSequence + ") - Restart process").delay(500).fadeIn(500);
                    break;
            }
        }        
        
    };
    
    //Score high enough, now can reset email
	function accDelConfirmed(){
		console.log("Total score: " + totalScore + " - Proceeding to Accound deletion."); 
        progress('100',$('#progressBar'));        
        delSequence = 10;
        helpSection(delSequence);
        $('.buttons').fadeOut(500);
		$('.mainText').fadeOut(500);
		$('.header').fadeOut(500);
		$('#header3').delay(500).html('User Verification Passed').fadeIn(500);
        $('#main3').html('As identity has been verified, escalate ticket to second line ').delay(500).fadeIn(500);
	};
    
    /*-------------------------------------------------------------*/
    /*----------------------BUTTON-SWITCHES------------------------*/
    /*-------------------------------------------------------------*/
    //Continue button
	$('#continue').click(function(){
		console.log("Continue button clicked");
        runSequence();
	});
    
    //Yes No Buttons
	$('#yes').click(function(){
        if (pwSequence == 9){verification = 1;}
        console.log("Sequence " + (pwSequence-1) + " - Correct.");
        totalScore+=50;
        runSequence();
    });
	$('#no').click(function(){
        console.log("Sequence " + (pwSequence-1) + " - Incorrect.");
		runSequence();
	});
    
	//Date buttons
	$('#exact').click(function(){
		console.log("Sequence " + (pwSequence-1) + " - Exact date.");
        totalScore+=50;
        runSequence();
    });
	$('#month').click(function(){
        console.log("Sequence " + (pwSequence-1) + " - Month correct.");
        totalScore+=25;
        runSequence();
    });
	$('#year').click(function(){
        console.log("Sequence " + (pwSequence-1) + " - Year correct.");
        totalScore+=10;
        runSequence();
	});
	$('#incorrect').click(function(){
        console.log("Sequence " + (pwSequence-1) + " - Incorrect.");
        totalScore+=0;
        runSequence();
	});
    
    //Password reset email received button
    $('#resetReceived').click(function(){
        console.log("Sequence " + (pwSequence-1) + " - Reset received.");
        totalScore+=50;
        runSequence();
    });

    $('#notApplicable').click(function(){
        console.log("Sequence " + (pwSequence-1) + " - Not Applicable.");
        runSequence();
    });
    
    /*-------------------------------------------------------------*/
    /*---------------------HELP-SECTION-RESPONSES------------------*/
    /*-------------------------------------------------------------*/
    //Pw reset script section
    function helpSection(sequenceNo){
        switch(sequenceNo){
            //Take customer's email address
            case 0:
                $('#questionNo').hide();
                $('#helpText1').html("Not to worry, I’ll be able to assist you with this");
                $('#helpText2').html("Could I please take your name and email address? I can then have a look at your account and hopefully get this sorted for you");
                $('#helpText3').hide();
                $('#helpText4').hide();
                $('#helpText5').hide();
                $('#helpText6').hide();
                break;
            //Ask customer first question
            case 1:
                $('#helpText1').html("<p>Thank you for waiting. I will go over the questions with you one more time and check the answers on the system. Usually it could be a slight variation or miss-spelling but I will be able to check this for you.</p><p>The first question is...</p>");
                $('#helpText2').html("<i>Correct</i> - That's great, thank you.");
                $('#helpText3').show().html("<i>Incorrect</i> - Unfortunately, that’s not the answer that I have on the system. Could it be anything else at all?");
                $('#helpText4').hide();
                $('#helpText5').hide();
                $('#helpText6').hide();
                break;
            //Ask customer second question
            case 2:
                $('#helpText1').html("So the second question is...");
                $('#helpText2').html("<i>Correct</i>- Thanks for that.");
                $('#helpText3').html("<i>Incorrect</i>- It’s a different answer on the system, but I’ll move on to the next question to try and get this reset for you.");
                $('#helpText4').hide();
                $('#helpText5').hide();
                $('#helpText6').hide();
                break;
            //Ask customer for phone number
            case 3:
                $('#helpText1').html("I can see that there is a telephone number linked with this account. Would you be able to confirm this for me please?");
                $('#helpText2').html("<i>Correct</i> - Perfect, thank you.");
                $('#helpText3').html("<i>Incorrect</i> – That’s not what I have here. Could it be anything else at all?");
                $('#helpText4').html("<i>If still incorrect</i> – Hmmm, it’s something different here. Sorry about this! Let me see what other security questions are available…");
                $('#helpText5').hide();
                $('#helpText6').hide();
                break;
            //Date account was created
            case 4:
                $('#helpText1').html("<p>Just to verify that you are the account holder, could you please confirm roughly when this account was created?</p><p>If you know the exact date, that would be useful too.</p>");
                $('#helpText2').html("<i>Exact Date</i> - Thank you.");
                $('#helpText3').html("<i>Month Correct</i> – Thank you.");
                $('#helpText4').show().html("<i>Year Correct</i> – Thank you.");
                $('#helpText5').show().html("<i>Incorrect/Unsure</i> – Not to worry, let’s move on.");
                $('#helpText6').hide();
                break;
            //Number of secure messages sent
            case 5:
                $('#helpText1').html("Are you able to confirm the number of secure packages that have been sent from this account?");
                $('#helpText2').html("<i>Correct</i> – Great, thank you. We should be almost there now!");
                $('#helpText3').html("<i>Incorrect</i> – OK, I have a few more questions I can ask you…");
                $('#helpText4').hide();
                $('#helpText5').hide();
                $('#helpText6').hide();
                break;
            //Checking what software they have used
            case 6:
                $('#helpText1').html("Have you ever used our software at all? If so, could you tell me what you’ve used?");
                $('#helpText2').html("<i>Correct</i> – That’s correct, thanks for that.");
                $('#helpText3').show().html("<i>Incorrect</i> – Don’t worry, I’ll ask another question.");
                $('#helpText4').hide();
                $('#helpText5').hide();
                $('#helpText6').hide();
                break;
            //Date account last logged into
             case 7:
                $('#helpText1').html("Do you have a recollection of when you may have last logged into this account?");
                $('#helpText2').html("<i>Exact Date</i> -  Thank you.");
                $('#helpText3').html("<i>Month Correct</i> – Thank you.");
                $('#helpText4').html("<i>Year Correct</i> – Thank you.");
                $('#helpText5').show().html("<i>Incorrect/Unsure</i> – Not to worry, let’s move on.");
                $('#helpText6').hide();
                break;
            //Email verification
            case 8:
                $('#helpText1').html("<p>One final check to verify you as the account holder is email verification.</p><p>What I’ll do is send you an email, please respond to that confirming you are the account holder and wish to have a password reset and once I’ve received it I can go ahead and reset the account.</p>");
                $('#helpText2').html("<i>Yes, I have received the email</i> – I’ve received the confirmation, thank you.");
                $('#helpText3').html("<i>No, I have not received it</i> – Unfortunately I’ve not received it yet, so I’ll wait for it to come through for a minute, just in case.");
                $('#helpText4').hide();
                $('#helpText5').hide();
                $('#helpText6').hide();
                break;
            //Score is still too low
             case 9:
                $('#helpText1').html("<p>Unfortunately the system has not been able to verify your identity to a standard it is happy with, so I’ve reached out to my supervisor so I can get this reset for you.</p><p>I’m really sorry that I’ve not been able to reset it in this call but I’ll make sure that this is escalated and someone will be in touch as soon as possible. I’ve logged a ticket for you which you can follow up or respond to at any time.</p>");
                $('#helpText2').html("<i>Email now received</i> – I’ve received the email during this time, so I can go ahead and reset it actually. Bear with me!");
                $('#helpText3').hide();
                $('#helpText4').hide();
                $('#helpText5').hide();
                $('#helpText6').hide();
                break;
            //You may now reset the password
            case 10:
                $('#helpText1').html("<p>Thanks for answering those questions. I’ve just sent you a password reset email.</p><p>If you could please click on the first link inside that email, it should take you to a reset page. Let me know once this has loaded for you.</p><p>[Once loaded]</p><p>The first question should ask you for a reset code. This is…</p><p>A - Alpha</p><p>B - Bravo</p><p>C - Charlie</p><p>D - Delta</p><p>E - Echo</p><p>F - Foxtrot</p><p>Underneath you’ll be able to reset your password and choose new security questions. Just make sure that the new password is at least 8 characters long, includes a lower case letter and at least one number or capital.</p><p>Once you’ve reset, you should be good to go. Was it a secure email you were trying to open?</p>");
                $('#helpText2').html("");
                $('#helpText3').hide();
                $('#helpText4').hide();
                $('#helpText5').hide();
                $('#helpText6').hide();
                break;       
        }   
    }  
});