# settings
the settings should be closed by default. 
there should be an icon at the top right that allows you to open the settings. 

the settings should include: 
- defining the week to the format of Sun-Sat or Mon-Sun.
- defining the overall data shown to be in kgs or lbs. 
    - this should NOT affect the data logged in any workout
    - this should NOT change any data previously logged from kgs into lbs. 
    - the rational behind this is, if the user is at the gym there may be a 25lbs dumbbell, or an 8kg dumbbell. the user should be able to log their working set in any unit they see fit, the conversion to the unit in the settings should be done behind the scenes and should only affect the home-dashboard widgets. 
- reset data 
    - this should prompt the user with an "Are you sure?" confirmation popup, after which the data will be deleted. 
    - for development purposes, the reset data button should not delete the mock data. 
    