<template>
    <div class="col-xxl-4 col-lg-6 box-col-6">
        <div class="card">
            <div class="card-header py-4">
                <h5>Set Alarm</h5>
            </div>
            <div class="card-body">
                <form class="theme-form row">
                    <div class="mb-3 col-auto">
                        <label for="" class="col-form-label">Time (s)</label>
                    </div>
                    <div class="mb-3 col p-r-0">
                        <input class="form-control" type="number" v-model="sound.alarmTimeout" placeholder="Set Alarm" />
                    </div>
                    <div class="col-12 d-flex justify-content-end">
                        <button class="btn btn-block" :class="{'btn-danger': sound.isAlarmActive, 'btn-primary': !sound.isAlarmActive,}" type="button" @click="sound.isAlarmActive ? stopAlarm() : setAlarm()">
                        {{ sound.isAlarmActive ? 'Stop' : (sound.isLoading ? 'Loading...' : 'Submit') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Howl } from "howler";
import alarmSound from "../../../../src/assets/audio/mixkit-city-alert-siren-loop-1008.wav";
import { reactive } from "vue";

const sound = reactive({
    alarmTimeout: 0,
    isAlarmActive: false,
    isLoading: false,
});

// SET ALARM WITH HOWLER
const alarm = new Howl({
    src: [alarmSound],
    loop: true,
    volume: 0.5,
});

const setAlarm = () => {
    const timeout = sound.alarmTimeout * 1000;
    sound.isLoading = true;
    console.log("Setting Alarm for " + timeout + " Seconds");

    setTimeout(() => {
        console.log("Violance detected");
        alarm.play();

        sound.isAlarmActive = true;
        sound.isLoading = false;
        sound.alarmTimeout = 0;
    }, timeout);
};

const stopAlarm = () => {
    console.log("Alarm Stopped");
    alarm.stop();
    sound.isAlarmActive = false;
};
</script>
