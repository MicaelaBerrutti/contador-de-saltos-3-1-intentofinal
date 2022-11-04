def on_gesture_shake():
    global steps, time, segundos
    steps += 1
    time = input.running_time()
    segundos = time / 1000
    serial.write_value("pasos", steps)
    serial.write_value("tiempo", segundos)
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

segundos = 0
time = 0
steps = 0
basic.show_icon(IconNames.YES)
radio.set_group(42)

def on_forever():
    basic.show_number(steps)
    radio.send_number(steps)
    radio.send_number(segundos)
basic.forever(on_forever)
