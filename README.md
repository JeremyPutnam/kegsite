# Kegsite

This is an overview of the creation process for my kegerator scale.  I was fortunate to be able to modify the kegerator which my friend already owned so I did not create this from scratch.

![](/Keg%20Fridge/0.1KegProblem.JPG)

I began by buging some wood and cutting it up for the scale

![](/Keg%20Fridge/0CutWood.JPG)

I ordered a cheap LCD screen off of amazon and wrote some basic code to check the screen worked with my ardunio.

![](/Keg%20Fridge/1.1LCDSetUp.JPG)

I positioned the load cells on the wood and attempted to make a Wheatstone Bridge configuration.  This most likely would have worked, but I made a mistake and did not raise the load cells so that I could get an actual reading from them.  There was hardly any documentation on how to actually mount these load cells.  The whole process here was a huge headache.  This picture is the improper load cell set up.

![](/Keg%20Fridge/3BadLoadCellSetUp.JPG)

After scrolling through everything I could find about load cells, I managed to find a thread where someone referenced the fact that the load cells had to be raised to work.  I cut some small pieces of wood to raise the load cells above the board which seemed easier than trying to drill out a hole of my bottom board.
![](/Keg%20Fridge/4ImprovedWood.JPG)
![](/Keg%20Fridge/5ImprovingLoadCell.JPG)

I bought a HX711 chip/Load Combinator from SparkFun (after the initial cheap board I got off amazon didn't work) and load cells from amazon.  I then soldered them together.  I initially forgot to solder wires from my power source to both the VCD and VCC on the HX711 chip so don't make my same mistake.
![](/Keg%20Fridge/2Solder.mp4)

Finally I had an actual working set up.  I used the bogde HX711 and liquidcrystal_i2c ardunio libraries to create the source code for reading the HX711 inputs and displaying to the lcd screen.
![](/Keg%20Fridge/6ImprovedLoadCell.JPG)

Next I started to calibrate the scale.  With the help of my roommates, I created some data points using a bathroom scale and various weights to generate a line of best fit for my data.
![](/Keg%20Fridge/8Calibration.JPG)

I did a test run and found that my scale was accurate to ~0.05 pounds.  I weighed an empty keg that was lying around and found that it weighed about 31 pounds.
![](/Keg%20Fridge/9KegTestRun.JPG)


I then began the process of installing the ardunio in the fridge.  I increased the size of the hole where the CO2 tank tube went in so that I could put in my arduino power supply and LCD display wires.  The wiring is messy, but it works.
![](/Keg%20Fridge/10Wiring.JPG)


I then placed the scale on the already existing wood legs which held up the keg.  The wiring was stored underneath.
![](/Keg%20Fridge/11Stored.JPG)

The final output looks like this.
![](/Keg%20Fridge/FridgeOutput.JPG)




