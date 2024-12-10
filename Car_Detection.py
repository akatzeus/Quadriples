import cv2
import urllib.request
import numpy as np

# Path to the Haar Cascade XML file
cascade_path = 'car_detection.xml'  # Ensure this file is in your working directory
car_cascade = cv2.CascadeClassifier(cascade_path)

# Check if the cascade file loaded correctly
if car_cascade.empty():
    print("Error: Could not load Haar Cascade XML file. Check the path!")
    exit()

# URL for the ESP32-CAM
url = 'http://192.168.33.192/320x240.jpg'

cv2.namedWindow("Car Detection", cv2.WINDOW_AUTOSIZE)

while True:
    try:
        # Fetch the image from the ESP32-CAM
        img_resp = urllib.request.urlopen(url)
        imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
        img = cv2.imdecode(imgnp, -1)

        # Check if the image is valid
        if img is None:
            print("Failed to retrieve image")
            continue

        # Convert the image to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Detect cars using Haar Cascade
        cars = car_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(60, 60))

        # Draw rectangles around detected cars
        for (x, y, w, h) in cars:
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Display the number of cars detected
        num_cars = len(cars)
        cv2.putText(img, f"Cars detected: {num_cars}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX,
                    1, (0, 255, 0), 2, cv2.LINE_AA)

        # Display the image
        cv2.imshow("Car Detection", img)

        print(f"Number of cars detected: {num_cars}")

        # Exit on 'q' key press
        if cv2.waitKey(5) & 0xFF == ord('q'):
            break

    except Exception as e:
        print(f"Error: {e}")

cv2.destroyAllWindows()
