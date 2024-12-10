const int smokeSensor = 4;


void setup() {

   Serial.begin(9600);
  
 }

void loop() {
  int digitalNumber = analogRead(smokeSensor); // Generates a digital number from 0 to 4095
  Serial.println(digitalNumber); 
  Serial.print("Value in PPM : ");
  delay(2000);
  

  
  }
