from time import sleep
import sounddevice as sd
from scipy.io.wavfile import write

from pydub import AudioSegment
from pydub.playback import play

from playsound import playsound
import tkinter as tk
from tkinter import filedialog
from tkinter import messagebox

from tkinter import *
from PIL import ImageTk, Image 




top=tk.Tk() 
top.geometry('400x400')
top.title('Please talk to me !')
top.configure(background='white')
label=Label(top,background='#CDCDCD', font=('calibri',20,'bold'))

def tom():
    fs = 44100  # Sample rate
    seconds = 10  # Duration of recording

    myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)
    print('Recording')
    sd.wait()  # Wait until recording is finished
    print('Done')
    write('output.wav', fs, myrecording)  # Save as WAV file

    sleep(1)

    sound = AudioSegment.from_file('output.wav', format="wav")

    # shift the pitch up by half an octave (speed will increase proportionally)
    octaves = 0.10

    new_sample_rate = int(sound.frame_rate * (20.0 ** octaves))

    # keep the same samples but tell the computer they ought to be played at the 
    # new, higher sample rate. This file sounds like a chipmunk but has a weird sample rate.
    hipitch_sound = sound._spawn(sound.raw_data, overrides={'frame_rate': new_sample_rate})

    # now we just convert it to a common sample rate (44.1k - standard audio CD) to 
    # make sure it works in regular audio players. Other than potentially losing audio quality (if
    # you set it too low - 44.1k is plenty) this should now noticeable change how the audio sounds.
    hipitch_sound = hipitch_sound.set_frame_rate(44100)

    #Play pitch changed sound
    #export / save pitch changed sound
    hipitch_sound.export("output_pitch.wav", format="wav")

    playsound('output_pitch.wav')

# create a heading label
heading = Label(top, text="Hey my name is NINA", font=("Arial Bold", 14))
heading.pack(pady=20)

# create a PhotoImage object with the image file
img = PhotoImage(file="talkingtom.gif")

# create a button with the image and text
upload = Button(top, text="Talking to Tom", image=img, command=tom, padx=10, pady=5)
upload.configure(background='#364156', foreground='white', font=('calibri', 10, 'bold'), fg='white')
upload.pack(side=TOP, pady=50)

# start the Tkinter event loop
top.mainloop()