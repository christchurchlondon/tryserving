<?php
    // My modifications to mailer script from:
    // http://blog.teamtreehouse.com/create-ajax-contact-form
    // Added input sanitizing to prevent injection

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = 'Interested in:';

        // Check that data was sent to the mailer.
        if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
		$recipients=array();
		$recipients=array("ed@christchurchlondon.org");
		array_push($recipients, "comms@christchurchlondon.org");
		if(isset($_POST['families-check'])) {
			array_push($recipients, "amy@christchurchlondon.org");
			$message .= 'Families, ';
			
		}
		if(isset($_POST['prayer-check'])) {
			//array_push($recipients, "liam@christchurchlondon.org");
			$message .= 'Prayer, ';
		}
		if(isset($_POST['production-check'])) {
			array_push($recipients, "nate@christchurchlondon.org");
			$message .= 'Production, ';
		}
		if(isset($_POST['tech-check'])) {
			array_push($recipients, "nate@christchurchlondon.org");
			$message .= 'Tech, ';
		}
		if(isset($_POST['welcome-check'])) {
			array_push($recipients, "jo.wells@christchurchlondon.org");
			$message .= 'Welcome, ';
		}
		if(isset($_POST['worship-check'])) {
			array_push($recipients, "rich@christchurchlondon.org");
			$message .= 'Worship, ';
		}
		
		if(isset($_POST['south-check'])) {
			$message .= 'south, ';
		}
		if(isset($_POST['central-check'])) {
			$message .= 'central, ';
		}
		if(isset($_POST['westend-check'])) {
			$message .= 'westend, ';
		}
		if(isset($_POST['east-check'])) {
			$message .= 'east, ';
		}
		
        // Set the email subject.
        $subject = "$name... wants to TryServing";
        
        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
		$email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail(implode(',', $recipients), $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
