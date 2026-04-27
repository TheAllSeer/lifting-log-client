# weekly volume calculator

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

based on this, the volume for this set will be calculated. 

for each set, the set's volume is calculated with reps times weight. 
example: if i lifted 100kg of bicep curls for 3 sets of 8 reps, my total bicep volume for this instance is 3 times 8 times 100kg = 2400kg. 

for exercises with primary and secondary muscle groups, the secondary muscle groups will be calculated with 50% of the weight. 
for example, for 3 sets of 8 reps with 100kg of bench press, my volume for the chest will be 2400kg, whereas the volume for triceps and shoulders will be 1200kg. 


## how will it behave with live sessions or retrospective workouts?
retrospective workouts will be added once they are logged.
live workouts will not be added until they are saved and the session is ended. 

## options
no options for now. 

## UI
one muscle group per row. 