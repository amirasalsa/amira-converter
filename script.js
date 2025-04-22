let mode = 'clock';
        let timerInterval, stopwatchInterval;
        let timerRemaining = 0;
        let stopwatchTime = 0; // dalam 1/10 detik

        function updateClock() {
            if (mode !== 'clock') return;
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const gmt7 = new Date(utc + 7 * 3600000);
            const time = gmt7.toLocaleTimeString();
            $('#display').text(time);
        }

        function startTimer() {
            timerRemaining = parseInt($('#timerMinutes').val()) * 60;
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                if (timerRemaining <= 0) {
                    clearInterval(timerInterval);
                    alert('Timer selesai!');
                    return;
                }
                timerRemaining--;
                const mins = Math.floor(timerRemaining / 60).toString().padStart(2, '0');
                const secs = (timerRemaining % 60).toString().padStart(2, '0');
                $('#display').text(`${mins}:${secs}`);
            }, 1000);
        }

        function startStopwatch() {
            clearInterval(stopwatchInterval);
            stopwatchInterval = setInterval(() => {
                stopwatchTime += 10; // naik setiap 10ms
                const totalSeconds = Math.floor(stopwatchTime / 1000);
                const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
                const secs = (totalSeconds % 60).toString().padStart(2, '0');
                const millis = Math.floor((stopwatchTime % 1000) / 10).toString().padStart(2, '0');
                $('#display').text(`${mins}:${secs}.${millis}`);
            }, 10);
        }

        function stopStopwatch() {
            clearInterval(stopwatchInterval);
        }

        function resetStopwatch() {
            stopwatchTime = 0;
            $('#display').text(`00:00.00`);
        }

        $(document).ready(function() {
            $('#clockMode').click(() => {
                mode = 'clock';
                clearInterval(timerInterval);
                clearInterval(stopwatchInterval);
                $('#timerControls, #stopwatchControls').hide();
                updateClock();
            });

            $('#timerMode').click(() => {
                mode = 'timer';
                clearInterval(timerInterval);
                clearInterval(stopwatchInterval);
                $('#stopwatchControls').hide();
                $('#timerControls').show();
                $('#display').text(`00:00`);
            });

            $('#stopwatchMode').click(() => {
                mode = 'stopwatch';
                clearInterval(timerInterval);
                clearInterval(stopwatchInterval);
                $('#timerControls').hide();
                $('#stopwatchControls').show();
                $('#display').text(`00:00.00`);
            });

            $('#startTimer').click(startTimer);
            $('#resetTimer').click(() => {
                clearInterval(timerInterval);
                $('#display').text(`00:00`);
            });

            $('#startStopwatch').click(startStopwatch);
            $('#stopStopwatch').click(stopStopwatch);
            $('#resetStopwatch').click(resetStopwatch);

            setInterval(updateClock, 1000);
            updateClock();
        });