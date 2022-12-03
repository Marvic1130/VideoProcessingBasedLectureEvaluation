import tkinter as tk
from PIL import ImageTk, Image
import cv2
import os

win = tk.Tk()
win.title("Labeler")
w = 250
win.geometry("")


def showImage(src:str):
    try:
        img = cv2.imread(src)
        img = resizeImg(img)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = Image.fromarray(img)
        imgtk = ImageTk.PhotoImage(image=img)
        label = tk.Label(win, image=imgtk)
        label.image = imgtk
        label.grid(row=0, column=0, columnspan=3)
    except:
        for i in range(file_list.__len__()):
            if file_list[i] == src:
                del file_list[i]
                break
        try:
            showImage(file_list[0])
        except IndexError:
            exit()


def countJpgFiles(src:str):
    file_list = os.listdir(src)
    count = 0
    for i in range(file_list.__len__()):
        if file_list[i].endswith(".jpg"):
            src = "croppedData/" + file_list[i]
            count += 1
    return count


def resizeImg(src:str):
    try:
        h, w = src.shape[:2]
        dist = cv2.resize(src, (250, int(h*250/w)), cv2.INTER_AREA)
    except AttributeError:
        exit()
    return dist

file_list = os.listdir("croppedData")
file_list.sort()
file_list.sort(key=len)
countIndex = 0
on_count = countJpgFiles("on")
off_count = countJpgFiles("off")

for i in range(file_list.__len__()):
    if file_list[i].endswith(".jpg"):
        global src
        src = "croppedData/" + file_list[i]
        del file_list[i]
        break

    else:
        del file_list[i]
try:
    showImage(src)

except:
    exit()

def onClick_onButton():
    global on_count
    global src
    os.rename(src, "on/on" + on_count.__str__() + ".jpg")
    on_count += 1
    try:
        for i in range(file_list.__len__()):
            if file_list[i].endswith(".jpg"):
                src = "croppedData/" + file_list[i]
                del file_list[i]
                break
    except IndexError:
        exit()
    showImage(src)


def onClick_offButton():
    global off_count
    global src
    os.rename(src, "off/off" + off_count.__str__() + ".jpg")
    off_count += 1
    try:
        for i in range(file_list.__len__()):
            if file_list[i].endswith(".jpg"):
                src = "croppedData/" + file_list[i]
                del file_list[i]
                break
    except IndexError:
        exit()
    showImage(src)


def onClick_delete():
    global src
    os.remove(src)
    try:
        for i in range(file_list.__len__()):
            if file_list[i].endswith(".jpg"):
                src = "croppedData/" + file_list[i]
                del file_list[i]
                break
    except IndexError:
        exit()
    showImage(src)


on_button = tk.Button(win, text="ON", command=onClick_onButton)
on_button.config(width=5, height=2)
on_button.grid(row=1, column=0)

off_button = tk.Button(win, text="OFF", command=onClick_offButton)
off_button.config(width=5, height=2)
off_button.grid(row=1, column=1)

del_button = tk.Button(win, text="Delete", command=onClick_delete)
del_button.config(width=5, height=2)
del_button.grid(row=1, column=2)
win.mainloop()

