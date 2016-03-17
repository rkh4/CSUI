$(document).ready(function(){
    
    /*-------------------------------------------------------------*/
    /*----------------------INITIALISATION-------------------------*/
    /*-------------------------------------------------------------*/
    //Addin not displaying sequence
    var activationSequence = 0;
    //Whether a button should read 'Show Script' or 'Hide Script'
    var showScript = 0;
    
    //Hide all objects on page intiially
    $('.header').hide();
    $('.mainText').hide();
    $('.activeButtons').hide();
    $('.buttons').hide();
    $('#showScript').hide();
    $('#helpBox').hide();
    
    activation();
    
    /*-------------------------------------------------------------*/
    /*----------------------INTERACTIVITY--------------------------*/
    /*-------------------------------------------------------------*/
	//"Home" button clicked to 'go back to main page' atm just restarts page
	$('#restartButton').click(function(){
		console.log("Activation Issues -- Restart Button clicked");
        location.reload();
	});
    
    //help section sliding
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
    
    //Side bar sliding (in mobile view)
	$('#sideButton').click(function(){
		$('#sideBar').slideToggle();
	});
    /*-------------------------------------------------------------*/
    /*----------------OUTLOOK-ADDIN-NOT-DISPLAYING-----------------*/
    /*-------------------------------------------------------------*/
    function activation(){
        console.log("Starting Activation Issues process");
        $('.header').fadeOut(500);
        $('.mainText').fadeOut(500);
        $('.activeButtons').fadeOut(500);
        $('.buttons').fadeOut(500);
        $('#showScript').fadeOut(500);
        switch (activationSequence){
            //Initiation
            case 0:
                $('#header1').html('Activation Issues').fadeIn(500);
                $('.activeButtons').fadeIn(500);
                $('#showScript').fadeIn(500);
                //Script section Text
                $('#helpText1').html("<em>Error on Registration Page</em> - test");
                $('#helpText2').html("<em>Step 3 not Showing</em> - test");
                $('#helpText3').html("<em>Activation Code not Received</em> - test");
                $('#helpText4').html("<em>Activation Code Expired</em> - test");
                $('#helpText5').html("<em>Activation Code Invalid</em> - test");
                $('#helpText6').html("<em>Password Issue</em> - test");
                activationSequence++;
                break;
            case 1:
                $('#header2').delay(500).html("Error on Registration Page").fadeIn(500);
                $('#main2').delay(500).html("<h4>A customer may get one of the following errors below when registering for Switch:</h4><p><strong><em>Switch ID not available</em></strong></br>This message occurs as there is already a Switch account in existence with this username. <br>If this is the users account, locate it on ESI and attempt to reset their password</p><p><strong><em>Invalid Email Address</em></strong><br>This error happens when the user enters an incorrectly formatted email address</p><p><strong><em>Switch ID Managed by Another Server</em></strong><br>This message appears when the domain has their own ESI - therefore they cannot register on Switch</p>").fadeIn(500);
                $('#back').delay(500).fadeIn(500);
                break;
            case 2:
                $('#header2').delay(500).html("Step 3 on Activation Page Not Showing").fadeIn(500);
                $('#main2').delay(500).html("<h4>On the registration page step 3 asks the customer to confirm a capcha code, occasionally this may not display, and this would be for one of the following reasons: </h4><p>1. Users email address is not valid</p><p>2. The Switch Account already exists</p><p>3. Javascript in the users Web Broswer is currently disabled</p>").fadeIn(500);
                $('#back').delay(500).fadeIn(500);
                break;
            case 3:
                $('#header2').delay(500).html("Activation Code not Recieved").fadeIn(500);
                $('#main2').delay(500).html("<p>1. Locate Email in Switch Registrations Folder</p><p>2.Check email address is correct</p><p>3. Forward it on if correct - <em>otherwise advise user to re-register</em>").fadeIn(500);
                $('#back').delay(500).fadeIn(500);
                break;
            case 4:
                $('#header2').delay(500).html("Activation Code Expired").fadeIn(500);
                $('#main2').delay(500).html("<h4>Sometimes a customer may get an 'Activation Code Expired' error after clicking the link in the activation email, this occurs when:</h4><p>The actication code was produced more than 24 hours ago - <em>In this case request the user re-register</em></p><p>Or, when a newer code has since been generated - <em>The user will need to locate this code</em></p>").fadeIn(500);
                $('#back').delay(500).fadeIn(500);
                break;
            case 5:
                $('#header2').delay(500).html("Activation Code Invalid").fadeIn(500);
                $('#main2').delay(500).html("The user has entered in the wrong code, they may be trying to enter a password, or may have incorrectly copied the code.<p><em>- Request that they either click the link in their email, or confirm which code they are entering, and then ask them to  enter code once again</em></p>").fadeIn(500);
                $('#back').delay(500).fadeIn(500);
                break;
            case 6:
                $('#header2').delay(500).html("Password Confirmation is Wrong").fadeIn(500);
                $('#main2').delay(500).html("Check user is entering their password, and not activation code. <p><em>Otherwise, ask them to re-register</em></p>").fadeIn(500);
                $('#back').delay(500).fadeIn(500);
                break;
            default:
                $('#header3').html("Sequence not found (" + activationSequence + ") - Please restart process").delay(500).fadeIn(500);
                break;
        };        
    };
    
    /*-------------------------------------------------------------*/
    /*----------------------BUTTON-SWITCHES------------------------*/
    /*-------------------------------------------------------------*/
    //Back button clicked
    $('#back').click(function(){
        console.log("Back button clicked");
        location.reload();
    });
    
    //Error on Registration Page button
    $('#errorOnPage').click(function(){
        console.log("errorOnPage button clicked");
        activationSequence = 1;
        activation();
    });
    //Step 3 not showing button
    $('#step3NotShow').click(function(){
        console.log("step3NotShow button clicked");
        activationSequence = 2;
        activation();
    });
    //Activation Code not received button
    $('#codeNotReceived').click(function(){
        console.log("codeNotReceived button clicked");
        activationSequence = 3;
        activation();
    });
    //Activation Code Expired Button
    $('#codeExpired').click(function(){
        console.log("codeExpired button clicked");
        activationSequence = 4;
        activation();
    });
    //Activation Code Invalid button
    $('#codeInvalid').click(function(){
        console.log("codeInvalid button clicked");
        activationSequence = 5;
        activation();
    });
    //Password Issue button clicked
    $('#passwordIssue').click(function(){
        console.log("passwordIssue button clicked");
        activationSequence = 6;
        activation();
    });
    
});