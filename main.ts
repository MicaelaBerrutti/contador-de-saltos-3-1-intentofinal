input.onGesture(Gesture.Shake, function () {
    saltos += 1
    time = input.runningTime()
    saltosSegundos = time / 1000
    serial.writeValue("y", saltos)
    serial.writeValue("x", saltosSegundos)
    radio.sendValue("saltos", saltos)
    radio.sendValue("segundos", saltosSegundos)
})
function convertirPulso () {
    if (ecg >= 800 && contadorPulso == 0) {
        tiempoPicoPulso = input.runningTime() / 1000
        delta_t = tiempoPicoPulso - ecgSegundos
        contadorPulso = 1
        pulsoFinal = (60 - 60 % delta_t) / delta_t
        return contadorPulso
    } else if (ecg <= 400 && contadorPulso == 1) {
        contadorPulso = 0
        return contadorPulso
    }
    return pulsoFinal
}
let pulsoFinal = 0
let ecgSegundos = 0
let delta_t = 0
let tiempoPicoPulso = 0
let contadorPulso = 0
let time = 0
let saltosSegundos = 0
let saltos = 0
let ecg = 0
basic.showIcon(IconNames.Yes)
radio.setGroup(42)
ecg = 0
saltos = 0
saltosSegundos = 0
time = 0
contadorPulso = 0
basic.forever(function () {
    ecg = pins.analogReadPin(AnalogPin.P2)
    ecgSegundos = input.runningTime() / 1000
    serial.writeValue("ecg", ecg)
    serial.writeValue("ecgSegundos", ecgSegundos)
    convertirPulso()
    serial.writeValue("pulsoMinuto", pulsoFinal)
    radio.sendValue("ecg", ecg)
    radio.sendValue("ecgSegundos", ecgSegundos)
    radio.sendValue("pulsoMinuto", pulsoFinal)
})
