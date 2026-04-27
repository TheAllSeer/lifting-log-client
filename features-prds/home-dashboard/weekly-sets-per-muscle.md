# weekly sets per muscle group

- how will it be updated with regards to retrospecitve workouts or live sessions?
- what should it look like?
- how should it calculate? 
- what options should it have? 

## how should it calculate
each workout has sets. each set has an exercise name. 
there should be a typed file that stores each exercise to it's muscle groups. 
each exercise will have one or more muscle groups. 
these muscle groups split into primary and secondary muscle groups. 

for example: 
- bicep curls will only have the biceps muscle group, it will be the primary muscle group. 
- bench press will have the chest, triceps and shoulders, chest being the primary muscle group while triceps and shoulders both being secondary muscle groups. 

based on this, the number of sets will be calculated.

each set will be added as one set to the sum of sets for the primary muscle groups, and as half a set to the sum of sets for the secondary muscle groups.

example:
3 sets of bench press, will be 3 chest sets, 0.5 sets of triceps and 0.5 sets of shoulders.


## how will it behave with live sessions or retrospective workouts?
retrospective workouts will be added once they are logged.
live workouts will not be added until they are saved and the session is ended. 

## options
no options for now. 

## UI
one muscle group per row. 