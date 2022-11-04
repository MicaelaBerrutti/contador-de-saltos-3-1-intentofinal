input.onGesture(Gesture.Shake, function () {
    saltos += 1
    time = input.runningTime()
    saltosSegundos = time / 1000
    serial.writeValue("y", saltos)
    serial.writeValue("x", saltosSegundos)
    radio.sendValue("saltos", saltos)
    radio.sendValue("segundos", saltosSegundos)
})
let ecgSegundos = 0
let time = 0
let saltosSegundos = 0
let saltos = 0
basic.showIcon(IconNames.Yes)
radio.setGroup(42)
let ecg = 0
saltos = 0
saltosSegundos = 0
time = 0
basic.forever(function () {
    ecg = pins.analogReadPin(AnalogPin.P2)
    ecgSegundos = input.runningTime() / 1000
    serial.writeValue("ecg", ecg)
    serial.writeValue("ecgSegundos", ecgSegundos)
    radio.sendValue("ecg", ecg)
    radio.sendValue("ecgSegundos", ecgSegundos)
})
