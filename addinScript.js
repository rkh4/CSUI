$(document).ready(function(){
    
    /*-------------------------------------------------------------*/
    /*----------------------INITIALISATION-------------------------*/
    /*-------------------------------------------------------------*/
    //Addin not displaying sequence
    var addinSequence = 0;
    //Whether a button should read 'Show Script' or 'Hide Script'
    var showScript = 0;
    //Holds the year of users Outlook
    var outlookVersion = 0;
    
    //Hide all objects on page intiially
    $('.header').hide();
    $('.mainText').hide();
    $('.buttons').hide();
    $('#showScript').hide();
    $('#helpBox').hide();
    
    outlookAddin();
    
    /*-------------------------------------------------------------*/
    /*----------------------INTERACTIVITY--------------------------*/
    /*-------------------------------------------------------------*/
	//"Home" button clicked to 'go back to main page' atm just restarts page
	$('#restartButton').click(function(){
		console.log("Outlook addin -- Restart Button clicked");
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
    function outlookAddin(){
        console.log("Starting Outlook Addin not displaying process");
        console.log("Outlook version: " + outlookVersion);
        $('.header').fadeOut(500);
        $('.mainText').fadeOut(500);
        $('.buttons').fadeOut(500);
        //Hidden Script section until script exists
        //$('#showScript').fadeOut(500).fadeIn(500);
        switch (addinSequence){
            //Initiation
            case 0:
                $('#header1').html("Outlook Addin not Displaying <qno>Step 1</qno>").fadeIn(200);
                $('#main1').html('<p>Is the user set as a read only member?</p>If so, pass on contact details for their support contact, and instructions on how to ammend this.').fadeIn(200);
                $('#continue').fadeIn(200);
                break;
            case 1:
                $('#header2').html('What version of Outlook does the user have? <qno>Step 2</qno>').delay(500).fadeIn(500);
                $('.date').delay(500).fadeIn(500);
                addinSequence++;
                break;
            case 2:
                if (outlookVersion == 2003){
                    console.log("Outlook version: " + outlookVersion);
                    $('#header1').html('2003 - Client version 4.0 <qno>Step 3</qno>').delay(500).fadeIn(500);
                    $('#main1').html('Ensure that user is on Switch client version 4.0 or earlier').delay(500).fadeIn(500);
                    $('#continue').delay(500).fadeIn(500);
                    break;
                } else if (outlookVersion == 2007){
                    console.log("Outlook version: " + outlookVersion);
                    $('#header1').html('2007 - Service Pack 3 <qno>Step 3</qno>').delay(500).fadeIn(500);
                    $('#main1').html("<p>Check whether SP3 is installed by selecting 'Help' ad select the option 'About Microsoft Office Outlook'</p><p>You will then be able to see what version of Outlook you're using and also what service pack is installed.</p><table><tr><td></td><th>Outlook 2007</th></tr><tr><th>Original</th><td>12.0.4518.1014</td></tr><tr><th>SP1</th><td>12.0.6213.1000</td></tr><tr><th>SP2</th><td>12.0.6425.1000</td></tr><tr><th>SP3</th><td>12.0.6607.1000</td></tr></table>").delay(500).fadeIn(500);
                    $('#continue').delay(500).fadeIn(500);
                    break;
                } else if (outlookVersion == 2010 || outlookVersion == 2013 || outlookVersion == 2016){
                    console.log("Outlook version: " + outlookVersion);
                    $('#header1').delay(500).html("All editing options have dissapeared <qno>Step 3</qno>").fadeIn(500);
                    $('#main1').delay(500).html("<p>1. Select 'New Message' and in the upper righthand corner next to the question mark there should be a small caret (^ or ˅).</p><p>2. If it is ˅ and you click on it, it will re-open the ribbon and return Outlook to its normal state.</p>").fadeIn(500);
                    $('#continue').delay(500).fadeIn(500);
                    break;
                } else {
                    console.log("Error, no Outlook version found/ incorrectly formatted.");
                    break;
                }
                break;
            case 3:
                $('#header2').delay(500).html("Check that the Add-in is enabled <qno>Step 4</qno>").fadeIn(500);
                if (outlookVersion == 2003){
                    $('#main2').delay(500).html("In order to check these please navigate to:<p><em>Tools > Options > Other > Advanced Options > Add-ins Manager</em></p>").fadeIn(500);
                } else if (outlookVersion == 2007){
                    $('#main2').delay(500).html("In order to check these please navigate to:<p><em>Tools > Trust Centre > addins</em></p>").fadeIn(500);
                } else if (outlookVersion == 2010 || outlookVersion == 2013 || outlookVersion == 2016){
                    $('#main2').delay(500).html("In order to check these please navigate to:<p><em>File > Options > Addins</em></p>").fadeIn(500);
                }
                $('#continue').fadeIn(500);
                break;
            case 4:
                $('#header1').delay(500).html("Load Behaviour").fadeIn(500);
                $('#continue').fadeIn(500);
                break;
            case 5:
                $('#header2').delay(500).html("Corrupt Registry Keys").fadeIn(500);
                $('#continue').fadeIn(500);
                break;
            case 6:
                $('#header1').delay(500).html("Ensure Relevent softwares are installed").fadeIn(500);
                $('#continue').fadeIn(500);
                break;
            case 7:
                $('#header2').delay(500).html("Reinstall Switch").fadeIn(500);
                break;
            default:
                $('#header3').html("Sequence not found (" + addinSequence + ") - Please restart process").delay(500).fadeIn(500);
                break;
        };
              
    };
    
    /*-------------------------------------------------------------*/
    /*----------------------BUTTON-SWITCHES------------------------*/
    /*-------------------------------------------------------------*/
    //Continue button
	$('#continue').click(function(){
		console.log("Continue button clicked");
        addinSequence++;
        outlookAddin();
	});
    
    //Yes No Buttons
	$('#yes').click(function(){
        if (addinSequence == 9){verification = 1;}
        console.log("Sequence " + (addinSequence-1) + " - Correct.");
        outlookAddin();
    });
	$('#no').click(function(){
        console.log("Sequence " + (addinSequence-1) + " - Incorrect.");
		outlookAddin();
	});
    
	//Date buttons
	$('#2003').click(function(){
		console.log("Sequence " + (addinSequence-1) + " - 2003.");
        outlookVersion = 2003;
        outlookAddin();
    });
	$('#2007').click(function(){
        console.log("Sequence " + (addinSequence-1) + " - 2007.");
        outlookVersion = 2007;
        outlookAddin();
    });
	$('#2010').click(function(){
        console.log("Sequence " + (addinSequence-1) + " - 2010.");
        outlookVersion = 2010;
        outlookAddin();
	});
	$('#2013').click(function(){
        console.log("Sequence " + (addinSequence-1) + " - 2013.");
        outlookVersion = 2013;
        outlookAddin();
	});
    $('#2016').click(function(){
        console.log("Sequence " + (addinSequence-1) + " - 2016.");
        outlookVersion = 2016;
        outlookAddin();
	});
    
    //Password reset email received button
    $('#resetReceived').click(function(){
        console.log("Sequence " + (addinSequence-1) + " - Reset received.");
        outlookAddin();
    });

    $('#notApplicable').click(function(){
        console.log("Sequence " + (addinSequence-1) + " - Not Applicable.");
        outlookAddin();
    });
    
});