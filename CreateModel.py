from keras.models import Sequential
from keras.layers import Dropout, Dense
from keras.layers import Flatten, Convolution2D, MaxPooling2D, Conv2D
from keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.metrics import f1_score, accuracy_score, log_loss
from sklearn.model_selection import train_test_split
import os
import cv2
import numpy as np
import matplotlib
matplotlib.use('TKAgg')
from matplotlib import pyplot as plt

groups_folder_path = 'CreateTrainingData'
categories = ['on', 'off']

num_classes = categories.__len__()

ls_x = []
ls_y = []

for idex, categorie in enumerate(categories):
    label = [0 for i in range(num_classes)]
    label[idex] = 1
    image_dir = groups_folder_path + '/' + categorie + '/'

    for top, dir, f in os.walk(image_dir):
        for filename in f:
            if filename.endswith('.jpg'):
                img = cv2.imread(image_dir + filename)
                img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                img = cv2.resize(img, (192, 128))
                ls_x.append(img / 256)
                ls_y.append(label)

x_train, x_test, y_train, y_test = train_test_split(ls_x, ls_y, test_size=.2, random_state=0)

X_train = np.array(x_train)
Y_train = np.array(y_train)
X_test = np.array(x_test)
Y_test = np.array(y_test)

print(X_train.shape)
print(X_train.shape[1:])

model = Sequential()
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(128, 192, 1)))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Convolution2D(32, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Convolution2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Convolution2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(2, activation='softmax'))

model.summary()

model.compile(loss='binary_crossentropy', optimizer='Adam', metrics=['accuracy'])

modelpath = 'ONOFFMODEL.h5'

early_stopping_calback = EarlyStopping(monitor='loss', patience=2)
checkpointer = ModelCheckpoint(filepath=modelpath, monitor='loss', verbose=0, save_best_only=True)

hist = model.fit(X_train, Y_train, batch_size=64, epochs=200, callbacks=[early_stopping_calback, checkpointer])

plt.figure(figsize=(12, 8))
plt.plot(hist.history['loss'])
plt.plot(hist.history['accuracy'])
plt.legend(['loss', 'acc'])
plt.grid()
plt.show()

model.save(modelpath)

y_predicted = model.predict(X_test)
y_pred = []
for i in range(y_predicted.__len__()):
    if y_predicted[i, 0] > y_predicted[i, 1]:
        y_pred.append([1, 0])
    else:
        y_pred.append([0, 1])

Y_pred = np.array(y_pred)
print('Test accuracy:', accuracy_score(Y_test, Y_pred))
print('Test loss:', log_loss(Y_test, y_predicted))
print("F1-score: {:.2%}".format(f1_score(Y_test, Y_pred, average='macro')))
