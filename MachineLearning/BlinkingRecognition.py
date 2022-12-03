import sys
import time
import random
import os
import cv2
import numpy as np
from keras.models import load_model


def rename_file(dist_lable: str):
    count = 0
    file_list = os.listdir("./CreateTrainingData/croppedData")
    for i in range(file_list.__len__()):
        if file_list[i].endswith(".jpg"):

            src = "./CreateTrainingData/croppedData/" + file_list[i]
            dst = "./CreateTrainingData/croppedData/" + dist_lable + count.__str__() + ".jpg"
            os.rename(src, dst)
            print(src + " rename to " + dst)
            count += 1


if __name__ == '__main__':
    rename_file('temp')

    caffemodel_path = './CreateTrainingData/models/res10_300x300_ssd_iter_140000.caffemodel'
    prototxt_path= './CreateTrainingData/models/deploy.prototxt'
    model_path = './models/1018F2623/1018F2623.h5'
    net = cv2.dnn.readNet(model=caffemodel_path, config=prototxt_path)



    model = load_model(model_path)
    if net.empty():
        print('Net is empty!')
        sys.exit(1)

    cap = cv2.VideoCapture(0)
    i = 0

    start_time = time.time()
    off_time = []
    prev_time = 0
    FPS = 20


    print('Program start at local time', time.ctime(start_time))

    while cap.isOpened():

        ret, frame = cap.read()
        current_time = time.time() - prev_time

        if not ret:
            break

        if (ret is True) and (current_time > 1. / FPS):

            h, w = frame.shape[:2]

            blob = cv2.dnn.blobFromImage(frame, scalefactor=1, size=(300, 300))
            net.setInput(blob)
            dets = net.forward()

            for i in range(dets.shape[2]):
                confidence = dets[0, 0, i, 2]
                if confidence < 0.5:
                    continue

                x1 = int(dets[0, 0, i, 3] * w)
                y1 = int(dets[0, 0, i, 4] * h)
                x2 = int(dets[0, 0, i, 5] * w)
                y2 = int(dets[0, 0, i, 6] * h)

                face = frame[y1:y2, x1:x2]
                face = face/256

                if (x2 >= w or y2 >= h):
                    continue
                if (x1<=0 or y1<=0):
                    continue

                height_dist = (y2 - y1) // 2
                crop = frame[y1: y2 - height_dist, x1: x2]
                crop = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
                face_input = cv2.resize(crop, (192, 128))
                face_input = np.expand_dims(face_input, axis=0)
                face_input = np.array(face_input)

                modelpredict = model.predict(face_input)

                on = modelpredict[0][0]
                off = modelpredict[0][1]

                file_list = os.listdir("./CreateTrainingData/croppedData")

                cropped_data_path = "croppedData/temp" + random.randrange(0, 999999).__str__() + ".jpg"
                height_dist = (y2 - y1) // 2
                crop = frame[y1: y2 - height_dist, x1: x2]
                try:
                    cv2.imwrite(cropped_data_path, crop)
                except Exception as e:
                    print(e)

                if on > off:
                    color = (0, 255, 0)
                    label = 'Eyes on %d%%' % (on * 100)
                else:
                    color = (0, 0, 255)
                    label = 'Eyes off %d%%' % (off * 100)
                    off_time.append(time.time())


                cv2.rectangle(frame, pt1=(x1, y1), pt2=(x2, y2), thickness=2, color=color, lineType=cv2.LINE_AA)
                cv2.putText(frame, text=label, org=(x1, y1 - 10), fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=0.8,
                            color=color, thickness=2, lineType=cv2.LINE_AA)

            cv2.imshow('masktest', frame)

            key = cv2.waitKey(1)
            if key == 27:
                break

    end_time = time.time()

    rename_file('crop')
